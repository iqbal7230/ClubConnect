import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { useState, useEffect } from 'react';
import { HeartIcon, ChatBubbleOvalLeftIcon, ShareIcon, CurrencyDollarIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import SearchEvents from '../components/SearchEvents';

const TrendingPage = () => {
  const { currentUser, logout } = useAuth();
  const [topPosts, setTopPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likedPosts, setLikedPosts] = useState(() => {
    const saved = localStorage.getItem('likedPosts');
    return saved ? JSON.parse(saved) : {};
  });

  // Fetch top 3 most liked events
  useEffect(() => {
    const fetchTopPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/events/top-events`);
        if (!response.ok) {
          throw new Error('Failed to fetch top events');
        }
        const data = await response.json();
        setTopPosts(data.data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching top posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopPosts();
  }, []);

  const handleLike = async (postId) => {
    try {
      // Optimistic update
      setTopPosts(prevPosts =>
        prevPosts.map(post =>
          post._id === postId
            ? { ...post, likeCount: (post.likeCount || 0) + (likedPosts[postId] ? -1 : 1) }
            : post
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

      // API call to update like
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/events/like/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to update like');
      }

      // Refetch top posts after like update
      const updatedResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/events/top-events`);
      const updatedData = await updatedResponse.json();
      setTopPosts(updatedData.data);

    } catch (error) {
      console.error('Error updating like:', error);
      // Revert optimistic update on error
      setTopPosts(prevPosts =>
        prevPosts.map(post =>
          post._id === postId
            ? { ...post, likeCount: post.likeCount - (likedPosts[postId] ? -1 : 1) }
            : post
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
            <SearchEvents onSearch={() => {}} /> {/* You can implement search functionality if needed */}
            <div className="flex items-center space-x-4">
              {currentUser ? (
                <button onClick={logout} className="px-4 py-2 text-gray-700 hover:text-indigo-600">
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/login" className="px-4 py-2 text-gray-700 hover:text-indigo-600">
                    Sign In
                  </Link>
                  <Link to="/register" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Top Trending Events 🔥</h1>
        
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

        <div className="space-y-6">
          {topPosts.map((post) => (
            <div key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Post Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center space-x-3">
                  <Link to={`/profile/${post._id}`}>
                    <img 
                      src={post.profileImage || 'default-profile-image.jpg'} 
                      alt={post.club} 
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </Link>
                  <div>
                    <h3 className="font-semibold">{post.club}</h3>
                    <p className="text-gray-500 text-sm">{post.location}</p>
                  </div>
                </div>
                <button className="text-gray-500 hover:text-gray-700">
                  <EllipsisHorizontalIcon className="h-6 w-6" />
                </button>
              </div>

              {/* Event Image */}
              <div className="relative">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-64 object-cover"
                  onDoubleClick={() => handleLike(post._id)}
                />
                <button
                  onClick={() => handleLike(post._id)}
                  className="absolute bottom-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                >
                  {likedPosts[post._id] ? (
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
                      <span>{post.likeCount || 0}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <ChatBubbleOvalLeftIcon className="h-5 w-5" />
                      <span>{post.comments?.length || 0}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <ShareIcon className="h-5 w-5" />
                      <span>{post.shares || 0}</span>
                    </span>
                  </div>
                  <span className="flex items-center space-x-1">
                    <CurrencyDollarIcon className="h-5 w-5" />
                    <span>{post.entry === 'paid' ? 'Paid' : 'Free'}</span>
                  </span>
                </div>

                <h2 className="font-bold text-lg">{post.title}</h2>
                <p className="text-gray-600">{post.description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default TrendingPage;
