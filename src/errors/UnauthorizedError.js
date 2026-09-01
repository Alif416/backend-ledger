const ApiError = require("./ApiError");

class UnauthorizedError extends ApiError {
    constructor(message = "Invalid credentials") {
        super(401, message);
    }
}

module.exports = UnauthorizedError;
