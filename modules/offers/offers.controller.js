var offerService = require('./offers.services');

exports.insertOffer = async (req, res) => {
    const offer = req.body;
    try {
        const result = await offerService.insertOffer(offer);
        res.status(200).json(result);
    } catch (error) {
        console.error('Erreur lors de l\'insertion de l\'offre :', error);
        res.status(500).json({ error: 'Erreur lors de l\'insertion de l\'offre' });
    }
};

exports.getOfferList = async (req, res) => {
    try {
        const result = await offerService.getOfferList();
        res.status(200).json(result);
    } catch (error) {
        console.error('Erreur lors de la récupération de la liste des offres :', error);
        res.status(500).json({ error: 'Erreur lors de la récupération de la liste des offres' });
    }
};

exports.getOfferById = async (req, res) => {
  const _id = req.body._id;
    try {
        const result = await offerService.getOfferById(req._id);
        res.status(200).json(result);
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'offre :', error);
        res.status(500).json({ error: 'Erreur lors de la récupération de l\'offre' });
    }
};