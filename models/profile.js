const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var userProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  UID: {
    id: { type: Number },
    fullName: { type: String },
    DOB: { type: Date },
    address: { type: String }
  },
  passport: {
    id: { type: Number },
    fullName: { type: String },
    DOB: { type: Date },
    address: { type: String }
  },
  PanCard: {
    id: { type: Number },
    fullName: { type: String },
    DOB: { type: Date },
    address: { type: String }
  },
  CreatedAt: { type: Date, default: Date.now() },
  UpdatedAt: { type: Date }
});

userProfileSchema.pre("update", function(next) {
  this.UpdatedAt = Date.now();
});

module.exports = mongoose.model("Profile", userProfileSchema);
