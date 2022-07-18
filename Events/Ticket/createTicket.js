const {
    ButtonInteraction,
    MessageActionRow,
    MessageEmbed,
    MessageButton,
    MessageSelectMenu,
    Client,
  } = require("discord.js");
  const errorHandler = require("../../Structures/Handlers/error_handler");
  const ticketDB = require("../../Models/ticketSchema");
  const config = require("../../Structures/config.json");
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
        const { customId, guild, member } = interaction;
        if (!["create_report"].includes(customId))
          return;
        console.log(customId)
        const menus = new MessageActionRow();

        const PROFILE_EMOJI = guild.emojis.cache.find(e=>e.id === config.PROFILE_EMOJI)
        const SCAM_EMOJI = guild.emojis.cache.find(e=>e.id === config.SCAM_EMOJI)
        const VOUCHE_EMOJI = guild.emojis.cache.find(e=>e.id === config.VOUCHE_EMOJI)
        const BUG_EMOJI = guild.emojis.cache.find(e=>e.id === config.BUG_EMOJI)
        const OTHER_EMOJI = guild.emojis.cache.find(e=>e.id === config.OTHER_EMOJI)
        const APPLY_EMOJI = guild.emojis.cache.find(e=>e.id === config.APPLY_EMOJI)

      
        menus.addComponents(
        new MessageSelectMenu()
          .setCustomId("ticket_select")
          .setPlaceholder("Select an Options")
          .addOptions([
            {
              label: "Profile Recovery",
              description: "Report a user",
              value: "profile_recovery",
              emoji: PROFILE_EMOJI
            },
            {
                label: "Apply for Staff",
                description: "Report a user",
                value: "apply_staff",
                emoji: APPLY_EMOJI
              },
            {
              label: "Scam Report",
              description: "Report about a scammer",
              value: "scam_report",
              emoji: SCAM_EMOJI

            },
            {
                label: "Vouche Verify",
                description: "Report any issue.",
                value: "vouche_verify",
                emoji: VOUCHE_EMOJI
                
            },
            {
              label: "Report a bug",
              description: "Report a bug for Reco.",
              value: "bug_report",
              emoji: BUG_EMOJI

            },
            {
              label: "Something else",
              description: "Report any issue.",
              value: "other_report",
              emoji: OTHER_EMOJI

            },
          ])
      );
      let emb = new MessageEmbed()
        .setTitle("Welcome to Reco | Support")
        .setDescription("Choose an option for support")
        .setColor(config.COLOR_1)

       return interaction.reply({embeds: [emb], components:[menus], ephemeral:true})
       
      } catch (error) {
        errorHandler(interaction, error);
      }
    },
  };
  