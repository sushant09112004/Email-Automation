import mongoose from "mongoose";

const emialSchma = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        // verified: { type: Boolean, default: false },
        timestamp: { type: Date, default: Date.now }
    }
)
export const Email = mongoose.models.Email || mongoose.model("Email", emialSchma);
// export const Email = mongoose.model("Email", emialSchma);    
export default Email;
