/* eslint-disable no-undef */
const Command = require("../command");
const ServerInfo = require('../../server_info');

class VersionCommand extends Command {
    constructor() {
        super("version", ["ver"], "Show current server software version being used.", "", "", BBMC.config.BBMC.Command.permission_message);
    }

    async execute(sender, writtenCommand, args) {
        if (args[0]) {
            const pluginName = args[0].toLowerCase();
            const plugins = sender.server.plugins.plugins;

            const matchingPlugins = plugins.filter(plugin => plugin.options.name.toLowerCase() === pluginName);

            if (matchingPlugins.length > 0) {
                matchingPlugins.forEach(plugin => {
                    sender.message("----- " + plugin.options.name + " -----");
                    sender.message("Name: " + plugin.options.name);
                    sender.message("Version: " + plugin.options.version);
                    sender.message("Description: " + plugin.options.description);
                    sender.message("Author: " + plugin.options.author);
                });
            } else {
                sender.message("Plugin " + args[0] + " not found!");
            }
        } else {
            sender.message(`This server is running: ${ServerInfo.engine} and Minecraft version(s): [${BBMC.config.Vanilla.Server.version}].`);
        }
    }
}

module.exports = VersionCommand;
