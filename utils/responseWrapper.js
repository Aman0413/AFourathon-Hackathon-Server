const success = (statusCode, result) => {
  return {
    success: true,
    statusCode,
    result,
  };
};
const error = (statusCode, result) => {
  return {
    success: false,
    statusCode,
    result,
  };
};

module.exports = {
  success,
  error,
};
