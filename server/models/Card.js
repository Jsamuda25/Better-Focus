import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CardSchema = new Schema({
    question: String,
    answer: String,
    category: String
});

const Card = mongoose.model("Card", CardSchema);
export default Card;


