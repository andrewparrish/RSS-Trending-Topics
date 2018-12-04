const { RssService } = require('./../services');

module.exports = (req, res) => {
  RssService.processFeeds().then(data => res.send(data));
}
