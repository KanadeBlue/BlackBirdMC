const CoordinateUtils = require("../utils/coordinate_utils");
const zlib = require('zlib');
const fs = require("fs").promises;

class World {
    constructor(generatorManager) {
        this.generatorManager = generatorManager;
        this.chunks = new Map();
        this.generator = generatorManager.getGenerator("normal");
    }

    async loadChunk(x, z) {
        const xz = CoordinateUtils.hashXZ(x, z);
        if (!this.chunks.has(xz)) {
            if (await this.loadChunksFromFile()) {
                if (!this.chunks.has(xz)) {
                    this.chunks.set(xz, null);
                    const value = await this.generator.generate(x, z);
                    this.chunks.set(xz, value);
                }
            } else {
                console.log("Can't load chunk at xz: " + xz);
                return null;
            }
        }
        return this.chunks.get(xz);
    }

    async unloadChunk(x, z) {
        const xz = CoordinateUtils.hashXZ(x, z);
        await this.saveChunk();
        this.chunks.delete(xz);
    }

    async pregenerateChunks(centerChunkX, centerChunkZ) {
        const CHUNK_RADIUS = 6; // 12x12 area.
        const allChunks = new Map();

        for (let offsetX = -CHUNK_RADIUS; offsetX <= CHUNK_RADIUS; offsetX++) {
            for (let offsetZ = -CHUNK_RADIUS; offsetZ <= CHUNK_RADIUS; offsetZ++) {
                const chunkX = centerChunkX + offsetX;
                const chunkZ = centerChunkZ + offsetZ;
                const chunk = await this.generator.generate(chunkX, chunkZ);
                allChunks.set(`${chunkX},${chunkZ}`, chunk);
            }
        }

        const filePath = `./bbmc/worlds/${BBMC.config.Vanilla.Server.world}/chunks.json`;
        await this.saveChunksToFile(allChunks, filePath);
    }

    async loadChunksFromFile() {
        const filePath = `./bbmc/worlds/${BBMC.config.Vanilla.Server.world}/chunks.json`;

        try {
            const compressedData = await fs.readFile(filePath);
            const data = this.decompressData(compressedData);
            for (const [coords, chunk] of data) {
                const xz = CoordinateUtils.hashXZ(coords.x, coords.z);
                this.chunks.set(xz, chunk);
            }
            console.log('Successfully loaded chunks from file.');
            return this.chunks;
        } catch (err) {
            console.error('Error loading chunks from file:', err);
            return false;
        }
    }

    async saveChunksToFile(allChunks, saveDirectory) {
        const filename = `${saveDirectory}`;
        const compressedData = this.compressData(Array.from(allChunks));

        try {
            await fs.writeFile(filename, compressedData);
            console.log('All compressed chunks saved to file.');
        } catch (err) {
            console.error('Error saving compressed chunks to file:', err);
        }
    }

    compressData(data) {
        return zlib.deflateSync(JSON.stringify(data));
    }

    decompressData(compressedData) {
        return new Map(JSON.parse(zlib.inflateSync(compressedData).toString()));
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
