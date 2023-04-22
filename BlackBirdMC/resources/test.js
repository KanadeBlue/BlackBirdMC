const Server = require("../Server");

try {
    const instance = new Server();
    console.log("All tests passed");
} catch (error) {
    console.log(error.message);
    console.log("Test `" + error + "` Failed");
    return error;
}
