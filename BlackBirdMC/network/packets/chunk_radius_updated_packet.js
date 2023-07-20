const PacketBase = require("../packet_base");
const PacketIdentifiers = require("../packet_identifiers");

class ChunkRadiusUpdatedPacket extends PacketBase {

    chunkRadius;

    constructor() {
        super(PacketIdentifiers.CHUNK_RADIUS_UPDATED);
    }

    read(stream) {
        this.chunkRadius = stream.readSignedVarInt();
    }

    write(stream) {
        stream.writeSignedVarInt(this.chunkRadius);
    }
}

module.exports = ChunkRadiusUpdatedPacket;