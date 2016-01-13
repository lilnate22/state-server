var fs = require('fs');
var json, map;
var express = require('express');
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


function readJsonFileSync(filepath, encoding){

    if (typeof (encoding) == 'undefined'){
        encoding = 'utf8';
    }
    var file = fs.readFileSync(filepath, encoding);
    return JSON.parse(file);
}

function getData(){
    var filepath = __dirname + '/statesA.json';
    return readJsonFileSync(filepath);
}

function getMaxOfArray(numArray) {
 return Math.max.apply(null, numArray);
}

function getMinOfArray(numArray) {
 return Math.min.apply(null, numArray);
}

//init data
function generateMap() {
   json = getData();
   map = {};
   for(var i=0; i < json.length; i += 1) {
       var stateObj = json[i];
       var tempObj = {};
       var borders = stateObj.border;
       
       var longitude = borders.map(function(elem) {
          return elem[0]; 
       });
       
       var latitude = borders.map(function(elem) {
           return elem[1];
       });
       
       tempObj.maxLong = getMaxOfArray(longitude);
       tempObj.minLong = getMinOfArray(longitude);
       
       
       tempObj.maxLat = getMaxOfArray(latitude);
       tempObj.minLat = getMinOfArray(latitude);
       
       map[stateObj.state] = tempObj;
   }
}

generateMap();

function findState(long, lat) {
    for(state in map) {
        if(map[state].maxLong >= long && map[state].minLong <= long) {
            if(map[state].maxLat >= lat && map[state].minLat <=lat) {
                return state;
            }
        }
    }
    
    return 'No State Found';
}
app.post('/', function (req, res) {
  var long = parseFloat(req.body.longitude);
  var lat  = parseFloat(req.body.latitude);
  var state = findState(long,lat);
  res.send(state);
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
})