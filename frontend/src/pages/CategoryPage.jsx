import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import BookCard from "../components/BookCard.jsx";
import Loader from "../components/Loader.jsx";
import api from "../api/axiosInstance.js";

export const CategoryPage = () => {
  const { categoryName } = useParams();
  const [allBooks, setAllBooks] = useState([]);
  const [averageRatings, setAverageRatings] = useState({});
  const [loading, setLoading] = useState(true);

  const normalizedCategory = categoryName?.toLowerCase().replace(/\s+/g, "-");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [booksRes, ratingsRes] = await Promise.all([
          api.get("/api/v1/books/get-books"),
          api.get("/api/v1/rating"),
        ]);
        setAllBooks(booksRes.data.data);

        const ratings = {};
        ratingsRes.data.data.forEach((r) => {
          ratings[r.bookId] = r.averageRating;
        });
        setAverageRatings(ratings);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryName]);

  const filteredBooks = allBooks
    .filter((book) => {
      const bookCategory = book.category?.toLowerCase().replace(/\s+/g, "-");
      return bookCategory === normalizedCategory;
    })
    .map((b, index) => ({
      ...b,
      id: b._id || index,
      title: b.bookname || "Untitled",
      author: b.author || "Unknown",
      image: b.bookImage,
      rating: averageRatings[b._id] || 0,
      price: b.price || 0,
      originalPrice: b.originalPrice || null,
      description: b.description || "",
    }));

  return (
    <div className="p-6">
      <h1 className="font-gothic text-3xl font-bold mb-6 capitalize">
        {normalizedCategory.replace(/-/g, " ")}
      </h1>

      {loading ? (
        <div className="flex justify-center py-10">
          <Loader />
        </div>
      ) : filteredBooks.length === 0 ? (
        <p className="font-parastoo text-lg text-gray-500">
          No books found in this category.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} rating={book.rating} />
          ))}
        </div>
      )}
    </div>
  );
};