const IdentityTokenParser = require("./identity_token_parser");

class Auth {
  constructor(player, server, onlineMode, identityToken) {
    this.player = player;
    this.server = server;
    this.onlineMode = onlineMode;
    this.identityTokenParser = new IdentityTokenParser(identityToken);
    this.player.displayName = this.identityTokenParser.realName;

    if (this.onlineMode) {
      this.authMainCheck();
    }
  }

  authMainCheck() {
    this.xboxCheck();
    this.accountCheck();
    this.playerNameCheck();
  }

  xboxCheck() {
    if (!this.identityTokenParser.xuid) {
      this.player.disconnect("Use Xbox authentication to join this server");
    }
  }

  accountCheck() {
    if (!this.identityTokenParser.usingAccount) {
      this.player.disconnect("Use an account to join the server");
    }
  }

  playerNameCheck() {
    if (this.playerNameEqualToSomeone()) {
      this.player.displayName = `${this.identityTokenParser.realName} - ${this.server.playerNamesInUse}`;
      ++this.server.playerNamesInUse;
    }
  }

  playerNameEqualToSomeone() {
    if (this.server.getOnlinePlayers().length <= 1) {
      return false;
    }

    return this.server.getOnlinePlayers().some((player) => player.auth.identityTokenParser.realName === this.identityTokenParser.realName);
  }
}

module.exports = Auth;
