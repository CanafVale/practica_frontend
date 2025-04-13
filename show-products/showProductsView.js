export const buildTweet = (tweet) => {
  const date = new Date(tweet.updatedAt)
  let tweetView =  `
        <p>${tweet.userId} - ${date.toLocaleString()}</p>
        <p>${tweet.content}</p>
      `;

  if (tweet.likes > 0) {
    tweetView += `<p>${tweet.likes}</p>`;
  }

  return tweetView
}

export const buildNoTweetsAdvice = () => {
  return '<h3>Lo siento, no hay tweets disponibles!</h3>'
}
