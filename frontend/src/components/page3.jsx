import React, { useState, useEffect } from "react";

const Page3 = () => {
  const [itinerary, setItinerary] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch itinerary.json from the public folder or URL
    fetch("/itinerary.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setItinerary(data);
      })
      .catch((error) => {
        console.error("Error fetching itinerary:", error);
        setError("Failed to load itinerary. Please try again.");
      });
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="bg-black p-8 min-h-screen">
      <h1 className="text-3xl text-white text-in mb-6">Your Itinerary</h1>
      {itinerary ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {itinerary.map((item, index) => (
            <div key={index} className="bg-gray-800 text-in text-white rounded-lg shadow-lg p-4 mb-4 last:mb-0">
              <img
                src={item.link_to_image}
                alt={item.name}
                className="w-full h-56 object-cover rounded-lg mb-4"
                onError={(e) => e.target.src = '/images/fallback.jpg'} // Fallback image
              />
              <h2 className="text-2xl font-semibold mb-2">{item.name}</h2>
              <a href={item.website} target="_blank" rel="noopener noreferrer" className="text-blue-400 mb-2">
                Visit Website
              </a>
              <p className="text-sm text-gray-300">{item.address}</p>
              <p className="text-sm mt-2">Price: {item.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white">Loading itinerary...</p>
      )}
    </div>
  );
};

export default Page3;
