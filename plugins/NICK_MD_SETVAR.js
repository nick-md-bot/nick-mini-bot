const config = require('../config')
const { cmd, commands } = require('../command')
const fs = require('fs')
const path = require('path')

cmd({
    pattern: "setvar",
    desc: "Change bot config variables directly from chat.",
    category: "owner",
    react: "⚙️",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isOwner, reply }) => {
    try {
        // ബോട്ട് ഒണർ ആണോ എന്ന് പരിശോധിക്കുന്നു (ഭൂരിഭാഗം ബോട്ടുകളിലും ഇതാണ് ഒണർ ചെക്കിംഗ്)
        // അല്ലെങ്കിൽ ബോട്ട് റൺ ചെയ്യുന്ന നമ്പറിൽ നിന്ന് തന്നെ അയക്കുക
        
        if (!q) return reply("*❌ കമാൻഡ് ഉപയോഗിക്കേണ്ട രീതി:* .setvar KEY:VALUE\n*ഉദാഹരണത്തിന്:* .setvar AUTO_REACT:true")

        // KEY-യും VALUE-വും വേർതിരിക്കുന്നു (ഉദാ: AUTO_REACT:true -> key=AUTO_REACT, value=true)
        const parts = q.split(':')
        if (parts.length < 2) return reply("*❌ ഫോർമാറ്റ് തെറ്റാണ്!* ദയവായി `KEY:VALUE` എന്ന രീതിയിൽ നൽകുക.")

        const varKey = parts[0].trim().toUpperCase()
        let varValue = parts.slice(1).join(':').trim()

        // String വാല്യൂസിനെ true/false ഓട്ടോമാറ്റിക് ബോലിയൻ ആക്കുന്നു
        if (varValue.toLowerCase() === 'true') varValue = true
        else if (varValue.toLowerCase() === 'false') varValue = false

        // config.js ഫയലിന്റെ പാത്ത് കണ്ടെത്തുന്നു
        const configPath = path.join(__dirname, '../config.js')

        // config.js ഫയൽ നിലവിലുണ്ടോ എന്ന് നോക്കുന്നു
        if (!fs.existsSync(configPath)) return reply("*❌ config.js ഫയൽ കണ്ടെത്താൻ കഴിഞ്ഞില്ല!*")

        // നിലവിലുള്ള കോൺഫിഗറേഷൻ മെമ്മറിയിൽ മാറ്റുന്നു
        config[varKey] = varValue

        // പുതിയ വേരിയബിൾ ഫയലിലേക്ക് റീ-റൈറ്റ് ചെയ്യാനുള്ള കോഡ്
        const updatedConfigContent = `module.exports = ${JSON.stringify(config, null, 4)};`
        
        fs.writeFileSync(configPath, updatedConfigContent)

        reply(`✅ *Variable Updated Successfully!* \n\n⚙️ *Key:* ${varKey}\n✨ *New Value:* ${varValue}\n\n*മാറ്റങ്ങൾ വരാൻ ദയവായി ബോട്ട് റീസ്റ്റാർട്ട് ചെയ്യുക (.restart)*`)

    } catch (e) {
        console.log(e)
        reply(`❌ *Error:* ${e}`)
    }
})
