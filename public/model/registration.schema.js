const mongoose = require('mongoose')
const Schema = mongoose.Schema

const registrationSchema = new Schema({
    firstName: {
        type: String,
    },
    surName: {
        type: String,
    }, 
    nickName: {
        type: String
    },
    date: {
        type: String
    },
    gender: {
        type: String
    },
    age: {
        type: String
    }

})

module.exports = mongoose.model('Registration', registrationSchema)