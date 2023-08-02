const Block = require("../block");
const Tool = require("../tool");

class CoalOre extends Block {
    maxStack = 64;
    tool = Tool.pickaxe;
    blastResistance = 3;
    hardness = 3;
    isLuminant = false;
    isTransparrent = false;
    isFlammable = false;
    catchesFireFromLava = false;
    isFallable = false;

    constructor() {
        super("minecraft:coal_ore", 0);
    }
}

module.exports = CoalOre;