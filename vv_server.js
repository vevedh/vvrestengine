var http = require('http');
var https = require('https');
var express = require('express'),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    path = require('path'),
    methodOverride = require('method-override'),
    config = require('./config'),
    request = require('request');

var admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.cert({
        project_id: "prohhhgd-613f5",
        private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC/r7gdN9NiAaLR\nX/AsKLQOBPPy5U6s1SKjyZdDikFk61hxheH5P8o/BfHNIFs2SwDJSnr7ZM/NWpoD\n1U0ErrHw4tkPKcR15QWnALjcslCmJ3kdkfts/ogZ2cwv4OSQlfdbGn/tJByTVJiI\nkyiyOBt3IHbxf/AJNGGYjnY/WWw/hjY4NMXsiyraVHcXVQMiNcaG+7DrbhrgdHuB\nAXObhAQx7y4gJ8kFHuqm40V/D8V92L9G/5Tu52svEzaT9Uhkx3xKladEPC7hEq4w\nHFDKvZ/nvoN034dfRO28Qzl/iPA9Jt5hz93Flp6zXfoTdU/rE1MO0ZNGS5lwtBaq\nIcJYQvTRAgMBAAECggEAW7jaCUUexV1SCwz0sDSz36d4Eciu6l28SxJZ6qwb2Y4R\nzpSJSkq/XIPcLdLnQmYGVMtqaKPXGYTagK4OwghTxhfOVIagZud1WnGqg5Rhqffm\naQNjA0cSWghRP7HFvPe9ml7mStOGRutqZ6O/C/R0E/85WxrkgYsKjkTRCUQhW41o\ng6c5GDYy8MVSZ0YhKhL26tl9eCqoZY/abz339j2Q9blxTbs5hzmQy3BvB86tAhbJ\nJnQndax89b1K38Lk1S5Xcy/rU9TJ+HOytHSHsnKqAlz0sTd4IROa30UBWXfmHHU+\nwFQvaQXtrPsTjq6WeFNFvDtFQ5dDxMR20K9QKhPOzwKBgQD1dEoChtILK42BKXpy\nt0OTr5buzxbvu82EGdRMG04sHidJC2jWxK95INnFc8AxRv/GEF9I/SpFB4lcPoKi\nsLlSf3pxqgHJDy/Hjee85U2TVmlgQvQvx3uP6wGh4FJ28PyDf/XFnJjK7CHDg2qG\nsc7RDoW8aL7ZkGQNrKilov4ZZwKBgQDH7AveLpbZN28y2xgRUfgYwscWe3Fpz8/k\nxPEipmovpMWOSVFjJ+yI+ybCDjYVBKotz/C+WPcmHJ0iRfSi5xZdzE2kiXBrreFb\nU/56R5l9rOeb1yUl/u7qGBli9tMMDl6l5Bfin3S4rjyhEHWWJFfE06FTkQahUgO8\nOn9cyZzFBwKBgBZIzodYMi2tcJVvbJyJour/oBZiWtS9GjWKGsomGHzM6AgrrwMA\nrGW049CXZ7WRmpsi1WPNCE9oFcJ4MmgO32RsCnPTWYIljNLzQTzXHKnpyHti2MSV\nudQhI+7MbPA7hNFzhp7ATubtdUtI3R0Je5tjVCT85YbfIxZSvKT9HVC1AoGAZJEJ\n20cmXLg0+Kkbr0LDgXkhet63y1ldI6AqCJsb2UGSmyOojC9+Hd3wvjc131bMYGU0\nnhvUn1hPdvknuXZzWtW1zOnSImiCb1WOMmaoAH8kttD//+AAwMNEqfKtcWgdFmfp\n1/cMWQZUu1SzQcagXAN1KLtQUYAXHu1yOfO1J6sCgYAfo7s3l5K5VWQH0knNrwdq\nzmAPorq323B//+L6IXoHoyoZXZ2FETt3ehrWauA0dPGhT7xYthzBFfF2IQKj+v0t\nsZbk2mLPueNJln1QUsMpjPrVgres8chlCS18bSQQloAtZ3KoNUe7S4NJrS9sTaqs\nuAvRXXTYVWjqCYqV/T6TmQ==\n-----END PRIVATE KEY-----\n",
        clientEmail: "firebase-adminsdk-umtia@prohhhgd-613f5.iam.gserviceaccount.com"
    }),
    databaseURL: 'https://prohhhgd-613f5.firebaseio.com'
});

var db = admin.firestore();


var fs = require('fs');


var email = require('mailer');

var port = process.env.PORT || 3000;

function sendMail() {
    email.send({
            host: "smtp.rvdechavigny.fr",
            port: "587",
            ssl: false,
            domain: "rvdechavigny.fr",
            to: "herve.de-chavigny@hdistribution.fr",
            from: "herve@rvdechavigny.fr",
            subject: "Mailer library Mail node.js",
            text: "Mail by Mailer library",
            html: "<span> Hello World Mail sent from  mailer library",
            authentication: "login", // auth login is supported; anything else $
            username: 'herve@rvdechavigny.fr',
            password: 'd@nZel77'
        },
        function(err, result) {
            if (err) {
                console.log(err);
                //result.send("error occured");
            } else {
                console.log('hurray! Email Sent');
                //res.send("Email Sent")
            }
        });
}
/*

*/




var app = express();



//var httpsServer = https.createServer(credentials, app);
//

app.set('superSecret', config.secret);
app.timeout = 640000;
//app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ 'type': 'application/vnd.api+json' }));
app.use(bodyParser.json({ 'limit': '150mb' }));
app.use(bodyParser.text({ 'limit': '150mb' }));
app.use(bodyParser.raw({ 'limit': '150mb' }));
app.use(bodyParser.urlencoded({ 'limit': '150mb', 'extended': 'true' }));
app.use(bodyParser.text({
    'type': 'application/text-enriched',
    'limit': '150mb'
}));
//app.use(bodyParser.({ keepExtensions: true, uploadDir: __dirname + '/public/uploads' }));
app.use(methodOverride());





app.all('/vvapi/*', function(req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    // If someone calls with method OPTIONS, let's display the allowed methods on our API
    if (req.method == 'OPTIONS') {
        res.status(200);
        res.write("Allow: GET,PUT,POST,DELETE,OPTIONS");
        res.end();
    } else {
        next();
    }
});



app.use('/vvapi/v2/gaiashop/uploads', express.static(__dirname + '/gaiashop/uploads'));
app.use('/vvapi/v2/apk/downloads', express.static(__dirname + '/apk/downloads'));
app.use('/vvapi/v2/immersion2017', express.static(__dirname + '/immersion2017'));

var router = express.Router();

app.use('/vvapi/v2', router);




//mongoose.connect('mongodb://localhost:27017/dbtest');



router.post("/gaiashop/upload", multer({
    dest: './gaiashop/uploads/'
}).any(), function(req, res) {
    console.log((req.files));
    var file = req.files[0];
    fs.rename(file.path, path.join('./gaiashop/uploads/', file.originalname));
    if (req.file) {
        console.dir(req.file);
        return res.end('Thank you for the file');
    }
    res.end(file.originalname);
});

/*
router.post("/gaiashop/upload", function(req, res) {
    // create an incoming form object
    var form = new formidable.IncomingForm();

    // specify that we want to allow the user to upload multiple files in a single request
    form.multiples = true;

    // store all uploads in the /uploads directory
    form.uploadDir = './gaiashop/uploads';

    // every time a file has been uploaded successfully,
    // rename it to it's orignal name
    form.on('file', function(field, file) {
        fs.rename(file.path, path.join(form.uploadDir, file.name));
        //.join(
    });

    // log any errors that occur
    form.on('error', function(err) {
        console.log('An error has occured: \n' + err);
    });

    // once all the files have been uploaded, send a response to the client
    form.on('end', function() {
        res.end('success');
    });

    // parse the incoming request containing the form data
    form.parse(req);
});
*/

/** firestore functions */

router.get('/appels', function(req, res) {
    db.collection('Appels').get().then(function(appelsSnapshot) {
        var appels = [];
        appelsSnapshot.forEach(function(doc) {
            appels.push({
                id: doc.id,
                data: doc.data()
            });
        });
        res.json(appels);
    });

});

