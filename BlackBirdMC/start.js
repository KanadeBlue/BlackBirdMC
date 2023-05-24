global.BBMC = {};

const Server = require("./server");

async function main() {
  await Promise.all([
    require("./utils/logging_format")(),
    require("./utils/configuration")()
  ]);

  return new Server();
}

main().then((v) => {
  module.exports = v;
});
