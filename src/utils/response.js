exports.recordNotFound = (id) => {
  return {
    name: 'NotFound',
    message: `No record found for id '${id}'`,
    code: 404,
    className: 'not-found',
    errors: {},
  };
};
