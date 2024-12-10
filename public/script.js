console.log("script.js loaded");

let allArticles = []; // Store all articles fetched from the API

// Function to show a loading spinner on a button
function showSpinner(button) {
  button.disabled = true; // Disable the button
  button.innerHTML = `
    <div class="spinner"></div> Scraping...
  `;
}

// Function to hide the spinner and reset the button text
function hideSpinner(button, text) {
  button.disabled = false; // Enable the button
  button.innerHTML = text; // Reset the button text
}

// Function to fetch scraped articles
async function fetchArticles(button) {
  try {
    showSpinner(button); // Show the spinner
    console.log("Fetching articles...");
    const response = await fetch("/api/scraper"); // Replace with your API endpoint
    const articles = await response.json();
    console.log("Articles fetched:", articles);

    allArticles = articles;
    displayRandomArticles(); // Display articles once they're fetched

    // Update the button label
    hideSpinner(button, "Scrape again");
  } catch (error) {
    console.error("Error fetching articles:", error);
    alert("Failed to fetch articles. Please try again.");
    hideSpinner(button, "Scrape My List");
  }
}

function displayRandomArticles() {
  const articlesContainer = document.getElementById("articles");
  articlesContainer.innerHTML = ""; // Clear the previous articles

  if (allArticles.length === 0) {
    alert("No articles to display. Please scrape data first!");
    console.error("allArticles is empty.");
    return;
  }

  // Shuffle and pick 6 random articles
  const randomArticles = allArticles
    .sort(() => 0.5 - Math.random()) // Shuffle the array
    .slice(0, 6); // Pick the first 6

  randomArticles.forEach((article) => {
    const articleElement = document.createElement("a");
    articleElement.classList.add("article");
    articleElement.href = article.link; // Add the article link
    articleElement.target = "_blank"; // Open in a new tab
    articleElement.innerHTML = `
      <div class="article-header">
        <img class="article-img" src="${article.cover}" alt="${article.title}">
        <h3 class="link">${article.title} <span>↗</span></h3>
      </div>
      <p>By ${article.author} on ${article.date}</p>
    `;

    // Append the clickable article to the container
    articlesContainer.appendChild(articleElement);
  });
}

// Add event listeners for the button
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded.");

  // "Scrape My List" button
  const scrapeButton = document.getElementById("scrape-button");
  if (scrapeButton) {
    scrapeButton.addEventListener("click", async () => {
      console.log("Scrape My List button clicked!");
      await fetchArticles(scrapeButton); // Fetch and display articles
    });
  } else {
    console.error("Scrape My List button not found.");
  }
});
