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

const loginAdminHandler = async (req, res) => {
  const payload = req.body;

  try {
    const accessToken = await AuthService.loginAdmin(payload)

    res.cookie('jwt', accessToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 })

    return res.status(200).json(new CustomResponse("OK", "Login Successfully", { accessToken }))
  } catch (err) {
    errorHandler(res, err)
  }
}

const currentUserHandler = (req, res) => {
  const user = req.user;

  const filteredUser = AuthService.filterUserData(user)

  return res.status(200).json(new CustomResponse("OK", null, filteredUser))
}

const logoutHandler = (req, res) => {
  const token = req.cookies?.jwt;

  if (!token) return res.sendStatus(204)

  res.clearCookie('jwt', { httpOnly: true })

  return res.status(200).json(new CustomResponse("OK", "Logout Successfully"))
}

module.exports = {
  registerHandler,
  loginHandler,
  loginAdminHandler,
  currentUserHandler,
  logoutHandler
}