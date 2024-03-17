const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        // unique: true,
        trim: true,
        required: [true, "A name is required while signing up"],
    },

    email: {
        type: String,
        validate: [validator.isEmail, "Please provide a valid email"],
        required: [true, "An email is required while signing up"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "A password is required while signing up"]
    },
    confirmPassword: {
        type: String,
        validate: {
            validator: function (el){
                return el === this.password;
            },
            message: "Passwords are not same"
        },
        required: [true, "Password confirmation is required while signing up"]
    },
},
{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
}
)





UserSchema.pre("save", async function(next){
    if(!this.isModified("password"))
    return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;
    next()
})


UserSchema.methods.correctPassword = async function(inputPass, userPass){
    return await bcrypt.compare(inputPass, userPass);
}


const User = mongoose.model("User", UserSchema);

module.exports = User;
