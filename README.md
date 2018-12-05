# RSS Trending Topics

## App Structure

* app.js -- Main entrypoint to run express server. Accepts request to provided routing and offloads processing to handlers
* Handlers -- Route handling. For this project, only one handler, TrendingHandler.
* Services -- RSS requests, processing of that data, and extracting of trends from said data.

## Testing

Tests are contained in the test/ folder and can be run with:

```npm test```

Test data from RSS feeds in stored in test/test_data for mocking.

## Topics Algorithin Info

#### Processing Titles


## What would I change given more time?

Firstly, if this were a real web server, the very first thing I would address is the calling of the 3 RSS feeds on every request.
News feeds do not need to be refreshed every request, and instead we could cache the responses in Redis.
Something I would do is cache the trending topics and set the Redis key for those to expire every 15 minutes. When the server has no key for topics, 
it will request the RSS feeds, process the trending topics, and save those in Redis. Better yet, instead of making those request to the RSS feeds within 
a request to my server, I would want to run the RSS requests/processing to find the trending topics in a background process/worker.

My next biggest priority would be improving the trending algorithim.


