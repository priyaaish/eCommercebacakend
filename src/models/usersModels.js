const mongoose = require ("mongoose");
const bcrypt =require("bcryptjs");

//define the users schema
const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match:[/[a-zA-Z0-9.-]+(.[a-zA-Z]{2,})+/, "Please enter valid email ID"],
    },
    password: {
        type: String,
        required: true,
        minlength: 8, //minimum lenght of pwd 8 
    },
    role: {
        type: String,
        enum: ["user","admin"],
        default: "user"
    }
}, {timestamps: true });
//hash password before saving to database
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password= await bcrypt.hash(this.password,salt);
    next();
});
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
module.exports = mongoose.model("User",UserSchema);