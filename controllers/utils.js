/**
 * Created by Hou, Bing on 01/16/2016.
 */
var http = require('http');

exports.getData = function(url, func) {
    var url2 = url.substring(url.indexOf("//")+2);
    var host_nm = url2.substring(0, url2.indexOf("/"));
    var path_nm = url2.substring(url2.indexOf("/"));
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
            func(serverData);
        });
    }).on('error', function(e) {
        func(null);
    }).end();
}

exports.getImpressAttribs = function() {

    // these are the items to be randomly generated
    // data-x, data-y, data-z, data-rotate-x, data-rotate-y, data-rotate-z, data-scale
    var r = Math.floor(Math.random() * 20);
    var attribs = ["data-x", "data-y", "data-z", "data-rotate-x", "data-rotate-y", "data-rotate-z", "data-scale"];
    var msg = "";
    var starting = 2;
    for(var i=starting; i<starting+attribs.length; i++)
    {
        if(msg != "")
            msg += " ";
        var t = r&i;
        if(t > 0)
        {
            if(t < i/2)
                t *= -1;
            if(i != starting+attribs.length-1)
                t *= Math.ceil(Math.random() *100);
            msg += attribs[i-starting] + "=" + t.toString() + "";
        }
    }
    return msg;
}

exports.shuffle = function(array) {
    var counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        var index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        var temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}