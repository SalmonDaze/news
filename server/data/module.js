const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/mydata')

let userSchema = new mongoose.Schema({
    username: String,
    password: String,
})
Model = {
    User: mongoose.model('User',userSchema)
}
module.exports = Model