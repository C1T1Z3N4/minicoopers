(function () {
    'use strict';

    var express       = require('express');
    var app              = express();
    var log               = require('winston');
    var logger          = require('morgan');
    var path             = require('path');
    var bodyParser = require('body-parser')
    var clans           = require('./models/clans');

    var rootDir = path.dirname(process.mainModule.filename);
    var publicDir = path.join(rootDir, 'public');

    app.use(logger('combined'));
    app.use(express.static(publicDir));
    app.use(bodyParser.json());

    app.get("/api/clans", function(req, res) {
        clans.all(function(err, clans) {
            if (err) {
                log.err("Error occurred gettings clans: " + err);
                res.status(500).send('Server error.  Check the logs');
            } else if (clans) {
                res.send(clans);
            } else {
                log.warn('Error occurred getting clans: clans not found');
                res.status(404).send('Not found');
            }
        })
    });

    app.get("/api/scores", function(req, res) {
        clans.scores(function(err, scores) {
            if (err) {
                log.err("Error occurred gettings scores: " + err);
                res.status(500).send('Server error.  Check the logs');
            } else if (scores) {
                res.send(scores);
            } else {
                log.warn('Error occurred getting scores: scores not found');
                res.status(404).send('Not found');
            }
        })
    });

    app.post("/api/scores/add", function(req, res) {
        log.info('body: ' + JSON.stringify(req.body));
        var name = req.body.name;
        var value = Number(req.body.value);

        log.info('Adding ' + value + ' to ' + name);

        clans.addScore(name, value, function(err, scores) {
            if (err) {
                log.err('Error occurred adding score: ' + err);
                res.status(500).send('Server error.  Check the logs');
            } else if (scores) {
                log.info('Added ' + value + ' to ' + name);
                res.send(scores);
            } else {
                log.warn('Error occurred adding score: scores not found');
                res.status(404).send('Not found');
            }
        })
    });

    app.post("/api/scores/take", function(req, res) {
        var name = req.body.name;
        var value = Number(req.body.value);

        log.info('Taking ' + value + ' from ' + name);

        clans.takeScore(name, value, function(err, scores) {
            if (err) {
                log.err('Error occurred taking score: ' + err);
                res.status(500).send('Server error.  Check the logs');
            } else if (scores) {
                log.info('Took ' + value + ' from ' + name);
                res.send(scores);
            } else {
                log.warn('Error occurred taking score: scores not found');
                res.status(404).send('Not found');
            }
        })
    });

    var port = process.env.PORT || 5000;
    app.listen(port, function() {
        log.info("Mini cooper counts started on " + port);
    });
}());

