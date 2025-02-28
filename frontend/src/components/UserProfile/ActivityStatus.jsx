import { motion } from 'framer-motion';

const ActivityStats = ({ user }) => {
  return (
    <motion.div 
      className="bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-700 text-white"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold mb-4 text-indigo-400">Activity</h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold text-lg text-indigo-300">Events Attended</h3>
          <p className="text-3xl font-bold">{user.eventsAttended}</p>
        </div>
        <div>
          <h3 className="font-semibold text-lg text-indigo-300">Posts</h3>
          <p className="text-3xl font-bold">{user.posts}</p>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold text-lg text-indigo-300">Badges</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {user.badges.map((badge, index) => (
            <motion.span 
              key={index} 
              className="bg-yellow-400 px-3 py-1 rounded-full text-sm text-black shadow-md hover:bg-yellow-500 transition"
              whileHover={{ scale: 1.1 }}
            >
              {badge}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ActivityStats;
