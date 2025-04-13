// modelo -> obtención de datos que necesita nuestra aplicación

export async function getTweets() {
  // fetch('http://localhost:8000/api/tweets')
  //   .then(response => response.json())
  //   .then(tweets => {console.log(tweets);
  //   })
  let tweets = [];

  try {
    const response = await fetch('http://localhost:8000/api/tweets')
    tweets = await response.json();
  } catch (error) {
    throw new Error("No ha sido posible obtener los tweets. Inténtalo de nuevo más tarde.")
  }
  
  return tweets;
}
