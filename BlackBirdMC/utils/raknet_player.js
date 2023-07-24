class RakNetPlayer {
    static players_data = {};

    /**
     * Get the player associated with the given address.
     * @param {string} str_addr - The address of the player.
     * @returns {object|null} The player object if found, or null if not found.
     */
    static get_player(str_addr) {
        return this.players_data[str_addr] || null;
    }

    /**
     * Register a new player.
     * @param {string} str_addr - The address of the player.
     * @param {object} player - The player object to register.
     * @returns {void}
     */
    static register_player(str_addr, player) {
        this.players_data[str_addr] = player;
    }

    /**
     * Unregister a player by their address.
     * @param {string} str_addr - The address of the player to unregister.
     * @returns {void}
     */
    static unregister_player(str_addr) {
        delete this.players_data[str_addr];
    }

    /**
     * Get all players as an object without modifying it directly.
     * @returns {object} A shallow copy of the players object.
     */
    static get_all_without_editing() {
        return { ...this.players_data };
    }

    /**
     * Get all players as an array of [key, value] entries.
     * @returns {Array<[string, object]>} An array of [key, value] entries representing players.
     */
    static get_all_object_entries() {
        return Object.entries(this.players_data);
    }

    /**
     * Get all players as an array of player objects.
     * @returns {Array<object>} An array of player objects.
     */
    static get_all_object_values() {
        return Object.values(this.players_data);
    }

    /**
     * Get the number of players.
     * @returns {number} The number of players.
     */
    static get_length() {
        return Object.keys(this.players_data).length;
    }
}

module.exports = RakNetPlayer;
