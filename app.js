'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module,
    MeanUpload = new Module('mean-upload'),
    config = require('meanio').loadConfig(),
    express = require('express');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
MeanUpload.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    MeanUpload.routes(app, auth, database);

    MeanUpload.aggregateAsset('js', '../lib/danialfarid-angular-file-upload/dist/angular-file-upload-shim.min.js', {
        absolute: false
    });
    MeanUpload.aggregateAsset('js', '../lib/danialfarid-angular-file-upload/dist/angular-file-upload.min.js', {
        absolute: false
    });

    MeanUpload.aggregateAsset('css', '../css/meanUpload.css', {
        absolute: false
    });

    MeanUpload.angularDependencies(['angularFileUpload']);

    //We are adding a link to the main menu for all authenticated users
    MeanUpload.menus.add({
        title: 'Mean upload help page',
        link: 'Mean upload help page',
        roles: ['authenticated'],
        menu: 'main'
    });

    app.use('/files/public', express.static(config.root + '/files/public'));

    /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    MeanUpload.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    MeanUpload.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    MeanUpload.settings(function(err, settings) {
        //you now have the settings object
    });
    */

    return MeanUpload;
});