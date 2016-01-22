/**
 * Created by a255610 on 01/13/2016.
 */

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

exports.show = function(req, res) {
    var page_params = {
        video_id: 'DCzxs9eH9P0',
        audio: 'OGG_SAMPLE.ogg'
    };
    res.render('pages/show', {
        page_params: page_params
    });
}
