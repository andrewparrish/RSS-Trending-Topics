const { RssService } = require('./../../services');
const assert = require('assert');
const sinon = require('sinon');
const foxData = require('./../test_data/fox.json');

describe('RssService', () => {
  describe('#fetchFeed', () => {
    let service = new RssService();
    before(() => {
      const parser = {
        parseURL: new Promise((resolve, reject) => {
          resolve(foxData)
        });
      }
      sinon.stub(service.parser, parser); 
    });

    it('extracts out the feed title and content', (done) => {

    });
  });
});
