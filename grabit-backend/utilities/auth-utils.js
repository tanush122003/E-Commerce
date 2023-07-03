const bcrypt =  require('bcrypt');
const hashPassword = async(password)=>
{
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt)

    // returning the hashed password
    return hash;
}


const matchPassword = (password,hashedPassword)=>
{
    return bcrypt.compare(password,hashedPassword);
}


module.exports = {hashPassword,matchPassword}