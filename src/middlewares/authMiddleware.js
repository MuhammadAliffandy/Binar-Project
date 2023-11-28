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
      if (err) return res.status(403).json(new CustomResponse("FAIL", "Invalid Token"))

      req.user = decoded

      next()
    })
  } catch (err) {
    errorHandler(err, res)
  }
}

const verifyAdmin = (req, res, next) => {
  const { role } = req.user

  try {
    if (role !== "ADMIN") {
      return res.status(403).json(new CustomResponse("FAIL", "Only Admin can access this resource"))
    }

    next()
  } catch (err) {
    errorHandler(res, err)
  }
}

module.exports = {
  verifyJWT,
  verifyAdmin
}