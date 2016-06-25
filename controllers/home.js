/**
 * Created by a255610 on 01/13/2016.
 */
var utils = require('./utils');
var serv = require('./services');
var config = require('../config/config');


/** the controller for testing feeds */
exports.index = function(req, res) {
    var page_params = {
        video_id: 'DCzxs9eH9P0',
        audio: 'amclassical_beethoven_fur_elise.mp3',
        feed: { url: 'http://rss.cnn.com/rss/cnn_topstories.rss', id_nm: 'test', media_tag: 'media:group', media_tag2: 'media:content'},
        timing: config.SLIDE_TIMING,
        reload_timing: config.RELOAD_TIMING,
        streaming_video: 'http://www.bloomberg.com/live'
    };
    page_params.video_attrib = utils.getImpressAttribs();
 
    var video_ratio = 0;
    if(Math.floor(Math.random() < video_ratio)) {   // 20% do a streaming video
        res.render('pages/streaming', {
            page_params: page_params
        });
    }
    else {
        serv.GetTestFeed(page_params.feed).then(function (slides) {
            res.render('pages/show', {
                page_params: page_params,
                slides: slides
            });
        }).done();
    }
}


/*******************************
** The main show controller   **
********************************/
exports.show = function(req, res) {
    var page_params = {
        video_id: 'DCzxs9eH9P0',
	    audio: 'amclassical_beethoven_fur_elise.mp3',
        timing: config.SLIDE_TIMING,
        reload_timing: config.RELOAD_TIMING,
        streaming_video: config.video_stream[0].url
    };
    page_params.video_attrib = utils.getImpressAttribs();
 
    if(Math.floor(Math.random() < 0.2)) {   // 20% do a streaming video
        // randomly pick a stream
        page_params.streaming_video = config.video_stream[Math.floor(Math.random() * config.video_stream.length)].url;
        res.render('pages/streaming', {
            page_params: page_params
        });
    }
    else {
        serv.GetFeeds().then(function (slides) {

            // randomly pick a audio to play
            var audio_files = req.app.get('audio_files');
            if (audio_files)
                page_params.audio = audio_files[Math.floor(Math.random() * audio_files.length)];
            // randomly pick a video to play
            page_params.video_id = config.videos[Math.floor(Math.random() * config.videos.length)];

            res.render('pages/show', {
                page_params: page_params,
                slides: slides
            });
        }).done();
    }
}
