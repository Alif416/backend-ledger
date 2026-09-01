const ApiError = require("../errors/ApiError");

function errorMiddleware(err, req, res, next) {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            status: "error",
            message: err.message,
        });
    }

    console.error(err);
    return res.status(500).json({
        status: "error",
        message: "Internal server error",
    });
}

module.exports = errorMiddleware;
