const server = require('../../start');

class PluginCommand {
  constructor(options) {
    if (typeof options === 'object') {
      Object.assign(this, options);
    }

    this.aliases = [];
  }

  setName(name) {
    this.name = name;
  }

  setDescription(description) {
    this.description = description;
  }

  setAliases(aliases) {
    this.aliases = aliases;
  }

  addAlias(alias) {
    this.aliases.push(alias);
  }

  setUsageMessage(message) {
    this.usage_message = message;
  }

  setPermission(permission) {
    this.permission = permission;
  }

  setPermissionMessage(message) {
    this.permission_message = message;
  }

  setRun(func) {
    this.execute = func;
  }

  register() {
    server.commands.add(this);
  }
}

module.exports = PluginCommand;
