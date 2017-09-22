var express = require("express"),
    router = express.Router(),
    config = require("../../config/config"),
    fb = require("../helpers/work-chat");

module.exports = function (app) {
  app.use("/", router);
};

// Facebook verification
router.get("/webhook/", function (req, res) {
  if (req.query["hub.verify_token"] === config.verify_token) {
    res.send(req.query["hub.challenge"]);
  }
  res.send("Error, wrong token");
});

router.post("/webhook/", function (req, res) {
  let messaging_events = req.body.entry[0].messaging;

  for (let i = 0; i < messaging_events.length; i++) {
    let event = req.body.entry[0].messaging[i];
    let sender = event.sender.id;

    // Handle receipt of a message
    if (event.message && event.message.text) {
      let text = event.message.text;

      fb.sendSenderAction(sender, fb.createSenderActionMarkSeen());
      // Echo the text the user sent.
      fb.sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200));
    }

    // Handle receipt of a postback
    if (event.postback) {
      let text = JSON.stringify(event.postback);
      fb.sendTextMessage(sender, "Postback received: " + text.substring(0, 200));
      continue;
    }

  }
  res.sendStatus(200);

});
