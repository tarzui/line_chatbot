const express = require("express");
// const { replyMessage, pushMessage, getProfile } = require("./api_line_message");
const Config = require("../config");
const Client = require("@line/bot-sdk").Client;
const axios = require("axios");
const client = new Client({
  channelAccessToken: Config.channelAccessToken,
  channelSecret: Config.channelSecret,
});

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Hello line bot");
});

router.post("/", (req, res) => {
  const event = req.body.events[0];

  let data = JSON.stringify({
    query:
      "query message($message:String!){\n    message(message:$message){\n    data{\n      found\n      intent\n      confidence\n    }\n  }\n}",
    variables: { message: `${event.message.text}` },
  });

  var config = {
    method: "post",
    url: "http://103.245.164.59:3004/api_management",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data.data.message.data.intent));
      let rep = response.data.data.message.data.intent;
      client.replyMessage(event.replyToken, {
        type: "text",
        text: `${rep}`,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  // client.replyMessage(event.replyToken, {
  //   type: "text",
  //   text: `I'm TaR Bot Test you Said : ${event.message.text}`,
  // });
  return;
});

// router.post("/webhook", async (req, res) => {
//   console.log("webhook");
// });

module.exports = router;
