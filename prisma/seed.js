const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')

async function main() {
  await prisma.user.upsert({
    where: {
      email: "admin@gmail.com"
    },
    update: {},
    create: {
      name: "Admin",
      email: "admin@gmail.com",
      phone: "089658682855",
      password: await bcrypt.hash("admin123", 10),
      role: "ADMIN"
    },
  })
}

main()
    .then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })