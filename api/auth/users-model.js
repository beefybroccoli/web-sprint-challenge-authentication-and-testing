const db = require("../../data/dbConfig");

async function getBy(filter){
    return await db('users').where({...filter});
}

async function getById(id){
    return await db('users').where('id', id);
}

async function addUser(user){
    return await db('users').insert(user);
}

async function modifyUser(id, user){
    return await db('users').where("id", id).update({...users});
}

async function removeUserById(id){
    return await db('users').where('id', id);
}

module.exports = {getBy, getById, add: addUser, modify: modifyUser, removeById: removeUserById}