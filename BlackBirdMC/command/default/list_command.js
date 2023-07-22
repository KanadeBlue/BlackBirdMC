const Command = require("../command");

class ListCMD extends Command {
    constructor() {
        super({
            name: "list",
            aliases: [],
            description: "Shows the help menu or for a certain command.",
            usageMessage: "",
            permission: "",
            permissionMessage: BBMC.config.BBMC.Command.permission_message,
        });
    }

    execute(sender, writtenCommand, args) {
        // if (!(sender.hasPerm(this.getPerm()))) {}
        let onlinePlayers = sender.server.getOnlinePlayers();
        if (onlinePlayers.length > 0) {
            sender.message(`Found: ${onlinePlayers.length}`);
            onlinePlayers.forEach((playerFound) => {
                sender.message(`id: ${playerFound.id}, name: ${playerFound.displayName}`);
            });
        } else {
            sender.message("There is no players online");
        }
    }
}

module.exports = ListCMD;