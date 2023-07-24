const CoordinateUtils = require("../utils/coordinate_utils");
const zlib = require('zlib');
const fs = require("fs");

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
                const value = this.generator.generate(x, z);
                this.chunks.set(xz, value);
            } else {
                console.log("Can't load chunk at xz: " + xz);
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

    async pregenerateChunks(centerChunkX, centerChunkZ) {
        const CHUNK_RADIUS = 6; // 12x12 area.
        const allChunks = [];

        for (let offsetX = -CHUNK_RADIUS; offsetX <= CHUNK_RADIUS; offsetX++) {
            for (let offsetZ = -CHUNK_RADIUS; offsetZ <= CHUNK_RADIUS; offsetZ++) {
                const chunkX = centerChunkX + offsetX;
                const chunkZ = centerChunkZ + offsetZ;

                const chunk = await this.generator.generate(chunkX, chunkZ);
                allChunks.push({ x: chunkX, z: chunkZ, data: chunk });
            }
        }

        const filePath = './bbmc/worlds/' + BBMC.config.Vanilla.Server.world;
        this.saveChunksToFile(allChunks, filePath);
    }
    
    saveChunksToFile(allChunks, saveDirectory) {
        const filename = `${saveDirectory}/chunks.json`;
        const compressedData = this.compressData(allChunks);
    
        fs.writeFile(filename, compressedData, (err) => {
            if (err) {
                console.error('Error saving compressed chunks to file:', err);
            } else {
                console.log('All compressed chunks saved to file.');
            }
        });
    }

    compressData(data) {
        return zlib.deflateSync(JSON.stringify(data));
    }
    
    decompressData(compressedData) {
        return JSON.parse(zlib.inflateSync(compressedData).toString());
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
