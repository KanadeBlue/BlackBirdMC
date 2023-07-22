const { LEVEL_CHUNK } = require("../packet_identifiers");
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
    this.payload = stream.read(stream.readVarInt());
  }

  write(stream) {
    stream.writeSignedVarInt(this.x);
    stream.writeSignedVarInt(this.z);
    stream.writeVarInt(this.subChunkCount);

    if (this.subChunkCount === 0xfffffffe) {
      stream.writeUnsignedShortLE(this.highestSubChunkCount);
    }

    stream.writeBool(this.cacheEnabled);
    stream.writeVarInt(this.payload.length);
    stream.write(this.payload);
  }

}

module.exports = LevelChunkPacket;
