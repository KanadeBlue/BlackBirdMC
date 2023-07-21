class Block {
    blockName;
    metadata;
    maxStack;
    tool;
    blastResistance;
    hardness;
    isLuminant;
    isTransparrent;
    isFlammable;
    isFallable;
    catchesFireFromLava;

    constructor(blockName, metadata = 0) {
        this.blockName = blockName;
        this.metadata = metadata;
    }

    interact(source, position, blockFace) {}

    toRuntimeID(resourceManager) {
        return resourceManager.blockStatesMap.legacyToRuntime(this.blockName, this.metadata);
    }
}

module.exports = Block;