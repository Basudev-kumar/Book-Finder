import React, { useState, useRef, useEffect } from "react";

const SearchBar = ({ onSearch, searchHistory, onClearHistory }) => {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("title");
  const [showHistory, setShowHistory] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowHistory(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query, searchType);
      setShowHistory(false);
    }
  };

  const handleHistoryClick = (item) => {
    setQuery(item.query);
    setSearchType(item.searchType);
    onSearch(item.query, item.searchType);
    setShowHistory(false);
  };

  return (
    <div className="search-container" ref={searchRef}>
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-type-selector">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="search-type-dropdown"
          >
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="isbn">ISBN</option>
            <option value="subject">Subject</option>
            <option value="all">All Fields</option>
          </select>
        </div>

        <div className="search-input-wrapper">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowHistory(true)}
            placeholder={`Search by ${searchType}...`}
            className="search-input"
            aria-label="Search books"
          />

          {showHistory && searchHistory.length > 0 && (
            <div className="search-history">
              <div className="history-header">
                <span>Recent Searches</span>
                <button
                  type="button"
                  onClick={onClearHistory}
                  className="clear-history-btn"
                >
                  Clear
                </button>
              </div>
              {searchHistory.map((item, index) => (
                <div
                  key={index}
                  className="history-item"
                  onClick={() => handleHistoryClick(item)}
                >
                  <span className="history-query">{item.query}</span>
                  <span className="history-type">{item.searchType}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <button type="submit" className="search-button">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
