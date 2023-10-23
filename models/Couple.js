const mongoose = require("mongoose");

const CoupleSchema = new mongoose.Schema(
  {
    bride_data: {
      full_name: { type: String, required: true, min: 2, max: 100 },
      nick_name: { type: String, required: true, min: 2, max: 10 },
      fathers_name: { type: String, required: true, min: 2, max: 10 },
      mothers_name: { type: String, required: true, min: 2, max: 10 },
      birth_order: { type: Number, default: null },
      wa_number: { type: String, default: null },
      instagram_account: { type: String, default: "" },
      photo: { type: String, required: true },
    },
    groom_data: {
      full_name: { type: String, required: true, min: 2, max: 100 },
      nick_name: { type: String, required: true, min: 2, max: 10 },
      fathers_name: { type: String, required: true, min: 2, max: 10 },
      mothers_name: { type: String, required: true, min: 2, max: 10 },
      birth_order: { type: Number, default: null },
      wa_number: { type: String, default: null },
      instagram_account: { type: String, default: "" },
      photo: { type: String, required: true },
    },
    marriage_settlement_date: { type: String, required: true },
    marriage_settlement_time: { type: String, required: true },
    marriage_settlement_location: { type: String, required: true },
    marriage_settlement_link_maps: { type: String, required: true },
    marriage_reception_date: { type: String, required: true },
    marriage_reception_time: { type: String, required: true },
    marriage_reception_location: { type: String, required: true },
    marriage_reception_link_maps: { type: String, required: true },
    love_gift_1: { type: Array, required: true },
    love_gift_2: { type: Array, default: null },
    backsound: { type: String, default: "" },
    wedding_photo: { type: Array, required: true },
  },
  { timestamps: true }
);

const Couple = mongoose.model("Couple", CoupleSchema);
module.exports = Couple;
