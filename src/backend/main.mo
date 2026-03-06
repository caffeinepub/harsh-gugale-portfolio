import Map "mo:core/Map";
import List "mo:core/List";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Migration "migration";

(with migration = Migration.run)
actor {
  // BlogActor Types & Initialization
  type BlogPost = {
    id : Nat;
    title : Text;
    category : Text;
    summary : Text;
    content : Text;
    author : Text;
    publishedAt : Int;
    isFeatured : Bool;
    fileUrl : Text;
  };

  module BlogPost {
    public func compareByPublishedAt(a : BlogPost, b : BlogPost) : Order.Order {
      Int.compare(b.publishedAt, a.publishedAt);
    };
  };

  let blogPosts = Map.empty<Nat, BlogPost>();
  var nextBlogId = 1;

  public shared ({ caller }) func initializeBlogs() : async () {
    if (blogPosts.isEmpty()) {
      let samplePosts = [
        {
          title = "Understanding Embedded Systems";
          category = "Embedded Systems";
          summary = "A beginner's guide to embedded systems.";
          content = "Embedded systems are ...";
          author = "Harsh Gugale";
          publishedAt = Time.now();
          isFeatured = true;
          fileUrl = "";
        },
        {
          title = "CAN Protocol Explained";
          category = "CAN Protocol";
          summary = "Overview of automotive communication protocols.";
          content = "The Controller Area Network (CAN) ...";
          author = "Harsh Gugale";
          publishedAt = Time.now() - 1000;
          isFeatured = false;
          fileUrl = "";
        },
        {
          title = "AI in Electronics";
          category = "AI in Electronics";
          summary = "How AI is transforming electronics design.";
          content = "Artificial intelligence is ...";
          author = "Harsh Gugale";
          publishedAt = Time.now() - 2000;
          isFeatured = false;
          fileUrl = "";
        },
        {
          title = "GATE Preparation Tips";
          category = "GATE Preparation";
          summary = "Effective strategies for GATE exam success.";
          content = "Preparing for the GATE exam ...";
          author = "Harsh Gugale";
          publishedAt = Time.now() - 3000;
          isFeatured = false;
          fileUrl = "";
        },
        {
          title = "Embedded C Programming";
          category = "Embedded Systems";
          summary = "Introduction to Embedded C.";
          content = "Embedded C is a set of language extensions ...";
          author = "Harsh Gugale";
          publishedAt = Time.now() - 4000;
          isFeatured = false;
          fileUrl = "";
        },
        {
          title = "CAN Bus Troubleshooting";
          category = "CAN Protocol";
          summary = "Common issues and solutions for CAN bus systems.";
          content = "Troubleshooting CAN bus systems ...";
          author = "Harsh Gugale";
          publishedAt = Time.now() - 5000;
          isFeatured = false;
          fileUrl = "";
        },
      ];

      var id = nextBlogId;
      for (post in samplePosts.values()) {
        blogPosts.add(
          id,
          {
            id;
            title = post.title;
            category = post.category;
            summary = post.summary;
            content = post.content;
            author = post.author;
            publishedAt = post.publishedAt;
            isFeatured = post.isFeatured;
            fileUrl = post.fileUrl;
          },
        );
        id += 1;
      };
      nextBlogId := id;
    };
  };

  public query ({ caller }) func getAllPosts() : async [BlogPost] {
    blogPosts.values().toArray().sort(BlogPost.compareByPublishedAt);
  };

  public query ({ caller }) func getPostsByCategory(category : Text) : async [BlogPost] {
    let filtered = blogPosts.values().toArray().filter(
      func(post) { Text.equal(post.category, category) }
    );
    filtered.sort(BlogPost.compareByPublishedAt);
  };

  public query ({ caller }) func getFeaturedPost() : async ?BlogPost {
    blogPosts.values().toArray().find(
      func(post) { post.isFeatured }
    );
  };

  public shared ({ caller }) func addBlogPost(
    title : Text,
    category : Text,
    summary : Text,
    content : Text,
    author : Text,
    publishedAt : Int,
    isFeatured : Bool,
    fileUrl : Text,
  ) : async Nat {
    let id = nextBlogId;
    let newPost : BlogPost = {
      id;
      title;
      category;
      summary;
      content;
      author;
      publishedAt;
      isFeatured;
      fileUrl;
    };
    blogPosts.add(id, newPost);
    nextBlogId += 1;
    id;
  };

  public shared ({ caller }) func updateBlogPost(
    id : Nat,
    title : Text,
    category : Text,
    summary : Text,
    content : Text,
    author : Text,
    publishedAt : Int,
    isFeatured : Bool,
    fileUrl : Text,
  ) : async Bool {
    switch (blogPosts.get(id)) {
      case (null) { false };
      case (?_) {
        let updatedPost : BlogPost = {
          id;
          title;
          category;
          summary;
          content;
          author;
          publishedAt;
          isFeatured;
          fileUrl;
        };
        blogPosts.add(id, updatedPost);
        true;
      };
    };
  };

  public shared ({ caller }) func deleteBlogPost(id : Nat) : async Bool {
    switch (blogPosts.get(id)) {
      case (null) { false };
      case (?_) {
        blogPosts.remove(id);
        true;
      };
    };
  };

  // ProjectActor Types & Initialization
  type Project = {
    id : Nat;
    title : Text;
    techStack : [Text];
    description : Text;
    category : Text;
    githubUrl : Text;
    demoUrl : Text;
  };

  module Project {
    public func compareById(a : Project, b : Project) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  let projects = Map.empty<Nat, Project>();
  var nextProjectId = 1;

  public shared ({ caller }) func initializeProjects() : async () {
    if (projects.isEmpty()) {
      let sampleProjects = [
        {
          title = "Smart Lock System";
          techStack = ["Embedded C", "ESP32", "IoT"];
          description = "A secure smart lock system using ESP32.";
          category = "Embedded Systems";
          githubUrl = "https://github.com/harshgugale/smart-lock";
          demoUrl = "";
        },
        {
          title = "Home Automation ESP32";
          techStack = ["C++", "ESP32", "IoT"];
          description = "Automate home appliances with ESP32.";
          category = "Home Automation";
          githubUrl = "https://github.com/harshgugale/home-automation";
          demoUrl = "";
        },
        {
          title = "Autonomous Landmine Detection Rover";
          techStack = ["C++", "Robotics", "AI"];
          description = "A rover for autonomous landmine detection.";
          category = "Robotics";
          githubUrl = "https://github.com/harshgugale/landmine-rover";
          demoUrl = "";
        },
        {
          title = "Edge AI Traffic Violation Detection";
          techStack = ["Python", "Edge AI", "Computer Vision"];
          description = "Traffic violation detection using edge AI.";
          category = "AI & Computer Vision";
          githubUrl = "https://github.com/harshgugale/traffic-ai";
          demoUrl = "";
        },
        {
          title = "AI-Integrated Robotic Arm";
          techStack = ["Python", "Robotics", "AI"];
          description = "Robotic arm controlled by AI gestures.";
          category = "Robotics";
          githubUrl = "https://github.com/harshgugale/robotic-arm-ai";
          demoUrl = "";
        },
      ];

      var id = nextProjectId;
      for (project in sampleProjects.values()) {
        projects.add(
          id,
          {
            id;
            title = project.title;
            techStack = project.techStack;
            description = project.description;
            category = project.category;
            githubUrl = project.githubUrl;
            demoUrl = project.demoUrl;
          },
        );
        id += 1;
      };
      nextProjectId := id;
    };
  };

  public query ({ caller }) func getAllProjects() : async [Project] {
    projects.values().toArray().sort(Project.compareById);
  };

  public shared ({ caller }) func addProject(
    title : Text,
    techStack : [Text],
    description : Text,
    category : Text,
    githubUrl : Text,
    demoUrl : Text,
  ) : async Nat {
    let id = nextProjectId;
    let newProject : Project = {
      id;
      title;
      techStack;
      description;
      category;
      githubUrl;
      demoUrl;
    };
    projects.add(id, newProject);
    nextProjectId += 1;
    id;
  };

  public shared ({ caller }) func updateProject(
    id : Nat,
    title : Text,
    techStack : [Text],
    description : Text,
    category : Text,
    githubUrl : Text,
    demoUrl : Text,
  ) : async Bool {
    switch (projects.get(id)) {
      case (null) { false };
      case (?_) {
        let updatedProject : Project = {
          id;
          title;
          techStack;
          description;
          category;
          githubUrl;
          demoUrl;
        };
        projects.add(id, updatedProject);
        true;
      };
    };
  };

  public shared ({ caller }) func deleteProject(id : Nat) : async Bool {
    switch (projects.get(id)) {
      case (null) { false };
      case (?_) {
        projects.remove(id);
        true;
      };
    };
  };

  // ResumeActor Types & Initialization
  type ResumeContent = {
    name : Text;
    tagline : Text;
    about : Text;
    careerObjective : Text;
    resumeFileUrl : Text;
    email : Text;
    linkedin : Text;
    github : Text;
  };

  var resumeContent : ResumeContent = {
    name = "Harsh Gugale";
    tagline = "Electronics & Telecom Engineer";
    about = "Experienced electronics engineer specializing in embedded systems, robotics, and AI integration.";
    careerObjective = "To innovate and create impactful solutions in the field of electronics and telecommunications.";
    resumeFileUrl = "";
    email = "harsh.gugale@example.com";
    linkedin = "https://linkedin.com/in/harshgugale";
    github = "https://github.com/harshgugale";
  };

  public query ({ caller }) func getResumeContent() : async ResumeContent {
    resumeContent;
  };

  public shared ({ caller }) func updateResumeContent(
    name : Text,
    tagline : Text,
    about : Text,
    careerObjective : Text,
    resumeFileUrl : Text,
    email : Text,
    linkedin : Text,
    github : Text,
  ) : async () {
    resumeContent := {
      name;
      tagline;
      about;
      careerObjective;
      resumeFileUrl;
      email;
      linkedin;
      github;
    };
  };

  // ContactActor Types & Initialization
  type ContactSubmission = {
    name : Text;
    email : Text;
    message : Text;
    timestamp : Int;
  };

  module ContactSubmission {
    public func compareByTimestamp(a : ContactSubmission, b : ContactSubmission) : Order.Order {
      Int.compare(a.timestamp, b.timestamp);
    };
  };

  let contacts = List.empty<ContactSubmission>();

  public shared ({ caller }) func submitContact(name : Text, email : Text, message : Text, timestamp : Int) : async () {
    contacts.add({
      name;
      email;
      message;
      timestamp;
    });
  };

  public query ({ caller }) func getAllContacts() : async [ContactSubmission] {
    contacts.toArray().sort(ContactSubmission.compareByTimestamp);
  };

  // Analytics Extensions
  var visitorCount = 0;
  var resumeDownloadCount = 0;
  let blogViewCounts = Map.empty<Nat, Nat>();
  let projectViewCounts = Map.empty<Nat, Nat>();

  public shared ({ caller }) func recordVisit() : async () {
    visitorCount += 1;
  };

  public shared ({ caller }) func recordResumeDownload() : async () {
    resumeDownloadCount += 1;
  };

  public shared ({ caller }) func recordBlogView(id : Nat) : async () {
    blogViewCounts.add(id, switch (blogViewCounts.get(id)) {
      case (null) { 1 };
      case (?count) { count + 1 };
    });
  };

  public shared ({ caller }) func recordProjectView(id : Nat) : async () {
    projectViewCounts.add(id, switch (projectViewCounts.get(id)) {
      case (null) { 1 };
      case (?count) { count + 1 };
    });
  };

  public type BlogViewStat = {
    id : Nat;
    title : Text;
    viewCount : Nat;
  };

  public type ProjectViewStat = {
    id : Nat;
    title : Text;
    viewCount : Nat;
  };

  public type AnalyticsData = {
    visitorCount : Nat;
    resumeDownloadCount : Nat;
    topBlogs : [BlogViewStat];
    topProjects : [ProjectViewStat];
  };

  public query ({ caller }) func getAnalytics() : async AnalyticsData {
    let blogStats = blogViewCounts.toArray().map(
      func((id, count)) {
        {
          id;
          title = switch (blogPosts.get(id)) {
            case (null) { "" };
            case (?post) { post.title };
          };
          viewCount = count;
        };
      }
    );

    let projectStats = projectViewCounts.toArray().map(
      func((id, count)) {
        {
          id;
          title = switch (projects.get(id)) {
            case (null) { "" };
            case (?project) { project.title };
          };
          viewCount = count;
        };
      }
    );

    let topBlogs = blogStats.sort(
      func(a, b) {
        Nat.compare(b.viewCount, a.viewCount);
      }
    ).sliceToArray(0, if (blogStats.size() > 5) { 5 } else { blogStats.size() });

    let topProjects = projectStats.sort(
      func(a, b) {
        Nat.compare(b.viewCount, a.viewCount);
      }
    ).sliceToArray(0, if (projectStats.size() > 5) { 5 } else { projectStats.size() });

    {
      visitorCount;
      resumeDownloadCount;
      topBlogs;
      topProjects;
    };
  };

  public shared ({ caller }) func initializeData() : async () {
    await initializeBlogs();
    await initializeProjects();
  };
};