/** param { donnees: { dateapel:,enseigne:,heure:,incident:,numero:,solution:,status:,technicien:} } */
router.post('/appels/add', function(req, res) {
    var donnees = req.body.donnees;
    if (!donnees) throw new Error('Json data is blank');
    var data = donnees;
    var ref = db.collection('Appels').add(data);
    res.json({
        id: ref.id,
        data: data
    });
});

/********************* */

router.get('/gaiashop/uploads', function(req, res) {
    res.end();
});


router.get('/apk/downloads', function(req, res) {
    res.end();
});


router.post('/gaiashop/mail', function(req, res, next) {
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

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({
        success: true,
        message: 'Herve de CHAVIGNY! welcome to your api v2!'
    });
});


router.get('/gaiashop/paniers_test', function(req, res) {


    res.json([{
            "name": "Gourmandise",
            "picname": "gourmandise",
            "desc": "",
            "prix": "3.99"
        },
        {
            "name": "Gourmandise 2",
            "picname": "gourmandise2",
            "desc": "",
            "prix": "3.99"
        },
        {
            "name": "Gourmandise 3",
            "picname": "gourmandise3",
            "desc": "",
            "prix": "3.99"
        },
        {
            "name": "Gourmandise 4",
            "picname": "gourmandise4",
            "desc": "",
            "prix": "3.99"
        },
        {
            "name": "Gourmandise 5",
            "picname": "gourmandise5",
            "desc": "",
            "prix": "3.99"
        }
    ]);

});


router.post('/mail', function(req, res, next) {
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

router.post('/ics', function(req, res, next) {
    var mailto = req.body.mailto;
    var datej = req.body.datej;
    var text = req.body.text;
    var datedeb = req.body.datedeb;
    var datefin = req.body.datefin;

    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
        host: 'smtp.rvdechavigny.fr',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'herve@rvdechavigny.fr', // generated ethereal user
            pass: 'd@nZel77' // generated ethereal password
        }
    });



    var ical = require('ical-generator'),
        cal = ical({
            domain: 'localhost'
        }),
        event;

    // overwrite domain
    cal.domain('hdistribution.fr');

    event = cal.createEvent({
        start: new Date(2017, 11, datej, datedeb.split(':')[0], datedeb.split(':')[1]),
        end: new Date(2017, 11, datej, datefin.split(':')[0], datefin.split(':')[1]),
        summary: text,
        description: text,
        organizer: 'IMMERSION 2017 <immersion2017@hdistribution.fr>',
        url: 'http://mail.hdistribution.fr/'
    });

    // update event's description
    //event.description('It still works ;)');

    content = cal.toString();


    var fs = require('fs');
    fs.writeFile(__dirname + '/immersion2017/invitation.ics', content, function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });

    var message = {
        from: 'herve@rvdechavigny.fr',
        to: mailto,
        subject: 'Rendez-vous Immersion 2017',
        text: "Veuillez acceptez l'invitation en piece jointe",
        icalEvent: {
            filename: 'invitation.ics',
            method: 'request',
            content: content
                //path: __dirname + '/immersion2017/invitation.ics'
        }
    };

    transporter.sendMail(message, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });




    res.json({
        ok: true,
        message: cal.toString()
    });

});


router.post('/rstorkarte', function(req, res, next) {
    request({
        url: "http://3hservices.hhhgd.com/Amfphp/?contentType=application/json",
        method: "POST",
        header: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            'serviceName': 'vvproxy_tests',
            'methodName': 'restartOrkarte',
            'parameters': []
        })

    }, function(error, response, body) {

        res.json(JSON.parse(body));
    });
});


// authentification active directory
router.post('/adauth', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    request({
        url: "http://3hservices.hhhgd.com/Amfphp/?contentType=application/json",
        method: "POST",
        header: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            'serviceName': 'vvproxy_tests',
            'methodName': 'adldapTest',
            'parameters': [username, password]
        })

    }, function(error, response, body) {

        res.json(body);
    });

});

// liste des imprimantes AS400
router.post('/printers', function(req, res, next) {
    var imp = req.body.imprimante;
    var impquery = '';
    if (String(imp).length >= 10) {
        impquery = String(imp).substr(0, 9) + '*';
    } else {
        impquery = String(imp).replace('*', '') + '*';
    }
    request({
        url: "http://3hservices.hhhgd.com/Amfphp/?contentType=application/json",
        method: "POST",
        header: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            'serviceName': 'vvproxy_tests',
            'methodName': 'lstOutqArr',
            'parameters': [impquery]
        })

    }, function(error, response, body) {

        res.json(JSON.parse(body));
    });
});

// recuperation des mails de GLPI
router.post('/glpimail', function(req, res, next) {
    request({
        url: "http://3hservices.hhhgd.com/Amfphp/?contentType=application/json",
        method: "POST",
        header: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            'serviceName': 'vvproxy_tests',
            'methodName': 'getMailSupport',
            'parameters': []
        })

    }, function(error, response, body) {

        res.json(JSON.parse(body));
    });
});

// ca du jour
router.post('/cajour', function(req, res, next) {
    var ensnom = req.body.enseigne;
    var annee = req.body.annee;
    var mois = req.body.mois;
    var jour = req.body.jour;
    request({
        url: "http://3hservices.hhhgd.com/Amfphp/?contentType=application/json",
        method: "POST",
        header: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            'serviceName': 'vvproxy_tests',
            'methodName': 'vv_ork_ca',
            'parameters': [ensnom, annee, mois, jour]
        })

    }, function(error, response, body) {

        res.json(JSON.parse(body));
    });
});


// evolution ca en mois
router.post('/caevomois', function(req, res, next) {
    var ensnom = req.body.enseigne;
    request({
        url: "http://3hservices.hhhgd.com/Amfphp/?contentType=application/json",
        method: "POST",
        header: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            'serviceName': 'vvproxy_tests',
            'methodName': 'ork_ca_evo_mois',
            'parameters': [ensnom]
        })

    }, function(error, response, body) {

        res.json(JSON.parse(body));
    });
});

// reset des imprimantes en MSGW sur AS400
router.post('/rstedtmsgw', function(req, res, next) {
    request({
        url: "http://3hservices.hhhgd.com/Amfphp/?contentType=application/json",
        method: "POST",
        header: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            'serviceName': 'vvproxy_tests',
            'methodName': 'autoEdtMsgw',
            'parameters': []
        })

    }, function(error, response, body) {

        res.json(JSON.parse(body));
    });
});

// obtenir l'ip d'une imprimante AS400
router.post('/ipimp', function(req, res, next) {
    var imp = req.body.imprimante;
    request({
        url: "http://3hservices.hhhgd.com/Amfphp/?contentType=application/json",
        method: "POST",
        header: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            'serviceName': 'vvproxy_tests',
            'methodName': 'getIpImp',
            'parameters': [imp]
        })

    }, function(error, response, body) {

        res.json(JSON.parse(body));
    });
});

// deblocage utilisateur AS400
router.post('/dblquser', function(req, res, next) {
    var user = req.body.user;
    request({
        url: "http://3hservices.hhhgd.com/Amfphp/?contentType=application/json",
        method: "POST",
        header: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            'serviceName': 'vvproxy_tests',
            'methodName': 'debloqUser',
            'parameters': [user]
        })

    }, function(error, response, body) {

        res.json(JSON.parse(body));
    });
});

// deblocage imprimantes ECOMAX
router.post('/dblqecomax', function(req, res, next) {
    //var user = req.body.user;
    request({
        url: "http://3hservices.hhhgd.com/Amfphp/?contentType=application/json",
        method: "POST",
        header: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            'serviceName': 'vvproxy_tests',
            'methodName': 'debloqEcomax',
            'parameters': []
        })

    }, function(error, response, body) {

        res.json(JSON.parse(body));
    });
});


// deblocage device AS400
router.post('/dblqdev', function(req, res, next) {
    var dev = req.body.device;
    request({
        url: "http://3hservices.hhhgd.com/Amfphp/?contentType=application/json",
        method: "POST",
        header: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            'serviceName': 'vvproxy_tests',
            'methodName': 'debloqDevice',
            'parameters': [dev]
        })

    }, function(error, response, body) {

        res.json(JSON.parse(body));
    });
});

