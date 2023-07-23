const PacketBase = require("../packet_base");
const PacketIdentifiers = require("../packet_identifiers");

class ChunkRadiusUpdatedPacket extends PacketBase {

    chunkRadius;

    constructor() {
        super(PacketIdentifiers.CHUNK_RADIUS_UPDATED);
    }

    read_body(stream) {
        this.chunkRadius = stream.readSignedVarInt();
    }

    write_body(stream) {
        stream.writeSignedVarInt(this.chunkRadius);
    }
}

module.exports = ChunkRadiusUpdatedPacket;