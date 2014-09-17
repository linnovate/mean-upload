'use strict';

var fs = require('fs'),
    config = require('meanio').loadConfig(),
    mkdirOrig = fs.mkdir,
    directory = config.root + '/files/public',
    osSep = '/';


function rename(file, dest, user, callback) {
    fs.rename(file.path, directory + dest + file.name, function(err) {
        if (err) throw err;
        else
            callback({
                success: true,
                file: {
                    src: '/files/public' + dest + file.name,
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    created: Date.now(),
                    createor: (user) ? {
                        id: user.id,
                        name: user.name
                    } : {}
                }
            });
    });
}

function mkdir_p(path, callback, position) {
    var parts = require('path').normalize(path).split(osSep);

    position = position || 0;

    if (position >= parts.length) {
        return callback();
    }

    var directory = parts.slice(0, position + 1).join(osSep) || osSep;
    fs.stat(directory, function(err) {
        if (err === null) {
            mkdir_p(path, callback, position + 1);
        } else {
            mkdirOrig(directory, function(err) {
                if (err && err.code !== 'EEXIST') {
                    return callback(err);
                } else {
                    mkdir_p(path, callback, position + 1);
                }
            });
        }
    });
}

exports.upload = function(req, res) {
    var path = directory + req.body.dest;
    if (!fs.existsSync(path)) {
        mkdir_p(path, function(err) {
            rename(req.files.file, req.body.dest, req.user, function(data) {
                res.jsonp(data);
            });
        });
    } else {
        rename(req.files.file, req.body.dest, req.user, function(data) {
            res.jsonp(data);
        });
    }
};