// verification ping ip
router.post('/chkIp', function(req, res, next) {
    var ipval = req.body.ipval;
    request({
        url: "http://3hservices.hhhgd.com/Amfphp/?contentType=application/json",
        method: "POST",
        header: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            'serviceName': 'vvproxy_tests',
            'methodName': 'chkIp',
            'parameters': [ipval]
        })

    }, function(error, response, body) {

        res.json(JSON.parse(body));
    });
});


// demarrage editeur AS400
router.post('/startedt', function(req, res, next) {
    var imp = req.body.imprimante;
    request({
        url: "http://3hservices.hhhgd.com/Amfphp/?contentType=application/json",
        method: "POST",
        header: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            'serviceName': 'vvproxy_tests',
            'methodName': 'startEditeur',
            'parameters': [imp]
        })

    }, function(error, response, body) {

        res.json(JSON.parse(body));
    });
});


// stop editeur imprimante AS400
router.post('/stopedt', function(req, res, next) {
    var imp = req.body.imprimante;
    request({
        url: "http://3hservices.hhhgd.com/Amfphp/?contentType=application/json",
        method: "POST",
        header: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            'serviceName': 'vvproxy_tests',
            'methodName': 'stopEditeur',
            'parameters': [imp]
        })

    }, function(error, response, body) {

        res.json(JSON.parse(body));
    });
});


router.post('/infmag', function(req, res, next) {
    var num = req.body.num;
    request({
        url: "http://3hservices.hhhgd.com/Amfphp/?contentType=application/json",
        method: "POST",
        header: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            'serviceName': 'vvproxy_tests',
            'methodName': 'query_AS400JSON',
            'parameters': ["select * from vvbase/vvinfmag where NUMMAG='" + num + "' "]
        })

    }, function(error, response, body) {

        res.json(JSON.parse(body));
    });
});


router.post('/initmag', function(req, res, next) {
    var nummag = req.body.num;
    var ipcaisse = req.body.ipcaisse;
    request({
        url: "http://3hservices.hhhgd.com/Amfphp/?contentType=application/json",
        method: "POST",
        header: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            'serviceName': 'vvproxy_tests',
            'methodName': 'query_update',
            'parameters': ["insert into vvbase/vvinfmag (nummag,ipork) values ('" + nummag + "','" + ipcaisse + "')"]
        })

    }, function(error, response, body) {

        res.json(JSON.parse(body));
    });
});


// maj des tables vvorika
router.post('/migmagdsc', function(req, res, next) {
    var nummag = req.body.num;
    request({
        url: "http://3hservices.hhhgd.com/Amfphp/?contentType=application/json",
        method: "POST",
        header: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            'serviceName': 'vvproxy_tests',
            'methodName': 'query_update',
            'parameters': ["update hhhpgm/vvorika set stip='10.30." + nummag + ".2' where mag='0" + nummag + "' "]
        })

    }, function(error, response, body) {

        res.json(JSON.parse(body));
    });
});


// maj des tables vvmobmagip
router.post('/migmagmob', function(req, res, next) {
    var nummag = req.body.num;
    request({
        url: "http://3hservices.hhhgd.com/Amfphp/?contentType=application/json",
        method: "POST",
        header: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            'serviceName': 'vvproxy_tests',
            'methodName': 'query_update',
            'parameters': ["update vvbase/vvmobmagip set ipmag='10.30." + nummag + ".2' where nummag='" + nummag + "' "]
        })

    }, function(error, response, body) {

        res.json(JSON.parse(body));
    });
});



router.post('/infmag', function(req, res, next) {
    var nummag = req.body.num;
    var chp = req.body.champ;
    var valdata = req.body.valdata;
    request({
        url: "http://3hservices.hhhgd.com/Amfphp/?contentType=application/json",
        method: "POST",
        header: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            'serviceName': 'vvproxy_tests',
            'methodName': 'query_update',
            'parameters': ["update  vvbase/vvinfmag  set " + chp + "='" + valdata + "' where nummag='" + nummag + "'"]
        })

    }, function(error, response, body) {

        res.json(JSON.parse(body));
    });
});


router.post('/orknbcai', function(req, res, next) {
    var ipm = req.body.ipmagasin;
    request({
        url: "http://3hservices.hhhgd.com/Amfphp/?contentType=application/json",
        method: "POST",
        header: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            'serviceName': 'vvproxy_tests',
            'methodName': 'testnbcaisses',
            'parameters': [ipm]
        })

    }, function(error, response, body) {

        res.json(JSON.parse(body));
    });
});

router.post('/orkdossh', function(req, res, next) {
    var ipmag = req.body.ipmag;
    var puser = req.body.puser;
    var ppasswd = req.body.ppasswd;
    var cmd = req.body.cmd;
    //var ipmag = '10.30.' + nummag + '.2';
    request({
        url: "http://3hservices.hhhgd.com/Amfphp/?contentType=application/json",
        method: "POST",
        header: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            'serviceName': 'vvproxy_tests',
            'methodName': 'ssh2Exec',
            'parameters': [ipmag, puser, ppasswd, cmd]
        })

    }, function(error, response, body) {

        res.json(JSON.parse(body));
    });
});


router.post('/orkcaisse', function(req, res, next) {
    var ipm = req.body.ipmagasin;
    var cnum = req.body.numcaisse;
    request({
        url: "http://3hservices.hhhgd.com/Amfphp/?contentType=application/json",
        method: "POST",
        header: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            'serviceName': 'vvproxy_tests',
            'methodName': 'testorkaisse',
            'parameters': [ipm, '1', cnum]
        })

    }, function(error, response, body) {

        res.json(JSON.parse(body));
    });
});


router.post('/orksrv', function(req, res, next) {
    var ipm = req.body.ipmagasin;
    var cnum = req.body.numcaisse;
    request({
        url: "http://3hservices.hhhgd.com/Amfphp/?contentType=application/json",
        method: "POST",
        header: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            'serviceName': 'vvproxy_tests',
            'methodName': 'testorkaisse',
            'parameters': [ipm, '2', cnum]
        })

    }, function(error, response, body) {

        res.json(JSON.parse(body));
    });
});


router.post('/orkatos', function(req, res, next) {
    var ipm = req.body.ipmagasin;
    var cnum = req.body.numcaisse;
    request({
        url: "http://3hservices.hhhgd.com/Amfphp/?contentType=application/json",
        method: "POST",
        header: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            'serviceName': 'vvproxy_tests',
            'methodName': 'testorkaisse',
            'parameters': [ipm, '3', cnum]
        })

    }, function(error, response, body) {

        res.json(JSON.parse(body));
    });
});


router.post('/orktpe', function(req, res, next) {
    var ipm = req.body.ipmagasin;
    var cnum = req.body.numcaisse;
    request({
        url: "http://3hservices.hhhgd.com/Amfphp/?contentType=application/json",
        method: "POST",
        header: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            'serviceName': 'vvproxy_tests',
            'methodName': 'testorkaisse',
            'parameters': [ipm, '4', cnum]
        })

    }, function(error, response, body) {

        res.json(JSON.parse(body));
    });
});


router.post('/orktpedblq', function(req, res, next) {
    var ipm = req.body.ipmagasin;
    var cnum = req.body.numcaisse;
    request({
        url: "http://3hservices.hhhgd.com/Amfphp/?contentType=application/json",
        method: "POST",
        header: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            'serviceName': 'vvproxy_tests',
            'methodName': 'testorkaisse',
            'parameters': [ipm, '5', cnum]
        })

    }, function(error, response, body) {

        res.json(JSON.parse(body));
    });
});

// reset des cles ssh
router.post('/orkrstssh', function(req, res, next) {
    var ipm = req.body.ipmagasin;
    var cnum = req.body.numcaisse;
    request({
        url: "http://3hservices.hhhgd.com/Amfphp/?contentType=application/json",
        method: "POST",
        header: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            'serviceName': 'vvproxy_tests',
            'methodName': 'testorkaisse',
            'parameters': [ipm, '7', cnum]
        })

    }, function(error, response, body) {

        res.json(JSON.parse(body));
    });
});

