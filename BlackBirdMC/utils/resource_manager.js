const { NBTNetworkBinaryStream, NBTLEBinaryStream } = require("bbmc-nbt");
const fs = require("fs");
const path = require("path");
const BlockStatesMap = require("./block_states_map");
const ItemStatesMap = require("./item_states_map");
const Item = require("../network/types/item");
const ItemExtraData = require("../network/types/item_extra_data");

class ResourceManager {
    itemStatesMap;
    blockStatesMap;
    biomeDefinitionList;
    availableEntityIdentifiers;
    creativeItems;

    readFile(name) {
        return fs.readFileSync(path.join(__dirname, `..${path.sep}mc_data${path.sep}${name}`));
    }

    readBiomeDefinitionList() {
        let stream = new NBTNetworkBinaryStream(this.readFile("biome_definition_list.nbt"));
        this.biomeDefinitionList = stream.readRootTag();
    }

    readAvailableEntityIdentifiers() {
        let stream = new NBTNetworkBinaryStream(this.readFile("available_entity_identifiers.nbt"));
        this.availableEntityIdentifiers = stream.readRootTag();
    }

    readBlockStates() {
        let stream = new NBTNetworkBinaryStream(this.readFile("block_states.nbt"));
        this.blockStatesMap = new BlockStatesMap(stream.readCompoundTag());
    }

    readItemStates() {
        this.itemStatesMap = new ItemStatesMap(JSON.parse(this.readFile("item_states.json")));
    }

    readCreativeItems() {
        this.creativeItems = {};
        const creativeItems = JSON.parse(this.readFile("creative_items.json"));
        let entryID = 1;
        for (const entry of creativeItems) {
            const item = new Item();
            item.networkID = this.itemStatesMap.nameToRuntime(entry["name"]);
            item.count = 1;
            item.metadata = "metadata" in entry ? entry["metadata"] : 0;
            item.blockRuntimeID = "block_state_name" in entry ? this.blockStatesMap.legacyToRuntime(entry["block_state_name"], entry["block_state_metadata"]) : 0;
            item.extra = new ItemExtraData();
            if ("nbt_b64" in entry) {
                item.extra.hasNBT = true;
                item.extra.nbtVersion = 1;
                const nbtBuffer = Buffer.from(entry["nbt_b64"], "base64");
                item.extra.nbt = new NBTLEBinaryStream(nbtBuffer).readRootTag();
            } else {
                item.extra.hasNBT = false;
            }
            item.extra.canPlaceOn = [];
            item.extra.canDestroy = [];
            item.extra.blockingTick = 0n;
            this.creativeItems[entryID] = item;
            ++entryID;
        }
    }

    loadResources() {
        this.readBiomeDefinitionList();
        this.readAvailableEntityIdentifiers();
        this.readBlockStates();           
        this.readItemStates();
        this.readCreativeItems();
    }
}

module.exports = ResourceManager;
