'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var MeanUpload = new Module('mean-upload');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
MeanUpload.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    MeanUpload.routes(app, auth, database);

    MeanUpload.aggregateAsset('js', '/packages/mean-upload/public/assets/lib/danialfarid-angular-file-upload/dist/angular-file-upload-shim.min.js', {
        absolute: true
    });

    MeanUpload.aggregateAsset('js', '/packages/mean-upload/public/assets/lib/danialfarid-angular-file-upload/dist/angular-file-upload.min.js', {
        absolute: true
    });

    MeanUpload.aggregateAsset('css', '/packages/mean-upload/public/assets/css/meanUpload.css', {
        absolute: true
    });

    MeanUpload.angularDependencies(['angularFileUpload']);

    //We are adding a link to the main menu for all authenticated users
    MeanUpload.menus.add({
        title: 'meanUpload example page',
        link: 'meanUpload example page',
        roles: ['authenticated'],
        menu: 'main'
    });

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