const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    message.delete();
    var kickUser = message.guild.member(message.mentions.users.first() || message.guild.member(args[0]));
    if(!kickUser) return message.reply(`Вы не указали пользователя!`);
    var reason = args.slice(1).join(" ");
    if(!reason) return message.reply(`Вы не указали причину!`);
    if(!message.member.hasPermission(`KICK_MEMBERS`)) return message.reply(`недостаточно прав!`)
    if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply(`недостаточно прав у бота!`)//Проверка на права у бота на сервере
    let reportchan = bot.channels.cache.get(`770575262458314775`);
    let embed = new Discord.MessageEmbed()
    .setTitle(`Вы успешно кикнули пользователя ${kickUser.user.tag}`)
    .setTitle(`Пользователь ${kickUser.user.tag} был кикнут ${message.author.tag}`)
    .addField(`**Информация:**`, `**Игрок: ${message.author.tag}[\`ID: ${message.author.id}\`]\nКикнул пользователя: ${kickUser.user.tag}[\`ID: ${kickUser.id}\`]**`)
    .addField(`**Причина:**`, `**\`${reason}\`**`)
    .setFooter(`Bot Pipar100#1186 | Offical Bot`, bot.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
    .setTimestamp()
    .setColor('RANDOM');
    if(kickUser.user.bot === true) return message.channel.send(`Нельзя кикнуть бота`);//Проверка на бота
    message.guild.member(kickUser).kick(reason);
    reportchan.send(embed);
}
    
    module.exports.help = {
        name: 'kick',
        aliases: []
    };    