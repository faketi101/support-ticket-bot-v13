const {
  ButtonInteraction,
  MessageActionRow,
  MessageEmbed,
  MessageButton,
  Client,
} = require("discord.js");
const errorHandler = require("../../Structures/Handlers/error_handler");
const ticketDB = require("../../Models/ticketSchema");
const config = require("../../Structures/config.json");
const { createTranscript } = require("discord-html-transcripts");

module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {ButtonInteraction} interaction
   * @param {Client} bot
   */
  async execute(interaction, bot) {
    try {
      if (!interaction.isButton()) return;
      const { guild, channel, customId, member } = interaction;

      if (!["close_report", "lock_report", "unlock_report"].includes(customId))
        return;

      const embed = new MessageEmbed().setColor("BLUE");

      let data = await ticketDB.findOne({ channel_id: channel.id });
      // console.log(data);
      if (!data)
        return interaction.reply({
          content: "Not data found about this ticket. Please delete manually",
          ephemeral: true,
        });

      switch (customId) {
        case "lock_report": {
          if (!member.permissions.has("ADMINISTRATOR"))
            return interaction.reply({
              content: "You dont have permission to use it.",
              ephemeral: true,
            });
          if (data.locked) {
            return interaction.reply({
              content: "Ticket already locked",
              ephemeral: true,
            });
          }
          await ticketDB.updateOne(
            { channel_id: channel.id },
            { $set: { locked: true } }
          );
          embed.setDescription("🔒 This ticket is locked for review.");
          channel.permissionOverwrites.edit(data.member_id, {
            SEND_MESSAGES: false,
          });
          interaction.reply({ embeds: [embed] });
          break;
        }
        case "unlock_report": {
          if (!member.permissions.has("ADMINISTRATOR"))
            return interaction.reply({
              content: "You dont have permission to use it.",
              ephemeral: true,
            });
          if (!data.locked) {
            return interaction.reply({
              content: "Ticket already unlocked",
              ephemeral: true,
            });
          }
          await ticketDB.updateOne(
            { channel_id: channel.id },
            { $set: { locked: false } }
          );
          embed.setDescription("🔓 This ticket is unlocked for user");
          channel.permissionOverwrites.edit(data.member_id, {
            SEND_MESSAGES: true,
          });
          interaction.reply({ embeds: [embed] });
          break;
        }
        case "close_report": {
          if (data.closed) {
            return interaction.reply({
              content: "Ticket already closed. Wait a bit for delete.",
              ephemeral: true,
            });
          }

          const attachment = await createTranscript(channel, {
            limit: -1,
            returnBuffer: false,
            fileName: `${data.type}_${data.ticket_id}.html`,
          });

          await ticketDB.updateOne(
            { channel_id: channel.id },
            { $set: { closed: true } }
          );

          const target_user = guild.members.cache.get(data.member_id);
          if (target_user) {
            let em = embed
              .setAuthor(
                target_user.user.tag,
                target_user.user.avatarURL({ dynamic: true })
              )
              .setFooter({
                text: config.BOT_NAME,
                iconURL: bot.user.avatarURL({ dynamic: true }),
              })
              .setTitle(`Transcript Type: ${data.type}\nID: ${data.ticket_id}`)
              .setTimestamp();
            const message = await guild.channels.cache
              .get(config.TRANSCRIPTID)
              .send({
                embeds: [em],
                files: [attachment],
              });
            interaction.reply({
              embeds: [
                embed.setDescription(
                  `The transcript has saved. [TRANSCRITPT](${message.url})`
                ),
              ],
            });
            try {
              target_user.send({
                embeds: [em],
                files: [attachment],
              });
            } catch (error) {}
            setTimeout(() => {
              try {
                channel.delete();
              } catch (error) {}
            }, 1000 * 10);
            try {
            } catch (error) {}
          } else {
            return interaction.reply({
              content: "User not found. Delete manually",
            });
          }
        }
      }
    } catch (error) {
      errorHandler(interaction, error);
    }
  },
};
