const prisma = require('../../lib/prisma')

const create = async (payload) => {
  await prisma.user.create({
    data: {
      ...payload
    }
  })
}

const findOneWithEmail = async (email) => {
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })

  return user;
}

const findOneWithPhone = async (phone) => {
  const user = await prisma.user.findUnique({
    where: {
      phone
    }
  })

  return user;
}

const findOneWithEmailOrPhone = async (emailOrPhone) => {
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
  findOneWithEmail,
  findOneWithPhone,
  findOneWithEmailOrPhone
}