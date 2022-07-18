const {
  MessageEmbed,
  CommandInteraction,
  MessageActionRow,
  MessageButton,
  Client,
  MessageSelectMenu,
} = require("discord.js");

const config = require("../../Structures/config.json");
const errorHandler = require("../../Structures/Handlers/error_handler");

module.exports = {
  name: "micket",
  description: "Setup your ticketing message.",
  permission: "ADMINISTRATOR",
  /**
   *
   * @param {CommandInteraction} interaction
   * @param {Client} bot
   */
  async execute(interaction, bot) {
    try {
      const { guild } = interaction;
      const embed = new MessageEmbed()
        .setColor("#36393f")
        .setAuthor(
          guild.name + " | Support Ticketing System",
          guild.iconURL({ dynamic: true })
        )
        .setDescription(
          `Open a ticket to discuss any of the issues listen on the button.`
        );
      const n_btn = new MessageActionRow();
      n_btn.addComponents(
        new MessageButton()
          .setCustomId("create_report")
          .setLabel("Create Ticket")
          .setStyle("SUCCESS")
          .setEmoji("🎫")
      );

      await guild.channels.cache
        .get(config.OPENID)
        .send({ embeds: [embed], components: [n_btn] });

      return interaction.reply({ content: "Ticket init.", ephemeral: true });
    } catch (error) {
      errorHandler(interaction, error);
    }
  },
};
