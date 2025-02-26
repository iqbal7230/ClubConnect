// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import PrivateRoute from './components/PrivateRoute';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import './App.css';
import ProfilePage from './pages/ProfilePage';
import ChatRoom from './pages/ChatRoom';
// import ProfilePage from './pages/ProfilePage';


import UserProfile from "./pages/UserProfile";

const user = {
  name: "John Doe",
  tagline: "Tech Enthusiast | Traveler",
  profilePicture: "https://via.placeholder.com/150",
  coverPhoto: "https://via.placeholder.com/1200x300",
  socialMedia: {
    twitter: "#",
    linkedin: "#",
    instagram: "#",
  },
  email: "john.doe@example.com",
  location: "New York, USA",
  joinedDate: "March 2023",
  role: "Student",
  bio: "Passionate about technology and design. Love traveling and exploring new cultures.",
  interests: ["Photography", "Coding", "Traveling"],
  skills: ["JavaScript", "React", "UI/UX Design"],
  eventsAttended: 12,
  posts: 45,
  badges: ["Top Contributor", "Event Organizer"],
};
import EventForm from './pages/EventForm';
import LandingPost from './pages/LandingPost';
// import ChatRoom from './pages/ChatRoom';


function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage/>} />
          {/* <Route path="/profile/:id" element={<ProfilePage />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chat" element={<ChatRoom/>} />
         
          
          <Route path="/profile" element={<UserProfile user={user} />} />
          {/* need to set route of chat */}
          

          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/event" element={<EventForm/>} />

          <Route path="/landingpost" element={<LandingPost/>} />
          {/* need to set route of chat */}
          


          {/* Private routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* Redirects */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </Router>
    
    
  );
}

export default App;