const { RssService, TopicsService } = require('./../services');

module.exports = (req, res) => {
  RssService.processFeeds().then((data) => {
    res.send({
      topics: TopicsService.processRssData(data)
    });
  });
}
