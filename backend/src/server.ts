// backend/src/server.ts
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bookingRoutes from "./modules/booking/routes";

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

mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/bookingdb")
  .then(() => {
    console.log("MongoDB Connected ✅");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
