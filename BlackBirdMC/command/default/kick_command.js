/* eslint-disable no-undef */
const Command = require("../command");
const ServerInfo = require('../../server_info');

class VersionCommand extends Command {
  constructor() {
    super("kick", [], "Kick the player from the name.", "", "bluebirdmc.default.kick", BBMC.config.BBMC.Command.permission_message);
  }

  async execute(sender, writtenCommand, args) {
    if (sender.name === "Console" && !args[0]) {
      //sender.message(sender.server.language.getContent("player", "loaded"));
    } else if (args[0]) {
    } else if (sender.name !== "Console") {
      sender.kick(args[0]);
    }
  }
}

module.exports = VersionCommand;
