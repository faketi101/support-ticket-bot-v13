const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  guild_id: {
    type: String,
    required: true,
  },
  member_id: {
    type: String,
    required: true,
  },
  ticket_id: {
    type: String,
    required: true,
  },
  channel_id: {
    type: String,
    required: true,
  },

  closed: {
    type: Boolean,
    required: true,
  },
  locked: {
    type: Boolean,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const model = mongoose.model("ticket", schema);
module.exports = model;
