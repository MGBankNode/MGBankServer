var pool;

const init = (mysqlPool) => {
    console.log('[analysis init]');
    pool = mysqlPool;
};


const analysisWeek = (id, dates, callback) => {
    pool.getConnection((err, conn) => {
        if(err){  
            
            if(conn){
                
                conn.release();
                
            }
            
            callback(err, null);
            return;
            
        }
        
        var datesArray = (dates.toString()).split(',');
        var weekCount = (datesArray.length - 1);
        var query = '';
        
        for(var i = 0; i < weekCount; ++i){
            
             query += "select SUM(hValue) as weekSum from aHistory where id = (select accountID from user where id = '"+ id + "') AND hDate>= '" + datesArray[i] + "' AND hDate< '" + datesArray[i + 1] + "' AND (hType = 1 OR hType = 2);";
            
        }
        
        var exec = conn.query(query,
                              (err, results) => {
            conn.release();
            console.log('실행 SQL = ' + exec.sql);
            
            if(err){
                
                callback(err, null);
                return;
                
            }
            
            let data = [];
            for(var i = 0; i < weekCount; ++i){
            
                var week = (i + 1).toString();
                
                if(results[i]){
                    
                    var weekSum = '0';
                    if(results[i][0].weekSum){
                        
                        weekSum = (results[i][0].weekSum).toString();
                    }
                    
                    data[i] = {
                        week:week,
                        weekSum:weekSum
                    }
                    
                }
            }
            
            
            callback(null, data);
            
        });
    });
};

const analysisweek = (req, res) => {
    console.log('[analysisweek] 호출');
    
    const { id, dates } = req.body;
    
    if(pool){
        analysisWeek(id, dates, (err, results) => {
            if(err){
                
                console.error('주차 소비 분석 중 오류 : ' + err.stack);
                res.send({code:'500', message:'error', error: err, data:null});
                
                return;
                
            }
                
            res.send({code:'200', message:'success', error: null, weekPattern:results});
            
        });
        
    }else{

        res.send({code:'503', message:'db_fail', error: null, data:null});

    }
};

module.exports.init = init;
module.exports.analysisweek = analysisweek;