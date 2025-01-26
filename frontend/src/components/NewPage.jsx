import React, { useState, useEffect } from "react";
import IMAGES from '../images/IMAGES';
import './NewPage.css';

const NewPage = () => {
  const [attractions, setAttractions] = useState([]);
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [savedAttractions, setSavedAttractions] = useState([]);
  const [selectedAttraction, setSelectedAttraction] = useState(null);

  const [isTouristAttractionsActive, setIsTouristAttractionsActive] = useState(true);
  const [isRestaurantsActive, setIsRestaurantsActive] = useState(false);
  const [isFinishItineraryActive, setIsFinishItineraryActive] = useState(false);

  const fetchData = () => {
    const fileToFetch = isTouristAttractionsActive
      ? "/tourist_attractions.json"
      : "/resturants.json";

    fetch(fileToFetch)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setAttractions(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to load data. Please try again.");
      });
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [isTouristAttractionsActive, isRestaurantsActive]);

  const handleAttractionClick = (attraction) => setSelectedAttraction(attraction);
  const handleCloseInfo = () => setSelectedAttraction(null);

  const handleSubmit = () => {
    fetch("http://localhost:8000/api/additional/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: inputValue, isTouristAttractionsActive }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data successfully submitted:", data);
        setInputValue(""); // Optionally clear the input
      })
      .catch((err) => console.error("Error submitting data:", err));
  };

  const handleDragStart = (e, attraction) => e.dataTransfer.setData("attraction", JSON.stringify(attraction));
  const handleDrop = (e) => {
    const attraction = JSON.parse(e.dataTransfer.getData("attraction"));
    setSavedAttractions([...savedAttractions, attraction]);
  };

  const handleRemove = (attractionToRemove) => {
    setSavedAttractions(savedAttractions.filter((attraction) => attraction !== attractionToRemove));
  };

  const handleSavedAttractionClick = (attraction) => setSelectedAttraction(attraction);

  const handleButtonClick = (button) => {
    if (button === "touristAttractions") {
      setIsTouristAttractionsActive(true);
      setIsRestaurantsActive(false);
    } else if (button === "restaurants") {
      setIsRestaurantsActive(true);
      setIsTouristAttractionsActive(false);
    } else if (button === "finishItinerary") {
      setIsFinishItineraryActive(!isFinishItineraryActive);
      saveItineraryToBackend();
    }
  };

  const saveItineraryToBackend = () => {
    fetch("http://localhost:8000/api/saved-attractions/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: savedAttractions }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Itinerary saved successfully:", data);
        setSavedAttractions([]); // Clear saved attractions after saving
        window.location.href = "/page3"; // Redirect to the new page
      })
      .catch((err) => console.error("Error saving itinerary:", err));
  };

  return (
    <div className="flex">
      <div className="flex">
        {/* Left panel: list of tourist attractions or restaurants */}
        <div className="relative text-in left-panel z-10">
          <img
            src={IMAGES.image1}
            className="size-50 z-10 absolute left-18 -top-4 align-auto motion-scale-in-[0] motion-translate-x-in-[200%] motion-translate-y-in-[-52%] motion-opacity-in-[33%] motion-rotate-in-[360deg] motion-blur-in-[10px] motion-duration-[2.00s] motion-duration-[1.00s]/blur motion-ease-spring-bouncier"
            alt="Background"
          />
          <div className="button-container mt-40 mb-10 flex-col space-y-4 scale-70">
            <button
              className={`text-2xl text-white py-2 px-4 bg-gray-800 rounded-lg transition-all duration-500 ease-in-out ${
                isTouristAttractionsActive ? "shadow-lg scale-180" : "opacity-75"
              }`}
              onClick={() => handleButtonClick("touristAttractions")}
            >
              <b>Tourist Attractions</b>
            </button>
            <button
              className={`text-xl text-white py-2 px-4 bg-gray-900 rounded-lg transition-all duration-500 ease-in-out ${
                isRestaurantsActive ? "shadow-lg scale-230" : "opacity-75"
              }`}
              onClick={() => handleButtonClick("restaurants")}
            >
              <i>Restaurants</i>
            </button>
          </div>

          {error && <p className="text-red-500">{error}</p>}
          {attractions.length === 0 && !error ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {attractions.map((attraction, index) => (
                <li
                  key={index}
                  draggable
                  onDragStart={(e) => handleDragStart(e, attraction)}
                  onClick={() => handleAttractionClick(attraction)}
                >
                  {attraction.name}
                </li>
              ))}
            </ul>
          )}

          <div className="search-box card-in mb-10 center">
            <input
              type="text"
              placeholder="Make Changes..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button className="relative search-btn" onClick={handleSubmit}>
              &rarr;
            </button>
          </div>

          <div className="text-center p-4 bg-gray-800 rounded-lg shadow-2xl">
            <button
              className={`motion-preset-oscillate motion-duration-2000 ${isFinishItineraryActive ? "active" : ""}`}
              onClick={() => handleButtonClick("finishItinerary")}
            >
              Finish Itinerary
            </button>
          </div>

          <div class={`size-6 bottom-5 left-40 centered absolute ${
                isFinishItineraryActive ? "visible" : "invisible"
              }`}>
            <div class="text-white w-6 h-6 border-13 border-t-4 border-gray-200 rounded-b-sm motion-preset-spin"></div>
          </div>
        </div>

        {/* Center panel: Drop area */}
        <div
          className="absolute inset-y-0 right-0 w-1/8 text-center border-dashed border-white border-1 z-0"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <h2>Saved Attractions</h2>
          {savedAttractions.length === 0 ? (
            <p>Drag attractions here to save them.</p>
          ) : (
            <div>
              {savedAttractions.map((attraction, index) => (
                <div
                  key={index}
                  className="saved-item text-white bg-gradient-to-r from-indigo-600 from-10% via-sky-700 via-30% to-emerald-700 to-90% border-4 border-gray-700 rounded-2xl overflow-hidden justify-center items-center"
                  onClick={() => handleSavedAttractionClick(attraction)}
                >
                  <h3>{attraction.name}</h3>
                  <button onClick={() => handleRemove(attraction)}>Remove</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right panel: Detailed view */}
        {selectedAttraction && (
          <div
            className="right-panel w-3/4 ml-4 bg-gray-100 rounded-lg shadow-lg z-20"
            style={{ maxWidth: "60%" }} // Adjust width as needed
          >
            <button
              onClick={handleCloseInfo}
              className="self-end text-gray-600 text-xl font-bold hover:text-gray-800 focus:outline-none"
            >
              &times;
            </button>
            <h2 className="text-2xl text-in font-semibold text-gray-800">{selectedAttraction.name}</h2>
            <div className="info-content flex space-x-4 items-start">
              <img
                className="max-w-1/4 motion-scale-in-[0.1] motion-translate-x-in-[52%] motion-translate-y-in-[117%] motion-opacity-in-[33%] motion-rotate-in-[-360deg] motion-blur-in-[10px] motion-duration-[3.00s] motion-duration-[0.75s]/opacity motion-duration-[2.16s]/rotate motion-duration-[2.61s]/blur motion-ease-spring-bouncier h-auto object-cover rounded-lg shadow-2xl hover:scale-150 transition-transform"
                src={selectedAttraction.link_to_image}
                alt={selectedAttraction.name}
              />
              <div className="w-1/2 card-in p-4 bg-gray-200 rounded-lg shadow-2xl">
                <p className="text-gray-700 text-lg leading-relaxed">{selectedAttraction.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewPage;
