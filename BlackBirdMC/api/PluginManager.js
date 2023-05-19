const { readdir } = require("fs/promises")

class PluginManager {
  /**
   * @type {import('../api/PluginBase')[]}
   */
  plugins = []

  async start() {
    const folders = await readdir("bbmc/plugins")
    for await (const folder of folders) {
      /**
       * @type {import('../api/PluginBase')}
       */
      const plugin = require(`../../bbmc/plugins/${folder}/index.js`)
      this.plugins.push(new plugin())
    }
  }

  doTask(event, ...args) {
    this.plugins.forEach((plu) => {
      if (plu[event]) plu[event](...args)
    })
  }
}

module.exports = PluginManager
