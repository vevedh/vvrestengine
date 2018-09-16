var express = require('express');
var path = require('path');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
var restful = require('node-restful');
var fs = require('fs-utils');
var email = require('mailer');
var mongoose = restful.mongoose;
//var Schema = mongoose.Schema;
var exec = require('child_process').exec;



//var https = require('https');

/**
 *  Connexion a la base
 */
mongoose.connect('mongodb://localhost:27017/dbveve');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


var PACKAGE_ROOT_PATH = path.dirname(path.dirname(__filename));
var PACKAGE_JSON_PATH = path.resolve(PACKAGE_ROOT_PATH, 'package.json');


/**
 *  Site web
 */
app.use(express.static('../portalvvdh/www'));

/**
 *  Download directory
 */
app.use('/api/downloads', express.static(__dirname + '/downloads'));


var router = express.Router();

app.use('/api/', router);




// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({
        "error": message
    });
}



/**
 *  test /api
 */
app.get('/api', function(req, res) {
    res.json({
        success: true,
        message: 'Herve de CHAVIGNY! welcome to your api v1!'
    });
});


/**  /api/mail
 * envoie d'un mail
 *  Params: mailto, mailfrom,subject,text,html
 */
app.post('/api/mail', function(req, res, next) {
    var mailto = req.body.mailto;
    var mailfrom = req.body.mailfrom;
    var subject = req.body.subject;
    var text = req.body.text;
    var html = req.body.html;
    email.send({
            host: "smtp.rvdechavigny.fr",
            port: "587",
            ssl: false,
            domain: "rvdechavigny.fr",
            to: mailto,
            from: mailfrom,
            subject: subject,
            text: text,
            html: html,
            authentication: "login", // auth login is supported; anything else $
            username: 'herve@rvdechavigny.fr',
            password: 'd@nZel77'
        },
        function(err, result) {
            if (err) {
                console.log(err);
                res.json({
                    error: err,
                    format: "?mailto=mailto&mailfrom=from&subject=untest&text=test&html=text"
                });
                //result.send("error occured");
            } else {
                console.log('Super! Email Envoyé');
                res.send("Email envoyé")
            }
        });
});

/* "/api/sitePath"
 * chemin de d'execution
 */
app.get("/api/sitePath", function(req, res) {

    res.json({
        "sucess": PACKAGE_ROOT_PATH
    });
});

/* "/api/jsonPath"
 * chemin du fichier package.json
 */
app.get("/api/jsonPath", function(req, res) {

    res.json({
        "sucess": PACKAGE_JSON_PATH
    });
});


app.post("/api/runCmd", function(req, res, next) {
    var cmd = req.body.cmd;
    // executes `pwd`


    child = exec(cmd, function(error, stdout, stderr) {
        //sys.print('stdout: ' + stdout);
        //sys.print('stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
            res.json({
                "error": error
            });
        } else {
            res.json({
                "sucess": stdout
            });
        }



    });
});

/*  "/api/contacts"
 *    GET: finds all contacts
 *    POST: creates a new contact
 *    PUT: update contact by id
 *    DELETE: deletes contact by id
 */





/*
var dbcajourSchema = mongoose.Schema({
    nommag: { type: String, require: true },
    nummag: { type: String, require: true },
    camag: { type: String, require: true },
    climag: { type: String, require: true },
    dtca: { type: Date, require: true }
});


var MyAppsSchema = mongoose.Schema({
    name: { type: String, required: true },
    uid: { type: String, required: true, unique: true },
    dtinst: { type: String },
    dtlast: { type: String },
    nom: { type: String },
    prenom: { type: String },
    email: { type: String },
    state: { type: String, required: true },
    version: { type: String, required: true },
    comment: { type: String }
});

var MyApps = restful.model('myapps', MyAppsSchema);
MyApps.methods(['get', 'put', 'post', 'delete']);
MyApps.register(app, '/vvapi/v2/myapps');

var ImeiSchema = mongoose.Schema({
    marque: { type: String, required: true },
    operateur: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    dtach: { type: String, required: true },
    dtvte: { type: String, required: true },
    nomcli: { type: String, required: true },
    prenomcli: { type: String, required: true },
    comment: { type: String }
});


var Imeis = restful.model('imeis', ImeiSchema);
Imeis.methods(['get', 'put', 'post', 'delete']);
Imeis.register(app, '/vvapi/v2/imeis');

var UsersSchema = mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String }
});

var Users = restful.model('users', UsersSchema);
Users.methods(['get', 'put', 'post', 'delete']);
Users.register(app, '/vvapi/v2/users');


var GaiaUsersSchema = mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: { type: String }
});

var GaiaUsers = restful.model('gaiausers', GaiaUsersSchema);
GaiaUsers.methods(['get', 'put', 'post', 'delete']);
GaiaUsers.register(app, '/vvapi/v2/gaiashop/gaiausers');


var GaiaPaniersSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    picname: { type: String, required: true },
    desc: { type: String },
    prix: { type: String }
});

var GaiaPaniers = restful.model('gaiaPaniers', GaiaPaniersSchema);
GaiaPaniers.methods(['get', 'put', 'post', 'delete']);
GaiaPaniers.register(app, '/vvapi/v2/gaiashop/paniers');


var GaiaReservationsSchema = mongoose.Schema({
    email: { type: String, required: true },
    resaname: { type: String, required: true },
    resadate: { type: String },
    resaqte: { type: String },
    etat: { type: String }
});

var GaiaReservations = restful.model('gaiaReservations', GaiaReservationsSchema);
GaiaReservations.methods(['get', 'put', 'post', 'delete']);
GaiaReservations.register(app, '/vvapi/v2/gaiashop/reservations');

*/
var raspbSchema = mongoose.Schema({
    uid: { type: String, unique: true },
    dtinst: { type: String },
    dtlast: { type: String },
    ip: { type: String }
});

var raspberryList = restful.model('raspblist', raspbSchema);

raspberryList.methods(['get', 'put', 'post', 'delete']);

raspberryList.register(app, '/api/raspblist');


/* table des appels
 equal equals / users ? gender = male or / users ? gender__equals = male both
 return all male users
 not equal ne / users ? gender__ne = male returns all users who are not male(female and x)
 greater than gt / users ? age__gt = 18 returns all users older than 18
 greater than or equal to gte / users ? age__gte = 18 returns all users 18 and older(age should be a number property)
 less than lt / users ? age__lt = 30 returns all users age 29 and younger
 less than or equal to lte / users ? age__lte = 30 returns all users age 30 and younger in in /users?gender__in=female,male	returns all female and male users
 nin nin / users ? age__nin = 18, 30 returns all users with age other than 18 or 30
 Regex regex / users ? username__regex = /^baugarten/i
 returns all users with a username starting with baugarten
 */
var appelsSchema = mongoose.Schema({
    enseigne: { type: String, uppercase: true },
    nummag: { type: String },
    description: { type: String },
    solution: { type: String },
    status: { type: String },
    userid: { type: String },
    creer_le: { type: Date, default: Date.now }
});

var appels = restful.model('appels', appelsSchema);
appels.methods(['get', 'put', 'post', 'delete']);
appels.register(app, '/api/appels');


app.set('port', process.env.PORT || 80);
app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});