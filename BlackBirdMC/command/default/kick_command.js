/* eslint-disable no-undef */
const Command = require("../command");
const ServerInfo = require('../../server_info');

class VersionCommand extends Command {
  constructor() {
    super("kick", [""], "Kick the player from the name.", "", "bluebirdmc.default.kick", BBMC.config.BBMC.Command.permission_message);
  }

  async execute(sender, writtenCommand, args) {
    if (sender.name === "Console" && !args[0]) {
      //sender.message(sender.server.language.getContent("player", "loaded"));
    } else if (args[0]) {
      // finish console kick later.
    } else if (sender.name !== "Console") {
      // finish player kick later.
    }
  }
}

module.exports = VersionCommand;
