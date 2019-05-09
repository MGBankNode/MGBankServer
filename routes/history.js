var pool;

const init = (mysqlPool) => {
    console.log('[history init]');
    pool = mysqlPool;
}
const accountBalance = (id, callback) => {
     pool.getConnection((err, conn) => {
         
        if(err){  
            
            if(conn){
                
                conn.release();
                
            }
            
            callback(err, null);
            return;
            
        }
         
        var query = "select aBalance from aHistory where id = (select accountID from nodeDB.user where id = ?) order by hId DESC limit 1";
        var exec= conn.query(query,
                              id,
                              (err, data) => {

            conn.release();
            console.log('실행 SQL = ', exec.sql);

            if(err){

                callback(err, null);
                return;

            }

            if(data.length > 0){

                callback(null, data);

            }
            else{
                
                callback(null, null);
                
            }

        });
     });
    
};

const accountbalance = (req, res) => {
    
    console.log('[accountbalance] 호출');
    
    const { id } = req.body;
    
    if(pool){
        accountBalance(id, (err, rows) => {
            if(err){
                
                console.error('잔액 조회 중 오류 : ' + err.stack);
                res.send({
                    code: '500',
                    message: 'error',
                    error: err,
                    aBalance: null
                });
                return;
                
            }

            if(rows){
                
                res.send({
                    code: '500',
                    message: 'success',
                    error: err,
                    aBalance: (rows[0].aBalance).toString()
                });
                
            }else{
                
                res.send({
                    code: '500',
                    message: 'fail',
                    error: err,
                    aBalance: null
                });
                
            }
        });
        
    }else{
        
        res.send({
            code: '503',
            message: 'db_fail',
            error: null,
            aBalance: null
        });     
        
    }
};

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
        var exeQuery = "select hDate, hType, hValue, hName, aBalance, cNum, (select cName from category where cId = aHistory.cId) as cName from aHistory where id = (select accountID from nodeDB.user where id = ?) AND hDate >= ? AND hDate <= ?";
        
        var exec = conn.query(exeQuery, 
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

const cardName = (id, rows, callback) => {
    
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
        
        
        var exeQuery = "select cNum, (select cType from card where cId = account_card.cId) as cType from account_card where id = (select accountID from nodeDB.user where id = ?)";
        
        var exec = conn.query(exeQuery, id,
                              (err, cardRows) => {
            
            conn.release();
            console.log('실행 SQL = ', exec.sql);
            
            if(err){
                callback(err, null);
                return;
            }
            
            if(cardRows.length > 0){
                //cId에 해당하는 이름 정보 저장
                let cNumPair = new Map();
                for(var i = 0; i < cardRows.length; ++i){

                    cNumPair.set(cardRows[i].cNum, cardRows[i].cType);

                }

                let data = [];
            
                for(var i = 0; i < rows.length; i++){
                    var hType = rows[i].hType;
                    
                    if(hType == 0){
                        
                        hType = '입금';
                        
                    }else if(hType == 1){
                        
                        hType = '출금';
                        
                    }else if(hType == 2){
                     
                        hType = '카드';
                            
                    }
                    
                    var cType = null;
                    
                    if(rows[i].cNum != ''){
                        
                        cType = cNumPair.get(rows[i].cNum);
                        
                    }
                    
                    data[i] = {
                        hDate:rows[i].hDate,
                        hType:hType,
                        hValue:(rows[i].hValue).toString(),
                        hName:rows[i].hName,
                        aBalance:(rows[i].aBalance).toString(),
                        cType:cType,
                        cName:rows[i].cName
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
            
            cardName(id, rows, (err, data) =>{
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
module.exports.accountbalance = accountbalance;