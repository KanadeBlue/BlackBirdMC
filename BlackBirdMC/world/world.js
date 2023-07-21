const CoordinateUtils = require("../utils/coordinate_utils");

class World {
    generatorManager;
    chunks;
    generator;

    constructor(generatorManager) {
        this.generatorManager = generatorManager;
        this.chunks = new Map();
        this.generator = generatorManager.getGenerator("overworld");
    }

    async loadChunk(x, z) {
        const xz = CoordinateUtils.hashXZ(x, z);
        if (!this.chunks.has(xz)) {
            if (false === false) {
                this.chunks.set(xz, null);
                this.generator.generate(x, z).then((value) => {
                    this.chunks.set(xz, value);
                });
            } else {
                // Handle the condition when the chunk cannot be loaded
            }
        }
        return this.chunks.get(xz);
    }

    async unloadChunk(x, z) {
        const xz = CoordinateUtils.hashXZ(x, z);
        await this.saveChunk();
        if (this.chunks.has(xz)) {
            this.chunks.delete(xz);
        }
    }

    async saveChunk(x, z) {
        // Implementation for saving chunk
    }

    getGenerator() {
        return this.generator;
    }

    getBlockRuntimeID(x, y, z, layer) {
        const xz = CoordinateUtils.hashXZ(x >> 4, z >> 4);
        return this.chunks.get(xz).getBlockRuntimeID(x & 0x0f, y, z & 0x0f, layer);
    }

    setBlockRuntimeID(x, y, z, layer, runtimeID) {
        const xz = CoordinateUtils.hashXZ(x >> 4, z >> 4);
        this.chunks.get(xz).setBlockRuntimeID(x & 0x0f, y, z & 0x0f, layer, runtimeID);
    }
}

module.exports = World;
