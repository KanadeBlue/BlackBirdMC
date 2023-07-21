const Block = require("../block");
const Tool = require("../tool");

class Grass extends Block {
    maxStack = 64;
    tool = Tool.shovel;
    blastResistance = 0.6;
    hardness = 0.6;
    isLuminant = false;
    isTransparrent = false;
    isFlammable = false;
    catchesFireFromLava = false;

    constructor() {
        super("minecraft:grass", 0);
    }
}

module.exports = Grass;