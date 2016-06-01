var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
//--------
var expressJwt = require('express-jwt');//https://npmjs.org/package/express-jwt
var jwt = require('jsonwebtoken');//https://www.npmjs.com/package/jsonwebtoken
//---------

var secret = 'this is the secret secret secret 12356 cphbusiness';


var app = express();

// We are going to protect /api routes with JWT
app.use('/api', expressJwt({ secret: secret }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/app')));

app.use(function (err, req, res, next) {
    if (err.constructor.name === 'UnauthorizedError') {
        res.status(401).send('Unauthorized');
    }
});

// app.get('/', function (req, res, next) {
//     res.redirect("index.html");
// });

app.post('/authenticate', function (req, res) {
    //TODO validate req.body.username and req.body.password
    //if is invalid, return 401
    if (!(req.body.username === 'john.doe' && req.body.password === 'foobar')) {
        res.send(401, 'Wrong user or password');
        return;
    }

    var profile = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@doe.com',
        id: 123
    };

    // We are sending the profile inside the token
    var token = jwt.sign(profile, secret);//// sign with RSA SHA256
    var sysMessage = "The JWT was signed with the profile object and the secret: 'this is the secret secret secret 12356 cphbusiness'";
    res.json({ token: token, sysMessage: sysMessage });
});

app.get('/api/restricted', function (req, res) {
    console.log('user ' + req.user.email + ' is calling /api/restricted');
    var sysMessage = 'user ' + req.user.email + ' is calling /api/restricted';
    res.json({
        name: 'foo'
    });
});

app.listen(3000, function () {
    console.log('listening on http://localhost:3000');
});