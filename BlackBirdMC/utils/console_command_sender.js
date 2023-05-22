const CommandSender = require("../command/command_sender");

class ConsoleCommandSender extends CommandSender {
    constructor(server) {
        super(server);
        this.name = "Console";
    }

    message(message) {
        console.info(message);
    }
}

module.exports = ConsoleCommandSender;
