const prisma = require('../../lib/prisma')

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

module.exports = {
  create,
  findByEmail,
  findByPhone,
  findByEmailOrPhone
}