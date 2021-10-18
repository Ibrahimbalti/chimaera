const path = require('path')
const express = require('express')
const passport = require('passport')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const userRouter = require('./routers/user')
const publicRouter = require('./routers/public')
const stratagy = require('./config/passport')

//Calling db
require('./db/mongoose')

const app = express()
const port = process.env.PORT || 6000

//middlewares
app.use(express.static(path.join(__dirname, 'public')))
app.use('/images', express.static(path.join(__dirname, 'images')))

app.use(morgan('dev'))
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(passport.initialize())
stratagy.jwtStra(passport)
// stratagy.googleStra(passport)
stratagy.facebookStrategy(passport)

app.use('/users', userRouter)
app.use('/public', publicRouter)
// app.use('/dashboard', superUserRouter)

//serve static assets if in production 
if(process.env.NODE_ENV === 'production'){
    //set a static folder
    app.use(express.static('./client/build'))
    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

//Start the server
app.listen(port, ()=>console.log(`Server listening at ${port}`))