const {Frame, ReliabilityTool, InternetAddress, Connection} = require("bbmc-raknet");

class Player {
    /**
     * @type {Connection}
     */
    connection;
    /**
     * @type {Boolean}
     */
    enable_compression;
    /**
     * @type {Number}
     */
    compression_algorithm;

    /**
     * @param {Connection} connection
     */
    constructor(connection) {
        this.connection = connection;
        this.enable_compression = false;
        this.compression_algorithm = 0;
    }
}

module.exports = Player;