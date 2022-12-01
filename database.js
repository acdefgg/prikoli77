//
// сейчас всё на костылях через жсон файл, поэтому надо переписать всё с нормальной базой данных
//

const fs = require("fs");
const file = require("./databased.json");

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