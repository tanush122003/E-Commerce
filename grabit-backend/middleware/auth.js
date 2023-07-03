const jwt = require('jsonwebtoken');
const User = require('../models/User.js')



const authenticateUser = (req,res,next)=>
{
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) 
    {
      return res.json({error:'Invalid token is there'})
    }
    const token = authHeader.split(' ')[1];

    try 
    {
        const dataComingInTheToken = jwt.verify(token, process.env.JWT_SECRET)
        req.user = { userId: dataComingInTheToken._id, name: dataComingInTheToken.name }
        next()
    } 
    catch (error) 
    {
        
       res.json({error})
    }

}

const isUserAdmin = async(req,res,next)=>
{
    try 
    {
        const user = await User.findById({_id:req.user.userId});
        if(user.role!=='admin')
        {
            return res.status(401).send("Unauthorized");
        }
        else
        {
            next()
        }
    } 
    catch (error) 
    {
      console.log(error)
    }
}


module.exports = {authenticateUser,isUserAdmin}