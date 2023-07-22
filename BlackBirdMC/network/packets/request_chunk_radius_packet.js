const PacketBase = require("../packet_base");
const PacketIdentifiers = require("../packet_identifiers");

class RequestChunkRadiusPacket extends PacketBase {

    chunkRadius;

    constructor() {
        super(PacketIdentifiers.REQUEST_CHUNK_RADIUS);
    }

    read(stream) {
        this.chunkRadius = stream.readSignedVarInt();
    }

    write(stream) {
        stream.writeSignedVarInt(this.chunkRadius);
    }
}

module.exports = RequestChunkRadiusPacket;