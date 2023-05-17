const express = require('express');
// create our router
const router = express.Router();
// bring in controller functions - will define later
const {
  httpGetUsers,
  httpGetUserById,
  httpCreateUser,
  httpDeleteUser,
  httpUpdateUserInfo
} = require('../controllers/users.controller')

// **  Define User Endpoints - router.method('location', handler)
router.get('/', httpGetUsers)
router.get('/:id', httpGetUserById)
router.post('/', httpCreateUser)
router.delete('/:id', httpDeleteUser)
router.post('/update-user/:id', httpUpdateUserInfo)

// export router
module.exports = router;