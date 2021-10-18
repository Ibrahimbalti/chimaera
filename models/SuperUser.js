const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const superUerSchema = mongoose.Schema({
    blog:[],
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Please insert a correct Email.')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    sponsor: [{
        sponsorName: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            required: true
        },
        desc: {
            type: String,
            required: true
        },
        link:{
            type: String,
            required: true
        }
    }],
    socialIcons:{
        videoIcon:[{
            icon:{
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            visibility: {
                type: String
            }

        }],
        audioIcon:[{
            icon:{
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            visibility: {
                type: String
            }
        }],
        socialIcon:[{
            icon:{
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            visibility: {
                type: String
            }
        }]
    }
})

superUerSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.avatar
    return userObject
}

superUerSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const SuperUserModel = mongoose.model('SuperUser',superUerSchema)

module.exports = SuperUserModel