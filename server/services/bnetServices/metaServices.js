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

        const { region, locale } = req.query;
        const type = req.params.type;
        if (!region || !type) {
            res.status(400).send('Bad Request');
        }

        const queryParams = new URLSearchParams({});
        if (locale) queryParams.append('locale', locale);

        const host = config.apiHosts[region];
        const documentUri = `${host}/${hsMetadataURL}/${type}?${queryParams}`;
        const headers = { Authorization: `Bearer ${reduceToken(oauthToken)}` };

        const response = await fetch(documentUri, { headers }).then((readableStream) => {
            return readableStream.json();
        });

        res.status(200).send(response);
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
};

const getMetadata = async (req, res) => {
    try {
        let oauthToken;
        try {
            oauthToken = await OauthClient.getToken();
        } catch (err) {
            res.status(401).send(err.message);
        }

        const { region, locale } = req.query;
        if (!region) {
            res.status(400).send('Bad Request');
        }

        const queryParams = new URLSearchParams({});
        if (locale) queryParams.append('locale', locale);

        const host = config.apiHosts[region];
        const documentUri = `${host}/${hsMetadataURL}?${queryParams}`;
        const headers = { Authorization: `Bearer ${reduceToken(oauthToken)}`};

        const response = await fetch(documentUri, { headers }).then((readableStream) => {
            return readableStream.json();
        });

        res.status(200).send(response);
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    getMetadataByType,
    getMetadata
};