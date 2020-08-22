const db = require('../../storage/firebase');
const bcrypt = require('bcrypt');

class UserAuthentication  {
    constructor(){}

    createUserInFirebase(data) {
        return new Promise((resolve, reject) => {
            if (!data.username || !data.name || !data.password) {
                reject('Incomplete information');
            } else {
                // create user in firebase
                bcrypt.hash(data.password, 5) // encrypt password
                    .then(async (pass) => {
                        data.password = pass;
                        const userFirebase = await db.createUser(data);
                        resolve(userFirebase);
                    })
                    .catch((error) => {
                        console.error(error);
                        reject('error encrypting password')
                    })
            }
        })
    }


    logIn(data) {
        return new Promise((resolve, reject) => {
            if (!data.username || !data.password) {
                reject('Invalid credentials');
            } else {
                db.logIn(data.username)
                    .then(async (result) => {
                        const passMatch = await bcrypt.compare(data.password, result.password)
                        if (passMatch) {
                            //passwords match
                            resolve(result); 
                        } else {
                            reject('Invalid credentials')
                        }       
                    })
                    .catch(error => {
                        reject(error);
                    })
            }
        })
    }


}

module.exports = UserAuthentication;