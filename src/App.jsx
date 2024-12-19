// Import necessary libraries
import React, { useState } from "react";
import "tailwindcss/tailwind.css";

const App = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Change this to simulate login state
  const [showRegister, setShowRegister] = useState(false);

  const [bestSellersIndex, setBestSellersIndex] = useState(0);
  const [dealsIndex, setDealsIndex] = useState(0);

  

 
 

  const categories = [
    {
      id: 1,
      name: "Young and Teen",
      image: "/images/yt.png",
    },
    {
      id: 2,
      name: "Fiction",
      image: "/images/fiction.png",
    },
    {
      id: 3,
      name: "Romantic",
      image: "/images/romm.png",
    },
    {
      id: 4,
      name: "Cooking",
      image: "/images/cook.png",
    },
  ];

  return (
    <div className="font-sans">
      {/* Navbar */}
      <nav className="bg-orange-50 text-black p-4 flex justify-between items-center">
        <div className="flex items-center">
          <button
            className="text-2xl md:hidden mr-4"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            &#9776;
          </button>
          <img src="/images/bookcart.png" alt="Logo" className="h-10" />
          <h1 className="ml-3 text-xl font-bold">BOOK CART</h1>
        </div>
        <div
          className={`md:flex gap-6 items-center ${isMobileMenuOpen ? "flex flex-col bg-lime-800 w-full absolute top-14 left-0" : "hidden"}`}
        >
          <a href="#home" className="block px-4 py-2 font-semibold hover:bg-slate-200 hover:text-orange-500">HOME</a>
          <div className="relative group">
            <span className="block px-4 py-2 cursor-pointer font-semibold hover:bg-slate-200 text-orange-500">CATEGORIES &#9662;</span>
            <div className="absolute left-0 top-full hidden group-hover:block bg-white text-gray-800 shadow-lg">
              <a href="#romance" className="block px-4 py-2 hover:bg-gray-200">Romance Novels</a>
              <a href="#fiction" className="block px-4 py-2 hover:bg-gray-200">Fiction</a>
              <a href="#nonfiction" className="block px-4 py-2 hover:bg-gray-200">Non-Fiction</a>
              <a href="#thriller" className="block px-4 py-2 hover:bg-gray-200">Thriller</a>
            </div>
          </div>
          <a href="#best-sales" className="block px-4 py-2 font-semibold hover:bg-slate-200  hover:text-orange-500">BEST SALES</a>
          <a href="#exchange" className="block px-4 py-2 font-semibold hover:bg-slate-200 hover:text-orange-500">EXCHANGE</a>
        </div>
        <div className="flex items-center">
          {isLoggedIn ? (
            <img src="/profile.png" alt="Profile" className="h-10 w-10 rounded-full" />
          ) : (
            <a href="#signup" className="text-sm font-bold hover:underline text-orange-500">Sign Up</a>
          )}
        </div>
      </nav>

      {/* Main Content */}
     <div
  id="home"
  className="bg-orange-50 h-screen flex items-center justify-center px-1 sm:px-4"
>
  {/* Content Container */}
  <div className="bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row items-start justify-between w-full max-w-[90%] h-[85%] p-12 md:p-20">
    {/* Left Section */}
    <div className="md:w-1/2 flex flex-col justify-center h-full">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">
        The Store that Feeds Your Mind. Visit Us Today!!
      </h2>
      <p className="text-base md:text-lg text-gray-700 mb-8">
        Your one-stop shop for books of every genre! Where you can browse, buy, and exchange books in minutes!
      </p>

      {/* Search Section */}
      <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-full max-w-[350px] mb-6">
        <i className="fas fa-search text-gray-600 mr-3"></i> {/* Font Awesome Search Icon */}
        <input
          type="text"
          placeholder="Search by book name"
          className="flex-grow bg-transparent border-none outline-none text-gray-700 placeholder-gray-500"
        />
        <button className="bg-orange-400 text-white font-semibold px-6 py-2 rounded-full hover:bg-orange-500 transition">
          Search
        </button>
      </div>
    </div>

    {/* Right Section */}
    <div className="md:w-1/2 flex justify-center">
      <img
        src="/images/bookpage.png" /* Replace with your desired image URL */
        alt="Books"
        className="max-w-full h-auto rounded-lg shadow-lg"
      />
    </div>
  </div>
</div>



<div
  id="best-sales"
  className="p-8 relative bg-orange-50"
  style={{
    backgroundImage: `url('/images/clipartt1.png'), url('/images/clipart2.png')`,
    backgroundPosition: 'top left, top right',
    backgroundRepeat: 'no-repeat, no-repeat',
    backgroundSize: '100px, 100px',
  }}
>
  <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
    Top 5 Best Sellers
  </h2>

  {/* White Card Container */}
  <div className="bg-white p-4 rounded-3xl shadow-md ">
    {/* Grid Layout */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-0 relative">
      {[
        {
          image: "/images/book1.jpg",
          title: "IT STARTS WITH US",
          author: "Colleen Hoover",
          price: "849",
          stock: "4 stocks left",
        },
        {
          image: "/images/book2.jpg",
          title: "FOURTH WING",
          author: "Rebecca Yarros",
          price: "989",
          stock: "3 stocks left",
        },
        {
          image: "/images/boook3.jpg",
          title: "Ruthless Vows",
          author: "Rebecca Ross",
          price: "999",
          stock: "5 stocks left",
        },
        {
          image: "/images/boook4.jpg",
          title: "IRON FLAME",
          author: "Rebecca Yarros",
          price: "764",
          stock: "2 stocks left",
        },
        {
          image: "/images/book5.jpg",
          title: "THE ONLY ONE LEFT",
          author: "Riley Sager",
          price: "543",
          stock: "1 stock left",
        },
      ].map((book, index) => (
        <div
          key={index}
          className="group relative transform transition-transform duration-300 hover:scale-105"
        >
          {/* Hover Background Effect */}
          <div className="absolute inset-0 bg-orange-300 opacity-0 group-hover:opacity-100 transition-all duration-300 z-0"></div>

          {/* Content with Padding */}
          <div className="relative z-10 p-4">
            {/* Image with Solid Gray Border */}
            <div className="w-full h-64 border-[10px] border-gray-300 rounded-md overflow-hidden">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Book Details */}
            <p className="font-bold text-center mt-2 group-hover:text-white">
              {book.title}
            </p>
            <p className="text-center text-gray-700 mb-2 group-hover:text-white">
              {book.author}
            </p>
            <div className="flex items-center justify-between mt-2">
              <button className="py-2 px-4 rounded-sm text-sm bg-orange-400 text-white transition-colors duration-300 group-hover:bg-white group-hover:text-orange-500">
                Buy Now
              </button>
              <p className="text-gray-700 font-semibold group-hover:text-white">
                &#8377; {book.price}
              </p>
            </div>
            <p className="text-gray-700 text-sm mt-2 text-center group-hover:text-white">
              {book.stock}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>




<div id="categories" className="p-8 bg-orange-50">
  <h2 className="text-3xl font-bold mb-6 text-center">Shop By Category</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
    {categories.map((category, index) => (
      <div
        key={category.id}
        className={`flex items-center p-4 rounded-lg shadow-md transition-transform transform hover:scale-105`}
        style={{
          background: `linear-gradient(to left, ${index === 0 ? '#ff9a9e' : index === 1 ? '#a1c4fd' : index === 2 ? '#fbc2eb' : '#d4fc79'}, ${index === 0 ? '#ff6a88' : index === 1 ? '#c2e9fb' : index === 2 ? '#a6c1ee' : '#96e6a1'})`
        }}
      >
        <img
          src={category.image}
          alt={category.name}
          className="w-16 h-16 object-cover rounded-full mr-4"
        />
        <h3 className="text-xl font-semibold text-gray-800">{category.name}</h3>
      </div>
    ))}
  </div>
</div>


<div id="exchange" className="p-8 bg-orange-50 flex flex-col items-center">
        {/* <!-- Title in the Middle --> */}
        {/* <h2 className="text-3xl font-bold mb-6 text-center">Exchange</h2> */}

        {/* <!-- Content Inside White Box --> */}
        <div className="bg-white bg-opacity-90 p-8 rounded-3xl shadow-lg w-full">
            <div className="w-full flex justify-between items-center">
            <div className="w-1/2 pr-6">
                    <h3 className="text-5xl font-bold mb-4">Exchange your books with used titles</h3>
                    <p className="text-3xl font-semibold mb-2">Give your books countless lives !!</p>
                        <p className="text-xl italic">Exchange any book with any book here and pay only for shipping.</p>
                    {/* <div className="bg-gray-400 bg-opacity-50 p-6 rounded-lg shadow-md max-w-sm">
                        <p className="text-xl font-semibold mb-2">Give your books countless lives</p>
                        <p className="text-sm italic">Exchange any book with any book here and pay only for shipping</p>
                    </div> */}
                </div>

                {/* <!-- Right Part --> */}
                <div className="w-1/2 flex justify-center items-center">
                    <img src="/images/exch1.png" alt="Books Exchange" className="object-cover" />
                </div>
            </div>
        </div>
    </div>


      <div id="signup" className="p-8 bg-orange-50">
        <h2 className="text-3xl font-bold mb-6 text-center">Sign Up / Login</h2>
        {!showRegister ? (
          <div className="grid md:grid-cols-2 gap-8">
            <form className="space-y-4">
              <h3 className="text-xl font-bold">Login</h3>
              <input type="text" placeholder="Enter your username" className="w-full p-2 border rounded" />
              <input type="password" placeholder="Enter your password" className="w-full p-2 border rounded" />
              <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">Login</button>
            </form>
            <div className="flex flex-col items-center justify-center">
              <p className="mb-4">Don't have an account?</p>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => setShowRegister(true)}
              >
                Register Here
              </button>
            </div>
          </div>
        ) : (
          <form className="space-y-4 max-w-lg mx-auto">
            <h3 className="text-xl font-bold">Register</h3>
            <input type="text" placeholder="Enter your name" className="w-full p-2 border rounded" />
            <input type="email" placeholder="Enter your email" className="w-full p-2 border rounded" />
            <input type="tel" placeholder="Enter your phone number" className="w-full p-2 border rounded" />
            <input type="text" placeholder="Enter a username" className="w-full p-2 border rounded" />
            <input type="password" placeholder="Enter your password" className="w-full p-2 border rounded" />
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Register</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default App;
