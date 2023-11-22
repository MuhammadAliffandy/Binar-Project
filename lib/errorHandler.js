const CustomError = require("./customError");
const CustomResponse = require("./customResponse");
const errorHandler = (err) => {
  if (err instanceof CustomError) {
    return res.status(err.code).json(new CustomResponse("FAIL", err.message))
  }

  return res.status(500).json(new CustomResponse("FAIL", err.message))
}

module.exports = errorHandler