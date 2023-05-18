
function getMain(req, res){
  // res.sendStatus(200)
  res.render('login')

}

function getHome(req, res){
  // res.sendStatus(200)
  res.render('home')
  // res.render('home', { username: req.session.userInfo })
}

module.exports = {
  getMain,
  getHome
}