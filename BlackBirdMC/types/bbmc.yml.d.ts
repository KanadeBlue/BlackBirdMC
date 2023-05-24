type Configuration = {
  Vanilla: {
    Server: {
      ip: string;
      port: number;
      version: [num, num, num];
      maxPlayers: num;
    };
    RCON: {
      enable: boolean;
      port: number;
      pass: string;
    };
  };

  BBMC: {
    debug: boolean;
    language: string;

    Terminal: {
      showDate: boolean;
      showGroup: boolean;
    };
    
    Command: {
      unknown_command: string;
      permission_message: string;
    };
  };
}

interface bbmcYml {
  config: Configuration
}

export default bbmcYml;
