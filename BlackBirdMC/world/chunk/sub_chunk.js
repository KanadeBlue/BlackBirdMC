const BlockStorage = require("./block_storage");

class SubChunk {
    constructor(runtimeID) {
        this.blockStorages = [new BlockStorage(runtimeID), new BlockStorage(runtimeID)];
    }

    getBlockRuntimeID(x, y, z, layer) {
        return this.blockStorages[layer].getBlockRuntimeID(x, y, z);
    }

    setBlockRuntimeID(x, y, z, layer, runtimeID) {
        this.blockStorages[layer].setBlockRuntimeID(x, y, z, runtimeID);
    }

    getHighestBlockAt(x, z, layer) {
        return this.blockStorages[layer].getHighestBlockAt(x, z);
    }

    isEmpty() {
        return this.blockStorages.every(blockStorage => blockStorage.isEmpty());
    }
}

module.exports = SubChunk;
