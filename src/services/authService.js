const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, getUserByEmail } = require('../models/userModel');

const register = async (name, email, password) => {
    const hashed = await bcrypt.hash(password, 10);
    return await createUser(name, email, hashed);
};

const login = async (email, password) => {
    const user = await getUserByEmail(email);

    if (!user) {
        throw new Error("User not found");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
        { id: user.id, role: user.role },
        "SECRET_KEY",
        { expiresIn: "1d" }
    );

    return { token, user };
};

module.exports = { register, login };