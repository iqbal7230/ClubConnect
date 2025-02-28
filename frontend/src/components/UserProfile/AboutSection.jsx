import { motion } from 'framer-motion';

const AboutSection = ({ user }) => {
  return (
    <motion.div 
      className="bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-700 text-white"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold mb-4 text-indigo-400">About</h2>
      <p className="text-gray-300 mb-4">{user.bio}</p>

      <div className="space-y-2">
        <h3 className="font-semibold text-lg text-indigo-300">Interests</h3>
        <div className="flex flex-wrap gap-2">
          {user.interests.map((interest, index) => (
            <span 
              key={index} 
              className="bg-indigo-600 px-3 py-1 rounded-full text-sm text-white shadow-md hover:bg-indigo-700 transition"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-2 mt-4">
        <h3 className="font-semibold text-lg text-indigo-300">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {user.skills.map((skill, index) => (
            <span 
              key={index} 
              className="bg-purple-600 px-3 py-1 rounded-full text-sm text-white shadow-md hover:bg-purple-700 transition"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AboutSection;
