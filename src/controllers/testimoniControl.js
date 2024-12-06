import Testimoni from "../models/testimoni.js";

export const testimoni = async (req, res) => {
  try {
    const { email, pesan } = req.body;

    // Validate input data
    if (!email || !pesan) {
      return res.status(400).json({ msg: "Email and pesan are required" });
    }

    await Testimoni.create({
      email: email,
      pesan: pesan,
    });

    res.status(201).json({ msg: "Testimonial created successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const getTestimoni = async (req, res) => {
  try {
    const testimonials = await Testimoni.findAll();
    res.status(200).json({ status: "ok", data: testimonials });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
};
