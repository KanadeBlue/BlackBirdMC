const PacketBase = require("../packet_base");
const PacketIdentifiers = require("../packet_identifiers");

class RequestChunkRadiusPacket extends PacketBase {

    chunkRadius;
    maxChunkRadius;

    constructor() {
        super(PacketIdentifiers.REQUEST_CHUNK_RADIUS);
        this.maxChunkRadius = 12
    }

    read(stream) {
        this.chunkRadius = stream.readSignedVarInt();
    }

    write(stream) {
        stream.writeSignedVarInt(this.chunkRadius);
    }
}

module.exports = RequestChunkRadiusPacket;