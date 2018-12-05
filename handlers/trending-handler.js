const { RssService, TopicsService } = require('./../services');

module.exports = (_req, res) => {
  return RssService.processFeeds().then((data) => {
    res.send({
      topics: TopicsService.processRssData(data)
    });
  });
}
