const PluginBase = require("../../../BlackBirdMC/api/PluginBase")

class DonationPlugin extends PluginBase {
  constructor() {
    super({
      name: "Donation",
      description: "An plugin for donation link!",
      version: [1, 0, 0],
      author: "hvlxh",
    })
  }

  onEnable() {
    this.api.getLogger().info("ZZZ")
  }
}

module.exports = DonationPlugin
