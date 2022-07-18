const { Perms } = require("../Validation/Permissions");
const { Client } = require("discord.js");

const config = require("../config.json");
/**
 * @param {Client} bot
 */
module.exports = async (bot, PG, Ascii) => {
  const Table = new Ascii("Commands Loaded");
  let CommandsArray = [];
  (await PG(`${process.cwd().replace(/\\/g, "/")}/Commands/*/*.js`)).map(
    async (file) => {
      const command = require(file);

      if (!command.name) {
        return Table.addRow(file.split("/")[7], "MISSING", "Missing a name");
      }
      if (!command.contex && !command.description) {
        return Table.addRow(command.name, "MISSING", "Missing a description");
      }

      if (command.permission) {
        if (Perms.includes(command.permission)) {
          command.defaultPermission = false;
        } else {
          return Table.addRow(command.name, "MISSING", "Permission is invalid");
        }
      }

      bot.commands.set(command.name, command);
      CommandsArray.push(command);
      await Table.addRow(command.name, `☑ SUCCESSFULL`);
    }
  );

  console.log(Table.toString());

  //PERMISSIONS CHECK

  bot.on("ready", async () => {
    const MainGuild = await bot.guilds.cache.get(config.MAIN_GUILD);
    MainGuild.commands.set(CommandsArray).then(async (command) => {
      const Roles = (commandName) => {
        const cmdPerms = CommandsArray.find(
          (c) => c.name === commandName
        ).permission;
        if (!cmdPerms) return null;
        return MainGuild.roles.cache.filter((r) => r.permissions.has(cmdPerms));
      };

      const fullPermissions = command.reduce((acc, r) => {
        const roles = Roles(r.name);
        if (!roles) return acc;
        const permissions = roles.reduce((a, r) => {
          return [...a, { id: r.id, type: "ROLE", permission: true }];
        }, []);

        return [...acc, { id: r.id, permissions }];
      }, []);
      //   console.log(fullPermissions);
      try {
        await MainGuild.commands.set(CommandsArray);
        // await MainGuild.commands.permissions.set({
        //   fullPermissions,
        // });
        bot.application.commands.set(commandsArray);
      } catch (error) {
        // console.log(error);
        // console.log("Method not allow error");
      }
    });
  });
};
