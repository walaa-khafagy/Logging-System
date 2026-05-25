import mongoose from "mongoose";

const logsSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },

    level: {
        type: String,
        enum: ["INFO", "WARN", "ERROR"],
        required: true
    },

    count: {
        type: Number,
        default: 1
    },

    application: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application"
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
    
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Log", logsSchema);