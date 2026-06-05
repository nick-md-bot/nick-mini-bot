const { cmd } = require('../command')

function runtime(seconds) {
    seconds = Number(seconds)
    const d = Math.floor(seconds / (3600 * 24))
    const h = Math.floor(seconds % (3600 * 24) / 3600)
    const m = Math.floor(seconds % 3600 / 60)
    const s = Math.floor(seconds % 60)

    return [d + "d", h + "h", m + "m", s + "s"].join(" ")
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
    pushname
}) => {
    try {

        const groups =
            Object.keys(conn.groupMetadata || {}).length || "Private"

        const aliveMsg = `
╭━━━〔 🌼  𝜨𝜾𝚌𝜿 𝜧𝜹 𝜝𝝄т 🌼 〕━━━⬣

ツ *ʙᴏᴛ ɴᴀᴍᴇ* : 𝜨𝜾𝚌𝜿 𝜧𝜹 𝜝𝝄т🐦🤍

ツ *ᴜsᴇʀ* : ${pushname}

ツ *ɢʀᴏᴜᴘs* : ${groups}

ツ *ᴘʟᴀᴛғᴏʀᴍ* : Nick Server!!🪀

ツ *ɴᴏᴅᴇ ᴠᴇʀsɪᴏɴ* : ${process.version}

ツ *ᴜᴘᴛɪᴍᴇ* : ${runtime(process.uptime())}

ツ *ᴏᴡɴᴇʀ* : 𝄟⃟⃟≛⃝⃭⃗🇵🇱♡𝙈ᷟ𝙤ᷳ𝙣ᷡ𝙟𝙖ᷧ𝙣ᷡ 𝙉ᷡ𝙞𝙘ᷗ𝙠ᷜ♡𝄠⃟★

ツ *sᴛᴀᴛᴜs* : Online....!!🏃🏻

ツ *ᴍᴏᴅᴇ* : Public

ツ *ʙɪᴏ* : NICK XD 🪻🌿🤍

╰━━━━━━━━━━━━━━━━⬣
`;

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
        )

    } catch (e) {
        console.log(e)
    }
})
