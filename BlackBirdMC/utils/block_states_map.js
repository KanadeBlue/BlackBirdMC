class BlockStatesMap {
    runtimeToLegacy;
    legacyToRuntime;

    constructor(nbt) {
        this.runtimeToLegacy = new Map();
        this.legacyToRuntime = new Map();
        let oldName = null;
        let metadata = 0;

        for (let i = 0; i < nbt.value.length; ++i) {
            for (let j = 0; j < nbt.value[i].value.length; ++j) {
                if (nbt.value[i].value[j].tagName === "name") {
                    const name = nbt.value[i].value[j].value;
                    if (name !== oldName) {
                        metadata = 0;
                    }
                    const runtimeKey = `${name} ${metadata}`;
                    this.runtimeToLegacy.set(i, { name, metadata });
                    this.legacyToRuntime.set(runtimeKey, i);
                    ++metadata;
                    oldName = name;
                    break;
                }
            }
        }
    }

    legacyToRuntime(name, metadata = 0) {
        const runtimeKey = `${name} ${metadata}`;
        return this.legacyToRuntime.get(runtimeKey);
    }

    runtimeToLegacy(runtimeID) {
        return this.runtimeToLegacy.get(runtimeID);
    }
}

module.exports = BlockStatesMap;
