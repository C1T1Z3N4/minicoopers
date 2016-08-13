(function () {
    'use strict';

    var mongoose = require('mongoose');

    mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/minicoopers');

    var memberSchema = new mongoose.Schema({
      name: String,
      score: Number
    });

    var clanSchema = new mongoose.Schema({
      name: String,
      members: [memberSchema]
    });

    module.exports = mongoose.model('clans', clanSchema);
}());

