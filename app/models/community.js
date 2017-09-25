var config = require("../../config/config"),
    request = require("request"),
    rp = require("request-promise"), 
    group = require("group"),
    member = require("member");

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
        'Authorization': config.page_access_token,
      },
      method: "GET",
    }
    let groups = [];

    __getAllData(options, groups)
      .then (function(groups) {
        return JSON.parse(groups);
      });
  },

  "getAllMembers": function getAllMembers(fields) {
    if (fields.constructor !== Array) {
      fields = member.getDefaultMemberFields();
    }    
    let options = {
      url: graphAPIUrl + "community/members",
      qs: {
        fields: fields.join(),
      },
      headers: {
        'Authorization': config.page_access_token,
      },
      method: "GET",
    }
    let members = [];

    __getAllData(options, members)
      .then (function(members) {
        return JSON.parse(members);
      });
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

