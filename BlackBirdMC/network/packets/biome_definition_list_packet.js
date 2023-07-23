const PacketBase = require("../packet_base");
const PacketIdentifiers = require("../packet_identifiers");

class BiomeDefinitionListPacket extends PacketBase {
    /**
     * @type {Buffer}
     */
    nbt;
    
    constructor() {
        super(PacketIdentifiers.BIOME_DEFINITION_LIST);
    }

    /**
     * Reads the packet body from the stream
     * @param {BinaryStream} stream 
     */
    read_body(stream) {
        this.nbt = stream.readRemaining();
    }

    /**
     * Writes the packet body to the stream
     * @param {BinaryStream} stream
     */ 
    write_body(stream) {
        stream.write(this.nbt);
    }
}

module.exports = BiomeDefinitionListPacket;