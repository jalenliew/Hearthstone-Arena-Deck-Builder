const config = require('../../config');
const OauthClient = require('../../oauth/client');

const hsCardsURL = 'hearthstone/cards';

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
        const headers = { Authorization: `Bearer ${oauthToken}` };

        const response = await fetch(documentUri, { headers });

        console.log(response);

        return response;
    } catch (err) {
        return { 
            message: err.message,
            status: 500
        }
    }
};

module.exports = {
    getCard
}