const CustomError = require("../../lib/customError");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authRepository = require("../repositories/authRepository");

const register = async (payload) => {
  const { email, phoneNumber, password } = payload

  const foundUserWithSameEmail = await authRepository.findOneWithEmail(email)

  if (foundUserWithSameEmail) throw new CustomError(409, "Email Already Used")

  const foundUserWithSamePhoneNumber = await authRepository.findOneWithPhoneNumber(phoneNumber)

  if (foundUserWithSamePhoneNumber) throw new CustomError(409, "Phone Number Already Used")

  const hashedPassword = await bcrypt.hash(password, 10)

  await authRepository.create({ ...payload, password: hashedPassword })
}

const login = async (payload) => {
  const { emailOrPhoneNumber, password } = payload

  const foundUser = await authRepository.findOneWithEmailOrPhoneNumber(emailOrPhoneNumber)

  if (!foundUser) throw new CustomError(400, "Email or Phone Number not Registered")

  const isPasswordMatch = await bcrypt.compare(password, foundUser.password)

  if (!isPasswordMatch) throw new CustomError(400, "Wrong Password")

  const accessToken = jwt.sign(
      {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        phoneNumber: foundUser.phoneNumber,
        role: foundUser.role
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '7d' }
  )

  return accessToken
}

module.exports = {
  register,
  login
}