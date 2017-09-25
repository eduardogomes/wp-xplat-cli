var config = require("../../config/config"),
    request = require("request"),
    rp = require("request-promise");

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
      fields = member.getDefaultMemberFields();
    }    
    let url = url;
    let members = [];

    __getAllData(createGetOptions(url, fields), members)
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

