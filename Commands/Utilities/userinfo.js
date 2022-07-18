const { ContextMenuInteraction, MessageEmbed } = require("discord.js");
const errorHandler = require("../../Structures/Handlers/error_handler");
const config = require("../../Structures/config.json");
module.exports = {
  name: "userinfo",
  type: "USER",
  contex: true,
  /**
   *
   * @param {ContextMenuInteraction} interaction
   */
  async execute(interaction) {
    try {
      const target = await interaction.guild.members.fetch(
        interaction.targetId
      );

      const res = new MessageEmbed()
        .setColor(config.COLOR_1)
        .setAuthor(
          target.user.tag,
          target.user.avatarURL({ dynamic: true, size: 512 })
        )
        .setThumbnail(target.user.avatarURL({ dynamic: true, size: 512 }))
        .addField("ID:", target.user.id, false)
        .setTimestamp()
        .addField(
          "Roles:",
          `${
            target.roles.cache
              .map((r) => r)
              .join(" ")
              .replace("@everyone", "") || "None"
          }`,
          false
        )
        .addField(
          "Member Since: ",
          `<t:${parseInt(target.joinedTimestamp / 1000)}:R>`,
          false
        )
        .addField(
          "Discord User Since",
          `<t:${parseInt(target.user.createdTimestamp / 1000)}:R>`,
          false
        );
      interaction.reply({ embeds: [res], ephemeral: true });
    } catch (error) {
      errorHandler(interaction, error);
    }
  },
};
