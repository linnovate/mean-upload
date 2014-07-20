'use strict';

// The Package is past automatically as first parameter
module.exports = function(MeanUpload, app, auth, database) {

    var multipart = require('connect-multiparty'),
        multipartMiddleware = multipart(),
        meanUpload = require('../controllers/meanUpload');

    app.get('/meanUpload/example/render', function(req, res, next) {
        MeanUpload.render('index', {
            package: 'mean-upload'
        }, function(err, html) {
            //Rendering a view from the Package server/views
            res.send(html);
        });
    });

    app.post('/meanUpload/upload', multipartMiddleware, meanUpload.upload);
};