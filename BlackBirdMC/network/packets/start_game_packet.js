const PacketBase = require("../packet_base");
const PacketIdentifiers = require("../packet_identifiers");
const GameRule = require("../types/game_rule");
const EducationSharedResourceUri = require("../types/education_shared_resource_uri");
const Experiment = require("../types/experiment");
const {NBTNetworkBinaryStream} = require("bbmc-nbt");
const UuidCodec = require("../codecs/uuid_codec");
const StringCodec = require("../codecs/string_codec");
const ItemState = require("../types/item_state");
const BlockProperty = require("../types/block_property");

class StartGamePacket extends PacketBase {
    /**
     * @type {BigInt}
     */
    entity_id;
    /**
     * @type {BigInt}
     */
    runtime_entity_id;
    /**
     * @type {Number}
     */
    player_gamemode;
    /**
     * @type {Number}
     */
    player_x;
    /**
     * @type {Number}
     */
    player_y;
    /**
     * @type {Number}
     */
    player_z;
    /**
     * @type {Number}
     */
    player_pitch;
    /**
     * @type {Number}
     */
    player_yaw;
    /**
     * @type {BigInt}
     */
    seed;
    /**
     * @type {Number}
     */
    biome_type;
    /**
     * @type {String}
     */
    biome_name;
    /**
     * @type {Number}
     */
    dimension;
    /**
     * @type {Number}
     */
    generator;
    /**
     * @type {Number}
     */
    world_gamemode;
    /**
     * @type {Number}
     */
    difficulty;
    /**
     * @type {Number}
     */
    spawn_x;
    /**
     * @type {Number}
     */
    spawn_y;
    /**
     * @type {Number}
     */
    spawn_z;
    /**
     * @type {Boolean}
     */
    achievements_disabled;
    /**
     * @type {Boolean}
     */
    editor_world;
    /**
     * @type {Boolean}
     */
    created_in_editor;
    /**
     * @type {Number}
     */
    day_cycle_stop_time;
    /**
     * @type {Number}
     */
    edu_offer;
    /**
     * @type {Boolean}
     */
    edu_features_enabled;
    /**
     * @type {String}
     */
    edu_product_uuid;
    /**
     * @type {Number}
     */
    rain_level;
    /**
     * @type {Number}
     */
    lightning_level;
    /**
     * @type {Boolean}
     */
    has_confirmed_platform_locked_content;
    /**
     * @type {Boolean}
     */
    is_multiplayer;
    /**
     * @type {Boolean}
     */
    broadcast_to_lan;
    /**
     * @type {Number}
     */
    xbox_live_broadcast_mode;
    /**
     * @type {Number}
     */
    platform_broadcast_mode;
    /**
     * @type {Boolean}
     */
    enable_commands;
    /**
     * @type {Boolean}
     */
    texture_packs_required;
    /**
     * @type {Array<GameRule>}
     */
    gamerules;
    /**
     * @type {Array<Experiment>}
     */
    experiments;
    /**
     * @type {Boolean}
     */
    experiments_previously_used
    /**
     * @type {Boolean}
     */
    bonus_chest;
    /**
     * @type {Boolean}
     */
    map_enabled;
    /**
     * @type {Number}
     */
    permission_level;
    /**
     * @type {Number}
     */
    server_chunk_tick_range;
    /**
     * @type {Boolean}
     */
    has_locked_behavior_pack;
    /**
     * @type {Boolean}
     */
    has_locked_texture_pack;
    /**
     * @type {Boolean}
     */
    is_from_locked_world_template;
    /**
     * @type {Boolean}
     */
    msa_gamertags_only;
    /**
     * @type {Boolean}
     */
    is_from_world_template;
    /**
     * @type {Boolean}
     */
    is_world_template_option_locked;
    /**
     * @type {Boolean}
     */
    only_spawn_v1_villagers;
    /**
     * @type {Boolean}
     */
    persona_disabled;
    /**
     * @type {Boolean}
     */
    custom_skins_disabled;
    /**
     * @type {Boolean}
     */
    emote_chat_muted;
    /**
     * @type {String}
     */
    game_version;
    /**
     * @type {Number}
     */
    limited_world_width;
    /**
     * @type {Number}
     */
    limited_world_length;
    /**
     * @type {Boolean}
     */
    is_new_nether;
    /**
     * @type {EducationSharedResourceUri}
     */
    edu_resource_uri;
    /**
     * @type {Boolean}
     */
    experimental_gameplay_override;
    /**
     * @type {Number}
     */
    chat_restriction_level;
    /**
     * @type {Boolean}
     */
    disable_player_interactions;
    /**
     * @type {String}
     */
    level_id;
    /**
     * @type {String}
     */
    world_name;
    /**
     * @type {String}
     */
    premium_world_template_id;
    /**
     * @type {Boolean}
     */
    is_trial;
    /**
     * @type {Number}
     */
    movement_authority;
    /**
     * @type {Number}
     */
    rewind_history_size;
    /**
     * @type {Boolean}
     */
    server_authoritative_block_breaking;
    /**
     * @type {BigInt}
     */
    current_tick;
    /**
     * @type {Number}
     */
    enchantment_seed;
    /**
     * @type {Array<BlockProperty>}
     */
    block_properties;
    /**
     * @type {Array<ItemState>}
     */
    item_states;
    /**
     * @type {String}
     */
    multiplayer_correlation_id;
    /**
     * @type {Boolean}
     */
    server_authoritative_inventory;
    /**
     * @type {String}
     */
    engine;
    /**
     * @type {Compound}
     */
    property_data;
    /**
     * @type {BigInt}
     */
    block_pallette_checksum;
    /**
     * @type {String}
     */
    world_template_id;
    /**
     * @type {Boolean}
     */
    client_side_generation;
    /**
     * @type {Boolean}
     */
    block_network_ids_are_hashes;
    /**
     * @type {Boolean}
     */
    server_controlled_sound;

