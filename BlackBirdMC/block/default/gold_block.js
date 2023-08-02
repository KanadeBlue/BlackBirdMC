const Block = require("../block");
const Tool = require("../tool");

class GoldBlock extends Block {
    maxStack = 64;
    tool = Tool.pickaxe;
    blastResistance = 6;
    hardness = 3;
    isLuminant = false;
    isTransparrent = false;
    isFlammable = false;
    catchesFireFromLava = false;
    isFallable = false;

    constructor() {
        super("minecraft:gold_block", 0);
    }
}

module.exports = GoldBlock;