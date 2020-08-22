const db = require('../../storage/firebase');

class Lists  {
    constructor(){}

    async addNewFriend(data) {
        return new Promise(async (resolve, reject) => {
            if (!data) {
                reject('Incomplete information');
            } else {
                // create friend in firebase
                db.addNewFriend(data)
                    .then(() => {
                        resolve(data);
                    }) 
                    .catch(() => {
                        reject('failed to save friend')
                    })            
            }
        })
    }

    async getFriends(userId) {
        return new Promise((resolve, reject) => {
            if(!userId) {
                reject('Incomplete information'); 
            } else {
                db.getCurrentFriends(userId)
                    .then((data) => {
                        let rta = [];
                        data.forEach(element => {
                            const el = element.data();
                            rta.push(el);
                        });
                        resolve(rta);
                    })
                    .catch((error) => {
                        reject(error);
                    })
            }
        })
    }
}

module.exports = Lists;