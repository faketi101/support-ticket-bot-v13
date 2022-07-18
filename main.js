const { Client, Collection } = require("discord.js");
const config = require("./Structures/config.json");
const bot = new Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION", "GUILD_MEMBER", "USER"],
  intents: 32767,
});

const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table");

bot.commands = new Collection();
const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");
bot.distube = new DisTube(bot, {
  emitNewSongOnly: true,
  leaveOnFinish: true,
  emitAddSongWhenCreatingQueue: false,
  plugins: [new SpotifyPlugin()],
});
module.exports = bot;
["Events", "Commands"].forEach((handler) => {

  require(`./Structures/Handlers/${handler}`)(bot, PG, Ascii);
});


bot.login(config.TOKEN);
