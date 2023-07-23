const PacketBase = require("../packet_base");
const PacketIdentifiers = require("../packet_identifiers");
const StringCodec = require("../codecs/string_codec");

class CreativeContentPacket extends PacketBase {
    constructor() {
        super(PacketIdentifiers.CREATIVE_CONTENT);
    }

    /**
     * Reads the packet body from the stream
     * @param {BinaryStream} stream 
     */
    read_body(stream) {
    }

    /**
     * Writes the packet body to the stream
     * @param {BinaryStream} stream
     */ 
    write_body(stream) {
        stream.writeVarInt(0);
    }
}

module.exports = CreativeContentPacket;