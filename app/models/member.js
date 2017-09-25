var common = require("common");

//const graphAPIUrl = "https://graph.facebook.com/v2.6/";

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

    common.__getAllData(common.createGetOptions(url, fields), members)
      .then (function(members) {
        return JSON.parse(members);
      });
  }, 

  //TODO: /events

  //TODO: /feed

  //TODO: /conversations

  //TODO: /managers

  //TODO: /reports

  //TODO: /picture
};
