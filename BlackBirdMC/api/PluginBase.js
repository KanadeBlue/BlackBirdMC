const PluginAPI = require("./PluginAPI")

/**
 * @abstract
 */
class PluginBase {
  /**
   *
   * @param {{
   *  name: string;
   *  description: string;
   *  version: [number,number,number];
   *  author: string;
   * }} options
   */
  constructor(options) {
    this.api = PluginAPI(options.name)
    this.options = options
  }

  /**
   * @abstract
   */
  onEnable() {}

  /**
   * @abstract
   */
  onDisable() {}
}

module.exports = PluginBase
