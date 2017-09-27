var config = require("../../config/config"),
    group = require("group"),
    member = require("member"), 
    common = require("common"), 
    rp = require("request-promise");

const graphAPIUrl = "https://graph.facebook.com/v2.6/";

module.exports = {

  "getAllGroups": function getAllGroups(fields) {
    if (fields.constructor !== Array) {
      fields = group.getDefaultGroupFields();
    }    
    let options = {
      url: graphAPIUrl + "community/groups",
      qs: {
        fields: fields.join(),
      },
      headers: {
        "Authorization": config.page_access_token,
      },
      method: "GET",
    };
    let groups = [];

    common.__getAllData(options, groups)
      .then (function(groups) {
        return JSON.parse(groups);
      });
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
    return rp(common.createPostOptions(url,qs))
    .then (function(data) {
      return JSON.parse(data);
    });
  },
};


