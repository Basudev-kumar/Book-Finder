import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import BookList from "./components/BookList";
import FilterPanel from "./components/FilterPanel";
import LoadingSpinner from "./components/LoadingSpinner";
import { useBookSearch } from "./hooks/useBookSearch";
import "./App.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("title");
  const [sortBy, setSortBy] = useState("relevance");

  const {
    books,
    loading,
    error,
    totalResults,
    currentPage,
    searchHistory,
    search,
    clearHistory,
  } = useBookSearch();

  const handleSearch = (query, type) => {
    setSearchQuery(query);
    setSearchType(type);
    search(query, type);
  };

  const handlePageChange = (page) => {
    search(searchQuery, searchType, page);
  };

  const sortedBooks = [...books].sort((a, b) => {
    switch (sortBy) {
      case "year":
        return (b.first_publish_year || 0) - (a.first_publish_year || 0);
      case "title":
        return (a.title || "").localeCompare(b.title || "");
      default:
        return 0;
    }
  });

  return (
    <div className="app">
      <header className="app-header">
        <h1>Book Finder for Alex</h1>
        {/* <p>Find your next great read!</p> */}
      </header>

      <main className="app-main">
        <SearchBar
          onSearch={handleSearch}
          searchHistory={searchHistory}
          onClearHistory={clearHistory}
        />

        {books.length > 0 && (
          <FilterPanel
            sortBy={sortBy}
            onSortChange={setSortBy}
            totalResults={totalResults}
          />
        )}

        {loading && <LoadingSpinner />}

        {error && (
          <div className="error-message">
            <p>😕 Oops! Something went wrong: {error}</p>
            <p>Please try again.</p>
          </div>
        )}

        {!loading && !error && books.length === 0 && searchQuery && (
          <div className="empty-state">
            <p>No books found for "{searchQuery}"</p>
            <p>Try different keywords or search type.</p>
          </div>
        )}

        {!loading && books.length > 0 && (
          <BookList
            books={sortedBooks}
            currentPage={currentPage}
            totalResults={totalResults}
            onPageChange={handlePageChange}
          />
        )}
      </main>
    </div>
  );
}

export default App;
