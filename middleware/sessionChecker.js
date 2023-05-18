function sessionChecker(req, res, next){
  // Console logging because we have no UI
  console.log(`Session Checker: ${req.session.id}`) // no session id --> you don't have a session
  console.log(req.session) // To look at all info we are looking at in the session

  // userInfo will be set myself
  if(req.session.userInfo){
    console.log(`Found user session`)
    next() // next() -> continue on to route it was originally ment to get to
  } else {
    console.log(`No Session Found`)
    res.redirect('/') // redirect to the root, which we will set up to be a login pg
  }
}

module.exports = sessionChecker