    constructor() {
        super(PacketIdentifiers.START_GAME);
    }

    /**
     * Reads the packet body from the stream
     * @param {BinaryStream} stream 
     */
    read_body(stream) {
        this.entity_id = stream.readSignedVarLong();
        this.runtime_entity_id = stream.readVarLong();
        this.player_gamemode = stream.readSignedVarInt();
        this.player_x = stream.readFloatLE();
        this.player_y = stream.readFloatLE();
        this.player_z = stream.readFloatLE();
        this.player_pitch = stream.readFloatLE();
        this.player_yaw = stream.readFloatLE();
        this.seed = stream.readUnsignedLongLE();
        this.biome_type = stream.readShortLE();
        this.biome_name = StringCodec.read_string_vil(stream);
        this.dimension = stream.readSignedVarInt();
        this.generator = stream.readSignedVarInt();
        this.world_gamemode = stream.readSignedVarInt();
        this.difficulty = stream.readSignedVarInt();
        this.spawn_x = stream.readSignedVarInt();
        this.spawn_y = stream.readVarInt();
        this.spawn_z = stream.readSignedVarInt();
        this.achievements_disabled = stream.readBool();
        this.editor_world = stream.readBool();
        this.created_in_editor = stream.readBool();
        this.exported_from_editor = stream.readBool();
        this.day_cycle_stop_time = stream.readSignedVarInt();
        this.edu_offer = stream.readSignedVarInt();
        this.edu_features_enabled = stream.readBool();
        this.edu_product_uuid = StringCodec.read_string_vil(stream);
        this.rain_level = stream.readFloatLE();
        this.lightning_level = stream.readFloatLE();
        this.has_confirmed_platform_locked_content = stream.readBool();
        this.is_multiplayer = stream.readBool();
        this.broadcast_to_lan = stream.readBool();
        this.xbox_live_broadcast_mode = stream.readVarInt();
        this.platform_broadcast_mode = stream.readVarInt();
        this.enable_commands = stream.readBool();
        this.texture_packs_required = stream.readBool();
        let length = stream.readVarInt();
        this.gamerules = new Array(length);
        for (let i = 0; i < length; ++i) {
            let gamerule = new GameRule();
            gamerule.read(stream);
            this.gamerules[i] = gamerule;
        }
        length = stream.readIntLE();
        for (let i = 0; i < length; ++i) {
            let experiment = new Experiment();
            experiment.read(stream);
            this.experiments[i] = experiment;
        }
        this.experiments_previously_used = stream.readBool();
        this.bonus_chest = stream.readBool();
        this.map_enabled = stream.readBool();
        this.permission_level = stream.readUnsignedByte();
        this.server_chunk_tick_range = stream.readIntLE();
        this.has_locked_behavior_pack = stream.readBool();
        this.has_locked_texture_pack = stream.readBool();
        this.is_from_locked_world_template = stream.readBool();
        this.msa_gamertags_only = stream.readBool();
        this.is_from_world_template = stream.readBool();
        this.is_world_template_option_locked = stream.readBool();
        this.only_spawn_v1_villagers = stream.readBool();
        this.persona_disabled = stream.readBool();
        this.custom_skins_disabled = stream.readBool();
        this.emote_chat_muted = stream.readBool();
        this.game_version = StringCodec.read_string_vil(stream);
        this.limited_world_width = stream.readIntLE();
        this.limited_world_length = stream.readIntLE();
        this.is_new_nether = stream.readBool();
        this.edu_resource_uri = new EducationSharedResourceUri();
        this.edu_resource_uri.read(stream);
        this.experimental_gameplay_override = stream.readBool();
        this.chat_restriction_level = stream.readUnsignedByte();
        this.disable_player_interactions = stream.readBool();
        this.level_id = StringCodec.read_string_vil(stream);
        this.world_name = StringCodec.read_string_vil(stream);
        this.premium_world_template_id = StringCodec.read_string_vil(stream);
        this.is_trial = stream.readBool();
        this.movement_authority = stream.readSignedVarInt();
        this.rewind_history_size = stream.readSignedVarInt();
        this.server_authoritative_block_breaking = stream.readBool();
        this.current_tick = stream.readLongLE();
        this.enchantment_seed = stream.readSignedVarInt();
        length = stream.readVarInt();
        this.block_properties = new Array(length);
        for (let i = 0; i < length; ++i) {
            let block_property = new BlockProperty();
            block_property.read(stream);
            this.block_properties[i] = block_property;
        }
        length = stream.readVarInt();
        this.item_states = new Array(length);
        for (let i = 0; i < length; ++i) {
            let item_state = new ItemState();
            item_state.read(stream);
            this.item_states[i] = item_state;
        }
        this.multiplayer_correlation_id = StringCodec.read_string_vil(stream);
        this.server_authoritative_inventory = stream.readBool();
        this.engine = StringCodec.read_string_vil(stream);
        let nbt_stream = new NBTNetworkBinaryStream(stream.buffer, stream.offset);
        this.property_data = nbt_stream.readRootTag();
        stream.offset = nbt_stream.offset;
        this.block_pallette_checksum = stream.readUnsignedLongLE();
        this.world_template_id = UuidCodec.read(stream);
        this.client_side_generation = this.readBool();
        this.block_network_ids_are_hashes = this.readBool();
        this.server_controlled_sound = this.readBool();
    }

