(function () {
    'use strict';

    var express = require('express');
    var app        = express();
    var log         = require('winston');
    var logger    = require('morgan');
    var path       = require('path');
    var clans    = require('./models/clans');

    var rootDir = path.dirname(process.mainModule.filename);
    var publicDir = path.join(rootDir, 'public');

    app.use(logger('combined'));
    app.use(express.static(publicDir));

    app.get("/api/clans", function(req, res) {
        clans.all(function(err, clans) {
            if (clans) {
                res.send(clans);
            } else {
                res.status(404).send('Not found');
            }
        })
    });

    app.get("/api/scores", function(req, res) {
        clans.scores(function(err, scores) {
            if (clans) {
                res.send(scores);
            } else {
                res.status(404).send('Not found');
            }
        })
    });

    app.get("/api/member/:name", function(req, res) {
        clans.getMember(req.params.name, function(err, member) {
            if (member) {
                res.send(member);
            } else {
                res.status(404).send('Not found');
            }
        })
    });

    var port = process.env.PORT || 5000;
    app.listen(port, function() {
        log.info("Mini cooper counts started on " + port);
    });
}());

