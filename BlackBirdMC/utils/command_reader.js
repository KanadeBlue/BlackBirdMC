const readline = require("readline");
const ConsoleCommandSender = require("./console_command_sender");

class CommandReader {
    server;
    constructor(server) {
        this.server = server;
        this.consoleCommandSender = new ConsoleCommandSender(this.server);
    }

    handle() {
        // eslint-disable-next-line no-undef
        const rl = readline.createInterface({ input: process.stdin, output: process.stderr, prompt: BBMC.config.BBMC.Terminal.prompt ? "> " : "" });

        // eslint-disable-next-line no-undef
        if (BBMC.config.BBMC.Terminal.prompt) {
            ['info', 'warn', 'error', 'debug', 'log'].forEach((log) => {
                const back = console[log]
                const prompt = (prompt) => {
                    rl.setPrompt(prompt)
                    rl.prompt()
                }

                console[log] = (text, group) => {
                    prompt("")

                    if (group) {
                        back(text, group)
                    } else {
                        back(text)
                    }

                    prompt("> ")
                }
            })
        }


        rl.on("line", async (input) => {
            this.server.commands.dispatch(this.consoleCommandSender, input);
            rl.prompt()
        });

        rl.prompt()
        return this
    }
}

module.exports = CommandReader;
