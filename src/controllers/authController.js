const response = require('../../lib/customResponse')
const CustomError = require('../../lib/customError')
const { createNewUser } = require("../services/authService");
const CustomResponse = require("../../lib/customResponse");
const errorHandler = require("../../lib/errorHandler");

const registerHandler = async (req, res) => {
  const payload = req.body;

  try {
    await createNewUser(payload)

    return res.status(201).json(new CustomResponse("OK", "Register Successfully", payload))
  } catch (err) {
    errorHandler(err)
  }
}

module.exports = {
  registerHandler
}