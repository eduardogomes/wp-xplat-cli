var common = require("./common.js"), 
    event = require("./event.js"),
    post = require("./post.js");

const graphAPIUrl = "https://graph.facebook.com/v2.6/";

module.exports = {
  "getAvailableMemberFields": function getAvailableMemberFields(){
    return [
      "id",
      "first_name",
      "last_name",
      "email",
      "title",
      "department",
      "employee_number",
      "picture",
      "link",
      "locale",
      "name",
      "name_format",
      "administrator",
      "updated_time",
    ];
  },

  "getDefaultMemberFields": function getDefaultMemberFields(){
    return [
      "id",
      "name",
      "administrator",
    ];
  },

  "getEdgeMembers": function getEdgeMembers(url, fields) {
    if (fields.constructor !== Array) {
      fields = this.getDefaultMemberFields();
    }    
    let members = [];

    return common.__getAllData(common.createGetOptions(url, fields), members);
  }, 

  "getAllEvents": function getAllEvents(id, fields) {
    let url = graphAPIUrl + id + "/events";
    return event.getEdgeEvents(url, fields);
  },  
  
  "getAllFeed": function getAllFeed(id, fields) {
    let url = graphAPIUrl + id + "/feed";
    return post.getEdgePosts(url, fields);
  },  
  
  //TODO: /conversations edge requires an impersonation token, not exposing in the model if no alternate solution available

  "getAllManagers": function getAllManagers(id, fields) {
    let url = graphAPIUrl + id + "/managers";
    return this.getEdgeMembers(url, fields);
  },

  "getAllReports": function getAllReports(id, fields) {
    let url = graphAPIUrl + id + "/reports";
    return this.getEdgeMembers(url, fields);
  },

  "createMemberTag": function createMemberTag(id) {
    return "@[" + id + "]";
  },
};
