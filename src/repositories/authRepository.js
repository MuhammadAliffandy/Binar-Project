const prisma = require('../../lib/prisma')
const generateOTP = require("../../lib/generateOTP");
const getDateInFuture = require("../../lib/getDateInFuture");

const create = async (payload) => {
  const createdUser = await prisma.user.create({
    data: {
      ...payload
    }
  })

  return createdUser
}

const findByEmail = async (email) => {
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })

  return user;
}

const findByPhone = async (phone) => {
  const user = await prisma.user.findUnique({
    where: {
      phone
    }
  })

  return user;
}

const findByEmailOrPhone = async (emailOrPhone) => {
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        {
          email: emailOrPhone
        },
        {
          phone: emailOrPhone
        }
      ]
    }
  })

  return user;
}

const findByResetToken = async (resetToken) => {
  const user = await prisma.user.findFirst({
    where: {
      resetToken
    }
  })

  return user
}

const createResetToken = async (email, resetToken) => {
  const expiredAt = getDateInFuture(10)

  await prisma.user.update({
    where: {
      email
    },
    data: {
      resetToken,
      resetTokenExpiredAt: expiredAt
    }
  })

  return resetToken
}

const clearResetTokenById = async (userId) => {
  await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      resetToken: null,
      resetTokenExpiredAt: null
    }
  })
}

const updatePasswordById = async (userId, hashedPassword) => {
  await prisma.user.updateMany({
    where: {
      id: userId
    },
    data: {
      password: hashedPassword
    }
  })
}

const createOTP = async (email) => {
  const expiredAt = getDateInFuture(10)

  const createdOTP = await prisma.otp.create({
    data: {
      email,
      otp: generateOTP(),
      expiredAt
    }
  })

  return createdOTP
}

const findOTPByEmail = async (email) => {
  const foundOTP = await prisma.otp.findUnique({
    where: {
      email
    }
  })

  return foundOTP
}

const updateOTPByEmail = async (email) => {
  const expiredAt = getDateInFuture(10)

  const updatedOTP = await prisma.otp.update({
    where: {
      email
    },
    data: {
      otp: generateOTP(),
      expiredAt
    }
  })

  return updatedOTP
}

const deleteOTPByEmail = async (email) => {
  await prisma.otp.delete({
    where: {
      email
    }
  })
}

module.exports = {
  create,
  findByEmail,
  findByPhone,
  findByEmailOrPhone,
  findByResetToken,
  createResetToken,
  clearResetTokenById,
  updatePasswordById,
  createOTP,
  findOTPByEmail,
  updateOTPByEmail,
  deleteOTPByEmail
}