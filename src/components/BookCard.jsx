import React, { useState } from "react";
import { getCoverUrl } from "../utils/api";

const BookCard = ({ book }) => {
  const [imageError, setImageError] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const coverUrl = getCoverUrl(book.cover_i);
  const authors = book.author_name?.join(", ") || "Unknown Author";
  const publishYear = book.first_publish_year || "N/A";

  return (
    <>
      <div className="book-card" onClick={() => setShowDetails(true)}>
        <div className="book-cover">
          {!imageError && coverUrl ? (
            <img
              src={coverUrl}
              alt={`Cover of ${book.title}`}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="book-cover-placeholder">
              <span>📖</span>
            </div>
          )}
        </div>

        <div className="book-info">
          <h3 className="book-title">{book.title}</h3>
          <p className="book-author">{authors}</p>
          <p className="book-year">Published: {publishYear}</p>
          {book.isbn && book.isbn[0] && (
            <p className="book-isbn">ISBN: {book.isbn[0]}</p>
          )}
        </div>
      </div>

      {showDetails && (
        <div className="modal-overlay" onClick={() => setShowDetails(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setShowDetails(false)}
            >
              ×
            </button>
            <div className="modal-body">
              <div className="modal-cover">
                {!imageError && coverUrl ? (
                  <img src={getCoverUrl(book.cover_i, "L")} alt={book.title} />
                ) : (
                  <div className="book-cover-placeholder large">
                    <span>📖</span>
                  </div>
                )}
              </div>
              <div className="modal-details">
                <h2>{book.title}</h2>
                <p>
                  <strong>Author(s):</strong> {authors}
                </p>
                <p>
                  <strong>First Published:</strong> {publishYear}
                </p>
                {book.publisher && (
                  <p>
                    <strong>Publisher(s):</strong>{" "}
                    {book.publisher.slice(0, 3).join(", ")}
                  </p>
                )}
                {book.subject && (
                  <div className="book-subjects">
                    <strong>Subjects:</strong>
                    <div className="subject-tags">
                      {book.subject.slice(0, 5).map((subject, index) => (
                        <span key={index} className="subject-tag">
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {book.isbn && (
                  <p>
                    <strong>ISBN:</strong> {book.isbn[0]}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookCard;
