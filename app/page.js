import Image from "next/image";
import "./globals.css";

export default function Home() {
  return (
    <div className="container">
      <div className="hero">
        <h1>Curated Medium articles</h1>
        <h2>Read some curated UI/UX design article from Medium.</h2>
        <div className="alert">
          <Image
            src="icons/icon-alert-circle.svg"
            alt="Alert Icon"
            width={32}
            height={32}
            className="alert-icon"
          />
          <h3 className="alert-text">
            Some articles might require a premium Medium account.
          </h3>
        </div>
        <button id="scrape-button">Scrape my list</button>
      </div>
      <div id="articles" className="articles"></div>
      <div className="footer">
        <p>
          Home made by{" "}
          <a
            href="https://pierrephilouze.com"
            target="_blank"
            className="link"
            style={{ color: "#FF6348", fontWeight: "bold" }}
          >
            pierrephz <span>↗</span>
          </a>
        </p>
      </div>

      <script src="/script.js"></script>
    </div>
  );
}
