class Command {
    /**
     * 
     * @param {string | object} name 
     * @param {string[]} aliases 
     * @param {string} description 
     * @param {string} usageMessage 
     * @param {string} permission 
     * @param {string} permissionMessage 
     */
    constructor(name, aliases = [], description = "", usage_message = "", permission = "", permission_message = "") {
        if (typeof name === "object") {
            Object.assign(this, name);
        } else {
            this.name = name;
            this.aliases = aliases;
            this.description = description;
            this.usage_message = usage_message;
            this.permission = permission;
            this.permission_message = permission_message;
        }
    }

    // eslint-disable-next-line no-unused-vars
    async execute(sender, writtenCommand, args) { }
}

module.exports = Command;
