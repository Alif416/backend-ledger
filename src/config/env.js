require("dotenv").config();

class Config {
    static #instance;

    constructor() {
        this.port = process.env.PORT || 3000;
        this.mongoUri = process.env.MONGODB_URI;
        this.jwtSecret = process.env.JWT_SECRET;
        this.jwtExpiresIn = process.env.JWT_EXPIRES_IN || "3d";

        this.#validate();
    }

    #validate() {
        const required = ["mongoUri", "jwtSecret"];
        const missing = required.filter((key) => !this[key]);

        if (missing.length > 0) {
            throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
        }
    }

    static getInstance() {
        if (!Config.#instance) {
            Config.#instance = new Config();
        }
        return Config.#instance;
    }
}

module.exports = Config.getInstance();
