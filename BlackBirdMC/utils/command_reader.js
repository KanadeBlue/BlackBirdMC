const readline = require("readline");
const ConsoleCommandSender = require("./console_command_sender");

class CommandReader {
    constructor(server) {
        this.server = server;
        this.consoleCommandSender = new ConsoleCommandSender(this.server);
    }

    handle() {
        console.log(" test")
        const rl = readline.createInterface({ input: process.stdin });
        rl.on("line", async (input) => {
            this.server.commands.dispatch(this.consoleCommandSender, input);
        });
    }
}

module.exports = CommandReader;
