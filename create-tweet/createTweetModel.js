export const createTweet = async (tweet) => {
  
  const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:8000/api/tweets", {
    method: "POST",
    body: JSON.stringify({
      content: tweet,
      likes: 0
    }),
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const data = response.json();
    throw new Error("No se ha podido crear el tweet")
  }
}
