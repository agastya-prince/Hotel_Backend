const passport = require('passport'); // import passport for authentication
const LocalStrategy = require('passport-local').Strategy; // import local strategy for authentication
const Person = require('./models/person'); // import the person mode

passport.use(new LocalStrategy(async (USERNAME, PASSWORD, done) => {
    try {
        console.log('Received credentials:', USERNAME, PASSWORD);
        const user = await Person.findOne({ username: USERNAME });

        if (!user)
          return done(null, false, { message: 'Incorrect username.' });

        const isPasswordMatch = await user.comparePassword(password); //password === PASSWORD ? true : false;
        if (isPasswordMatch)
          return done(null, user); // user found and password match
        else
          return done(null, false, { message: 'Incorrect password.' }); // user found but password mismatch
    }
    catch (err) {
        console.log(err);
        return done(err);
    }
}
))

module.exports = passport; // export the passport object for use in other files