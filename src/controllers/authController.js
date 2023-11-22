const { register, login } = require("../services/authService");
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
    const accessToken = await login(payload)

    res.cookie('jwt', accessToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 })

    return res.status(201).json(new CustomResponse("OK", "Login Successfully", { accessToken }))
  } catch (err) {
    errorHandler(res, err)
  }
}

module.exports = {
  registerHandler,
  loginHandler
}