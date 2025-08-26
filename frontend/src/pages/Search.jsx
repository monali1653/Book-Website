import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/axiosInstance.js";
import BookCard from "../components/BookCard.jsx";

const SearchResults = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get("q");
  const [books, setBooks] = useState([]);
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    const fetchBooksAndRatings = async () => {
      try {
        const res = await api.get(`/api/v1/books/search?query=${query}`);
        const fetchedBooks = res.data?.data || [];
        setBooks(fetchedBooks);

        const ratingRes = await api.get(`/api/v1/rating`);
        const ratingData = ratingRes.data?.data || [];

        const ratingMap = {};
        ratingData.forEach((r) => {
          ratingMap[r.bookId] = {
            averageRating: r.averageRating,
            totalRatings: r.totalRatings,
          };
        });

        setRatings(ratingMap);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchBooksAndRatings();
  }, [query]);

  return (
    <div className="p-6">
      <h1 className="font-gothic text-3xl font-bold mb-6">
        Search Results for "{query}"
      </h1>

      {books.length === 0 ? (
        <p className="text-gray-500 font-parastoo text-xl">No books found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {books.map((book) => (
            <BookCard
              key={book._id}
              book={{
                id: book._id,
                title: book.bookname,
                author: book.author,
                price: book.price,
                count: book.count,
                description: book.description,
                image: book.bookImage || "/images/placeholder.jpg",
              }}
              rating={ratings[book._id]?.averageRating || 0}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;