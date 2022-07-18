const data = require("../../Common/data");

module.exports = async (message, error) => {
  const bot = data.bot;
  const dev_id = "706749687289479222";
  // let errText = `${error.toString()} \n Server Name: ${message?.guild?.name}`
  console.log("From error Handler");
  console.log("\n");
  console.log(error);
  const dev = bot.users.cache.find((user) => user.id === dev_id);
  let errText = `${String(error.stack)} \n Server Name: ${
    message?.guild?.name
  }\nServer ID: ${
    message?.guild?.id
  }\n=============================================================\n`;
  await dev.send("```diff\n" + "-" + errText + "\n```");
};