// liste des magasins par enseignes
router.post('/magbyens', function(req, res, next) {
    var ens = req.body.enseigne;
    request({
        url: "http://3hservices.hhhgd.com/Amfphp/?contentType=application/json",
        method: "POST",
        header: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            'serviceName': 'vvproxy_tests',
            'methodName': 'query_AS400JSON',
            'parameters': ["select * from vvbase/vvmobmagip where ENSNOM like '" + ens + "%' "]
        })

    }, function(error, response, body) {

        res.json(JSON.parse(body));
    });
});


router.post('/veeam/runbkp', function(req, res, next) {
    var nomsrv = req.body.nomsrv;
    var user = "3HSERVICES\\thsdche";
    var pass = "d@nZel77";
    var auth = "Basic " + new Buffer(user + ":" + pass).toString("base64");
    //var auth = 'Basic ' + new Buffer("3HSERVICES\thsdche:d@nZel77").toString('base64');
    console.log("Autorization", auth);
    var hd = { "Authorization": auth };
    // authorization: 'Basic M0hTRVJWSUNFU1x0aHNkY2hlOmRAblplbDc3'
    // Basic M0hTRVJWSUNFUwloc2RjaGU6ZEBuWmVsNzc=
    // 'Authorization': 'Basic ' + new Buffer(uname + ':' + pword).toString('base64')
    var options = {
        method: 'POST',
        url: 'http://90.83.220.214:8888/',
        qs: { command: 'Invoke-Command { powerShell -file C:\SCRIPTS\VeeamZIP_' + nomsrv + '.ps1 } -ComputerName veeamsrv.3hservices.net' },
        headers: hd
    };
    request(options, function(error, response, body) {
        //if (error) throw new Error(error);
        res.json({
            success: true,
            message: 'Sauvegarde lancée!'
        });
    });
});


router.post('/migcaisse/delhdns', function(req, res, next) {
    var nummag = req.body.nummag;
    var user = "3HSERVICES\\thsdche";
    var pass = "d@nZel77";
    var auth = "Basic " + new Buffer(user + ":" + pass).toString("base64");
    //var auth = 'Basic ' + new Buffer("3HSERVICES\thsdche:d@nZel77").toString('base64');
    console.log("Autorization", auth);
    var hd = { "Authorization": auth };
    // authorization: 'Basic M0hTRVJWSUNFU1x0aHNkY2hlOmRAblplbDc3'
    // Basic M0hTRVJWSUNFUwloc2RjaGU6ZEBuWmVsNzc=
    // 'Authorization': 'Basic ' + new Buffer(uname + ':' + pword).toString('base64')
    var options = {
        method: 'POST',
        url: 'http://90.83.220.214:8888/',
        qs: { command: 'invoke-command { Get-DnsServerResourceRecord -ComputerName DCPDA -ZoneName 3hservices.net -Name h' + nummag + ' | Remove-DnsServerResourceRecord -Force -ZoneName 3hservices.net  } -ComputerName dcpda2.3hservices.net' },
        headers: hd
    };

    request(options, function(error, response, body) {
        //if (error) throw new Error(error);
        res.json({
            success: true,
            message: 'Del dns hote!'
        });
    });
});


router.post('/migcaisse/delmdns', function(req, res, next) {
    var nummag = req.body.nummag;
    var user = "3HSERVICES\\thsdche";
    var pass = "d@nZel77";
    var auth = "Basic " + new Buffer(user + ":" + pass).toString("base64");
    //var auth = 'Basic ' + new Buffer("3HSERVICES\thsdche:d@nZel77").toString('base64');
    console.log("Autorization", auth);
    var hd = { "Authorization": auth };
    // authorization: 'Basic M0hTRVJWSUNFU1x0aHNkY2hlOmRAblplbDc3'
    // Basic M0hTRVJWSUNFUwloc2RjaGU6ZEBuWmVsNzc=
    // 'Authorization': 'Basic ' + new Buffer(uname + ':' + pword).toString('base64')
    var options = {
        method: 'POST',
        url: 'http://90.83.220.214:8888/',
        qs: { command: 'invoke-command { Get-DnsServerResourceRecord -ComputerName DCPDA -ZoneName 3hservices.net -Name m' + nummag + ' | Remove-DnsServerResourceRecord -Force -ZoneName 3hservices.net  } -ComputerName dcpda2.3hservices.net' },
        headers: hd
    };

    request(options, function(error, response, body) {
        //if (error) throw new Error(error);
        res.json({
            success: true,
            message: 'Del dns magasin!'
        });
    });
});

// supprimer magasin windows ecomax au dns
router.post('/migcaisse/delwdns', function(req, res, next) {
    var nummag = req.body.nummag;
    var user = "3HSERVICES\\thsdche";
    var pass = "d@nZel77";
    var auth = "Basic " + new Buffer(user + ":" + pass).toString("base64");
    //var auth = 'Basic ' + new Buffer("3HSERVICES\thsdche:d@nZel77").toString('base64');
    console.log("Autorization", auth);
    var hd = { "Authorization": auth };
    // authorization: 'Basic M0hTRVJWSUNFU1x0aHNkY2hlOmRAblplbDc3'
    // Basic M0hTRVJWSUNFUwloc2RjaGU6ZEBuWmVsNzc=
    // 'Authorization': 'Basic ' + new Buffer(uname + ':' + pword).toString('base64')
    var options = {
        method: 'POST',
        url: 'http://90.83.220.214:8888/',
        qs: { command: 'invoke-command { Get-DnsServerResourceRecord -ComputerName DCPDA -ZoneName 3hservices.net -Name w' + nummag + ' | Remove-DnsServerResourceRecord -Force -ZoneName 3hservices.net  } -ComputerName dcpda2.3hservices.net' },
        headers: hd
    };

    request(options, function(error, response, body) {
        //if (error) throw new Error(error);
        res.json({
            success: true,
            message: 'Del dns windows!'
        });
    });
});

// ajout magasin windows ecomax au dns
router.post('/migcaisse/addwdns', function(req, res, next) {
    var nummag = req.body.nummag;
    var user = "3HSERVICES\\thsdche";
    var pass = "d@nZel77";
    var auth = "Basic " + new Buffer(user + ":" + pass).toString("base64");
    //var auth = 'Basic ' + new Buffer("3HSERVICES\thsdche:d@nZel77").toString('base64');
    console.log("Autorization", auth);
    var hd = { "Authorization": auth };
    // authorization: 'Basic M0hTRVJWSUNFU1x0aHNkY2hlOmRAblplbDc3'
    // Basic M0hTRVJWSUNFUwloc2RjaGU6ZEBuWmVsNzc=
    // 'Authorization': 'Basic ' + new Buffer(uname + ':' + pword).toString('base64')
    var options = {
        method: 'POST',
        url: 'http://90.83.220.214:8888/',
        qs: { command: 'invoke-command { Add-DnsServerResourceRecord -ZoneName 3hservices.net -A -Name w' + nummag + ' -IPv4Address "10.30.' + nummag + '.200" } -ComputerName dcpda2.3hservices.net' },
        headers: hd
    };

    request(options, function(error, response, body) {
        //if (error) throw new Error(error);
        res.json({
            success: true,
            message: 'Add dns windows!'
        });
    });
});


// ajout hote magasin ecomax au dns
router.post('/migcaisse/addhdns', function(req, res, next) {
    var nummag = req.body.nummag;
    var user = "3HSERVICES\\thsdche";
    var pass = "d@nZel77";
    var auth = "Basic " + new Buffer(user + ":" + pass).toString("base64");
    //var auth = 'Basic ' + new Buffer("3HSERVICES\thsdche:d@nZel77").toString('base64');
    console.log("Autorization", auth);
    var hd = { "Authorization": auth };
    // authorization: 'Basic M0hTRVJWSUNFU1x0aHNkY2hlOmRAblplbDc3'
    // Basic M0hTRVJWSUNFUwloc2RjaGU6ZEBuWmVsNzc=
    // 'Authorization': 'Basic ' + new Buffer(uname + ':' + pword).toString('base64')
    var options = {
        method: 'POST',
        url: 'http://90.83.220.214:8888/',
        qs: { command: 'invoke-command { Add-DnsServerResourceRecord -ZoneName 3hservices.net -A -Name h' + nummag + ' -IPv4Address "10.30.' + nummag + '.1" } -ComputerName dcpda2.3hservices.net' },
        headers: hd
    };

    request(options, function(error, response, body) {
        //if (error) throw new Error(error);
        res.json({
            success: true,
            message: 'Add dns windows!'
        });
    });
});

