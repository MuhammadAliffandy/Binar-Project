const jwt = require('jsonwebtoken')
const CustomResponse = require("../../lib/customResponse")
const errorHandler = require("../../lib/errorHandler")
const CustomError = require("../../lib/customError");
const { decode } = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  const token = authHeader && authHeader.split(" ")[1]

  try {
    if (!token) return res.status(401).json(new CustomResponse("FAIL", "Access Token is Required"))

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) throw new CustomError(403, "Invalid Token")

      req.user = decoded

      next()
    })
  } catch (err) {
    errorHandler(err, res)
  }
}

module.exports = {
  verifyJWT
}