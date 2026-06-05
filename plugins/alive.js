const { cmd } = require('../command')
const fs = require('fs')
const Axios = require('axios')
const path = require('path')

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

        // 1. Alive Image അയക്കുന്നു
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

        // 2. താൽക്കാലികമായി ഓഡിയോ ഫയൽ ഡൗൺലോഡ് ചെയ്യാൻ ഉള്ള വഴി
        const audioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        const tempPath = path.join(__dirname, 'temp_alive.mp3')

        const writer = fs.createWriteStream(tempPath)
        const response = await Axios({
            url: audioUrl,
            method: 'GET',
            responseType: 'stream'
        })

        response.data.pipe(writer)

        writer.on('finish', async () => {
            // ഡൗൺലോഡ് പൂർത്തിയായ ശേഷം വാട്സാപ്പിലേക്ക് അയക്കുന്നു
            await conn.sendMessage(
                from,
                {
                    audio: fs.readFileSync(tempPath), // ലോക്കൽ ഫയൽ ആയതുകൊണ്ട് 100% വർക്ക് ചെയ്യും
                    mimetype: 'audio/mpeg',
                    ptt: true
                },
                { quoted: mek }
            );

            // അയച്ചതിന് ശേഷം ബോട്ടിന്റെ മെമ്മറിയിൽ നിന്ന് ആ താൽക്കാലിക ഫയൽ ഡിലീറ്റ് ചെയ്യുന്നു
            fs.unlinkSync(tempPath)
        })

        writer.on('error', (err) => {
            console.error("Audio download error:", err)
            reply("❌ Audio ഡൗൺലോഡ് ചെയ്യുന്നതിൽ പ്രശ്നം!")
        })

    } catch (e) {
        console.log(e)
        reply(`❌ Error: ${e.message}`)
    }
})
