const { cmd } = require('../command');
const fetch = require('node-fetch'); // node-fetch ഇൻസ്റ്റാൾ ചെയ്തിട്ടുണ്ടെന്ന് ഉറപ്പാക്കുക

cmd({
    pattern: "attp",
    alias: ["attp1", "attp2"],
    desc: "ടെക്സ്റ്റ് ആനിമേഷൻ സ്റ്റിക്കർ ആക്കി മാറ്റുന്നു",
    category: "sticker",
    react: "🎨",
    filename: __filename
},
async (conn, mek, m, { from, q, reply, command }) => {
    try {
        // ടെക്സ്റ്റ് ഉണ്ടോ എന്ന് പരിശോധിക്കുന്നു (ടൈപ്പ് ചെയ്തതോ അല്ലെങ്കിൽ റീപ്ലേ ചെയ്തതോ)
        let teks = q ? q : (m.quoted && m.quoted.text) ? m.quoted.text : null;
        
        if (!teks) return await reply("⚠️ ദയവായി ഒരു ടെക്സ്റ്റ് നൽകുക! ഉദാഹരണത്തിന്: `.attp ഹലോ` അല്ലെങ്കിൽ ഒരു മെസ്സേജിന് റീപ്ലേ ചെയ്യുക.");

        await reply("🔄 നിങ്ങളുടെ സ്റ്റിക്കർ തയ്യാറാകുന്നു, ദയവായി കാത്തിരിക്കൂ...");

        // ATTP 1 ലോജിക്
        if (command === "attp" || command === "attp1") {
            let apiUrl = `https://api.xteam.xyz/attp?file=&text=${encodeURIComponent(teks)}`;
            
            let res = await fetch(apiUrl);
            if (!res.ok) throw new Error("API സെർവർ തകരാറിലാണ് അല്ലെങ്കിൽ API Key ആവശ്യമില്ല.");

            let stickerBuffer = await res.buffer();

            await conn.sendMessage(from, { 
                sticker: stickerBuffer 
            }, { quoted: mek });
        }

        // ATTP 2 ലോജിക്
        if (command === "attp2") {
            let apiUrl = `https://salism3api.pythonanywhere.com/text2gif/?text=${encodeURIComponent(teks)}`;
            
            let res = await fetch(apiUrl);
            if (!res.ok) throw new Error("API സെർവർ തകരാറിലാണ്.");
            
            let json = await res.json();
            
            if (json.image) {
                let gifRes = await fetch(json.image);
                let gifBuffer = await gifRes.buffer();

                await conn.sendMessage(from, { 
                    sticker: gifBuffer 
                }, { quoted: mek });
            } else {
                throw new Error("API-യിൽ നിന്ന് ചിത്രം ലഭിച്ചില്ല.");
            }
        }

    } catch (e) {
        console.error("ATTP Command Error:", e);
        return await reply(`❌ *പരാജയപ്പെട്ടു:* ${e.message}\n_(ശ്രദ്ധിക്കുക: ഇതിൽ ഉപയോഗിച്ചിരിക്കുന്ന പൊതുവായ API-കൾ ചിലപ്പോൾ ഓഫ്‌ലൈൻ ആയേക്കാം)_`);
    }
});
