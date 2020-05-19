const router = require('express').Router();

const bcryptjs = require('bcryptjs');

const Users = require('./users-model');

const restricted = require('../auth/restricted-middleware');

const { isValid } = require('../auth/users-service');

router.use(restricted);

router.get('/', (req, res) => {
    Users.find()
         .then(users => {
             res.status(200).json({ users, jwt: req.jwt })
         })
         .catch(error => {
             console.log({ error })
             res.status(500).json({ message: error.message })
         })
})

router.post('/', checkDepartment('Admin'), (req, res) => {
    const { username, password, department } = req.body;
    const user = { username, password, department };

    const rounds = process.env.BCRYPT_ROUNDS || 8;
    const hash = bcryptjs.hashSync(user.password, rounds);

    user.password = hash;

    if(isValid(user)) {
        Users.add(user)
             .then(saved => {
                 res.status(201).json({ data: saved })
             })
             .catch(error => {
                 console.log({ error })
                 res.status(500).json({ message: error.message })
             })
    }else {
        res.status(400).json({ message: "Please provide all user information" })
    }
})

function checkDepartment(departments) {
    return function(req, res, next) {
        const department = req.jwt.department;

        if(req.jwt && req.jwt.department && departments.includes(department)) {
            next();
        }else {
            res.status(403).json({ message: "You are not authorized to do this action" })
        }
    }
}

module.exports = router;