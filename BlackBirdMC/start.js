/**
 * @type {import('./types/bbmc.yml').default}
 */
global.BBMC = {};


const Server = require("./server");

async function main() {
  await Promise.all([
    await require("./utils/configuration")(),
    require("./utils/logging_format")()
  ]);

  return new Server();
}

main().then((v) => {
  module.exports = v;
});
