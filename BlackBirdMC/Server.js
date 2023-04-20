
const {RakNetServer, Frame, ReliabilityTool, InternetAddress, Connection} = require("bbmc-raknet");

class Server {
    raknet_server;

    constructor() {
        this.raknet_server = new RakNetServer(
            new InternetAddress("0.0.0.0", 19132, 4),
            11
        );
        this.raknet_server.message = "MCPE;Testserver;0;1.19.73;0;10;"
        this.raknet_server.on("disconnect", (address) => {
            console.log(`${address.name}:${address.port} disconnected.`);
        });
        this.raknet_server.on("connect", (connection) => {
            console.log(`${connection.address.name}:${connection.address.port} connected!`);
        });
        this.raknet_server.on("packet", (stream, connection) => {
            console.log(`${connection.address.name}:${connection.address.port} sent a packet`);
        });
    }
}

module.exports = Server;