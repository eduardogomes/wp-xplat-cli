var config = require("../../config/config.js"),
    request = require("request-promise"), 
    common = require("./common.js");

const graphAPIUrl = "https://graph.facebook.com/v2.6/";
const graphAPIMessageUrl = graphAPIUrl + "me/messages";

module.exports = {
  "getUserName": function getUserName(sender) {
    return request({
      url: graphAPIUrl + sender,
      headers: {
        "Authorization": config.page_access_token,
      },      
      qs: {
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
    return common.postMessage(graphAPIMessageUrl, sender, messageData);
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
    return common.postMessage(graphAPIMessageUrl, sender, messageData);
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
    return common.postMessage(graphAPIMessageUrl, sender, messageData);
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
    return common.postMessage(graphAPIMessageUrl, sender, messageData);
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
    return common.postMessage(graphAPIMessageUrl, sender, messageData);
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
      payload: JSON.stringify(payload),
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
    return common.postMessage(graphAPIMessageUrl, sender, messageData);
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
      "payload": JSON.stringify(payload),
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

  "sendQuickReplies": function sendQuickReplies(sender, title, quickReplies) {
    let messageData = {
      text: title,
      quick_replies: quickReplies,
    };
    return common.postMessage(graphAPIMessageUrl, sender, messageData);
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
    return common.postMessage(graphAPIMessageUrl, sender, messageData);
  },
  "createSenderActionMarkSeen": () => { return "mark_seen"; },
  "createSenderActionTypingOn": () => { return "typing_on"; },
  "createSenderActionTypingOff": () => { return "typing_off"; },
  
  "sendSenderAction": function sendSenderAction(sender, action){
    return request({
      url: graphAPIMessageUrl,
      headers: {
        "Authorization": config.page_access_token,
        "Content-Type": "application/json",
      },
      method: "POST",
      json: {
        recipient: sender,
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
  "createSenderFromId": function createSenderFromId(userId){
    return { id: userId, };
  },
  "createSenderFromThread": function createSenderFromThread(threadId){
    return { thread_key: threadId, };
  },
  "createSenderFromUserIdArray": function createSenderFromThread(userIdArray){
    if (userIdArray.constructor !== Array) {
      throw new Error("userIdArray should be an array of userIds");
    }
    return { ids: userIdArray, };
  },

  "renameThread": function renameThread(threadId, newName){
    let url = graphAPIMessageUrl + "t_" + threadId + "/threadname";
    let options = common.createPostOptions(url,null);
    options.json = {
      name: newName,
    };
    return request(options, function(error, response) {
        if(error) {
            console.log("Error renaming thread: ", error);
        }
        else if(response.body.error) {
            console.log("Error: ", response.body.error);
        }
    });
  },
  "addThreadParticipants": function addThreadParticipant(threadId, userIdArray){
    if (userIdArray.constructor !== Array) {
      throw new Error("userIdArray should be an array of userIds");
    }
    let url = graphAPIMessageUrl + "t_" + threadId + "/participants";
    let options = common.createPostOptions(url,null);
    options.json = {
      to: userIdArray,
    };
    return request(options, function(error, response) {
        if(error) {
            console.log("Error renaming thread: ", error);
        }
        else if(response.body.error) {
            console.log("Error: ", response.body.error);
        }
    });
  },
  "removeThreadParticipants": function removeThreadParticipant(threadId, userIdArray){
    if (userIdArray.constructor !== Array) {
      throw new Error("userIdArray should be an array of userIds");
    }
    let url = graphAPIMessageUrl + "t_" + threadId + "/participants";
    let options = common.createDeleteOptions(url,null);
    options.json = {
      to: userIdArray,
    };
    return request(options, function(error, response) {
        if(error) {
            console.log("Error renaming thread: ", error);
        }
        else if(response.body.error) {
            console.log("Error: ", response.body.error);
        }
    });
  },
};
