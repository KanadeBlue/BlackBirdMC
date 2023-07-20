/* eslint-disable no-case-declarations */
const Frame = require("bbmc-raknet").Frame;
const ReliabilityTool = require("bbmc-raknet").ReliabilityTool;
const Compound = require("bbmc-nbt").Compound;
const BinaryStream = require("bbmc-binarystream");
const PacketIdentifiers = require("./network/packet_identifiers");
const RequestNetworkSettingsPacket = require("./network/packets/request_network_settings_packet");
const NetworkSettingsPacket = require("./network/packets/network_settings_packet");
const GamePacket = require("./network/packets/game_packet");
const PlayStatusPacket = require("./network/packets/play_status_packet");
const PlayStatus = require("./network/constants/play_status");
const ResourcePacksInfoPacket = require("./network/packets/resource_packs_info_packet");
const ResourcePackClientResponsePacket = require("./network/packets/resource_pack_client_response_packet");
const ResourcePackResponseStatus = require("./network/constants/resource_pack_client_response_status");
const ResourcePackStackPacket = require("./network/packets/resource_pack_stack_packet");
const StartGamePacket = require("./network/packets/start_game_packet");
const EducationSharedResourceUri = require("./network/types/education_shared_resource_uri");
const CreativeContentPacket = require("./network/packets/creative_content_packet");
const { item_states } = require("./resources/item_states.json");
const ItemState = require("./network/types/item_state");
const TextPacket = require("./network/packets/text_packet");
const CommandRequestPacket = require("./network/packets/command_request");
const LevelChunkPacket = require("./network/packets/level_chunk_packet");
const ChunkRadiusUpdatedPacket = require("./network/packets/chunk_radius_updated_packet");
const NetworkChunkPublisherUpdatePacket = require("./network/packets/network_chunk_publisher_update");
const BlockCoordinates = require("./network/types/block_coordinates");
const RequestChunkRadiusPacket = require("./network/packets/request_chunk_radius_packet");


class Player {
    connection;
    enable_compression;
    compression_algorithm;
    server;
    spawned = false;
    chunkRadius = 2;

    constructor(connection, server) {
        this.connection = connection;
        this.enable_compression = false;
        this.compression_algorithm = 0;
        this.server = server;
    }

    handle_packet(buffer) {
        let stream = new BinaryStream(buffer);
        let packet_id = stream.readVarInt();
        console.log(packet_id.toString(16));
        switch (packet_id) {
            case PacketIdentifiers.REQUEST_NETWORK_SETTINGS:
                let request_network_settings = new RequestNetworkSettingsPacket();
                request_network_settings.read(stream);
                this.send_network_settings();

                if (PacketIdentifiers.PROTOCOL_VERSION) {
                    if (request_network_settings.client_protocol !== PacketIdentifiers.PROTOCOL_VERSION) {
                        this.send_play_status(PlayStatus.FAILED_CLIENT);
                    }
                }
                break;
            case PacketIdentifiers.LOGIN:
                this.send_play_status(PlayStatus.LOGIN_SUCCESS);
                this.send_resource_packs_info();
                break;
            case PacketIdentifiers.RESOURCE_PACK_CLIENT_RESPONSE:
                let resource_pack_client_response = new ResourcePackClientResponsePacket();
                resource_pack_client_response.read(stream);
                switch (resource_pack_client_response.response_status) {
                    case ResourcePackResponseStatus.NONE:
                    case ResourcePackResponseStatus.HAVE_ALL_PACKS:
                        this.send_resource_pack_stack();
                        break;
                    case ResourcePackResponseStatus.COMPLETED:
                        console.info("Completed");
                        this.send_start_game();
                        this.send_creative_content();
                        this.send_biome_definition_list();
                        this.send_play_status(PlayStatus.PLAYER_SPAWN);
                        break;
                }
                break;
            case PacketIdentifiers.TEXT:
                this.handle_text_packet(stream);
                break
            case PacketIdentifiers.COMMAND_REQUEST:
                this.handle_command_request_packet(stream);
                break;
            case PacketIdentifiers.REQUEST_CHUNK_RADIUS:
                this.request_chunk_radius_packet(stream);
                break;
        }
    }

    request_chunk_radius_packet(stream) {

        let chunkRadiusUpdated = new ChunkRadiusUpdatedPacket();
        chunkRadiusUpdated.read(stream)
        chunkRadiusUpdated.chunkRadius = this.chunkRadius;

        if (!this.spawned) {
            this.send_chunks(stream);
            this.spawned = true;
        }
        this.send_packet(stream.buffer)
    }

