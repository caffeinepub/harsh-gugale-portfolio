import { useEffect, useRef } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Point {
  x: number;
  y: number;
}

interface CircuitSegment {
  from: Point;
  to: Point;
}

interface CircuitNode {
  x: number;
  y: number;
  isPurple: boolean;
}

interface Signal {
  pathSegments: CircuitSegment[]; // the connected path this signal travels
  segmentIndex: number; // which segment we're on
  progress: number; // 0..1 along current segment
  speed: number; // fraction of segment per frame
  isPurple: boolean;
  trail: Array<{ x: number; y: number }>;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  isPurple: boolean;
  opacity: number;
}

// ─── Geometry builders ───────────────────────────────────────────────────────

function buildCircuitGeometry(
  w: number,
  h: number,
  isMobile: boolean,
): {
  segments: CircuitSegment[];
  nodes: CircuitNode[];
  paths: CircuitSegment[][];
} {
  const spacing = isMobile ? 160 : 120;
  const jitter = 20;

  // Grid of raw node positions with small random offset
  const cols = Math.ceil(w / spacing) + 1;
  const rows = Math.ceil(h / spacing) + 1;

  const grid: Point[][] = [];
  for (let r = 0; r < rows; r++) {
    grid[r] = [];
    for (let c = 0; c < cols; c++) {
      grid[r][c] = {
        x: c * spacing + (Math.random() * 2 - 1) * jitter,
        y: r * spacing + (Math.random() * 2 - 1) * jitter,
      };
    }
  }

  // Connect ~60 % of adjacent horizontal and vertical pairs
  const segments: CircuitSegment[] = [];
  const adjacencyMap = new Map<string, Point[]>(); // key = "r,c" → connected neighbours

  const connect = (r1: number, c1: number, r2: number, c2: number) => {
    if (Math.random() > 0.6) return;
    const from = grid[r1][c1];
    const to = grid[r2][c2];
    segments.push({ from, to });
    // Store adjacency for path building
    const k1 = `${r1},${c1}`;
    const k2 = `${r2},${c2}`;
    if (!adjacencyMap.has(k1)) adjacencyMap.set(k1, []);
    if (!adjacencyMap.has(k2)) adjacencyMap.set(k2, []);
    adjacencyMap.get(k1)!.push(to);
    adjacencyMap.get(k2)!.push(from);
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (c + 1 < cols) connect(r, c, r, c + 1); // horizontal
      if (r + 1 < rows) connect(r, c, r + 1, c); // vertical
    }
  }

  // Intersection nodes — grid intersections that have ≥ 2 segments
  const nodes: CircuitNode[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const key = `${r},${c}`;
      const degree = adjacencyMap.get(key)?.length ?? 0;
      if (degree >= 2) {
        nodes.push({
          x: grid[r][c].x,
          y: grid[r][c].y,
          isPurple: Math.random() < 0.3,
        });
      }
    }
  }

  // Build signal paths: walk connected segments into chains of length 4–10
  const paths: CircuitSegment[][] = [];
  if (segments.length > 0) {
    for (let attempt = 0; attempt < 60; attempt++) {
      const startSeg = segments[Math.floor(Math.random() * segments.length)];
      const path: CircuitSegment[] = [startSeg];
      let current: Point = startSeg.to;
      const targetLen = 4 + Math.floor(Math.random() * 7);

      for (let step = 1; step < targetLen; step++) {
        // Find a segment that starts from current (approximately)
        const candidates = segments.filter(
          (s) =>
            (Math.abs(s.from.x - current.x) < 1 &&
              Math.abs(s.from.y - current.y) < 1) ||
            (Math.abs(s.to.x - current.x) < 1 &&
              Math.abs(s.to.y - current.y) < 1),
        );
        if (candidates.length === 0) break;
        const next = candidates[Math.floor(Math.random() * candidates.length)];
        // Normalise direction so signal always travels .from → .to
        const normalised: CircuitSegment =
          Math.abs(next.from.x - current.x) < 1 &&
          Math.abs(next.from.y - current.y) < 1
            ? next
            : { from: next.to, to: next.from };
        path.push(normalised);
        current = normalised.to;
      }

      if (path.length >= 3) paths.push(path);
    }
  }

  return { segments, nodes, paths };
}

