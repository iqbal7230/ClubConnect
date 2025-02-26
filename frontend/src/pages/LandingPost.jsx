import { useEffect, useState } from "react";

const LandingPost = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    let isMounted = true; // Prevent updating state if component unmounts
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        
        console.log('Fetching from:', `${API_BASE_URL}/api/v1/events/getEvent`);
        
        const response = await fetch(`${API_BASE_URL}/api/v1/events/getEvent`, { signal });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched Data:", data);

        if (isMounted && data && Array.isArray(data.data)) {
          setEvents(data.data); // ✅ Correctly storing event data
        } else {
          console.error("Unexpected API response format:", data);
          if (isMounted) setEvents([]);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching events:", error);
          if (isMounted) setError("Failed to load events.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false; 
      controller.abort(); 
    };
  }, []); 

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Latest Events</h2>

      {loading && <p className="text-center text-gray-600">Loading events...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {!loading && events.length === 0 && !error && (
        <p className="text-center text-gray-600">No events available.</p>
      )}

      {!loading && events.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event._id} className="bg-white rounded-lg shadow-md overflow-hidden border">
              <img
                src={event.image || "https://api.flutter.dev/flutter/widgets/Image-class.html"}
                alt={event.title || "Event"}
                className="w-full h-48 object-cover"
                onError={(e) => (e.target.src = "https://api.flutter.dev/flutter/widgets/Image-class.html")}
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{event.title || "Untitled Event"}</h3>
                <p className="text-gray-600 text-sm">{event.date || "Date not available"} | {event.location || "Location not provided"}</p>
                <p className="text-gray-700 mt-2">
                  {event.description ? (event.description.length > 100 ? `${event.description.substring(0, 100)}...` : event.description) : "No description available."}
                </p>
                <p className={`mt-3 font-semibold ${event.entry === "free" ? "text-green-600" : "text-red-600"}`}>
                  {event.entry ? event.entry.toUpperCase() : "N/A"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LandingPost;
