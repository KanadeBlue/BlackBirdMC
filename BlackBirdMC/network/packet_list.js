const fs = require("fs");

class PacketsList {
    static #packets = {};

    static refresh() {
        fs.readdirSync(`${__dirname}/packets`).forEach((file) => {
            this.add(require(`./${file.replace(".js", "")}`));
        });
    }

    static add(packet) {
        if (!(packet.id in this.#packets)) {
            this.#packets[packet.id] = new packet();
        }
    }

    static get(packetID) {
        if (!(packetID in this.#packets)) return;
        return this.#packets[packetID];
    }

    static getAll() {
        return Object.entries(this.#packets);
    }
}

module.exports = PacketsList;