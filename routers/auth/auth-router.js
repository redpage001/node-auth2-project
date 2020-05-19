const bcryptjs = require('bcryptjs');

const jwt = require('jsonwebtoken');

const router = require('express').Router();

const Users = require('../users/users-model');

const { isValid } = require('../auth/users-service');

router.post('/register', (req, res) => {
    const { username, password, department } = req.body;
    const credentials = { username, password, department };

    if(isValid(credentials)) {
        const rounds = process.env.BCRYPT_ROUNDS || 8;
        const hash = bcryptjs.hashSync(credentials.password, rounds);

        credentials.password = hash;

        Users.add(credentials)
             .then(user => {
                 res.status(201).json({ data: user })
             })
             .catch(error => {
                 console.log({ error })
                 res.status(500).json({ message: error.message })
             })
    }else {
        res.status(400).json({ message: "Please provide username and password, password must be alphanumeric" })
    }
})

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if(isValid({ username, password})) {
        Users.findBy({username})
             .then(([user]) => {
                 if(user && bcryptjs.compareSync(password, user.password)) {
                     const token = createToken(user);
                     res.status(200).json({ message: "Welcome to api", token: token })
                 }else {
                     res.status(401).json({ message: "Invalid Credentials" })
                 }
             })
             .catch(error => {
                 console.log({ error })
                 res.status(500).json({ message: error.message })
             })
    }else {
        res.status(400).json({ message: "Please provide username and password, password must be alphanumeric" })
    }
})

function createToken(user) {
    const payload = {
        sub: user.id,
        username: user.username,
        department: user.department 
    }

    const secret = process.env.JWT_SECRET || "secret";

    const options = {
        expiresIn: '1D'
    }

    return jwt.sign(payload, secret, options);
}

module.exports = router;