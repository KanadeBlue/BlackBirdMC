/* eslint-disable no-undef */
const Command = require("../command");

class HelpCMD extends Command {
    constructor() {
        super({
            name: "help",
            aliases: ["?"],
            description: "Shows the help menu or for a certain command.",
            usageMessage: "",
            permission: "",
            permissionMessage: BBMC.config.BBMC.Command.permission_message,
        });
    }

    execute(sender, writtenCommand, args) {
        let command = args.join(" ").toLowerCase();
        let page = 1;

        if (args.length > 0 && !isNaN(args[args.length - 1])) {
            page = Math.max(1, parseInt(args[args.length - 1]));
            args.pop(); // Remove the last argument (page number) from the args array
            command = args.join(" ").toLowerCase(); // Reconstruct the command string without the page number
        }

        if (command === "") {
            const allCommands = sender.server.commands.getAllCommands();
            const commands = Object.values(allCommands)
                .flatMap((cmd) => {
                    const aliases = [cmd.name, ...cmd.aliases];
                    return aliases.map((alias) => ({
                        name: alias,
                        description: cmd.description,
                    }));
                })
                .sort((a, b) => a.name.localeCompare(b.name));

            const pageSize = 10;
            const totalPages = Math.ceil(commands.length / pageSize);
            page = Math.min(page, totalPages);

            sender.message(`----- Help (${page} of ${totalPages}) -----`);

            const pageStartIndex = (page - 1) * pageSize;
            const pageCommands = commands.slice(pageStartIndex, pageStartIndex + pageSize);

            pageCommands.forEach((command) => {
                sender.message(`/${command.name}: ${command.description}`);
            });
        } else {
            const cmd = sender.server.commands.get(command);
            if (cmd) {
                sender.message(`----- Help: /${command} -----`);
                sender.message(`Usage: ${cmd.usageMessage}`);
                sender.message(`Description: ${cmd.description}`);
            } else {
                sender.message(`No help for /${command}`);
            }
        }
    }
}

module.exports = HelpCMD;
