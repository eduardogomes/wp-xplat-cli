var config = require("../../config/config"),
    request = require("request"),
    rp = require("request-promise");

const graphAPIUrl = "https://graph.facebook.com/v2.6/";

module.exports = {
  "getAvailableReactionFields": function getAvailableReactionFields(){
    return [
      "id",
      "name",
      "type",
    ];
  },

  "getEdgeReactions": function getEdgeReactions(url, fields) {
    if (fields.constructor !== Array) {
      fields = getAvailableReactionFields();
    }    
    let url = url;
    let reactions = [];

    __getAllData(createGetOptions(url, fields), reactions)
      .then (function(reactions) {
        return JSON.parse(reactions);
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

