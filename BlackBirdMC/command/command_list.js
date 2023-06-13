/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const fs = require("fs");
const ConsoleCommandSender = require("../utils/console_command_sender");
const CommandSender = require("./command_sender");

class CommandsList {

    commands;
    alias;
    constructor() {
        this.commands = {};
        this.alias = {};
        fs.readdirSync(`${__dirname}/default`).forEach((file) => {
            const command = require(`${__dirname}/default/${file}`);
            this.add(new command());
        });
    }

    add(command) {
        if (!(command.name in this.commands)) {
            this.commands[command.name] = command;
            this.commands[command.name].execute = command.execute.bind(command);
            if (command.getAliases !== [] && command.getAliases !== [""]) {
                command.aliases.forEach((aliasName) => {
                    this.alias[aliasName] = command;
                })
            }
        }
    }

    get(commandName) {
        if (commandName in this.commands) {
            return this.commands[commandName];
        } else if (commandName in this.alias) {
            return this.alias[commandName];
        }
    }

    dispatch(sender, commandName) {
        if (commandName.trim() === "") return;

        const args = commandName.split(" ");
        const cmd = args.shift();

        const command = this.get(cmd);
        if (command) {
            if (sender instanceof CommandSender) {
                command.execute(sender, cmd, args);
            }
        } else {
            if (sender instanceof ConsoleCommandSender) {
                if (cmd.trim() === "") return;
                sender.message(BBMC.config.BBMC.Command.unknown_command);
            }
        }
    }

    getAllCommands() {
        return this.commands;
    }

}

module.exports = CommandsList;
