
class Command {
    name;
    aliases;
    description;
    usageMessage;
    permission;
    permissionMessage;

    /**
     * 
     * @param {string | object} name 
     * @param {string[]} aliases 
     * @param {string} description 
     * @param {string} usageMessage 
     * @param {string} permission 
     * @param {string} permissionMessage 
     */
    constructor(name, aliases = [], description = "", usageMessage = "", permission = "", permissionMessage = "") {
        if (typeof name === "object") {
            for (const [key, value] of Object.entries(name)) {
                this[key] = value;
            }
        } else {
            this.name = name;
            this.aliases = aliases;
            this.description = description;
            this.usageMessage = usageMessage;
            this.permission = permission;
            this.permissionMessage = permissionMessage;
        }
    }

    // eslint-disable-next-line no-unused-vars
    async execute(sender, writtenCommand, args) { }

    getAliases() {
        this.aliases;
    }
}

module.exports = Command;