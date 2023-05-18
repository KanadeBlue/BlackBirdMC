const fs = require('fs');
class ErrorHandler {
    static write_error(error) {
      if (!fs.existsSync("crashdumps")) {
        fs.mkdirSync("crashdumps");
      }
      const fileName = `${new Date().toDateString()}${new Date().getHours()}${new Date().getMinutes()}${new Date().getSeconds()}`.replace(/ /g, '_');
      fs.writeFileSync(`./crashdumps/${fileName}.txt`, error.stack);
    }
  }

module.exports = ErrorHandler;