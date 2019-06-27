module.exports = {
   
   warn: async function(msg) {
      var warning = warn(msg);
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
   
   var guild = msg.guild;
   let reason = args.slice(1).join(' ')
   let user = msg.mentions.user.first()
   let member = msg.guild.member(user) 

   //if(!(msg.author).hasPermissions('KICK_MEMBERS'))
   if(msg.member.hasPermission('ADMINISTRATOR'))
      return msg.reply('YOU don\'t got the perms dude').catch(console.error)
      // const user = args.member.user
      // const reason = args.reason
      // const executor = msg.member.user

      const embed69 = new Discord.RichEmbed()
         .setColor('#800080')
         .setDescription("**Command: **" + `${config.prefix}warn`)
         .addField("**Usage:**", `${config.prefix}warn <@username> <reason>`)
         .addField("**Example:**", `${config.prefix}warn @AirFusion STAP!`)
         .addField("**Expected Result From Example:**", "Mentioned user should be warned.")
      
      if (args.join(' ') == "" && args2.join(" ") == "") return msg.channel.send({ embed: embed69 })
      if (reason.length < 1) return msg.reply("Reason Required")
      if (msg.mentions.users.size < 1) return msg.reply("You must mention someone to warn them.").catch(console.error)
      if (user === msg.author) return msg.reply("You cannot warn yourself")
      
      const embed = new Discord.RichEmbed()
         .setColor('#800080')
         .setTimestamp()
         .setThumbnail(user.avatarURL)
         .addFeild('Action', 'Warning')
         .addFeild('User:', user.username + '#' + user.discriminator)
         .addFeild('User ID:', user.id)
         .addFeild('Moderator:', msg.author.username + '#' + msg.author.discriminator)
         .addFeild('Reason', reason)
         .addFeild('Server:', msg.guild)

      const embed1 = new Discord.RichEmbed()
         .setColor('#800080')
         .setTimestamp()
         .setThumbnail(user.avatarURL)
         .addFeild('Action', 'Warning')
         .addFeild('User:', user.username + '#' + user.discriminator)
         .addFeild('User ID:', user.id)
         .addFeild('Moderator:', msg.author.username + '#' + msg.author.discriminator)
         .addFeild('Reason', reason)
         .addFeild('Server:', msg.guild)

      msg.channel.send({ embed: embed1 })
      user.send({ embed: embed})
      guild.channels.find(f => f.name === 'staff-logs').send({ embed: embed1}).catch(err => console.error(err));
   
}
