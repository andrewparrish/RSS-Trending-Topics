const { TopicsService } = require('./../../services');
const expect = require('chai').expect;

describe('TopicsService', () => {
  let service;
  beforeEach(() => service = new TopicsService());

  describe('#addPhrase', () => {
    it('adds a phrase when one does not exist', () => {
      expect(service.commonPhrases['News']).to.be.undefined;
      service.addPhrase('News');
      expect(service.commonPhrases['News']).to.equal(1);
    });

    it('increments an existing phrase', () => {
      service.addPhrase('News');
      service.addPhrase('News');
      expect(service.commonPhrases['News']).to.equal(2);
    })
  });

  describe('#processTitle', () => {

  });
});
