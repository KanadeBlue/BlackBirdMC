const PacketBase = require("../packet_base");
const PacketIdentifiers = require("../packet_identifiers");
const TexturePackInfo = require("../types/texture_pack_info");
const BehaviorPackInfo = require("../types/behavior_pack_info");
const GameRule = require("../types/game_rule");
const EducationSharedResourceUri = require("../types/education_shared_resource_uri");
const Experiment = require("../types/experiment");
const {Compound} = require("bbmc-nbt");

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
     * @type {undefined}
     */
    block_properties;
    /**
     * @type {undefined}
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
    }

    /**
     * Writes the packet body to the stream
     * @param {BinaryStream} stream
     */ 
    write_body(stream) {
    }
}

module.exports = StartGamePacket;