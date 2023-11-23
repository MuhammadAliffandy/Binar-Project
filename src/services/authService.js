const CustomError = require("../../lib/customError");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const AuthRepository = require("../repositories/authRepository");

const register = async (payload) => {
  const { email, phone, password } = payload

  const foundUserWithSameEmail = await AuthRepository.findOneWithEmail(email)

  if (foundUserWithSameEmail) throw new CustomError(409, "Email Already Used")

  const foundUserWithSamePhone = await AuthRepository.findOneWithPhone(phone)

  if (foundUserWithSamePhone) throw new CustomError(409, "Phone Already Used")

  const hashedPassword = await bcrypt.hash(password, 10)

  await AuthRepository.create({ ...payload, password: hashedPassword })
}

const login = async (payload) => {
  const { emailOrPhone, password } = payload

  const foundUser = await AuthRepository.findOneWithEmailOrPhone(emailOrPhone)

  if (!foundUser) throw new CustomError(401, "Email or Phone not Registered")

  const isPasswordMatch = await bcrypt.compare(password, foundUser.password)

  if (!isPasswordMatch) throw new CustomError(401, "Wrong Password")

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