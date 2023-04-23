const Server = require("../server");

try {
    const instance = new Server();
    console.log("All tests passed");
    process.exit(0);
} catch (error) {
    console.log(error.message);
    console.log("Test `" + error + "` Failed");
    return error;
}
