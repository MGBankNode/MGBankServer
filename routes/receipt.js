var pool;

const init = (mysqlPool) => {
    console.log('[receipt init]');
    pool = mysqlPool;
}

const addReceipt = (hDate, hValue, hName, id, cId, callback) => {
    pool.getConnection((err, conn) => {
        
        if(err){  
            if(conn){
                
                conn.release();
                
            }
            
            callback(err, null);
            return;
        }
        
        
        var query1 = "update caweight set weight = weight + 1 where store = ? AND cId = ?;";
        var query3 = "update defaultCategory SET defaultCategory.cId = (select cId from caweight where store = '" + hName.toString() + "' AND cId <> 11 ORDER BY weight DESC LIMIT 1) where defaultCategory.store = (select store from caweight where store = '" + hName.toString() + "' AND cId <> 11 ORDER BY weight DESC LIMIT 1);"
        var exec1 = conn.query(query1 + query3,
                               [hName.toString(), cId],
                               (err, result1) => {
            console.log('실행 SQL4 = ' + exec1.sql);

            if(err){

                conn.release();
                callback(err, null);
                return;

            }
            
            
            if(result1[0].affectedRows && result1[0].affectedRows){
                
                var data = [hDate.toString(), hValue, hName.toString(), id, cId, hDate.toString(), id ];

                var query2 = "INSERT INTO nodeDB.aHistory(hDate, hType, hValue, hName, id, aNum, cId) VALUES(?, 3, ?, ?, (select accountID from user where id = ?), '현금', ?); SELECT hId from aHistory where hDate = ? AND id = (select accountID from user where id = ?);";
                var exec2 = conn.query(query2,
                                      data, 
                                      (err, result2) => {
                    conn.release();
                    console.log('실행 SQL = ', exec2.sql);
                    
                    if(err){

                        callback(err, null);
                        return;

                    }
            
                    
                    if(result2[0]){
                        
                        var myResult = result2[1];
                        
                        if(myResult.length > 0){
                            
                            var hId = (myResult[0].hId).toString();
                            callback(null, hId);  
                            
                        }else{
                            
                            callback(null, null);
                            
                        }


                    }else{

                        callback(null, null);     

                    }

                });
                
                
            }else{
                
                conn.release();
                callback(null, null);
                
            }

        });
    });
};

const addNewReceipt = (hDate, hValue, hName, id, cId, callback) => {
    pool.getConnection((err, conn) => {
        
        if(err){  
            if(conn){
                
                conn.release();
                
            }
            
            callback(err, null);
            return;
        }
        
        
        var query = 'insert into defaultCategory(store, cId) values(?, ?);CALL nodeDB.insertData(?);';
        var exec1 = conn.query(query,
                               [hName.toString(), cId, hName.toString()],
                               (err, result) => {
            console.log('실행 SQL = ' + exec1.sql);

            if(err){

                conn.release();
                callback(err, null);
                return;

            }
            
            if(result[0] && result[1]){
                
                addReceipt(hDate, hValue, hName, id, cId, (err, result) =>{
                    
                    if(err){
                        
                        callback(err, null);
                        return;
                        
                    }
                    
                    if(result){
                        
                        callback(null, result);
                        
                    }
                    else{
                        
                        callback(null, null);
                        
                    }
                    
                });
                
                
            }else{
                
                conn.release();
                callback(null, null);
                
            }
        });
    });     
};

const addnewreceipt = (req, res) => {

    console.log('[addnewreceipt] 호출');
    const { hDate, hValue, hName, id, cId } = req.body;
    
    if(pool){
        
        addNewReceipt(hDate, hValue, hName, id, cId, (err, data) => {
            
            if(err){
                
                console.error('영수증 내역 추가 중 오류 : ' + err.stack);
                res.send({
                    code:'500', 
                    message:'error', 
                    error: err
                });
                return;
            }
            
            
            if(data){
                
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
const addreceipt = (req, res) => {
    
    console.log('[addreceipt] 호출');
    
    const { hDate, hValue, hName, id, cId } = req.body;
    
    if(pool){
        
        addReceipt(hDate, hValue, hName, id, cId, (err, data) => {
            
            if(err){
                
                console.error('영수증 내역 추가 중 오류 : ' + err.stack);
                res.send({
                    code:'500', 
                    message:'error', 
                    error: err,
                    data:'null'
                });
                return;
            }
            
            
            if(data){
                
                res.send({
                    code:'200', 
                    message:'success', 
                    error:'null',
                    data:data
                });
                
            }else{
                
                res.send({
                    code:'200', 
                    message:'fail', 
                    error:'null',
                    data:'null'
                });
                
            }
                
        });
        
    }else{
        
        res.send({
            code:'503',
            message:'db_fail', 
            error:'null',
            data:'null'
        });
    }
};


const hnameCheck = (hName, callback) => {
    pool.getConnection((err, conn) => {
        
        if(err){  
            if(conn){
                
                conn.release();
                
            }
            
            callback(err, null);
            return;
        }
        

        var exeQuery = "select cId from defaultCategory where store = ?";
        var exec = conn.query(exeQuery,
                              (hName.toString()), 
                              (err, result) => {
            conn.release();
            console.log('실행 SQL = ', exec.sql);
            
            if(result.length > 0){
        
                callback(null, result[0].cId);  
                    
            }else{
                
                callback(null, null);     
                
            }
            
        });
    });
};

const hnamecheck = (req, res) => {
    
    console.log('[hnamecheck] 호출');
    
    const { hName } = req.body;
    
    if(pool){
        
        hnameCheck(hName, function(err, data){
            
            if(err){
                
                console.error('상점명 확인 중 오류 : ' + err.stack);
                res.send({
                        code:'500', 
                        message:'error', 
                        error: err,
                        data:'null'
                });
                return;
            }
            if(data){
                res.send({
                    code:'200', 
                    message:'success', 
                    error:'null',
                    data:(data).toString()
                });
            }
            else{
                
                res.send({
                    code:'200', 
                    message:'success', 
                    error:'null',
                    data:'null'
                });
                
            }     
        });
        
    }else{
        
        res.send({
                code:'503',
                message:'db_fail', 
                error:'null', 
                data:'null'

        });
    }
};

module.exports.init = init;
module.exports.hnamecheck = hnamecheck;
module.exports.addreceipt = addreceipt;
module.exports.addnewreceipt = addnewreceipt;