// ajout magasin ecomax au dns
router.post('/migcaisse/addmdns', function(req, res, next) {
    var nummag = req.body.nummag;
    var user = "3HSERVICES\\thsdche";
    var pass = "d@nZel77";
    var auth = "Basic " + new Buffer(user + ":" + pass).toString("base64");
    //var auth = 'Basic ' + new Buffer("3HSERVICES\thsdche:d@nZel77").toString('base64');
    console.log("Autorization", auth);
    var hd = { "Authorization": auth };
    // authorization: 'Basic M0hTRVJWSUNFU1x0aHNkY2hlOmRAblplbDc3'
    // Basic M0hTRVJWSUNFUwloc2RjaGU6ZEBuWmVsNzc=
    // 'Authorization': 'Basic ' + new Buffer(uname + ':' + pword).toString('base64')
    var options = {
        method: 'POST',
        url: 'http://90.83.220.214:8888/',
        qs: { command: 'invoke-command { Add-DnsServerResourceRecord -ZoneName 3hservices.net -A -Name m' + nummag + ' -IPv4Address "10.30.' + nummag + '.2" } -ComputerName dcpda2.3hservices.net' },
        headers: hd
    };

    request(options, function(error, response, body) {
        //if (error) throw new Error(error);
        res.json({
            success: true,
            message: 'Add dns windows!'
        });
    });
});


router.post('/adusr/infos', function(req, res, next) {
    var username = req.body.username;
    var user = "3HSERVICES\\thsdche";
    var pass = "d@nZel77";
    var auth = "Basic " + new Buffer(user + ":" + pass).toString("base64");
    //var auth = 'Basic ' + new Buffer("3HSERVICES\thsdche:d@nZel77").toString('base64');
    console.log("Autorization", auth);
    var hd = { "Authorization": auth };
    // authorization: 'Basic M0hTRVJWSUNFU1x0aHNkY2hlOmRAblplbDc3'
    // Basic M0hTRVJWSUNFUwloc2RjaGU6ZEBuWmVsNzc=
    // 'Authorization': 'Basic ' + new Buffer(uname + ':' + pword).toString('base64')
    var options = {
        method: 'POST',
        url: 'http://90.83.220.214:8888/',
        qs: { command: 'GET-ADUSER  ' + username + ' -properties * ' },
        headers: hd
    };

    request(options, function(error, response, body) {
        //if (error) throw new Error(error);
        res.json(JSON.parse(body));
    });
});

// recherche AD par le nom
router.post('/adusr/search', function(req, res, next) {
    var searchname = req.body.searchname;
    var user = "3HSERVICES\\thsdche";
    var pass = "d@nZel77";
    var auth = "Basic " + new Buffer(user + ":" + pass).toString("base64");
    //var auth = 'Basic ' + new Buffer("3HSERVICES\thsdche:d@nZel77").toString('base64');
    console.log("Autorization", auth);
    var hd = { "Authorization": auth };
    // authorization: 'Basic M0hTRVJWSUNFU1x0aHNkY2hlOmRAblplbDc3'
    // Basic M0hTRVJWSUNFUwloc2RjaGU6ZEBuWmVsNzc=
    // 'Authorization': 'Basic ' + new Buffer(uname + ':' + pword).toString('base64')
    var options = {
        method: 'POST',
        url: 'http://90.83.220.214:8888/',
        qs: { command: "GET-ADUSER  -f { Name -like '*" + searchname + "*' } -properties * | select Name,SamAccountName,ThumbnailPhoto,DisplayName,City,HomePhone,mail,OfficePhone,PostalCode,StreetAddress,co,Surname,MemberOf,Enabled,whenChanged,whenCreated,LastLogonDate" },
        headers: hd
    };

    request(options, function(error, response, body) {
        //if (error) throw new Error(error);
        res.json(JSON.parse(body));
    });
});

//Liste les groupes selon la recherche
router.post('/adgrp/search', function(req, res, next) {
    var searchname = req.body.searchname;
    var user = "3HSERVICES\\thsdche";
    var pass = "d@nZel77";
    var auth = "Basic " + new Buffer(user + ":" + pass).toString("base64");
    //var auth = 'Basic ' + new Buffer("3HSERVICES\thsdche:d@nZel77").toString('base64');
    console.log("Autorization", auth);
    var hd = { "Authorization": auth };
    // authorization: 'Basic M0hTRVJWSUNFU1x0aHNkY2hlOmRAblplbDc3'
    // Basic M0hTRVJWSUNFUwloc2RjaGU6ZEBuWmVsNzc=
    // 'Authorization': 'Basic ' + new Buffer(uname + ':' + pword).toString('base64')
    var options = {
        method: 'POST',
        url: 'http://90.83.220.214:8888/',
        qs: { command: "Get-ADGroup -f { name -like '*" + searchname + "*' } | select SamAccountName,DistinguishedName" },
        headers: hd
    };

    request(options, function(error, response, body) {
        //if (error) throw new Error(error);
        res.json(JSON.parse(body));
    });
});


//Liste les pcs selon la recherche
router.post('/adpcs/search', function(req, res, next) {
    var searchname = req.body.searchname;
    var user = "3HSERVICES\\thsdche";
    var pass = "d@nZel77";
    var auth = "Basic " + new Buffer(user + ":" + pass).toString("base64");
    //var auth = 'Basic ' + new Buffer("3HSERVICES\thsdche:d@nZel77").toString('base64');
    console.log("Autorization", auth);
    var hd = { "Authorization": auth };
    // authorization: 'Basic M0hTRVJWSUNFU1x0aHNkY2hlOmRAblplbDc3'
    // Basic M0hTRVJWSUNFUwloc2RjaGU6ZEBuWmVsNzc=
    // 'Authorization': 'Basic ' + new Buffer(uname + ':' + pword).toString('base64')
    var options = {
        method: 'POST',
        url: 'http://90.83.220.214:8888/',
        qs: { command: "Get-ADComputer -f { Name -like '*" + searchname + "*' }  -Properties * | select SamAccountName,DistinguishedName,Name,DNSHostName,OperatingSystem,OperatingSystemServicePack,OperatingSystemVersion,CanonicalName,IPv4Address" },
        headers: hd
    };

    request(options, function(error, response, body) {
        //if (error) throw new Error(error);
        res.json(JSON.parse(body));
    });
});



router.post('/bizsrv/infos', function(req, res, next) {
    var computername = req.body.computername;
    var user = "3HSERVICES\\thsdche";
    var pass = "d@nZel77";
    var auth = "Basic " + new Buffer(user + ":" + pass).toString("base64");
    //var auth = 'Basic ' + new Buffer("3HSERVICES\thsdche:d@nZel77").toString('base64');
    console.log("Autorization", auth);
    var hd = { "Authorization": auth };
    // authorization: 'Basic M0hTRVJWSUNFU1x0aHNkY2hlOmRAblplbDc3'
    // Basic M0hTRVJWSUNFUwloc2RjaGU6ZEBuWmVsNzc=
    // 'Authorization': 'Basic ' + new Buffer(uname + ':' + pword).toString('base64')
    var options = {
        method: 'POST',
        url: 'http://90.83.220.214:8888/',
        qs: { command: 'Get-Service -ComputerName ' + computername + ' |select Name, MachineName, Status | where-object { $_.Name -like "Biz*" }  ' },
        headers: hd
    };

    request(options, function(error, response, body) {
        //if (error) throw new Error(error);
        res.json(JSON.parse(body));
    });
});


