const { activityGroupService } = require('../services');

exports.create = async (req, res) => {
  try {
    const data = req.body;
    const result = await activityGroupService.create(data);

    return res.RESPONSE.success(result, 201);
  } catch (error) {
    return res.RESPONSE.error(400);
  }
};

exports.findAll = async (req, res) => {
  try {
    // search activity groups in database
    const result = await activityGroupService.findAll();

    return res.RESPONSE.success(result);
  } catch (error) {
    return res.RESPONSE.error(500);
  }
};

exports.findOne = async (req, res) => {
  try {
    // search activity group from database by id
    const result = await activityGroupService.findById(req.params.id);

    if (!result) return res.RESPONSE.notFound('Activity', req.params.id);

    return res.RESPONSE.success(result);
  } catch (error) {
    return res.RESPONSE.error(500);
  }
};

exports.update = async (req, res) => {
  try {
    const activity = await activityGroupService.findById(req.params.id);

    if (!activity) return res.RESPONSE.notFound('Activity', req.params.id);

    const result = await activity.update(req.body);

    return res.RESPONSE.success(result);
  } catch (error) {
    return res.RESPONSE.error(400, 'Bad Request');
  }
};

exports.delete = async (req, res) => {
  try {
    // find activity group to delete
    const activity = await activityGroupService.findById(req.params.id);

    // return 404 if activity not found
    if (!activity) return res.RESPONSE.notFound('Activity', req.params.id);

    // delete from database based params id
    await activity.destroy();

    return res.RESPONSE.success();
  } catch (error) {
    return res.status(400).json(error);
  }
};
