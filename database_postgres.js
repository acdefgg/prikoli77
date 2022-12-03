const pg = require('pg-promise')(/* options */);
const db = pg('postgres://postgres:123@localhost:4000/test1');

//db.any('SELECT true FROM users WHERE name = ? OR email = ? LIMIT 1;', ['AAA'])



// db.any(`UPDATE feedback SET likes = likes + 1 WHERE pic = $1;`, ['AAA'])
//     .then(function(data) {
//         console.log(data);
//     })
//     .catch(function(error) {
//         console.log(error);
//     });


// db.any('SELECT * FROM feedback WHERE pic = $1', ['AAaA'])
//     .then(function(data) {
//         if (data.length == 0){
//
//             console.log(data[0].likes, data[0].dislikes);
//         }
//     })
//     .catch(function(error) {
//         console.log(error);
//     });

// setFeedbackToDB('asd', 'like').then((res)=>{
//     console.log(res);
// });

// async function setFeedbackToDB(pic, feedback) {
//     const data = await db.any('SELECT * FROM feedback WHERE pic = $1', [pic]);
//     //console.log(data + '*');
//     return data;
// }

//(async ()=> { console.log( await setFeedbackToDB('bb', 'like'))})();

// async function setFeedbackToDB(pic, feedback) {
//     await db.any('SELECT * FROM feedback WHERE pic = $1', [pic])
//         .then(async function(data) {
//             console.log(data);
//             return data;
//             console.log('***')
//             if (data.length === 0){
//                 if (feedback === 'like'){
//                     await db.any(`INSERT INTO feedback (pic, likes, dislikes) VALUES ($1, 1, 0);`, [pic])
//                         .then(async () => {
//                             //console.log('[1, 0] *');
//                             return [1, 0];
//                         });
//                 } else {
//                     await db.any(`INSERT INTO feedback (pic, likes, dislikes) VALUES ($1, 0, 1);`, [pic])
//                         .then(async () => {
//                             //console.log('[0, 1] *');
//                             return [0, 1];
//                         });
//                 }
//
//             } else {
//                 if (feedback == 'like') {
//                     await db.any(`UPDATE feedback SET likes = likes + 1 WHERE pic = $1;`, [pic])
//                         .then(async function () {
//                             //console.log(data);
//                             return [data[0].likes+1, data[0].dislikes];
//                         })
//                         .catch(function (error) {
//                             console.log(error);
//                         });
//                 } else {
//                     await db.any(`UPDATE feedback SET dislikes = dislikes + 1 WHERE pic = $1;`, [pic])
//                         .then(function () {
//                             //console.log(data);
//                             return [data[0].likes, data[0].dislikes+1];
//                         })
//                         .catch(function (error) {
//                             console.log(error);
//                         });
//                 }
//             }
//         })
//         .catch(function(error) {
//             console.log(error);
//         });
// }
//
// function getFeedbackOfDB(pic) {
//     db.any('SELECT * FROM feedback WHERE pic = $1', [pic])
//         .then(function(data) {
//             if (data.length == 0){
//                 db.any(`INSERT INTO feedback (pic, likes, dislikes) VALUES ($1, 0, 0);`, [pic])
//                     .then(() => {
//                         console.log('Добавили');
//                         return [0, 0];
//                     });
//             } else {
//                 //console.log(data[0].likes, data[0].dislikes);
//                 return [data[0].likes, data[0].dislikes];
//             }
//         })
//         .catch(function(error) {
//             console.log(error);
//         });
// }

function _getFeedbackOfDB(pic){
    return db.oneOrNone('SELECT * FROM feedback WHERE pic = $1', [pic]);
}

function _createPictureToDB(pic){
    return db.none(`INSERT INTO feedback (pic, likes, dislikes) VALUES ($1, 0, 0);`, [pic]);
}

function _setLikeToDB(pic){
    return db.none(`UPDATE feedback SET likes = likes + 1 WHERE pic = $1;`, [pic]);
}

function _setDislikeToDB(pic){
    return db.none(`UPDATE feedback SET dislikes = dislikes + 1 WHERE pic = $1;`, [pic]);
}

// db.oneOrNone('SELECT * FROM feedback WHERE pic = $1', 'bb').then(console.log);

// _setLikeToDB('bb')
//     .then(function (res){
//         return _getFeedbackOfDB('bb')
//     })
//     .then((res)=>{console.log(res)});

async function getFeedbackOfDB(pic) {
    let res = await _getFeedbackOfDB(pic);
    if (!res) {
        _createPictureToDB(pic)
        return [0, 0];
    }
    return [res.likes, res.dislikes];
}

async function setFeedbackToDB(pic, feedback){
    let data = await _getFeedbackOfDB(pic);
    if (data == null){
        await _createPictureToDB(pic);
        data = {
            likes: 0,
            dislikes: 0,
        }
    }

    if (feedback === 'like'){
        await _setLikeToDB(pic);
        data.likes+=1
    } else {
        await _setDislikeToDB(pic);
        data.dislikes+=1
    }
    return [data.likes, data.dislikes];
}

//setFeedbackToDB('asddd', 'like').then(console.log);




//getFeedbackOfDB('bb').then(console.log);
//getFeedbackOfDB('bb').then((res)=>{console.log(res)});

module.exports.setFeedbackToDB = setFeedbackToDB;
module.exports.getFeedbackOfDB = getFeedbackOfDB; // возвращает промис, then которого возвращает [лайки, дизлайки]