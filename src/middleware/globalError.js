

export const globalError = (err , req ,res ,next)=>{
    let code = err.statusCode || 500
    res.status(code).json({statusCode:code , error:err.message , stack:err.stack})
}