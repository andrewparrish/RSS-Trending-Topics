const commonWords = require('./common-words.json');

const properNounsRegex = /([A-Z][a-z|\.|-]*\s?)*/g;

module.exports = class TopicsService {
  constructor(rssData) {
    this.rssData = rssData;
    this.commonPhrases = {};
  }

  static processRssData(data) {
    return new this(data).extractTopics();
  }

  addPhrase(phrase) {
    if (this.commonPhrases[phrase]) {
      this.commonPhrases[phrase] += 1;
    } else {
      this.commonPhrases[phrase] = 1;
    }
  }

  notBlank(str) { return str !== '' }

  processContent(content) {
    return content.match(properNounsRegex).filter(this.notBlank).map(str => str.trim());
  }

  processTitle(title, wordCombinations = 3) {
    let phrases = [];
    const titleArr = title.split(' ');

    for(let i = 0; i < titleArr.length; i++) {
      for(let y = i; y <= i + wordCombinations; y++) {
        phrases.push(titleArr.slice(i, y).join(' '));
      }
    }

    return phrases.filter(this.notBlank);
  }
}
