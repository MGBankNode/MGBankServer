var pool;

var init = function(mysqlPool){
    console.log('login init 호출');
    pool = mysqlPool;
}

var loginCheck = function(id, password,callback){
    pool.getConnection(function(err, conn){
        if(err){  
            if(conn){
                conn.release();
            }
            callback(err, null);
            return;
        }
        
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var column = ['id', 'pw', 'name'];
        var tabelname = 'user';
        
        var exec = conn.query("select ?? from ?? where id = ? and pw = ?", 
                              [column, tabelname, id, password], function(err, rows){
            
            conn.release();
            console.log('실행 SQL + ', exec.sql);
            
            if(rows.length > 0){
                console.log('로그인 성공:'+ id);
                callback(null, rows);
            }else{
                console.log('로그인 실패');
                callback(null, null);
            }
        });
    });
};

var logincheck = function(req, res){
    console.log('<logincheck 호출>');
    
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    
    if(pool){
        
        loginCheck(paramId, paramPassword, function(err, rows){
            
            if(err){
                console.error('로그인 중 오류 : ' + err.stack);
                
                res.writeHead('200', {'Content-Type':'application/json;charset=utf8'});
                res.write("{code:'200', 'message':'error'}");
                res.end();
                return;
            }
            
            if(rows){
		console.dir(rows);
                res.writeHead('200', {'Content-Type':'application/json;charset=utf8'});
                var data = {
			code:'200',
			message:'success',
			name:rows[0].name
		};
		res.write(JSON.stringify(data));
                res.end();
            }else{
                res.writeHead('200', {'Content-Type':'application/json;charset=utf8'});
                res.write("{code:'200', 'message':'fail'}");
                res.end();
            }
            
        });
        
    }else{
        res.writeHead('200', {'Content-Type':'application/json;charset=utf8'});
        res.write("{code:'200', 'message':'db_fail'}");
        res.end();
    }
};

module.exports.init = init;
module.exports.logincheck = logincheck;
