(function () {
    'use strict';

    var log  = require('winston');
    var app = require('express')();
    var logger  = require('morgan');

    app.use(logger('combined'));

    app.get("/", function(req, res) {
        res.send('hello world');
    });

    var port = process.env.PORT || 5000;
    app.listen(port, function() {
        log.info("MiniCooperCounts started on " + port);
    });
}());

