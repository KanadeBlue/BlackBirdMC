const Command = require("../command");


class VersionCommand extends Command {
    constructor() {
        // eslint-disable-next-line no-undef
        super("version", ["ver"], "Show current server software version being used.", "", "", BBMC.config.BBMC.Command.permission_message);
    }

    // eslint-disable-next-line no-unused-vars
    async execute(sender, writtenCommand, args) {
        console.info("version command;")
    }
}

module.exports = VersionCommand;