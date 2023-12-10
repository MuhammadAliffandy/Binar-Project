const CustomError = require("../../lib/customError");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const AuthRepository = require("../repositories/authRepository");
const uuid = require("uuid");
const sendMail = require("../../lib/sendMail");

const register = async (payload) => {
  const { email, phone } = payload

  const foundUserWithSameEmail = await AuthRepository.findByEmail(email)

  if (foundUserWithSameEmail) throw new CustomError(409, "Email Already Used")

  const foundUserWithSamePhone = await AuthRepository.findByPhone(phone)

  if (foundUserWithSamePhone) throw new CustomError(409, "Phone Already Used")

  const foundUserWithSameOTP = await AuthRepository.findOTPByEmail(email)

  if (foundUserWithSameOTP) {
    await resendOTP(email)

    return
  }

  const createdOTP = await AuthRepository.createOTP(email)

  await sendMail(email, "Register OTP", `Your OTP Number is ${createdOTP.otp} this OTP will expire in 10 minutes`)
}

const registerWithOTP = async (payload) => {
  const { name, email, phone, password, otp } = payload

  const foundOTP = await AuthRepository.findOTPByEmail(email)

  if (foundOTP.otp !== otp) {
    throw new CustomError(400, "Invalid OTP")
  }

  if (foundOTP.expiredAt < new Date()) {
    await AuthRepository.deleteOTPByEmail(email)

    throw new CustomError(410, "OTP Expired")
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await AuthRepository.create({ name, email, phone, password: hashedPassword })

  await AuthRepository.deleteOTPByEmail(email)
}

const resendOTP = async (email) => {
  const updatedOTP = await AuthRepository.updateOTPByEmail(email)

  await sendMail(email, "Register OTP", `Your OTP Number is ${updatedOTP.otp} this OTP will expire in 10 minutes`)
}

const login = async (payload) => {
  const { emailOrPhone, password } = payload

  const foundUser = await AuthRepository.findByEmailOrPhone(emailOrPhone)

  if (!foundUser) throw new CustomError(401, "Email or Phone not Registered")

  const isPasswordMatch = await bcrypt.compare(password, foundUser.password)

  if (!isPasswordMatch) throw new CustomError(401, "Wrong Password")

  const accessToken = jwt.sign(
      { 
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        phone: foundUser.phone,
        image: foundUser.image,
        country: foundUser.country,
        city: foundUser.city,
        role: foundUser.role
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '7d' }
  )

  return accessToken
}

const loginAdmin = async (payload) => {
  const { emailOrPhone, password } = payload

  const foundUser = await AuthRepository.findByEmailOrPhone(emailOrPhone)

  if (!foundUser) throw new CustomError(401, "Email or Phone not Registered")

  const isPasswordMatch = await bcrypt.compare(password, foundUser.password)

  if (!isPasswordMatch) throw new CustomError(401, "Wrong Password")

  if (foundUser.role !== "ADMIN") {
    throw new CustomError(403, "Only Admin can access this resource")
  }

  const accessToken = jwt.sign(
      {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        phone: foundUser.phone,
        image: foundUser.image,
        country: foundUser.country,
        city: foundUser.city,
        role: foundUser.role
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '7d' }
  )

  return accessToken
}

const resetPassword = async (email) => {
  const foundUser = await AuthRepository.findByEmail(email)

  if (!foundUser) throw new CustomError(401, "Email not Registered")

  if (foundUser.resetToken !== null) {
    throw new CustomError(409, "Reset Password Link has been sent")
  }

  const resetToken = uuid.v4()

  await AuthRepository.createResetToken(email, resetToken)

  await sendMail(email, 'Reset Password', `Click this link http://localhost:3000/auth/reset-password/${resetToken} this link will expire in 10 minutes`)
}

const resetPasswordUser = async (resetToken, password) => {
  const user = await AuthRepository.findByResetToken(resetToken)

  if (!user) throw new CustomError(403, "Invalid Reset Token")

  if (user.resetTokenExpiredAt < new Date()) {
    await AuthRepository.clearResetTokenById(user.id)

    throw new CustomError(410, "Reset Token Expired")
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await AuthRepository.updatePasswordById(user.id, hashedPassword)

  await AuthRepository.clearResetTokenById(user.id)
}

const filterUserData = (user) => {
  const { iat, exp, ...filteredUser } = user;

  return filteredUser
}

module.exports = {
  register,
  registerWithOTP,
  resendOTP,
  login,
  loginAdmin,
  filterUserData,
  resetPassword,
  resetPasswordUser
}