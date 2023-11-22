const express = require('express');
const router = express.Router();

const auth = require('../api/auth')
const users = require('../api/users')
const courses = require('../api/courses')
const modules = require('../api/modules')
const categories = require('../api/categories')
const orders = require('../api/orders')
const payments = require('../api/payments')
const courseTrackings = require('../api/courseTrackings')
const moduleTrackings = require('../api/moduleTrackings')
const notification = require('../api/notification')


router.use('/auth', auth);
router.use('/users', users);
router.use('/courses', courses);
router.use('/modules', modules);
router.use('/categories', categories);
router.use('/orders', orders);
router.use('/payments', payments);
router.use('/courseTrackings', courseTrackings);
router.use('/moduleTrackings', moduleTrackings);
router.use('/notification', notification);


module.exports = router;