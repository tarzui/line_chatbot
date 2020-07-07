const Config = require("../config");
const line = require("@line/bot-sdk");

const client = new line.Client({
  channelAccessToken: Config.channelAccessToken,
});

const replyMessage = (replyToken, message) => {
  return client.replyMessage(replyToken, message).then((r) => {
    console.log("reply : ", r);
    return;
  });
};

const pushMessage = (to, message) => {
  return client.pushMessage(to, message).then((r) => {
    console.log("push : ", r);
    return;
  });
};

const getProfile = (userId) => {
  return client
    .getProfile(userId)
    .then((profile) => {
      return profile;
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { getProfile, pushMessage, replyMessage };
