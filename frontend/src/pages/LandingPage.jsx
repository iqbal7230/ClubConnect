import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { useState } from 'react';
import { HeartIcon, ChatBubbleOvalLeftIcon, ShareIcon, CurrencyDollarIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
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
  ]);

  const [filteredPosts, setFilteredPosts] = useState(allPosts);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <nav className="bg-black/30 backdrop-blur-md shadow-lg sticky top-0 z-50 p-4 flex justify-between items-center">
        <Link to="/" className="text-3xl font-extrabold text-indigo-400 drop-shadow-md">
          CampusConnect
        </Link>
        <SearchEvents onSearch={() => {}} />
        <div>
          {currentUser ? (
            <button onClick={logout} className="px-4 py-2 text-indigo-400 hover:text-white transition-all duration-300">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 text-indigo-400 hover:text-white transition-all duration-300">
                Sign In
              </Link>
              <Link to="/register" className="px-4 py-2 ml-4 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-8">
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-black/30 p-6 rounded-xl shadow-xl backdrop-blur-md transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-between border-b border-gray-700 pb-3">
                <div className="flex items-center space-x-3">
                  <img src={post.profileImage} alt={post.club} className="w-12 h-12 rounded-full border-2 border-indigo-400" />
                  <div>
                    <h3 className="font-semibold text-lg text-indigo-300">{post.club}</h3>
                    <p className="text-gray-400 text-sm">{post.location}</p>
                  </div>
                </div>
                <button className="text-gray-500 hover:text-white">
                  <EllipsisHorizontalIcon className="h-6 w-6" />
                </button>
              </div>

              <img src={post.image} alt={post.title} className="w-full h-64 object-cover rounded-lg mt-4 shadow-lg" />
              
              <div className="flex items-center justify-between mt-4">
                <button className="flex items-center space-x-2 text-gray-400 hover:text-red-400 transition-all">
                  <HeartIcon className="h-6 w-6" />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-all">
                  <ChatBubbleOvalLeftIcon className="h-6 w-6" />
                  <span>{post.comments.length}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-400 hover:text-green-400 transition-all">
                  <ShareIcon className="h-6 w-6" />
                  <span>{post.shares}</span>
                </button>
                <Link to={`/profile/${post.id}`} className="flex items-center space-x-2 text-gray-400 hover:text-purple-400 transition-all">
                  <CurrencyDollarIcon className="h-6 w-6" />
                  <span>{post.sponsors}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default LandingPage;