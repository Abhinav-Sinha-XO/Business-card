const {Router} =require('express');
const router = Router();
const jwt = require('jsonwebtoken')
const {User,Card} = require('../db/db');
const {  JWT_SECRET } = require('../secret');
const usermiddleware = require('../middleware/user');



router.post('/signup', async (req,res)=>{
  const username = req.body.username
  const password = req.body.password

  await User.create({
    username:username,
    password:password
  })
  res.json({
    msg:'User created successfully'
  })
})

router.post('/signin', async (req,res)=>{
  const username = req.body.username
  const password = req.body.password

  const user = await User.find({
    username,
    password
  })
  if(user){
    const token = jwt.sign({username},JWT_SECRET);
    res.json({token})
  }else{
    res.status.json({
      msg:"Credentials Incorrect"
    })
  }
    
  })

router.post('/card', usermiddleware, async (req,res)=>{
  const name = req.body.name
  const description = req.body.description
  const Interest = req.body.Interest
  const linkedin = req.body.linkedin
  const github = req.body.github

  const newcard = await Card.create({
    name:name,
    description:description,
    Interest:Interest,
    linkedin:linkedin,
    github:github

  })
  res.json({
    msg:"new card has been created",
    cardid:newcard._id

  })

 
})  
router.get('/card', usermiddleware,async(req,res)=>{
  const user = await User.findOne({username:req.username})
  if(user){
    res.json({
    cards:user
  })
  }
  
}) 

module.exports = router;
