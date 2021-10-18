const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const uuid = require("uuid/v4");

const userSchema = new mongoose.Schema({
    emailProvider: {
        type: Boolean,
        default: true
    },
    adminId: {
        type: String,
        default: uuid()
    },
    createdAt: {
        type: Number
    },
    hide_chimaera:{
        type: Boolean,
        default: false
    },
    phone:{
        type: String,
        default: ''
    },
    phone1:{
        type: String,
        default: ''
    },
    cardEmail:{
        type: String,
        default: ''
    },
    cardEmail1:{
        type: String,
        default: ''
    },
    address:{
        type: String,
        default: ''
    },
    address1:{
        type: String,
        default: ''
    },
    layout:{
        type: String,
        default: 'vertical'
    },
    full_colored_button:{
        type: Boolean,
        default: false
    },
    hide_icons:{
        type: Boolean,
        default: false
    },
    hide_sponsore:{
        type: Boolean,
        default: false
    },
    rounded_corner:{
        type: Boolean,
        default: false
    },
    social_provider:{
        type: Boolean,
        default: false
    },
    account_type:{
        type: String,
        default: 'user'
    },
    totalView: {
        type: Number,
        default: 0
    },
    premium: {
        type: Number,
        default: 0
    },
    avatar: {
        type: String
    },
    publicURL: {
        type: String
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    displayedName: {
        type: String
    },
    bio: {
        type: String,
        default: ""
    },
    designation:{
        type: String,
        default: ''
    },
    socialSharing: {
        type: Boolean,
        default: true
    },
    googleId: {
        type: String
    },
    slinkLinks:[{
        avatar:{
            type: String
        },
        desc:{
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        link:{
            type: String,
        },
        link1:{
            type: String
        },
        enable: {
            type: Boolean,
            default: true
        },
        totalView:{
            type: Number,
            default:0
        },
        bcColor: {
            type: String,
            default: '#fff'
        },
        placeholder:{
            type: String,
            default: ''
        }
    }],
    profileBc:{
        type: String,
        default: '#fff'
    },
    password: {
        type: String,
        minlength: 5
    },
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
    autopilot:{
        isActive: {
            type: Boolean,
            default: false
        },
        startDate:{
            type: Number,
            default: null
        },
        endDate:{
            type: Number,
            default: null
        },
        link:{
            type: String,
            default:'',
        }
    }
})

userSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    return userObject
}
userSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const userModel = mongoose.model('User',userSchema)

module.exports = userModel