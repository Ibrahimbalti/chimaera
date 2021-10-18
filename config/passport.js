const facebookTokentStrategy = require('passport-facebook-token')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const User = mongoose.model('User')
const appConfig = require('../config/config')

const opts={}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = appConfig.secretOrKey;

module.exports.jwtStra = passport => {
    passport.use(new JwtStrategy(opts, async(jwt_payload, done)=>{
        try {
            const user = await User.findById(jwt_payload.id)
            if(!user){
                return done(null, false)
            }else{
                return done(null, user)
            }
        } catch (e) {
            res.status(500).json(e)
        }
    }))
}

module.exports.facebookStrategy = passport => {
    passport.use('facebookToken',new facebookTokentStrategy({
        clientID: appConfig.facebookClientId,
        clientSecret: appConfig.facebookClientSecrete
    }, function( accessToken, refreshToken, profile, done) {
            done(null, profile)
    }));
}