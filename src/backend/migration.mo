import Map "mo:core/Map";
import Nat "mo:core/Nat";

module {
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
  };

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
    visitorCount : Nat;
    resumeDownloadCount : Nat;
    blogViewCounts : Map.Map<Nat, Nat>;
    projectViewCounts : Map.Map<Nat, Nat>;
  };

  public func run(old : OldActor) : NewActor {
    {
      old with
      visitorCount = 0;
      resumeDownloadCount = 0;
      blogViewCounts = Map.empty<Nat, Nat>();
      projectViewCounts = Map.empty<Nat, Nat>();
    };
  };
};
