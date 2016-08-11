(function () {
    'use strict';

    var express = require('express');
    var app        = express();
    var log         = require('winston');
    var logger    = require('morgan');
    var path       = require('path');

    var rootDir = path.dirname(process.mainModule.filename);
    var publicDir = path.join(rootDir, 'public');

    log.info('publicDir ' + publicDir);

    app.use(logger('combined'));
    app.use(express.static(publicDir));

    var port = process.env.PORT || 5000;
    app.listen(port, function() {
        log.info("Mini cooper counts started on " + port);
    });
}());

