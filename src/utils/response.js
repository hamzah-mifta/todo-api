exports.activityNotFound = (id) => {
  return {
    status: 'Not Found',
    message: `Activity with ID ${id} Not Found`,
    data: {},
  };
};

exports.responseSuccess = (data) => {
  return {
    status: 'Success',
    message: 'Success',
    data: data,
  };
};
