
const Player = require("../../player");
const Event = require("../event");

class PlayerJoinEvent extends Event {
    
    constructor() {
        super("player_join");
    }

    set_join_message(message) {
        this.join_message = message;
    }

    get_join_message() {
        return this.join_message;
    }

}

module.exports = PlayerJoinEvent;