// demarrage service bizerba
router.post('/bizsrv/startsrv', function(req, res, next) {
    var computername = req.body.computername;
    var user = "3HSERVICES\\thsdche";
    var pass = "d@nZel77";
    var auth = "Basic " + new Buffer(user + ":" + pass).toString("base64");
    //var auth = 'Basic ' + new Buffer("3HSERVICES\thsdche:d@nZel77").toString('base64');
    console.log("Autorization", auth);
    var hd = { "Authorization": auth };
    // authorization: 'Basic M0hTRVJWSUNFU1x0aHNkY2hlOmRAblplbDc3'
    // Basic M0hTRVJWSUNFUwloc2RjaGU6ZEBuWmVsNzc=
    // 'Authorization': 'Basic ' + new Buffer(uname + ':' + pword).toString('base64')
    var options = {
        method: 'POST',
        url: 'http://90.83.220.214:8888/',
        qs: { command: 'Get-Service -Name BizerbaConnectService -ComputerName ' + computername + '  | Start-Service  ' },
        headers: hd
    };

    request(options, function(error, response, body) {
        //if (error) throw new Error(error);
        res.json({
            success: true,
            message: 'Service demarré!'
        });
    });
});


// arret service bizerba
router.post('/bizsrv/stopsrv', function(req, res, next) {
    var computername = req.body.computername;
    var user = "3HSERVICES\\thsdche";
    var pass = "d@nZel77";
    var auth = "Basic " + new Buffer(user + ":" + pass).toString("base64");
    //var auth = 'Basic ' + new Buffer("3HSERVICES\thsdche:d@nZel77").toString('base64');
    console.log("Autorization", auth);
    var hd = { "Authorization": auth };
    // authorization: 'Basic M0hTRVJWSUNFU1x0aHNkY2hlOmRAblplbDc3'
    // Basic M0hTRVJWSUNFUwloc2RjaGU6ZEBuWmVsNzc=
    // 'Authorization': 'Basic ' + new Buffer(uname + ':' + pword).toString('base64')
    var options = {
        method: 'POST',
        url: 'http://90.83.220.214:8888/',
        qs: { command: 'Get-Service -Name BizerbaConnectService -ComputerName ' + computername + '  | Stop-Service  ' },
        headers: hd
    };

    request(options, function(error, response, body) {
        //if (error) throw new Error(error);
        res.json({
            success: true,
            message: 'Service demarré!'
        });
    });
});


//redemarrage serveur bizerba
router.post('/bizsrv/restartsrv', function(req, res, next) {
    var computername = req.body.computername;
    var user = "3HSERVICES\\thsdche";
    var pass = "d@nZel77";
    var auth = "Basic " + new Buffer(user + ":" + pass).toString("base64");
    //var auth = 'Basic ' + new Buffer("3HSERVICES\thsdche:d@nZel77").toString('base64');
    console.log("Autorization", auth);
    var hd = { "Authorization": auth };
    // authorization: 'Basic M0hTRVJWSUNFU1x0aHNkY2hlOmRAblplbDc3'
    // Basic M0hTRVJWSUNFUwloc2RjaGU6ZEBuWmVsNzc=
    // 'Authorization': 'Basic ' + new Buffer(uname + ':' + pword).toString('base64')
    var options = {
        method: 'POST',
        url: 'http://90.83.220.214:8888/',
        qs: { command: 'Restart-Computer -ComputerName ' + computername + '  -Force  ' },
        headers: hd
    };

    request(options, function(error, response, body) {
        //if (error) throw new Error(error);
        res.json({
            success: true,
            message: 'Service demarré!'
        });
    });
});



router.post('/adusr/grpmember', function(req, res, next) {
    var username = req.body.username;
    var user = "3HSERVICES\\thsdche";
    var pass = "d@nZel77";
    var auth = "Basic " + new Buffer(user + ":" + pass).toString("base64");
    //var auth = 'Basic ' + new Buffer("3HSERVICES\thsdche:d@nZel77").toString('base64');
    console.log("Autorization", auth);
    var hd = { "Authorization": auth };
    // authorization: 'Basic M0hTRVJWSUNFU1x0aHNkY2hlOmRAblplbDc3'
    // Basic M0hTRVJWSUNFUwloc2RjaGU6ZEBuWmVsNzc=
    // 'Authorization': 'Basic ' + new Buffer(uname + ':' + pword).toString('base64')
    var options = {
        method: 'POST',
        url: 'http://90.83.220.214:8888/',
        qs: { command: 'GET-ADUSER  ' + username + ' -properties MemberOf| Select-Object MemberOf' },
        headers: hd
    };

    request(options, function(error, response, body) {
        //if (error) throw new Error(error);
        res.json(JSON.parse(body));
    });
});

// attribution d'une propriete a un utilisateur AD
router.post('/adusr/setprop', function(req, res, next) {
    var username = req.body.username;
    var property = req.body.property;
    var value = req.body.value;
    var user = "3HSERVICES\\thsdche";
    var pass = "d@nZel77";
    var auth = "Basic " + new Buffer(user + ":" + pass).toString("base64");
    //var auth = 'Basic ' + new Buffer("3HSERVICES\thsdche:d@nZel77").toString('base64');
    console.log("Autorization", auth);
    var hd = { "Authorization": auth };
    // authorization: 'Basic M0hTRVJWSUNFU1x0aHNkY2hlOmRAblplbDc3'
    // Basic M0hTRVJWSUNFUwloc2RjaGU6ZEBuWmVsNzc=
    // 'Authorization': 'Basic ' + new Buffer(uname + ':' + pword).toString('base64')
    var options = {
        method: 'POST',
        url: 'http://90.83.220.214:8888/',
        encoding: 'utf-8',
        qs: { command: "SET-ADUSER  " + username + " -" + property + " '" + String(value).toString("utf8") + "' " },
        headers: hd
    };

    request(options, function(error, response, body) {
        //if (error) throw new Error(error);
        res.json({
            success: true,
            message: "OK"
        });
    });
});


// liste des partages
router.post('/adshare', function(req, res, next) {
    var computername = req.body.computername;
    var user = "3HSERVICES\\thsdche";
    var pass = "d@nZel77";
    var auth = "Basic " + new Buffer(user + ":" + pass).toString("base64");
    //var auth = 'Basic ' + new Buffer("3HSERVICES\thsdche:d@nZel77").toString('base64');
    console.log("Autorization", auth);
    var hd = { "Authorization": auth };
    // authorization: 'Basic M0hTRVJWSUNFU1x0aHNkY2hlOmRAblplbDc3'
    // Basic M0hTRVJWSUNFUwloc2RjaGU6ZEBuWmVsNzc=
    // 'Authorization': 'Basic ' + new Buffer(uname + ':' + pword).toString('base64')
    var options = {
        method: 'POST',
        url: 'http://90.83.220.214:8888/',
        qs: { command: 'Get-WmiObject -Class Win32_Share -ComputerName ' + computername + "|Select-Object Name, Path" },
        headers: hd
    };

    request(options, function(error, response, body) {
        //if (error) throw new Error(error);
        res.json(JSON.parse(body));
    });
});


// liste des utilisateurs inactif depuis nb semaines (pas fonctionnel a verifier)
router.post('/adusroff', function(req, res, next) {
    var nbweek = req.body.nbweek;
    var user = "3HSERVICES\\thsdche";
    var pass = "d@nZel77";
    var auth = "Basic " + new Buffer(user + ":" + pass).toString("base64");
    //var auth = 'Basic ' + new Buffer("3HSERVICES\thsdche:d@nZel77").toString('base64');
    console.log("Autorization", auth);
    var hd = { "Authorization": auth };
    // authorization: 'Basic M0hTRVJWSUNFU1x0aHNkY2hlOmRAblplbDc3'
    // Basic M0hTRVJWSUNFUwloc2RjaGU6ZEBuWmVsNzc=
    // 'Authorization': 'Basic ' + new Buffer(uname + ':' + pword).toString('base64')
    var options = {
        method: 'POST',
        url: 'http://90.83.220.214:8888/',
        qs: { command: 'DSQuery user -inactive ' + nbweek },
        headers: hd
    };

    request(options, function(error, response, body) {
        //if (error) throw new Error(error);
        res.json(JSON.parse(body));
    });
});

