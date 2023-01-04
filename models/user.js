const mongoose = require("mongoose")
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema

const UserSchema = new Schema({
    firstname:  {
        type: String
    },
    lastname:  { 
        type: String
       
    },
    email:  {
        type: String,
        required: true,
         unique: true
    },
    password: {
        type: String,
        required: true
        
    },
    
})

// Before the user information is saved in the database, this function will be called,
// you will get the plain text password, hash it, and store it.
UserSchema.pre(
    'save',
     function (next) {
        const user = this;
        const hash =  bcrypt.hashSync(this.password, 10);

        this.password = hash;
        next();
    }
);
// // makes sure user trying to log in is valid
UserSchema.methods.isValidPassword =  function(password) {
    const user = this;
    const compare =  bcrypt.compareSync(password, user.password);
  
    return compare;
  }


const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;