    send_chunks(stream) {
        return new Promise((resolve) => {
            this.send_network_chunk_publisher_update(stream);
            for (let chunkX = -this.chunkRadius; chunkX <= this.chunkRadius; ++chunkX) {
                for (let chunkZ = -this.chunkRadius; chunkZ <= this.chunkRadius; ++chunkZ) {
                    console.log(chunkX + (this.position.x >> 4), chunkZ + (this.position.z >> 4))
                }
            }
            resolve();
        });
    }

    send_network_chunk_publisher_update(stream) {
        let networkChunkPublisherUpdate = new NetworkChunkPublisherUpdatePacket();
        networkChunkPublisherUpdate.read(stream);
        networkChunkPublisherUpdate.position = new BlockCoordinates();
        networkChunkPublisherUpdate.position.x = Math.floor(0);
        networkChunkPublisherUpdate.position.y = Math.floor(8);
        networkChunkPublisherUpdate.position.z = Math.floor(0);
        networkChunkPublisherUpdate.radius = this.chunkRadius << 4;
        networkChunkPublisherUpdate.savedChunks = [];
        this.send_packet(stream.buffer);
    }

    handle_level_chunk_packet(stream) {
        let level_chunk_packet = new LevelChunkPacket();
        level_chunk_packet.read(stream);
        this.send_packet(stream.buffer)
    }

    handle_text_packet(stream) {
        let text_packet = new TextPacket();
        text_packet.read(stream);
        this.send_packet(stream.buffer)
    }

    handle_command_request_packet(stream) {
        let command_request_packet = new CommandRequestPacket();
        command_request_packet.read(stream);


        this.server.commands.dispatch(this, command_request_packet.command.substring(1));
        console.log(command_request_packet.command.substring(1));
      }
      

    send_play_status(status) {
        let play_status = new PlayStatusPacket();
        play_status.status = status;
        let stream = new BinaryStream();
        play_status.write(stream);
        this.send_packet(stream.buffer);
    }

    send_biome_definition_list() {
        let stream = new BinaryStream();
        stream.writeVarInt(0x7a);
        stream.writeByte(10);
        stream.writeVarInt(0);
        stream.writeByte(10);
        stream.writeVarInt(5);
        stream.write(Buffer.from("Taiga"));
        stream.writeByte(0);
        stream.writeByte(0);
        this.send_packet(stream.buffer);
    }

    send_network_settings() {
        let network_settings = new NetworkSettingsPacket();
        network_settings.compression_algorithm = this.compression_algorithm;
        network_settings.compression_threshold = 0;
        network_settings.client_throttle = false;
        network_settings.client_throttle_threshold = 0;
        network_settings.client_throttle_scalar = 0;
        let stream = new BinaryStream();
        network_settings.write(stream);
        this.send_packet(stream.buffer);
        this.enable_compression = true;
    }

    send_creative_content() {
        let creative_content = new CreativeContentPacket();
        let stream = new BinaryStream();
        creative_content.write(stream);
        this.send_packet(stream.buffer);
    }

    send_resource_packs_info() {
        let resource_packs_info = new ResourcePacksInfoPacket();
        resource_packs_info.must_accept = false;
        resource_packs_info.has_scripts = false;
        resource_packs_info.force_server_packs = false;
        resource_packs_info.behavior_packs = [];
        resource_packs_info.texture_packs = [];
        let stream = new BinaryStream();
        resource_packs_info.write(stream);
        this.send_packet(stream.buffer);
    }

    send_resource_pack_stack() {
        let resource_pack_stack = new ResourcePackStackPacket();
        resource_pack_stack.must_accept = false;
        resource_pack_stack.behavior_packs = [];
        resource_pack_stack.texture_packs = [];
        resource_pack_stack.game_version = "1.20.0";
        resource_pack_stack.experiments = [];
        resource_pack_stack.experiments_previously_used = false;
        let stream = new BinaryStream();
        resource_pack_stack.write(stream);
        this.send_packet(stream.buffer);
    }