// liste les pc inactifs depuis xx jours
router.post('/adcpoff', function(req, res, next) {
    var nbweek = req.body.nbweek;
    var user = "3HSERVICES\\thsdche";
    var pass = "d@nZel77";
    var auth = "Basic " + new Buffer(user + ":" + pass).toString("base64");
    //var auth = 'Basic ' + new Buffer("3HSERVICES\thsdche:d@nZel77").toString('base64');
    console.log("Autorization", auth);
    var hd = { "Authorization": auth };
    // authorization: 'Basic M0hTRVJWSUNFU1x0aHNkY2hlOmRAblplbDc3'
    // Basic M0hTRVJWSUNFUwloc2RjaGU6ZEBuWmVsNzc=
    // 'Authorization': 'Basic ' + new Buffer(uname + ':' + pword).toString('base64')
    var options = {
        method: 'POST',
        url: 'http://90.83.220.214:8888/',
        qs: { command: 'DSQuery Computer -inactive ' + nbweek },
        headers: hd
    };

    request(options, function(error, response, body) {
        //if (error) throw new Error(error);
        res.json(JSON.parse(body));
    });
});

// liste les comptes deactives
router.post('/adusrdisabled', function(req, res, next) {
    var user = "3HSERVICES\\thsdche";
    var pass = "d@nZel77";
    var auth = "Basic " + new Buffer(user + ":" + pass).toString("base64");
    //var auth = 'Basic ' + new Buffer("3HSERVICES\thsdche:d@nZel77").toString('base64');
    console.log("Autorization", auth);
    var hd = { "Authorization": auth };
    // authorization: 'Basic M0hTRVJWSUNFU1x0aHNkY2hlOmRAblplbDc3'
    // Basic M0hTRVJWSUNFUwloc2RjaGU6ZEBuWmVsNzc=
    // 'Authorization': 'Basic ' + new Buffer(uname + ':' + pword).toString('base64')
    var options = {
        method: 'POST',
        url: 'http://90.83.220.214:8888/',
        qs: { command: 'Get-ADUser -Filter { enabled -eq $false} -Properties * | Select-Object Name,SamAccountName,ThumbnailPhoto,DisplayName,City,HomePhone,mail,OfficePhone,PostalCode,StreetAddress,co,Surname,MemberOf,Enabled,whenChanged,whenCreated,LastLogonDate' },
        headers: hd
    };

    request(options, function(error, response, body) {
        //if (error) throw new Error(error);
        res.json(JSON.parse(body));
    });
});

// liste les comptes inactifs depuis xx jours
router.post('/adusroffnbjrs', function(req, res, next) {
    var nbweek = req.body.nbweek;
    var user = "3HSERVICES\\thsdche";
    var pass = "d@nZel77";
    var auth = "Basic " + new Buffer(user + ":" + pass).toString("base64");
    //var auth = 'Basic ' + new Buffer("3HSERVICES\thsdche:d@nZel77").toString('base64');
    console.log("Autorization", auth);
    var hd = { "Authorization": auth };
    // authorization: 'Basic M0hTRVJWSUNFU1x0aHNkY2hlOmRAblplbDc3'
    // Basic M0hTRVJWSUNFUwloc2RjaGU6ZEBuWmVsNzc=
    // 'Authorization': 'Basic ' + new Buffer(uname + ':' + pword).toString('base64')
    var options = {
        method: 'POST',
        url: 'http://90.83.220.214:8888/',
        qs: { command: '$time = (Get-Date).Adddays(-' + nbweek + ') ; Get-ADUser -Filter {LastLogonTimeStamp -lt $time -and enabled -eq $true} -Properties *| Select-Object Name,SamAccountName,ThumbnailPhoto,DisplayName,City,HomePhone,mail,OfficePhone,PostalCode,StreetAddress,co,Surname,MemberOf,Enabled,whenChanged,whenCreated,LastLogonDate' },
        headers: hd
    };

    request(options, function(error, response, body) {
        //if (error) throw new Error(error);
        res.json(JSON.parse(body));
    });
});





// deactive les comptes inactifs depuis xx jours
router.post('/adusr/offnbjrs', function(req, res, next) {
    var nbweek = req.body.nbweek;
    var user = "3HSERVICES\\thsdche";
    var pass = "d@nZel77";
    var auth = "Basic " + new Buffer(user + ":" + pass).toString("base64");
    //var auth = 'Basic ' + new Buffer("3HSERVICES\thsdche:d@nZel77").toString('base64');
    console.log("Autorization", auth);
    var hd = { "Authorization": auth };
    // authorization: 'Basic M0hTRVJWSUNFU1x0aHNkY2hlOmRAblplbDc3'
    // Basic M0hTRVJWSUNFUwloc2RjaGU6ZEBuWmVsNzc=
    // 'Authorization': 'Basic ' + new Buffer(uname + ':' + pword).toString('base64')
    var options = {
        method: 'POST',
        url: 'http://90.83.220.214:8888/',
        qs: { command: 'Search-ADAccount -AccountInactive -TimeSpan ([timespan]' + nbweek + 'd) -UsersOnly | Set-ADUser -Enabled $false -WhatIf' },
        headers: hd
    };

    request(options, function(error, response, body) {
        //if (error) throw new Error(error);
        res.json({
            success: true,
            message: "OK"
        });
    });
});


//Liste des utilisateur membre d'un groupe
router.post('/adusr/lstusrgrp', function(req, res, next) {
    var groupe = req.body.groupe;
    var user = "3HSERVICES\\thsdche";
    var pass = "d@nZel77";
    var auth = "Basic " + new Buffer(user + ":" + pass).toString("base64");
    //var auth = 'Basic ' + new Buffer("3HSERVICES\thsdche:d@nZel77").toString('base64');
    console.log("Autorization", auth);
    var hd = { "Authorization": auth };
    // authorization: 'Basic M0hTRVJWSUNFU1x0aHNkY2hlOmRAblplbDc3'
    // Basic M0hTRVJWSUNFUwloc2RjaGU6ZEBuWmVsNzc=
    // 'Authorization': 'Basic ' + new Buffer(uname + ':' + pword).toString('base64')
    var options = {
        method: 'POST',
        url: 'http://90.83.220.214:8888/',
        qs: { command: 'Get-ADGroupMember   "' + groupe + '"  | FOREACH { Get-ADUser $_.SamAccountName -properties * | Select SamAccountName, Name }' },
        headers: hd
    };

    request(options, function(error, response, body) {
        //if (error) throw new Error(error);
        res.json(JSON.parse(body));
    });
});






//Ajouter un utilisateur a un groupe :
router.post('/adusr/addusrgrp', function(req, res, next) {
    var groupe = req.body.groupe;
    var username = req.body.username;
    var user = "3HSERVICES\\thsdche";
    var pass = "d@nZel77";
    var auth = "Basic " + new Buffer(user + ":" + pass).toString("base64");
    //var auth = 'Basic ' + new Buffer("3HSERVICES\thsdche:d@nZel77").toString('base64');
    console.log("Autorization", auth);
    var hd = { "Authorization": auth };
    // authorization: 'Basic M0hTRVJWSUNFU1x0aHNkY2hlOmRAblplbDc3'
    // Basic M0hTRVJWSUNFUwloc2RjaGU6ZEBuWmVsNzc=
    // 'Authorization': 'Basic ' + new Buffer(uname + ':' + pword).toString('base64')
    var options = {
        method: 'POST',
        url: 'http://90.83.220.214:8888/',
        qs: { command: "Add-ADGroupMember   -Identity '" + groupe + "'  -Member '" + username + "'" },
        headers: hd
    };

    request(options, function(error, response, body) {
        //if (error) throw new Error(error);
        res.json({
            success: true,
            message: "OK"
        });
    });
});



//Ajouter un  groupe :
router.post('/adusr/newgrp', function(req, res, next) {
    var desc = req.body.desc;
    var grpname = req.body.grpname;
    var user = "3HSERVICES\\thsdche";
    var pass = "d@nZel77";
    var auth = "Basic " + new Buffer(user + ":" + pass).toString("base64");
    //var auth = 'Basic ' + new Buffer("3HSERVICES\thsdche:d@nZel77").toString('base64');
    console.log("Autorization", auth);
    var hd = { "Authorization": auth };
    // authorization: 'Basic M0hTRVJWSUNFU1x0aHNkY2hlOmRAblplbDc3'
    // Basic M0hTRVJWSUNFUwloc2RjaGU6ZEBuWmVsNzc=
    // 'Authorization': 'Basic ' + new Buffer(uname + ':' + pword).toString('base64')
    var options = {
        method: 'POST',
        url: 'http://90.83.220.214:8888/',
        qs: { command: "New-ADGroup   -Name '" + grpname + "'  -Description '" + desc + "' -GroupCategory Security -GroupScope Global -Path 'OU=Groupes,OU=HHH,DC=3HSERVICES,DC=net'" },
        headers: hd
    };

    request(options, function(error, response, body) {
        //if (error) throw new Error(error);
        res.json({
            success: true,
            message: "OK"
        });
    });
});


