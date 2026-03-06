import Map "mo:core/Map";
import List "mo:core/List";

module {
  // Old Actor from last version with all fields except mediaItems + nextMediaItemId
  type OldActor = {
    blogPosts : Map.Map<Nat, {
      id : Nat;
      title : Text;
      category : Text;
      summary : Text;
      content : Text;
      author : Text;
      publishedAt : Int;
      isFeatured : Bool;
      fileUrl : Text;
    }>;
    nextBlogId : Nat;
    projects : Map.Map<Nat, {
      id : Nat;
      title : Text;
      techStack : [Text];
      description : Text;
      category : Text;
      githubUrl : Text;
      demoUrl : Text;
    }>;
    nextProjectId : Nat;
    resumeContent : {
      name : Text;
      tagline : Text;
      about : Text;
      careerObjective : Text;
      resumeFileUrl : Text;
      email : Text;
      linkedin : Text;
      github : Text;
    };
    contacts : List.List<{
      name : Text;
      email : Text;
      message : Text;
      timestamp : Int;
    }>;
    visitorCount : Nat;
    resumeDownloadCount : Nat;
    blogViewCounts : Map.Map<Nat, Nat>;
    projectViewCounts : Map.Map<Nat, Nat>;
    experiences : Map.Map<Nat, {
      id : Nat;
      title : Text;
      company : Text;
      badge : Text;
      date : Text;
      description : Text;
      tags : [Text];
      accentColor : Text;
    }>;
    nextExperienceId : Nat;
    skillCategories : Map.Map<Nat, {
      id : Nat;
      name : Text;
      accentColor : Text;
      skills : [{
        name : Text;
        level : Nat;
      }];
    }>;
    profileMeta : {
      profileImageUrl : Text;
      instagram : Text;
      currentlyBuilding : Text;
    };
    adminPassword : Text;
  };

  // New Actor with the new fields
  type NewActor = {
    blogPosts : Map.Map<Nat, {
      id : Nat;
      title : Text;
      category : Text;
      summary : Text;
      content : Text;
      author : Text;
      publishedAt : Int;
      isFeatured : Bool;
      fileUrl : Text;
    }>;
    nextBlogId : Nat;
    projects : Map.Map<Nat, {
      id : Nat;
      title : Text;
      techStack : [Text];
      description : Text;
      category : Text;
      githubUrl : Text;
      demoUrl : Text;
    }>;
    nextProjectId : Nat;
    resumeContent : {
      name : Text;
      tagline : Text;
      about : Text;
      careerObjective : Text;
      resumeFileUrl : Text;
      email : Text;
      linkedin : Text;
      github : Text;
    };
    contacts : List.List<{
      name : Text;
      email : Text;
      message : Text;
      timestamp : Int;
    }>;
    visitorCount : Nat;
    resumeDownloadCount : Nat;
    blogViewCounts : Map.Map<Nat, Nat>;
    projectViewCounts : Map.Map<Nat, Nat>;
    experiences : Map.Map<Nat, {
      id : Nat;
      title : Text;
      company : Text;
      badge : Text;
      date : Text;
      description : Text;
      tags : [Text];
      accentColor : Text;
    }>;
    nextExperienceId : Nat;
    skillCategories : Map.Map<Nat, {
      id : Nat;
      name : Text;
      accentColor : Text;
      skills : [{
        name : Text;
        level : Nat;
      }];
    }>;
    profileMeta : {
      profileImageUrl : Text;
      instagram : Text;
      currentlyBuilding : Text;
    };
    adminPassword : Text;
    mediaItems : Map.Map<Nat, {
      id : Nat;
      title : Text;
      category : Text;
      caption : Text;
      mediaUrl : Text;
      mediaType : Text;
      itemOrder : Nat;
    }>;
    nextMediaItemId : Nat;
  };

  // Just initialize the new fields during migration
  public func run(old : OldActor) : NewActor {
    {
      blogPosts = old.blogPosts;
      nextBlogId = old.nextBlogId;
      projects = old.projects;
      nextProjectId = old.nextProjectId;
      resumeContent = old.resumeContent;
      contacts = old.contacts;
      visitorCount = old.visitorCount;
      resumeDownloadCount = old.resumeDownloadCount;
      blogViewCounts = old.blogViewCounts;
      projectViewCounts = old.projectViewCounts;
      experiences = old.experiences;
      nextExperienceId = old.nextExperienceId;
      skillCategories = old.skillCategories;
      profileMeta = old.profileMeta;
      adminPassword = old.adminPassword;
      mediaItems = Map.empty<Nat, {
        id : Nat;
        title : Text;
        category : Text;
        caption : Text;
        mediaUrl : Text;
        mediaType : Text;
        itemOrder : Nat;
      }>();
      nextMediaItemId = 1;
    };
  };
};
