const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

        message.delete();
        if(message.channel.id != "771022386291408928") return;
        var reportUser = message.guild.member(message.mentions.users.first() || message.guild.member(args[0]));
        if(!reportUser) return message.reply(`Вы не указали пользователя!`);
        var reason = args.slice(1).join(" ");
        if(!reason) return message.reply(`Вы не указали причину!`);
        let reportchan = bot.channels.cache.get(`768452813432553485`);
        let embed = new Discord.MessageEmbed()
        .setTitle(`Жалоба на ${reportUser.user.tag} от ${message.author.tag}`)
        .addField(`**Информация:**`, `**Пользователь: ${message.author.tag}[\`ID: ${message.author.id}\`]\nПожаловался на: ${reportUser.user.tag}[\`ID: ${reportUser.id}\`]**`)
        .addField(`**Причина жалобы:**`, `**\`${reason}\`**`)
        .setFooter(`Bot Pipar100#1186 | Offical Bot`, bot.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
        .setTimestamp()
        .setColor('RANDOM');
        reportchan.send(embed)
    }

    module.exports.help = {
      name: 'report',
      aliases: []
  };    