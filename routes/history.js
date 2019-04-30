var pool;

const init = (mysqlPool) => {
    console.log('[history init]');
    pool = mysqlPool;
}

const accountHistory = (id, sDate, lDate, callback) => {
    pool.getConnection((err, conn) => {
        if(err){  
            if(conn){
                
                conn.release();
                
            }
            
            callback(err, null);
            return;
            
        }
        
        var data = [id, sDate, lDate];
        var exec = conn.query("select * from aHistory where id = ? AND hDate >= ? AND hDate <= ?", 
                              data,
                              (err, rows) => {
            
            conn.release();
            console.log('실행 SQL = ', exec.sql);
            
            if(err){
                
                callback(err, null);
                return;
            }
            
            if(rows.length > 0){
                
                callback(null, rows);
                
            }else{

                callback(null, null);   //사용 가능 아이디
                
            }
        });
    });
};

const cardName = (rows, callback) => {
    
    var mysql = require('mysql');
    var config = require('../config/config');
    var pool2 = mysql.createPool(config.mysql_set[1]);
    
    pool2.getConnection((err, conn) => {
        if(err){  
            if(conn){
                
                conn.release();
                
            }
            
            return;
            
        }
        
        var exec = conn.query("select cType, cId from card",
                              (err, cardRows) => {
            
            conn.release();
            console.log('실행 SQL = ', exec.sql);
            
            if(err){
                callback(err, null);
                return;
            }
            
            if(cardRows.length > 0){
                //cId에 해당하는 이름 정보 저장
                let cIdPair = new Map();
                for(var i = 0; i < cardRows.length; ++i){

                    cIdPair.set(cardRows[i].cId, cardRows[i].cType);

                }

                let data = [];
            
                for(var i = 0; i < rows.length; i++){
                    data[i] = {
                        hDate:rows[i].hDate,
                        hType:rows[i].hType,
                        hValue:rows[i].hValue,
                        hName:rows[i].hName,
                        aBalance:rows[i].aBalance,
                        cName:cIdPair.get(rows[i].cId)
                    }
                }
                
                callback(err, data);
                
            }
            else{
                
                callback(null, null);
                
            }
                
        });
    });
};

const accounthistory = (req, res) => {
    console.log('[accounthistory] 호출');
    
    const { id, sDate, lDate } = req.body;
    
    if(pool){
        accountHistory(id, sDate, lDate, (err, rows) => {
            if(err){
                
                console.error('내역 조회 중 오류 : ' + err.stack);
                res.send({
                    code: '500',
                    message: 'error',
                    error: err,
                    history: null
                });
                return;
                
            }
            
            cardName(rows,(err, data) =>{
                if(err){
                
                    console.error('카드 이름 조회 중 오류 : ' + err.stack);
                    res.send({
                        code: '500',
                        message: 'error',
                        error: err,
                        history: null
                    });
                    return;
                
                }
                
                res.send({
                    code: '500',
                    message: 'success',
                    error: err,
                    history: data
                });
                
            });
 
        });
        
    }else{
        
        res.send({
            code: '503',
            message: 'db_fail',
            error: null,
            history: null
        });     
        
    }
};

module.exports.init = init;
module.exports.accounthistory = accounthistory;