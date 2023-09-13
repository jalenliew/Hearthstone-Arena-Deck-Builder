const config = require('../../config');
const OauthClient = require('../../oauth/client');

const hsDecksURL = 'hearthstone/deck';

const reduceToken = (accessToken) => {
    return accessToken.token.access_token;
};

const getDeckByCode = async (req, res) => {
    try {
        let oauthToken;
        try {
            oauthToken = await OauthClient.getToken();
        } catch (err) {
            res.status(401).send(err.message);
        }

        const { region, locale, code, hero } = req.query;
        if (!region || !code) {
            res.status(400).send('Bad Request');
        }

        const queryParams = new URLSearchParams({
            code: code
        });
        if (locale) queryParams.append('locale', locale);
        if (hero) queryParams.append('hero', hero);

        const host = config.apiHosts[region];
        const documentUri = `${host}/${hsDecksURL}/${queryParams}`;
        const headers = { Authorization: `Bearer ${reduceToken(oauthToken)}` };

        const response = await fetch(documentUri, {headers}).then((readableStream) => {
            return readableStream.json();
        });

        res.status(200).send(response);
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
};

const getDeckByList = async (req, res) => {
    try {
        let oauthToken;
        try {
            oauthToken = await OauthClient.getToken();
        } catch (err) {
            res.status(401).send(err.message);
        }

        const { region, locale, ids, hero } = req.query;
        if (!region || !ids) {
            res.status(400).send('Bad Request');
        }

        const queryParams = new URLSearchParams({
            ids: ids
        });
        if (locale) queryParams.append('locale', locale);
        if (hero) queryParams.append('hero', hero);

        const host = config.apiHosts[region];
        const documentUri = `${host}/${hsDecksURL}/${queryParams}`;
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
    getDeckByCode,
    getDeckByList
}