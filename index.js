const { Plugin } = require('powercord/entities');
const { getModule, channels } = require("powercord/webpack");

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function fetchReddit() {
  const r = rand(1, 100)
  const res = await fetch(`https://www.reddit.com/r/cuteanimeboys/top.json?limit=${r}&t=all`)
  const resp = await res.json()
  let url = ""
  try {
    url = resp.data.children[r-1].data.url
  } catch (err) {
    console.error(resp)
    console.error(r)
    console.error(err)
  }
  return url
}

module.exports = class Annoy extends Plugin {
  startPlugin () {
    powercord.api.commands.registerCommand({
      command: 'cuteboys',
      description: 'Send a cute anime boy in chat',
      usage: '{c} -p',
      executor: async (args) => {
        let url = ""
        let send = true
        if (args.length >= 1) {
          send = args[0] != "-p"
        }
        
        switch (rand(1, 1000)) {
          case 420:
            const usr = getModule(["getCurrentUser"], false).getCurrentUser()
            url = `https://cdn.discordapp.com/avatars/${usr.id}/${usr.avatar}.webp?size=512`
            break
          case 42:
            const chan = getModule(["getDMFromUserId"], false).getChannel(channels.getChannelId())
            if (chan.type == 1) {
              url = `https://cdn.discordapp.com/avatars/${chan.rawRecipients[0].id}/${chan.rawRecipients[0]}.webp?size=512`
            } else {
              url = await fetchReddit()
            }
            break
          default:
            url = await fetchReddit()
        }

        return {
          send,
          result: url
        }
      }
    });
  }

  pluginWillUnload () {
    powercord.api.commands.unregisterCommand('cuteboys');
  }
};
