const { cmd } = require('../command')
const axios = require('axios') // Axios മോഡ്യൂൾ ആവശ്യമാണ്

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
╭━━━〔 🌿 NICK XD MD 🌿 〕━━━⬣

ツ *ʙᴏᴛ ɴᴀᴍᴇ* : NICK XD MD

ツ *ᴜsᴇʀ* : ${pushname}

ツ *ɴᴏᴅᴇ ᴠᴇʀsɪᴏɴ* : ${process.version}

ツ *ᴜᴘᴛɪᴍᴇ* : ${runtime(process.uptime())}

ツ *ᴏᴡɴᴇʀ* : @${conn.user.id.split(':')[0]}

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

        // ഓഡിയോ ലിങ്ക് Buffer ആയി ഡൗൺലോഡ് ചെയ്യുന്നു (Stream Error വരാതിരിക്കാൻ)
        const audioUrl = "https://files.catbox.moe/k27w88.mp3"
        const response = await axios.get(audioUrl, { responseType: 'arraybuffer' })
        const audioBuffer = Buffer.from(response.data, 'binary')

        // Alive Audio 
        await conn.sendMessage(
            from,
            {
                audio: audioBuffer, // ഇതാണ് ഡൗൺലോഡ് ചെയ്ത ഓഡിയോ ഫയൽ
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
