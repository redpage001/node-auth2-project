const db = require('../../data/dbConfig');

module.exports = {
    add,
    find,
    findBy,
    findById
}

function add(user) {
    return db('users')
        .insert(user, 'id')
        .then(([id]) => {
            return findById(id)
        })
}

function find(department) {
    return db('users')
        .select('username', 'password', 'department')
        .where({ department: department })
}

function findBy(filter) {
    return db('users')
        .where(( filter ))
}

function findById(id) {
    return db('users')
        .where({ id: id })
        .first()
}
