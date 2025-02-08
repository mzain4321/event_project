import mongoose, { Schema } from "mongoose";
const PartnerSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
    phoneNo: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    partnershipType: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Partner =
  mongoose.models?.Partner || mongoose.model("Partner", PartnerSchema);
export default Partner;