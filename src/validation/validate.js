const { activityGroupService } = require('../services');

exports.validateActivity = (req, res, next) => {
  if (!req.body.title) {
    return res.RESPONSE.error(400, 'Bad Request', 'title cannot be null');
  }

  return next();
};

exports.validateTodo = async (req, res, next) => {
  // if activity_group_id null
  if (!req.body.activity_group_id) {
    return res.RESPONSE.error(400, 'Bad Request', 'activity_group_id cannot be null');
  }

  // if title null
  if (!req.body.title) {
    return res.RESPONSE.error(400, 'Bad Request', 'title cannot be null');
  }

  // check if activity group id exist on database
  const activity = await activityGroupService.findById(req.body.activity_group_id);

  // return 404 if not exist
  if (!activity) {
    return res.RESPONSE.notFound('Activity', req.body.activity_group_id, 'activity_group_id');
  }

  return next();
};
