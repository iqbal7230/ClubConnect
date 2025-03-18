// src/pages/LandingPage.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { useState } from 'react';
import { HeartIcon, ChatBubbleOvalLeftIcon, BookmarkIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline';

const LandingPage = () => {
    const { currentUser, logout } = useAuth();

    // Mock data - replace with API data
    const [events] = useState([
        {
            id: 1,
            title: "Tech Symposium 2024",
            date: "2024-03-15",
            description: "Join us for the biggest tech event of the year! 🚀 Featuring industry leaders, workshops, and networking opportunities. #Tech2024",
            image: "https://d2rvgzn8c26h0v.cloudfront.net/new-year-eve-kochi-ignite-241703145773518.webp",
            club: "Tech Club",
            profileImage: "https://source.unsplash.com/random/100x100/?logo,tech",
            likes: 234,
            comments: 56,
            location: "University Auditorium"
        },
        {
            id: 2,
            title: "Cultural Fest",
            date: "2024-03-20",
            description: "Experience a vibrant celebration of diversity with food, music, and performances from around the world! 🌍🎉",
            image: "https://source.unsplash.com/random/600x600/?festival,culture",
            club: "Cultural Society",
            profileImage: "https://source.unsplash.com/random/100x100/?logo,culture",
            likes: 189,
            comments: 42,
            location: "Main Campus Grounds"
        },
    ]);
   
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation Bar */}
            <nav className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <Link to="/" className="text-2xl font-bold text-gray-900">
                            CampusConnect
                        </Link>
                        <div className="flex items-center space-x-4">
                            {currentUser ? (
                                <button
                                    onClick={logout}
                                    className="px-4 py-2 text-gray-700 hover:text-indigo-600"
                                >
                                    Logout
                                </button>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className="px-4 py-2 text-gray-700 hover:text-indigo-600"
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                    >
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
                <div className="flex flex-col gap-8">
                    {events.map((event) => (
                        <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            {/* Post Header */}
                            <div className="flex items-center justify-between p-4 border-b">
                                <div className="flex items-center space-x-3">
                                    <img
                                        src={event.profileImage}
                                        alt={event.club}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <div>
                                        <h3 className="font-semibold">{event.club}</h3>
                                        <p className="text-gray-500 text-sm">{event.location}</p>
                                    </div>
                                </div>
                                <button className="text-gray-500 hover:text-gray-700">
                                    <EllipsisHorizontalIcon className="h-6 w-6" />
                                </button>
                            </div>

                            {/* Event Image */}
                            <img
                                src={event.image}
                                alt={event.title}
                                className="w-full object-cover"
                            />

                            {/* Interaction Buttons */}
                            <div className="p-4 space-y-2">
                                <div className="flex items-center space-x-4">
                                    <button className="text-gray-700 hover:text-red-500">
                                        <HeartIcon className="h-7 w-7" />
                                    </button>
                                    <button className="text-gray-700 hover:text-blue-500">
                                        <ChatBubbleOvalLeftIcon className="h-7 w-7" />
                                    </button>
                                    <button className="text-gray-700 hover:text-gray-900 ml-auto">
                                        <BookmarkIcon className="h-7 w-7" /> Add to Calendar
                                    </button>
                                </div>

                                {/* Likes Count */}
                                <p className="font-semibold">{event.likes.toLocaleString()} likes</p>

                                {/* Event Description */}
                                <div className="space-y-1">
                                    <p>
                                        <span className="font-semibold">{event.club}</span>{" "}
                                        <span className="text-gray-600">{event.description}</span>
                                    </p>
                                    <p className="text-gray-500 text-sm">
                                        {new Date(event.date).toLocaleDateString('en-US', {
                                            weekday: 'short',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>

                                {/* View Details Button */}
                                <button className="text-gray-500 text-sm hover:text-indigo-600">
                                    View details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default LandingPage;
