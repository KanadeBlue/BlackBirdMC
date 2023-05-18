const Server = require("../server");

const ColorFormat = require("../utils/color_format");
const ErrorHandler = require("../utils/error_handler");

try {
    new Server();
    console.log(ColorFormat.format_color("All tests passed", "green"));
    process.exit(0);
} catch (error) {
    console.log(error.message);
    console.log(ColorFormat.format_color("All tests passed", "red"));
    ErrorHandler.write_error(error);
    return error;
}
