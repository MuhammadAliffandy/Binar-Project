const prisma = require('../../lib/prisma')
const { v4: uuidv4 } = require("uuid");

const create = async (payload) => {
  await prisma.user.create({
    data: {
      ...payload
    }
  })
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
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 1);

  await prisma.user.update({
    where: {
      email
    },
    data: {
      resetToken,
      resetTokenExpiresAt: expiresAt
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
      resetTokenExpiresAt: null
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

module.exports = {
  create,
  findByEmail,
  findByPhone,
  findByEmailOrPhone,
  findByResetToken,
  createResetToken,
  clearResetTokenById,
  updatePasswordById
}