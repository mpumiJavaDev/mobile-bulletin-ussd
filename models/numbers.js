var mongoose = require('mongoose');

module.exports = mongoose.model('Numbers', new mongoose.Schema({
    number: { type: String, unique : true, required : true, dropDups: true },
    lists: [{ type: String, default: "" }],
    name: { type: String, default: "" },
    surname: { type: String, default: "" },
    language: { type: String, default: "English" },
    campaigns: [{ type: String, default: "" }],
    hlr: { type: Boolean, default: false},
    hlrStatus:{ type: String, default: "0"},
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    created_on: { type: Date, default: Date.now }
}));