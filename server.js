var http = require('http');

var dispatcher = require('/home/igor/Scrivania/sito.js/node_modules/httpdispatcher.js');

var bind = require('bind');

/* passare una funzione */
dispatcher.onGet('/', function(req, res, chain) {
    bind.toFile('tpl/home.tpl', {
        plus: function(cb, a) {
            return cb(parseInt(a, 10)+1);
        }
    }, function(data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
    });
});

/* passare un oggetto */
dispatcher.onGet('/chi-sono', function(req, res, chain) {
    bind.toFile('tpl/chi-sono.tpl', {
        name: 'Igor',
        address: 'Via Turati',
        city: 'Bergamo'
    }, function(data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
    });
});

/* passare un xml */
dispatcher.onGet('/xml', function(req, res, chain) {
    bind.toFile('tpl/xml.tpl', {
        name: 'Alberto',
        city: 'Milano',
        skills: [{
            skill: 'NodeJS',
            grade: 'A'
        }, {
            skill: 'JavaScript',
            grade: 'A',
        }, {
            skill: 'Bash scripting',
            grade: 'B'
        }]
    }, function(data) {
        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(data);
    });
});

/* gestire parametro get */
dispatcher.onGet('/parametri', function(req, res, chain) {
    bind.toFile('tpl/parametri.tpl', {
        parametro_get: req.params["id"]
    }, function(data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
    });
});

/* gestire parametro post */
dispatcher.onPost('/parametri', function(req, res, chain) {
    bind.toFile('tpl/parametri.tpl', {
        parametro_post: req.params["valore"]
    }, function(data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
    });
});

/* dispatcher */
http.createServer(function (req, res) {
  dispatcher.dispatch(req, res);
}).listen(1340, '127.0.0.1');

/* mysql */
mysql = require("mysql");
     
var connection = mysql.createConnection({
   user: "nodejs",
   password: "nodejs",
   database: "nodejs"
});

connection.query('SELECT * FROM telefoni;', function (error, rows, fields) {
	for(var i in rows) console.log(rows[i]);        
}); 

/* read e write file */
fs = require("fs");

fs.readFile("test.txt", 'utf-8', function (error, data) {
	data = parseInt(data) + 1;
   fs.writeFile('test.txt', data);
   console.log('This page was refreshed ' + data + ' times!');
});


var mysql = require('db-drizzle');
 
new mysql.Database({
      hostname: 'localhost',
      user: 'nodejs',
      password: 'nodejs',
      database: 'nodejs'
}).connect(function(error) {
       
      if(error) return console.log("Connection error");
      this.query().select("*").from("telefoni")
                  .where("numero = ?", [true])
                  .order({ numero: true })
                  .execute(function(error, rows, cols) {
                     if(error) return console.log("Query error");
                     for(var i in rows) console.log(rows[i]);
                  });
});
