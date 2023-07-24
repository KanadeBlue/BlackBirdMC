class WorldBase {
    static generatorName;
    blockStatesMap;
    
    constructor(blockStatesMap) {
        this.blockStatesMap = blockStatesMap;
    }

    generate(x, z) {}
}

module.exports = WorldBase;