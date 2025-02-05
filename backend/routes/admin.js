const {Router} =require('express');
const router = Router();
const adminmiddleware = require('../middleware/admin')
const {Admin,Card} = require('../db/db');
const {  JWT_SECRET } = require('../secret');
const jwt = require('jsonwebtoken')



router.post('/signup', async (req, res) => {
    try {
        const {username, password} = req.body;
        const admin = await Admin.create({
            username,
            password,
            cardsupdate: []
        });
        res.json({
            msg: 'Admin created successfully'
        });
    } catch (err) {
        res.status(500).json({
            msg: 'Error creating admin'
        });
    }
});

router.post('/signin', async (req,res)=>{
  try {
    
  
  const username = req.body.username
  const password = req.body.password

  const user = await Admin.findOne({
    username,
    password
  })
  if(user){
    const token = jwt.sign({username},JWT_SECRET);
    res.json({token})
  }} catch (error) {
    res.status(500).json({msg:"Server error"})
  }
    
  })

router.post('/card', adminmiddleware, async (req, res) => {
    try {
        console.log('Request body:', req.body); // Debug log
        const {name, description, Interest, linkedin, github} = req.body;
        
        const newcard = await Card.create({
            name,
            description,
            Interest: Array.isArray(Interest) ? Interest : [Interest],
            linkedin,
            github
        });
        
        // Update admin's cards
        await Admin.findOneAndUpdate(
            {username: req.username},
            {$push: {cardsupdate: newcard._id}},
            {new: true}
        );
        
        console.log('Card created:', newcard); // Debug log
        res.json({
            msg: "New card has been created",
            cardid: newcard._id
        });
    } catch (err) {
        console.error('Error creating card:', err); // Debug log
        res.status(500).json({
            msg: "Failed to create card",
            error: err.message
        });
    }
});



router.get("/card", adminmiddleware, async(_req,res)=>{
  const response = await Card.find({})
  res.json({
    msg: response
  })
});
 

router.put('/card/:cardid', adminmiddleware, async(req,res)=>{
  const cardid = req.params.cardid
  const {name, description, linkedin, github} = req.body

  const updateFields = {};
    if (name) updateFields.name = name;
    if (description) updateFields.description = description;
    if (linkedin) updateFields.linkedin = linkedin;
    if (github) updateFields.github = github;
  
  
  const result = await Card.updateOne(
    { _id: cardid },
    { $set:  updateFields  }
  )
  res.json({
    msg:"card updated success",
    details:result
  })
})

module.exports = router;
