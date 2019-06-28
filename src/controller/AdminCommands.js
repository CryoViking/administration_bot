module.exports = {
   
   warn: async function(msg) {
      
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
      var warning = warn(msg,args)
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

async function warn(msg, args) {
   console.log('second function')
   exports.run = function (msg,args) {
      console.log('beep')
      msg.channel.send('booping')
      var guild = msg.guild;
      if (!msg.guild.member(msg.author).hasPermission('KICK_MEMBERS')) return msg.reply('YOU DON\'T GOT THE PERMS').catch(console.error)
      let reason = args.slice(1).join(' ')
      let user = msg.mentions.users.first()
      let member = msg.guild.member(user)
      const embed19 = new Discord.RichEmbed()
         .setColor("#800080")
         .setDescription("**Command: **" + `${config.prefix}warn`)
         .addField("**Usage:**", `${config.prefix}warn <@username> <reason>`)
         .addField("**Example:**", `${config.prefix}warn @xiaonai Spamming!`)
         .addField("**Expected Result From Example:**", "Mentioned user should be warned.")
      if (args.join(' ') == "" && args2.join(" ") == "") return msg.channel.send({ embed: embed19 })
      if (reason.length < 1) return msg.reply("Reason Required")
      if (msg.mentions.users.size < 1) return msg.reply("You must mention someone to warn them.").catch(console.error)
      if (user === msg.author) return msg.reply("You cannot warn yourself")
      const embed = new Discord.RichEmbed()
         .setColor('#8000800')
         .setTimestamp()
         .setThumbnail(user.avatarURL)
         .addField('Action:', "Warning")
         .addField('User:', user.username + '#' + user.discriminator)
         .addField("User ID:", user.id)
         .addField("Moderator:", msg.author.username + "#" + msg.author.discriminator)
         .addField("Reason:", reason)
         .addField("Server:", msg.guild)

      const embed1 = new Discord.RichEmbed()
         .setColor('#8000800')
         .setTimestamp()
         .setThumbnail(user.avatarURL)
         .addField('Action:', "Warning")
         .addField('User:', user.username + '#' + user.discriminator)
         .addField("User ID:", user.id)
         .addField('Moderator:', msg.author.username + "#" + msg.author.discriminator)
         .addField('Reason:', reason)
      msg.channel.send({ embed: embed1 })
      user.send({ embed: embed })
      guild.channels.find(val1 => val1.name === "staff-logs").send({ embed: embed1 }).catch(err => console.error(err));
   };
}

async function ban(msg, args) {
   try {
      //CHECKS IF A USER WAS MENTIONED TO BAN
      if (!args.member) {
         const embed = errorMsg('Member not found')
         return errorMsg //will return to another file tat contains embed settings
      }// END IF

      //CHECKS TO SEE IF THERE WAS REASON FOR BAN
      if (!args.reason) {
         const embed = errorMsg('reason not specified')
         return errorMsg
      }//END IF

      //CHECKS TO SEE IF AUTHOR HAS PERMISSION TO BAN
      if(args.member.hasPermission('KICK_MEMBERS')) {
         const embed = errorMsg('you don\'t got the perms')
         return errorMsg
      }

      //SENDS THE BANNED USER THAT THEY WERE BANNED
      await user.send({
         embed: {
            title: `You have been banned from ${message.guild.name}.`,
            color: colours.red,
            thumbnail: {
               url: message.guild.iconURL
            },
            fields: [
               {
                  name: 'Reason:',
                  value: args.reason
               }
            ],
         }
      })

      //SENDS THE SERVER-LOGS CHANNEL THE BAN MESSAGE
      await message.guild.channels
         .find(c => c.name === channels.ban)//BAN CHANNEL WILL BE SPECIFIED IN FILE TAT CONTAINS EMBED
         .send({
            embed: {
               color: colours.red,
               title: 'Ban',
               description: `${user} has been banned`,
               author: {
                  name: message.member.user.username,
                  icon_url: message.member.user.avatarURL
               },
               fields: [
                  {
                     name: 'Reason:',
                     value: args.reason
                  }
               ],
            }
         })

      //BANS THE USER
      await args.member.ban({
         days: time,
         reason: args.reason
      })
   }//END TRY 
   catch(e) {
      console.log('ban command failed')
   }//END CATCH
}
