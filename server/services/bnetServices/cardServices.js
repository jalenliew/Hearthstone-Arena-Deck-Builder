const config = require('../../config');
const OauthClient = require('../../oauth/client');

const hsCardsURL = 'hearthstone/cards';

const reduceToken = (accessToken) => {
    return accessToken.token.access_token;
}

const getCard = async (req, res) => {
    try {
        let oauthToken;
        try {
            oauthToken = await OauthClient.getToken();
        } catch (err) {
            res.status(401).send('Access Token Error', err.message);
        }

        const { region, idorslug, locale, gameMode } = req.query;
        if (!region || !idorslug) {
            res.status(400).send('Bad request');
        }

        const host = config.apiHosts[region];

        const documentUri = `${host}/${hsCardsURL}/${idorslug}`;
        const headers = { Authorization: `Bearer ${reduceToken(oauthToken)}` };

        const response = await fetch(documentUri, { headers }).then((readableStream) => {
            return readableStream.json();
        });

        res.status(200).send(response);
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
};


const getCardByPage = async (req, res) => {
    try {
        let oauthToken;
        try {
            oauthToken = await OauthClient.getToken();
        } catch (err) {
            res.status(401).send('Access Token Error', err.message);
        }
        const { region, page } = req.query;

        const host = config.apiHosts[region];

        const queryParams = new URLSearchParams({ page: page });
        const documentUri = `${host}/${hsCardsURL}?${queryParams}`;
        const headers = { Authorization: `Bearer ${reduceToken(oauthToken)}`};

        const response = await fetch(documentUri, {headers}).then((readableStream) => {
            return readableStream.json();
        });

        res.status(200).send(response);
    } catch(err) {
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    getCard,
    getCardByPage
}