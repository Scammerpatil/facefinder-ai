import mongoose, { Schema } from "mongoose";

const RecordSchema = new Schema(
  {
    missingPerson: {
      type: Schema.Types.ObjectId,
      ref: "MissingPerson",
      required: true,
    },
    video: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Record = mongoose.models.Record || mongoose.model("Record", RecordSchema);
export default Record;
