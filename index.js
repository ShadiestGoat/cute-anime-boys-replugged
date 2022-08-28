const { Plugin } = require('powercord/entities');
const { getModule } = require("powercord/webpack");

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
        if (rand(1, 1000) != 420) { // nice
          const res = await fetch(`https://www.reddit.com/r/cuteanimeboys/top.json?limit=${rand}&t=all`)
          const resp = await res.json()
          const r = Math.floor(Math.random() * resp.data.children.length - 1);
          url = resp.data.children[r].data.url
        } else {
          const usr = getModule(["getCurrentUser"], false).getCurrentUser()
          url = `https://cdn.discordapp.com/avatars/${usr.id}/${usr.avatar}.webp?size=512`
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
