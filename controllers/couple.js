const asyncHandler = require("express-async-handler");
const Couple = require("../models/Couple");

// GET COUPLE BY ID
const getCoupleById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // find couple data by id
  const couple = await Couple.findOne({ _id: id }).lean();

  // if there is no couple found
  if (!couple) {
    return res.status(404).json({ message: "Couple not found" });
  }

  res.status(200).json(couple);
});

// CREATE COUPLE
const createCouple = asyncHandler(async (req, res) => {
  const {
    bride_data,
    groom_data,
    marriage_settlement_date,
    marriage_settlement_time,
    marriage_settlement_location,
    marriage_settlement_link_maps,
    marriage_reception_date,
    marriage_reception_time,
    marriage_reception_location,
    marriage_reception_link_maps,
    love_gift,
    wedding_photo,
  } = req.body;

  if (
    !bride_data.full_name ||
    !bride_data.nick_name ||
    !bride_data.fathers_name ||
    !bride_data.mothers_name ||
    bride_data.photo.length === 0 ||
    !groom_data.full_name ||
    !groom_data.nick_name ||
    !groom_data.fathers_name ||
    !groom_data.mothers_name ||
    groom_data.photo.length === 0 ||
    !marriage_settlement_date ||
    !marriage_settlement_time ||
    !marriage_settlement_location ||
    !marriage_settlement_link_maps ||
    !marriage_reception_date ||
    !marriage_reception_time ||
    !marriage_reception_location ||
    !marriage_reception_link_maps ||
    love_gift.length === 0 ||
    wedding_photo.length === 0
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // create couple data
  const objCouple = {
    bride_data,
    groom_data,
    marriage_settlement_date,
    marriage_settlement_time,
    marriage_settlement_location,
    marriage_settlement_link_maps,
    marriage_reception_date,
    marriage_reception_time,
    marriage_reception_location,
    marriage_reception_link_maps,
    love_gift,
    wedding_photo,
  };

  const couple = await Couple.create(objCouple);

  if (couple) {
    return res.status(201).json({ message: "New Couple successfully created" });
  } else {
    return res.status(404).json({ message: "Invalid data received" });
  }
});

module.exports = { getCoupleById, createCouple };
