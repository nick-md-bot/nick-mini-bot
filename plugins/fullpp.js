const { cmd } = require("../command");

cmd({
    pattern: "fullpp",
    desc: "Set profile picture",
    category: "owner",
    react: "🖼️",
    filename: __filename
},
async (conn, mek, m, { reply }) => {
    try {
        const quoted = m.quoted ? m.quoted : mek.quoted;

        if (!quoted) {
            return reply("❌ Reply to an image.");
        }

        const mime = quoted.mimetype || quoted.msg?.mimetype || "";

        if (!mime.startsWith("image")) {
            return reply("❌ Reply to a photo.");
        }

        const buffer = await quoted.download();

        await conn.updateProfilePicture(
            conn.user.id,
            buffer
        );

        return reply("✅ Profile Picture Updated Successfully.");

    } catch (err) {
        console.error("FULLPP ERROR:", err);
        return reply(`❌ Failed to update profile picture.\n${err.message}`);
    }
});
