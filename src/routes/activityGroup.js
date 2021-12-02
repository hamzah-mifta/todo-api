const express = require('express');
const router = express.Router();

const activityGroupController = require('../controllers/activityGroup.controller');

router.get('/', activityGroupController.findAll);
router.get('/:id', activityGroupController.findOne);
router.post('/', activityGroupController.create);
router.patch('/:id', activityGroupController.update);
router.delete('/:id', activityGroupController.delete);

module.exports = router;
