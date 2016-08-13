(function () {
    'use strict';

    var mongoose = require('mongoose');

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

    module.exports = mongoose.model('clans', clanSchema);
}());

