function structure(data, status, message) {
  return {
    status,
    message,
    data,
  };
}

function notFound(instance, val, key = 'ID') {
  return {
    status: 'Not Found',
    message: `${instance} with ${key} ${val} Not Found`,
    data: {},
  };
}

function responseFormat(req, res, next) {
  res.RESPONSE = {
    success: (data = {}, code = 200, status = 'Success', message = 'Success') => res.status(code).json(structure(data, status, message)),
    error: (code, status, message) => res.status(code).json(structure({}, status, message)),
    notFound: (instance, val, key) => res.status(404).json(notFound(instance, val, key)),
  };

  next();
}

module.exports = responseFormat;
