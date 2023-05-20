const Command = require("../command");


class VersionCommand extends Command {
    // eslint-disable-next-line constructor-super
    constructor() {
        "version",
        ["ver"],
        "Show current server software version being used."
    }

    // eslint-disable-next-line no-unused-vars
    async execute(sender, writtenCommand, args) {
        sender.message("");
    }
}

module.exports = VersionCommand;