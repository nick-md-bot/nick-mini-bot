const config = require('../config')
const { cmd, commands } = require('../command')

function runtime(seconds) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor(seconds % (3600 * 24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);
    
    var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
}

cmd({
    pattern: "ping",
    desc: "Check bot's response time and uptime.",
    category: "main",
    react: "✅",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const startTime = Date.now()
        const message = await conn.sendMessage(from, { text: '*ɴɪᴄᴋ ᴍᴅ...*' })
        
        const endTime = Date.now()
        const ping = endTime - startTime
        const ut = runtime(process.uptime())

        let responseText = `*⏰ Ping :* ${ping}ms\n`
        responseText += `*⏳ Uptime :* ${ut}`

        await conn.sendMessage(from, { text: responseText }, { quoted: message })
        
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
})
