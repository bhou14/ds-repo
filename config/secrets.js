/**
 * Created by a255610 on 01/13/2016.
 */

module.exports = {
    db: process.env.MONGODB || 'mongodb://localhost:27017/bshow',

    cryptos: {
        algorithm: 'aes256',
        key: process.env.CRYPTO_KEY || '9460CE29346C1F6A30CCCB389948ADB6FEE8D7220E8A6344'
    },

    sessionSecret: process.env.SESSION_SECRET || 'MySession',

    twitter: {
        consumerKey: process.env.TWITTER_KEY || 'Your Twitter consumer key',
        consumerSecret: process.env.TWITTER_SECRET  || 'Your Twitter consumer secret',
        callbackURL: process.env.TWITTER_CALLBACK || 'http://localhost:3000/auth/twitter/callback',
        passReqToCallback: true
    }
}
