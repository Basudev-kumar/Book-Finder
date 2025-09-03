const BASE_URL = "https://openlibrary.org";

export const searchBooks = async (
  query,
  searchType = "title",
  page = 1,
  limit = 20
) => {
  try {
    const offset = (page - 1) * limit;
    let url = `${BASE_URL}/search.json?`;

    switch (searchType) {
      case "title":
        url += `title=${encodeURIComponent(query)}`;
        break;
      case "author":
        url += `author=${encodeURIComponent(query)}`;
        break;
      case "isbn":
        url += `isbn=${encodeURIComponent(query)}`;
        break;
      case "subject":
        url += `subject=${encodeURIComponent(query)}`;
        break;
      case "all":
        url += `q=${encodeURIComponent(query)}`;
        break;
      default:
        url += `title=${encodeURIComponent(query)}`;
    }

    url += `&limit=${limit}&offset=${offset}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch books");

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

export const getCoverUrl = (coverId, size = "M") => {
  if (!coverId) return null;
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
};
