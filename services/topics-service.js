const commonWords = require('./common-words.json').words;

const properNounsRegex = /([A-Z][a-z|\.|-]*\s?)*/g;

module.exports = class TopicsService {
  constructor(rssData) {
    this.rssData = rssData;
    this.commonPhrases = {};
  }

  static processRssData(data, topics = 5) {
    return new this(data).extractTopics(topics);
  }

  get sortedTopics() {
    return Object.keys(this.commonPhrases)
                 .sort((a, b) => this.commonPhrases[b] - this.commonPhrases[a])
                 .filter(word => !commonWords.includes(word.toLowerCase()));
  }

  extractTopics(limit) {
    this.rssData.forEach((item) => {
      this.addPhrases(this.processTitle(item.title));
      this.addPhrases(this.processContent(item.content));
    });
    const sorted = this.sortedTopics;
    let topics = [];
    sorted.forEach((topic) => {
      if (topics.length == limit) { return topics; }
      const phrase = this.longestPhrase(topic, sorted);
      if(!topics.includes(phrase)) {
        topics.push(phrase);
      }
    })

    return topics;
  }

  longestPhrase(subPhrase, phrases) {
    const allPhrases = phrases.filter(phrase => phrase.includes(subPhrase));
    return allPhrases.sort((a, b) => b.length - a.length)[0];
  }

  addPhrases(phrases) {
    return phrases.forEach(this.addPhrase.bind(this));
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
