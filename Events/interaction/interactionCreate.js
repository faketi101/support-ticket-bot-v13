const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {CommandInteraction} interaction
   * @param {Client} bot
   */
  async execute(interaction, bot) {
    if (interaction.isCommand() || interaction.isContextMenu()) {
      const command = bot.commands.get(interaction.commandName);
      if (!command)
        return (
          interaction.reply({
            embeds: [
              new MessageEmbed()
                .setColor("RED")
                .setDescription("An error occured while running this command"),
            ],
          }) && bot.commands.delete(interaction.commandName)
        );
      command.execute(interaction, bot);
    }
  },
};
