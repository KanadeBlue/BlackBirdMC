const BlockStorage = require("./block_storage");
const SubChunk = require("./sub_chunk");

const MAXSUBCHUNKS = 24;

class Chunk {
    constructor(x, z, runtimeID) {
        this.x = x;
        this.z = z;
        this.runtimeID = runtimeID;
        this.subChunks = new Map();
        this.biomes = Array.from({ length: MAXSUBCHUNKS }, () => new BlockStorage(1));
    }

    getBlockRuntimeID(x, y, z, layer) {
        const index = y >> 4;
        if (this.subChunks.has(index)) {
            return this.subChunks.get(index).getBlockRuntimeID(x & 0x0f, y & 0x0f, z & 0x0f, layer);
        }
        return this.runtimeID;
    }

    setBlockRuntimeID(x, y, z, layer, runtimeID) {
        const index = y >> 4;
        if (index < MAXSUBCHUNKS && index >= 0) {
            if (!this.subChunks.has(index)) {
                this.subChunks.set(index, new SubChunk(this.runtimeID));
            }
            return this.subChunks.get(index).setBlockRuntimeID(x & 0x0f, y & 0x0f, z & 0x0f, layer, runtimeID);
        }
    }

    getHighestBlockAt(x, z, layer) {
        for (let i = MAXSUBCHUNKS - 1; i >= 0; --i) {
            if (this.subChunks.has(i)) {
                const y = this.subChunks.get(i).getHighestBlockAt(x, z, layer);
                if (y !== -1) {
                    return (i << 4) + y;
                }
            }
        }
        return -1;
    }

    isEmpty() {
        if (this.subChunks.size === 0) {
            return true;
        }
        for (let i = 0, len = MAXSUBCHUNKS; i < len; ++i) {
            if (this.subChunks.has(i) && !this.subChunks.get(i).isEmpty()) {
                return false;
            }
        }
        return true;
    }

    getSubChunksSendCount() {
        for (let i = MAXSUBCHUNKS - 1; i >= 0; --i) {
            if (this.subChunks.has(i) && !this.subChunks.get(i).isEmpty()) {
                return i + 1;
            }
        }
        return 0;
    }
}

module.exports = Chunk;
