const PluginAPI = require("../../../../BlackBirdMC/api/PluginAPI")
const PluginBase = require("../../../../BlackBirdMC/api/PluginBase")

class DonationPlugin extends PluginBase {
  static info

  constructor(info) {
    super()

    this.api = PluginAPI('1.0.0', info)
  }

  onEnable() {
    this.api.getLogger().info("ZZZ")
  }
}

module.exports = DonationPlugin
