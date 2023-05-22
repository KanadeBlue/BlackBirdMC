interface bbmcYml {
  Vanilla: {
    Server: {
      ip: string
      port: number
      version: [num, num, num]
      maxPlayers: num
    }
    RCON: {
      enable: boolean
      port: number
      pass: string
    }
  }

  BBMC: {
    debug: boolean

    Terminal: {
      showDate: boolean
      showGroup: boolean
    }
  }
}

export default bbmcYml
