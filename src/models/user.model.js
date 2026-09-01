const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Email is required for creating an account"],
            trim: true,
            lowercase: true,
            match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"],
            unique: true,
        },
        name: {
            type: String,
            required: [true, "Name is required for creating an account"],
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password is required for creating an account"],
            trim: true,
            minlength: [6, "Password must be at least 6 characters long"],
            select: false,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function hashPassword() {
    if (!this.isModified("password")) {
        return;
    }
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
});

userSchema.methods.comparePassword = function comparePassword(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.toPublicJSON = function toPublicJSON() {
    return {
        id: this._id,
        email: this.email,
        name: this.name,
    };
};

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
