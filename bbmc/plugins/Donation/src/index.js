const PluginAPI = require("../../../../BlackBirdMC/api/plugins/PluginAPI")
const PluginBase = require("../../../../BlackBirdMC/api/plugins/PluginBase")
const PluginCommand = require('../../../../BlackBirdMC/api/plugins/PluginCommand')

class DonationPlugin extends PluginBase {
  constructor(info) {
    super()

    this.api = PluginAPI('1.0.0', info)
  }

  onEnable() {
    this.api.getLogger().info("Help the creators of BluebirdMC @link")

    const cmd = new PluginCommand()
    cmd.setName("donation")
    cmd.setAliases(["donate"])
    cmd.setDescription("Donation link.")
    cmd.setPermission("")
    cmd.setPermissionMessage("")
    cmd.setUsageMessage("")
    cmd.setRun((sender) => {
      sender.message('hello')
    })

    cmd.register()
  }

  onDisable() {
    this.api.getLogger().info("Help the creators of BluebirdMC @link")
  }
}

module.exports = DonationPlugin
