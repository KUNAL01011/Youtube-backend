//That is created for a wrraper of any that require to resolve time so 
// we create a try catch function and juct simply pass the argument and your 
// work will we done 

const asyncHandler = () => {
    (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next))
        .catch((err)=> next(err))
    }
}

export {asyncHandler}








// WE CAN DO THIS WORK LIKE THAT
// const asyncHandler = (func) => { anync() => {}}

// const asyncHandler = (fn) => async (req,res,next) => {
//     try {
//         await fn(req,res,next)
//     } catch(error){
//         res.status(err.code || 500).json({
//             success:false,
//             message:err.message
//         })
//     }

// }