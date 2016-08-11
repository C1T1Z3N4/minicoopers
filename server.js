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

    app.get("/clans", function(req, res) {
var clans = [{
    "name": "Bruces",
    "members": [{
      "name": "Anna",
      "score": 3
    }, {
      "name": "Caleb",
      "score": 4
    }, {
      "name": "Caroline",
      "score": 2
    }, {
      "name": "Ethan",
      "score": 3
    }, {
      "name": "Pete",
      "score": 26
    }]
  },

  {
    "name": "Campbells",
    "members": [{
      "name": "Callum",
      "score": 9
    }, {
      "name": "Joe",
      "score": 5
    }, {
      "name": "Malachy",
      "score": 4
    }]
  },

  {
    "name": "Kerrs",
    "members": [{
      "name": "James",
      "score": 2
    }, {
      "name": "Peter",
      "score": 10
    }, {
      "name": "Sarah",
      "score": 2
    }]
  }
];

res.json(clans);
    });

     var port = process.env.PORT || 5000;
    app.listen(port, function() {
        log.info("Mini cooper counts started on " + port);
    });
}());

