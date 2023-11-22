const CustomError = require("../../lib/customError");
const bcrypt = require('bcrypt')
const authRepository = require("../repositories/authRepository");

const createNewUser = async (payload) => {
  const { email, password } = payload

  const foundUserWithSameEmail = await authRepository.findOneWithEmail(email)

  if (foundUserWithSameEmail) {
    throw new CustomError(409, "Email Already Used")
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await authRepository.create({...payload, password: hashedPassword})
}

module.exports = {
  createNewUser
}