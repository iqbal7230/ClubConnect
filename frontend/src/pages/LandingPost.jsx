import { useEffect, useState } from "react";
import axios from "axios";


const LandingPost = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log("Fetching from:", `${API_BASE_URL}/events/getEvent`);
        
        const response = await axios.get(`${API_BASE_URL}/events/getEvent`, { signal });
        
        console.log("Fetched Data:", response.data);

        if (isMounted && response.data && Array.isArray(response.data.data)) {
          setEvents(response.data.data);
        } else {
          console.error("Unexpected API response format:", response.data);
          if (isMounted) setEvents([]);
        }
      } catch (error) {
        if (!axios.isCancel(error)) {
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
      <h2 className="text-3xl font-bold text-white mb-6 text-center">Latest Events</h2>

      {loading && <p className="text-center text-white">Loading events...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {!loading && events.length === 0 && !error && (
        <p className="text-center text-gray-600">No events available.</p>
      )}

      {!loading && events.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event._id} className="bg-white rounded-lg shadow-md overflow-hidden border">
              <img
                src={event.images?.[0]?.url || "https://api.flutter.dev/flutter/widgets/Image-class.html"}
                alt={event.name || "Event"}
                className="w-full h-48 object-cover"
                onError={(e) => (e.target.src = "https://api.flutter.dev/flutter/widgets/Image-class.html")}
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{event.name || "Untitled Event"}</h3>
                <p className="text-gray-600 text-sm">{event.date ? new Date(event.date).toLocaleDateString() : "Date not available"} | {event.venue || "Venue not provided"}</p>
                <p className="text-gray-700 mt-2">
                  {event.description ? (event.description.length > 100 ? `${event.description.substring(0, 100)}...` : event.description) : "No description available."}
                </p>
                <p className={`mt-3 font-semibold ${event.isFree ? "text-green-600" : "text-red-600"}`}>
                  {event.isFree ? "FREE" : `₹${event.price}`}
                </p>
                <p className="text-sm text-gray-500">Club: {event.clubName}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LandingPost;
