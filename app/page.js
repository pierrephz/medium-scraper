import "./globals.css";

export default function Home() {
  return (
    <div className="container">
      <div className="hero">
        <h1>Curated Medium articles</h1>
        <h2>
          Read some curated UI/UX design article from Medium. <br /> Some
          articles might require a premium account.
        </h2>
        <button id="scrape-button" className="btn">
          Scrape my list
        </button>
      </div>
      <div id="articles" className="articles"></div>

      <script src="/script.js"></script>
    </div>
  );
}
