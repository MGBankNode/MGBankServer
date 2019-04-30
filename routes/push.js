var pool;
var gcm = require('node-gcm');
var config = require('../config/config');

const init = (mysqlPool) => {
    console.log('[push init]');
    pool = mysqlPool;
}


const GetRegistrationId = (callback) => {
    pool.getConnection((err, conn) => {
        if(err){  
            
            if(conn){
                
                conn.release();
                
            }
            
            callback(err, null);
            return;
            
        }        
        
        var exec = conn.query("select * from device", 
                              (err, result) => {
            conn.release();
            console.log('실행 SQL = ' + exec.sql);

            if(err){
            
                callback(err, null);
                return;
                
            }

            callback(null, result);
            
        });
    });
};

var sendpush = (req, res) => {
    var paramPushMsg = req.body.data || req.query.data;
    
    if(pool){
        
        GetRegistrationId((err, results) => {
            
            if(err){
                
                console.error('푸시 전송 조회 중 오류 : ' + err.stack);
                res.writeHead('500', {'Context-Type':'text/html;charset=utf8'});
                res.write('<h2>푸시 전송 조회 중 오류</h2>');
                res.end();
                return;
                
            }
            
            if(results){
                var resIds = [];
                for(var i = 0; i < results.length; ++i){
                    resIds.push(results[i].registrationId);
                }
                
                var message = new gcm.Message({
				    priority: 'high',
				    timeToLive: 3
				});
				message.addData('command', 'show');
				message.addData('type', 'text/plain');
				message.addData('data', paramPushMsg);

                var sender = new gcm.Sender(config.fcm_api_key);
                
                sender.send(message, resIds, (err, result) => {
                    
                    if(err){
                        
                        throw err;
                        
                    }
                    
                    res.writeHead('200', {'Context-Type':'text/html;charset=utf8'});
                    res.write('<h2>푸시 전송 조회 중 성공</h2>');
                    res.end();
                    
                });
                
				



            }else{
                
                res.writeHead('503', {'Context-Type':'text/html;charset=utf8'});
                res.write('<h2>등록 단말 미존재</h2>');
                res.end();

            }
            
        });
        
    }else{
        res.writeHead('503', {'Context-Type':'text/html;charset=utf8'});
        res.write('<h2>푸시 전송 조회 중 데이터 베이스 연결 오류</h2>');
        res.end();
    }
    
};

module.exports.init = init;
module.exports.sendpush = sendpush;