// Currently only set up for us region
const host = 'https://us.api.blizzard.com';
const hsCardsURL = 'hearthstone/cards';

const getCard = async (req, res) => {
    try {
        const { region, idorslug, locale, gameMode } = req.query;
        const documentUri = `${host}/${hsCardsURL}/${idorslug}`;
        const headers = '';
        console.log(documentUri);
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