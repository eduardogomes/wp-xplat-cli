
var config = require("../../config/config"),
    request = require("request");

module.exports = {
    
    "__getAllData": function __getAllData(options, data) {
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
  },
  "createGetOptions": function createGetOptions(url, fields){
    return {
      url: url,
      qs: {
        fields: fields.join(),
      },
      headers: {
        "Authorization": config.page_access_token,
      },
      method: "GET",
    };
  },
  
  "postMessage": function postMessage(url, sender, messageData) {
      request({
        url: url,
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
  },
};