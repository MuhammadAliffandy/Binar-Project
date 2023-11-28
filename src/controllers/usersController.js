const errorHandler = require("../../lib/errorHandler");
const UsersService = require('../services/usersService')
const CustomResponse = require("../../lib/customResponse");

const changePasswordHandler = async (req, res) => {
  const payload = req.body;
  const { id } = req.user;

  try {
    await UsersService.changePassword(id, payload)

    return res.status(200).json(new CustomResponse("OK", "Change Password Successfully"))
  } catch (err) {
    errorHandler(res, err)
  }
}

const updateProfileHandler = async (req, res) => {
  const { id } = req.user;
  const payload = req.body;

  try {
    const accessToken = await UsersService.updateProfile(id, payload)

    res.cookie('jwt', accessToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 })

    return res.status(200).json(new CustomResponse("OK", "Profile Updated Successfully", { accessToken }))
  } catch (err) {
    errorHandler(res, err)
  }
}

const getTotalUsersHandler = async (req, res) => {
  try {
    const totalUsers = await UsersService.getTotalUsers()

    return res.status(200).json(new CustomResponse("OK", null, { totalUsers }))
  } catch (err) {
    errorHandler(res, err)
  }
}

module.exports = {
  changePasswordHandler,
  updateProfileHandler,
  getTotalUsersHandler
}