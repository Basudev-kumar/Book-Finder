import { useState, useEffect, useCallback } from "react";
import { searchBooks } from "../utils/api";

export const useBookSearch = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchHistory, setSearchHistory] = useState(() => {
    const saved = localStorage.getItem("searchHistory");
    return saved ? JSON.parse(saved) : [];
  });

  const search = useCallback(
    async (query, searchType, page = 1) => {
      if (!query.trim()) {
        setBooks([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await searchBooks(query, searchType, page);
        setBooks(data.docs || []);
        setTotalResults(data.numFound || 0);
        setCurrentPage(page);

        // Update search history
        const newHistory = [
          { query, searchType, timestamp: new Date().toISOString() },
          ...searchHistory.filter((h) => h.query !== query).slice(0, 9),
        ];
        setSearchHistory(newHistory);
        localStorage.setItem("searchHistory", JSON.stringify(newHistory));
      } catch (err) {
        setError(err.message);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    },
    [searchHistory]
  );

  return {
    books,
    loading,
    error,
    totalResults,
    currentPage,
    searchHistory,
    search,
    clearHistory: () => {
      setSearchHistory([]);
      localStorage.removeItem("searchHistory");
    },
  };
};
