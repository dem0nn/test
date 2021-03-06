const Discord = require('discord.js');
const config = require(rootDir + "config.json");
const errors = require(rootDir + "utilities/errors.js");

module.exports.run = async(client, message, args) =>{
    let Permission = message.member.hasPermission('ADMINISTRATOR', require, true, false)
    console.log(Permission)
    if(!Permission) return errors.noPerms(message, 'ADMINISTRATOR');
    if(!args[0]) return message.channel.send('Specify a number to clear.')
    if(args[0] > 100) return message.channel.send('Number to clear must be less than 100.')
    toDelete = args[0]
    message.delete().catch(console.error);
    message.channel.bulkDelete(toDelete).then (() =>{
        const embed = new Discord.RichEmbed()
      .setDescription ("Clear Performed")
      .setColor (config.blue)
      .setAuthor (`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL)
      .addField ('Cleared By', `${message.author} whose ID is ${message.author.id}`)
      .addField ('Amount Cleared', `${toDelete} message(s)`)
      .addField ('Cleared In', message.channel)
      .addField ('Cleared At', message.createdAt)
      message.channel.send(embed).then(msg => msg.delete(50000));
    })
}

module.exports.help = {
    name:'clear'
}
