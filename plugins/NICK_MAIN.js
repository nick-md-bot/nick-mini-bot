const config = require('../config')
const { cmd, commands } = require('../command')
const os = require('os')

function runtime(seconds) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor(seconds % (3600 * 24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);
    
    var dDisplay = d > 0 ? d + "d " : "";
    var hDisplay = h > 0 ? h + "h " : "";
    var mDisplay = m > 0 ? m + "m " : "";
    var sDisplay = s > 0 ? s + "s" : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
}

// Kannu njettikkunna Matrix Block Bar Generator
function getNeonBar(percentage) {
    const totalBars = 5; // 5 blocks mathi neat visual alignment kittan
    const filledBars = Math.round((percentage / 100) * totalBars);
    const emptyBars = totalBars - filledBars;
    return '🟩'.repeat(filledBars) + '⬜'.repeat(emptyBars);
}

cmd({
    pattern: "ping",
    desc: "Check bot's response time and uptime.",
    category: "main",
    react: "🚨", // Shocking alert emoji
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const startTime = Date.now()
        
        // Loader block
        const message = await conn.sendMessage(from, { text: '```[!] DECRYPTING SYSTEM INTERFACE...
```' })
        
        const endTime = Date.now()
        const ping = endTime - startTime
        const ut = runtime(process.uptime())
        
        // Memory metrics
        const totalMem = os.totalmem()
        const freeMem = os.freemem()
        const usedMem = totalMem - freeMem
        const ramPercentage = Math.round((usedMem / totalMem) * 100)
        const neonBar = getNeonBar(ramPercentage)

        // The Eye-Popping Grid Layout
        let responseText = `\`\`\`\n┌────────────────────────┐\n  N I C K   M D   (v3.0.4)\n└────────────────────────┘\`\`\`\n`
        responseText += `**\`[█] SYSTEM ENGAGED\`**\n\n`
        responseText += `\`┌── ⟨ 🛰️ NETWORK TELEMETRY ⟩\`\n`
        responseText += `\`┊ 🚀 LATENCY : ${ping} ms [⚡ EXTREME]\`\n`
        responseText += `\`└────────────────────────\`\n\n`
        responseText += `\`┌── ⟨ 📟 QUANTUM MATRIX ⟩\`\n`
        responseText += `\`┊ ⏳ ACTIVE  : ${ut}\`\n`
        responseText += `\`┊ 📊 MEMORY  : ${neonBar} ${ramPercentage}%\`\n`
        responseText += `\`┊ ⚙️ CORE    : kernel@${os.platform()}_${os.arch()}\`\n`
        responseText += `\`└────────────────────────\`\n\n`
        responseText += `**\`[•] STATUS : ONLINE & STABLE\`**`

        // Message edit cheyyanu
        await conn.sendMessage(from, { text: responseText, edit: message.key })
        
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
})
