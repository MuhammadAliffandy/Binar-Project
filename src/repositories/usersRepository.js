const prisma = require('../../lib/prisma')

const findById = async (userId) => {
  const user = prisma.user.findUnique({
    where: {
      id: userId
    }
  })

  return user
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

const updateById = async (userId, payload) => {
  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: payload
  })

  return updatedUser
}

const updatePasswordById = async (userId, newHashedPassword) => {
  const updatedUser = await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      password: newHashedPassword
    }
  })

  return updatedUser
}

const count = async () => {
  const totalUsers = await prisma.user.count({
    where: {
      role: "USER"
    }
  })

  return totalUsers
}

module.exports = {
  findById,
  findByPhone,
  findByEmail,
  updateById,
  updatePasswordById,
  count
}