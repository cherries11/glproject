import jwt from 'jsonwebtoken'

//worker authentication middleware
const authWorker = async(req,res,next)=>{
  try {
    const {dtoken}=req.headers
    if(!dtoken){
        return res.json({success:false,message:'Not Authorized'})
    }
    const token_decode = jwt.verify(dtoken,process.env.JWT_SECRET)
    
    req.body.workId = token_decode.id

    next()
  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
  }
}

export default authWorker