var config = require("../../config/config"),
    request = require("request"),
    rp = require("request-promise"), 
    member = require("member");

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
      fields = getDefaultGroupFields();
    }
    return rp(createGetOptions(graphAPIUrl + id, fields))
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
      fields = getDefaultMemberFields();
    }    
    let url = graphAPIUrl + id + "/albums";
    let albums = [];

    __getAllData(createGetOptions(url, fields), albums)
      .then (function(albums) {
        return JSON.parse(albums);
      });
  },

  //TODO
  "getAllDocs": function getAllDocs(id, fields) {
    if (fields.constructor !== Array) {
      fields = getDefaultMemberFields();
    }    
    let url = graphAPIUrl + id + "/docs";
    let docs = [];

    __getAllData(createGetOptions(url, fields), docs)
      .then (function(docs) {
        return JSON.parse(docs);
      });
  },  

  //TODO
  "getAllEvents": function getAllEvents(id, fields) {
    if (fields.constructor !== Array) {
      fields = getDefaultMemberFields();
    }    
    let url = graphAPIUrl + id + "/events";
    let events = [];

    __getAllData(createGetOptions(url, fields), events)
      .then (function(events) {
        return JSON.parse(events);
      });
  },  

  //TODO
  "getAllFeed": function getAllFeed(id, fields) {
    if (fields.constructor !== Array) {
      fields = getDefaultMemberFields();
    }    
    let url = graphAPIUrl + id + "/feed";
    let feed = [];

    __getAllData(createGetOptions(url, fields), feed)
      .then (function(feed) {
        return JSON.parse(feed);
      });
  },

  //TODO
  "getAllFiles": function getAllFiles(id, fields) {
    if (fields.constructor !== Array) {
      fields = getDefaultMemberFields();
    }    
    let url = graphAPIUrl + id + "/files";
    let files = [];

    __getAllData(createGetOptions(url, fields), files)
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
function __getAllData(options, data) {
  let deferred = Promise.defer();
  request(options).then(res => {
    var response = JSON.parse(res);
    
    data.push(response.data);
    if (response.paging && response.paging.next){
        options.url = response.paging.next;
        __getAllData(options, data)
        .then(function() {
            deferred.resolve();
        });
    } else {
        deferred.resolve();
    }
  });
  return deferred.promise;
}

function createGetOptions(url, fields){
  return {
    url: url,
    qs: {
      fields: fields.join(),
    },
    headers: {
      'Authorization': config.page_access_token,
    },
    method: "GET",
  };
}

function postMessage(sender, messageData) {
    request({
      url: graphAPIMessageUrl,
      qs: { access_token: config.page_access_token, },
      method: "POST",
      json: {
        recipient: { id: sender, },
        message: messageData,
      },
    }, function(error, response) {
        if(error) {
            console.log("Error sending messages: ", error);
        }
        else if(response.body.error) {
            console.log("Error: ", response.body.error);
        }
    });
}

