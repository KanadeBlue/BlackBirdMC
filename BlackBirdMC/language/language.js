const language = require("bbmc-lang");

class Languages {
    /**
     * content = json array
     * @return {JSON} 
     */
    content;

    language_name_fallback = "eng";

    constructor(language_name) {
        if (language(language_name) == `Language not found.`) {
            this.content = language(this.language_name_fallback);
        } else {
            this.content = language(language_name);
        }
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
