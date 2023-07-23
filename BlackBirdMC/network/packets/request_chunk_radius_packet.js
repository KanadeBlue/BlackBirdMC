const PacketBase = require("../packet_base");
const PacketIdentifiers = require("../packet_identifiers");

class RequestChunkRadiusPacket extends PacketBase {

    chunkRadius;
    maxChunkRadius;

    constructor() {
        super(PacketIdentifiers.REQUEST_CHUNK_RADIUS);
        this.maxChunkRadius = 12
    }

    read_body(stream) {
        this.chunkRadius = stream.readSignedVarInt();
    }

    write_body(stream) {
        stream.writeSignedVarInt(this.chunkRadius);
    }
}

module.exports = RequestChunkRadiusPacket;