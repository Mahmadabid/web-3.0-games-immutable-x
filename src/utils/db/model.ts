import mongoose, { Schema } from "mongoose";

const gameSchema = new Schema(
    {
        userId: String,
        data: {
            quiz: {
                points: Number
            },
            balloon: {
                points: Number
            }
        }
    }
)

const WebGame = mongoose.models.WebGame || mongoose.model("WebGame", gameSchema);

export default WebGame