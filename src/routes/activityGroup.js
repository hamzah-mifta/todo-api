const express = require('express');
const router = express.Router();

const activityGroupController = require('../controllers/activityGroup.controller');
const { validateActivity } = require('../middleware/validate');

router.get('/', activityGroupController.findAll);
router.get('/:id', activityGroupController.findOne);
router.post('/', validateActivity, activityGroupController.create);
router.patch('/:id', validateActivity, activityGroupController.update);
router.delete('/:id', activityGroupController.delete);

module.exports = router;
