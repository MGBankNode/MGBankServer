var pool;

const init = (mysqlPool) => {
    console.log('[login init]');
    pool = mysqlPool;
}

const loginCheck = (id, password, callback) => {
    pool.getConnection((err, conn) => {
        
        if(err){  
            if(conn){
                
                conn.release();
                
            }
            
            callback(err, null);
            return;
        }
        
        var column = ['name', 'accountCheck', 'update_at'];

        var exec = conn.query("select ?? from user where id = ? and pw = ?", 
                              [column, id, password], 
                              (err, rows) => {
            console.log('실행 SQL1 = ', exec.sql);
            
            if(rows.length > 0){
        
                var data = [ id, rows[0].name, rows[0].accountCheck, rows[0].update_at];
                
                var exec1 = conn.query("update user set update_at = CURRENT_TIMESTAMP where id = ?",
                                        id,
                                        (err, result) => {
                    conn.release();
                    console.log('실행 SQL2 = ', exec1.sql);
                    
                    if(result.affectedRows > 0){
                        
                        callback(null, data);   //접속 시간 업데이트 성공
                        
                    }else{

                        callback(null, null);   //접속 시간 업데이트 실패
                        
                    }
                });
                    
            }else{
                
                conn.release();
                callback(null, null);     
                
            }
            
        });
    });
};

const logincheck = (req, res) => {
    
    console.log('[logincheck] 호출');
    
    const { id, password } = req.body;
    
    if(pool){
        
        loginCheck(id, password, function(err, rows){
            
            if(err){
                
                console.error('로그인 중 오류 : ' + err.stack);
                res.send({
                        code:'500', 
                        message:'error', 
                        error: err,
                        id: null,
                        name: null,
                        accountCheck: null,
                        update_at: null
                });
                return;
            }
            
            if(rows){
                
                res.send({
                        code:'200', 
                        message:'success', 
                        error: null, 
                        id: rows[0],
                        name: rows[1],
                        accountCheck: rows[2],
                        update_at: rows[3]
                });
                
            }else{
                
                res.send({
                        code:'200', 
                        message:'fail', 
                        error: null,
                        id: null,
                        name: null,
                        accountCheck: null,
                        update_at: null
                });
                
            }
            
        });
        
    }else{
        
        res.send({
                code:'503',
                message:'db_fail', 
                error: null, 
                id: null,
                name: null,
                accountCheck: null,
                update_at: null
        });
        
    }
};

module.exports.init = init;
module.exports.logincheck = logincheck;
