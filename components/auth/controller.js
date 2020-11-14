const db = require('../../storage/firebase');
const bcrypt = require('bcrypt');

class UserAuthentication  {
    constructor(){}

    createUserInFirebase(data) {
        return new Promise(async(resolve, reject) => {
            if (!data.username || !data.name) {
                reject('Incomplete information');
            } else {
                // create user in firebase
                const userFirebase = await db.createUser(data);
                resolve(userFirebase);
            }
        })
    }

    getUserInfo(cookie) {
        return new Promise(async(resolve, reject) => {
            if (!cookie) {
                reject('Incomplete information');
            } else {
                // create user in firebase
                const userFirebase = await db.getUserInfo(cookie);
                resolve(userFirebase);
            }
        })
    }
}

module.exports = UserAuthentication;