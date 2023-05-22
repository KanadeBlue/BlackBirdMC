interface PluginOptions {
  name: string
  version: string
  description: string
  author: string
}

/**
 * @abstract
 */
declare abstract class PluginBase {
  options
  api

  abstract onEnable()

  /**
   * @abstract
   */
  abstract onDisable() {}
}

export default PluginBase
