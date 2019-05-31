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
            
             query += "select SUM(hValue) as weekSum from aHistory where id = (select accountID from user where id = '"+ id + "') AND hDate>= '" + datesArray[i] + "' AND hDate< '" + datesArray[i + 1] + "' AND (hType = 1 OR hType = 2 OR hType = 3);";
            
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
                
                if(results[i][0]){
                    
                    var weekSum = '0';
                    if(results[i][0].weekSum){
                        
                        weekSum = (results[i][0].weekSum).toString();
                    }
                    
                    data[i] = {
                        week:week,
                        weekSum:weekSum
                    }
                    
                }else{
                    
                    data[i] = {
                        week:week,
                        weekSum:results[i].weekSum
                    }
                    
                }
            }
            
            
            callback(null, data);
            
        });
    });
};

const analysisDaily = (id, sDate, lDate, callback) => {
    pool.getConnection((err, conn) => {
        if(err){
            
            if(conn){
                
                conn.relsease();
                
            }
            
            callback(err, null);
            return;
        }

        let queryData = [ id, sDate, lDate ];
        
        var query = "select hDate, hValue from aHistory where id = (select accountID from user where id = ?) AND hDate>=? AND hDate<? AND (hType = 1 OR hType = 2 OR hType = 3)"
        
        var exec = conn.query(query, queryData, (err, result) => {
            conn.release();
            console.log("실행 SQL = " + exec.sql);
            
            if(err){
                
                callback(err, null);
                return;
                
            }
            
            
            let dailyPattern = [];
            
            var daily = 0;
            var dailySum = 0;
            
            var prevDay = '';
            var preDate = '';
            
            for(var i = 0; i < result.length; i++){
                
                var hDate = (result[i].hDate).toString();
                //console.dir(hDate);
                var curDay = hDate.substr(8, 2);
                
                //console.log(curDay);
                if(prevDay == ''){

                    prevDay = curDay;
                    preDate = hDate;
                }

                //날짜가 다른 경우
                if(curDay != prevDay){

                    dailyPattern[daily] = {
                        daily:((new Date(preDate).getDay()) + 1).toString(),
                        dailySum:dailySum.toString()
                    };

                    ++daily;

                    dailySum = 0;

                }

                
                dailySum += result[i].hValue;
                prevDay = curDay;
                preDate = hDate;

                if((i + 1) == result.length){

                    dailyPattern[daily] = {
                        daily:((new Date(preDate).getDay()) + 1).toString(),
                        dailySum:dailySum.toString()
                    };

                }
            }
            
            callback(null, dailyPattern);
            
        });
        
    });
}

const analysisdaily = (req, res) => {
    console.log('[analysisdaily] 호출');
    
    const { id, sDate, lDate } = req.body;
    
    if(pool){
        analysisDaily(id, sDate, lDate, (err, results) => {
            if(err){
                
                console.error('일별 소비 분석 중 오류 : ' + err.stack);
                res.send({code:'500', message:'error', error: err, dailyPattern:'null'});
                
                return;
                
            }
            console.dir(results);   
            res.send({code:'200', message:'success', error: 'null', dailyPattern:results});
            
        });
    }else{
        
        res.send({code:'503', message:'db_fail', error: 'null', dailyPattern:'null'});
        
    }
}
const analysisweek = (req, res) => {
    console.log('[analysisweek] 호출');
    
    const { id, dates } = req.body;
    
    if(pool){
        analysisWeek(id, dates, (err, results) => {
            if(err){
                
                console.error('주차 소비 분석 중 오류 : ' + err.stack);
                res.send({code:'500', message:'error', error: err, weekPattern:'null'});
                
                return;
                
            }
                
            res.send({code:'200', message:'success', error: 'null', weekPattern:results});
            
        });
        
    }else{

        res.send({code:'503', message:'db_fail', error: 'null', weekPattern:'null'});

    }
};

const analysisMonth = (id, dates, callback) => {
    pool.getConnection((err, conn) => {
        if(err){  
            
            if(conn){
                
                conn.release();
                
            }
            
            callback(err, null);
            return;
            
        }
        
       
        var datesArray = (dates.toString()).split(',');
        var monthCount = (datesArray.length - 1);
        var query = '';
        
        for(var i = 0; i < monthCount; ++i){
            
             query += "select SUM(hValue) as monthSum from aHistory where id = (select accountID from user where id = '"+ id + "') AND hDate>= '" + datesArray[i] + "' AND hDate< '" + datesArray[i + 1] + "' AND (hType = 1 OR hType = 2 OR hType = 3);";
            
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
            for(var i = 0; i < monthCount; ++i){
            
                var month = (i + 1).toString();
                
                if(results[i][0]){
                    
                    var monthSum = '0';
                    if(results[i][0].monthSum){
                        
                        monthSum = (results[i][0].monthSum).toString();
                    }
                    
                    data[i] = {
                        month:month,
                        monthSum:monthSum
                    }
                    
                }else{
                    
                    data[i] = {
                        month:month,
                        monthSum:(results[i].monthSum).toString()
                    }
                    
                }
            }
            
            
            callback(null, data);
            
        });
    });
};

const analysismonth = (req, res) => {
    console.log('[analysismonth] 호출');
    
    const { id, dates } = req.body;
    
    if(pool){
        analysisMonth(id, dates, (err, results) => {
            if(err){
                
                console.error('달 소비 분석 중 오류 : ' + err.stack);
                res.send({code:'500', message:'error', error: err, monthPattern:'null'});
                
                return;
                
            }
                
            if(results){
            
                res.send({code:'200', message:'success', error: 'null', monthPattern:results});
            
            }else{
                
                res.send({code:'200', message:'success', error: 'null', monthPattern:'null'});
                
            }
            
            
        });
        
    }else{

        res.send({code:'503', message:'db_fail', error: 'null', monthPattern:'null'});

    }
};

module.exports.init = init;
module.exports.analysisweek = analysisweek;
module.exports.analysisdaily = analysisdaily;
module.exports.analysismonth = analysismonth;