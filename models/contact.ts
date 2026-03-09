import { contactSchemaProp } from "@/next-env";
import mongoose from "mongoose";

const contactSchema = new mongoose.Schema<contactSchemaProp>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, "Can't be more than 100 word name!"],
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, "Can't be more than 100 word subject!"],
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: [1000, "Can't be more than 1000 word content!"],
    },
    status: {
      type: String,
      required: true,
      enum: ["new", "read", "replied"],
    },
  },
  { timestamps: true },
);

export const Contact =
  mongoose.models.Contact || mongoose.model("Contact", contactSchema);
