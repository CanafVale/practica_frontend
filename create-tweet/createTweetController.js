import { createTweet } from "./createTweetModel.js";

export const createTweetController = (form) => {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const tweetElement = form.querySelector('#tweet');
    const tweet = tweetElement.value;

    try {
      await createTweet(tweet)
      setTimeout(() => {
        window.location = '/';
      }, 2000)
    } catch (error) {
      alert(error.message)
    }
  })
}
