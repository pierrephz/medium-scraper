import axios from "axios";
import { load } from "cheerio";

export async function GET(request) {
  try {
    const url = "https://medium.com/@pierrephz/list/uiux-design-aea9a113ca2d";

    const { data } = await axios.get(url, {
      // Add request header to verify that you are not a bot
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
      }
    });
    const $ = load(data); // Load the HTML into Cheerio

    const articles = [];
    // Select each <article> container
    $("article").each((i, article) => {
      // Extract the title from the <h2> tag inside the article
      const title = $(article).find("h2").text().trim() || "No Title Found";

      // Extract the author's name (last <p> in the article)
      const author =
        $(article).find("p").last().text().trim() || "No Author Found";

      // Extract the correct link associated with the <h2> tag
      let link =
        $(article).find("h2").closest("a").attr("href") || "No Link Found";
      // Prepend the base URL if the link is not already absolute
      if (link && !link.startsWith("http")) {
        link = `https://medium.com${link}`;
      }
      // Remove everything after the "?" in the link
      if (link.includes("?")) {
        link = link.split("?")[0];
      }

      // Extract the cover image URL from the <img> tag
      const cover =
        $(article).find("img").eq(1).attr("src") || "No Cover Image Found";

      // Extract the third-to-last <span> inside the article
      const spans = $(article).find("span"); // Find all <span> tags
      const date =
        spans
          .eq(spans.length - 3)
          .text()
          .trim() || "No Date Found"; // Target the third-to-last <span>

      // Add the scraped data to the articles array
      articles.push({ title, author, link, cover, date });
    });

    // Return the scraped articles as JSON
    return new Response(JSON.stringify(articles), { status: 200 });
  } catch (error) {
    console.error("Error scraping Medium list:", error.message);
    return new Response("Error scraping Medium list", { status: 500 });
  }
}
