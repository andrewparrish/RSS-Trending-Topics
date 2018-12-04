const Parser = require('rss-parser');

const Feeds = [
  'http://rss.cnn.com/rss/cnn_topstories.rss',
  'http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
  'http://feeds.foxnews.com/foxnews/latest'
];

module.exports = class RssService {

  constructor() {
    this.parser = new Parser();
  }

  static processFeeds() {
    const service = new this();
    return Promise.all(Feeds.map(feedUrl => service.fetchFeed(feedUrl)));
  }

  processFeed(feed) {
    return feed.items.map(item => ({ title: item.title, content: item.contentSnippet }));
  }

  fetchFeed(rssUrl) {
    return this.parser.parseURL(rssUrl).then(this.processFeed);
  }
};