//Retirer un utilisateur a un groupe :
router.post('/adusr/rmvusrgrp', function(req, res, next) {
    var groupe = req.body.groupe;
    var username = req.body.username;
    var user = "3HSERVICES\\thsdche";
    var pass = "d@nZel77";
    var auth = "Basic " + new Buffer(user + ":" + pass).toString("base64");
    //var auth = 'Basic ' + new Buffer("3HSERVICES\thsdche:d@nZel77").toString('base64');
    console.log("Autorization", auth);
    var hd = { "Authorization": auth };
    // authorization: 'Basic M0hTRVJWSUNFU1x0aHNkY2hlOmRAblplbDc3'
    // Basic M0hTRVJWSUNFUwloc2RjaGU6ZEBuWmVsNzc=
    // 'Authorization': 'Basic ' + new Buffer(uname + ':' + pword).toString('base64')
    let cmd = "Remove-ADGroupMember   -Identity '" + groupe + "'  -member '" + username + "' -Confirm:$false";
    var options = {
        method: 'POST',
        url: 'http://90.83.220.214:8888/',
        qs: { command: cmd },
        headers: hd
    };

    request(options, function(error, response, body) {
        //if (error) throw new Error(error);
        res.json({
            success: true,
            message: "OK"
        });
    });
});

// activation utilisateur AD
router.post('/adusrenable', function(req, res, next) {
    var username = req.body.username;
    var user = "3HSERVICES\\thsdche";
    var pass = "d@nZel77";
    var auth = "Basic " + new Buffer(user + ":" + pass).toString("base64");
    //var auth = 'Basic ' + new Buffer("3HSERVICES\thsdche:d@nZel77").toString('base64');
    console.log("Autorization", auth);
    var hd = { "Authorization": auth };
    // authorization: 'Basic M0hTRVJWSUNFU1x0aHNkY2hlOmRAblplbDc3'
    // Basic M0hTRVJWSUNFUwloc2RjaGU6ZEBuWmVsNzc=
    // 'Authorization': 'Basic ' + new Buffer(uname + ':' + pword).toString('base64')
    var options = {
        method: 'POST',
        url: 'http://90.83.220.214:8888/',
        qs: { command: 'Enable-ADAccount -Identity ' + username },
        headers: hd
    };

    request(options, function(error, response, body) {
        //if (error) throw new Error(error);
        res.json({
            success: true,
            message: "OK"
        });
    });
});

// image 64bit utilisateur AD
router.post('/adusrthumbnail', function(req, res, next) {
    var username = req.body.username;
    var user = "3HSERVICES\\thsdche";
    var pass = "d@nZel77";
    var auth = "Basic " + new Buffer(user + ":" + pass).toString("base64");
    //var auth = 'Basic ' + new Buffer("3HSERVICES\thsdche:d@nZel77").toString('base64');
    console.log("Autorization", auth);
    var hd = { "Authorization": auth };
    // authorization: 'Basic M0hTRVJWSUNFU1x0aHNkY2hlOmRAblplbDc3'
    // Basic M0hTRVJWSUNFUwloc2RjaGU6ZEBuWmVsNzc=
    // 'Authorization': 'Basic ' + new Buffer(uname + ':' + pword).toString('base64')
    var options = {
        method: 'POST',
        url: 'http://90.83.220.214:8888/',
        qs: { command: ' [convert]::ToBase64String(( GET-ADUser ' + username + ' -properties thumbnailPhoto ).thumbnailPhoto ) ' },
        headers: hd
    };

    request(options, function(error, response, body) {
        //if (error) throw new Error(error);
        res.json(JSON.parse(body));
    });
});


// deblocage utilisateur AD
router.post('/adusrunlock', function(req, res, next) {
    var username = req.body.username;
    var user = "3HSERVICES\\thsdche";
    var pass = "d@nZel77";
    var auth = "Basic " + new Buffer(user + ":" + pass).toString("base64");
    //var auth = 'Basic ' + new Buffer("3HSERVICES\thsdche:d@nZel77").toString('base64');
    console.log("Autorization", auth);
    var hd = { "Authorization": auth };
    // authorization: 'Basic M0hTRVJWSUNFU1x0aHNkY2hlOmRAblplbDc3'
    // Basic M0hTRVJWSUNFUwloc2RjaGU6ZEBuWmVsNzc=
    // 'Authorization': 'Basic ' + new Buffer(uname + ':' + pword).toString('base64')
    var options = {
        method: 'POST',
        url: 'http://90.83.220.214:8888/',
        qs: { command: 'Unlock-ADAccount -Identity ' + username },
        headers: hd
    };

    request(options, function(error, response, body) {
        //if (error) throw new Error(error);
        res.json({
            success: true,
            message: "OK"
        });
    });
});


// deactivation utilsateur AD
router.post('/adusrdisable', function(req, res, next) {
    var username = req.body.username;
    var user = "3HSERVICES\\thsdche";
    var pass = "d@nZel77";
    var auth = "Basic " + new Buffer(user + ":" + pass).toString("base64");
    //var auth = 'Basic ' + new Buffer("3HSERVICES\thsdche:d@nZel77").toString('base64');
    console.log("Autorization", auth);
    var hd = { "Authorization": auth };
    // authorization: 'Basic M0hTRVJWSUNFU1x0aHNkY2hlOmRAblplbDc3'
    // Basic M0hTRVJWSUNFUwloc2RjaGU6ZEBuWmVsNzc=
    // 'Authorization': 'Basic ' + new Buffer(uname + ':' + pword).toString('base64')
    var options = {
        method: 'POST',
        url: 'http://90.83.220.214:8888/',
        qs: { command: 'Disable-ADAccount -Identity ' + username },
        headers: hd
    };

    request(options, function(error, response, body) {
        //if (error) throw new Error(error);
        res.json({
            success: true,
            message: "OK"
        });
    });
});


router.get('/phonegap', function(req, res) {
    var options = {
        method: 'GET',
        url: 'https://build.phonegap.com/api/v1/me?auth_token=kKeKAxVug4C2ggQ9PzKB'
    };

    request(options, function(error, response, body) {
        //if (error) throw new Error(error);
        res.json(JSON.parse(body));
    });
});


router.get('/phonegap/app', function(req, res) {
    var options = {
        method: 'GET',
        url: 'https://build.phonegap.com/api/v1/apps?auth_token=kKeKAxVug4C2ggQ9PzKB'
    };

    request(options, function(error, response, body) {
        //if (error) throw new Error(error);
        res.json(JSON.parse(body));
    });
});


router.post('/signup', function(req, res, next) {
    console.log("enregistrement sans authentification");

    console.log("Table User:", req.method);
    var newuser = new Users({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    });

    newuser.save(function(err, data) {
        if (err) {
            res.json({
                success: false,
                message: err
            })

        } else {
            res.json({
                success: true,
                message: data
            });

        }

    })
});

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


var raspbSchema = mongoose.Schema({
    uid: { type: String, unique: true },
    dtinst: { type: String },
    dtlast: { type: String },
    ip: { type: String }
});

var raspberryList = restful.model('raspblist', raspbSchema);
raspberryList.methods(['get', 'put', 'post', 'delete']);
raspberryList.register(app, '/vvapi/v2/raspblist');
*/






http.createServer(app).listen(process.env.PORT || 3000);
console.log("Serveur v2 API Restful Herve de CHAVIGNY en ecoute sur le port 3000!");



/*var options = {
    cert: fs.readFileSync('./webservices_rvdechavigny_fr.crt'),
    key: fs.readFileSync('./newvv.key'),
}
https.createServer(options, app).listen(8443);
console.log("Serveur v2 API Restful Herve de CHAVIGNY en ecoute sur le port 8443!")
*/