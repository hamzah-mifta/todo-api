exports.responseSuccess = (data) => {
  return {
    status: 'Success',
    message: 'Success',
    data: data,
  };
};

exports.activityNotFound = (id) => {
  return {
    status: 'Not Found',
    message: `Activity with ID ${id} Not Found`,
    data: {},
  };
};

exports.todoNotFound = (id) => {
  return {
    status: 'Not Found',
    message: `Todo with ID ${id} Not Found`,
    data: {},
  };
};
