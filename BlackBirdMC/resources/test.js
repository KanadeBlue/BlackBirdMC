const ColorFormat = require("../utils/color_format")
const ErrorHandler = require("../utils/error_handler")

try {
  require("../start")
  setTimeout(() => {
    console.info(ColorFormat.format_color("Test passed", "green"))
    process.exit(0)
  }, 3000)
} catch (error) {
  console.log(error.message)
  console.log(ColorFormat.format_color("Test failed", "red"))
  ErrorHandler.write_error(error)

  return error
}
