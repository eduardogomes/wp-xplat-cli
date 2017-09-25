var config = require("../../config/config"),
    request = require("request"),
    rp = require("request-promise"),
    member = require("member"), 
    reaction = require("reaction");

const graphAPIUrl = "https://graph.facebook.com/v2.6/";

module.exports = {
  "getAvailablePostFields": function getAvailablePostFields(){
    return [
      "id",
      "created_time",
      "formatting",
      "from",
      "icon",
      "link",
      "message",
      "name",
      "object_id",
      "permalink_url",
      "picture",
      "place",
      "poll",
      "properties",
      "status_type",
      "story",
      "to",
      "type",
      "updated_time",
      "with_tags",
    ];
  },

  "getDefaultPostFields": function getDefaultPostFields(){
    return [
      "id",
      "message",
      "created_time",
    ];
  },
  "getAllLikes": function getAllLikes(id, fields) {
    let url = graphAPIUrl + id + "/likes";
    return reaction.getEdgeReactions(url, fields);
  }, 
  "getAllReactions": function getAllReactions(id, fields) {
    let url = graphAPIUrl + id + "/reactions";
    return reaction.getEdgeReactions(url, fields);
  },
  //TODO: /comments
  
  //TODO: /attachments
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

