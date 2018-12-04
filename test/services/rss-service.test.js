const { RssService } = require('./../../services');
const expect = require('chai').expect;
const nock = require('nock');
const fs = require('fs');
const path = require('path');
const foxPath = path.join(__dirname, '../test_data/fox.rss');

describe('RssService', () => {
  let service = new RssService();

  describe('#fetchFeed', () => {
    beforeEach((done) => {
      fs.readFile(foxPath, { encoding: 'utf-8' }, (err, foxData) => {
        nock(/.+/).get(/.+/).reply(200, foxData);
        done();
      });
    });

    it('extracts out the feed title and content', (done) => {
      service.fetchFeed('foo').then((data) => {
        expect(data.length).to.be.greaterThan(0);
        expect(Object.keys(data[0])).to.deep.equal(['title', 'content']);
        done();
      })
    });
  });
});
