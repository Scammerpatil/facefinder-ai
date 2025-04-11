import mongoose, { Schema } from "mongoose";

const MissingPersonSchema = new Schema(
  {
    reportedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    lastSeenLocation: {
      type: String,
      required: true,
    },
    dateMissing: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["missing", "found"],
      default: "missing",
    },
  },
  { timestamps: true }
);

const MissingPerson =
  mongoose.models.MissingPerson ||
  mongoose.model("MissingPerson", MissingPersonSchema);

export default MissingPerson;
