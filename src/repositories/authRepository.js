const prisma = require('../../lib/prisma')

const authRepository = {
  create: async (payload) => {
    await prisma.user.create({
      data: {
        ...payload
      }
    })
  },
  findOneWithEmail: async (email) => {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    return user;
  },
  findOneWithPhoneNumber: async (phoneNumber) => {
    const user = await prisma.user.findUnique({
      where: {
        phoneNumber
      }
    })

    return user;
  },
  findOneWithEmailOrPhoneNumber: async (emailOrPhoneNumber) => {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          {
            email: emailOrPhoneNumber
          },
          {
            phoneNumber: emailOrPhoneNumber
          }
        ]
      }
    })

    return user;
  }
}

module.exports = authRepository