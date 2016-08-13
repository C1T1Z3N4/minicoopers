(function () {
    'use strict';

    var mongoose = require('mongoose');

    var memberSchema = new mongoose.Schema({
      name: String,
      score: Number
    });

    memberSchema.statics.get = function(name, cb) {
      this.findOne( {"name" : name }, cb);
    };

    module.exports = mongoose.model('members', memberSchema);
}());

