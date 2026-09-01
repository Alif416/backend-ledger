const UserModel = require("../models/user.model");

class UserRepository {
    findByEmail(email, { includePassword = false } = {}) {
        const query = UserModel.findOne({ email });
        return includePassword ? query.select("+password") : query;
    }

    create(userData) {
        return UserModel.create(userData);
    }
}

module.exports = new UserRepository();
