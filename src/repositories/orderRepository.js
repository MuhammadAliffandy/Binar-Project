const prisma = require('../../lib/prisma')

const create = async (userId, courseId, payment) => {
  const createdPayment = await prisma.payment.create({
    data: {
      cardNumber: payment.cardNumber,
      cardName: payment.cardName,
      cvv: payment.cvv,
      expiryDate: payment.expiryDate,
      amount: payment.amount,
    }
  })

  const createdOrder = await prisma.order.create({
    data: {
      userId,
      courseId,
      paymentId: createdPayment.id
    },
    include: {
      user: true,
      course: true,
      payment: true,
    }
  })
}

const findByUserIdAndCourseId = async (userId, courseId) => {
  const order = await prisma.order.findFirst({
    where: {
      userId,
      courseId
    },
    include: {
      user: true,
      course: true,
      payment: true
    }
  })

  return order
}

const approveById = async (orderId) => {
  await prisma.order.update({
    where: {
      id: orderId
    },
    data: {
      status: "APPROVED"
    },
    include: {
      user: true,
      course: true,
      payment: true
    }
  })
}

const findAll = async () => {
  const orders = await prisma.order.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          image: true,
          country: true,
          city: true,
          role: true
        }
      },
      course: true,
      payment: true
    }
  })

  return orders
}

const findAllByUserId = async (userId) => {
  const orders = await prisma.order.findMany({
    where: {
      userId
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          image: true,
          country: true,
          city: true,
          role: true
        }
      },
      course: true,
      payment: true
    }
  })

  return orders
}

const findAllFiltered = async (filterOption, orderOption) => {
  const filteredOrders = await prisma.order.findMany({
    where: filterOption,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          image: true,
          country: true,
          city: true,
          role: true
        }
      },
      course: true,
      payment: true
    },
    orderBy: orderOption
  })

  return filteredOrders
}

module.exports = {
  create,
  findByUserIdAndCourseId,
  approveById,
  findAll,
  findAllByUserId,
  findAllFiltered
}