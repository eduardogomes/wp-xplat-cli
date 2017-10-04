var group = require("./group.js"),
    member = require("./member.js"), 
    common = require("./common.js"), 
    rp = require("request-promise");

const graphAPIUrl = "https://graph.facebook.com/v2.6/";

module.exports = {

  "getAllGroups": function getAllGroups(fields) {
    if (fields.constructor !== Array) {
      fields = group.getDefaultGroupFields();
    }    
    let url = graphAPIUrl + "community/groups";
    let groups = [];
    
    return common.__getAllData(common.createGetOptions(url, fields), groups);
  },

  "getAllMembers": function getAllMembers(fields) {
    let url = graphAPIUrl + "community/members";
    return member.getEdgeMembers(url, fields);
  },

  "createNewGroup": function createNewGroup(name, description, privacy, cover_url) {
    let url = graphAPIUrl + "community/groups";
    let qs = {
                "name": name,
                "description": description, 
                "privacy": privacy,
                "cover_url": encodeURI(cover_url),
              };
    return rp(common.createPostOptions(url,qs));
  },
  "getGroupPrivacyOpen": () => { return "OPEN"; },
  "getGroupPrivacyClosed": () => { return "CLOSED"; },
  "getGroupPrivacySecret": () => { return "SECRET"; },
  
};


