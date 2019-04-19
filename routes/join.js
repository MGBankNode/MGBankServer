var pool;

var init = function(mysqlPool){
    console.log('join init 호출');
    pool = mysqlPool;
}

var response = function(res, code, message, error){
    res.writeHead(code, {'Content-Type':'application/json;charset=utf8'});

    var data = {
        code: code,
        message: message,
        error: error
    };

    res.write(JSON.stringify(data));
    res.end();
};

var joinUser = function(id, password, name, phone, callback){
    pool.getConnection( function(err, conn) {
        
        if(err){
            
            if(conn){
                conn.release();
            }
            
            callback(err, null);
            return;
        }
        
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var reqData = {id:id, pw:password, name:name, phone:phone };
        
        var exec = conn.query('insert into user set ? ', reqData, 
        
        function(err, result){
            conn.release();
            console.log('실행 SQL: ' + exec.sql);

            if(err){
                console.log('SQL 실행 오류');
                console.dir(err);

                callback(err, null);
                return;
            }

            callback(null, result);
        });
    });
};


var idCheck = function(id, callback){
    pool.getConnection(function(err, conn){
        if(err){  
            if(conn){
                conn.release();
            }
            callback(err, null);
            return;
        }
        
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var column = 'id';
        var tabelname = 'user';
        
        var exec = conn.query("select ?? from ?? where id = ?", 
                              [column, tabelname, id], function(err, rows){
            
            conn.release();
            console.log('실행 SQL + ', exec.sql);
            
            if(rows.length > 0){
                console.log('사용중인 아이디가 있음:'+ id);
                callback(null, rows);
            }else{
                console.log('사용 가능한 아이디');
                callback(null, null);
            }
        });
    });
};

var joinuser = function(req, res){
    console.log('<joinuser> 호출 ');
    
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    var paramName = req.body.name || req.query.name;
    var paramPhone = req.body.phone || req.query.phone;
    
    //pool 객체 초기화 된경우
    if(pool){
        joinUser(paramId, paramPassword, paramName, paramPhone, function(err, joinedUser){
            //동일 아이디로 추가시는 오류
            if(err){
                
                console.error('회원가입 중 오류 : ' + err.stack);
                response(res, '500', 'error', err);
                return;
                
            }
            
            if(joinedUser){
                
                console.dir(joinedUser);
                console.dir('inserted' + joinedUser.affectedRows + 'rows');
                var insertId = joinedUser.insertId;
                console.log('추가한 레코드의 아이디: ' + insertId);
                response(res, '200', 'success', err);
                
            }else{
                
                response(res, '200', 'fail', err);
                
            }
        });
    }else{
        
        response(res, '503', 'db_fail', null);

    }
};

var idcheck = function(req, res){
    console.log('<idcheck 호출>');
    
    var paramId = req.body.id || req.query.id;
    
    if(pool){
        
        idCheck(paramId, function(err, rows){
            
            if(err){
                
                console.error('id 확인 중 오류 : ' + err.stack);              
                response(res, '500', 'error', err);
                return;
                
            }
            
            if(rows){
                
                console.log('사용중인 아이디 존재: ' + rows[0].id);
                response(res, '200', 'fail', null);
                
            }else{
                
                console.log('해당 아이디 사용 가능');
                response(res, '200', 'success', null);
                
            }
            
        });
        
    }else{
        response(res, '503', 'db_fail', null);
    }
};


module.exports.init = init;
module.exports.joinuser = joinuser;
module.exports.idcheck = idcheck;
