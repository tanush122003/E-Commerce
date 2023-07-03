const {hashPassword,matchPassword} = require('../utilities/auth-utils.js')
const User = require('../models/User.js')
const dotenv = require('dotenv')
dotenv.config()
const jwt = require('jsonwebtoken')

const login = async(req,res)=>
{    
    let emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    try 
    {
        // coming from the frontend via axios request
        const {email,password} = req.body;

        console.log(req.body,email)
        // if email is invalid
        
        
        if(!emailPattern.test(email))
        {    
            return res.json({error:'Please enter a valid email'});
        }

        // if input is missing
        if(!email || !password )
        {
            return res.status(400).json({error:'One or more values are missing.'});
        }

        // finding wheather user exists or not ?
        const user = await User.findOne({email});


        // 200 status code means success
        // if user is present
        if(!user){
            return res.status(400).json({error:"user not found"});
        }

      
        // passwords verification
        const isMatch = await matchPassword(password,user.password);

        if(!isMatch){
            return res.json({error:"Wrong Password"});
        }

        // creating json web token
        const token = jwt.sign({_id:user._id,name:user.name},process.env.JWT_SECRET,{expiresIn:'2d'});


        res.json({
            user:{
                name:user.name,
                email:user.email,
                role:user.role, 
                address:user.address,
            },
            token
        });
    } 
    catch (error) 
    {
        return res.json({error:error})
    }
}


const register = async(req,res)=>
{
    let emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    
    try 
    {
        
        const {name,email,password} = req.body;
        // if email invalid

        console.log(req.body)

        
        if(!emailPattern.test(email))
        {
            return res.json({error:'Please enter a valid email'});
        }

        // if input is missing
        if(!name || !email || !password ){
            return res.json({error:'One or more values are missing.'}).status(400);
        }

        // finding wheather user exists or not ?
        const alreadyExistingUser = await User.findOne({email});

        // 200 status code means success
        // if user is present
        if(alreadyExistingUser){
            return res.json({error:"User already present"});
        }

        const hashedPassword = await hashPassword(password);

        const user = await new User({name,email,password:hashedPassword}).save();

        // creating json web token
        const token = jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'2d'});

        res.json({
            user:{
                name:user.name,
                email:user.email,
                role:user.role, 
                address:user.address,
            },
            token
        });
    } 
    catch (error)
    {
        return res.json({error:error})
    }
}


const secretController = async(req,res)=>
{    
    res.json({message:"You have to access this secret route",user:req.user});   
}


const checkAuth = async(req,res)=>
{
    res.json({ok:true});
}


module.exports = {login,register,secretController,checkAuth}