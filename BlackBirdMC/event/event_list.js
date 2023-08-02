const fs = require("fs");

class EventListner {

    constructor() {
        this.events = {};
        this.currentEvents = {};
        fs.readdirSync(`${__dirname}/player`).forEach((file) => {
            const player = require(`${__dirname}/player/${file}`);
            this.add(new player());
        });
    }


    add(event) {
        if (!(event.name in this.events)) {
            this.events[event.name] = event;
        }
    }

    get(event_name) {
        if (event_name in this.events) {
            return this.events[event_name];
        }
    }

    static add_to_listner(event) {
        this.currentEvents[event] = event;
    }


}

module.exports = EventListner;