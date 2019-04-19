var pool;

var init = function(mysqlPool){
    console.log('device init 호출');
    pool = mysqlPool;
}

var addDevice = function(mobile, osVersion, model, display, manufacturer, macAddress, callback){
    pool.getConnection(function(err, conn){
        if(err){  
            if(conn){
                conn.release();
            }
            callback(err, null);
            return;
        }
        
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var reqData = {mobile:mobile, osVersion:osVersion, model:model,
                       display:display, manufacturer:manufacturer, macAddress:macAddress };
        
        var exec = conn.query('insert into device set ? ', reqData, 
        
        function(err, result){
            conn.release();
            console.log('실행 SQL: ' + exec.sql);

            if(err){
                console.log('SQL 실행 오류');
                console.dir(err);

                callback(err, null);
                return;
            }

            callback(null, result);
        });
    });
};

var deviceCheck = function(mobile, callback){
    pool.getConnection(function(err, conn){
        if(err){  
            if(conn){
                conn.release();
            }
            callback(err, null);
            return;
        }
        
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var column = ['mobile'];
        var tabelname = 'device';
        
        var exec = conn.query("select ?? from ?? where mobile = ?", 
                              [column, tabelname, mobile], function(err, rows){
            
            conn.release();
            console.log('실행 SQL + ', exec.sql);
            
            if(rows.length > 0){
                console.log('디바이스 존재:'+ mobile);
                callback(null, rows);
            }else{
                console.log('디바이스 미존재');
                callback(null, null);
            }
        });
    });
};

var adddevice = function(req, res){
    console.log('<adddevice 호출>');
    
    var paramMobile = req.body.mobile || req.query.mobile;
    var paramOsVersion = req.body.osVersion || req.query.osVersion;
    var paramModel = req.body.model || req.query.model;
    var paramDisplay = req.body.display || req.query.display;
    var paramManufacturer = req.body.manufacturer || req.query.manufacturer;
    var paramMacAddress = req.body.macAddress || req.query.macAddress;
    
    if(pool){
        addDevice(paramMobile, 
                  paramOsVersion,
                  paramModel,
                  paramDisplay,
                  paramManufacturer,
                  paramMacAddress, 
                  function(err, addedDevice){
            
            if(err){
                
                console.error('단말 정보 추가 중 오류 : ' + err.stack);
                res.writeHead('500', {'Content-Type':'application/json;charset=utf8'});
                res.write(JSON.stringify({code:'500', message:'error', error: err}));
                res.end();
                return;
                
            }
            
            if(addedDevice){
                console.dir(addedDevice);
                res.writeHead('200', {'Content-Type':'application/json;charset=utf8'});
                res.write(JSON.stringify({code:'200', message:'success', error: null}));
                res.end();
            }else{
                res.writeHead('200', {'Content-Type':'application/json;charset=utf8'});
                res.write(JSON.stringify({code:'200', message:'fail', error: null}));
                res.end();
            }
            
        });
        
    }else{
        res.writeHead('503', {'Content-Type':'application/json;charset=utf8'});
        res.write(JSON.stringify({code:'503', message:'db_fail', error: null}));
        res.end();
    }
};

var devicecheck = function(req, res){
    console.log('<devicecheck 호출>');
    
    var paramMobile = req.body.mobile || req.query.mobile;
    
    if(pool){
        
        deviceCheck(paramMobile, function(err, rows){
            
            if(err){
                
                console.error('디바이스 확인 중 오류 : ' + err.stack);
                res.writeHead('500', {'Content-Type':'application/json;charset=utf8'});
                res.write(JSON.stringify({code:'500', message:'error', error: err}));
                res.end();
                
                return;
            }
            
            if(rows){
                
                console.dir(rows);
                res.writeHead('200', {'Content-Type':'application/json;charset=utf8'});
                res.write(JSON.stringify(
                    {
                        code:'200', 
                        message:'YES', 
                        error: null
                    }));
                res.end();
                
            }else{
                
                res.writeHead('200', {'Content-Type':'application/json;charset=utf8'});
                res.write(JSON.stringify(
                    {
                        code:'200', 
                        message:'NO', 
                        error: null
                    }));
                res.end();
                
            }
            
        });
        
    }else{
        
        res.writeHead('503', {'Content-Type':'application/json;charset=utf8'});
        res.write(JSON.stringify({code:'503', message:'db_fail', error: null}));
        res.end();
        
    }
};

module.exports.init = init;
module.exports.adddevice = adddevice;
module.exports.devicecheck = devicecheck;