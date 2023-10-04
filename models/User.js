const { default: mongoose, models } = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    }
}, { timestamps: true })

const User = models.User || mongoose.model("User", userSchema)
export default User