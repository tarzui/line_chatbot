const express = require("express");
// const { replyMessage, pushMessage, getProfile } = require("./api_line_message");
const Config = require("../config");
const Client = require("@line/bot-sdk").Client;

const client = new Client({
  channelAccessToken: Config.channelAccessToken,
  channelSecret: Config.channelSecret,
});

const router = express.Router();

router.post("/", (req, res) => {
  const event = req.body.events[0];
  client.replyMessage(event.replyToken, {
    type: "text",
    text: `I'm TaR Bot Test you Said : ${event.message.text}`,
  });
  return;
});

// router.post("/webhook", async (req, res) => {
//   console.log("webhook");
// });

module.exports = router;
