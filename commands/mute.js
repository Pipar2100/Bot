const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send('недостаточно прав!')

    let member = message.guild.member(message.mentions.users.first() || message.guild.members.find(m => m.user.username == args[0] || m.id == args[0]))

    if (!member) return message.channel.send('Укажите существующего пользователя')
    if (member.hasPermission("MANAGE_ROLES")) return message.channel.send('Я не могу заглушить этого пользователя')

    let muterole = message.guild.roles.find(r => r.name == 'Muted')
    if (!muterole) muterole = await message.guild.createRole({
        name: 'Muted',
        color: 0x607d8d
    })
    let reason = args.slice(1).join(' ') || 'Не указана'
    if (member.roles.has(muterole.id)) return message.channel.send('Пользователь уже заглушен')

    let mutechan = bot.channels.cache.get(`768452813432553485`);
    let embed = new Discord.MessageEmbed()
    .setTitle(`${reportUser.user.tag} был замучен игроком ${message.author.tag}`)
    .addField(`**Информация:**`, `**Пользователь: ${message.author.tag}[\`ID: ${message.author.id}\`]\nЗамутил: ${reportUser.user.tag}[\`ID: ${reportUser.id}\`]**`)
    .addField(`**Причина мута:**`, `**\`${reason}\`**`)
    .setFooter(`Bot Pipar100#1186 | Offical Bot`, bot.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
    .setTimestamp()
    .setColor('RANDOM');
    await member.addRole(muterole.id)
    mutechan.send(embed)
}

module.exports.help = {
    name: 'mute'
}