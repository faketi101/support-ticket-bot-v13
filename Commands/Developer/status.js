const { Client, MessageEmbed, CommandInteraction } = require("discord.js");
const { connection } = require("mongoose");
require("../../Events/Client/ready");
module.exports = {
  name: "status",
  description: "Displays the status of bot and database connection.",
  permission: "ADMINISTRATOR",
  /**
   *
   * @param {Client} bot
   * @param {CommandInteraction} interaction
   */
  async execute(interaction, bot) {
    const res = new MessageEmbed()
      .setColor("#95d600")
      .setTimestamp()
      .setDescription(
        `**BOT** \`🟢 ONLINE\` - \`${
          bot.ws.ping
        }ms\`\n**Uptime**: <t:${parseInt(
          bot.readyTimestamp / 1000
        )}:R> \n**DATABASE**: \`${switchTo(connection.readyState)}\``
      );
    interaction.reply({ embeds: [res] });
  },
};

function switchTo(val) {
  var status = "";

  switch (val) {
    case 0:
      status = `🔴 DISCONNECTED`;
      break;
    case 1:
      status = `🟢 CONNECTED`;
      break;
    case 2:
      status = `🔵 CONNECTING...`;
      break;
    case 2:
      status = `🟠 DISCONNECTING...`;
      break;
  }
  return status;
}
