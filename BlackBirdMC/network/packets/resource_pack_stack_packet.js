const PacketBase = require("../packet_base");
const PacketIdentifiers = require("../packet_identifiers");
const StringCodec = require("../codecs/string_codec");
const ResourcePackIdVersion = require("../types/resource_pack_id_version");
const Experiment = require("../types/experiment");

class ResourcePackStackPacket extends PacketBase {
    /**
     * @type {Boolean}
     */
    must_accept;
    /**
     * @type {Array<ResourcePackIdVersion>}
     */
    behavior_packs;
    /**
     * @type {Array<ResourcePackIdVersion>}
     */
    texture_packs;
    /**
     * @type {String}
     */
    game_version;
    /**
     * @type {Array<Experiment>}
     */
    experiments;
    /**
     * @type {Boolean}
     */
    experiments_previously_used;

    constructor() {
        super(PacketIdentifiers.RESOURCE_PACK_STACK);
    }

    /**
     * Reads the packet body from the stream
     * @param {BinaryStream} stream 
     */
    read_body(stream) {
        this.must_accept = stream.readBool();
        let length = stream.readVarInt();
        this.behavior_packs = new Array(length);
        for (let i = 0; i < length; ++i) {
            let pack = new ResourcePackIdVersion();
            pack.read(stream);
            this.behavior_packs[i] = pack;
        }
        length = stream.readVarInt();
        this.texture_packs = new Array(length);
        for (let i = 0; i < length; ++i) {
            let pack = new ResourcePackIdVersion();
            pack.read(stream);
            this.texture_packs[i] = pack;
        }
        this.game_version = StringCodec.read_string_vil(stream);
        length = stream.readIntLE();
        this.experiments = new Array(length);
        for (let i = 0; i < length; ++i) {
            let experiment = new Experiment();
            experiment.read(stream);
            this.experiments[i] = experiment;
        }
        this.experiments_previously_used = stream.readBool();
    }

    /**
     * Writes the packet body to the stream
     * @param {BinaryStream} stream
     */ 
    write_body(stream) {
        stream.writeBool(this.must_accept);
        stream.writeVarInt(this.behavior_packs.length);
        this.behavior_packs.forEach(pack => pack.write(stream));
        stream.writeVarInt(this.texture_packs.length);
        this.texture_packs.forEach(pack => pack.write(stream));
        StringCodec.write_string_vil(stream, this.game_version);
        stream.writeIntLE(this.experiments.length);
        this.experiments.forEach(experiment => experiment.write(stream));
        stream.writeBool(this.experiments_previously_used);
    }
}

module.exports = ResourcePackStackPacket;