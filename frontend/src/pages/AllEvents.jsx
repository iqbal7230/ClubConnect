// src/pages/AllEvents.jsx
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { useState, useEffect } from 'react';
import { 
  HeartIcon, 
  CurrencyDollarIcon, 
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import SearchEvents from '../components/SearchEvents';

const AllEvents = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const userRole = currentUser?.role || "student";
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likedPosts, setLikedPosts] = useState(() => {
    const saved = localStorage.getItem('likedPosts');
    return saved ? JSON.parse(saved) : {};
  });

  const handleEventClick = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  const handleRegisterClick = (eventId) => {
    navigate(`/register-event/${eventId}`);
  };

  const handleCreateEventClick = () => {
    navigate('/create-event');
  };

  const handleSponsorClick = (eventId) => {
    navigate(`/sponsor-event/${eventId}`);
  };

  const handleViewAttendees = (eventId) => {
    navigate(`/event/${eventId}/attendees`);
  };
  
  // Add a new function to handle viewing sponsors
  const handleViewSponsors = (eventId) => {
    navigate(`/event/${eventId}/sponsors`);
  };

  useEffect(() => {
    // Redirect if not logged in
    if (!currentUser) {
      navigate('/login');
      return;
    }

    const fetchAllEvents = async () => {
      try {
        setLoading(true);
        const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/events/all/getEvent`;
        console.log('Fetching from:', apiUrl);

        const response = await fetch(apiUrl, {
          headers: {
            'Authorization': `Bearer ${currentUser.token}`
          }
        });
        console.log('Response status:', response.status);

        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }

        const data = await response.json();
        console.log('Fetched data:', data);

        if (Array.isArray(data.data)) {
          setEvents(data.data);
        } else {
          throw new Error('Invalid data format received');
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllEvents();
  }, [currentUser, navigate]);

  const handleLike = async (postId) => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    try {
      setEvents(prevEvents =>
        prevEvents.map(event =>
          event._id === postId
            ? { ...event, likeCount: (event.likeCount || 0) + (likedPosts[postId] ? -1 : 1) }
            : event
        )
      );

      setLikedPosts(prev => {
        const newLikes = {
          ...prev,
          [postId]: !prev[postId]
        };
        localStorage.setItem('likedPosts', JSON.stringify(newLikes));
        return newLikes;
      });

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/events/${postId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to update like');
      }

      // Refetch the updated events
      const updatedResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/events/all/getEvent`, {
        headers: {
          'Authorization': `Bearer ${currentUser.token}`
        }
      });
      const updatedData = await updatedResponse.json();
      if (Array.isArray(updatedData.data)) {
        setEvents(updatedData.data);
      }

    } catch (error) {
      console.error('Error updating like:', error);
      // Revert optimistic update on error
      setEvents(prevEvents =>
        prevEvents.map(event =>
          event._id === postId
            ? { ...event, likeCount: event.likeCount - (likedPosts[postId] ? -1 : 1) }
            : event
        )
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="text-2xl font-bold text-gray-900">
              CampusConnect
            </Link>
            <SearchEvents onSearch={() => {}} />
            <div className="flex items-center space-x-4">
              {currentUser ? (
                <>
                  {/* <Link to="/create-event" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                    Create Event
                  </Link> */}
                  <button onClick={logout} className="px-4 py-2 text-gray-700 hover:text-indigo-600">
                    Logout
                  </button>
                </>
              ) 
              : (
                <>
                  {/* <Link to="/login" className="px-4 py-2 text-gray-700 hover:text-indigo-600">
                    Sign In
                  </Link>
                  <Link to="/register" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                    Sign Up
                  </Link> */}
                </>
              )}
            </div>
            {userRole === "club-admin" && (
             <div className="mb-4">
                <button 
                    onClick={handleCreateEventClick}
                     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                 Create New Event
                </button>
                </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">All Events</h1>

        {loading && (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          </div>
        )}

        {error && (
          <div className="text-center text-red-600 py-10">
            {error}
          </div>
        )}

        {!loading && !error && events.length === 0 && (
          <div className="text-center text-gray-600 py-10">
            No events found. Please try again later.
          </div>
        )}

        <div className="space-y-6">
          {events.map((event) => (
            <div 
              key={event._id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Post Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    {event.clubName?.charAt(0) || 'E'}
                  </div>
                  <div>
                    <h3 className="font-semibold">{event.clubName || 'Event Club'}</h3>
                    <p className="text-gray-500 text-sm">{event.venue || 'Location'}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 flex justify-between items-center">
                
              {userRole === "student" && (
                <button 
                  onClick={() => handleRegisterClick(event._id)}
                  className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                >
                  Register
                </button>
              )}
              
              {userRole === "club-admin" /* && event.createdBy === currentUser.id */ &&  (
                <div className="flex space-x-2">
                  {/* <button 
                    onClick={() => navigate(`/edit-event/${event._id}`)}
                    className="bg-yellow-600 text-white px-3 py-1 rounded text-sm hover:bg-yellow-700"
                  >
                    Edit
                  </button> */}
                  <button 
                    onClick={() => handleDeleteEvent(event._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                  >
                    Delete
                  </button>
                  <button 
                    onClick={() => handleViewAttendees(event._id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                    >
                    Attendees
                  </button>
                  <button 
                    onClick={() => handleViewSponsors(event._id)}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                  >
                     Sponsors
                </button>
                </div>
              )}
              
              {userRole === "sponsor" && (
                <button 
                  onClick={() => handleSponsorClick(event._id)}
                  className="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700"
                >
                  Sponsor
                </button>
              )}

              {/* Event Image */}
              <div className="relative">
                <img 
                  src={event.images?.[0]?.url || 'default-event-image.jpg'} 
                  alt={event.name} 
                  className="w-full h-64 object-cover cursor-pointer"
                  onClick={() => handleEventClick(event._id)}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike(event._id);
                  }}
                  className="absolute bottom-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                >
                  {likedPosts[event._id] ? (
                    <HeartSolidIcon className="h-6 w-6 text-red-500" />
                  ) : (
                    <HeartIcon className="h-6 w-6" />
                  )}
                </button>
              </div>

              {/* Post Info */}
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <HeartIcon className="h-5 w-5" />
                      <span>{event.likeCount || 0}</span>
                    </span>
                  </div>
                  <span className="flex items-center space-x-1">
                    <CurrencyDollarIcon className="h-5 w-5" />
                    <span>{event.isFree ? 'Free' : `₹${event.price}`}</span>
                  </span>
                </div>

                <h2 
                  className="font-bold text-lg cursor-pointer"
                  onClick={() => handleEventClick(event._id)}
                >{event.name}</h2>
                <p className="text-gray-600">{event.description}</p>
                <p className="text-sm text-gray-500">
                  {new Date(event.date).toLocaleDateString()} at {event.time}
                </p>
                {event.performer && (
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">Performer:</span> {event.performer}
                  </p>
                )}
              </div>
            </div>
           </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AllEvents;
