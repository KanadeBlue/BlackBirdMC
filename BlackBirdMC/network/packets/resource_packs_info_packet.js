const PacketBase = require("../packet_base");
const PacketIdentifiers = require("../packet_identifiers");
const TexturePackInfo = require("../types/texture_pack_info");
const BehaviorPackInfo = require("../types/behavior_pack_info");

class ResourcePacksInfoPacket extends PacketBase {
    /**
     * @type {Boolean}
     */
    must_accept;
    /**
     * @type {Boolean}
     */
    has_scripts;
    /**
     * @type {Boolean}
     */
    force_server_packs;
    /**
     * @type {Array<BehaviorPackInfo>}
     */
    behavior_packs;
    /**
     * @type {Array<TexturePackInfo>}
     */
    texture_packs;

    constructor() {
        super(PacketIdentifiers.RESOURCE_PACKS_INFO);
    }

    /**
     * Reads the packet body from the stream
     * @param {BinaryStream} stream 
     */
    read_body(stream) {
        this.must_accept = stream.readBool();
        this.has_scripts = stream.readBool();
        this.force_server_packs = stream.readBool();
        let length = this.readShortLE();
        this.behavior_packs = new Array(length);
        for (let i = 0; i < length; ++i) {
            let pack = new BehaviorPackInfo();
            pack.read(stream);
            this.behavior_packs[i] = pack;
        }
        length = this.readShortLE();
        this.texture_packs = new Array(length);
        for (let i = 0; i < length; ++i) {
            let pack = new TexturePackInfo();
            pack.read(stream);
            this.texture_packs[i] = pack;
        }
    }

    /**
     * Writes the packet body to the stream
     * @param {BinaryStream} stream
     */ 
    write_body(stream) {
        stream.writeBool(this.must_accept);
        stream.writeBool(this.has_scripts);
        stream.writeBool(this.force_server_packs);
        stream.writeShortLE(this.behavior_packs.length);
        this.behavior_packs.forEach(pack => pack.write(stream));
        stream.writeShortLE(this.texture_packs.length);
        this.texture_packs.forEach(pack => pack.write(stream));
    }
}

module.exports = ResourcePacksInfoPacket;