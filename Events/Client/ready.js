const { Client } = require("discord.js");
const mongoose = require("mongoose");
const config = require("../../Structures/config.json");
const data = require("../../Common/data");

module.exports = {
  name: "ready",
  once: true,
  execute(bot) {
    console.log(`BOT ${bot.user.username} is online...`);
    bot.user.setActivity("Support", { type: "WATCHING" });
    data.bot = bot;
    
    if (!config.DB_CONNECT) return;
    mongoose
      .connect(config.DB_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Database Connected...");
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
