var pool;

const init = (mysqlPool) => {
    console.log('[category init]');
    pool = mysqlPool;
}

const updateCategory = (id, hId, prev, cur, callback) => {
    pool.getConnection((err, conn) => {
        
        if(err){  
            if(conn){
                
                conn.release();
                
            }
            
            callback(err, null);
            return;
        }

        var query1 = "update aHistory set cId='" + cur + "' where id = (select accountID from user where id = '" + id + "') AND hName = (select * from (select hName from aHistory where hId = '" + hId + "')as X);";
        
        var query2 = "update caweight SET weight=weight-1 where cId='" + prev +"' AND store=(select hName from aHistory where hId = '" + hId + "') AND cId<>11;";
        var query3 = "update caweight SET weight=weight+1 where cId='" + cur +"' AND store=(select hName from aHistory where hId = '" + hId + "') AND cId<>11;";
        
        var query4 = "update defaultCategory SET defaultCategory.cId = (select cId from caweight where store = (select hName from aHistory where hId = '" + hId + "') AND cId <> 11 ORDER BY weight DESC LIMIT 1) where defaultCategory.store = (select store from caweight where store = (select hName from aHistory where hId = '" + hId + "') AND cId <> 11 ORDER BY weight DESC LIMIT 1);"
        
        var exeQuery = query1 + query2 + query3 + query4;
        var exec = conn.query(exeQuery,
                              (err, results) => {
            conn.release();
            console.log('실행 SQL1 = ', query1);
            console.log('실행 SQL2 = ', query2);
            console.log('실행 SQL3 = ', query3);
            console.log('실행 SQL4 = ', query4);
            
            if(err){
                
                callback(err, null);
                return;
            }
            
            if(results){
        
                callback(null, results);
                    
            }else{

                callback(null, null);     
                
            }
            
        });
    });
};

const updatecategory = (req, res) => {
    
    console.log('[updatecategory] 호출');
    
    const { id, hId, prevCategory, curCategory } = req.body;
    
    if(pool){
        
        updateCategory(id, hId, prevCategory, curCategory, (err, results) => {
            
            if(err){
                
                console.error('카테고리 변경 중 오류 : ' + err.stack);
                res.send({
                        code:'500', 
                        message:'error', 
                        error: err
                });
                return;
            }
            
            if(results[0].affectedRows && results[1]
               && results[2] && results[3] ){
                
                res.send({
                        code:'200', 
                        message:'success', 
                        error:'null'
                });
                
            }else{
                
                res.send({
                        code:'200', 
                        message:'fail', 
                        error:'null'
                });
                
            }
            
        });
        
    }else{
        
        res.send({
                code:'503',
                message:'db_fail', 
                error:'null'

        });
    }
};

module.exports.init = init;
module.exports.updatecategory = updatecategory;
