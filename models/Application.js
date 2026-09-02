const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    listing: { type: mongoose.Schema.Types.ObjectId, ref: "Listing", required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    resumeUrl: { type: String },
    status: { type: String, enum: ["received", "reviewed", "shortlisted", "rejected"], default: "received" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);
