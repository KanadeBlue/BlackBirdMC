
class Command {
    name;
    aliases = [];
    description = "";
    usageMessage = "";
    permission;
    permissionMessage;

    constructor(name, aliases = [], description, usageMessage = "", permission = "", permissionMessage = "") {
        this.name = name;
        this.aliases = aliases;
        this.description = description;
        this.usageMessage = usageMessage;
        this.permission = permission;
        this.permissionMessage = permissionMessage;
    }

    // eslint-disable-next-line no-unused-vars
    async execute(sender, writtenCommand, args) {}
}

module.exports = Command;