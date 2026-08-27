const router = require('express').Router();
const badgeController = require('../controllers/badge.controller');

router.get('/', badgeController.list);

module.exports = router;
