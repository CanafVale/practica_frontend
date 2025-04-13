export async function tweetDetailModel(tweetId) {

  const response = await fetch(`http://localhost:8000/api/tweets/${tweetId}?_expand=user`);

  if (!response.ok) {
    throw new Error("Tweet no disponible")
  }

  const tweetDetail = await response.json();

  return tweetDetail;
}

export async function removeTweet(tweetId) {
  const token = localStorage.getItem('token');

  const response = await fetch(`http://localhost:8000/api/tweets/${tweetId}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error("Tweet no disponible")
  }
}

export async function getLoggedInUserInfo() {
  const token = localStorage.getItem('token');
 
  const response = await fetch(`http://localhost:8000/auth/me`, {
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });
  if (!response.ok) {
    throw new Error("Usuario no existente");
  }

  const user = await response.json();

  return user;

 }
