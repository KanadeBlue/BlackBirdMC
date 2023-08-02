const fs = require("fs");

class EventListner {

    constructor() {
        this.events = {};
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

}

module.exports = EventListner;