/* eslint-disable no-undef */
const Command = require("../command");

class PluginCMD extends Command {
    constructor() {
        super("plugins", ["plugin", "pl", "plu", "plus"], "The plugins list", "", "", BBMC.config.BBMC.Command.permission_message);
    }

    execute(sender) {
        const plugins = sender.server.plugins.plugins;
        const pluginNames = plugins.map((plugin) => plugin.options.name);
        const pluginsCount = pluginNames.length;

        if (pluginsCount > 0) {
            sender.message(`Plugins: (${pluginsCount}) ${pluginNames.join(", ")}`);
        } else {
            sender.message("No plugins found.");
        }
    }
}

module.exports = PluginCMD;
