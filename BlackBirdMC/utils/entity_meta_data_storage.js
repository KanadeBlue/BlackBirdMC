const MetadataListProperties = require("../network/constants/meta_data_list_properties");
const MetadataPropertyTypes = require("../network/constants/meta_data_property_types");
const MetadataEntry = require("./meta_data_entry");

class EntityMetadataStorage {
    metadata;

    constructor() {
        this.metadata = {};
    }

    getEntry(key) {
        return this.metadata[key] || null;
    }

    setEntry(key, value, entryType) {
        const entry = new MetadataEntry();
        entry.value = value;
        entry.type = entryType;
        this.metadata[key] = entry;
    }

    getByte(key) {
        const entry = this.getEntry(key);
        return entry && entry.type === MetadataPropertyTypes.byte ? entry.value : null;
    }

    setEntryWithType(key, value, entryType) {
        const entry = new MetadataEntry();
        entry.value = value;
        entry.type = entryType;
        this.metadata[key] = entry;
    }

    setByte(key, value) {
        this.setEntryWithType(key, value, MetadataPropertyTypes.byte);
    }

    getShort(key) {
        const entry = this.getEntry(key);
        return entry && entry.type === MetadataPropertyTypes.short ? entry.value : null;
    }

    setShort(key, value) {
        this.setEntryWithType(key, value, MetadataPropertyTypes.short);
    }

    getInt(key) {
        const entry = this.getEntry(key);
        return entry && entry.type === MetadataPropertyTypes.int ? entry.value : null;
    }

    setInt(key, value) {
        this.setEntryWithType(key, value, MetadataPropertyTypes.int);
    }

    getFloat(key) {
        const entry = this.getEntry(key);
        return entry && entry.type === MetadataPropertyTypes.float ? entry.value : null;
    }

    setFloat(key, value) {
        this.setEntryWithType(key, value, MetadataPropertyTypes.float);
    }

    getString(key) {
        const entry = this.getEntry(key);
        return entry && entry.type === MetadataPropertyTypes.str ? entry.value : null;
    }

    setString(key, value) {
        this.setEntryWithType(key, value, MetadataPropertyTypes.str);
    }

    getNBT(key) {
        const entry = this.getEntry(key);
        return entry && entry.type === MetadataPropertyTypes.nbt ? entry.value : null;
    }

    setNBT(key, value) {
        this.setEntryWithType(key, value, MetadataPropertyTypes.nbt);
    }

    getVec3i(key) {
        const entry = this.getEntry(key);
        return entry && entry.type === MetadataPropertyTypes.vec3i ? entry.value : null;
    }

    setVec3i(key, value) {
        this.setEntryWithType(key, value, MetadataPropertyTypes.vec3i);
    }

    getLong(key) {
        const entry = this.getEntry(key);
        return entry && entry.type === MetadataPropertyTypes.long ? entry.value : null;
    }

    setLong(key, value) {
        this.setEntryWithType(key, value, MetadataPropertyTypes.long);
    }

    getVec3f(key) {
        const entry = this.getEntry(key);
        return entry && entry.type === MetadataPropertyTypes.vec3f ? entry.value : null;
    }

    setVec3f(key, value) {
        this.setEntryWithType(key, value, MetadataPropertyTypes.vec3f);
    }

    getFlag(flag, extended = false) {
        const flags = this.getLong(extended ? MetadataListProperties.flagsExtended : MetadataListProperties.flags);
        return flags !== null && (flags & (1n << BigInt(flag))) > 0n;
    }

    setFlag(flag, value, extended = false) {
        const currentValue = this.getFlag(flag, extended);
        if (currentValue === null || currentValue !== value) {
            const flags = currentValue === null ? 0n : this.getLong(extended ? MetadataListProperties.flagsExtended : MetadataListProperties.flags);
            this.setLong(extended ? MetadataListProperties.flagsExtended : MetadataListProperties.flags, flags ^ (1n << BigInt(flag)));
        }
    }
}

module.exports = EntityMetadataStorage;
