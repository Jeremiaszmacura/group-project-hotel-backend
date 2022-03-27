const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { User } = require('../models/user')

const JWTstrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt

// First, add a Passport middleware to handle user registration:
passport.use(
  'signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // lets you access other params in req.body
    },
    async (req, email, password, done) => {
      try {
        const newActor = new User(req.body)
        newActor.role.includes('CLERK') ? newActor.validated = false : newActor.validated = true
        const savedActor = await newActor.save()
        return done(null, savedActor)
      } catch (err) {
        done(err)
      }
    }
  )
)

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        console.log('##############')
        console.log(email)
        console.log(password)
        const user = await User.findOne({ email })
        if (!user) {
          return done(null, false, { message: 'No user found with email: ' + email })
        }
        console.log(user)
        const isPasswordCorrect = await user.verifyPassword(password)
        if (!isPasswordCorrect) {
          return done(null, false, { message: 'Wrong Password' })
        }

        if (!user.validated) {
          return done(null, false, { message: 'User is not validated by admin' })
        }

        return done(null, user, { message: 'Logged in Successfully' })
      } catch (error) {
        return done(error)
      }
    }
  )
)

passport.use(
  new JWTstrategy(
    {
      secretOrKey: 'TOP_SECRET',
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    },
    async (token, done) => {
      try {
        if (!token.user) {
          return done(new Error('Invalid token'))
        } else {
          return done(null, token.user)
        }
      } catch (error) {
        done(error)
      }
    }
  )
)
