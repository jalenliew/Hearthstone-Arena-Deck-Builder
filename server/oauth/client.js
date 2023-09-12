const BNET_ID = process.env.CLIENT_ID;
const BNET_SECRET = process.env.CLIENT_SECRET;
const OAUTH_TOKEN_HOST = process.env.OAUTH_TOKEN_HOST || "https://us.battle.net";
const OAUTH_CALLBACK_URL = process.env.OAUTH_CALLBACK_URL || "http://localhost:3000/oauth/battlenet/callback";

const oauthOptions = {
    client: {
        id: BNET_ID,
        secret: BNET_SECRET
    },
    auth: {
        tokenHost: OAUTH_TOKEN_HOST
    }
};

const { ClientCredentials } = require('simple-oauth2');

const OAuthClient = new ClientCredentials(oauthOptions);

// class OAuthClient {
//     constructor() {
//         this.client = new ClientCredentials(oauthOptions);
//         this.token = null;
//     }

//     async getToken() {
//         try {
//             if (this.token === null || this.token.expired()) {
//                 const token = await this.client.clientCredentials.getToken();
//                 this.token = this.client.accessToken.create(token);
//             }
//             return this._reduceToken(this.token);
//         } catch (err) {
//             console.error(`Failed to retrieve client credentials oauth token: ${err.message}`);
//             throw err;
//         }
//     }

//     _reduceToken(token) {
//         return token.token.access_token;;
//     }
// }

module.exports = OAuthClient;