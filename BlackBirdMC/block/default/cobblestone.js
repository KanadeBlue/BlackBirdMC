const Block = require("../block");
const Tool = require("../tool");

class Cobblestone extends Block {
    maxStack = 64;
    tool = Tool.pickaxe;
    blastResistance = 6;
    hardness = 2;
    isLuminant = false;
    isTransparrent = false;
    isFlammable = false;
    catchesFireFromLava = true;
    isFallable = false;

    constructor() {
        super("minecraft:cobblestone", 0);
    }
}

module.exports = Cobblestone;