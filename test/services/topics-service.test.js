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
    let phrases;
    const title = 'As Washington remembered Bush, politics in the Capitol was on hold -- sort of'; 

    it('processes with default wordCombination of 3', () => {
      phrases = service.processTitle(title);
      expect(phrases).to.include('As Washington remembered');
      expect(phrases).to.include('As Washington');
      expect(phrases).to.include('Washington');
    });

    it('process with a shallower 2 setting', () => {
      phrases = service.processTitle(title, 2);
      expect(phrases).not.to.include('As Washington remembered');
      expect(phrases).to.include('As Washington');
      expect(phrases).to.include('Washington');
    });

    it('ignores blank strings', () => {
      phrases = service.processTitle(title);
      expect(phrases).not.to.include('');
    })
  });

  describe('#processContent', () => {
    let properNouns;
    const content = "President Trump and the North Korean leader, Kim Jong-un, at their summit meeting in Singapore in June. A second meeting is likely in January or February, said John R. Bolton, the national security adviser."

    before(() => properNouns = service.processContent(content));

    it('extracts proper nouns from content', () => {
      expect(properNouns).to.include('President Trump');
      expect(properNouns).to.include('Kim Jong-un');
    });

    it('extracts acronyms from content', () => {
      let acronyms = service.processContent('Foo fizz buzz, G.O.P');
      expect(acronyms).to.include('G.O.P');
      expect(acronyms).not.to.include('fizz');
    });

    it('ignores blank strings', () => {
      expect(properNouns).not.to.include(''); 
    });
  });
});
