const { register, login } = require('../services/authService');

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const result = await register(name, email, password);

        res.json({ success: true, message: "User registered", result });

    } catch (err) {
        res.json({ success: false, message: err.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await login(email, password);

        res.json({ success: true, data: result });

    } catch (err) {
        res.json({ success: false, message: err.message });
    }
};

module.exports = { registerUser, loginUser };