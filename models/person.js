const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // import bcrypt for password hashing


const personSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String,
    },
    password: {
        required: true,
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
    },
    work: {
        type: String,
        enum: ['Chef', 'Waiter', 'Manager'],
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
    },
    salary: {
        type: Number,
        required: true,
    }
});

personSchema.pre('save', async function (next) {
    const person = this;

    if (!person.isModified('password')) {
        return next(); // if modified then not next
    }
    try{
        const salt = await bcrypt.genSalt(10); // generate salt

        // hash password
        const hashPassword = await bcrypt.hash(person.password, salt); // hash password with salt

        //overwrite password with hash password
        person.password = hashPassword; // overwrite password with hash password
        next();
    }
    catch (err){
        return next(err); // if error then next with error
    }
})

personSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password); // compare password with hash password
        return isMatch; // return true or false
    }
    catch (err) {
        throw err;
    }
}


// How comparePassword works ?
// OGPass = pass + salt -> hashPass
// userpass entered
// hashPass -> salt obtained and added to userpass -> hashPass2 obtained
// hashPass == hashPass2 ? true : false
// create person model
const Person = mongoose.model('Person', personSchema);
module.exports = Person;