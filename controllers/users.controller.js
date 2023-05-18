const User = require('../models/users')

async function httpGetUsers (req, res){
  try{
    const users = await User.findAll()
    res.status(200).json(users)
  }catch(e){
    console.log(`Error fetching all  users from table`, e.message)
    res.status(400).send(`Error connecting to the db, please contact your admin`)
  }
}

async function httpGetUserById (req, res){
  const id = req.params.id;
  try{
    if(!id) throw Error(`id is missing`)
    const user = await User.findOne({
      where :{
          id
      }
    })
    if(!user) throw Error(`no user by that id`)
    return res.status(200).json(user)
  }catch(e){
    console.log(e)
    return res.status(400).send(e)
  }
}

async function httpCreateUser (req, res){
  const data = req.body
  try{
    const newUser = await User.create(data)
    console.log(`New user created with if  ${newUser.id}`)
    return res.status(200).json(newUser)
  }catch(e){
    console.log(e)
    res.sendStatus(400)
  }
}

async function httpDeleteUser (req, res){
  const id = req.params.id;
  try{
    if(!id) throw Error(`no id provided`)
    const deletedUser = await User.destroy({
      where:{
        id
      }
    })
    res.status(200).json(deletedUser)
  }catch(e){
    console.log(e)
    res.sendStatus(400)
  }
}

async function httpUpdateUserInfo (req, res){
  const id = req.params.id
  const data = req.body
  try{
    if(!id) throw Error(`No id found`)
    await User.update(data, {
      where:{
        id
      }
    })
    const updatedUser = await User.findOne({
      where:{
        id
      }
    })

    res.status(200).json(updatedUser)
  }catch(e){
    console.log(e)
    res.sendStatus(400)
  }
}

module.exports = {
  httpGetUsers,
  httpGetUserById,
  httpCreateUser,
  httpDeleteUser,
  httpUpdateUserInfo
}