const AuthService = require("../services/authService");
const CustomResponse = require("../../lib/customResponse");
const errorHandler = require("../../lib/errorHandler");

const registerHandler = async (req, res) => {
  const payload = req.body;

  try {
    await AuthService.register(payload)

    return res.status(201).json(new CustomResponse("OK", "Register Successfully"))
  } catch (err) {
    errorHandler(res, err)
  }
}

const loginHandler = async (req, res) => {
  const payload = req.body;

  try {
    const accessToken = await AuthService.login(payload)

    res.cookie('jwt', accessToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 })

    return res.status(200).json(new CustomResponse("OK", "Login Successfully", { accessToken }))
  } catch (err) {
    errorHandler(res, err)
  }
}

const currentUserHandler = (req, res) => {
  const user = req.user;

  return res.status(200).json(new CustomResponse("OK", null, user))
}

module.exports = {
  registerHandler,
  loginHandler,
  currentUserHandler
}