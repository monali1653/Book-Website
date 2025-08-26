import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { HiOutlineSearch, HiOutlineX, HiOutlineMenu } from "react-icons/hi";
import Cookies from "js-cookie";
import { Menubar } from "./Menubar";
import api from "../api/axiosInstance.js";

export function Navbar({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();
  const location = useLocation();
  const desktopSearchRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) return setUser(null);
    api
      .get("/api/v1/users/myprofile")
      .then((res) => setUser(res.data.data))
      .catch((err) => console.error("Fetch user failed:", err));
  }, [isAuthenticated]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    setQuery("");
    setSuggestions([]);
  }, [location.pathname, location.search]);

  const handleLogout = async () => {
    try {
      await api.post("/api/v1/users/logout", {});
      Cookies.remove("token");
      setIsAuthenticated(false);
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const handleSearchChange = async (e) => {
    const val = e.target.value;
    setQuery(val);
    if (val.trim() === "") return setSuggestions([]);
    try {
      const res = await api.get(`/api/v1/books/search?query=${val}`);
      setSuggestions(res.data.data || []);
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  const handleSearchEnter = (e) => {
    if (e.key === "Enter" && query.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setSuggestions([]);
      setMobileSearchOpen(false);
    }
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        desktopSearchRef.current &&
        !desktopSearchRef.current.contains(e.target)
      ) {
        setSuggestions([]);
      }
      if (
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(e.target)
      ) {
        setMobileSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white/30 backdrop-blur-md text-black p-4 font-sans relative z-50">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <button
            className="md:hidden text-2xl mr-4 z-50 relative"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <HiOutlineX className="h-5 w-5" />
            ) : (
              <HiOutlineMenu className="h-5 w-5" />
            )}
          </button>
          <img src="/images/bookcart.png" alt="Logo" className="h-6 sm:h-10" />
          <h1 className="font-adobe text-md sm:text-3xl font-bold">
            BOOK CART
          </h1>
        </div>

        <div className="hidden md:flex gap-6 items-center font-gothic">
          <Link to="/">HOME</Link>
          <Link to="/books">BOOKS</Link>
          <Link to="/sell">SELL</Link>
        </div>

        <div className="flex items-center gap-4 relative">
          {/* Desktop Search */}
          {isAuthenticated && (
            <div
              ref={desktopSearchRef}
              className="hidden md:flex flex-col relative"
            >
              <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                <HiOutlineSearch className="w-6 h-6 text-black" />
                <input
                  type="text"
                  value={query}
                  onChange={handleSearchChange}
                  onKeyDown={handleSearchEnter}
                  placeholder="Search for books..."
                  className="bg-gray-100 ml-2 outline-none text-lg"
                />
              </div>
              {suggestions.length > 0 && (
                <ul className="absolute top-12 bg-white w-full border shadow z-50 rounded">
                  {suggestions.map((book) => (
                    <li
                      key={book._id}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onMouseDown={(e) => {
                        e.preventDefault(); // Prevent blur
                        navigate(
                          `/search?q=${encodeURIComponent(book.bookname)}`
                        );
                        setQuery("");
                        setSuggestions([]);
                      }}
                    >
                      <img
                        src={book.bookImage}
                        alt={book.bookname}
                        className="w-10 h-14 object-cover rounded"
                      />
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-800">
                          {book.bookname}
                        </span>
                        <span className="text-sm text-gray-500">
                          {book.author}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Mobile Search */}
          {isAuthenticated && (
            <div ref={mobileSearchRef} className="md:hidden">
              <button onClick={() => setMobileSearchOpen(true)}>
                <HiOutlineSearch className="mt-1 w-5 h-5 text-black" />
              </button>
              {mobileSearchOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-white z-50 p-4">
                  <div className="flex items-center mb-4">
                    <input
                      autoFocus
                      type="text"
                      value={query}
                      onChange={handleSearchChange}
                      onKeyDown={handleSearchEnter}
                      className="flex-1 p-2 border border-gray-300 rounded"
                      placeholder="Search books..."
                    />
                    <button
                      className="ml-2 text-black text-2xl"
                      onClick={() => setMobileSearchOpen(false)}
                    >
                      <HiOutlineX />
                    </button>
                  </div>
                  {suggestions.length > 0 && (
                    <ul className="absolute bg-white w-full border shadow z-50 rounded mt-1">
                      {suggestions.map((book) => (
                        <li
                          key={book._id}
                          className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            navigate(
                              `/search?q=${encodeURIComponent(book.bookname)}`
                            );
                            setQuery("");
                            setSuggestions([]);
                            setMobileSearchOpen(false);
                          }}
                        >
                          <img
                            src={book.bookImage}
                            alt={book.bookname}
                            className="w-10 h-14 object-cover rounded"
                          />
                          <div className="flex flex-col">
                            <span className="font-semibold text-gray-800">
                              {book.bookname}
                            </span>
                            <span className="text-sm text-gray-500">
                              {book.author}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          )}

          {isAuthenticated ? (
            <Menubar onLogout={handleLogout} user={user} />
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-1 md:gap-2 border-2 border-black px-2 sm:px-4 py-1 sm:py-2 rounded-full font-bold text-xs sm:text-sm hover:bg-gray-200"
            >
              <span>Log In</span> <FaUser className="text-sm sm:text-base" />
            </button>
          )}
        </div>
      </div>

      <div
        className={`fixed top-0 left-0 h-screen w-2/5 max-w-[240px] bg-yellow-50 transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="pt-16 px-6 font-gothic">
          <Link
            to="/"
            className="block py-3 border-b"
            onClick={() => setMobileMenuOpen(false)}
          >
            HOME
          </Link>
          <Link
            to="/books"
            className="block py-3 border-b"
            onClick={() => setMobileMenuOpen(false)}
          >
            BOOKS
          </Link>
          <Link
            to="/sell"
            className="block py-3 border-b"
            onClick={() => setMobileMenuOpen(false)}
          >
            SELL
          </Link>
        </div>
      </div>
    </nav>
  );
}