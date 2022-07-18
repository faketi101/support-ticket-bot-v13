const errorHandler = require("../Structures/Handlers/error_handler");

const replay_data = require("../Models/replaySchema");
module.exports = async (message, bot) => {
  try {
    const dev_id = "706749687289479222";
    // console.log(message.author.id);
    // console.log(message.author.id === dev_id);
    if (message.author.id !== dev_id) return;
    // console.log(message.reference);
    // console.log(message.channel);

    const replying_id = message.reference.messageId;
    const replay_message = await message.channel.messages.cache.find(
      (m) => m.id === replying_id
    );

    if (replay_message) {
      let mess_info = await replay_data.findOne({
        replay_message: replying_id,
      });
      //   console.log(mess_info);
      if (mess_info) {
        let channel = await bot.channels.cache.find(
          (ch) => ch.id === mess_info.channel_id
        );
        if (channel) {
          console.log("channel found");
          let mess = await channel.messages.cache.find(
            (m) => m.id === mess_info.origin_message
          );
          if (mess) {
            try {
              await mess.reply(message);
              await message.reply("Message sent.");
            } catch (error) {
              await message.reply("```Blocked by user```");
            }
          } else {
            message.reply("Message Not found");
          }
        } else {
          message.reply("Channel Not found");
        }
      } else {
        message.reply("Database Message Not found");
      }
    } else {
      message.reply("Reply Message Not found");
    }
  } catch (error) {
    errorHandler(message, error);
  }
};
