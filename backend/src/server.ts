// backend/src/server.ts
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bookingRoutes from "./modules/booking/routes";
import peerSupportRoutes from "./modules/peer-support/routes"; // ✅ Import peer-support routes

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// ✅ Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend is running 🚀" });
});

// ✅ Booking routes
app.use("/api/bookings", bookingRoutes);

// ✅ Peer Support routes
app.use("/api/peer-support", peerSupportRoutes);

mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/bookingdb")
  .then(() => {
    console.log("MongoDB Connected ✅");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
