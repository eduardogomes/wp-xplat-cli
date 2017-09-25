var config = require("../../config/config"),
    request = require("request"),
    rp = require("request-promise"), 
    common = require("common");

const graphAPIUrl = "https://graph.facebook.com/v2.6/";
const graphAPIMessageUrl = graphAPIUrl + "me/messages";

module.exports = {
  "getUserName": function getUserName(sender) {
    return rp({
      url: graphAPIUrl + sender,
      qs: {
        access_token: config.page_access_token,
        fields: "first_name,last_name",
      },
      method: "GET",
    })
    .then (function(data) {
      return JSON.parse(data);
    });
  },

  "sendTextMessage": function sendTextMessage(sender, text) {
    let messageData = {
      text: text,
    };
    common.postMessage(sender, messageData);
  },

  "sendAudioMessage": function sendAudioMessage(sender, audioUrl) {
    let messageData = {
      attachment:{
        type: "audio",
        payload: {
          url: audioUrl,
        },
      },
    };
    common.postMessage(sender, messageData);
  },

  "sendFileMessage": function sendFile(sender, fileUrl) {
    let messageData = {
      attachment:{
        type: "file",
        payload: {
          url: fileUrl,
        },
      },
    };
    common.postMessage(sender, messageData);
  },

  "sendVideoMessage": function sendVideo(sender, videoUrl) {
    let messageData = {
      attachment:{
        type: "video",
        payload: {
          url: videoUrl,
        },
      },
    };
    common.postMessage(sender, messageData);
  },

  "sendImageMessage": function sendImage(sender, imageUrl) {
    let messageData = {
      attachment:{
        type: "image",
        payload: {
          url: imageUrl,
        },
      },
    };
    common.postMessage(sender, messageData);
  },

  "createWebUrlTemplate": function createWebUrlTemplate (url, title) {
      return {
        type: "web_url",
        url: url,
        title: title,
      };
  }, 

  "createPostbackTemplate": function createPostbackTemplate (title, payload) {
    return {
      type: "postback",
      title: title,
      payload: payload,
    };
  }, 

  "sendButtonsTemplate": function sendButtonsTemplate(sender, text, buttons) {
    let messageData = {
      attachment:{
        type: "template",
        payload: {
          template_type: "button",
          text: text,
          buttons: buttons,
        },
      },
    };
    common.postMessage(sender, messageData);
  },

  "createCardTemplate": function createCardTemplate (title, subtitle, imageUrl, buttons) {
    return {
      "title": title,
      "subtitle": subtitle,
      "image_url": imageUrl,
      "buttons": buttons,
    };
  }, 

  "createTextQuickReply": function createTextQuickReply (title, payload, imageUrl) {
    let template = {
      "content_type": "text",
      "title": title,
      "payload": payload,
    };
    if (imageUrl)
      template.image_url = imageUrl;

    return template;
  }, 

  "createLocationQuickReply": function createLocationQuickReply () {
    return {
      "content_type": "location",
    };
  }, 
  
  "sendGenericTemplate": function sendGenericTemplate(sender, cards) {
    let messageData = {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "generic",
          "elements": cards,
        },
      },
    };
    common.postMessage(sender, messageData);
  },
  "createSenderActionMarkSeen": () => { return "mark_seen"; },
  "createSenderActionTypingOn": () => { return "typing_on"; },
  "createSenderActionTypingOff": () => { return "typing_off"; },
  
  "sendSenderAction": function sendSenderAction(sender, action){
    request({
      url: graphAPIMessageUrl,
      qs: { access_token: config.page_access_token, },
      method: "POST",
      json: {
        recipient: { id: sender, },
        sender_action: action,
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
