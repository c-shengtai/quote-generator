const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter-button");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");
const quoteContainer = document.getElementById("quote-container");

// show loader
const loading = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

// hidden loader
const complete = () => {
  if (!loader.hidden) {
    loader.hidden = true;
    quoteContainer.hidden = false;
  }
};

// get quote
const fetchQuote = async () => {
  loading();
  const proxyUrl = "https://cryptic-refuge-10869.herokuapp.com/";
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en";
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    authorText.innerHTML =
      data.quoteAuthor === "" ? "Unknown" : data.quoteAuthor;
    quoteText.innerHTML = data.quoteText;
    if (data.quoteText.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    complete();
  } catch (error) {
    fetchQuote();
  }
};
// twitter share function
const tweetQuote = () => {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
};

// event listener
newQuoteBtn.addEventListener("click", fetchQuote);
twitterBtn.addEventListener("click", tweetQuote);

// on load
fetchQuote();
