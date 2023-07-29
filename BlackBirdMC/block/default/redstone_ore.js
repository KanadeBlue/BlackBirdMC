const Block = require("../block");
const Tool = require("../tool");

class RedstoneOre extends Block {
    maxStack = 64;
    tool = Tool.pickaxe;
    blastResistance = 3;
    hardness = 3;
    isLuminant = true;
    isTransparrent = false;
    isFlammable = false;
    catchesFireFromLava = false;
    isFallable = false;

    constructor() {
        super("minecraft:redstone_ore", 0);
    }
}

module.exports = RedstoneOre;