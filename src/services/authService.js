const CustomError = require("../../lib/customError");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const AuthRepository = require("../repositories/authRepository");
const uuid = require("uuid");
const nodemailer = require("nodemailer");

const register = async (payload) => {
  const { email, phone, password } = payload

  const foundUserWithSameEmail = await AuthRepository.findByEmail(email)

  if (foundUserWithSameEmail) throw new CustomError(409, "Email Already Used")

  const foundUserWithSamePhone = await AuthRepository.findByPhone(phone)

  if (foundUserWithSamePhone) throw new CustomError(409, "Phone Already Used")

  const hashedPassword = await bcrypt.hash(password, 10)

  await AuthRepository.create({ ...payload, password: hashedPassword })
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

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORDO
    }
  });

  await transporter.sendMail({
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: 'Reset Password',
    text: `Click this link http://localhost:3000/auth/reset-password/${resetToken}`
  })
}

const resetPasswordUser = async (resetToken, password) => {
  const user = await AuthRepository.findByResetToken(resetToken)

  if (!user) throw new CustomError(401, "Invalid Reset Token")

  if (user.resetTokenExpiresAt < new Date()) {
    await AuthRepository.clearResetTokenById(user.id)

    throw new CustomError(401, "Reset Token Expired")
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
  login,
  loginAdmin,
  filterUserData,
  resetPassword,
  resetPasswordUser
}