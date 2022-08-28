const { Plugin } = require('powercord/entities');

module.exports = class Annoy extends Plugin {
  startPlugin () {
    powercord.api.commands.registerCommand({
      command: 'cuteboys',
      description: 'Send a cute anime boy in chat',
      usage: '{c} -p',
      executor: async (args) => {
        const rand = Math.floor(Math.random() * 100) + 1;
        const res = await fetch(`https://www.reddit.com/r/cuteanimeboys/top.json?limit=${rand}&t=all`)
        const resp = await res.json()
        const url = resp.data.children[rand-1].data.url
        let send = true
        if (args.length >= 1) {
          send = args[0] != "-p"
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
