const { language } = require("bbmc-lang");

class Languages {
  constructor(language_name) {
    this.language_name_fallback = "eng";
    this.content = language(language_name) === "404" ? language(this.language_name_fallback) : language(language_name);
  }

  getContent(category, item, args) {
    const content = this.content[category];
    if (content) {
      let result = content[item];
      if (result && args) {
        result = result
          .replace("%rsn%", args.rsn || "")
          .replace("%time%", args.time || "")
          .replace("%ver", args.ver || "")
          .replace("%plu", args.plu || "")
          .replace("%ip", args.ip || "")
          .replace("%port", args.port || "");
      }
      return result;
    }
    return null;
  }
}

module.exports = Languages;
