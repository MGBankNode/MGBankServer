var pool;

const init = (mysqlPool) => {
    console.log('[login init]');
    pool = mysqlPool;
}
const userTimeUpdate = (data, id, conn, callback) => {
    var exec2 = conn.query("update user set update_at = CURRENT_TIMESTAMP where id = ?",
                           id,
                           (err, result) => {

        conn.release();
        console.log('실행 SQL2 = ', exec2.sql);

        if(result.affectedRows > 0){

            callback(null, data);   //접속 시간 업데이트 성공

        }else{

            callback(null, null);   //접속 시간 업데이트 실패

        }
    });    
};
const loginCheck = (id, password, callback) => {
    pool.getConnection((err, conn) => {
        
        if(err){  
            if(conn){
                
                conn.release();
                
            }
            
            callback(err, null);
            return;
        }
        

        var exeQuery = "select name, phone, accountCheck, update_at from user where id = ? and pw = ?";
        var exec = conn.query(exeQuery, 
                              [id, password], 
                              (err, userRows) => {
            console.log('실행 SQL = ', exec.sql);
            
            if(userRows.length > 0){
        
                if(userRows[0].accountCheck == 1){
                    
                    var exeQuery2 = "select aBalance from aHistory where id = (select accountID from nodeDB.user where id = ?) order by hId DESC limit 1";
                    var exec1= conn.query(exeQuery2,
                                          id,
                                          (err, historyRows) => {
                        
                        console.log('실행 SQL1 = ', exec1.sql);
                        
                        var aBalance = 0;
                        if(historyRows.length > 0){
                            
                            aBalance = historyRows[0].aBalance;
                            
                        }
                        
                        
                        var data = {
                            
                            id:id,
                            name:userRows[0].name, 
                            phone:userRows[0].phone,
                            accountCheck:(userRows[0].accountCheck).toString(), 
                            update_at:userRows[0].update_at,
                            aBalance:aBalance.toString()
                            
                        };
                        
                        userTimeUpdate(data, id, conn, callback);
                        
                    });
                
                }else{
                    
                    var data = {

                        id:id,
                        name:userRows[0].name, 
                        phone:userRows[0].phone,
                        accountCheck:(userRows[0].accountCheck).toString(), 
                        update_at:userRows[0].update_at,
                        aBalance:null

                    };    

                    userTimeUpdate(data, id, conn, callback);
                    
                }
                    
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
        
        loginCheck(id, password, function(err, data){
            
            if(err){
                
                console.error('로그인 중 오류 : ' + err.stack);
                res.send({
                        code:'500', 
                        message:'error', 
                        error: err,
                        data:null
                });
                return;
            }
            
            if(data){
                
                res.send({
                        code:'200', 
                        message:'success', 
                        error:null,
                        data:data
                });
                
            }else{
                
                res.send({
                        code:'200', 
                        message:'fail', 
                        error:null,
                        data:null
                });
                
            }
            
        });
        
    }else{
        
        res.send({
                code:'503',
                message:'db_fail', 
                error:null, 
                data:null

        });
    }
};

module.exports.init = init;
module.exports.logincheck = logincheck;
