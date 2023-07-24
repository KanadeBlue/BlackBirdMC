const CoordinateUtils = require("../utils/coordinate_utils");
const Chunk = require('./chunk/chunk');
const zlib = require('zlib');
const fs = require("fs").promises;

class World {
    constructor(generatorManager) {
        this.generatorManager = generatorManager;
        this.chunks = new Map();
        this.generator = generatorManager.getGenerator("flat");
    }

    async loadChunk(x, z) {
        const xz = CoordinateUtils.hashXZ(x, z);
        if (await this.loadChunksFromFile()) {
            if (!this.chunks.has(xz)) {
                this.chunks.set(xz, await this.generator.generate(x, z));
            }
            return new Chunk(x, z, this.chunks.get(xz).runtimeID);
        }
    }

    async unloadChunk(x, z) {
        const xz = CoordinateUtils.hashXZ(x, z);
        this.chunks.delete(xz);
    }

    async pregenerateChunks(centerChunkX, centerChunkZ) {
        const CHUNK_RADIUS = 3;
        const allChunks = new Map();

        for (let offsetX = -CHUNK_RADIUS; offsetX <= CHUNK_RADIUS; offsetX++) {
            for (let offsetZ = -CHUNK_RADIUS; offsetZ <= CHUNK_RADIUS; offsetZ++) {
                const chunkX = centerChunkX + offsetX;
                const chunkZ = centerChunkZ + offsetZ;
                const chunk = await this.generator.generate(chunkX, chunkZ);
                allChunks.set(`${chunkX},${chunkZ}`, chunk);
            }
        }

        await this.saveChunksToFile(allChunks);
    }

    async loadChunksFromFile() {
        const filePath = `./bbmc/worlds/${BBMC.config.Vanilla.Server.world}/chunks.json`;

        const compressedData = await fs.readFile(filePath);
        const data = this.decompressData(compressedData);
        for (const [coords, chunk] of data) {
            const xz = CoordinateUtils.hashXZ(coords.x, coords.z);
            this.chunks.set(xz, chunk);
        }
        return true;
    }

    async saveChunksToFile(allChunks) {
        const filePath = `./bbmc/worlds/${BBMC.config.Vanilla.Server.world}/chunks.json`;
        const compressedData = this.compressData(Array.from(allChunks));
        await fs.writeFile(filePath, compressedData);
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