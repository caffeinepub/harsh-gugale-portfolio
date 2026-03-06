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
      let featuredBlog = {
        title = "Building a Bluetooth-Based Smart Lock Using ESP32";
        category = "Embedded Systems";
        summary = "Step-by-step guide to creating a smart lock with Bluetooth integration.";
        content = "This project involves using an ESP32 microcontroller to create a smart lock that can be controlled via Bluetooth. Detailed instructions cover hardware setup, firmware development, and mobile app integration.";
        author = "Harsh Gugale";
        publishedAt = Time.now();
        isFeatured = true;
        fileUrl = "";
      };

      let otherBlogs = [
        {
          title = "Edge AI-Based Traffic Violation Detection Using ESP32-CAM";
          category = "AI & Edge Computing";
          summary = "Implementing traffic violation detection with real-time camera processing.";
          content = "Utilize ESP32-CAM for AI-based traffic violation detection. The blog covers setting up edge computing, training AI models, and integrating with IoT devices.";
          author = "Harsh Gugale";
          publishedAt = Time.now() - 1000;
          isFeatured = false;
          fileUrl = "";
        },
        {
          title = "Understanding RTOS for Real-Time Embedded Systems";
          category = "RTOS & Firmware";
          summary = "An overview of RTOS concepts and their application in embedded projects.";
          content = "This blog explains the fundamentals of Real-Time Operating Systems (RTOS) and demonstrates their use in embedded systems. Topics include task scheduling, inter-task communication, and resource management.";
          author = "Harsh Gugale";
          publishedAt = Time.now() - 2000;
          isFeatured = false;
          fileUrl = "";
        },
        {
          title = "My Structured GATE Preparation Strategy as an ECE Student";
          category = "Career & GATE Journey";
          summary = "Personal insights and tips for effective GATE exam preparation.";
          content = "Sharing a structured approach to GATE preparation, including study plans, resource recommendations, and time management strategies for Electronics and Communication Engineering students.";
          author = "Harsh Gugale";
          publishedAt = Time.now() - 3000;
          isFeatured = false;
          fileUrl = "";
        },
      ];

      var id = nextBlogId;
      blogPosts.add(
        id,
        {
          id;
          title = featuredBlog.title;
          category = featuredBlog.category;
          summary = featuredBlog.summary;
          content = featuredBlog.content;
          author = featuredBlog.author;
          publishedAt = featuredBlog.publishedAt;
          isFeatured = featuredBlog.isFeatured;
          fileUrl = featuredBlog.fileUrl;
        },
      );
      id += 1;

      for (post in otherBlogs.values()) {
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

  // New Experience CRUD Functionality
  type Experience = {
    id : Nat;
    title : Text;
    company : Text;
    badge : Text;
    date : Text;
    description : Text;
    tags : [Text];
    accentColor : Text;
  };

  module Experience {
    public func compareById(a : Experience, b : Experience) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  let experiences = Map.empty<Nat, Experience>();
  var nextExperienceId = 1;

  public shared ({ caller }) func initializeExperiences() : async () {
    if (experiences.isEmpty()) {
      let entries = [
        {
          title = "Embedded Systems Intern";
          company = "EV Manufacturing Company";
          badge = "EV";
          date = "2024";
          description = "Worked on digital instrument cluster systems, CAN communication, firmware validation, sensor interfacing, and EV electrical architecture. Gained hands-on experience with real automotive hardware and embedded diagnostics.";
          tags = ["CAN Protocol", "Firmware", "STM32", "Sensors", "Instrument Cluster"];
          accentColor = "#00d4ff";
        },
        {
          title = "Research & Development Intern";
          company = "DRDO - Defense R&D";
          badge = "DEF";
          date = "2023";
          description = "Developed Velocity of Detonation measuring system using oscillographic techniques and high-speed signal conditioning circuits. Worked with precision measurement instruments and defense-grade electronics.";
          tags = ["Signal Processing", "Oscilloscope", "Defense", "Electronics", "VOD System"];
          accentColor = "#a855f7";
        },
      ];

      var id = nextExperienceId;
      for (entry in entries.values()) {
        experiences.add(
          id,
          {
            id;
            title = entry.title;
            company = entry.company;
            badge = entry.badge;
            date = entry.date;
            description = entry.description;
            tags = entry.tags;
            accentColor = entry.accentColor;
          },
        );
        id += 1;
      };
      nextExperienceId := id;
    };
  };

  public query ({ caller }) func getAllExperiences() : async [Experience] {
    experiences.values().toArray().sort(Experience.compareById);
  };

  public shared ({ caller }) func addExperience(
    title : Text,
    company : Text,
    badge : Text,
    date : Text,
    description : Text,
    tags : [Text],
    accentColor : Text,
  ) : async Nat {
    let id = nextExperienceId;
    let newExperience : Experience = {
      id;
      title;
      company;
      badge;
      date;
      description;
      tags;
      accentColor;
    };
    experiences.add(id, newExperience);
    nextExperienceId += 1;
    id;
  };

  public shared ({ caller }) func updateExperience(
    id : Nat,
    title : Text,
    company : Text,
    badge : Text,
    date : Text,
    description : Text,
    tags : [Text],
    accentColor : Text,
  ) : async Bool {
    switch (experiences.get(id)) {
      case (null) { false };
      case (?_) {
        let updatedExperience : Experience = {
          id;
          title;
          company;
          badge;
          date;
          description;
          tags;
          accentColor;
        };
        experiences.add(id, updatedExperience);
        true;
      };
    };
  };

  public shared ({ caller }) func deleteExperience(id : Nat) : async Bool {
    switch (experiences.get(id)) {
      case (null) { false };
      case (?_) {
        experiences.remove(id);
        true;
      };
    };
  };

  // New Skills Functionality
  type Skill = {
    name : Text;
    level : Nat;
  };

  type SkillCategory = {
    id : Nat;
    name : Text;
    accentColor : Text;
    skills : [Skill];
  };

  module SkillCategory {
    public func compareById(a : SkillCategory, b : SkillCategory) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  let skillCategories = Map.empty<Nat, SkillCategory>();

  public shared ({ caller }) func initializeSkills() : async () {
    if (skillCategories.isEmpty()) {
      let categories = [
        {
          id = 1;
          name = "Embedded Systems";
          accentColor = "#00d4ff";
          skills = [
            { name = "Microcontrollers (STM32 / ESP32 / Arduino)"; level = 90 },
            { name = "Firmware Development (Embedded C)"; level = 88 },
            { name = "Communication Protocols (UART / I2C / SPI / CAN)"; level = 85 },
            { name = "RTOS & Real-Time Systems"; level = 78 },
            { name = "ADC / DAC / PWM / Timers"; level = 80 },
            { name = "PCB Design Fundamentals"; level = 72 },
          ];
        },
        {
          id = 2;
          name = "AI & Software";
          accentColor = "#a855f7";
          skills = [
            { name = "Python"; level = 82 },
            { name = "Machine Learning / Edge AI"; level = 78 },
            { name = "Data Processing & Visualization"; level = 74 },
            { name = "MATLAB"; level = 75 },
            { name = "Computer Vision (OpenCV)"; level = 72 },
          ];
        },
        {
          id = 3;
          name = "Tools & Platforms";
          accentColor = "#00ff88";
          skills = [
            { name = "Git & Version Control"; level = 88 },
            { name = "VS Code / Keil uVision"; level = 85 },
            { name = "Proteus Simulation"; level = 80 },
            { name = "KiCad (PCB)"; level = 70 },
            { name = "MATLAB / Simulink"; level = 75 },
          ];
        },
      ];

      for (category in categories.values()) {
        skillCategories.add(category.id, category);
      };
    };
  };

  public query ({ caller }) func getSkillCategories() : async [SkillCategory] {
    skillCategories.values().toArray().sort(SkillCategory.compareById);
  };

  public shared ({ caller }) func updateSkillCategory(
    id : Nat,
    name : Text,
    accentColor : Text,
    skills : [Skill],
  ) : async Bool {
    switch (skillCategories.get(id)) {
      case (null) { false };
      case (?_) {
        let updatedCategory : SkillCategory = {
          id;
          name;
          accentColor;
          skills;
        };
        skillCategories.add(id, updatedCategory);
        true;
      };
    };
  };

  // New ProfileMeta Functionality
  type ProfileMeta = {
    profileImageUrl : Text;
    instagram : Text;
    currentlyBuilding : Text;
  };

  var profileMeta : ProfileMeta = {
    profileImageUrl = "";
    instagram = "https://instagram.com/harshgugale";
    currentlyBuilding = "AI-Powered Robotic System with Mobile Vision Integration";
  };

  public query ({ caller }) func getProfileMeta() : async ProfileMeta {
    profileMeta;
  };

  public shared ({ caller }) func updateProfileMeta(
    profileImageUrl : Text,
    instagram : Text,
    currentlyBuilding : Text,
  ) : async () {
    profileMeta := {
      profileImageUrl;
      instagram;
      currentlyBuilding;
    };
  };

  // New Admin Password Functionality
  var adminPassword = "harsh2025";

  public query ({ caller }) func verifyAdminPassword(password : Text) : async Bool {
    adminPassword == password;
  };

  public shared ({ caller }) func changeAdminPassword(currentPassword : Text, newPassword : Text) : async Bool {
    if (adminPassword == currentPassword) {
      adminPassword := newPassword;
      true;
    } else {
      false;
    };
  };

  // MediaItem Functionality
  type MediaItem = {
    id : Nat;
    title : Text;
    category : Text;
    caption : Text;
    mediaUrl : Text;
    mediaType : Text;
    itemOrder : Nat;
  };

  var mediaItems = Map.empty<Nat, MediaItem>();
  var nextMediaItemId = 1;

  module MediaItem {
    public func compareByItemOrder(a : MediaItem, b : MediaItem) : Order.Order {
      Nat.compare(a.itemOrder, b.itemOrder);
    };
  };

  public shared ({ caller }) func initializeMediaItems() : async () {
    if (mediaItems.isEmpty()) {
      let items = [
        {
          title = "Travel Photography - Mountains";
          category = "Travel Photography";
          caption = "A beautiful mountain landscape from my recent trip.";
          mediaUrl = "";
          mediaType = "image";
          itemOrder = 1;
        },
        {
          title = "Cinematic Reel - Urban Exploration";
          category = "Cinematic Reels";
          caption = "A short cinematic reel showcasing urban architecture.";
          mediaUrl = "";
          mediaType = "video";
          itemOrder = 2;
        },
        {
          title = "Drone Shot - Beach View";
          category = "Drone Shots";
          caption = "Aerial shot of a pristine beach captured by my drone.";
          mediaUrl = "";
          mediaType = "image";
          itemOrder = 3;
        },
        {
          title = "Short Vlog - City Life";
          category = "Short Vlogs";
          caption = "A quick vlog exploring the vibrant city life.";
          mediaUrl = "";
          mediaType = "video";
          itemOrder = 4;
        },
        {
          title = "Nature Photography - Forest";
          category = "Travel Photography";
          caption = "Capturing the serenity of a dense forest.";
          mediaUrl = "";
          mediaType = "image";
          itemOrder = 5;
        },
        {
          title = "Time-lapse - Sunset";
          category = "Cinematic Reels";
          caption = "A mesmerizing time-lapse of a sunset scene.";
          mediaUrl = "";
          mediaType = "video";
          itemOrder = 6;
        },
      ];

      var id = nextMediaItemId;
      for (item in items.values()) {
        let newItem : MediaItem = {
          id;
          title = item.title;
          category = item.category;
          caption = item.caption;
          mediaUrl = item.mediaUrl;
          mediaType = item.mediaType;
          itemOrder = item.itemOrder;
        };
        mediaItems.add(id, newItem);
        id += 1;
      };
      nextMediaItemId := id;
    };
  };

  public query ({ caller }) func getAllMediaItems() : async [MediaItem] {
    let items = mediaItems.values().toArray();
    items.sort(MediaItem.compareByItemOrder);
  };

  public shared ({ caller }) func addMediaItem(
    title : Text,
    category : Text,
    caption : Text,
    mediaUrl : Text,
    mediaType : Text,
    itemOrder : Nat,
  ) : async Nat {
    let id = nextMediaItemId;
    let newItem : MediaItem = {
      id;
      title;
      category;
      caption;
      mediaUrl;
      mediaType;
      itemOrder;
    };
    mediaItems.add(id, newItem);
    nextMediaItemId += 1;
    id;
  };

  public shared ({ caller }) func updateMediaItem(
    id : Nat,
    title : Text,
    category : Text,
    caption : Text,
    mediaUrl : Text,
    mediaType : Text,
    itemOrder : Nat,
  ) : async Bool {
    switch (mediaItems.get(id)) {
      case (null) { false };
      case (?_) {
        let updatedItem : MediaItem = {
          id;
          title;
          category;
          caption;
          mediaUrl;
          mediaType;
          itemOrder;
        };
        mediaItems.add(id, updatedItem);
        true;
      };
    };
  };

  public shared ({ caller }) func deleteMediaItem(id : Nat) : async Bool {
    switch (mediaItems.get(id)) {
      case (null) { false };
      case (?_) {
        mediaItems.remove(id);
        true;
      };
    };
  };

  public shared ({ caller }) func initializeData() : async () {
    await initializeBlogs();
    await initializeProjects();
    await initializeExperiences();
    await initializeSkills();
    await initializeMediaItems();
  };
};
