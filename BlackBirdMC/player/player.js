const Human = require("../entity/living/human");
const Vector2F = require("../network/constants/vector2f");


class Player extends Human {
    constructor(connection, server) {
        super();
        this.connection = connection;
        this.server = server;
        this.position = new Vector3F(); // TEMP UP UNLTI WORLDS ARE MADE
        this.position.x = 0.0;
        this.position.y = 8.0;
        this.position.z = 0.0;
        this.rotation = new Vector2F(); // TEMP UP UNLTI WORLDS ARE MADE
        this.rotation.x = 0.0;
        this.rotation.z = 0.0;
        this.boundingBox.x = 0.6; // width
        this.boundingBox.z = 1.9; // height
        this.updateMetadataFlags();
        this.updateAttributes();
    }
}

module.exports = Player;