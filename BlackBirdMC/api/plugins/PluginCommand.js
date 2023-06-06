// eslint-disable-next-line no-unused-vars
const CommandSender = require('../../command/command_sender');
const server = require('../../start')

class PluginCommand {
  name;
  description;
  aliases = [];
  usage_message  

  constructor(options) {
    if(typeof options === 'object') Object.assign(options, this)
  }
  
  /**
   * 
   * @param {string} name 
   */
  setName(name) {
    this.name = name
  }

  /**
   * 
   * @param {string} description
   */
  setDescription(description) {
    this.description = description
  }

  /**
   * 
   * @param {string[]} aliases
   */
  setAliases(aliases) {
    this.aliases = aliases
  }

  /**
   * 
   * @param {string} alias 
   */
  addAliases(alias) {
    this.aliases.push(alias)
  }
  
  /**
   * 
   * @param {string} message 
   */
  setUsageMessage(message) {
    this.usage_message = message
  }

  /**
   * 
   * @param {string} permission 
   */
  setPermission(permission) {
    this.permission = permission
  }

  /**
   * 
   * @param {string} message 
   */
  setPermissionMessage(message) {
    this.permission_message = message
  }

  /**
   * 
   * @param {(sender: CommandSender, writtenCommand, args: string[]) => any} func
   */
  setRun(func) {
    this.execute = func
  }

  register() {
    server.commands.add(this)
  }
}

module.exports = PluginCommand
