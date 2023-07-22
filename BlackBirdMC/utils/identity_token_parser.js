class IdentityTokenParser {
    constructor(token) {
      this.token = token;
      const parsedToken = JSON.parse(Buffer.from(this.token, "binary").toString());
      const mappedIdentityData = parsedToken.chain.map((receivedData) => {
        const [, splittedData] = receivedData.split(".");
        return JSON.parse(Buffer.from(splittedData, "base64").toString());
      });
  
      this.fixatedData = mappedIdentityData;
      this.usingAccount = mappedIdentityData.length > 0;
      this.fixatedExtraData = mappedIdentityData[this.usingAccount ? 2 : 0]?.extraData || {};
      this.xuid = this.fixatedExtraData.XUID;
      this.realName = this.fixatedExtraData.displayName;
      this.identity = this.fixatedExtraData.identity;
    }
  }
  
  module.exports = IdentityTokenParser;
  