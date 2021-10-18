const mongoose = require('mongoose')
const appConfig = require('../config/config')

mongoose.connect(appConfig.dbURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(result=>console.log('Connect to database!'))
.catch(e=>{
    console.log(e)
})