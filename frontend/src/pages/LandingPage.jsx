import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { useState } from 'react';
import { HeartIcon, ChatBubbleOvalLeftIcon, ShareIcon, CurrencyDollarIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import SearchEvents from '../components/SearchEvents';

const LandingPage = () => {
  const { currentUser, logout } = useAuth();

  const [allPosts, setAllPosts] = useState([
    {
      id: 1,
      title: 'Tech Symposium 2024',
      description: 'Join us for the biggest tech event of the year! 🚀',
      image: 'https://d2rvgzn8c26h0v.cloudfront.net/new-year-eve-kochi-ignite-241703145773518.webp',
      club: 'Tech Club',
      profileImage: 'https://images.pexels.com/photos/30763767/pexels-photo-30763767/free-photo-of-thoughtful-young-man-in-dramatic-lighting.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load',
      likes: 234,
      comments: [],
      shares: 12,
      sponsors: 8,
      location: 'University Auditorium',
      entry: 'paid',
      performer: 'John Doe',
    },
    {
      id: 2,
      title: 'Cultural Fest',
      description: 'Experience a vibrant celebration of diversity with food, music, and performances from around the world! 🌍🎉',
      image: 'https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg?auto=compress&cs=tinysrgb&w=300',
      club: 'Cultural Society',
      profileImage: 'https://images.pexels.com/photos/30246594/pexels-photo-30246594/free-photo-of-elegant-woman-in-red-dress-by-ornate-doorway.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load',
      likes: 189,
      comments: [],
      shares: 9,
      sponsors: 5,
      location: 'Main Campus Grounds',
      entry: 'free',
      performer: 'Jane Smith',
    },
  ]);

  const [filteredPosts, setFilteredPosts] = useState(allPosts);

  const handleReaction = (postId, type) => {
    setFilteredPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          if (type === "comments") return post;
          return { ...post, [type]: post[type] + 1 };
        }
        return post;
      })
    );
  };

  const handleSearch = (query) => {
    const filtered = allPosts.filter((post) => {
      const matchesVenue = post.location.toLowerCase().includes(query.toLowerCase());
      const matchesEntryType = post.entry.toLowerCase().includes(query.toLowerCase());
      return matchesVenue || matchesEntryType;
    });
    setFilteredPosts(filtered);
  };

  return (
    <div className="min-h-screen bg-black text-white relative">
      <nav className="bg-gray-900 shadow-lg sticky top-0 z-50 py-4 px-6 flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold text-white">CampusConnect</Link>
        <SearchEvents onSearch={handleSearch} />
        <div className="flex items-center space-x-4">
          {currentUser ? (
            <button onClick={logout} className="px-4 py-2 text-gray-300 hover:text-indigo-400 transition">Logout</button>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 text-gray-300 hover:text-indigo-400 transition">Sign In</Link>
              <Link to="/register" className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition transform hover:scale-105">Sign Up</Link>
            </>
          )}
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-gray-900 rounded-lg shadow-lg overflow-hidden transition transform hover:scale-105 hover:shadow-xl border border-gray-700">
              <div className="p-4 flex items-center justify-between border-b border-gray-700">
                <div className="flex items-center space-x-3">
                  <Link to={`/profile/${post.id}`}>
                    <img src={post.profileImage} alt={post.club} className="w-12 h-12 rounded-full object-cover border border-gray-600" />
                  </Link>
                  <div>
                    <h3 className="font-semibold text-lg">{post.club}</h3>
                    <p className="text-gray-400 text-sm">{post.location}</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-white transition">
                  <EllipsisHorizontalIcon className="h-6 w-6" />
                </button>
              </div>
              <img src={post.image} alt={post.title} className="w-full h-64 object-cover" />
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <button onClick={() => handleReaction(post.id, 'likes')} className="flex items-center space-x-2 text-gray-400 hover:text-red-400 transition">
                    <HeartIcon className="h-6 w-6" />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition">
                    <ChatBubbleOvalLeftIcon className="h-6 w-6" />
                    <span>{post.comments.length}</span>
                  </button>
                  <button onClick={() => handleReaction(post.id, 'shares')} className="flex items-center space-x-2 text-gray-400 hover:text-green-400 transition">
                    <ShareIcon className="h-6 w-6" />
                    <span>{post.shares}</span>
                  </button>
                  <Link to={`/profile/${post.id}`} className="flex items-center space-x-2 text-gray-400 hover:text-purple-400 transition">
                    <CurrencyDollarIcon className="h-6 w-6" />
                    <span>{post.sponsors}</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default LandingPage;