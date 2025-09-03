import React from "react";

const FilterPanel = ({ sortBy, onSortChange, totalResults }) => {
  return (
    <div className="filter-panel">
      <div className="results-count">
        Found {totalResults.toLocaleString()} books
      </div>
      <div className="sort-controls">
        <label htmlFor="sort-select">Sort by:</label>
        <select
          id="sort-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="sort-select"
        >
          <option value="relevance">Relevance</option>
          <option value="year">Year (Newest First)</option>
          <option value="title">Title (A-Z)</option>
        </select>
      </div>
    </div>
  );
};

export default FilterPanel;
