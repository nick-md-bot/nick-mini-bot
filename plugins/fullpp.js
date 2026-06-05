const { cmd } = require("../command");
const Jimp = require("jimp");

cmd({
    pattern: "fullpp",
    desc: "Set profile picture without hard crop",
    category: "owner",
    react: "🖼️",
    filename: __filename
},
async (conn, mek, m, { reply }) => {
    try {
        const quoted = m.quoted || mek.quoted;

        if (!quoted) return reply("❌ Reply to an image.");

        const buffer = await quoted.download();

        const image = await Jimp.read(buffer);

        // Square canvas with white background
        const canvas = new Jimp(640, 640, "#FFFFFF");

        image.contain(
            640,
            640,
            Jimp.HORIZONTAL_ALIGN_CENTER |
            Jimp.VERTICAL_ALIGN_MIDDLE
        );

        canvas.composite(image, 0, 0);

        const finalBuffer = await canvas.getBufferAsync(Jimp.MIME_JPEG);

        await conn.updateProfilePicture(
            conn.user.id,
            finalBuffer
        );

        return reply("✅ Full Profile Picture Updated.");

    } catch (err) {
        console.error("FULLPP ERROR:", err);
        return reply(`❌ Failed to update profile picture.\n${err.message}`);
    }
});
