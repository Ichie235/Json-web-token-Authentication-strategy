const passport = require('passport');
const localStrategy = require('passport-local').Strategy

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt
bcrypt = require("bcryptjs")

const UserModel = require('../models/user');

passport.use(
    new JWTstrategy(
        {
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken() // Use this if you are using Bearer token
            //passReqToCallBack: true

        },
        async (token, done) => {
            try {
                return done(null, token.user);
            } catch (error) {
                done(error);
            }
        }
    )
);

passport.use(
    'signup',
    new localStrategy(
        {
    
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallBack: true
        },
        async (email, password, done) => {
            try {
                const user = await UserModel.create({email, password });

                return done(null, user);
            } catch (error) {
                console.log(error);
            }
        }
    )
);

// login middleware
passport.use(
    'login',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
           //passReqToCallBack: true
        },
        async (email, password, done) => {
            try {
                const user = await UserModel.findOne({ email });
                if (!user) {
                    return done(null, false, { message: 'User not found' });
                }
              
                
                 const validate = await user.isValidPassword(password);

                 if (!validate) {
                     return done(null, false, { message: 'Wrong Password' });
                 }

                return done(null, user, { message: 'Logged in Successfully' });
            } catch (error) {
                return done(error);
            }
        }
    )
);




