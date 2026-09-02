const express = require("express");
const router = express.Router();
const Listing = require("../models/Listing");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
  try {
    const { category, state, q } = req.query;
    const filter = {};
    if (category && category !== "all") filter.category = category;
    if (state && state !== "सभी राज्य") filter.state = state;
    if (q) filter.title = { $regex: q, $options: "i" };

    const sort = req.query.sort === "deadline" ? { deadline: 1 } : { createdAt: -1 };
    const listings = await Listing.find(filter).sort(sort);
    res.json(listings);
  } catch (err) {
    res.status(500).json({ error: "Listings load nahi ho payi." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ error: "Listing nahi mili." });
    res.json(listing);
  } catch (err) {
    res.status(500).json({ error: "Kuch galat ho gaya." });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const listing = await Listing.create(req.body);
    res.status(201).json(listing);
  } catch (err) {
    res.status(400).json({ error: "Listing create nahi ho payi." });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const listing = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(listing);
  } catch (err) {
    res.status(400).json({ error: "Update nahi ho paya." });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.json({ message: "Listing hata di gayi." });
  } catch (err) {
    res.status(400).json({ error: "Delete nahi ho paya." });
  }
});

module.exports = router;
