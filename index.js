const Discord = require('discord.js')
const bot = new Discord.Client()
const token = ''
const prefix = '.'

bot.on('guildMemberAdd', member => {
    const role = member.guild.roles.cache.find(c => c.name == 'Members')
   member.send('Welcome to Ducky Graphics! \nRemember to read the rules.')
   member.roles.add(role)
})

bot.on('message', message => {
    let args = message.content.substring(prefix.length).split(/ + /)

    if(message.content == `${prefix}ticket`) {
        message.guild.channels.create('ticket-' + message.author.username).then(c => {
            c.send('What is the problem?\nIf you would like to close this ticket, please react with the :thumbsdown: emoji.').then(msg => {
                msg.react('👎')
            })

            const filter = m => {
                m.content.includes(' ')
            }
            const collector = c.createMessageCollector(filter, { max: 1, time: 10 })
            collector.on('collect', () => {
                c.send('Thankyou for stating your problem, our staff team will be with you shortly.').catch(console.error)
            })
        })
        
    }
})

bot.on('messageReactionAdd', (emoji, user) => {
    if(emoji.message.channel == `ticket-${user.username}`) {
        emoji.message.channel.delete()
    }
})

bot.login(process.env.BOT_TOKEN)
