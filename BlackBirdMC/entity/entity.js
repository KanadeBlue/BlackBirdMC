
const Vector2F = require("../network/constants/vector2f");
const EntityMetadataStorage = require("../utils/entity_meta_data_storage");

class Entity {
    metadataStorage = new EntityMetadataStorage();
    scaleValue = 1.0;
    onFire = false;
    fireImmune = false;
    noAI = false;
    canClimb = true;
    canDash = true;
    canFly = false;
    canPowerJump = true;
    swimming = false;
    hasCollision = true;
    affectedByGravity = true;
    boundingBox = new Vector2F();
}

module.exports = Entity;
