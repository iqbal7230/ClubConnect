import { useState } from "react";

const SearchEvents = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query); // Pass the search query to the parent component
  };

  return (
    <div className="relative flex items-center max-w-lg mx-auto bg-gray-800 p-3 rounded-full shadow-md w-90">
      <input
        type="text"
        placeholder="Search events by venue, entry..."
        value={searchQuery}
        onChange={handleSearch}
        className="w-full bg-transparent text-white text-lg px-5 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <button className="absolute right-2 bg-indigo-500 hover:bg-indigo-600 text-white p-3 rounded-full transition-all">
        🔍
      </button>
    </div>
  );
};

export default SearchEvents;
