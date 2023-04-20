const language = require("bbmc-lang");

class Languages {
    content;

    constructor(language_name) {
        this.content = language(language_name);
    }
    
    plugin(item, arg) {
        if (!arg) {
            return this.content.plugins[item];
        }

        return this.content.plugins[item].replace("%rsn%", arg);
    }
    
    server(item, arg) {
        if (!arg) {
            return this.content.server[item];
        }
        
        return this.content.server[item].replace("%rsn%", arg);
    }

    world(item, arg) {
        if (!arg) {
            return this.content.world[item];
        }

        return this.content.world[item].replace("%rsn%", arg);
    }

    player(item, arg) {
        if (!arg) {
            return this.content.player[item];
        }

        return this.content.player[item].replace("%rsn%", arg);
    }
}

module.exports = Languages;