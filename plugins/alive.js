const config = require('../config')
const { cmd } = require('../command')

function runtime(seconds) {
    seconds = Number(seconds)

    const d = Math.floor(seconds / (3600 * 24))
    const h = Math.floor(seconds % (3600 * 24) / 3600)
    const m = Math.floor(seconds % 3600 / 60)
    const s = Math.floor(seconds % 60)

    return `${d}d ${h}h ${m}m ${s}s`
}

cmd({
    pattern: "alive",
    desc: "Check bot status",
    category: "main",
    react: "🤖",
    filename: __filename
},
async (conn, mek, m, {
    from,
    pushname,
    sender,
    reply
}) => {
    try {

        const up = runtime(process.uptime())
        const time = new Date().toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata"
        })

        const aliveText = `
╭━━━〔 ✦ NICK MD ✦ 〕━━━⬣
┃
┃ 👤 User : ${pushname}
┃ 🤖 Bot : Nick MD
┃ ⚡ Status : Online
┃ 💎 Mode : Public
┃ ⏰ Runtime : ${up}
┃ 📅 Time : ${time}
┃ 📱 Prefix : ${config.PREFIX}
┃
╰━━━━━━━━━━━━━━⬣

> 🚀 Premium WhatsApp Bot Running Successfully
`;

        await conn.sendMessage(
            from,
            {
                image: {
                    url: config.ALIVE_IMG
                },
                caption: aliveText
            },
            { quoted: mek }
        )

    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
})
