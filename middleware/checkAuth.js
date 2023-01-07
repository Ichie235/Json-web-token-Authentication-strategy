const jwt = require('jsonwebtoken');

require('dotenv').config()



const checkToken = (req,res)=>{
    const tokenData = req.cookies.myToken
    console.log(tokenData +'im awesome')
    if(!tokenData){
        return res.status(403).send({message:'Could not get cookie'})
    }
    let payload
    try{
        payload = jwt.verify(tokenData,process.env.JWT_SECRET)
    }catch (e){
       if(e instanceof jwt.JsonWebTokenError){
        res.status(401).send({message:'Invalid token'})
       }
       return res.status(400).send({message:'Invalid token, please validate token'})
    }
    res.render('booksTitle',{tokenData})
}

module.exports = {checkToken}