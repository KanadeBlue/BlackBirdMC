class BlockStorage {
    constructor(runtimeID) {
        this.blocks = new Array(4096);
        this.palette = new Set([runtimeID]);
    }

    getBlockRuntimeID(x, y, z) {
        const index = (x << 8) | (z << 4) | y;
        return this.palette.has(this.blocks[index]) ? this.blocks[index] : 0;
    }

    setBlockRuntimeID(x, y, z, runtimeID) {
        this.palette.add(runtimeID);
        const index = (x << 8) | (z << 4) | y;
        this.blocks[index] = runtimeID;
    }

    getHighestBlockAt(x, z) {
        for (let y = 15; y >= 0; --y) {
            const index = (x << 8) | (z << 4) | y;
            if (this.blocks[index] !== undefined) {
                return y;
            }
        }
        return -1;
    }

    isEmpty() {
        return this.palette.size <= 1;
    }
}

module.exports = BlockStorage;
