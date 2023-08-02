const Block = require("../block");
const Tool = require("../tool");

class FroglightVerdant extends Block {
    maxStack = 64;
    tool = Tool.none;
    blastResistance = 0.3;
    hardness = 0.3;
    isLuminant = true;
    isTransparrent = false;
    isFlammable = false;
    catchesFireFromLava = false;
    isFallable = false;

    constructor() {
        super("minecraft:verdant_froglight", 0);
    }
}

module.exports = FroglightVerdant;