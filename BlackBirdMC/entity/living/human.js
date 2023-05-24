const Entity = require("../entity");

class Human extends Entity {
    constructor() {
        super();
        this.spawned = false;
    }
}

module.exports = Human;
