var member = require("member"), 
    rp = require("request-promise"),
    common = require("common");

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

  "getGroup": function getAllGroups(id, fields) {
    if (fields.constructor !== Array) {
      fields = this.getDefaultGroupFields();
    }
    return rp(common.createGetOptions(graphAPIUrl + id, fields))
    .then (function(data) {
      return JSON.parse(data);
    });
  },

  "getAllAdmins": function getAllAdmins(id, fields) {
    let url = graphAPIUrl + id + "/admins";
    return member.getEdgeMembers(url, fields);
  },

  //TODO
  "getAllAlbums": function getAllAlbums(id, fields) {
    if (fields.constructor !== Array) {
      fields = this.getDefaultMemberFields();
    }    
    let url = graphAPIUrl + id + "/albums";
    let albums = [];

    common.__getAllData(common.createGetOptions(url, fields), albums)
      .then (function(albums) {
        return JSON.parse(albums);
      });
  },

  //TODO
  "getAllDocs": function getAllDocs(id, fields) {
    if (fields.constructor !== Array) {
      fields = this.getDefaultMemberFields();
    }    
    let url = graphAPIUrl + id + "/docs";
    let docs = [];

    common.__getAllData(common.createGetOptions(url, fields), docs)
      .then (function(docs) {
        return JSON.parse(docs);
      });
  },  

  //TODO
  "getAllEvents": function getAllEvents(id, fields) {
    if (fields.constructor !== Array) {
      fields = this.getDefaultMemberFields();
    }    
    let url = graphAPIUrl + id + "/events";
    let events = [];

    common.__getAllData(common.createGetOptions(url, fields), events)
      .then (function(events) {
        return JSON.parse(events);
      });
  },  

  //TODO
  "getAllFeed": function getAllFeed(id, fields) {
    if (fields.constructor !== Array) {
      fields = this.getDefaultMemberFields();
    }    
    let url = graphAPIUrl + id + "/feed";
    let feed = [];

    common.__getAllData(common.createGetOptions(url, fields), feed)
      .then (function(feed) {
        return JSON.parse(feed);
      });
  },

  //TODO
  "getAllFiles": function getAllFiles(id, fields) {
    if (fields.constructor !== Array) {
      fields = this.getDefaultMemberFields();
    }    
    let url = graphAPIUrl + id + "/files";
    let files = [];

    common.__getAllData(common.createGetOptions(url, fields), files)
      .then (function(files) {
        return JSON.parse(files);
      });
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
};


