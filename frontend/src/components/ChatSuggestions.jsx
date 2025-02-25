const ChatSuggestions = ({ onSelect }) => {
    const suggestions = [
      "How to create a budget for a campus event?",
      "Best ways to promote a university club event?",
      "What's a good timeline for planning a workshop?",
      "How to handle event registrations efficiently?",
      "Tips for engaging students during events?",
      "What safety measures should we consider?",
    ];
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
        {suggestions.map((text) => (
          <button
            key={text}
            onClick={() => onSelect(text)}
            className="p-2 text-sm text-left bg-white border rounded-lg hover:bg-blue-50 transition-colors text-blue-800"
          >
            {text}
          </button>
        ))}
      </div>
    );
  };
  
  export default ChatSuggestions;