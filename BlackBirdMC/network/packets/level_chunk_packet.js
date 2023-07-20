const PacketIdentifiers = require("../packet_identifiers");
const PacketBase = require("../packet_base");

class LevelChunkPacket extends PacketBase {

    x;
    z;
    subChunkCount;
    highestSubChunkCount;
    cacheEnabled;
    hashes;
    payload;

    constructor() {
        super(PacketIdentifiers.LEVEL_CHUNK);
    }

    read(stream) {
        this.x = stream.readSignedVarInt();
        this.z = stream.readSignedVarInt();
        this.subChunkCount = stream.readVarInt();
        if (this.subChunkCount == 0xfffffffe) {
            this.highestSubChunkCount = stream.readUnsignedShortLE();
        }
        this.cacheEnabled = stream.readBool();
        if (this.cacheEnabled === true) {
            this.hashes = [];
            let hashesCount = stream.readVarInt();
            for (let i = 0; i < hashesCount; ++i) {
                this.hashes.push(stream.readUnsignedLongLE());
            }
        }
        this.payload = stream.readByteArrayVarInt();
    }

    write(stream) {
        stream.writeSignedVarInt(this.x);
        stream.writeSignedVarInt(this.z);
        stream.writeVarInt(this.subChunkCount);
        if (this.subChunkCount == 0xfffffffe) {
            stream.writeUnsignedShortLE(this.highestSubChunkCount);
        }
        stream.writeBool(this.cacheEnabled);
        if (this.cacheEnabled === true) {
            stream.writeVarInt(this.hashes.length);
            for (let i = 0; i < this.hashes.length; ++i) {
                stream.writeUnsignedLongLE(this.hashes[i]);
            }
            stream.writeVarInt(0);
        } else {
            stream.writeByteArrayVarInt(this.payload);
        }
    }
}

module.exports = LevelChunkPacket;