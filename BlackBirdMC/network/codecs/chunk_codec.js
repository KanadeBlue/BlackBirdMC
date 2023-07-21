const SubChunk = require("../../world/chunk/sub_chunk");
const BinaryStream = require("bbmc-binarystream");
const ChunkUtils = require("bbmc-chunkutils");

class ChunkCodec {

    static writeChunk(value, count, runtimeID) {
        const stream = new BinaryStream();
        ChunkCodec.writeSubChunk(new SubChunk(runtimeID), stream);
        for (let i = 0; i < count; ++i) {
            if (value.subChunks.has(i)) {
                ChunkCodec.writeSubChunk(value.subChunks.get(i), stream);
            } else {
                BinaryStream.write(stream.buffer);
            }
        }
        for (let i = 0; i < value.biomes.length; ++i) {
            ChunkUtils.writeBlockStorage(value.biomes[i].blocks, new Array(value.biomes[i].palette));
        }
        stream.writeUnsignedByte(0);
    }

    static writeSubChunk(value, stream) {
        stream.writeUnsignedByte(8);
        stream.writeUnsignedByte(value.blockStorages.length);
        for (let i = 0; i < value.blockStorages.length; ++i) {
            ChunkUtils.writeBlockStorage(value.blockStorages[i].blocks, new Array(value.blockStorages[i].palette));
        }
    }
}
module.exports = ChunkCodec;