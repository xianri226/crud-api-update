const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Business = new Schema({
    person_name: {
        type: String
    },
    business_name: {
        type: String
    },
    gst_number: {
        type: String
    }
}, {
    collection: 'business'
});

module.exports = mongoose.model('Business', Business);