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

    clanSchema.statics.all = function(cb) {
      this.find({}, cb);
    };

    clanSchema.statics.getMember = function(name, cb) {
      this.findOne({ "members.name": name}, {'members.$': 1}, cb);
    };

    module.exports = mongoose.model('clans', clanSchema);
}());

