import { FaEnvelope, FaMapMarkerAlt, FaCalendar, FaUser } from "react-icons/fa";
import { motion } from "framer-motion";

const BasicInfo = ({ user }) => {
  return (
    <motion.div 
      className="bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-700 text-white"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <FaEnvelope className="text-gray-400 hover:text-indigo-400 transition duration-300" />
          <span>{user.email}</span>
        </div>
        <div className="flex items-center space-x-4">
          <FaMapMarkerAlt className="text-gray-400 hover:text-indigo-400 transition duration-300" />
          <span>{user.location}</span>
        </div>
        <div className="flex items-center space-x-4">
          <FaCalendar className="text-gray-400 hover:text-indigo-400 transition duration-300" />
          <span>Member since {user.joinedDate}</span>
        </div>
        <div className="flex items-center space-x-4">
          <FaUser className="text-gray-400 hover:text-indigo-400 transition duration-300" />
          <span>{user.role}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default BasicInfo;
