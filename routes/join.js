var pool;

const init = (mysqlPool) => {
    console.log('[join init]');
    pool = mysqlPool;
}


const joinUser = (id, password, name, phone, callback) => {
    pool.getConnection((err, conn) => {
        if(err){
            if(conn){
                
                conn.release();
                
            }
            
            callback(err, null);
            return;
        }
        
        var reqData = {id:id, pw:password, name:name, phone:phone };
        
        var exec = conn.query('insert into user set ? ', 
                              reqData, 
                              (err, result) => {
            conn.release();
            console.log('실행 SQL = ' + exec.sql);

            if(err){
                
                callback(err, null);
                return;
            }

            callback(null, result);
        });
    });
};


const idCheck = (id, callback) => {
    pool.getConnection((err, conn) => {
        if(err){  
            if(conn){
                
                conn.release();
                
            }
            
            callback(err, null);
            return;
            
        }
        
        var exec = conn.query("select id from user where id = ?", 
                              id,
                              function(err, rows){
            
            conn.release();
            console.log('실행 SQL = ', exec.sql);
            
            if(rows.length > 0){
                
                callback(null, rows);   //사용 중 아이디 존재
                
            }else{

                callback(null, null);   //사용 가능 아이디
                
            }
        });
    });
};

const joinuser = (req, res) => {
    console.log('[joinuser] 호출');
    
    const { id, password, name, phone } = req.body;
    
    if(pool){
        joinUser(id, password, name, phone, (err, joinedUser) => {
            if(err){
                
                console.error('회원가입 중 오류 : ' + err.stack);
                res.send({
                    code: '500',
                    message: 'error',
                    error: err
                });
                return;
                
            }
            
            if(joinedUser){
                
                res.send({
                    code: '200',
                    message: 'success',
                    error: null
                });
                
            }else{
                
                res.send({
                    code: '200',
                    message: 'fail',
                    error: null
                });
                
            }
        });
    }else{
        
        res.send({
            code: '503',
            message: 'db_fail',
            error: null
        });

    }
};

const idcheck = (req, res) => {
    console.log('[idcheck] 호출');
    
    const { id } = req.body;
    
    if(pool){
        idCheck(id, (err, rows) => {
            if(err){
                
                console.error('id 확인 중 오류 : ' + err.stack);
                res.send({
                    code: '500',
                    message: 'error',
                    error: err
                });
                return;
                
            }
            
            if(rows){
                
                res.send({
                    code: '200',
                    message: 'fail',
                    error: null
                });
                
            }else{
                
                res.send({
                    code: '200',
                    message: 'success',
                    error: null
                });                
                
            }
            
        });
        
    }else{
        
        res.send({
            code: '503',
            message: 'db_fail',
            error: null
        });     
        
    }
};


module.exports.init = init;
module.exports.joinuser = joinuser;
module.exports.idcheck = idcheck;
