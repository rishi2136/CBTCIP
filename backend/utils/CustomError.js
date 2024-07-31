class CustomError extends Error {
  constructor(message = "Something wrong", statusCode = 404) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}


module.exports = CustomError;