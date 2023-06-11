const { language } = require("bbmc-lang");

class Languages {
  constructor(language_name) {
    this.language_name_fallback = "eng";
    this.content = language(language_name) === "Language not found." ? language(this.language_name_fallback) : language(language_name);
  }

  getContent(category, item, arg) {
    const content = this.content[category];
    if (content) {
      return arg ? content[item].replace("%rsn%", arg) : content[item];
    }
    return null;
  }
}

module.exports = Languages;