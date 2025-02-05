const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://abhinav:Qwerty857@cluster0.ldvtp.mongodb.net/card-app')

const AdminSchema = new mongoose.Schema({
  username:String, 
  password:String,
  cardsupdate:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Card'
  }]
  
})

const UserSchema = new mongoose.Schema({
  username:String,
  password:String
  })

const CardScehma = new mongoose.Schema({
  name:String,
  description:String,
  Interest:[String],
  linkedin:String,
  github:String

})

const Admin = mongoose.model('Admin', AdminSchema)
const User = mongoose.model('User', UserSchema)
const Card = mongoose.model('Card' , CardScehma)

module.exports = {
  Admin,
  User,
  Card
}