    /**
     * Writes the packet body to the stream
     * @param {BinaryStream} stream
     */ 
    write_body(stream) {
        stream.writeSignedVarLong(this.entity_id);
        stream.writeVarLong(this.runtime_entity_id);
        stream.writeSignedVarInt(this.player_gamemode);
        stream.writeFloatLE(this.player_x);
        stream.writeFloatLE(this.player_y);
        stream.writeFloatLE(this.player_z);
        stream.writeFloatLE(this.player_pitch);
        stream.writeFloatLE(this.player_yaw);
        stream.writeUnsignedLongLE(this.seed);
        stream.writeShortLE(this.biome_type);
        StringCodec.write_string_vil(stream, this.biome_name);
        stream.writeSignedVarInt(this.dimension);
        stream.writeSignedVarInt(this.generator);
        stream.writeSignedVarInt(this.world_gamemode);
        stream.writeSignedVarInt(this.difficulty);
        stream.writeSignedVarInt(this.spawn_x);
        stream.writeVarInt(this.spawn_y);
        stream.writeSignedVarInt(this.spawn_z);
        stream.writeBool(this.achievements_disabled);
        stream.writeBool(this.editor_world);
        stream.writeBool(this.created_in_editor);
        stream.writeBool(this.exported_from_editor);
        stream.writeSignedVarInt(this.day_cycle_stop_time);
        stream.writeSignedVarInt(this.edu_offer);
        stream.writeBool(this.edu_features_enabled);
        StringCodec.write_string_vil(stream, this.edu_product_uuid);
        stream.writeFloatLE(this.rain_level);
        stream.writeFloatLE(this.lightning_level);
        stream.writeBool(this.has_confirmed_platform_locked_content);
        stream.writeBool(this.is_multiplayer);
        stream.writeBool(this.broadcast_to_lan);
        stream.writeVarInt(this.xbox_live_broadcast_mode);
        stream.writeVarInt(this.platform_broadcast_mode);
        stream.writeBool(this.enable_commands);
        stream.writeBool(this.texture_packs_required);
        stream.writeVarInt(this.gamerules.length);
        this.gamerules.forEach(gamerule => gamerule.write(stream));
        stream.writeIntLE(this.experiments.length);
        this.experiments.forEach(experiment => experiment.write(stream));
        stream.writeBool(this.experiments_previously_used);
        stream.writeBool(this.bonus_chest);
        stream.writeBool(this.map_enabled);
        stream.writeUnsignedByte(this.permission_level);
        stream.writeIntLE(this.server_chunk_tick_range);
        stream.writeBool(this.has_locked_behavior_pack);
        stream.writeBool(this.has_locked_texture_pack);
        stream.writeBool(this.is_from_locked_world_template);
        stream.writeBool(this.msa_gamertags_only);
        stream.writeBool(this.is_from_world_template);
        stream.writeBool(this.is_world_template_option_locked);
        stream.writeBool(this.only_spawn_v1_villagers);
        stream.writeBool(this.persona_disabled);
        stream.writeBool(this.custom_skins_disabled);
        stream.writeBool(this.emote_chat_muted);
        StringCodec.write_string_vil(stream, this.game_version);
        stream.writeIntLE(this.limited_world_width);
        stream.writeIntLE(this.limited_world_length);
        stream.writeBool(this.is_new_nether);
        this.edu_resource_uri.write(stream);
        stream.writeBool(this.experimental_gameplay_override);
        stream.writeUnsignedByte(this.chat_restriction_level);
        stream.writeBool(this.disable_player_interactions);
        StringCodec.write_string_vil(stream, this.level_id);
        StringCodec.write_string_vil(stream, this.world_name);
        StringCodec.write_string_vil(stream, this.premium_world_template_id);
        stream.writeBool(this.is_trial);
        stream.writeSignedVarInt(this.movement_authority);
        stream.writeSignedVarInt(this.rewind_history_size);
        stream.writeBool(this.server_authoritative_block_breaking);
        stream.writeLongLE(this.current_tick);
        stream.writeSignedVarInt(this.enchantment_seed);
        stream.writeVarInt(this.block_properties.length);
        this.block_properties.forEach(block_property => block_property.write(stream));
        stream.writeVarInt(this.item_states.length);
        this.item_states.forEach(item_state => item_state.write(stream));
        StringCodec.write_string_vil(stream, this.multiplayer_correlation_id);
        stream.writeBool(this.server_authoritative_inventory);
        StringCodec.write_string_vil(stream, this.engine);
        let nbt_stream = new NBTNetworkBinaryStream();
        nbt_stream.writeRootTag(this.property_data);
        stream.write(nbt_stream.buffer);
        stream.writeUnsignedLongLE(this.block_pallette_checksum);
        UuidCodec.write(stream, this.world_template_id);
        stream.writeBool(this.client_side_generation);
        stream.writeBool(this.block_network_ids_are_hashes);
        stream.writeBool(this.server_controlled_sound);
    }
}

module.exports = StartGamePacket;