import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


/* Here we carete a stuctuer of data to user means user ka naam aur email etc soo ye store karne ke liye hame ye 
ye batana hota ki kon kon sa data ham store kar rahe hai aur ye batane ke liye hame sicaliton  define karna hota hai
usi ko schema kehete hai and banane ka tarika neeche hai */
const userSchema = new Schema({
    username: {
        type : String,
        required: true,
        unique: true,
        lowercase:true,
        trim:true,
        index:true
    },
    email: {
        type : String,
        required: true,
        unique: true,
        lowercase:true,
        trim:true
    },
    fullName: {
        type : String,
        required: true,
        trim:true,
        index:true
    },
    avatar: {
        type : String, //cloudinary me store karege 
        required: true
    },
    coverImage: {
        type : String //cloudinary me store karege 
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref:"Video"
        }
    ],
    password: {
        type:String,
        required: [true, "Password is required"]

    },
    refreshToken: {
        type: String
    }
},
{
    timestamps:true
})


/* Ya par simply export kar rahe hai aut export karne ka tarika ye hota hai jaha ham uska naam jo bhi string me dete hai 
bo hi store hota hai but in pural form mean User convert into Users in database */

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model("User",userSchema);
