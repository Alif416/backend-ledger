const mongoose = require("mongoose");
const config = require("./env");

class Database {
    static #instance;
    #connected = false;

    static getInstance() {
        if (!Database.#instance) {
            Database.#instance = new Database();
        }
        return Database.#instance;
    }

    async connect() {
        if (this.#connected) {
            return mongoose.connection;
        }

        try {
            await mongoose.connect(config.mongoUri);
            this.#connected = true;
            console.log("Database connected successfully");
            return mongoose.connection;
        } catch (err) {
            console.error("Database connection failed:", err.message);
            process.exit(1);
        }
    }
}

module.exports = Database.getInstance();
