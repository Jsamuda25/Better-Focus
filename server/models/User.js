import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    password: String,
    cards: {
        type: Array,
        default: []
    },
    email: String,
    secret: {
        base32: String,
        qrcode: String
    },
    notes: {
        type: Array,
        default: []
    },
    todo: {
        type: Array,
        default: []
    },
});

const User = mongoose.model("User", UserSchema);
export default User;