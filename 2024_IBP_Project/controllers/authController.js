const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');

const register = async (req, res) => {
    const { email, password, role } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await db.User.create({ email, password: hashedPassword, RoleId: role });

    res.send('User registered');
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await db.User.findOne({ where: { email } });
    if (!user) return res.status(400).send('Email or password is wrong');

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).send('Invalid password');

    const token = jwt.sign({ id: user.id, role: user.RoleId }, process.env.TOKEN_SECRET, {
        expiresIn: '1h',
    });

    res.header('Authorization', token).send(token);
};

module.exports = { register, login };
