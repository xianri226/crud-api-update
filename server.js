const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./DB.js');
const businessRoute = require('./business.route');

const User = require('./user.model');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => { console.log('Database is connected') },
    err => { console.log('Can not connect to the database' + err) }
);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/business', businessRoute);

app.route('/login').post(function (req, res) {

    // const user = new User(req.body);
    // console.log(user);

    var str = { username: req.body.username,
            password: req.body.password };

    User.find(str, function (err, user) {
        if (err) {
            console.log(err);
            res.status(400).json({ 'result': 'fail' });
        }
        else {
            //res.json(user);
            if (user.length >= 1) {
                res.status(200).json({ 'result': 'success', 'permission': user[0].permission });
            }
            else
                res.status(200).json({ 'result': 'fail' });
        }
    });

    //res.status(200).json({ 'result': 'success' });

});

app.route('/register').post(function (req, res) {
    const user = new User(req.body);
    console.log(req.body);
    user.save()
        .then(user => {
            res.status(200).json({ 'user': 'User in added successfully' });
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});

app.listen(PORT, function () {
    console.log('Server is running on Port:', PORT);
});