//외부 모듈
var express = require('express');
var http = require('http')
var path = require('path');
var morgan = require('morgan');
var stream = require('./config/winston');
var bodyParser = require('body-parser');

var app = express();

//내부 모듈
var route_loader = require('./routes/route_loader');

//설정 파일
var config = require('./config/config');

app.set('port', process.env.PORT || config.server_port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('combined', { "stream" : stream.stream }));

//mysql db
var mysql = require('mysql');
var pool = mysql.createPool(config.mysql_set[2]);

//라우팅 등록
var router = express.Router();
route_loader.init(app, router, pool);

//서버시작
http.createServer(app).listen(app.get('port'), function(){
    console.log('서버 시작 -> 포트 : ' + app.get('port')); 
    
});

