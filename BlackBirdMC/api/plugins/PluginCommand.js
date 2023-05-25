const Command = require("../../command/command");
const server = require('../../start')

class PluginCommand extends Command {
  static register() {
    server.commands.add(new this())
  }
}

module.exports = PluginCommand
