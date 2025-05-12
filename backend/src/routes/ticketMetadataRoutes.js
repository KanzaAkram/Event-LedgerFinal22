// const express = require("express");
// const router = express.Router();
// const ticketMetadataController = require("../controllers/ticketMetadataController");

// // Create ticket metadata
// router.post("/", ticketMetadataController.createTicketMetadata);

// // Get ticket metadata by ticketId
// router.get("/:ticketId", ticketMetadataController.getTicketMetadata);

// // Get all tickets for an event
// router.get("/event/:eventId", ticketMetadataController.getTicketsByEvent);

// module.exports = router;

const express = require("express");
const router = express.Router();
const ticketMetadataController = require("../controllers/ticketMetadataController");

// Create ticket metadata
router.post("/", ticketMetadataController.createTicketMetadata);

// Get ticket metadata by ticketId
router.get("/:ticketId", ticketMetadataController.getTicketMetadata);

// Get all tickets for an event
router.get("/event/:eventId", ticketMetadataController.getTicketsByEvent);

// Get personal tickets by wallet address
router.get(
  "/personal/:walletAddress",
  ticketMetadataController.getPersonalTickets
);
router.post("/:id/purchase", ticketMetadataController.updateEventPurchase);
module.exports = router;