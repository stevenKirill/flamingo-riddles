const {Schema, model} = require('mongoose');

const schema = new Schema({
    header: {type: String, required: true, unique: true},
    description: {type: String, required: true, unique: true},
    answer: {type: String, required: true, unique: true},
    category: {type: String, required: true,},
    date: {type: Date, required: true},
    userId: {type: String, required: true},
});

module.exports = model('SuggestedRiddle', schema);