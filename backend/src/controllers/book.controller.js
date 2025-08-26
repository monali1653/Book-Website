import { Book } from "../models/book.model.js";
import { asyncHandler } from "../utils/asynchandler.js";
import {ApiError} from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"

const sellBook = asyncHandler(async (req,res) => {
    let {bookname, category, author, description, price, count} = req.body;
    if([bookname, category, author, description, price].some((field) => field ?.trim() ==="")) {
      throw new ApiError(400, "All fields are required")
    }
    category = category.toLowerCase()
    
    const bookImageLocalPath = req.files?.bookImage?.[0]?.path;
    if(!bookImageLocalPath) {
      throw new ApiError(400,"Book Image is Required")
    }
    const image = await uploadOnCloudinary(bookImageLocalPath)
    if(!image) {
      throw new ApiError(400,"Book Image is Required")
    }
    const pendingBook = await Book.create({
        bookname,
        category,
        description,
        author,
        price,
        count,
        bookImage: image.url,
        seller: req.user._id,
        status: "pending"
    })

    if(!pendingBook) {
      throw new ApiError(500,"Something went wrong while adding the book")
    }
    return res.status(200).json(
      new ApiResponse(200, pendingBook,"Book sold successfully")
    )
})

const buyBook = asyncHandler(async (req,res) => {
    try {
        const {bookId} = req.params
        const buyerId = req.user?._id
        const book = await Book.findById(bookId)
        if(!book) {
            throw new ApiError(404,"Book not found")
        }
        if(book.count>0) {
            book.count -= 1;
            if (!book.buyers.includes(buyerId)) {
                book.buyers.push(buyerId);
            }
            await book.save()
            return res.status(200).json(
              new ApiResponse(200,book,"Book purchased succesfully")
            )
        } else {
            throw new ApiError(400,"Book is out of stock")
        }
    } catch(error) {
        throw new ApiError(500,"Something went wrong")
    }
})

const fetchAllBooks = asyncHandler(async (req, res) => {
  try {
    const books = await Book.find({ status: "approved" });
    res.status(200).json(new ApiResponse(200,books,"All books fetched successfully"));
  } catch (error) {
    console.error("Error fetching all books:", error);
    throw new ApiError(500,"Internal Server Error")
  }
});

const getBooksSoldByMe = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  const soldBooks = await Book.find({ seller: userId }).sort({ updatedAt: -1 });

  return res.status(200).json(
    new ApiResponse(200, soldBooks, "Books sold by user fetched.")
  );
});

const searchBooks = asyncHandler(async (req, res) => {
  const { query } = req.query;

  if (!query || query.trim() === "") {
    throw new ApiError(400, "Search query is required")
  }

  const regex = new RegExp(query.trim(), "i");

  const books = await Book.aggregate([
    {
      $match: {
        $or: [
          { bookname: { $regex: regex } },
          { author: { $regex: regex } },
          { category: { $regex: regex } },
        ],
      },
    },
    {
      $limit: 5,
    },
  ]);
  return res.status(200).json(
    new ApiResponse(200, books, "Books are searched successfully")
  )
});

export {
    sellBook,
    buyBook,
    fetchAllBooks,
    getBooksSoldByMe,
    searchBooks,
}