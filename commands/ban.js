const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('Недостаточно прав!')
    else if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send('Недостаточно прав!')

    let member = message.guild.member(message.mentions.users.first() || message.guild.members.find(m => m.user.username == args[0] || m.id == args[0]))
    if (!member) return message.channel.send('Укажите существующего пользователя')
    else if (member.hasPermission("BAN_MEMBERS")) return message.channel.send('Я не могу исплючить этого пользователя')

    let reason = args.slice(1).join(' ') || 'Не указана'

    let banchan = bot.channels.cache.get(`768452813432553485`);
    let embed = new Discord.MessageEmbed()
    .setTitle(`${reportUser.user.tag} был забанен от ${message.author.tag}`)
    .addField(`**Информация:**`, `**Пользователь: ${message.author.tag}[\`ID: ${message.author.id}\`]\nЗабанел: ${reportUser.user.tag}[\`ID: ${reportUser.id}\`]**`)
    .addField(`**Причина бана:**`, `**\`${reason}\`**`)
    .setFooter(`Bot Pipar100#1186 | Offical Bot`, bot.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
    .setTimestamp()
    .setColor('RANDOM');
    await member.ban(reason)
    banchan.send(embed)
}
    
module.exports.help = {
    name: 'ban',
    aliases: []
};    