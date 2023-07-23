const PacketBase = require("../packet_base");
const PacketIdentifiers = require("../packet_identifiers");
const BlockCodec = require("../codecs/block_codec");


class NetworkChunkPublisherUpdatePacket extends PacketBase {

    position;
    radius;
    savedChunks;

    constructor() {
        super(PacketIdentifiers.NETWORK_CHUNK_PUBLISHER_UPDATE);
    }

    read_body(stream) {
        this.position = BlockCodec.readBlockCoordinates(stream);
        this.radius = stream.readVarInt();
        this.savedChunks = [];
        let count = stream.readIntLE();
        for (let i = 0; i < count; i++) {
            this.savedChunks.push(stream.readVarInt());
            this.savedChunks.push(stream.readVarInt());
        }
    }

    write_body(stream) {
        BlockCodec.writeBlockCoordinates(stream, this.position);
        stream.writeVarInt(this.radius);
        stream.writeIntLE(this.savedChunks.length);
        for (let i = 0; i < this.savedChunks.length; ++i) {
            stream.writeVarInt(this.savedChunks[i]);
            stream.writeVarInt(this.savedChunks[i]);
        }
    }
}

module.exports = NetworkChunkPublisherUpdatePacket;