function buildParticles(w: number, h: number, count: number): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const speed = 0.1 + Math.random() * 0.2;
    const angle = Math.random() * Math.PI * 2;
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: 1 + Math.random() * 1.5,
      isPurple: Math.random() < 0.3,
      opacity: 0.5 + Math.random() * 0.3,
    });
  }
  return particles;
}

function spawnSignal(paths: CircuitSegment[][]): Signal | null {
  if (paths.length === 0) return null;
  const path = paths[Math.floor(Math.random() * paths.length)];
  return {
    pathSegments: path,
    segmentIndex: 0,
    progress: 0,
    speed: 0.003 + Math.random() * 0.002, // ~2-3 s per segment at 60fps
    isPurple: Math.random() < 0.35,
    trail: [],
  };
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function FuturisticBackground() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<{
    animRef: number;
    segments: CircuitSegment[];
    nodes: CircuitNode[];
    paths: CircuitSegment[][];
    particles: Particle[];
    signals: Signal[];
    w: number;
    h: number;
  } | null>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animRef = 0;

    // ── Setup ──────────────────────────────────────────────────────────────
    const setup = () => {
      const isMobile = window.innerWidth < 768;
      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas.width = w;
      canvas.height = h;

      const { segments, nodes, paths } = buildCircuitGeometry(w, h, isMobile);
      const particleCount = isMobile ? 10 : 25;
      const particles = buildParticles(w, h, particleCount);

      const signalCount = isMobile ? 5 : 10;
      const signals: Signal[] = [];
      for (let i = 0; i < signalCount; i++) {
        const s = spawnSignal(paths);
        if (s) {
          // Stagger starting positions
          s.segmentIndex = Math.floor(Math.random() * s.pathSegments.length);
          s.progress = Math.random();
          signals.push(s);
        }
      }

      stateRef.current = {
        animRef,
        segments,
        nodes,
        paths,
        particles,
        signals,
        w,
        h,
      };
    };

    // ── Draw loop ──────────────────────────────────────────────────────────
    const draw = (time: number) => {
      const state = stateRef.current;
      if (!state) return;

      const { segments, nodes, particles, signals, w, h } = state;

      ctx.clearRect(0, 0, w, h);

      // ── 1. Circuit lines ───────────────────────────────────────────────
      ctx.save();
      ctx.lineWidth = 0.8;
      ctx.shadowBlur = 4;
      ctx.shadowColor = "rgba(0,212,255,0.25)";
      ctx.strokeStyle = "rgba(0,212,255,0.10)";
      for (const seg of segments) {
        ctx.beginPath();
        ctx.moveTo(seg.from.x, seg.from.y);
        ctx.lineTo(seg.to.x, seg.to.y);
        ctx.stroke();
      }
      ctx.restore();

      // ── 2. Circuit nodes with breathing pulse ──────────────────────────
      const pulse = 0.5 + 0.5 * Math.sin(time * 0.0015);
      for (const node of nodes) {
        const r = 1.5 + pulse * 1;
        ctx.save();
        if (node.isPurple) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = "rgba(123,47,255,0.6)";
          ctx.fillStyle = `rgba(123,47,255,${0.2 + pulse * 0.15})`;
        } else {
          ctx.shadowBlur = 8;
          ctx.shadowColor = "rgba(0,212,255,0.6)";
          ctx.fillStyle = `rgba(0,212,255,${0.2 + pulse * 0.15})`;
        }
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // ── 3. Signal pulses along circuit paths ───────────────────────────
      for (let i = signals.length - 1; i >= 0; i--) {
        const sig = signals[i];
        sig.progress += sig.speed;

        if (sig.progress >= 1) {
          sig.progress = 0;
          sig.segmentIndex++;
          if (sig.segmentIndex >= sig.pathSegments.length) {
            // Respawn on a new random path
            const fresh = spawnSignal(state.paths);
            if (fresh) signals[i] = fresh;
            else signals.splice(i, 1);
            continue;
          }
        }

        const seg = sig.pathSegments[sig.segmentIndex];
        const x = seg.from.x + (seg.to.x - seg.from.x) * sig.progress;
        const y = seg.from.y + (seg.to.y - seg.from.y) * sig.progress;

        // Update trail
        sig.trail.unshift({ x, y });
        if (sig.trail.length > 4) sig.trail.pop();

        // Draw trail dots
        for (let t = sig.trail.length - 1; t >= 0; t--) {
          const trailPt = sig.trail[t];
          const trailOpacity = (1 - t / sig.trail.length) * 0.5;
          const trailRadius = 1 + (1 - t / sig.trail.length) * 1;
          ctx.save();
          if (sig.isPurple) {
            ctx.shadowBlur = 6;
            ctx.shadowColor = "rgba(123,47,255,0.6)";
            ctx.fillStyle = `rgba(168,85,247,${trailOpacity})`;
          } else {
            ctx.shadowBlur = 6;
            ctx.shadowColor = "rgba(0,212,255,0.5)";
            ctx.fillStyle = `rgba(0,212,255,${trailOpacity})`;
          }
          ctx.beginPath();
          ctx.arc(trailPt.x, trailPt.y, trailRadius, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        // Draw signal head
        ctx.save();
        if (sig.isPurple) {
          ctx.shadowBlur = 14;
          ctx.shadowColor = "rgba(123,47,255,0.9)";
          ctx.fillStyle = "rgba(168,85,247,0.95)";
        } else {
          ctx.shadowBlur = 14;
          ctx.shadowColor = "rgba(0,212,255,0.9)";
          ctx.fillStyle = "rgba(0,220,255,0.95)";
        }
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // ── 4. Particle connection lines ───────────────────────────────────
      ctx.save();
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            const lineOpacity = (1 - dist / 100) * 0.12;
            ctx.strokeStyle = `rgba(0,212,255,${lineOpacity})`;
            ctx.lineWidth = 0.6;
            ctx.shadowBlur = 0;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
      ctx.restore();

      // ── 5. Particle dots + movement ────────────────────────────────────
      for (const p of particles) {
        // Move
        p.x += p.vx;
        p.y += p.vy;
        // Toroidal wrap
        if (p.x < -5) p.x = w + 5;
        if (p.x > w + 5) p.x = -5;
        if (p.y < -5) p.y = h + 5;
        if (p.y > h + 5) p.y = -5;

        ctx.save();
        if (p.isPurple) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = "rgba(123,47,255,0.7)";
          ctx.fillStyle = `rgba(168,85,247,${p.opacity})`;
        } else {
          ctx.shadowBlur = 8;
          ctx.shadowColor = "rgba(0,212,255,0.7)";
          ctx.fillStyle = `rgba(0,212,255,${p.opacity})`;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animRef = requestAnimationFrame(draw);
      if (stateRef.current) stateRef.current.animRef = animRef;
    };

    // ── Resize handler ─────────────────────────────────────────────────────
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        cancelAnimationFrame(animRef);
        setup();
        animRef = requestAnimationFrame(draw);
        if (stateRef.current) stateRef.current.animRef = animRef;
      }, 200);
    };
    window.addEventListener("resize", onResize, { passive: true });

    // ── Lazy init after page load ──────────────────────────────────────────
    let initTimer: ReturnType<typeof setTimeout>;

    const init = () => {
      setup();
      animRef = requestAnimationFrame(draw);
      if (stateRef.current) stateRef.current.animRef = animRef;
    };

    const cleanupCanvas = () => {
      cancelAnimationFrame(animRef);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      if (canvasRef.current) {
        const c = canvasRef.current.getContext("2d");
        if (c)
          c.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    };

    if (typeof requestIdleCallback !== "undefined") {
      const idleId = requestIdleCallback(init, { timeout: 2000 });
      return () => {
        cancelIdleCallback(idleId);
        cleanupCanvas();
      };
    }

    initTimer = setTimeout(init, 200);
    return () => {
      clearTimeout(initTimer);
      cleanupCanvas();
    };
  }, []);

  return (
    <div ref={wrapperRef} className="bg-canvas-layer" aria-hidden="true">
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%" }}
      />
    </div>
  );
}
