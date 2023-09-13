const config = require('../../config');
const OauthClient = require('../../oauth/client');

const hsCardbacksURL = 'hearthstone/cardbacks';

const reduceToken = (accessToken) => {
    return accessToken.token.access_token;
};

const getCardback = async (req, res) => {
    try {
        let oauthToken;
        try {
            oauthToken = await OauthClient.getToken();
        } catch (err) {
            res.status(401).send(err.message);
        }

        const { region, locale } = req.query;
        const idorslug = req.params.idorslug;
        if (!region || !idorslug) {
            res.status(400).send('Bad Request');
        }

        const queryParams = new URLSearchParams();
        if (locale) queryParams.append('locale', locale);

        const host = config.apiHosts[region];
        const documentUri = `${host}/${hsCardbacksURL}/${idorslug}?${queryParams}`;
        const headers = { Authorization: `Bearer ${reduceToken(oauthToken)}` };

        const response = await fetch(documentUri, {headers}).then((readableStream) => {
            return readableStream.json();
        });

        res.status(200).send(response);
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
};

const getCardbackPage = async (req, res) => {
    try {
        let oauthToken;
        try {
            oauthToken = await OauthClient.getToken();
        } catch (err) {
            res.status(401).send(err.message);
        }

        const {
            region,
            locale, cardBackCategory,
            textFilter, sort,
            page, pageSize
        } = req.query;
        if (!region) {
            res.status(400).send('Bad Request');
        }

        const queryParams = new URLSearchParams({
            page: page || 1,
            set: set || 'standard'
        });
        if (locale) queryParams.append('locale', locale);
        if (cardBackCategory) queryParams.append('cardBackCategory', cardBackCategory);
        if (textFilter) queryParams.append('textFilter', textFilter);
        if (sort) queryParams.append('sort', sort);
        if (pageSize) queryParams.append('pageSize', pageSize);

        const host = config.apiHosts[region];
        const documentUri = `${host}/${hsCardbacksURL}?${queryParams}`;
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
    getCardback,
    getCardbackPage
}