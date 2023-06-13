const Human = require("../entity/living/human");
const Vector2F = require("../network/constants/vector2f");
const Vector3F = require("../network/constants/vector3f");


class Player extends Human {
    constructor(connection, server) {
        super();
        this.connection = connection;
        this.server = server;
        this.position = new Vector3F(0.0, 8.0, 0.0); // TEMP UP UNLTI WORLDS ARE MADE
        this.rotation = new Vector2F(0.0, 0.0); // TEMP UP UNLTI WORLDS ARE MADE
        this.boundingBox.x = 0.6; // width
        this.boundingBox.z = 1.9; // height
        this.updateMetadataFlags();
        this.updateAttributes();
    }
}

module.exports = Player;