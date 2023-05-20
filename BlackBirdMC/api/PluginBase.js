/**
 * @abstract
 */
class PluginBase {
  options
  api

  /**
   * @abstract
   */
  onEnable() { }

  /**
   * @abstract
   */
  onDisable() { }
}

module.exports = PluginBase
