import mongoose from "mongoose";

const passwordResetSchema = new mongoose.Schema({
  email: { type: String, required: true },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 600 },
});

passwordResetSchema.index({ email: 1 });
passwordResetSchema.index({ token: 1 });

const passwordResetModel = mongoose.model("PasswordReset", passwordResetSchema);
export default passwordResetModel;
