//외부 모듈
var express = require('express'),
    http = require('http'),
    path = require('path');

var bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    serveStatic = require('serve-static'),
    errorHandler = require('errorhandler');

var expressErrorHandler = require('express-error-handler');
var expressSession = require('express-session');
var app = express();

//내부 모듈
var route_loader = require('./routes/route_loader');

//설정 파일
var config = require('./config/config');
var db_config = require('./config/db_config.json');


app.set('port', process.env.PORT || config.server_port);

app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());
app.use('/public', serveStatic(path.join(__dirname, 'public')));

app.use(cookieParser());

app.use(expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized: true
}));

//mysql db
var mysql = require('mysql');
var pool = mysql.createPool({
    host : db_config.host,
    user : db_config.user,
    password : db_config.password,
    database: db_config.database,
    debug : false
});

user.init(pool);

//라우팅 등록
var router = express.Router();
route_loader.init(app, router);

//오류처리
var errorHaendler = expressErrorHandler({
   static:{
        '404': './public/404.html'
   } 
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

//서버시작
http.createServer(app).listen(app.get('port'), function(){
    console.log('서버가 시작 -> 포트 : ' + app.get('port')); 
    
});





