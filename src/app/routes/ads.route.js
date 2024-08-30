const express = require('express');
const { validateAdCreation, validateAdUpdate, adAuthorization } = require('../middleware/ads.middleware');
const { adsController } = require('../controllers/ads.controller');

const router = express.Router();

router.post('/create', validateAdCreation, adsController.createAd);
router.put('/update/:id', validateAdUpdate, adAuthorization, adsController.updateAd);
router.delete('/delete/:id', adAuthorization, adsController.deleteAd);
router.get('/get-all', adsController.getAllAds);
router.get('/:id', adsController.getAdById);
router.get('/user/:userId', adsController.getAdByUser);
router.delete('/user/:userId', adsController.deleteAllAdByUser);
router.get('/trending', adsController.getAdByTrend);

module.exports = router;
