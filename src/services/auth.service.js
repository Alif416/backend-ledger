const userRepository = require("../repositories/user.repository");
const tokenService = require("./token.service");
const ConflictError = require("../errors/ConflictError");
const UnauthorizedError = require("../errors/UnauthorizedError");

class AuthService {
    async register({ email, password, name }) {
        const existingUser = await userRepository.findByEmail(email);
        if (existingUser) {
            throw new ConflictError("Email already exists");
        }

        let user;
        try {
            user = await userRepository.create({ email, password, name });
        } catch (err) {
            // 11000 = duplicate key on the unique email index, in case another
            // request created the same email between the findByEmail above and here
            if (err.code === 11000) {
                throw new ConflictError("Email already exists");
            }
            throw err;
        }

        const token = tokenService.generateAuthToken(user._id);
        return { user: user.toPublicJSON(), token };
    }

    async login({ email, password }) {
        const user = await userRepository.findByEmail(email, { includePassword: true });
        if (!user) {
            throw new UnauthorizedError("Invalid email or password");
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            throw new UnauthorizedError("Invalid email or password");
        }

        const token = tokenService.generateAuthToken(user._id);
        return { user: user.toPublicJSON(), token };
    }
}

module.exports = new AuthService();
