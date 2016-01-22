/**
 * Created by a255610 on 01/16/2016.
 */
var http = require('http');

exports.getData = function(host_nm, path_nm, func, obj) {
    var options = {
        hostname: host_nm,
        path: path_nm
    };
    // send request
    http.request(options, function(response)
    {
        var serverData = '';
        response.on('data', function(chunk)
        {
            serverData += chunk;
        });
        response.on('end', function()
        {
            func(serverData, obj);
        });
    }).end();
}
