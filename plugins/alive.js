const { cmd } = require('../command');
function runtime(seconds) {
    seconds = Number(seconds);
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor(seconds % (3600 * 24) / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = Math.floor(seconds % 60);
    return `${d}d ${h}h ${m}m ${s}s`;
}

cmd({
    pattern: "alive",
    desc: "Check bot status",
    category: "main",
    react: "🤖",
    filename: __filename
},
async (conn, mek, m, { from, pushname }) => {
    try {
        const botJid = conn.user.id.split(':')[0] + '@s.whatsapp.net';
        
    
        const aliveMsg = `
╭━━━〔 🌿 NICK XD MD 🌿 〕━━━⬣

ツ *ʙᴏᴛ ɴᴀᴍᴇ* : NICK XD MD
ツ *ᴜsᴇʀ* : ${pushname}
ツ *ᴜᴘᴛɪᴍᴇ* : ${runtime(process.uptime())}
ツ *ᴏᴡɴᴇʀ* : @${botJid.split('@')[0]}
ツ *sᴛᴀᴛᴜs* : Online ✅
ツ *ᴍᴏᴅᴇ* : Public

╰━━━━━━━━━━━━━━━━⬣`;

        await conn.sendMessage(from, {
            image: { url: "https://xenocdn.xenocdn.workers.dev/265d504c.jpeg" },
            caption: aliveMsg,
            contextInfo: { mentionedJid: [botJid] }
        }, { quoted: mek });

        const audioUrls = [
            "https://files.catbox.moe/qfy81p.opus",
            "https://files.catbox.moe/mpwq4f.opus",
            "https://files.catbox.moe/f0ng4t.opus",
            "https://files.catbox.moe/6ubiya.opus",
            "https://files.catbox.moe/9ur7so.opus",
            "https://files.catbox.moe/vuqq05.opus"
        ];
        
        const randomAudio = audioUrls[Math.floor(Math.random() * audioUrls.length)];

        const response = await fetch(randomAudio);
        if (!response.ok) throw new Error(`Audio download failed: ${response.status}`);
        
        const audioBuffer = Buffer.from(await response.arrayBuffer());

        await conn.sendMessage(from, {
            audio: audioBuffer,
            mimetype: 'audio/ogg; codecs=opus',
            ptt: true
        }, { quoted: mek });

    } catch (e) {
        console.error("Alive Command Error:", e);
        return await conn.sendMessage(from, { text: `*Error:* ${e.message}` }, { quoted: mek });
    }
});
