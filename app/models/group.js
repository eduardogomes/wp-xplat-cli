var member = require("./member.js"), 
    rp = require("request-promise"),
    common = require("./common.js"), 
    event = require("./event.js"), 
    album = require("./album.js"),
    doc = require("./doc.js"),
    post = require("./post.js"),
    file = require("./file.js");

const graphAPIUrl = "https://graph.facebook.com/v2.6/";

module.exports = {
  "getAvailableGroupFields": function getAvailableGroupFields(){
    return [
      "id",
      "cover",
      "description",
      "icon",
      "is_workplace_default",
      "name",
      "owner",
      "privacy",
      "updated_time",
    ];
  },

  "getDefaultGroupFields": function getDefaultGroupFields(){
    return [
      "id",
      "name",
      "privacy",
    ];
  },

  "getGroup": function getGroup(id, fields) {
    if (fields.constructor !== Array) {
      fields = this.getDefaultGroupFields();
    }
    return rp(common.createGetOptions(graphAPIUrl + id, fields));
  },

  "getAllAdmins": function getAllAdmins(id, fields) {
    let url = graphAPIUrl + id + "/admins";
    return member.getEdgeMembers(url, fields);
  },

  "getAllAlbums": function getAllAlbums(id, fields) {
    let url = graphAPIUrl + id + "/albums";
    return album.getEdgeAlbums(url, fields);
  },

  "getAllDocs": function getAllDocs(id, fields) {
    let url = graphAPIUrl + id + "/docs";
    return doc.getEdgeDocs(url, fields);
  },  

  "getAllEvents": function getAllEvents(id, fields) {
    let url = graphAPIUrl + id + "/events";
    return event.getEdgeEvents(url, fields);
  },  

  "getAllFeed": function getAllFeed(id, fields) {
    let url = graphAPIUrl + id + "/feed";
    return post.getEdgePosts(url, fields);
  },

  "getAllFiles": function getAllFiles(id, fields) {
    let url = graphAPIUrl + id + "/files";
    return file.getEdgeFiles(url, fields);
  }, 

  "getAllMemberRequests": function getAllMemberRequests(id, fields) {
    let url = graphAPIUrl + id + "/member_requests";
    return member.getEdgeMembers(url, fields);
  },

  "getAllMembers": function getAllMembers(id, fields) {
    let url = graphAPIUrl + id + "/members";
    return member.getEdgeMembers(url, fields);
  },

  "getAllModerators": function getAllModerators(id, fields) {
    let url = graphAPIUrl + id + "/moderators";
    return member.getEdgeMembers(url, fields);
  }, 

  // Cover cannot be changed after changed by the user
  "updateGroup": function updateGroup(id, name, description) {
    let url = graphAPIUrl + id;
    let qs =  {
                "name": name,
                "description": description, 
              };
    return rp(common.createPostOptions(url,qs));
  },

  "addMemberToGroupById": function addMemberToGroupById(id, memberId) {
    let url = graphAPIUrl + id + "/members/" +  memberId;
    return rp(common.createPostOptions(url,null));
  },
  "addMemberToGroupByEmail": function addMemberToGroupByEmail(id, email) {
    let url = graphAPIUrl + id + "/members";
    let qs =  {
      "email": email,
    };
    return rp(common.createPostOptions(url,qs));
  },
  "removeMemberToGroupById": function removeMemberToGroupById(id, memberId) {
    let url = graphAPIUrl + id + "/members/" +  memberId;
    return rp(common.createDeleteOptions(url,null));
  },
  "removeMemberToGroupByEmail": function removeMemberToGroupByEmail(id, email) {
    let url = graphAPIUrl + id + "/members";
    let qs =  {
      "email": email,
    };
    return rp(common.createDeleteOptions(url,qs));
  },
  "promoteMemberToAdmin": function promoteMemberToAdmin(id, memberId) {
    let url = graphAPIUrl + id + "/admins/" +  memberId;
    return rp(common.createPostOptions(url,null));
  },
  "demoteMemberToAdmin": function demoteMemberToAdmin(id, memberId) {
    let url = graphAPIUrl + id + "/admins/" +  memberId;
    return rp(common.createDeleteOptions(url,null));
  },  
  "post": function post(id, message, link, isMarkdown) {
    let url = graphAPIUrl + id + "/feed";
    let qs =  {
      "message": message,
    };
    if (link){
      qs.link = link;
    }
    if (isMarkdown){
      qs.formatting = "MARKDOWN";
    }
    return rp(common.createPostOptions(url, qs));
  },  
};


