import { FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Header = ({ user = {} }) => {
  return (
    <div className="relative bg-gray-900 rounded-lg overflow-hidden shadow-lg">
      {/* Cover Photo */}
      <img
        // src=user.coverPhoto
          src="https://images.pexels.com/photos/30792466/pexels-photo-30792466/free-photo-of-dramatic-seattle-skyline-under-stormy-skies.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
        alt="Cover"
        loading="lazy"
        className="w-full h-48 object-cover opacity-80"
      />

      {/* Profile Section (Profile Pic + Name + Tagline) */}
      <div className="absolute bottom-0 left-0 flex items-center space-x-6 bg-gray-900 bg-opacity-80 p-4 pr-8 rounded-tr-lg">
        {/* Profile Picture */}
        <img
          // src=user.profilePicture
           src= "https://images.pexels.com/photos/30472379/pexels-photo-30472379/free-photo-of-sophisticated-male-fashion-portrait-in-london-studio.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load"
          alt="Profile"
          loading="lazy"
          className="w-24 h-24 rounded-full border-4 border-gray-700 shadow-lg transition-transform duration-300 hover:scale-105"
        />

        {/* Name and Tagline */}
        <div className="text-white">
          <h1 className="text-xl md:text-2xl font-bold">{user.name || "John Doe"}</h1>
          <p className="text-gray-400 text-sm md:text-base">{user.tagline || "Web Developer | Tech Enthusiast"}</p>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="absolute top-4 right-4 flex space-x-4">
        <a href={user.socialMedia?.twitter || "#"} target="_blank" rel="noopener noreferrer"
          className="text-gray-400 hover:text-blue-400 hover:scale-110 transition duration-300">
          <FaTwitter size={24} />
        </a>
        <a href={user.socialMedia?.linkedin || "#"} target="_blank" rel="noopener noreferrer"
          className="text-gray-400 hover:text-blue-500 hover:scale-110 transition duration-300">
          <FaLinkedin size={24} />
        </a>
        <a href={user.socialMedia?.instagram || "#"} target="_blank" rel="noopener noreferrer"
          className="text-gray-400 hover:text-pink-500 hover:scale-110 transition duration-300">
          <FaInstagram size={24} />
        </a>
      </div>
    </div>
  );
};

export default Header;
