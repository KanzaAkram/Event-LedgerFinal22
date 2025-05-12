// const TicketMetadata = require("../models/ticketMetadata");

// // Create a new ticket metadata entry
// exports.createTicketMetadata = async (req, res) => {
//   try {
//     const {
//       ticketId,
//       eventId,
//       ticketType,
//       owner,
//       nftMetadataUri,
//       transactionHash,
//       price,
//       purchasedAt,
//       qrCodeMetadata,
//     } = req.body;

//     // Validate required fields
//     if (
//       !ticketId ||
//       !eventId ||
//       !ticketType ||
//       !owner ||
//       !nftMetadataUri ||
//       !transactionHash ||
//       !price ||
//       !purchasedAt ||
//       !qrCodeMetadata
//     ) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

//     // Check for duplicate ticketId
//     const existingTicket = await TicketMetadata.findOne({ ticketId });
//     if (existingTicket) {
//       return res.status(400).json({ error: "Ticket ID already exists" });
//     }

//     const ticketMetadata = new TicketMetadata({
//       ticketId,
//       eventId,
//       ticketType,
//       owner,
//       nftMetadataUri,
//       transactionHash,
//       price,
//       purchasedAt,
//       qrCodeMetadata,
//     });

//     await ticketMetadata.save();
//     res.status(201).json({ message: "Ticket metadata saved successfully", ticketMetadata });
//   } catch (err) {
//     console.error("Error saving ticket metadata:", err);
//     res.status(500).json({ error: "Failed to save ticket metadata" });
//   }
// };

// // Get ticket metadata by ticketId
// exports.getTicketMetadata = async (req, res) => {
//   try {
//     const { ticketId } = req.params;
//     const ticketMetadata = await TicketMetadata.findOne({ ticketId });
//     if (!ticketMetadata) {
//       return res.status(404).json({ error: "Ticket metadata not found" });
//     }
//     res.status(200).json(ticketMetadata);
//   } catch (err) {
//     console.error("Error fetching ticket metadata:", err);
//     res.status(500).json({ error: "Failed to fetch ticket metadata" });
//   }
// };

// // Get all ticket metadata for an event
// exports.getTicketsByEvent = async (req, res) => {
//   try {
//     const { eventId } = req.params;
//     const tickets = await TicketMetadata.find({ eventId });
//     res.status(200).json(tickets);
//   } catch (err) {
//     console.error("Error fetching tickets for event:", err);
//     res.status(500).json({ error: "Failed to fetch tickets for event" });
//   }
// };

const TicketMetadata = require("../models/ticketMetadata");
const Event = require("../models/buyerEvent"); // Adjust path
const Host = require("../models/Host"); // Adjust path
const mongoose = require("mongoose");

// Create a new ticket metadata entry
exports.createTicketMetadata = async (req, res) => {
  try {
    const {
      ticketId,
      eventId,
      ticketType,
      owner,
      nftMetadataUri,
      transactionHash,
      price,
      purchasedAt,
      qrCodeMetadata,
      eventDate,
    } = req.body;

    // Validate required fields
    if (
      !ticketId ||
      !eventId ||
      !ticketType ||
      !owner ||
      !nftMetadataUri ||
      !transactionHash ||
      !price ||
      !purchasedAt ||
      !qrCodeMetadata ||
      !eventDate
    ) {
      return res
        .status(400)
        .json({ error: "All fields are required, including eventDate" });
    }

    // Validate eventDate is a number
    if (typeof eventDate !== "number" || isNaN(eventDate)) {
      return res
        .status(400)
        .json({ error: "eventDate must be a valid Unix timestamp (number)" });
    }

    // Check for duplicate ticketId
    const existingTicket = await TicketMetadata.findOne({ ticketId });
    if (existingTicket) {
      return res.status(400).json({ error: "Ticket ID already exists" });
    }

    const ticketMetadata = new TicketMetadata({
      ticketId,
      eventId,
      ticketType,
      owner,
      nftMetadataUri,
      transactionHash,
      price,
      purchasedAt,
      qrCodeMetadata,
      eventDate,
    });

    await ticketMetadata.save();
    console.log("Ticket saved to MongoDB:", ticketMetadata);
    res
      .status(201)
      .json({ message: "Ticket metadata saved successfully", ticketMetadata });
  } catch (err) {
    console.error("Error saving ticket metadata:", err);
    res.status(500).json({ error: "Failed to save ticket metadata" });
  }
};

// Update ticket metadata (e.g., for resell)
exports.updateEventPurchase = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
      return res.status(400).json({ error: "Invalid quantity" });
    }

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    if (event.ticketSupply < quantity) {
      return res.status(400).json({ error: "Not enough tickets available" });
    }

    event.ticketSupply -= quantity;
    event.ticketsSold = (event.ticketsSold || 0) + quantity;
    await event.save();

    res.status(200).json({ message: "Event updated", event });
  } catch (err) {
    console.error("Error updating event purchase:", err.message);
    res.status(500).json({ error: "Failed to update event" });
  }
};

// Get ticket metadata by ticketId
exports.getTicketMetadata = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const ticket = await TicketMetadata.findOne({ ticketId });
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res
      .status(200)
      .json({ message: "Ticket metadata fetched successfully", ticket });
  } catch (err) {
    console.error("Error fetching ticket metadata:", err);
    res.status(500).json({ error: "Failed to fetch ticket metadata" });
  }
};

// Get all tickets for an event
exports.getTicketsByEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const tickets = await TicketMetadata.find({ eventId });
    if (!tickets.length) {
      return res
        .status(200)
        .json({ message: "No tickets found for this event", tickets: [] });
    }
    res.status(200).json({ message: "Tickets fetched successfully", tickets });
  } catch (err) {
    console.error("Error fetching tickets for event:", err);
    res.status(500).json({ error: "Failed to fetch tickets for event" });
  }
};

// Get personal tickets by wallet address
exports.getPersonalTickets = async (req, res) => {
  try {
    const { walletAddress } = req.params;
    console.log("Received wallet address:", walletAddress);

    if (mongoose.connection.readyState !== 1) {
      console.error(
        "MongoDB connection is not active. Ready state:",
        mongoose.connection.readyState
      );
      return res.status(500).json({ error: "Database connection failed" });
    }

    const allTickets = await TicketMetadata.find();
    console.log("All tickets in TicketMetadata collection:", allTickets);

    const query = { owner: { $regex: new RegExp(`^${walletAddress}$`, "i") } };
    console.log("Executing MongoDB query:", query);
    const tickets = await TicketMetadata.find(query);
    console.log("Raw query result:", tickets);

    if (!tickets.length) {
      console.log("No tickets found for wallet:", walletAddress);
      return res.status(200).json({ tickets: [], events: {} });
    }

    const eventIds = [...new Set(tickets.map((t) => t.eventId))];
    console.log("Extracted event IDs:", eventIds);
    const events = await Event.find({ _id: { $in: eventIds } });
    console.log("Found events:", events);
    const eventMap = events.reduce((acc, event) => {
      acc[event._id] = event;
      return acc;
    }, {});

    const response = {
      message: "Personal tickets fetched successfully",
      tickets,
      events: eventMap,
    };
    console.log("Sending response:", response);
    res.status(200).json(response);
  } catch (err) {
    console.error("Error fetching personal tickets:", err);
    res.status(500).json({ error: "Failed to fetch personal tickets" });
  }
};