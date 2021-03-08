const {Schema, model} = require('mongoose');

const schema = new Schema({
    firstName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    favouriteRiddles: [{
        header: {type: String, required: true, unique: true},
        description: {type: String, required: true, unique: true},
        answer: {type: String, required: true, unique: true},
        id: {type: String, required: true, unique: true},
        category: {type: String, required: true,}
    }],
    gender: {type: String},
    country: {type: String},
    hobbies: {type: String},
});

module.exports = model('User', schema);