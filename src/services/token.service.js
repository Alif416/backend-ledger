const jwt = require("jsonwebtoken");
const config = require("../config/env");

class TokenService {
    generateAuthToken(userId) {
        return jwt.sign({ userId }, config.jwtSecret, { expiresIn: config.jwtExpiresIn });
    }

    verifyAuthToken(token) {
        return jwt.verify(token, config.jwtSecret);
    }
}

module.exports = new TokenService();
