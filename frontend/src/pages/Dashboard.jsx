import { useAuth } from '../context/authcontext';

export default function Dashboard() {
  const { currentUser, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      <nav className="bg-gray-950 shadow-lg border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-wide text-blue-400">Club Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-300">Welcome, {currentUser?.name}</span>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-300">Your Clubs</h2>
          <p className="text-gray-400">Manage and explore your clubs from here.</p>
          {/* Add club management content here */}
        </div>
      </div>
    </div>
  );
}
