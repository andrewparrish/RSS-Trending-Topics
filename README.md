# RSS Trending Topics

The app can be started via: ```npm start```

Curling localhost:8888/trending will return the top 5 trending topics.

## App Structure

* app.js -- Main entrypoint to run express server. Accepts request to provided routing and offloads processing to handlers
* Handlers -- Route handling. For this project, only one handler, TrendingHandler.
* Services -- RSS requests, processing of that data, and extracting of trends from said data.

## Testing

Tests are contained in the test/ folder and can be run with:

```npm test```

Test data from RSS feeds in stored in test/test_data for mocking.

## Topics Algorithin Info

The primary goal of my algorithim in determining trending topics is to extract proper nouns, because they are likely the most
important part of story headlines and summaries. For example, Trump, Bush, and China, are all obvious examples of proper nouns
that point to major stories of the day.

In finding topics, I scan two different pieces of data from the RSS feeds, RSS item headlines, and content. Content, is what I
call the story summary, also called content snippet by the RSS parsing library I was using. Titles and content are processed
in different ways:

#### Processing Titles

Titles are almost entirely capitilized, regardless of whether the word is a proper noun or not. This makes it difficult to determine
which phrases are important, and which are not. As such, I make sure to group all words into groups of three in hopes of catching
major topics. For instance, given the headline: "Why Michael Cohen, Trump’s Fixer, Confessed to It All", I would capture "Michael Cohen",
"Trump's Fixer", and "Confessed to it All", rather than just "Michael", "Cohen", "Fixer", etc.

#### Processing Content

Content is much easier to process due to it being a summary with standard sentence capitalization. As such, I can use a regular expression
to get all instances of sequential capitlized words that indicate proper nouns. For example, given the content summary: "President Trump and
the North Korean leader, Kim Jong-un, at their summit meeting in Singapore in June. A second meeting is likely in January or February,
said John R. Bolton, the national security adviser.", my algorithim would extract "President Trump", "Kim Jong-un", "Singapore",
"John R. Bolton", etc. Additionally the regex can pick up on acronyms such as "G.O.P", and "F.B.I".



#### Calculating Trending Topics


## What would I change given more time?

Firstly, if this were a real web server, the very first thing I would address is the calling of the 3 RSS feeds on every request.
News feeds do not need to be refreshed every request, and instead we could cache the responses in Redis.
Something I would do is cache the trending topics and set the Redis key for those to expire every 15 minutes. When the server has no key for topics, 
it will request the RSS feeds, process the trending topics, and save those in Redis. Better yet, instead of making those request to the RSS feeds within 
a request to my server, I would want to run the RSS requests/processing to find the trending topics in a background process/worker.

My next biggest priority would be improving the trending algorithim, both in terms of performance and accuracy. Currently, I believe there are more loops
than may be necessary.

Just as importantly, I belive there is some clear improvemnets that could be made to the algorithim determining in trends given some more time.
For instance, the desire to find the most verbose/descriptive instance of a topic also leaves the algorithim
open to labeling a single story in a large topic as more important than it is. For example, today (Tuesday 12/4/2018), there are many different China stories,
including trade and steve Bannon, but if there are many different stories about one proper noun (China), the most verbose phrase may not be the most important
topic. That being said, I feel this first pass at an algorithim did a solid job idenitfying President George H.W Bush's death, and his lying in the Capitol
Rotunda as important, as well as President Trump's comments that 'Journalists Disappear'.

