const { Events } = require("../Validation/EventNames");

module.exports = async (bot, PG, Ascii) => {
  const Table = new Ascii("Events Loaded");
  (await PG(`${process.cwd().replace(/\\/g, "/")}/Events/*/*.js`)).map(
    async (file) => {
      const event = require(file);
      // console.log(file);
      if (!Events.includes(event.name) || !event.name) {
        const L = file.split("/");
        await Table.addRow(
          `${event.name || "MISSING"}`,
          `🔴 Event Name Invalid or Missing: ${L[6] + `/` + L[7]}`
        );
        return;
      }
      if (event.once) {
        bot.once(event.name, (...args) => event.execute(...args, bot));
      } else {
        bot.on(event.name, (...args) => event.execute(...args, bot));
      }
      await Table.addRow(event.name, `☑ SUCCESSFULL`);
    }
  );

  console.log(Table.toString());
};
