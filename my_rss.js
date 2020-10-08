const me = module.exports = {}

const RSS_JSON_FILE = 'rss.json'

const FS = require('fs')
const Emitter = require('events')
const RSSParser = require('rss-parser')

const events = new Emitter()

me.on = events.on.bind(events)

me.reader = async function(aRSS){
    if (typeof aRSS === 'string') {
        loadRSSFeed(aRSS)
    } else if (Array.isArray(aRSS)) {
        aRSS.forEach(loadRSSFeed)
    }
}

const emitRSSFeedLoadError = events.emit.bind(events, 'error')
const emitRSSFeedItemParsingError = events.emit.bind(events, 'error')
const emitRSSItem = events.emit.bind(events, 'item')

const readRSSFile = function(){
    try {
        return JSON.parse(FS.readFileSync('./' + RSS_JSON_FILE))
    } catch (error) {
        return {}
    }
}
const writeRSSFile = function(data){
    FS.writeFileSync('./' + RSS_JSON_FILE, JSON.stringify(data))
}

let RSSLastUpdate = readRSSFile()

const loadRSSFeed = async function(aLink){
    try {
        let parser = new RSSParser()
        let feed = await parser.parseURL(aLink)

        for (let item of feed.items) {
            if (RSSLastUpdate[aLink] === item.pubDate) {
                break
            }
            readRSSFeedItem(feed, item)
        }

        if (feed && feed.items && feed.items[0]) {
            RSSLastUpdate[aLink] = feed.items[0].pubDate
            writeRSSFile(RSSLastUpdate)
        }

    } catch (error) {
        emitRSSFeedLoadError({ error, link:aLink })
    }
}

const readRSSFeedItem = async function(aFeed, aItem){
    try {
        let { title, content } = aItem
        emitRSSItem({ title, content })
    } catch (error) {
        emitRSSFeedItemParsingError({ error, feed:aFeed, item:aItem })
    }
}