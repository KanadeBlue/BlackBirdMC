class GeneratorManager {
    generators;
    blockStatesMap;

    constructor(blockStatesMap) {
        this.blockStatesMap = blockStatesMap;
        this.generators = new Map();
    }

    getGenerator(name) {
        return this.generators.get(name) || null;
    }

    registerGenerator(generator) {
        if (!this.generators.has(generator.generatorName)) {
            this.generators.set(generator.generatorName, new generator(this.blockStatesMap));
        }
    }

    unregisterGenerator(name) {
        this.generators.delete(name);
    }
}

module.exports = GeneratorManager;
