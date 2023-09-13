const config = require('../../config');
const OauthClient = require('../../oauth/client');

const hsMetadataURL = 'hearthstone/metadata';

const reduceToken = (accessToken) => {
    return accessToken.token.access_token;
};

const getMetadataByType = async (req, res) => {
    try {
        let oauthToken;
        try {
            oauthToken = await OauthClient.getToken();
        } catch (err) {
            res.status(401).send(err.message);
        }

        const { region } = req.query;
        const type = req.params.type;
        if (!region || !type) {
            res.status(400).send('Bad Request');
        }

        const host = config.apiHosts[region];
        const documentUri = `${host}/${hsMetadataURL}/${type}`;
        const headers = { Authorization: `Bearer ${reduceToken(oauthToken)}` };

        const response = await fetch(documentUri, {headers}).then((readableStream) => {
            return readableStream.json();
        });

        res.status(200).send(response);
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    getMetadataByType
}