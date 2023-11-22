const CustomError = require("../../lib/customError");
const bcrypt = require('bcrypt')
const authRepository = require("../repositories/authRepository");

const register = async (payload) => {
  const { email, password } = payload

  const foundUserWithSameEmail = await authRepository.findOneWithEmail(email)

  if (foundUserWithSameEmail) {
    throw new CustomError(409, "Email Already Used")
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await authRepository.create({...payload, password: hashedPassword})
}

const login = async (payload) => {
  const { emailOrPhoneNumber, password } = payload
}

module.exports = {
  register,
  login
}