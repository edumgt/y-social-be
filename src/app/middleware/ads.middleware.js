const { body, validationResult } = require('express-validator');

const validateAdCreation = [
    body('title').isString().trim().withMessage('Title is required'),
    body('description').isString().trim().withMessage('Description is required'),
    body('budget').isNumeric().withMessage('Budget must be a number'),
    body('schedule_start').isISO8601().withMessage('Schedule start must be a valid date'),
    body('schedule_end').optional().isISO8601().withMessage('Schedule end must be a valid date'),
    body('goal.goalID').isString().withMessage('Goal ID is required'),

    // Custom validator example
    body('schedule_end').custom((value, { req }) => {
        if (new Date(value) < new Date(req.body.schedule_start)) {
            throw new Error('Schedule end date must be after start date');
        }
        return true;
    }),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateAdUpdate = [
    body('title').optional().isString().withMessage('Title must be a string'),
    body('description').optional().isString().withMessage('Description must be a string'),
    body('budget').optional().isNumeric().withMessage('Budget must be a number'),
    body('schedule_start').optional().isISO8601().withMessage('Schedule start must be a valid date'),
    // Add more validations as needed

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// src/middleware/adAuthorization.js

const adAuthorization = async (req, res, next) => {
    const userId = req.userId; // Assuming userId is added to req by previous middleware
    const adId = req.params.id;

    if (!userId || !adId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        // Example: Fetch the ad from the repository to check ownership
        const ad = await adService.getAdById(adId);
        if (!ad) {
            return res.status(404).json({ error: 'Ad not found' });
        }

        if (ad.userID !== userId) {
            return res.status(403).json({ error: 'User does not have permission to modify this ad' });
        }

        next();
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { validateAdCreation, validateAdUpdate, adAuthorization };
