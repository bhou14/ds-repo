/**
 * Created by a255610 on 01/13/2016.
 */
var utils = require('./utils');
var serv = require('./services');
var config = require('../config/config');

exports.index = function(req, res) {
    var drinks = [
        { name: 'Bloody Mary', drunkness: 3 },
        { name: 'Martini', drunkness: 5 },
        { name: 'Scotch', drunkness: 10 }
    ];
    var tagline = "This comes from home controller's index function.";

    res.render('pages/index', {
        drinks: drinks,
        tagline: tagline
    });
}

/** The main show controller **/
exports.show = function(req, res) {
    var page_params = {
        video_id: 'DCzxs9eH9P0',
//        video_id: 'IdneKLhsWOQ',
//        audio: 'OGG_SAMPLE.ogg',
	    audio: 'amclassical_beethoven_fur_elise.mp3',
        timing: config.SLIDE_TIMING,
        reload_timing: config.RELOAD_TIMING,
        streaming_video: config.reuters_video
    };
    page_params.video_attrib = utils.getImpressAttribs();
    // the slide array
/*    var slides = [
//        {type: 'text', id: 'id1', title: 'title string', description: 'description text', attribs: '', src: ''}
    ];
*/
    if(Math.floor(Math.random() < 0.0)) {   // 30% do a streaming video
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
