var reaction = require("./reaction.js"), 
    rp = require("request-promise"),
    common = require("./common.js");

const graphAPIUrl = "https://graph.facebook.com/v2.6/";

module.exports = {
  "getAvailablePostFields": function getAvailablePostFields(){
    return [
      "id",
      "created_time",
      "formatting",
      "from",
      "icon",
      "link",
      "message",
      "name",
      "object_id",
      "permalink_url",
      "picture",
      "place",
      "poll",
      "properties",
      "status_type",
      "story",
      "to",
      "type",
      "updated_time",
      "with_tags",
    ];
  },

  "getDefaultPostFields": function getDefaultPostFields(){
    return [
      "id",
      "message",
      "created_time",
      "story",
    ];
  },

  "getAvailableCommentFields": function getAvailableCommentFields(){
    return [
      "id",
      "message",
      "created_time",
      "from",
    ];
  },

  "getAvailableAttachmentFields": function getAvailableAttachmentFields(){
    return [
      "subattachments",
      "target",
      "title",
      "type",
      "url",
    ];
  },

  "getEdgePosts": function getEdgePosts(url, fields) {
    if (fields.constructor !== Array) {
      fields = this.getDefaultPostFields();
    }    
    let posts = [];

    return common.__getAllData(common.createGetOptions(url, fields), posts);
  }, 

  "getAllLikes": function getAllLikes(id, fields) {
    let url = graphAPIUrl + id + "/likes";
    return reaction.getEdgeReactions(url, fields);
  },

  "getAllReactions": function getAllReactions(id, fields) {
    let url = graphAPIUrl + id + "/reactions";
    return reaction.getEdgeReactions(url, fields);
  },

  //TODO: Currently no support for nested comments in a single call, but id could be either post id or comment id
  "getAllComments": function getAllComments(id) {
    let url = graphAPIUrl + id + "/comments";
    return this.getEdgePosts(url, this.getAvailableCommentFields());
  },
  
  "getAllAttachments": function getAllAttachments(id, fields) {
    if (fields.constructor !== Array) {
      fields = this.getAvailableAttachmentFields();
    }    
    let url = graphAPIUrl + id + "/attachments";
    let attachments = [];
    return common.__getAllData(common.createGetOptions(url, fields), attachments);
  },
  "comment": function comment(id, message) {
    let url = graphAPIUrl + id + "/comments";
    let qs =  {
      "message": message,
    };
    return rp(common.createPostOptions(url, qs));
  },  
};

