```js
const { cmd } = require('../command')

cmd({
    pattern: "insta",
    desc: "Instagram Downloader",
    category: "download",
    react: "📥",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {

        if (!q) return reply("*Send Instagram URL*")

        const res = await fetch(
            `https://api.siputzx.my.id/api/d/igdl?url=${encodeURIComponent(q)}`
        )

        const data = await res.json()

        if (!data.status || !data.data) {
            return reply("*Download Failed!*")
        }

        for (const media of data.data) {

            if (media.type === "video") {

                await conn.sendMessage(
                    from,
                    {
                        video: { url: media.url },
                        caption: "*📥 Instagram Downloader*"
                    },
                    { quoted: mek }
                )

            } else {

                await conn.sendMessage(
                    from,
                    {
                        image: { url: media.url },
                        caption: "*📥 Instagram Downloader*"
                    },
                    { quoted: mek }
                )

            }
        }

    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
})
```
