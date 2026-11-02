import React, { useState } from "react";
import Checkout from "./Checkout";

const states = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California",
  "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
  "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas",
  "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts",
  "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana",
  "Nebraska", "Nevada", "New Hampshire", "New Jersey",
  "New Mexico", "New York", "North Carolina", "North Dakota",
  "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island",
  "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah",
  "Vermont", "Virginia", "Washington", "West Virginia",
  "Wisconsin", "Wyoming", "District of Columbia"
];

const features = [
  {
    icon: "🚘",
    title: "Vehicle specifications",
    description:
      "Explore vehicle details, factory specifications, equipment and identification information."
  },
  {
    icon: "⚠️",
    title: "Accident history",
    description:
      "Review available accident, damage and insurance loss records."
  },
  {
    icon: "🔐",
    title: "Theft records",
    description:
      "Check available stolen-vehicle records from supported data sources."
  },
  {
    icon: "📋",
    title: "Title and ownership",
    description:
      "Explore available title, registration and ownership history."
  },
  {
    icon: "🛠️",
    title: "Mileage information",
    description:
      "Review reported mileage readings and available odometer records."
  },
  {
    icon: "💵",
    title: "Vehicle value",
    description:
      "Explore available market valuation information to help assess a vehicle."
  },
  {
    icon: "🏦",
    title: "Finance records",
    description:
      "Check for available lien and financial-interest information."
  },
  {
    icon: "🔧",
    title: "Recall information",
    description:
      "Review manufacturer recall information where available."
  }
];

const brands = [
  { name: "Toyota", icon: "🚗" },
  { name: "Honda", icon: "🚙" },
  { name: "Ford", icon: "🚘" },
  { name: "BMW", icon: "🏎️" },
  { name: "Mercedes-Benz", icon: "🚘" },
  { name: "Chevrolet", icon: "🚙" },
  { name: "Nissan", icon: "🚗" },
  { name: "Tesla", icon: "⚡" }
];

