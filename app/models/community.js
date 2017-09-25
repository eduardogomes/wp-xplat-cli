var config = require("../../config/config"),
    group = require("group"),
    member = require("member"), 
    common = require("common");

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
};


