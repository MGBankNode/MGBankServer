var pool;

const init = (mysqlPool) => {
    console.log('[analysis init]');
    pool = mysqlPool;
};


const analysisPattern = (id, callback) => {
    pool.getConnection((err, conn) => {
        if(err){  
            
            if(conn){
                
                conn.release();
                
            }
            
            callback(err, null);
            return;
            
        }
        var Data = [];
        for(var i = 0; i < 12; ++i){
            
            Data[i] = id;
            
        }
        
        var query = 'SELECT * FROM (SELECT COUNT(*) AS c1 FROM nodeDB.aHistory WHERE id=? AND cId=1) AS t1, (SELECT COUNT(*) AS c2 FROM nodeDB.aHistory WHERE id=? AND cId=2) AS t2, (SELECT COUNT(*) AS c3 FROM nodeDB.aHistory WHERE id=? AND cId=3) AS t3, (SELECT COUNT(*) AS c4 FROM nodeDB.aHistory WHERE id=? AND cId=4) AS t4, (SELECT COUNT(*) AS c5 FROM nodeDB.aHistory WHERE id=? AND cId=5) AS t5, (SELECT COUNT(*) AS c6 FROM nodeDB.aHistory WHERE id=? AND cId=6) AS t6, (SELECT COUNT(*) AS c7 FROM nodeDB.aHistory WHERE id=? AND cId=7) AS t7, (SELECT COUNT(*) AS c8 FROM nodeDB.aHistory WHERE id=? AND cId=8) AS t8, (SELECT COUNT(*) AS c9 FROM nodeDB.aHistory WHERE id=? AND cId=9) AS t9, (SELECT COUNT(*) AS c10 FROM nodeDB.aHistory WHERE id=? AND cId=10) AS t10, (SELECT COUNT(*) AS c11 FROM nodeDB.aHistory WHERE id=? AND cId=11) AS t11, (SELECT COUNT(*) AS cTotal FROM nodeDB.aHistory WHERE id=? AND hType=2) AS tAll';
        
        var exec = conn.query(query, 
                              Data, 
                              (err, result) => {
            conn.release();
            console.log('실행 SQL = ' + exec.sql);
            
            if(err){
                
                callback(err1, null);
                return;
                
            }

            if(result.length > 0){
                
                callback(null, result);
                
            }else{

                callback(null, null);   //사용 가능 아이디
                
            }
            
        });
    });
};

const analysispattern = (req, res) => {
    console.log('[analysispattern] 호출');
    
    const { id } = req.body;
    
    if(pool){
        analysisPattern(id, (err, data) => {
            if(err){
                
                console.error('소비 분석 중 오류 : ' + err.stack);
                res.send({code:'500', message:'error', error: err, data:null});
                
                return;
                
            }
            
            if(data.length){
                var cTotal = data[0].cTotal;
                
                var sendData = {

                    cId1:(data[0].c1 / cTotal).toString(),
                    cId2:(data[0].c2 / cTotal).toString(),
                    cId3:(data[0].c3 / cTotal).toString(),
                    cId4:(data[0].c4 / cTotal).toString(),
                    cId5:(data[0].c5 / cTotal).toString(),
                    cId6:(data[0].c6 / cTotal).toString(),
                    cId7:(data[0].c7 / cTotal).toString(),
                    cId8:(data[0].c8 / cTotal).toString(),
                    cId9:(data[0].c9 / cTotal).toString(),
                    cId10:(data[0].c10 / cTotal).toString(),
                    cId11:(data[0].c11 / cTotal).toString(),
                    
                };
                
                res.send({code:'200', message:'success', error: null, data:sendData});
                
            }
            else{
                
                res.send({code:'200', message:'fail', error: null, data:null});
                
            }
            
        });
        
    }else{

        res.send({code:'503', message:'db_fail', error: null, data:null});

    }
};

module.exports.init = init;
module.exports.analysispattern = analysispattern;