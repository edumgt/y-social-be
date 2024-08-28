const { adService } = require("../services/ads.service");

class AdController {
    handleRequest = async (req, res, operation) => {
        try {
            const result = await operation();
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    createAd = (req, res) => {
        handleRequest(req, res, () => adService.createAd(req.body));
    };

    updateAd = (req, res) => {
        handleRequest(req, res, () => adService.updateAd(req.params.id, req.body));
    };

    deleteAd = (req, res) => {
        handleRequest(req, res, () => adService.deleteAd(req.params.id));
    };

    getAllAds = (req, res) => {
        handleRequest(req, res, () => adService.getAllAds());
    };

    getAdByID = (req, res) => {
        handleRequest(req, res, () => adService.getAdByID(req.params.id));
    };

    getAdByUser = (req, res) => {
        handleRequest(req, res, () => adService.getAdByUser(req.params.userId));
    };

    deleteAllAdByUser = (req, res) => {
        handleRequest(req, res, () => adService.deleteAllAdByUser(req.params.userId));
    };

    getAdByTrend = (req, res) => {
        handleRequest(req, res, () => adService.getAdByTrend());
    };
}

const adController = new AdController();

module.exports = {
    adController,
};
