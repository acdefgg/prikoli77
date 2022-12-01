const express = require('express');
const prikoli = require('./prikols');
const app = express();
const database = require('./database');
const port = 3000;


app.use(express.static(__dirname));
app.use('/prikoli', express.static('./prikoli'));

app.get('/', (req, res) => res.sendFile(__dirname + "/index.html"));

app.post('/feedback',
    express.json(),
    async function (req, res) {
        let feedback = await database.setFeedbackToDB(req.body.picName, req.body.vote);
        res.send(feedback);
            //.then(() => {res.send(database.getFeedbackOfDB(req.body.picName))});
});

app.get('/getPrikol', async (req, res) => {
    let badLink = await prikoli.getRandomPrikol();
    let link = '/prikoli/' +badLink;
    let feedback = await database.getFeedbackOfDB(link);
    res.send([link, feedback[0],feedback[1]]); // пример ответа: ['/prikoli/prikol1', 3, 1]
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));