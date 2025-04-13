import { tweetDetailModel, getLoggedInUserInfo, removeTweet } from "./tweetDetailModel.js"
import { buildTweetDetailView, buildRemoveTweetButton } from "./tweetDetailView.js"

export const tweetDetailController = async (tweetContainer, tweetId) => {


  const showRemoveTweetButton = (tweetId) => {
    const removeButton = buildRemoveTweetButton()
    tweetContainer.appendChild(removeButton)

    removeButton.addEventListener("click", () => {
      if (confirm("¿estás seguro de borrar el tweet?")) {
        removeTweet(tweetId)
      }
    })
  }

  try {
    const tweetDetail = await tweetDetailModel(tweetId)
    tweetContainer.innerHTML = buildTweetDetailView(tweetDetail)

    const user = await getLoggedInUserInfo();
    if (user.id === tweetDetail.userId) {
      showRemoveTweetButton(tweetId)
    }
  } catch (error) {
    alert(error.message)
  }

}