    send_start_game() {
        let start_game = new StartGamePacket();
        start_game.entity_id = 1n;
        start_game.runtime_entity_id = 1n;
        start_game.player_gamemode = 1;
        start_game.player_x = 0;
        start_game.player_y = 8;
        start_game.player_z = 0;
        start_game.player_pitch = 0;
        start_game.player_yaw = 0;
        start_game.seed = 0n;
        start_game.biome_type = 0;
        start_game.biome_name = "plains";
        start_game.dimension = 0;
        start_game.generator = 1;
        start_game.world_gamemode = 1;
        start_game.difficulty = 2;
        start_game.spawn_x = 0;
        start_game.spawn_y = 8;
        start_game.spawn_z = 0;
        start_game.achievements_disabled = false;
        start_game.editor_world = false;
        start_game.created_in_editor = false;
        start_game.exported_from_editor = false;
        start_game.day_cycle_stop_time = 0;
        start_game.edu_offer = 0;
        start_game.edu_features_enabled = false;
        start_game.edu_product_uuid = "cd353ae5-09f1-49ec-ba24-c99e9acc5e2e";
        start_game.rain_level = 0;
        start_game.lightning_level = 0;
        start_game.has_confirmed_platform_locked_content = false;
        start_game.is_multiplayer = true;
        start_game.broadcast_to_lan = true;
        start_game.xbox_live_broadcast_mode = 4;
        start_game.platform_broadcast_mode = 4;
        start_game.enable_commands = true;
        start_game.texture_packs_required = false;
        start_game.gamerules = [];
        start_game.experiments = [];
        start_game.experiments_previously_used = false;
        start_game.bonus_chest = false;
        start_game.map_enabled = false;
        start_game.permission_level = 0;
        start_game.server_chunk_tick_range = 0;
        start_game.has_locked_behavior_pack = false;
        start_game.has_locked_texture_pack = false;
        start_game.is_from_locked_world_template = false;
        start_game.msa_gamertags_only = false;
        start_game.is_from_world_template = false;
        start_game.is_world_template_option_locked = false;
        start_game.only_spawn_v1_villagers = false;
        start_game.persona_disabled = false;
        start_game.custom_skins_disabled = false;
        start_game.emote_chat_muted = false;
        start_game.game_version = "1.20.0";
        start_game.limited_world_width = 0;
        start_game.limited_world_length = 0;
        start_game.is_new_nether = true;
        start_game.edu_resource_uri = new EducationSharedResourceUri();
        start_game.edu_resource_uri.button_name = "";
        start_game.edu_resource_uri.link_uri = "";
        start_game.experimental_gameplay_override = false;
        start_game.chat_restriction_level = 0;
        start_game.disable_player_interactions = false;
        start_game.level_id = "";
        start_game.world_name = "BlackBirdMC";
        start_game.premium_world_template_id = "cd353ae5-09f1-49ec-ba24-c99e9acc5e2e";
        start_game.is_trial = false;
        start_game.movement_authority = 0;
        start_game.rewind_history_size = 0;
        start_game.server_authoritative_block_breaking = false;
        start_game.current_tick = 0n;
        start_game.enchantment_seed = 0;
        start_game.block_properties = [];
        start_game.item_states = new Array(item_states.length);
        for (let i = 0; i < item_states.length; ++i) {
            let item_state = new ItemState();
            item_state.name = item_states[i].name;
            item_state.runtime_id = item_states[i].runtime_id;
            item_state.component_based = item_states[i].component_based;
            start_game.item_states[i] = item_state;
        }
        start_game.multiplayer_correlation_id = "cd353ae5-09f1-49ec-ba24-c99e9acc5e2e";
        start_game.server_authoritative_inventory = false;
        start_game.engine = "BlackBirdMC";
        start_game.property_data = new Compound();
        start_game.block_pallette_checksum = 0n;
        start_game.world_template_id = "cd353ae5-09f1-49ec-ba24-c99e9acc5e2e";
        start_game.client_side_generation = false;
        start_game.block_network_ids_are_hashes = false;
        start_game.server_controlled_sound = false;
        let stream = new BinaryStream();
        start_game.write(stream);
        this.send_packet(stream.buffer);
    }

    send_packet(buffer) {
        let game_packet = new GamePacket(this.enable_compression, this.compression_algorithm);
        game_packet.buffers = [buffer];
        let stream = new BinaryStream();
        game_packet.write(stream);
        let frame = new Frame();
        frame.isFragmented = false;
        frame.reliability = ReliabilityTool.RELIABLE_ORDERED;
        frame.orderChannel = 0;
        frame.stream = stream;
        this.connection.addToQueue(frame);
    }
}

module.exports = Player;
