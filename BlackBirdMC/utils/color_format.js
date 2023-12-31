// constant values with capital snake case

class ColorFormat {
  static console_bold = "\u001b[1m"
  static console_obfuscated = ""
  static console_italic = "\u001b[3m"
  static console_underline = "\u001b[4m"
  static console_strike = "\u001b[9m"
  static console_reset = "\u001b[m"
  static console_black = "\u001b[38;5;16m"
  static console_dark_purple = "\u001b[38;5;19m"
  static console_dark_green = "\u001b[32m"
  static console_dark_aqua = "\u001b[38;5;37m"
  static console_dark_red = "\u001b[38;5;124m"
  static console_dark_gray = "\u001b[38;5;59m"
  static console_gold = "\u001b[38;5;214m"
  static console_gray = "\u001b[38;5;145m"
  static console_blue = "\u001b[38;5;63m"
  static console_green = "\u001b[38;5;83m"
  static console_aqua = "\u001b[38;5;87m"
  static console_red = "\u001b[38;5;203m"
  static console_purple = "\u001b[38;5;207m"
  static console_yellow = "\u001b[38;5;227m"
  static console_white = "\u001b[38;5;231m"
  static console_minecoin_gold = "\u001b[38;5;185m"

  static colors = {
    reset: this.console_reset,
    red: this.console_red,
    black: this.console_black,
    darkPurple: this.console_dark_purple,
    darkgreen: this.console_dark_green,
    darkaqua: this.console_dark_aqua,
    darkRed: this.console_dark_red,
    darkGrey: this.console_dark_gray,
    darkGray: this.console_dark_gray,
    gold: this.console_gold,
    gray: this.console_gray,
    grey: this.console_gray,
    green: this.console_green,
    bold: this.console_bold,
    italic: this.console_italic,
    underline: this.console_underline,
    strike: this.console_strike,
    obfuscated: this.console_obfuscated
  }

  static get_color(color) {
    // Todo Convert color to ingame if send by ingame.
    let color_lower_case = color.toLowerCase()

    return this.colors[color_lower_case]
  }

  static format_color(text, color) {
    color = color.toLowerCase()

    return this.colors[color] + text + this.colors.reset
  }
}

module.exports = ColorFormat
