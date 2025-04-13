import { getTweets } from "./showTweetsModel.js"
import { buildTweet, buildNoTweetsAdvice } from './showTweetsView.js';

export async function showTweetsController(container) {

  try {
    const event = new CustomEvent("load-tweets-started")
    container.dispatchEvent(event)
    const tweets = await getTweets();
    drawTweets(tweets, container)
  } catch (error) {
    // alert(error.message)
    const event = new CustomEvent("load-tweets-error", {
      detail: error.message
    })
    container.dispatchEvent(event)
  } finally {
    const event = new CustomEvent("load-tweets-finished")
    container.dispatchEvent(event)
  }
  
}

function drawTweets(tweets, container) {

  container.innerHTML = '';

  if (tweets.length === 0) {
    container.innerHTML = buildNoTweetsAdvice()
  }

  tweets.forEach((tweet) => {
    const tweetHtml = document.createElement("a");
    tweetHtml.setAttribute("href", `./tweet-detail.html?id=${tweet.id}`)
    tweetHtml.innerHTML = buildTweet(tweet)
    
    container.appendChild(tweetHtml)
  }) 
}
