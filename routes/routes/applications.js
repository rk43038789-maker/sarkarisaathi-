const express = require("express");
const router = express.Router();
const multer = require("multer");
const Application = require("../models/Application");
const auth = require("../middleware/auth");

const storage = multer.diskStorage({
  destination: "public/resumes",
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

router.post("/", upload.single("resume"), async (req, res) => {
  try {
    const { listing, name, email, phone } = req.body;
    if (!listing || !name || !email || !phone) {
      return res.status(400).json({ error: "Saari details bharein." });
    }
    const application = await Application.create({
      listing,
      name,
      email,
      phone,
      resumeUrl: req.file ? `/resumes/${req.file.filename}` : undefined,
    });
    res.status(201).json({ message: "Aavedan safaltapoorvak jama hua.", application });
  } catch (err) {
    res.status(500).json({ error: "Aavedan jama nahi ho paya." });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const filter = req.query.listing ? { listing: req.query.listing } : {};
    const applications = await Application.find(filter).populate("listing", "title");
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: "Applications load nahi ho payi." });
  }
});

module.exports = router;
