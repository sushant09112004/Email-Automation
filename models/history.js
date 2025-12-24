import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
    {
        email: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
        status: { type: String, enum: ['sent', 'failed'], required: true },
        subject: { type: String, required: true },
        body: { type: String, required: true }
    }
)
export const History = mongoose.models.History || mongoose.model("History", historySchema);

export default History;

