var reaction = require("reaction");

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
    ];
  },
  "getAllLikes": function getAllLikes(id, fields) {
    let url = graphAPIUrl + id + "/likes";
    return reaction.getEdgeReactions(url, fields);
  }, 
  "getAllReactions": function getAllReactions(id, fields) {
    let url = graphAPIUrl + id + "/reactions";
    return reaction.getEdgeReactions(url, fields);
  },
  //TODO: /comments
  
  //TODO: /attachments
};

