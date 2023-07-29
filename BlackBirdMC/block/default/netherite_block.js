const Block = require("../block");
const Tool = require("../tool");

class NetheriteBlock extends Block {
    maxStack = 64;
    tool = Tool.pickaxe;
    blastResistance = 1200;
    hardness = 50;
    isLuminant = false;
    isTransparrent = false;
    isFlammable = false;
    catchesFireFromLava = false;
    isFallable = false;

    constructor() {
        super("minecraft:netherite_block", 0);
    }
}

module.exports = NetheriteBlock;