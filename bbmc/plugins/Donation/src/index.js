const PluginAPI = require("../../../../BlackBirdMC/api/PluginAPI")
const PluginBase = require("../../../../BlackBirdMC/api/PluginBase")

class DonationPlugin extends PluginBase {
  constructor(info) {
    super()

    this.api = PluginAPI('1.0.0', info)
  }

  onEnable() {
    this.api.getLogger().info("ZZZ")
  }

  onDisable() {
    this.api.getLogger().info('zzz')
  }
}

module.exports = DonationPlugin
