const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, 'Name is required'],
            trim: true
        },
        email:{
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            trim: true
        },
        password:{
            type: String,
            required: [true, 'Password is required'],
            minlength:[8, 'Password must be atleast 8 characters']
        },
        avatar:{
            type: String,
            default: ''
        }

    },
    {
        timestamps: true
    }
);

UserSchema.pre('save', async function(next){

    // Doesnot Hash the password for the already hashed password if the password was changed
    if(!this.isModified('password')) 
        return next();

    // Generating the salt and hashing the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
});

// Compare password with the hashed one in the database.

UserSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}; // This function return true or false.

module.exports = mongoose.model('User', UserSchema);