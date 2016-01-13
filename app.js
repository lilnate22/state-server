var fs = require('fs');
var json;
var express = require('express');
var app = express();

function readJsonFileSync(filepath, encoding){

    if (typeof (encoding) == 'undefined'){
        encoding = 'utf8';
    }
    var file = fs.readFileSync(filepath, encoding);
    return JSON.parse(file);
}

function getData(){
    var filepath = __dirname + '/states.json';
    return readJsonFileSync(filepath);
}

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(8080, function () {
  console.log('Example app listening on port 3000!');
})