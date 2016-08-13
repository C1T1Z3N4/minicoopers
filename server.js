(function () {
    'use strict';

    var express = require('express');
    var app        = express();
    var log         = require('winston');
    var logger    = require('morgan');
    var path       = require('path');
    var clans    = require('./clans');

    var rootDir = path.dirname(process.mainModule.filename);
    var publicDir = path.join(rootDir, 'public');

    app.use(logger('combined'));
    app.use(express.static(publicDir));

    app.get("/clans", function(req, res) {
        clans.find({}, function(err, clans) {
            res.send(clans);
        })
    });

    var port = process.env.PORT || 5000;
    app.listen(port, function() {
        log.info("Mini cooper counts started on " + port);
    });
}());

