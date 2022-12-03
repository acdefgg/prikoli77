//
// это костыль. Нужен потому, что на хостинге нет поддержки postgresql.
// Файл с postgres кодом называется database_postgres.js
//

const fs = require("fs");

function setFeedbackToDB(pic, feedback) {
    let file = require('./databased.json');
    if (!file[pic]) {
        file[pic] = [0, 0];
    }
    if (feedback == "like") {
        file[pic][0] += 1;
    } else if (feedback == "dislike") {
        file[pic][1] += 1;
    }
    fs.writeFileSync("databased.json", JSON.stringify(file));
    return getFeedbackOfDB(pic);
}

function getFeedbackOfDB(pic) {
    let file = require('./databased.json');
    if (!file[pic]) {
        return 0;
    }
    return [file[pic][0], file[pic][1]];
}

module.exports.setFeedbackToDB = setFeedbackToDB;
module.exports.getFeedbackOfDB = getFeedbackOfDB;
