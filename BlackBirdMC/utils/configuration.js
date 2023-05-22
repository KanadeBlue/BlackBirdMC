const { readFile } = require("fs/promises")
const { parse } = require('yaml')

async function configuration() {
  const data = await readFile('bbmc/bbmc.yml', 'utf-8')

  /**
   * @type {import('../types/bbmc.yml').default}
   */
  // eslint-disable-next-line no-undef
  BBMC.config = parse(data)
}

module.exports = configuration
