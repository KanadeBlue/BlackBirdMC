const PacketBase = require("../packet_base");
const PacketIdentifiers = require("../packet_identifiers");

class PlayStatusPacket extends PacketBase {
    /**
     * @type {Number}
     */
    status;

    constructor() {
        super(PacketIdentifiers.PLAY_STATUS);
    }

    /**
     * Reads the packet body from the stream
     * @param {BinaryStream} stream 
     */
    read_body(stream) {
        this.status = stream.readIntBE();
    }

    /**
     * Writes the packet body to the stream
     * @param {BinaryStream} stream
     */ 
    write_body(stream) {
        stream.writeIntBE(this.status);
    }
}

module.exports = PlayStatusPacket;