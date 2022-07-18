const errorHandler = require("../Structures/Handlers/error_handler");
const replay_data = require("../Models/replaySchema");
const Discord = require("discord.js");
module.exports = async (message, bot) => {
  try {
    // console.log("dm called")
    const dev_id = "706749687289479222";
    const me = await bot.users.cache.find((user) => user.id === dev_id);

    if (message.author.id === dev_id || message.author.id === bot.user.id)
      return;
    // console.log(message.content);
    const user = message.author;
    const attachment = message.attachments.first();

    // console.log(bot.id);
    const embed = new Discord.MessageEmbed()
      .setColor("#fffff")
      .setTitle(`New DM from ${user.username}#${user.discriminator}`)
      .addField("Message:", "===================================", false)
      .addField("Content: \n", message.content || "Not Found!", false)
      .setThumbnail(user.avatarURL())
      .setTimestamp()
      .addField(
        "Message Details:",
        `Message Id: ${message.id}\nMessage author: ${user.username}#${user.discriminator}\nMessage author Id: ${user.id}`,
        false
      );

    if (message.attachments.size !== 0) {
      embed.setImage(attachment.url || "Not Found!");
    }
    // console.log(me)
    //   console.log(message.channel);
    let send_message = await me.send({ embeds: [embed] });
    let obj = {
      replay_message: send_message.id,
      origin_message: message.id,
      message_user: user.id,
      channel_id: message.channel.id,
    };
    let data = await replay_data.create(obj);
    data.save();
    // console.log(obj);
  } catch (error) {
    errorHandler(message, error);
  }
};
