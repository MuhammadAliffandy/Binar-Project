require('dotenv').config();
const { PrismaClient } =  require('@prisma/client')
const prisma = new PrismaClient({
    datasourceUrl: process.env.NODE_ENV === 'test' ? process.env.DATABASE_URL_TEST : process.env.DATABASE_URL
})

module.exports =  prisma;