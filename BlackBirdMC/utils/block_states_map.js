class BlockStatesMap {
    #runtimeToLegacy;
    #legacyToRuntime;

    constructor(nbt) {
        this.#runtimeToLegacy = [];
        this.#legacyToRuntime = {};
        let oldName = null;
        let metadata = 0;
        for (let i = 0; i < nbt.value.length; ++i) {
            for (let j = 0; j < nbt.value[i].value.length; ++j) {
                if (nbt.value[i].value[j].tagName === "name") {
                    if (nbt.value[i].value[j].value !== oldName) {
                        metadata = 0;
                    }
                    this.#runtimeToLegacy.push({
                        name: nbt.value[i].value[j].value,
                        metadata: metadata,
                    });
                    this.#legacyToRuntime[`${nbt.value[i].value[j].value} ${metadata}`] = i;
                    ++metadata;
                    oldName = nbt.value[i].value[j].value;
                    break;
                }
            }
        }
    }

    legacyToRuntime(name, metadata = 0) {
        return this.#legacyToRuntime[`${name} ${metadata}`];
    }

    runtimeToLegacy(runtimeID) {
        return this.#runtimeToLegacy[runtimeID];
    }
}

module.exports = BlockStatesMap;