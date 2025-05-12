// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const connectDB = require("./src/config/db");
// const hostRoutes = require("./src/routes/hostRoutes");
// const buyerRoutes = require("./src/routes/buyerRoutes");
// const { errorHandler, notFound } = require("./src/middleware/errorMiddleware");
// const eventRoutes = require("./src/routes/eventRoutes");
// const ticketRoutes = require("./src/routes/TicketResaleRoutes");
// const eventDetailsRoutes = require("./src/routes/eventDetailsRoutes");
// const buyereventroutes= require("./src/routes/buyerEventRoutes")
// const ticketRoutes2= require("./src/routes/ticketRoutes")
// // Load environment variables from .env file
// dotenv.config();

// // Connect to MongoDB
// connectDB();

// // Initialize Express app
// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // API Routes
// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

// app.use("/api/hosts", hostRoutes);
// app.use("/api/buyers", buyerRoutes);
// app.use("/api/events", eventRoutes);
// app.use("/api/buyerevents",buyereventroutes)
// app.use("/api/tickets", ticketRoutes);
// app.use("/api/detailsEvents", eventDetailsRoutes);
// app.use("/api/host", hostRoutes);
// app.use("/api/tickets", ticketRoutes2);
// // Error Handling Middleware
// app.use(notFound);
// app.use(errorHandler);

// // Start Server
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./src/config/db");
const hostRoutes = require("./src/routes/hostRoutes");
const buyerRoutes = require("./src/routes/buyerRoutes");
const { errorHandler, notFound } = require("./src/middleware/errorMiddleware");
const eventRoutes = require("./src/routes/eventRoutes");
const ticketRoutes = require("./src/routes/TicketResaleRoutes");
const eventDetailsRoutes = require("./src/routes/eventDetailsRoutes");
const buyereventroutes= require("./src/routes/buyerEventRoutes")
const ticketRoutes2= require("./src/routes/ticketRoutes")
const ticketMetadataRoutes=require("./src/routes/ticketMetadataRoutes")
// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/hosts", hostRoutes);
app.use("/api/buyers", buyerRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/buyerevents",buyereventroutes)
app.use("/api/tickets", ticketRoutes);
app.use("/api/detailsEvents", eventDetailsRoutes);
app.use("/api/host", hostRoutes);
app.use("/api/tickets", ticketRoutes2);
app.use("/api/ticketMetadata",ticketMetadataRoutes)

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});