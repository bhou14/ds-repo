/**
 * Created by a255610 on 02/16/2016.
 */

module.exports = {
    local_weather_url: 'https://weather.com/weather/today/l/02132:4:US',
    today_stock_market: 'http://www.cnbc.com',
    reuters_video: 'http://www.reuters.com/video',
    abc_news_video: 'http://abcnews.go.com/Live',
    images_feed: 'http://www.rssmicro.com/feeds/images.rss',              // http://localhost/image_feed.xml

    SLIDE_TIMING: 15000,        // 15 seconds
    FEED_LIMIT: 10,              // limit slides from each feed
    RELOAD_TIMING: 30*60*1000,  // 30min reload

    videos: [
        '5pl9vUFL6ZU', 'obuCKwrlfbM', 'fmnOYBYqv2w', '1AsgfPkJLgo', 'obuCKwrlfbM', '-kZYDbkRGhU', 'AJQOjr6s6pM', 'nKc9FIqAFa8', 'NiltGImerm4', '0cYEQlqvGig'
    ],

    rss_feeds: [
        { name: 'boston.com', id_nm: 'bos', media_tag: '', url: 'http://feeds.boston.com/boston/news'},
        { name: 'wcvb_boston', id_nm: 'wb', media_tag: 'enclosure', url: 'http://www.wcvb.com/9849828?format=rss_2.0&view=feed'},
        { name: 'cnn_top', id_nm: 'cn', media_tag: 'media:thumbnail', url: 'http://rss.cnn.com/rss/cnn_topstories.rss' },
        { name: 'cnn_biz', id_nm: 'cb', media_tag: 'media:thumbnail', url: 'http://rss.cnn.com/rss/money_latest.rss'},
        { name: 'cnn_tech', id_nm: 'ct', media_tag: 'media:thumbnail', url: 'http://rss.cnn.com/rss/cnn_tech.rss'},
        { name: 'cnn_travel', id_nm: 'cnt', media_tag: 'media:thumbnail', url: 'http://rss.cnn.com/rss/cnn_travel.rss'},
        { name: 'cnn_ent', id_nm: 'ce', media_tag: 'media:thumbnail', url: 'http://rss.cnn.com/rss/cnn_showbiz.rss'},
        { name: 'cnn_liv', id_nm: 'cl', media_tag: 'media:thumbnail', url: 'http://rss.cnn.com/rss/cnn_living.rss'},
        { name: 'cnn_heal', id_nm: 'ch', media_tag: 'media:thumbnail', url: 'http://rss.cnn.com/rss/cnn_health.rss'},
        { name: 'fox_sport', id_nm: 'fs', media_tag: 'enclosure', url: 'http://api.foxsports.com/v1/rss?partnerKey=zBaFxRyGKCfxBagJG9b8pqLyndmvo7UU'}
    ],
    rss_feeds_test: [          // switch this in test env with the one above
        { name: 'cnn_top', id_nm: 'cn', media_tag: 'media:thumbnail', url: '// http://localhost/cnn_topstories.xml' },
        { name: 'fox_sport', id_nm: 'fs', media_tag: 'enclosure', url: '// http://localhost/fox_sports.xml'}
    ],
    RANDOM_FEED_NUM: 3         // number of feeds from above rss_feeds array
}
