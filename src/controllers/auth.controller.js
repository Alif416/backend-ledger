const authService = require("../services/auth.service");
const ApiResponse = require("../utils/ApiResponse");

class AuthController {
    async register(req, res) {
        const { email, password, name } = req.body;
        const { user, token } = await authService.register({ email, password, name });

        res.cookie("token", token);
        new ApiResponse(201, { user, token }, "Registration successful").send(res);
    }

    async login(req, res) {
        const { email, password } = req.body;
        const { user, token } = await authService.login({ email, password });

        res.cookie("token", token);
        new ApiResponse(200, { user, token }, "Login successful").send(res);
    }
}

module.exports = new AuthController();
