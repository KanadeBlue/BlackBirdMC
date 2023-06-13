const PacketBase = require("../packet_base");
const PacketIdentifiers = require("../packet_identifiers");
const StringCodec = require("../codecs/string_codec");
// eslint-disable-next-line no-unused-vars
const BinaryStream = require("bbmc-binarystream");

class CommandRequestPacket extends PacketBase {
    /**
     * @type {String}
     */
    command;

    constructor() {
        super(PacketIdentifiers.COMMAND_REQUEST);
    }

    /**
     * Reads the packet body from the stream
     * @param {BinaryStream} stream 
     */
    read(stream) {
        this.command = StringCodec.read_string_lil(stream);
    }

    /**
     * Writes the packet body to the stream
     * @param {BinaryStream} stream
     */ 
    write(stream) {
        StringCodec.write_string_lil(stream, this.command);
    }
}

module.exports = CommandRequestPacket;
