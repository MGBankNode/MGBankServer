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
        var exeQuery = "select hDate, hType, hValue, hName, aBalance, (select cType from accountDB.card where cId = (select cId from accountDB.account_card where cNum = nodeDB.aHistory.cNum)) as cType, cName from nodeDB.aHistory, nodeDB.category where id = (select accountID from nodeDB.user where id = ?) AND hDate>=? AND hDate<=? AND nodeDB.aHistory.cId=nodeDB.category.cId";
        
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
                    history: null,
                    daily_history:null
                });
                return;
                
            }
            
            if(rows){
                
                let data = [];
                let daily_data = [];
                
                var prevDay = '';
                var benefit = 0;
                var loss = 0;
                
                var j = 0;
                
                for(var i = 0; i < rows.length; i++){
                    
                    var hDate = (rows[i].hDate).toString();
                    var curDay = hDate.substr(8, 2);
                    var hType = rows[i].hType;
                    
                    if(prevDay == ''){
                        
                        prevDay = curDay;
                        
                    }
                    
                    //현재 날짜 보다 큰 경우, 처음부터 시작
                    if((curDay * 1) > (prevDay * 1)){
                        
                        daily_data[j] = {
                            day:prevDay,
                            benefit:benefit.toString(),
                            loss:loss.toString()
                        };
                        
                        ++j;
                        
                        benefit = 0;
                        loss = 0;
                        
                    }
                        
                    if(hType == 0){

                        hType = '입금';
                        benefit += rows[i].hValue;

                    }else if(hType == 1){

                        hType = '출금';
                        loss += rows[i].hValue;

                    }else if(hType == 2){

                        hType = '카드';
                        loss += rows[i].hValue;

                    }
                    
                    
                    prevDay = curDay;
                    
                    if((i + 1) == rows.length){
                        
                        daily_data[j] = {
                            day:prevDay,
                            benefit:benefit.toString(),
                            loss:loss.toString()
                        };
                        
                    }
                    
                    data[i] = {
                        hDate:rows[i].hDate,
                        hType:hType,
                        hValue:(rows[i].hValue).toString(),
                        hName:rows[i].hName,
                        aBalance:(rows[i].aBalance).toString(),
                        cType:rows[i].cType,
                        cName:rows[i].cName
                    }
                }
                
                console.dir({
                    code: '500',
                    message: 'success',
                    error: err,
                    history: data,
                    daily_history:daily_data
                });
                
                res.send({
                    code: '500',
                    message: 'success',
                    error: err,
                    history: data,
                    daily_history:daily_data
                });
                
            }else{
                
                res.send({
                    code: '500',
                    message: 'fail',
                    error: err,
                    history: null,
                    daily_history: null
                });
                
            }
 
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