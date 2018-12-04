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

  processTitle(title, wordCombinations = 3) {

  }
}
