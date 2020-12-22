const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const portfolioSchema = new Schema({
    name: String,
    creationDate: String,
    symbols: [{
        type: String
    }],
    quantity: [{
        type: Number
    }]
});

module.exports = mongoose.model('portfolio', portfolioSchema);