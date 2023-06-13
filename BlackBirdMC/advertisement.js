class Advertisement {
  constructor(players) {
    // eslint-disable-next-line no-undef
    this.motd = BBMC.config.Vanilla.Server.motd
    // eslint-disable-next-line no-undef
    this.version = BBMC.config.Vanilla.Server.version.join('.')
    // eslint-disable-next-line no-undef
    this.max_players = BBMC.config.Vanilla.Server.max_players
    this.players = players.size
  }

  getData() {
    return [
      'MCPE',
      this.motd,
      '0',
      this.version,
      this.players,
      this.max_players
    ].join(';') + ';'
  }

  setMaxPlayers(max) {
    this.max_players = max
  }

  setMotd(motd) {
    this.motd = motd
  }
}

module.exports = Advertisement