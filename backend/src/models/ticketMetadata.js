// const mongoose = require("mongoose");

// const ticketMetadataSchema = new mongoose.Schema({
//   ticketId: {
//     type: Number,
//     required: true,
//     unique: true,
//   },
//   eventId: {
//     type: String,
//     required: true,
//   },
//   ticketType: {
//     type: String,
//     required: true,
//     enum: ["General Admission", "VIP", "Other"],
//   },
//   owner: {
//     type: String,
//     required: true, // Wallet address of the ticket owner
//   },
//   nftMetadataUri: {
//     type: String,
//     required: true,
//   },
//   transactionHash: {
//     type: String,
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true, // Original price in ETH
//   },
//   purchasedAt: {
//     type: Number,
//     required: true, // Unix timestamp
//   },
//   qrCodeMetadata: {
//     type: String,
//     required: true, // URL or IPFS URI for QR code
//   },
//   eventDate: {
//     type: Number, // Unix timestamp for event date
//     required: true,
//   },
//   isVerified: {
//     type: Boolean,
//     default: false,
//   },
//   isResold: {
//     type: Boolean,
//     default: false,
//   },
//   resalePrice: {
//     type: Number, // Resale price in ETH
//   },
//   soldAt: {
//     type: Date, // Date of resale
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = mongoose.model("TicketMetadata", ticketMetadataSchema);

const mongoose = require("mongoose");

const ticketMetadataSchema = new mongoose.Schema({
  ticketId: {
    type: Number,
    required: true,
    unique: true,
  },
  eventId: {
    type: String,
    required: true,
  },
  ticketType: {
    type: String,
    required: true,
    enum: ["General Admission", "VIP", "Other"],
  },
  owner: {
    type: String,
    required: true, // Wallet address of the ticket owner
  },
  nftMetadataUri: {
    type: String,
    required: true,
  },
  transactionHash: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true, // Original price in ETH
  },
  purchasedAt: {
    type: Number,
    required: true, // Unix timestamp
  },
  qrCodeMetadata: {
    type: String,
    required: true, // URL or IPFS URI for QR code
  },
  eventDate: {
    type: Number, // Unix timestamp for event date
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isResold: {
    type: Boolean,
    default: false,
  },
  resalePrice: {
    type: Number, // Resale price in ETH
  },
  soldAt: {
    type: Date, // Date of resale
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("TicketMetadata", ticketMetadataSchema);