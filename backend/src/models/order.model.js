import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        _id: false,
        book: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Book",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],

    status: {
      type: String,
      default: "Order Placed",
    },
    totalAmount: {
      type: Number,
      required: true,
      default:0
    },
    placedAt: {
      type: Date,
      default: Date.now,
    },
    shippedAt: { type: Date },
    deliveredAt: { type: Date },
    returnTill: {
      type: Date,
    },

    returnInitiatedAt: { type: Date },
    productReceivedAt: { type: Date },
    refundCompletedAt: { type: Date },
  }, { timestamps: true });

export const Order = mongoose.model("Order", orderSchema);
