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

        // നിങ്ങളുടെ വീഡിയോയിൽ നിന്നുള്ള ഓഡിയോ മാത്രം വേർതിരിച്ചെടുത്ത ഒറിജിനൽ MP3 ലിങ്ക്
        await conn.sendMessage(
            from,
            {
                audio: {
                    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" // നിങ്ങളുടെ ഓഡിയോ കൺവർട്ട് ചെയ്ത പുതിയ ലിങ്ക്
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
