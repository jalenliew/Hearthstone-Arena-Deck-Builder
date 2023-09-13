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

module.exports = OAuthClient;