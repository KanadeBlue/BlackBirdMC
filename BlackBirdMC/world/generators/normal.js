const Chunk = require("../chunk/chunk");
const Base = require("../base");
const PerlinNoise = require("../perlin");

class Normal extends Base {
    static generatorName = "normal";

    generate(chunkX, chunkZ) {
        return new Promise((resolve) => {
            let air = this.blockStatesMap.legacyToRuntime("minecraft:air", 0);
            let chunk = new Chunk(chunkX, chunkZ, air);
            let perlin = new PerlinNoise();
            let biomeMap = [];

            for (let x = 0; x < 16; ++x) {
                biomeMap[x] = [];
                for (let z = 0; z < 16; ++z) {
                    const noise = perlin.perlinNoise(((chunkX << 4) + x) * 0.0625, ((chunkZ << 4) + z) * 0.0625, 0);

                    if (noise > 0.6) {
                        biomeMap[x][z] = 'mountains';
                    } else if (noise > 0.4) {
                        biomeMap[x][z] = 'forest';
                    } else {
                        biomeMap[x][z] = 'plains';
                    }
                }
            }

            for (let x = 0; x < 16; ++x) {
                for (let z = 0; z < 16; ++z) {
                    for (let y = 0; y < 16; ++y) {
                        const biome = biomeMap[x][z];
                        const noise = perlin.perlinNoise(((chunkX << 4) + x) * 0.0625, y * 0.0625, ((chunkZ << 4) + z) * 0.0625);
                        if (noise < 0.25) {
                            chunk.setBlockRuntimeID(x, y, z, 0, this.blockStatesMap.legacyToRuntime(`minecraft:grass`, 0));
                        } else {
                            let blockType = 'grass';

                            if (biome === 'mountains' && noise < 0.7) {
                                blockType = 'stone';
                            } else if (biome === 'forest') {
                                blockType = 'grass';
                            }
                            chunk.setBlockRuntimeID(x, y, z, 0, this.blockStatesMap.legacyToRuntime(`minecraft:${blockType}`, 0));
                        }
                    }
                }
            }

            resolve(chunk);
        });
    }
}

module.exports = Normal;