const { NBTNetworkBinaryStream, NBTLEBinaryStream } = require("bbmc-nbt");
const fs = require("fs").promises;
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

    async readFile(name) {
        return await fs.readFile(path.join(__dirname, `..${path.sep}mcdata${path.sep}${name}`));
    }

    async readBiomeDefinitionList() {
        let stream = new NBTNetworkBinaryStream(await this.readFile("biome_definition_list.nbt"));
        this.biomeDefinitionList = stream.readRootTag();
         console.debug("Loaded biome_definition_list.nbt");
    }

    async readAvailableEntityIdentifiers() {
        let stream = new NBTNetworkBinaryStream(await this.readFile("available_entity_identifiers.nbt"));
        this.availableEntityIdentifiers = stream.readRootTag();
         console.debug("Loaded available_entity_identifiers.nbt");
    }

    async readBlockStates() {
        let stream = new NBTNetworkBinaryStream(await this.readFile("block_states.nbt"));
        this.blockStatesMap = new BlockStatesMap(stream.readCompoundTag());
         console.debug("Loaded block_states.nbt");
    }

    async readItemStates() {
        this.itemStatesMap = new ItemStatesMap(JSON.parse(await this.readFile("item_states.json")));
         console.debug("Loaded items_states.json");
    }

    async readCreativeItems() {
        this.creativeItems = {};
        const creativeItems = JSON.parse(await this.readFile("creative_items.json"));
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
         console.debug("Loaded creative_items.json");
    }



    async loadResources() {
         console.debug("Loading resources");
        await Promise.all([
            this.readBiomeDefinitionList(),
            this.readAvailableEntityIdentifiers(),
            this.readBlockStates(),
            this.readItemStates(),
            this.readCreativeItems(),
        ]);
         console.debug("Resources Loaded");
    }
}

module.exports = ResourceManager;
