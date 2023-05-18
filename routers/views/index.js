// Creating another router, this time for views
const express = require('express');
const router = express.Router();

// register middleware
const sessionChecker = require('../../middleware/sessionChecker');

// endpoints
router.get('/', getMain)
router.get('/user-view', sessionChecker, getHome) // endpoint location, middleware, handler

// View controller
const {
  getMain,
  getHome
} = require('../../controllers/views.controller');
const session = require('express-session');

module.exports = router