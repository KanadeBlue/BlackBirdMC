const SubChunk = require("../../world/chunk/sub_chunk");
const BinaryStream = require("bbmc-binarystream");


class ChunkCodec {

    static writeChunk(value, count, runtimeID) {
        const stream = new BinaryStream();
        this.writeSubChunk(new SubChunk(runtimeID), stream);
        for (let i = 0; i < count; ++i) {
            if (value.subChunks.has(i)) {
                this.writeSubChunk(value.subChunks.get(i));
            } else {
                BinaryStream.write(stream.buffer);
            }
        }
        for (let i = 0; i < value.biomes.length; ++i) {
            stream.writeBlockStorage(value.biomes[i]);
        }
        stream.writeUnsignedByte(0);
    }

    writeSubChunk(value, stream) {
        stream.writeUnsignedByte(8);
        stream.writeUnsignedByte(value.blockStorages.length);
        for (let i = 0; i < value.blockStorages.length; ++i) {
            stream.writeBlockStorage(value.blockStorages[i]);
        }
    }
}
module.exports = ChunkCodec;