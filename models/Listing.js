const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, enum: ["yojna", "naukri", "result"], required: true },
    state: { type: String, default: "केंद्रीय" },
    eligibility: { type: String },
    benefit: { type: String },
    posts: { type: Number },
    ageLimit: { type: String },
    qualification: { type: String },
    deadline: { type: Date },
    status: { type: String, enum: ["open", "closed", "declared"], default: "open" },
    officialLink: { type: String },
    hasCustomForm: { type: Boolean, default: false },
    description: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Listing", listingSchema);
