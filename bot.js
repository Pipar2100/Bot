const { timeStamp } = require("console");
const discord = require("discord.js");
const fs = require("fs");
const config = require("./config.json");
const bot = new discord.Client({disableEveryone: true});

// When bot ready
bot.on("ready", async () => {
  console.log(`Запустился бот ${bot.user.tag}`);
  bot.user.setActivity('?help | Создатель: Pipar100#3483');
});

// Load commands
bot.commands = new discord.Collection();
fs.readdir("./commands/", (err, files) => {
  if (err) console.error(err);
  let jsfiles = files.filter(f => f.split(".").pop() === "js");

  if (jsfiles.length <= 0) return console.log("There are no commands to load...");

  console.log(`Загрузка ${jsfiles.length} команд...`);
  jsfiles.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${i + 1}: ${f} загружено`);
    bot.commands.set(props.help.name, props);
  });
});

// Message event
bot.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  let prefix = config.prefix;
  let messageArray = message.content.split(" ");
  let command = messageArray[0].toLowerCase();
  let args = messageArray.slice(1);

  if (!command.startsWith(prefix)) return;

  let cmd = bot.commands.get(command.slice(prefix.length));
  if (cmd) cmd.run(bot, message, args);
});

bot.on("message", async (message) => {
  if (message.author.bot) return;//Если автор другой бот - нет.
  if (message.channel.type == "dm") return;//Если команда в личку - нет.
  if (message.guild.id != "768452813432553482") return;//Проверяем сервер
  let channelidea = bot.channels.cache.get(`771014999052124190`)
  if(message.channel.id === channelidea.id){
    message.delete();
    let embed = new discord.MessageEmbed()
    .setTitle(`Идея от ${message.author.tag}`)
    .setDescription(`**Суть идеи: \`${message.content}\`**`)
    .addField(`**Описание смайликов**`, `**👍 - хорошая идея\n\n👎 - плохая идея**`)
    .setThumbnail(message.author.avatarURL({format: 'png', dynamic: true, size: 1024}))
    .setTimestamp()
    .setColor('RANDOM');
    channelidea.send("**Внимание! <@&768456304351248395> была предложена новая идея, рассмотрите её**", embed).then(async(msg) => {
      await msg.react("👍");
      await msg.react("👎");
    });
  }
});

bot.on('messageUpdate', async (oldmsg, newmsg) => {
  let embed = new Discord.RichEmbed()
   .setAuthor('Сообщение изменено', newmsg.guild.iconURL)
   .addField('Отправитель', oldmsg.member, true)
   .addField('Канал', oldmsg.channel, true)
   .addField('Раньше', oldmsg.content)
   .addField('Сейчас', newmsg.content)
   .setColor('RANDOM')
   .setTimestamp()
   client.channels.cache.get("770676778070179841").send(embed);
})

bot.on('messageDelete', async message => {
   let embed = new Discord.RichEmbed()
       .setAuthor('Сообщение удалено', message.guild.iconURL)
       .addField('Отправитель', message.member, true)
       .addField('Канал', message.channel, true)
       .addField('Содержание', message.content)
       .setColor('RANDOM')
       .setTimestamp()
       client.channels.cache.get("770676778070179841").send(embed);
})

bot.on('guildMemberAdd', async member => {
   let role = member.guild.roles.find(r => r.name == 'Community')
   let channel = member.guild.channels.find(c => c.name == 'actions')

   let embed =  new Discord.RichEmbed()
       .setAuthor(`Участник ${member.user.username} присоединился на сервер`, member.user.avatarURL)
       .setDescription(`${member.user.username}#${member.user.discriminator} (${member})`)
       .setColor('RANDOM')
       .setFooter(`ID: ${member.id}`)
       .setTimestamp()
       client.channels.cache.get("770676778070179841").send(embed);
   await member.addRole(role.id)
})

bot.on('guildMemberRemove', async member => {
   let embed = new Discord.RichEmbed()
       .setAuthor(`Участник ${message.author.tag} вышел с сервера`, member.user.avatarURL)
       .setDescription(`${member.user.username}#${member.user.discriminator} (${member.id})`)
       .setColor('RANDOM')
       .setFooter(`ID: ${member.id}`)
       .setTimestamp()
       client.channels.cache.get("770676778070179841").send(embed);
})

bot.login(config.token);