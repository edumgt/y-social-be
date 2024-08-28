const { body, validationResult } = require('express-validator');

const validateAdCreation = [
    body('title').isString().withMessage('Title is required'),
    body('description').isString().withMessage('Description is required'),
    body('budget').isNumeric().withMessage('Budget must be a number'),
    body('schedule_start').isISO8601().withMessage('Schedule start must be a valid date'),
    // Add more validations as needed

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

const adAuthorization = (req, res, next) => {
    // Example check (replace with actual authorization logic)
    const userId = req.userId; // Assumes userId is added to req by previous middleware
    const adId = req.params.id; // Assuming ad ID is in params

    // Implement your authorization logic here
    // For example, check if the user owns the ad
    if (userId && adId) {
        // Mock check (replace with actual authorization logic)
        if (true) { // Replace with actual ownership check
            next();
        } else {
            res.status(403).json({ error: 'Forbidden' });
        }
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
};

module.exports = { validateAdCreation, validateAdUpdate, adAuthorization };
