const fs = require("fs");

class PacketsList {
    static #packets = {};

    static refresh() {
        fs.readdirSync(`${__dirname}/packets`).forEach((file) => {
            const packets = require(`${__dirname}/packets/${file}`);
            this.add(packets);
        });
    }

    static add(packet) {
        if (!(packet.id in this.#packets)) {
            this.#packets[new packet().id] = new packet();
        }
    }

    static get(packetID) {
        return this.#packets[packetID] ?? null;
    }

    static getAll() {
        return Object.entries(this.#packets);
    }
}

module.exports = PacketsList;