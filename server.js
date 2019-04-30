//모듈
var express = require('express');
var http = require('http')
var path = require('path');
var morgan = require('morgan');

var config = require('./config/config');
var stream = require('./config/winston');
var route_loader = require('./routes/route_loader');

var bodyParser = require('body-parser');

//express 서버 객체 생성
var app = express();

//뷰 엔진 설정
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//서버 변수 설정 + static으로 public 폴더 설정
app.set('port', config.server_port);
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan('combined', { "stream" : stream.stream }));

//mysql db
var mysql = require('mysql');
var pool = mysql.createPool(config.mysql_set[2]);

//라우팅 등록
var router = express.Router();
route_loader.init(app, router, pool);

router.route('/').get((req, res) => {
   res.render('sendpush.ejs');
});

//확인되지 않은 예외 처리
process.on('uncaughtException', function (err) {
	console.log('uncaughtException 발생 : ' + err);	
	console.log(err.stack);
});

//프로세스 종료
process.on('SIGTERM', function () {
    app.close();
});

app.on('close', function () {
	console.log("서버 종료");
});

//서버시작
var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('서버 시작 -> 포트 : ' + app.get('port')); 
    
});

