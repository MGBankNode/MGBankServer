var pool;

const init = (mysqlPool) => {
    console.log('[account init]');
    pool = mysqlPool;
}

const addAccount = (id, callback) => {
    pool.getConnection((err, conn) => {
        if(err){  
            
            if(conn){
                
                conn.release();
                
            }
            
            callback(err, null);
            return;
            
        }
        
        //은행쪽 아이디 확인
        var execQuery1 = 'select id from accountDB.client where (phone, name)=(select phone, name from nodeDB.user where id= ?)';
        
        var exec1 = conn.query(execQuery1, 
                              id, 
                              (err1, result) => {
            console.log('실행 SQL1 = ' + exec1.sql);
            
            if(err1){
                
                conn.release();
                callback(err1, null);
                return;
                
            }

            if(result.length > 0){      //은행쪽 아이디 존재시, 계좌등록 위한 accountCheck 값 update
                
                var accountDB_ID = result[0].id;
                
                var execQuery2 = 'update nodeDB.user set accountCheck=1 WHERE id = ?';
                
                var exec2 = conn.query(execQuery2, 
                                       id, 
                                       (err2, result2) => {
                    console.log('실행 SQL2 = ' + exec2.sql);
                    
                    if(err2){
                        
                        conn.release();
                        callback(err2, null);
                        return;

                    }
                    
                    if(result2.affectedRows > 0){   //accountCheck 값 update 성공
                        
                        var execQuery3 = 'insert into nodeDB.defaultCategory(store, cId) select DISTINCT hName, 11 from accountDB.aHistory where accountDB.aHistory.id = ? and accountDB.aHistory.hType=2 and aHistory.hName not in (select store from nodeDB.defaultCategory)';
                        
                        var exec3 = conn.query(execQuery3,
                                              accountDB_ID,
                                              (err3, result3) => {
                            console.log('실행 SQL3 = ' + exec3.sql);
                    
                            if(err3){
                                
                                conn.release();
                                callback(err3, null);
                                return;

                            }
                            
                            if(result3){    //카드내역에 따른 카테고리 추가 성공
                                
                                var execQuery4 = 'update nodeDB.caweight, (select DISTINCT store, cId from nodeDB.defaultCategory where nodeDB.defaultCategory.store in (select hName from accountDB.aHistory where accountDB.aHistory.id = ? AND accountDB.aHistory.hType=2)) as a set weight = weight+1 where a.store = nodeDB.caweight.store AND a.cId = nodeDB.caweight.cId';
                                
                                                        
                                var exec4 = conn.query(execQuery4,
                                                       accountDB_ID,
                                                       (err4, result4) => {
                                    console.log('실행 SQL4 = ' + exec4.sql);
                                    
                                    if(err4){
                                        
                                        conn.release();
                                        callback(err4, null);
                                        return;
                                        
                                    }
                                    
                                    if(result4.affectedRows > 0){   //카테고리 가중치 업데이트 성공
                                        
                                        var execQuery5 = 'select DISTINCT store from nodeDB.defaultCategory where nodeDB.defaultCategory.store not in (select store from nodeDB.caweight)';
                                        
                                        var exec5 = conn.query(execQuery5, 
                                                               (err5, result5) => {
                                            console.log('실행 SQL5 = ' + exec5.sql);
                                            if(err5){
                                                
                                                conn.release();
                                                callback(err5, null);
                                                return;
                                                
                                            }
                                            
                                            if(result5.length > 0){
                                                
                                                var Nquery = "";
                                                
                                                for(var i = 0; i < result5.length; ++i){
                                                    
                                                    Nquery += "call nodeDB.insertData('" + result5[i].store + "');";
                                                    
                                                }
                                                
                                                var Nexec = conn.query(Nquery, (Nerr, Nresult) =>{
                                                        
                                                        console.log('실행 SQL5.N= ' + Nexec.sql);
                                                        if(Nerr){
                                                            
                                                            conn.release();
                                                            callback(Nerr, null);
                                                            return;
                                                        }
                                                    
                                                });
                                                
                                            }
                                            
                                            var execQuery6 = "insert into nodeDB.aHistory(hId, hDate, hType, hValue, hName, id, aBalance, cNum, aNum, cId) (SELECT hId, hDate, hType, hValue, hName, id, aBalance, cNum, aNum, cId FROM accountDB.aHistory, nodeDB.defaultCategory WHERE id=? AND CASE accountDB.aHistory.hType WHEN 0 THEN nodeDB.defaultCategory.store='계좌입금' WHEN 1 THEN nodeDB.defaultCategory.store='계좌출금' WHEN 2 THEN accountDB.aHistory.hName=nodeDB.defaultCategory.store END)";
                                            
                                            var exec6 = conn.query(execQuery6, 
                                                                   accountDB_ID,
                                                                  (err6, result6) => {
                                                conn.release();
                                                console.log('실행 SQL6 = ' + exec6.sql);
                                                
                                                if(err6){
                                                    
                                                    callback(err6, null);
                                                    return;
                                                    
                                                }
                                                
                                                if(result6){        //nodeDB로 내역 추가 성공
                                                    
                                                    callback(null, "success");
                                                    
                                                }else{              //nodeDB로 내역 추가 실패
                                                    
                                                    callback(null, "history_insert_fail");
                                                    
                                                }
                                            });
                                              
                                        });
                                        
                                    }else{      //카테고리 가중치 업데이트 실패
                                        
                                        callback(null, "caweigth_update_fail")
                                        
                                    }
                                });
                                
                            }else{          //추가 실패
                                
                                callback(null, "category_insert_fail");
                                
                            }
                            
                        });
                        
                    }else{      //ccountCheck 값 update 실패
                        
                        callback(null, "account_update_fail");
                        
                    }
                });
                
                
            }else{      //은행쪽 아이디 미존재
                
                callback(null, "id_check_fail");
                
            }

            
        });
    });
};

const addaccount = function(req, res){
    console.log('[addaccount] 호출');
    
    const { id } = req.body;
    
    if(pool){
        addAccount(id, (err, data) => {
            if(err){
                
                console.error('계좌 등록 중 오류 : ' + err.stack);
                res.send({code:'500', message:'error', error: err});
                
                return;
                
            }
            
            if(data == "success"){
                
                res.send({code:'200', message:'success', error: null});
                
            }else if(data == "history_insert_fail"){
                
                res.send({code:'200', message:'history_insert_fail', error: null});
                
            }else if(data == "caweigth_update_fail"){
                
                res.send({code:'200', message:'caweigth_update_fail', error: null});
                
            }else if(data == "category_insert_fail"){
                
                res.send({code:'200', message:'category_insert_fail', error: null});
                
            }else if(data == "account_update_fail"){
                
                res.send({code:'200', message:'account_update_fail', error: null});
                
            }else if(data == "id_check_fail"){
                
                res.send({code:'200', message:'id_check_fail', error: null});
                
            }
            
        });
        
    }else{

        res.send({code:'503', message:'db_fail', error: null});

    }
};



module.exports.init = init;
module.exports.addaccount = addaccount;