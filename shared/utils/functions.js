
module.exports.customError = (errorMsg, statusCode) => {
  const error = new Error(errorMsg);
  error.statusCode = statusCode;
  throw error;
}

module.exports.customCatchError = (err, next) => {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  next(err);
}