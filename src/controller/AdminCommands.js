module.exports = {
   
   warn: async function(msg) {
      var warning = warn(msg)
      console.log('the first function')
      args: [
         {
            id: 'member',
            type: 'member'
         },
         {
            id: 'reason',
            match: 'rest'
         }
      ]
   }
   /*
   constructor () {
      super('warn', {
      aliases: ['warn'],
      category: 'moderation',
      description:
         'Warns a user, and bans them if the maximum warns has' +
         ' been exceeded',
      args: [
         {
            id: 'member',
            type: 'member'
         },
         {
            id: 'reason',
            match: 'rest'
         }
      ],
      clientPermissions: ['KICK_MEMBERS'],
      userPermissions: ['KICK_MEMBERS'],
      channelRestriction: 'guild'
      }) //END SUPER()
   } //END CONSTRUCTOR
   */
}

function warn(msg, args) {
   console.log('second function')
   exports.run = function (msg,args) {
      console.log('beep')
      msg.channel.send('booping')
      var guild = msg.guild;
      logger.log('info', `Warn command used by ${msg.author.tag} ID: ${msg.author.id} Time: ${Date()} Guild: ${guild}`)
      if (!msg.guild.member(msg.author).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return msg.reply('Insufficant Permissions').catch(console.error)
      const Discord = require('discord.js');
      const config = require("../config.json");
      let reason = args.slice(1).join(' ')
      let user = msg.mentions.users.first()
      let member = msg.guild.member(user)
      const embed19 = new Discord.RichEmbed()
         .setColor("#f0ffff")
         .setDescription("**Command: **" + `${config.prefix}warn`)
         .addField("**Usage:**", `${config.prefix}warn <@username> <reason>`)
         .addField("**Example:**", `${config.prefix}warn @xiaonai Spamming!`)
         .addField("**Expected Result From Example:**", "Mentioned user should be warned.")
      if (args.join(' ') == "" && args2.join(" ") == "") return msg.channel.send({ embed: embed19 })
      if (reason.length < 1) return msg.reply("Reason Required")
      if (msg.mentions.users.size < 1) return msg.reply("You must mention someone to warn them.").catch(console.error)
      if (user === msg.author) return msg.reply("You cannot warn yourself")
      const embed = new Discord.RichEmbed()
         .setColor('#ff9966')
         .setTimestamp()
         .setThumbnail(user.avatarURL)
         .addField('Action:', "Warning")
         .addField('User:', user.username + '#' + user.discriminator)
         .addField("User ID:", user.id)
         .addField("Moderator:", msg.author.username + "#" + msg.author.discriminator)
         .addField("Reason:", reason)
         .addField("Server:", msg.guild)

      const embed1 = new Discord.RichEmbed()
         .setColor('#ff9966')
         .setTimestamp()
         .setThumbnail(user.avatarURL)
         .addField('Action:', "Warning")
         .addField('User:', user.username + '#' + user.discriminator)
         .addField("User ID:", user.id)
         .addField("Moderator:", msg.author.username + "#" + msg.author.discriminator)
         .addField("Reason:", reason)
      msg.channel.send({ embed: embed1 })
      user.send({ embed: embed })
      guild.channels.find(val1 => val1.name === "staff-logs").send({ embed: embed1 }).catch(err => console.error(err));
   };
}
