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
            "https://xenocdn.xenocdn.workers.dev/ece11cc3.opus",
            "https://xenocdn.xenocdn.workers.dev/a55bc847.opus",
            "https://xenocdn.xenocdn.workers.dev/d12bb561.opus",
            "https://xenocdn.xenocdn.workers.dev/a352d6a0.opus",
            "https://xenocdn.xenocdn.workers.dev/229e0147.opus",
            "https://xenocdn.xenocdn.workers.dev/75cd4aac.opus",
            "https://xenocdn.xenocdn.workers.dev/bb407cc9.opus"
        ];
        
        const randomAudio = audioUrls[Math.floor(Math.random() * audioUrls.length)];
        const response = await fetch(randomAudio, {
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });
        
        if (!response.ok) throw new Error(`Status ${response.status}`);
        
        const buffer = Buffer.from(await response.arrayBuffer());
        await conn.sendMessage(from, {
            audio: buffer,
            mimetype: 'audio/ogg; codecs=opus',
            ptt: true,
    
        }, { quoted: mek });

    } catch (e) {
        console.error("Alive Error:", e);
        return await conn.sendMessage(from, { text: `*Error:* ${e.message}` }, { quoted: mek });
    }
});
