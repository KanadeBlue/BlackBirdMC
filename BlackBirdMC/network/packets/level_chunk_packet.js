const { LEVEL_CHUNK } = require("../packet_identifiers");
const PacketBase = require("../packet_base");

class LevelChunkPacket extends PacketBase {
  constructor() {
    super(LEVEL_CHUNK);
    this.hashes = [];
  }

  read(stream) {
    this.x = stream.readSignedVarInt();
    this.z = stream.readSignedVarInt();
    this.subChunkCount = stream.readVarInt();

    if (this.subChunkCount === 0xfffffffe) {
      this.highestSubChunkCount = stream.readUnsignedShortLE();
    }

    this.cacheEnabled = stream.readBool();

    if (this.cacheEnabled) {
      const hashesCount = stream.readVarInt();
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

    if (this.subChunkCount === 0xfffffffe) {
      stream.writeUnsignedShortLE(this.highestSubChunkCount);
    }

    stream.writeBool(this.cacheEnabled);

    if (this.cacheEnabled) {
      stream.writeVarInt(this.hashes.length);
      for (let i = 0; i < this.hashes.length; ++i) {
        stream.writeUnsignedLongLE(this.hashes[i]);
      }
      stream.writeVarInt(0);
    } else {
      stream.writeVarInt(this.payload.length);
      stream.write(this.payload);
    }
  }

}

module.exports = LevelChunkPacket;
