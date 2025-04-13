export const buildTweetDetailView = (tweet) => {
  const date = new Date(tweet.updatedAt)
  let tweetView =  `
        <p>${tweet.user.name} - ${date.toLocaleString()}</p>
        <p>${tweet.content}</p>
      `;

  if (tweet.likes > 0) {
    tweetView += `<p>${tweet.likes}</p>`;
  }

  return tweetView
}

export const buildRemoveTweetButton = () => {
  const removeButton = document.createElement("button");
  removeButton.textContent = 'Borrar tweet';

  return removeButton;
}
