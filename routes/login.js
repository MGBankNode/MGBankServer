var pool;

var init = function(mysqlPool){
    console.log('login init 호출');
    pool = mysqlPool;
}

var loginCheck = function(id, password, callback){
    pool.getConnection(function(err, conn){
        if(err){  
            if(conn){
                conn.release();
            }
            callback(err, null);
            return;
        }
        
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var column = ['name', 'accountCheck', 'update_at'];
        var tablename = 'user';

        var exec = conn.query("select ?? from ?? where id = ? and pw = ?", 
                              [column, tablename, id, password], function(err, rows){
            console.log('실행 SQL1 + ', exec.sql);

            
            if(rows.length > 0){
                
                console.dir(rows);
                var data = [ id, rows[0].name, rows[0].accountCheck, rows[0].update_at];
                
                console.log('로그인 성공: '+ id);

                var exec1 = conn.query("update ?? set update_at = CURRENT_TIMESTAMP where id = ?",
                                  [tablename,  id], function(err, result){
                    conn.release();
                    console.log('실행 SQL2 + ', exec1.sql);
                    console.log(result);
                    
                    if(result.affectedRows > 0){
                        
                        console.log('접속 시간 업데이트 성공');
                        callback(null, data);
                        
                    }else{
                        
                        console.log('접속 시간 업데이트 실패');
                        callback(null, null);
                        
                    }
                });
                    
            }else{
                conn.release();
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
                res.writeHead('500', {'Content-Type':'application/json;charset=utf8'});
                res.write(JSON.stringify(
                    {
                        code:'500', 
                        message:'error', 
                        error: err,
                        id: null,
                        name: null,
                        accountCheck: null,
                        update_at: null
                    }));
                res.end();
                
                return;
            }
            
            if(rows){
                
                console.dir(rows);
                res.writeHead('200', {'Content-Type':'application/json;charset=utf8'});
                res.write(JSON.stringify(
                    {
                        code:'200', 
                        message:'success', 
                        error: null, 
                        id: rows[0],
                        name: rows[1],
                        accountCheck: rows[2],
                        update_at: rows[3]
                    }));
                res.end();
                
            }else{
                
                res.writeHead('200', {'Content-Type':'application/json;charset=utf8'});
                res.write(JSON.stringify(
                    {
                        code:'200', 
                        message:'fail', 
                        error: null,
                        id: null,
                        name: null,
                        accountCheck: null,
                        update_at: null
                    }));
                res.end();
                
            }
            
        });
        
    }else{
        
        res.writeHead('503', {'Content-Type':'application/json;charset=utf8'});
        res.write(JSON.stringify(
            {
                code:'503',
                message:'db_fail', 
                error: null, 
                id: null,
                name: null,
                accountCheck: null,
                update_at: null
            }));
        res.end();
        
    }
};

module.exports.init = init;
module.exports.logincheck = logincheck;
