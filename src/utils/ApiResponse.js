class ApiResponse {
    constructor(statusCode, data, message = "Success") {
        this.statusCode = statusCode;
        this.status = "success";
        this.message = message;
        this.data = data;
    }

    send(res) {
        const { statusCode, ...body } = this;
        return res.status(statusCode).json(body);
    }
}

module.exports = ApiResponse;
