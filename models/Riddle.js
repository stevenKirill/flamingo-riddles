const {Schema, model} = require('mongoose');

const schema = new Schema({
    header: {type: String, required: true, unique: true},
    description: {type: String, required: true, unique: true},
    answer: {type: String, required: true, unique: true},
    id: {type: String, required: true, unique: true},
    category: {type: String, required: true,}
});

module.exports = model('Riddle', schema);