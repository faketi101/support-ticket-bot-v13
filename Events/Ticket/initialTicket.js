const {
  MessageActionRow,
  MessageEmbed,
  MessageButton,
  MessageSelectMenu,
  Client,
} = require("discord.js");
const errorHandler = require("../../Structures/Handlers/error_handler");
const ticketDB = require("../../Models/ticketSchema");
const config = require("../../Structures/config.json");
const reportEmbed = require("../../Common/reportEmbeds")
module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {MessageSelectMenu} interaction
   * @param {Client} bot
   */
  async execute(interaction, bot) {
    try {
      if (!interaction.isSelectMenu()) return;
      const { customId, guild, member,values } = interaction;
      const csId = values[0]
      if (!["ticket_select"].includes(customId))
        return;
      // console.log(member)
      const ran_id = Math.floor(Math.random() * 1000 * 90);
      let __parent = ""
      
      let __role = ""
      let __embed = reportEmbed(csId, member.user)


      if(csId === "profile_recovery"){
        __parent = config.PROFILE_PARENT
        __role = config.PROFILE_ROLE
     
      }else if(csId === "apply_staff"){
        __parent = config.APPLY_PARENT
        __role = config.APPLY_ROLE
    


      }else if(csId === "scam_report"){
        __parent = config.SCAM_PARENT
        __role = config.SCAM_ROLE
  

        
      }else if(csId === "vouche_verify"){
        __parent = config.VOUCHE_PARENT
        __role = config.VOUCHE_ROLE
       

        
      }else if(csId === "bug_report"){
        __parent = config.BUG_PARENT
        __role = config.BUG_ROLE
        
        
      }else if(csId === "other_report"){
        __parent = config.OTHER_PARENT
        __role = config.OTHER_ROLE
    
        
      }

      await guild.channels
        .create(`${csId + "__" + ran_id}`, {
          type: "GUILD_TEXT",
          parent: __parent,
          permissionOverwrites: [
            {
              id: member.id,
              allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"],
            },
            {
              id: __role,
              allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"],
            },
            {
              id: config.EVERYONEID,
              deny: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"],
            },
          ],
        })
        .then(async (channel) => {
          let p = await ticketDB.create({
            guild_id: guild.id,
            member_id: member.id,
            ticket_id: ran_id,
            channel_id: channel.id,
            closed: false,
            locked: false,
            type: csId,
          });
          p.save();
          // const embed = new MessageEmbed()
          //   .setAuthor(
          //     guild.name + " | Ticketing System",
          //     guild.iconURL({ dynamic: true })
          //   )
          //   .setDescription(
          //     `Please wait patiently for a response from support team. In the mean while, describe your issue in much detail as possible.`
          //   )
          //   .setTimestamp();
          //   // .setFooter("Buttons below are staff only.");
          // new MessageButton()
          //     .setCustomId("lock_report")
          //     .setLabel("Lock")
          //     .setStyle("PRIMARY")
          //     .setEmoji("🔒"),
          //   new MessageButton()
          //     .setCustomId("unlock_report")
          //     .setLabel("UNLOCK")
          //     .setStyle("PRIMARY")
          //     .setEmoji("🔑")
          const buttons = new MessageActionRow();
          buttons.addComponents(
            new MessageButton()
              .setCustomId("close_report")
              .setLabel("Save and Close Ticket")
              .setStyle("DANGER")
              .setEmoji("📩"),
            
          );
          channel.send({
            embeds: [__embed],
            components: [buttons],
          });
          await channel
            .send({ content: `${member} here is your ticket.` })
            .then((m) => {
              setTimeout(() => {
                m.delete().catch((e) => {});
              }, 1 * 5000);
            });
          return interaction.reply({
            content: `${member} Your ticket has been created: ${channel}`,
            ephemeral: true,
          });
        });
    } catch (error) {
      errorHandler(interaction, error);
    }
  },
};
