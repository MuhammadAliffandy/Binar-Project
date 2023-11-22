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
  }
}

module.exports = authRepository