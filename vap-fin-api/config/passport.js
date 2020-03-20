const passport = require("passport");
const JwtStrategy = require('passport-jwt').Strategy;
const BS = require('passport-http-bearer').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const {JWT_SECRET} = require('./key');

const User = require("../src/models/user");

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: JWT_SECRET,
},async(payload,done)=>{
    try {
        console.log(payload);
        

        //find user specified in token
        const user = await User.findById(payload.sub);

        //if user does not exist handel it
        if(!user){
            return done(null, false)
        }

        //otherwise, return the user
        done(null, user)


    } catch (error) {
        done(error, false);
    }
}));
