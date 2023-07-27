// NPM package.
const fs = require("fs").promises;
const path = require('path');
const zlib = require('zlib');

// Custom classes and utility functions
const CoordinateUtils = require("../utils/coordinate_utils");
const Chunk = require('./chunk/chunk');


class World {
    constructor(generatorManager) {
        this.generatorManager = generatorManager;
        this.chunks = new Map();
        this.generator = generatorManager.getGenerator("flat");
    }

    // Load a chunk at given x, z coordinates
    async loadChunk(x, z) {
        const xz = CoordinateUtils.hashXZ(x, z);

        // Try to load chunks from file
        if (await this.loadChunksFromFile()) {
            // If the chunk is not in memory, generate it
            if (!this.chunks.has(xz)) {
                this.chunks.set(xz, await this.generator.generate(x, z));
            }
            return new Chunk(x, z, this.chunks.get(xz).runtimeID);
        }
    }

    // Unload a chunk at given x, z coordinates
    async unloadChunk(x, z) {
        const xz = CoordinateUtils.hashXZ(x, z);
        this.chunks.delete(xz);
    }

    // Pregenerate chunks around the centerChunkX and centerChunkZ
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

        // Save the generated chunks to the file
        await this.saveChunksToFile(allChunks);
    }

    // Load chunks from the file
    async loadChunksFromFile() {
        const filePath = `./bbmc/worlds/${BBMC.config.Vanilla.Server.world}/chunks.json`;

        // Read the compressed data from the file
        const compressedData = await fs.readFile(filePath);

        // Decompress and parse the data
        const data = this.decompressData(compressedData);

        // Store the chunks in the map
        for (const [coords, chunk] of data) {
            const xz = CoordinateUtils.hashXZ(coords.x, coords.z);
            this.chunks.set(xz, chunk);
        }
        return true;
    }

    // Save chunks to the file
    async saveChunksToFile(allChunks) {
        const worldDir = './bbmc/worlds';
        const worldName = BBMC.config.Vanilla.Server.world;
        const filePath = path.join(worldDir, worldName, 'chunks.json');

        try {
            // Check if the directory exists, if not, create it
            await fs.mkdir(path.dirname(filePath), { recursive: true });

            // Check if the file exists
            await fs.access(filePath);

            // File exists, proceed with writing the data
            const compressedData = this.compressData(Array.from(allChunks));
            await fs.writeFile(filePath, compressedData);
            return true;
        } catch (err) {
            // File does not exist, create it
            const compressedData = this.compressData(Array.from(allChunks));
            await fs.writeFile(filePath, compressedData);
            return true;
        }
    }

    // Compress data using zlib
    compressData(data) {
        return zlib.deflateSync(JSON.stringify(data));
    }

    // Decompress data using zlib
    decompressData(compressedData) {
        return new Map(JSON.parse(zlib.inflateSync(compressedData).toString()));
    }

    // Get the generator associated with the world
    getGenerator() {
        return this.generator;
    }

    // Get the block runtime ID at given coordinates and layer
    getBlockRuntimeID(x, y, z, layer) {
        const xz = CoordinateUtils.hashXZ(x >> 4, z >> 4);
        return this.chunks.get(xz).getBlockRuntimeID(x & 0x0f, y, z & 0x0f, layer);
    }

    // Set the block runtime ID at given coordinates and layer
    setBlockRuntimeID(x, y, z, layer, runtimeID) {
        const xz = CoordinateUtils.hashXZ(x >> 4, z >> 4);
        this.chunks.get(xz).setBlockRuntimeID(x & 0x0f, y, z & 0x0f, layer, runtimeID);
    }
}

module.exports = World;
