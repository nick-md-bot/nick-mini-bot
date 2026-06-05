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
    reply
}) => {
    try {

        const aliveMsg = `
╭━━━〔 🌼  𝜨𝜾𝚌𝜿 𝜧𝜹 𝜝𝝄т 🌼 〕━━━⬣

ツ *ʙᴏᴛ ɴᴀᴍᴇ* :  𝜨𝜾𝚌𝜿 𝜧𝜹 𝜝𝝄т 🐦🤍

ツ *ᴜsᴇʀ* : ${pushname}

ツ *мᴏᴅᴇ ᴠᴇʀsɪᴏɴ* : ${process.version}

ツ *ᴜᴘᴛɪᴍᴇ* : ${runtime(process.uptime())}

ツ *ᴏᴡɴᴇʀ* : 𓍢ִ໋͙֒𓋜𝛞𝖎𝐜𝛋🍇•𔘓°𓍯𓂃

ツ *sᴛᴀᴛᴜs* : Online ✅

ツ *ᴍᴏᴅᴇ* : Public

ツ *ʙɪᴏ* : NICK XD 🪻🌿🤍

╰━━━━━━━━━━━━━━━━⬣
`;

        // Alive Image
        await conn.sendMessage(
            from,
            {
                image: {
                    url: "https://xenocdn.xenocdn.workers.dev/265d504c.jpeg"
                },
                caption: aliveMsg,
                mentions: [conn.user.id]
            },
            { quoted: mek }
        );

        // Alive Audio (URL വഴി നേരിട്ട് ഓഡിയോ അയക്കുന്നു)
        await conn.sendMessage(
            from,
            {
                audio: {
                    url: "https://xenocdn.xenocdn.workers.dev/2040c9ef.mpeg"
                },
                mimetype: 'audio/mpeg',
                ptt: true
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e)
        reply(`❌ Error: ${e.message}`)
    }
})
