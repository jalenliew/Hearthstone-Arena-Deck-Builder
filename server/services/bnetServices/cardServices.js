const config = require('../../config');
const OauthClient = require('../../oauth/client');

const hsCardsURL = 'hearthstone/cards';

const reduceToken = (accessToken) => {
    return accessToken.token.access_token;
};

const getCard = async (req, res) => {
    try {
        let oauthToken;
        try {
            oauthToken = await OauthClient.getToken();
        } catch (err) {
            res.status(401).send(err.message);
        }

        const { region, locale, gameMode } = req.query;
        const idorslug = req.params.idorslug;
        if (!region || !idorslug) {
            res.status(400).send('Bad Request');
        }

        const queryParams = new URLSearchParams();
        if (locale) queryParams.append('locale', locale);
        if (gameMode) queryParams.append('gameMode', gameMode);

        const host = config.apiHosts[region];
        const documentUri = `${host}/${hsCardsURL}/${idorslug}?${queryParams}`;
        const headers = { Authorization: `Bearer ${reduceToken(oauthToken)}` };

        const response = await fetch(documentUri, { headers }).then((readableStream) => {
            return readableStream.json();
        });

        res.status(200).send(response);
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
};


const getCardPage = async (req, res) => {
    try {
        let oauthToken;
        try {
            oauthToken = await OauthClient.getToken();
        } catch (err) {
            res.status(401).send(err.message);
        }

        // Destructuring req.query prevents data injections
        const { 
            region,
            locale, set, cardClass, manaCost, attack,
            health, collectible, rarity, type,
            minionType, keyword, textFilter, gameMode,
            spellSchool, page, pageSize, sort
        } = req.query;
        if (!region || !page) {
            res.status(400).send('Bad Request');
        }

        const queryParams = new URLSearchParams({ 
            page: page || 1,
            set: set || 'standard'
        });
        if (locale) queryParams.append('locale', locale);
        if (cardClass) queryParams.append('class', cardClass);
        if (manaCost) queryParams.append('manaCost', manaCost);
        if (attack) queryParams.append('attack', attack);
        if (health) queryParams.append('health', health);
        if (collectible) queryParams.append('collectible', collectible);
        if (rarity) queryParams.append('rarity', rarity);
        if (type) queryParams.append('type', type);
        if (minionType) queryParams.append('minionType', minionType);
        if (keyword) queryParams.append('keyword', keyword);
        if (textFilter) queryParams.append('textFilter', textFilter);
        if (gameMode) queryParams.append('gameMode', gameMode);
        if (spellSchool) queryParams.append('spellSchool', spellSchool);
        if (pageSize) queryParams.append('pageSize', pageSize);
        if (sort) queryParams.append('sort', sort);

        const host = config.apiHosts[region];
        const documentUri = `${host}/${hsCardsURL}?${queryParams}`;
        const headers = { Authorization: `Bearer ${reduceToken(oauthToken)}`};

        const response = await fetch(documentUri, {headers}).then((readableStream) => {
            return readableStream.json();
        });

        res.status(200).send(response);
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    getCard,
    getCardPage
}