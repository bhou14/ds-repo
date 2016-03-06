/**
 * Created by a255610 on 01/17/2016.
 */
var xml2js = require('xml2js');
var utils = require('./utils');
var Q = require('q');
var config = require('../config/config');


exports.GetFeeds = function() {
    return Q.Promise(function (resolve, reject, notify) {
        // feed functions
        var funcs = [];
        GetRandomFeed(funcs);
        funcs.push(GetTodayMarket());
        funcs.push(GetImgFeed());
        funcs.push(GetLocalWeather());
        // get them all
        Q.allSettled(funcs).then(function (results) {
            var slides = [];
            results.forEach(function (result) {
                if (result.state === "fulfilled") {
                    var value = result.value;
                    value.forEach(function (r) {
                        slides.push(r);
                    });
                } else {
                    var reason = result.reason;
                }
            });
            utils.shuffle(slides);
            resolve(slides);
        });
    });
}

function getRSSFeed(resolve, reject, url, id_nm, media_tag) {
    utils.getData(url, function (severData) {
        if (severData) {
            var xml_parser = xml2js.parseString;
            xml_parser(severData, function (err, result) {
                try
                {
                    if (result) {
                        var objs = [];
                        var source = result.rss.channel[0].title[0];
                        if(result.rss.channel[0].pubDate)
                            source += ", " + result.rss.channel[0].pubDate[0];
                        var ar = result.rss.channel[0].item;
                        for (var i = 0; i < ar.length; i++) {
                            if(i == config.FEED_LIMIT) break;   // get only top 10
                            var title = ar[i].title[0];
                            var desc = ar[i].description[0];
                            if(desc.indexOf("<") != -1)
                                desc = desc.substring(0, desc.indexOf("<"));
                            var media = "";
                            if(media_tag != "") {
                                media = ar[i][media_tag][0]['$'].url;
                                if(media.indexOf("logo") != -1)
                                    media = "";               // don't use logo
                            }
                            var id = id_nm + "_id" + i;
                            var attrs = utils.getImpressAttribs();
                            objs.push({
                                type: 'text',
                                id: id,
                                title: title,
                                description: desc,
                                attribs: attrs,
                                img: media,
                                credit: source
                            });
                        }
                        resolve(objs);
                    }
                }
                catch(err)
                {
                    console.log("feed " + url + " parsing error: " + err);
                    reject(new Error("feed parsing error: " + err));
                }
            });
        }
        else {
            console.log("cannot get feed " + url);
            reject(new Error("cannot get feed " + url));
        }
    })
}

function GetRandomFeed(funcs) {
    var picked = [];

    while(picked.length < config.RANDOM_FEED_NUM) {
        var r = Math.floor(Math.random() * config.rss_feeds.length);
            if(picked.indexOf(r) == -1)
                picked.push(r);
    }
    for(var i = 0; i < picked.length; i++) {
        funcs.push(Q.Promise(function(resolve, reject, notify) {
            var feed = config.rss_feeds[picked[i]];
            getRSSFeed(resolve, reject, feed.url, feed.id_nm, feed.media_tag);
        }));
    }
}

function GetImgFeed(){
    return Q.Promise(function(resolve, reject, notify) {
        utils.getData(config.images_feed, function (severData) {
            if (severData) {
                var xml_parser = xml2js.parseString;
                xml_parser(severData, function (err, result) {
                    try
                    {
                        if (result) {
                            var objs = [];            // return values
                            var ar = result.rss.channel[0].item;
                            for (var i = 0; i < ar.length; i++) {
                                if(i == config.FEED_LIMIT) break;
                                var title = ar[i].title[0];
                                var desc = ar[i].description[0];
                                var ml = desc.match("^.*<img src=\"(.*?)\" (.*)"); // get the img url
                                var media = "";
                                if(ml.length>1) media = ml[1];
                                var source = "";
                                ml = desc.match("^.*Source: (.*?)</.*");
                                if(ml.length>1) source = ml[1];
                                var id = "if_id" + i;
                                var attrs = utils.getImpressAttribs();
                                objs.push({
                                    type: 'img',
                                    id: id,
                                    title: title,
                                    // description: desc,
                                    attribs: attrs,
                                    img: media,
                                    credit: source
                                });
                            }
                            resolve(objs);
                        }
                    }
                    catch(err)
                    {
                        console.log("feed " + config.images_feed + " parsing error: " + err);
                        reject(new Error("feed parsing error: " + err));
                    }
                });
            }
            else {
                console.log("cannot get image feed");
                reject(new Error("cannot get image feed"));
            }
        })
    });
}

function GetLocalWeather() {
    return Q.Promise(function(resolve, reject, notify){
        var objs = [];
        objs.push({ type: 'iframe', id: 'lw_id0', src: config.local_weather_url});
        resolve(objs);
    });
}

function GetTodayMarket() {
    return Q.Promise(function(resolve, reject, notify){
        var objs = [];
        objs.push({ type: 'iframe', id: 'sm_id0', src: config.today_stock_market, dur: 20000 });
        resolve(objs);
    });
}

function printIt(severData){
    var xml_parser = xml2js.parseString;
    xml_parser(severData, function(err, result) {
//        console.dir(result, {depth: null});   // inspect result object's whole content
        var ar = result.rss.channel[0].item;
        for(var i = 0; i < ar.length; i++) {
            console.log("Title: " + ar[i].title[0]);
            var desc = ar[i].description[0];
            desc = desc.substring(0, desc.indexOf("<"));
            console.log("Description: " + desc);
            var media = ar[i]['media:thumbnail'][0]['$'].url;
            console.log(media);
        }
    });
}

//utils.getData('http://localhost/cnn_topstories.xml', printIt);

