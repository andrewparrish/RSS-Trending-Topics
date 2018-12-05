const { handleTrending } = require('./../../handlers');
const { RssService, TopicsService } = require('./../../services');
const sinon = require('sinon');
const testData = require('./../test_data/mocked_responses.json').data;

describe('Trending Handler', () => {
  const topics = ['Topic A', 'Topic B', 'Topic C'];

  before(() => {
    sinon.stub(TopicsService, 'processRssData').returns(topics);
    sinon.stub(RssService, 'processFeeds').resolves({});
  });

  const res = {
    send: sinon.stub()
  }

  beforeEach(() => handleTrending({}, res));

  it('responds with topics', async() => {
    sinon.assert.called(res.send);
  })
});


