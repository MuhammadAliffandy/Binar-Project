const UsersRepository = require('../repositories/usersRepository')
const bcrypt = require("bcrypt");
const CustomError = require("../../lib/customError");
const jwt = require("jsonwebtoken");
const sendMail = require("../../lib/sendMail");

const changePassword = async (userId, payload) => {
  const { password, newPassword } = payload

  const user = await UsersRepository.findById(userId)

  const isPasswordMatch = await comparePassword(password, user.password)

  if (!isPasswordMatch) throw new CustomError(401, "Wrong Password")

  const hashedNewPassword = await hashPassword(newPassword)

  const updatedUser = await UsersRepository.updatePasswordById(userId, hashedNewPassword)

  await sendMail(
      updatedUser.email,
      "Password Change Confirmation",
      `We hope this email finds you well. We're writing to inform you that the password for your CraftIQ account has been successfully changed.`
  )
}

const updateProfile = async (userId, payload) => {
  const cannotNullField = ['name', 'email', 'phone']

  for (field of cannotNullField) {
    if (payload[field] === "" || payload[field] === null) {
      throw new CustomError(400, `${field} can't be empty`)
    }
  }

  if (payload.email !== undefined) {
    const foundUserWithEmail = await UsersRepository.findByEmail(payload.email)

    if (foundUserWithEmail.id !== userId) throw new CustomError(409, 'Email Already Used')
  }

  if (payload.phone !== undefined) {
    const foundUserWithPhone = await UsersRepository.findByPhone(payload.phone)

    if (foundUserWithPhone.id !== userId) throw new CustomError(409, 'Phone Already Used')
  }

  const updatedUser = await UsersRepository.updateById(userId, payload)

  const accessToken = jwt.sign(
      {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        image: updatedUser.image,
        country: updatedUser.country,
        city: updatedUser.city,
        role: updatedUser.role
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '7d' }
  )

  return accessToken
}

const getTotalUsers = async () => {
  const totalUsers = await UsersRepository.count()

  return totalUsers
}

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10)
}

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword)
}

module.exports = {
  changePassword,
  updateProfile,
  getTotalUsers
}