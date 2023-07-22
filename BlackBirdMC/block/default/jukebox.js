const Block = require("../block");
const Tool = require("../tool");

class Jukebox extends Block {
    maxStack = 64;
    tool = Tool.axe;
    blastResistance = 6;
    hardness = 2;
    isLuminant = false;
    isTransparrent = false;
    isFlammable = false;
    catchesFireFromLava = true;
    isFallable = false;

    constructor() {
        super("minecraft:jukebox", 0);
    }
}

module.exports = Jukebox;