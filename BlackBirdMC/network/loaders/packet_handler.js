
class PacketHandler {


    static handler(stream, connection) {
            let packet_id = stream.readUnsignedByte();
            console.log(packet_id);
            //switch (packet_id) {}
        console.log(`${connection.address.name}:${connection.address.port} sent a packet`);
    }
}

module.exports = PacketHandler;