const Server = require("../server");

const ColorFormat = require("../utils/color_format");

try {
    const instance = new Server();
    console.log(ColorFormat.get_color("dark green") + "All tests passed" + ColorFormat.get_color("reset"));
    process.exit(0);
} catch (error) {
    console.log(error.message);
    console.log("Test `" + ColorFormat.get_color("red") + error + ColorFormat.get_color("reset") + "` Failed");
    return error;
}
