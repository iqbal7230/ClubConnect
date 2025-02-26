"use client"

import { useEffect, useState } from "react"

const LandingPost = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [likedEvents, setLikedEvents] = useState(() => {
    const saved = localStorage.getItem("likedEvents")
    return saved ? JSON.parse(saved) : {}
  })
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()
    const signal = controller.signal

    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/events/getEvent`, { signal })

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data = await response.json()

        if (isMounted && data && Array.isArray(data.data)) {
          setEvents(data.data)
        } else {
          console.error("Unexpected API response format:", data)
          if (isMounted) setEvents([])
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching events:", error)
          if (isMounted) setError("Failed to load events.")
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchData()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  const formatDate = (dateString) => {
    if (!dateString) return "Date not available"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleLike = async (eventId) => {
    try {
      setEvents((prevEvents) =>
        prevEvents.map((event) => {
          if (event._id === eventId) {
            const isLiked = !likedEvents[eventId]
            const newCount = isLiked ? (event.likeCount || 0) + 1 : Math.max((event.likeCount || 0) - 1, 0)

            return { ...event, likeCount: newCount }
          }
          return event
        }),
      )

      setLikedEvents((prev) => {
        const newLikes = {
          ...prev,
          [eventId]: !prev[eventId],
        }
        localStorage.setItem("likedEvents", JSON.stringify(newLikes))
        return newLikes
      })

      const response = await fetch(`${API_BASE_URL}/api/v1/events/like/${eventId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to update like")
      }

      const data = await response.json()

      setEvents((prevEvents) =>
        prevEvents.map((event) => (event._id === eventId ? { ...event, likeCount: data.likeCount } : event)),
      )
    } catch (error) {
      console.error("Error updating like:", error)
      setEvents((prevEvents) =>
        prevEvents.map((event) => (event._id === eventId ? { ...event, likeCount: event.likeCount - 1 } : event)),
      )
      setLikedEvents((prev) => {
        const newLikes = { ...prev }
        delete newLikes[eventId]
        localStorage.setItem("likedEvents", JSON.stringify(newLikes))
        return newLikes
      })
    }
  }

  const defaultImage = "https://placehold.co/600x400?text=No+Image"

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">Latest Events</h2>

        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        )}

        {error && (
          <div className="text-center text-red-600 bg-red-100 p-4 rounded-lg">
            <p className="font-semibold">{error}</p>
          </div>
        )}

        {!loading && events.length === 0 && !error && (
          <div className="text-center text-gray-600 bg-white p-8 rounded-lg shadow-md">
            <p className="text-xl font-semibold">No events available at the moment.</p>
            <p className="mt-2">Check back later for exciting new events!</p>
          </div>
        )}

        {!loading && events.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
              >
                <div className="relative" onDoubleClick={() => handleLike(event._id)}>
                  <img
                    src={event.images && event.images.length > 0 ? event.images[0].url : defaultImage}
                    alt={event.name || "Event"}
                    className="w-full h-56 object-cover"
                    onError={(e) => (e.target.src = defaultImage)}
                  />
                  <button
                    onClick={() => handleLike(event._id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors shadow-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill={likedEvents[event._id] ? "red" : "none"}
                      stroke="currentColor"
                      className="w-6 h-6"
                      strokeWidth={likedEvents[event._id] ? "0" : "2"}
                    >
                      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                    </svg>
                  </button>
                  <span className="absolute bottom-3 left-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {event.likeCount || 0} likes
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{event.name || "Untitled Event"}</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    <span className="font-semibold">When:</span> {formatDate(event.date)} |{" "}
                    {event.time || "Time not available"}
                  </p>
                  <p className="text-gray-600 text-sm mb-4">
                    <span className="font-semibold">By:</span> {event.clubName || "Unknown organizer"}
                    {event.performer && (
                      <span>
                        {" "}
                        • <span className="font-semibold">Performer:</span> {event.performer}
                      </span>
                    )}
                  </p>
                  <p className="text-gray-600 text-sm mb-2">
  <span className="font-semibold">Location:</span> {event.venue || "Venue not specified"}
</p>

                  <p className="text-gray-700 mb-4">
                    {event.description
                      ? event.description.length > 100
                        ? `${event.description.substring(0, 100)}...`
                        : event.description
                      : "No description available."}
                  </p>
                  <div className="flex justify-between items-center">
                    <p className={`font-bold text-lg ${event.isFree ? "text-green-600" : "text-red-600"}`}>
                      {event.isFree ? "FREE" : `$${event.price || "N/A"}`}
                    </p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default LandingPost