function App() {
  const [searchType, setSearchType] = useState("plate");
  const [vin, setVin] = useState("");
  const [plate, setPlate] = useState("");
  const [state, setState] = useState("");
  const [message, setMessage] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const handleSearch = (event) => {
    event.preventDefault();
    setMessage("");

    let vehicle;

    if (searchType === "vin") {
      const cleanVin = vin.trim().toUpperCase();

      if (!/^[A-HJ-NPR-Z0-9]{17}$/.test(cleanVin)) {
        setMessage("Please enter a valid 17-character VIN.");
        return;
      }

      vehicle = {
        type: "VIN",
        identifier: cleanVin,
        state: ""
      };
    } else {
      const cleanPlate = plate.trim().toUpperCase();

      if (!cleanPlate) {
        setMessage("Please enter your license plate number.");
        return;
      }

      if (!state) {
        setMessage(
          "Please select the state where the vehicle is registered."
        );
        return;
      }

      vehicle = {
        type: "License plate",
        identifier: cleanPlate,
        state: state
      };
    }

    setSelectedVehicle(vehicle);
    setShowCheckout(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const changeSearchType = (type) => {
    setSearchType(type);
    setMessage("");
  };

  // SHOW CHECKOUT AFTER A VALID VEHICLE SEARCH
  if (showCheckout && selectedVehicle) {
    return (
      <Checkout
        vehicle={selectedVehicle}
        onBack={() => {
          setShowCheckout(false);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    );
  }

  return (
    <main>
      {/* HEADER */}
      <header className="site-header">
        <a className="brand" href="#" aria-label="Bumper homepage">
          <span className="brand-symbol">B</span>
          <span className="brand-name">bumper</span>
        </a>

        <nav className="main-nav">
          <a href="#how-it-works">How it works</a>
          <a href="#features">What's included</a>
          <a href="#about">About us</a>
          <a href="#faq">FAQs</a>
        </nav>

        <a href="#vehicle-search" className="header-button">
          Check a vehicle <span>→</span>
        </a>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="hero-background" />
        <div className="hero-shade" />

        <div className="hero-container">
          <div className="hero-copy">
            <span className="eyebrow">
              YOUR NEXT CAR DESERVES A CLOSER LOOK
            </span>

            <h1>
              Know more
              <br />
              before you
              <br />
              <span>buy a car.</span>
            </h1>

            <p>
              Get to know a vehicle beyond its appearance.
              Explore available vehicle history, specifications,
              title information and more.
            </p>

            <div className="hero-points">
              <span>✓ Vehicle information</span>
              <span>✓ History research</span>
              <span>✓ Informed decisions</span>
            </div>
          </div>

          {/* VEHICLE SEARCH */}
          <div className="search-card" id="vehicle-search">
            <div className="search-card-heading">
              <div>
                <span className="search-kicker">START YOUR SEARCH</span>
                <h2>Find a vehicle</h2>
                <p>Enter the vehicle details below.</p>
              </div>

              <div className="search-card-icon">⌕</div>
            </div>

            <div className="search-tabs">
              <button
                type="button"
                className={searchType === "plate" ? "active" : ""}
                onClick={() => changeSearchType("plate")}
              >
                <span>▣</span> License plate
              </button>

              <button
                type="button"
                className={searchType === "vin" ? "active" : ""}
                onClick={() => changeSearchType("vin")}
              >
                <span>▤</span> VIN number
              </button>
            </div>

            <form onSubmit={handleSearch}>
              {searchType === "plate" ? (
                <>
                  <label htmlFor="plate">License plate number</label>

                  <input
                    id="plate"
                    className="search-input"
                    type="text"
                    placeholder="Enter license plate"
                    value={plate}
                    onChange={(event) => {
                      setPlate(
                        event.target.value.toUpperCase().slice(0, 12)
                      );
                      setMessage("");
                    }}
                    autoComplete="off"
                    required
                  />

                  <label htmlFor="state" className="state-label">
                    Registration state
                  </label>

                  <select
                    id="state"
                    className="search-input state-select"
                    value={state}
                    onChange={(event) => {
                      setState(event.target.value);
                      setMessage("");
                    }}
                    required
                  >
                    <option value="">Select state</option>

                    {states.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </>
              ) : (
                <>
                  <label htmlFor="vin">
                    Vehicle identification number
                  </label>

                  <input
                    id="vin"
                    className="search-input"
                    type="text"
                    placeholder="Enter your 17-character VIN"
                    value={vin}
                    onChange={(event) => {
                      setVin(
                        event.target.value
                          .toUpperCase()
                          .replace(/[^A-HJ-NPR-Z0-9]/g, "")
                          .slice(0, 17)
                      );
                      setMessage("");
                    }}
                    maxLength={17}
                    autoComplete="off"
                    required
                  />

                  <div className="vin-counter">
                    {vin.length}/17 characters
                    <span>VINs do not contain I, O or Q.</span>
                  </div>
                </>
              )}

              {message && (
                <div className="search-message" role="alert">
                  {message}
                </div>
              )}

              <button type="submit" className="search-submit">
                Search vehicle
                <span>→</span>
              </button>
            </form>

            <div className="search-note">
              <span>🔒</span>
              Your search details are used to request a vehicle lookup.
            </div>
          </div>
        </div>

        <div className="hero-bottom">
          <span>VEHICLE INFORMATION STARTS HERE</span>
          <span>SCROLL TO EXPLORE ↓</span>
        </div>
      </section>

      {/* TRUST INTRO */}
      <section className="intro-section" id="about">
        <div className="intro-image">
          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1100&q=85"
            alt="Sports car on a road"
          />

          <div className="image-caption">
            <span>MAKE INFORMED DECISIONS</span>
            <strong>Look beyond the surface.</strong>
          </div>
        </div>

        <div className="intro-copy">
          <span className="section-label">WHY CHECK A VEHICLE?</span>

          <h2>
            A car can look perfect.
            <span> Its history matters too.</span>
          </h2>

          <p>
            Buying a used car is a major decision. A vehicle's
            appearance cannot tell you everything about its past.
            Available records can help you investigate important
            details before you make a commitment.
          </p>

          <a href="#features" className="text-link">
            Explore vehicle information <span>→</span>
          </a>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section" id="features">
        <div className="section-heading">
          <span className="section-label">
            EXPLORE VEHICLE INFORMATION
          </span>

          <h2>Get to know the vehicle better.</h2>

          <p>
            Explore important vehicle information from available
            records and supported data providers.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature) => (
            <article className="feature-card" key={feature.title}>
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <span className="feature-arrow">↗</span>
            </article>
          ))}
        </div>

        <p className="data-disclaimer">
          Available information varies by vehicle, reporting source
          and jurisdiction. A missing record does not guarantee that
          an event has never occurred.
        </p>
      </section>

      {/* VEHICLE HISTORY BANNER */}
      <section className="history-banner">
        <div className="history-image">
          <img
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=85"
            alt="Modern car"
          />
        </div>

        <div className="history-content">
          <span className="section-label">
            BEFORE YOU MAKE THE PURCHASE
          </span>

          <h2>Don't just buy the car. Understand it.</h2>

          <p>
            Explore available vehicle records, ask the right questions
            and arrange an independent inspection before purchasing.
          </p>

          <a href="#vehicle-search" className="light-button">
            Start your vehicle search <span>→</span>
          </a>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section" id="how-it-works">
        <div className="section-heading">
          <span className="section-label">THREE SIMPLE STEPS</span>
          <h2>How Bumper works</h2>

          <p>
            Start with vehicle details and explore the information
            available for your vehicle.
          </p>
        </div>

        <div className="steps-grid">
          <article className="step-card">
            <span className="step-number">01</span>
            <div className="step-icon">🔎</div>
            <h3>Find your vehicle</h3>
            <p>
              Enter a VIN or license plate number and select
              the registration state.
            </p>
          </article>

          <article className="step-card">
            <span className="step-number">02</span>
            <div className="step-icon">📊</div>
            <h3>Retrieve available data</h3>
            <p>
              A connected vehicle-data provider retrieves matching
              records when available.
            </p>
          </article>

          <article className="step-card">
            <span className="step-number">03</span>
            <div className="step-icon">🚘</div>
            <h3>Review the information</h3>
            <p>
              Explore the available information and make
              a better-informed decision.
            </p>
          </article>
        </div>
      </section>

      {/* POPULAR VEHICLE BRANDS */}
      <section className="brands-section">
        <div className="section-heading">
          <span className="section-label">VEHICLE RESEARCH</span>
          <h2>Explore popular vehicle brands</h2>

          <p>
            Browse popular automotive manufacturers.
            Vehicle-specific information requires a search.
          </p>
        </div>

        <div className="brands-grid">
          {brands.map((brand) => (
            <div className="brand-card" key={brand.name}>
              <span>{brand.icon}</span>
              <strong>{brand.name}</strong>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section" id="faq">
        <div className="faq-heading">
          <span className="section-label">GOT QUESTIONS?</span>
          <h2>Frequently asked questions</h2>

          <p>
            Learn more about vehicle identification and vehicle
            history information.
          </p>
        </div>

        <div className="faq-list">
          <details>
            <summary>What is a VIN number?</summary>
            <p>
              A Vehicle Identification Number (VIN) is a unique
              17-character code assigned to a vehicle. It helps
              identify the vehicle and its specifications.
            </p>
          </details>

          <details>
            <summary>Where can I find my vehicle's VIN?</summary>
            <p>
              You can usually find the VIN on the dashboard near
              the windscreen, on the driver's door frame or on
              the vehicle's registration documents.
            </p>
          </details>

          <details>
            <summary>Can I search using a license plate?</summary>
            <p>
              The search interface supports US license plate entry
              and state selection. A live lookup requires an
              integrated data provider.
            </p>
          </details>

          <details>
            <summary>
              What information can a vehicle history report contain?
            </summary>
            <p>
              Depending on available records, a report may contain
              vehicle specifications, title events, mileage,
              accident records, theft records, recalls and
              financial-interest information.
            </p>
          </details>

          <details>
            <summary>Does every vehicle have a complete history?</summary>
            <p>
              No. Not every event is reported or available in every
              database. Missing information should not be interpreted
              as proof that a vehicle has a clean history.
            </p>
          </details>

          <details>
            <summary>Does Bumper currently provide live reports?</summary>
            <p>
              Live vehicle reports require an integrated vehicle-data
              provider. Availability depends on the records supplied
              by that provider.
            </p>
          </details>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta">
        <span>YOUR NEXT VEHICLE DECISION STARTS HERE</span>
        <h2>Know more. Choose with confidence.</h2>

        <a href="#vehicle-search">
          Check a vehicle <span>→</span>
        </a>
      </section>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-about">
            <a className="brand footer-brand" href="#">
              <span className="brand-symbol">B</span>
              <span className="brand-name">bumper</span>
            </a>

            <p>
              Helping drivers explore available vehicle information
              and make more informed decisions.
            </p>
          </div>

          <div className="footer-column">
            <h4>Explore</h4>
            <a href="#features">Vehicle information</a>
            <a href="#how-it-works">How it works</a>
            <a href="#vehicle-search">Vehicle search</a>
          </div>

          <div className="footer-column">
            <h4>Information</h4>
            <a href="#about">About Bumper</a>
            <a href="#faq">FAQs</a>
          </div>

          <div className="footer-column">
            <h4>Legal</h4>
            <a href="#disclaimer">Disclaimer</a>
            <a href="#privacy">Privacy policy</a>
            <a href="#terms">Terms of use</a>
          </div>
        </div>

        <div className="footer-bottom" id="disclaimer">
          <p>
            © {new Date().getFullYear()} Bumper. All rights reserved.
          </p>

          <p>
            Vehicle information availability varies by data source.
            Always verify important details independently.
          </p>
        </div>
      </footer>
    </main>
  );
}

export default App;