const { register } = require("../services/authService");
const CustomResponse = require("../../lib/customResponse");
const errorHandler = require("../../lib/errorHandler");

const registerHandler = async (req, res) => {
  const payload = req.body;

  try {
    await register(payload)

    return res.status(201).json(new CustomResponse("OK", "Register Successfully"))
  } catch (err) {
    errorHandler(res, err)
  }
}

const loginHandler = async (req, res) => {
  const payload = req.body;

  try {
    await login(payload)

    return res.status(201).json(new CustomResponse("OK", "Register Successfully"))
  } catch (err) {
    errorHandler(res, err)
  }
}

module.exports = {
  registerHandler,
  loginHandler
}