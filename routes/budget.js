var pool;

const init = (mysqlPool) => {
    console.log('[budget init]');
    pool = mysqlPool;
}

const changeBudget = (id, budget, callback) => {
    pool.getConnection((err, conn) => {
        
        if(err){  
            if(conn){
                
                conn.release();
                
            }
            
            callback(err, null);
            return;
        }
        

        var exeQuery = "update user set budget = ? where id = ?";
        var exec = conn.query(exeQuery, 
                              [budget, id], 
                              (err, data) => {
            conn.release();
            console.log('실행 SQL = ', exec.sql);
            
            if(err){

                callback(err, null);
                return;

            }
            
            if(data){

                callback(err, data);
                    
            }else{
                
                callback(null, null);     
                
            }
            
        });
    });
};

const changebudget = (req, res) => {
    
    console.log('[changebudget] 호출');
    
    const { id, budget } = req.body;
    
    if(pool){
        
        changeBudget(id, budget, (err, data) => {
            
            if(err){
                
                console.error('예산 변경 중 오류 : ' + err.stack);
                res.send({
                        code:'500', 
                        message:'error', 
                        error: err
                });
                return;
            }
            
            if(data.affectedRows > 0){
                
                res.send({
                        code:'200', 
                        message:'success', 
                        error:null
                });
                
            }else{
                
                res.send({
                        code:'200', 
                        message:'fail', 
                        error:null
                });
                
            }
            
        });
        
    }else{
        
        res.send({
                code:'503',
                message:'db_fail', 
                error:null

        });
    }
};


const defaultBudget = (id, callback) => {
    pool.getConnection((err, conn) => {
        
        if(err){  
            if(conn){
                
                conn.release();
                
            }
            
            callback(err, null);
            return;
        }
        

        var exeQuery = "select budget from user where id = ?";
        var exec = conn.query(exeQuery, 
                              id, 
                              (err, data) => {
            conn.release();
            console.log('실행 SQL = ', exec.sql);
            
            if(err){

                callback(err, null);
                return;

            }
            
            if(data.length > 0){

                callback(err, (data[0].budget).toString());
                    
            }else{
                
                callback(null, null);     
                
            }
            
        });
    });
};

const defaultbudget = (req, res) => {
    
    console.log('[defaultbudget] 호출');
    
    const { id } = req.body;
    
    if(pool){
        
        defaultBudget(id, (err, data) => {
            
            if(err){
                
                console.error('예산 확인 중 오류 : ' + err.stack);
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
module.exports.defaultbudget = defaultbudget;
module.exports.changebudget = changebudget;
