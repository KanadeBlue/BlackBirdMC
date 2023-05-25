const dgram = require('dgram')
const { SmartBuffer } = require('@harmonytf/smart-buffer')

class Query {
  clientTokens = new Map()

  constructor(info = {}) {
    this.info = info
    this.socket = dgram.createSocket('udp4')

    // eslint-disable-next-line no-undef
    this.socket.bind(BBMC.config.BBMC.Protocol.Query.port, info.host)

    this.socket.on('listening', () => {
      const address = this.socket.address();
      console.info(`Minecraft Query server started on ${address.address}:${address.port}!`);
    });

    this.socket.on('message', (msg, rinfo) => {
      this._handle(msg, rinfo)
    })
  }

  _genToken() {
    const min = Math.ceil(1000000);
    return Math.floor(Math.random() * (Math.floor(9999999) - min + 1) + min);
  }

  /**
   * 
   * @param {Buffer} msg 
   * @param {dgram.RemoteInfo} rinfo 
   */
  _handle(msg, rinfo) {
    const magick = msg.readUInt16BE(0);
    const type = msg.readUInt8(2);

    if (magick !== 0xfefd) {
      console.info('Client sent bad data.', 'Query')
      return
    }

    if (this.clientTokens.has(rinfo.address) && this.clientTokens.get(rinfo.address).expiresAt < Date.now() || !this.clientTokens.has(rinfo.address)) {
      console.log('token created')
      this.clientTokens.set(rinfo.address, {
        token: this._genToken(),
        expiresAt: Date.now() + 30 * 1000,
      })
    }

    if (type === 0x09) {
      console.log('handshake sent')
      this._sendHandshake(rinfo, msg);
    } else if (type === 0x00 && msg.length == 15) {
      this._sendFullInfo(rinfo, msg);
    } else if (type === 0x00 && msg.length == 11) {
      console.log('basic sent')
      this._sendBasicInfo(rinfo, msg);
    }
  }

  /**
   * 
   * @param {Buffer} rinfo 
   * @param {dgram.RemoteInfo} msg 
   */
  _sendHandshake(rinfo, msg) {
    const sessionID = msg.readInt32BE(3);
    const clientToken = this.clientTokens.get(rinfo.address).token;
    if (!this.clientTokens.has(rinfo.address) || this.clientTokens.get(rinfo.address).expiresAt < Date.now()) {
      return;
    }


    const buffer = new SmartBuffer();
    buffer
      .writeUInt8(0x09)
      .writeInt32BE(sessionID)
      .writeStringNT(clientToken.toString())

    const data = buffer.toBuffer();

    this.socket.send(data, 0, data.length, rinfo.port, rinfo.address, (err) => {
      if (err) {
        console.error(err, 'Query');
      }
    });
  }

  /**
   * 
   * @param {dgram.RemoteInfo} rinfo 
   * @param {Buffer} message 
   */
  _sendBasicInfo(rinfo, message) {
    const sessionID = message.readInt32BE(3);
    const clientToken = this.clientTokens.get(rinfo.address).token;

    if (
      !this.clientTokens.has(rinfo.address) ||
      this.clientTokens.get(rinfo.address).expiresAt < Date.now() ||
      clientToken !== this.clientTokens.get(rinfo.address).token
    ) {
      return;
    }

    const buffer = new SmartBuffer();
    buffer
      .writeUInt8(0x00)
      .writeInt32BE(sessionID)
      .writeStringNT(this.info.motd)
      .writeStringNT("MINECRAFTBE")
      .writeStringNT("No Map Available")
      .writeStringNT(String(this.info.players.size))
      .writeStringNT(String(this.info.max_players))
      .writeUInt16LE(this.info.port)
      .writeStringNT(this.info.host)

    const data = buffer.toBuffer();

    this.socket.send(data, 0, data.length, rinfo.port, rinfo.address, (err) => {
      if (err) {
        console.error(err, 'Query');
      }
    });
  }

  /**
   * 
   * @param {dgram.RemoteInfo} rinfo 
   * @param {Buffer} message 
   */
  _sendFullInfo(rinfo, message) {
    const sessionID = message.readInt32BE(3);
    const clientToken = this.clientTokens.get(rinfo.address).token;

    if (
      !this.clientTokens.has(rinfo.address) ||
      this.clientTokens.get(rinfo.address).expiresAt < Date.now() ||
      clientToken !== this.clientTokens.get(rinfo.address).token
    ) {
      return;
    }

    const kvData = [
      { key: "hostname", value: this.info.motd },
      { key: "gametype", value: "Survival" },
      { key: "game_id", value: "MINECRAFTBE" },
      { key: "version", value: this.info.version },
      { key: "server_engine", value: this.info.engine },
      { key: "plugins", value: `${this.info.engine}: ${this.info.plugins.join('; ')}` },
      { key: "map", value: "No map available" },
      { key: "numplayers", value: this.info.players.size },
      { key: "maxplayers", value: this.info.max_players },
      { key: "whitelist", value: "false" },
      { key: "hostip", value: this.info.host },
      { key: "hostport", value: this.info.port },
    ];

    const buffer = new SmartBuffer();
    buffer
      .writeUInt8(0x00)
      .writeInt32BE(sessionID)
      .writeStringNT("splitnum")
      .writeUInt8(0x80)
      .writeUInt8(0x00)
    kvData.forEach(({ key, value }) => {
      buffer.writeStringNT(String(key));
      buffer.writeStringNT(String(value));
    });
    buffer
      .writeUInt8(0x00)
      .writeUInt8(0x01)
      .writeStringNT("player_")
      .writeUInt8(0x00)
    for (const [playerName] of this.info.players) {
      buffer.writeStringNT(playerName);
    }
    buffer.writeUInt8(0x00)

    const data = buffer.toBuffer();
    this.socket.send(data, 0, data.length, rinfo.port, rinfo.address, (err) => {
      if (err) {
        console.error(err, 'Query');
      }
    });
  }
}

module.exports = Query
