const express = require('express');
const { adController } = require('../controllers/ads.controller');
const { validateAdCreation, validateAdUpdate, adAuthorization } = require('../middleware/ads.middleware');

const router = express.Router();

router.post('/create', validateAdCreation, adController.createAd);
router.put('/update/:id', validateAdUpdate, adAuthorization, adController.updateAd);

router.delete('/delete/:id', adAuthorization, adController.deleteAd);
router.get('/get-all', adController.getAllAds);
router.get('/:id', adController.getAdByID);
router.get('/user/:userId', adController.getAdByUser);
router.delete('/user/:userId', adController.deleteAllAdByUser);
router.get('/trending', adController.getAdByTrend);

module.exports = router;
