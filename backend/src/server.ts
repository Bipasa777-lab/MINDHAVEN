import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

// ✅ Import route modules
import bookingRoutes from "./modules/booking/routes";
import peerSupportRoutes from "./modules/peer-support/routes";
import authRoutes from "./modules/auth/routes";
import aiChatRoutes from "./modules/ai-chat/routes";
import resourceRoutes from "./modules/resources/routes";  // ✅ Resource Hub
import analyticsRoutes from "./modules/analytics/routes"; // ✅ Analytics Dashboard
import screeningRoutes from "./modules/screening/routes"; // ✅ Mental Screening

dotenv.config();
const app = express();

// ✅ Use new port (change to 5001 if 5000 is busy)
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_ORIGIN?.split(",") || "*" }));

// ✅ Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend is running 🚀" });
});

// ✅ Booking routes
app.use("/api/bookings", bookingRoutes);

// ✅ Peer Support routes
app.use("/api/peer-support", peerSupportRoutes);

// ✅ Auth routes
app.use("/api/auth", authRoutes);

// ✅ AI Chat routes
app.use("/api/ai-chat", aiChatRoutes);

// ✅ Resource Hub routes
app.use("/api/resources", resourceRoutes);

// ✅ Analytics routes
app.use("/api/analytics", analyticsRoutes);

// ✅ Screening routes
app.use("/api/screenings", screeningRoutes);

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/bookingdb")
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
