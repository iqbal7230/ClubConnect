import { useState } from 'react'; // Import useState


const SearchEvents = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');
  
    const handleSearch = (e) => {
      const query = e.target.value;
      setSearchQuery(query);
      onSearch(query); // Pass the search query to the parent component
    };
  
    return (
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search events by venue, entry..."
          value={searchQuery}
          onChange={handleSearch}
          className="px-4 py-2 w-64 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
    );
  };
  
  export default SearchEvents;