const firebase = require('firebase/app');

async function createUser(data) {
    return new Promise((resolve, reject) => {
        const service = firebase.firestore();
        let ref = service.collection('users');
        ref.add(data)
        .then((docRef) => {
            ref.doc(docRef.id)
            .update({
                userId: docRef.id
            })
            resolve(docRef.id)
        })
        .catch(error => {
            reject(error);
        })
    })
}

async function logIn(username) {
    return new Promise(async (resolve, reject) => {
        let userFound = false;
        const service = firebase.firestore();
        const ref = service.collection('users')
        const result = await ref.get();
        result.forEach(d => {
            if (username === d.data().username) {
                // user found
                userFound = true;
                resolve(d.data());
            }
        });
        if(userFound === false){
            reject('Invalid credentials');
        }
    })
}

async function addNewFriend(data) {
    return new Promise(async (resolve, reject) => {
        const service = firebase.firestore();
        const ref = service.collection('users')
        .doc(data.userId)
        .collection('friends')

        ref.add(data)  
            .then((docRef) => {
                resolve('friend saved with id: ' + docRef.id);
            })
            .catch((error)=> {
                console.error(error)
                reject('failed to save friend')
            })
    })
}

async function getCurrentFriends(userId) {
    return new Promise(async (resolve, reject) => {
        const service = firebase.firestore();
        const ref = service.collection('users')
        .doc(userId)
        .collection('friends')

        ref.get()  
            .then((data) => {
                resolve(data);
            })
            .catch((error)=> {
                console.error(error)
                reject('failed to get friends')
            })
    })
}




module.exports = {
    createUser,
    logIn,
    addNewFriend,
    getCurrentFriends
}