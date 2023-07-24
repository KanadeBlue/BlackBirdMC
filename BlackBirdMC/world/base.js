class Base {
    constructor(blockStatesMap) {
        this.blockStatesMap = Object.freeze(blockStatesMap);
    }

    generate(x, z) {}
}

module.exports = Base;
