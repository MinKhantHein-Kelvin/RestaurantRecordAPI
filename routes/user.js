const router = require ("express").Router();
const User = require ('../modals/User');
const bcrypt = require('bcryptjs');
const jwt = require ("jsonwebtoken");

// User Register
router.post('/register',async(req,res)=>{

// Email Exist
 const emailExist = User.findOne({email : req.body.email});

// Hash password
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);

    const user = new User({
        name : req.body.name,
        email : req.body.email,
        password : hash
    });
    try {
        if(emailExist){
            return res.json({success : false , message : "Email Already Exist!"})
        }
        const saveUser =await user.save();
        res.json({success : true, message : "User Register Successful!"});
        
    } catch (error) {
        res.json({success : false, message : "Couldn't Save User!"});
    }
});


//User Login
router.post('/login',async(req,res)=>{
    // Check Email
    const user =await User.findOne({email : req.body.email });
    if(!user){
        return res.json({success : false, message : "Invalid Email!"});
    }

    // Check Password
    const validPassword =await bcrypt.compare(req.body.password, user.password);
    if(!validPassword){
        return res.json({success : false, message : "Invalid Password!"});
    }

    //create and assign a token
  const token = jwt.sign({_id : user._id}, process.env.Token_Secret);
  res.header("auth-token", token).json({success : true ,token : token});
})

module.exports = router;