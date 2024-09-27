import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { userModel } from "../../../databases/models/user.model.js";
import { catchError } from "../../middleware/errorHandle.js";
import { handleError } from "../../utils/customError.js";


const signUp = catchError(async (req , res , next )=>{
    const check = await userModel.findOne({email:req.body.email})
    if (check) next(new handleError('This email already used' , 401))
    const result = userModel(req.body)
    await result.save()
    res.status(201).json({message:'user Added' , result})
})

const signIn = catchError(async(req , res , next)=>{
    let {email , password} = req.body
    const check = await userModel.findOne({email})
    const checkPass = bcrypt.compare(password , check.password)
    if (check && checkPass) {
        const token = jwt.sign({name:check.name , userId:check._id , role:check.role} , process.env.SIGNIN_SECRET)
        res.status(200).json({message:'logged in successfully' , token})
    }
    next(new handleError('email or password not correct' , 401))
})

const protectRoutes = catchError(async (req , res , next)=>{
    let {token} = req.headers

    if(!token) return next(new handleError('Token not valid', 401))
    let decode = jwt.verify(token , process.env.SIGNIN_SECRET)

    let user = await userModel.findById(decode.userId)
    if(!user) return next(new handleError('Token not valid' ,401))
    
    if(user.passChangedAt>decode.iat) return next(new handleError('Token not valid', 401) )

    req.user = user
    next()
})

const allowedTo = (...roles)=>{
    return catchError(async(req , res , next)=>{
        if (!roles.includes(req.user.role)) return next(new handleError('You Not Authorized To access this point you are ' +req.user.role , 401))
        next()
    }
)
}

export{
    signUp,
    signIn,
    protectRoutes,
    allowedTo
}