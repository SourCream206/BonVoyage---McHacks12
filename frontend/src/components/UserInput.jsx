import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import IMAGES from "../images/IMAGES";

const UserInput = () => {
  const [city, setCity] = useState(""); // State to hold the city input
  const [responseMessage, setResponseMessage] = useState(""); // State to display the response message
  const [isAnimating, setIsAnimating] = useState(false); // State to trigger the animation
  const navigate = useNavigate(); // React Router hook to navigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/user-input/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: city }), // Send city as input
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response from server:", errorText);
        setResponseMessage(`Error: ${response.status} - ${errorText}`);
      } else {
        const data = await response.json();
        console.log("Success:", data);
        setResponseMessage("Successfully submitted!");
        setCity(""); // Reset input field
        // Trigger animation before navigation
        setIsAnimating(true);
        setTimeout(() => {
          navigate("/new-page");
        }, 2000); // Match sliding duration (2000ms)
      }
    } catch (error) {
      console.error("Network error:", error.message);
      setResponseMessage("A network error occurred.");
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <img src={IMAGES.image3} className={`absolute size-200 w-screen max-h-screen ${isAnimating ? "opacity-0" : "opacity-100"} transition-opacity duration-[2000ms]`}></img>
      <img src={IMAGES.image4} className={`absolute scale-120 motion-scale-in-[0.08] motion-opacity-in-[0%] motion-blur-in-[40px] motion-duration-[2.00s] ${isAnimating ? "opacity-0" : "opacity-100"} transition-opacity duration-[2000ms]`}></img>
      
      <div
        className={`min-h-screen text-white p-5 flex items-center justify-center transition-transform duration-[5000ms] ${
          isAnimating ? "z-100 translate-x-[-200vw] motion-ease-out-cubic motion-duration-[2.00s]" : ""
        }`}
      >
        <img src={IMAGES.image2} className="absolute top-1/2 left-0 size-1/2 motion-scale-in-[0.8] motion-translate-x-in-[200%] motion-translate-y-in-[-2%] motion-opacity-in-[50%] motion-blur-in-[20px] motion-duration-[3.00s] motion-ease-out-cubic"/>
        <img src={IMAGES.image2} className="absolute top-1/2 right-0 size-1/2 motion-scale-in-[0.8] motion-translate-x-in-[-200%] motion-translate-y-in-[-3%] motion-opacity-in-[50%] motion-blur-in-[20px] motion-duration-[3.00s] motion-ease-out-cubic"/>
        <div className="text-in p-5 max-w-lg w-full font-sans bg-gray-900 rounded-lg shadow-lg">
          <h1 className="text-2xl font-semibold mb-4">Enter the city you want to travel to</h1>
          <form onSubmit={handleSubmit}>
            <textarea
              value={city}
              onChange={(e) => setCity(e.target.value)} // Update state with city input
              placeholder="Enter your city here..."
              rows="4"
              className="w-full max-h-120 min-h-15 p-3 text-base mb-4 bg-gray-800 text-white border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 text-base rounded-md shadow-md hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </form>
          {responseMessage && (
            <p
              className={`mt-4 ${
                responseMessage.includes("Successfully") ? "text-green-400" : "text-red-400"
              }`}
            >
              {responseMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserInput;
