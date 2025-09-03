import React from "react";
import BookCard from "./BookCard";

const BookList = ({ books, currentPage, totalResults, onPageChange }) => {
  const booksPerPage = 20;
  const totalPages = Math.ceil(totalResults / booksPerPage);
  const maxPageButtons = 5;

  const getPageNumbers = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <>
      <div className="book-grid">
        {books.map((book, index) => (
          <BookCard key={`${book.key}-${index}`} book={book} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {currentPage > 3 && (
            <>
              <button onClick={() => onPageChange(1)}>1</button>
              <span>...</span>
            </>
          )}

          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={currentPage === page ? "active" : ""}
            >
              {page}
            </button>
          ))}

          {currentPage < totalPages - 2 && (
            <>
              <span>...</span>
              <button onClick={() => onPageChange(totalPages)}>
                {totalPages}
              </button>
            </>
          )}

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default BookList;
