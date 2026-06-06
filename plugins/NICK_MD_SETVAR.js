const config = require('../config')
const { cmd, commands } = require('../command')

cmd({
    pattern: "setname",
    desc: "Change the bot's WhatsApp profile name.",
    category: "owner",
    react: "✏️",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isOwner, reply }) => {
    try {
        // ബോട്ടിന്റെ ഒണർ ആണോ എന്ന് പരിശോധിക്കുന്നു
        if (!isOwner) return reply("*❌ ഈ കമാൻഡ് ഉപയോഗിക്കാൻ ബോട്ട് ഒണർക്ക് മാത്രമേ അധികാരമുള്ളൂ!*")
        
        // മാറ്റേണ്ട പേര് നൽകിയിട്ടുണ്ടോ എന്ന് നോക്കുന്നു
        if (!q) return reply("*uhm.. where's the text? പുതിയ പേര് കൂടി ടൈപ്പ് ചെയ്യൂ..*\n*ഉദാഹരണത്തിന്:* .setname Nick MD")

        // വാട്സാപ്പ് പ്രൊഫൈൽ പേര് മാറ്റുന്നു
        await conn.updateProfileName(q)
        
        // വിജയകരമായി മാറിയാൽ റിപ്ലൈ നൽകുന്നു
        reply("✅ *Succeed! Profile name changed successfully.*")

    } catch (e) {
        console.log(e)
        reply(`❌ *Error:* ${e}`)
    }
})
