const { MessageEmbed } = require("discord.js");
const config = require("../Structures/config.json");
module.exports = (type, user) => {
  if (type === "profile_recovery") {
    const embed = new MessageEmbed()
      .setColor(config.COLOR_1)
      .setTitle("Account Recovery")
      .setDescription(
        "While you waiting for our staff, **Please Fill This Form**\n```Profile Token Generated by Reco Bot\n\nAccount Tag:\nAccount ID:```\n**NOTE**\n- Fill the form or we will not handle your request.\n- Please be Patient"
      )
      .setTimestamp()
      .setFooter({
        text: `${user.username}#${user.discriminator}`,
        iconURL: user.avatarURL({ dynamic: true }),
      });
    return embed;
  } else if (type === "scam_report") {
    const embed = new MessageEmbed()
      .setColor(config.COLOR_1)
      .setTitle("Report a Scammer")
      .setFooter({text: `${user.username}#${user.discriminator}`, iconURL: user.avatarURL({dynamic:true})})
      .setDescription(
        "While you waiting for our staff, **Please Fill This Form**\n```Accused ID:\nAccused Tag:\n\nVictim ID:\nVictim Tag:\n\nExplaination of the Situation:\nExplaination of the Payment:\nProof of the Accusation:\n\nAny Additional Details:```\n**NOTE**\n- Fill the form or we will not handle your request.\n- Please be Patient"
      )
      .setTimestamp();
    return embed;
  } else if (type === "vouche_verify") {
    const embed = new MessageEmbed()
      .setColor(config.COLOR_1)
      .setFooter({text: `${user.username}#${user.discriminator}`, iconURL: user.avatarURL({dynamic:true})})
      .setTitle("Vouch Verify")
      .setDescription(
        "While you waiting for our staff, **Please Fill This Form**\n```Vouch ID :\n\nPayment Proof:```\n**NOTE**\n- Fill the form or we will not handle your request.\n- Please be Patient"
      )
      .setTimestamp();
    return embed;
  } else if (type === "bug_report") {
    const embed = new MessageEmbed()
      .setColor(config.COLOR_1)
      .setFooter({text: `${user.username}#${user.discriminator}`, iconURL: user.avatarURL({dynamic:true})})
      .setTitle("Account Recovery")
      .setDescription(
        "While you waiting for our staff, **Please Fill This Form**\n```Bug Type:\nDetail about the Bug:\n\n```\n**NOTE**\n- Fill the form or we will not handle your request.\n- Please be Patient"
      )
      .setTimestamp();
    return embed;
  } else if (type === "other_report") {
    const embed = new MessageEmbed()
      .setColor(config.COLOR_1)
      .setFooter({text: `${user.username}#${user.discriminator}`, iconURL: user.avatarURL({dynamic:true})})
      .setTitle("Account Recovery")
      .setDescription(
        "While you waiting for our staff, **Please Fill This Form**\n```Help Type:```\n**NOTE**\n- Fill the form or we will not handle your request.\n- Please be Patient"
      )
      .setTimestamp();
    return embed;
  } else if (type === "apply_staff") {
    const embed = new MessageEmbed()
      .setColor(config.COLOR_1)
      .setTitle("Apply for Staff")
      .setFooter({text: `${user.username}#${user.discriminator}`, iconURL: user.avatarURL({dynamic:true})})
      .setDescription(
        "**Please wait for our staff to respond**\n**NOTE**\n- Please be Patient"
      )
      .setTimestamp();
    return embed;
  }
};
