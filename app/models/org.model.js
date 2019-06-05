const mongoose = require('mongoose');

const OrgSchema = mongoose.Schema({
    Name: String,
    YearFounded: Number,
    Revenue: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Org', OrgSchema);