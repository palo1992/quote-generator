const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// Show loading
function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide loading
function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Get Quote From API
async function getQuote() {
    showLoadingSpinner();
  const apiUrl =
    "https://type.fit/api/quotes/?method=getQuote&lang=en&format=json";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const number = Math.floor(Math.random() * data.length);

    // if author is blank, add unknown
    if (data[number].author === "") {
      authorText.innerText = "Unknown";
    } else {
      authorText.innerText = data[number].author;
    }
    console.log(data[number].text.length);
    // reduce font-size for long quotes
    if (data[number].text.length > 120) {
      quoteText.classList.add("long-quote");
    }  else {
        quoteText.classList.remove("long-quote");
    } 
    quoteText.innerText = data[number].text;
    // Stop loader, show quote
    removeLoadingSpinner();
  } catch (error) {
    getQuote();
  }
}
// tweet quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text´${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuote();
