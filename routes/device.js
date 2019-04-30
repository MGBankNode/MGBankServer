var pool;

const init = (mysqlPool) => {
    console.log('[device init]');
    pool = mysqlPool;
}

const addDevice = (mobile, osVersion, model, display, manufacturer, macAddress, registrationId, callback) => {
    pool.getConnection((err, conn) => {
        if(err){  
            
            if(conn){
                
                conn.release();
                
            }
            
            callback(err, null);
            return;
            
        }
        
        var reqData = 
            {
                mobile:mobile, 
                osVersion:osVersion, 
                model:model,
                display:display,
                manufacturer:manufacturer,
                macAddress:macAddress,
                registrationId:registrationId
            };
        
        var exec = conn.query('insert into device set ? ', 
                              reqData, 
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

const deviceCheck = (mobile, callback) => {
    pool.getConnection((err, conn) => {
        if(err){  
            
            if(conn){
                
                conn.release();
                
            }
            
            callback(err, null);
            return;
            
        }
        
        var exec = conn.query("select mobile from device where mobile = ?", 
                              mobile,
                              (err, rows) => {
            
            conn.release();
            console.log('실행 SQL = ', exec.sql);
            
            if(rows.length > 0){

                callback(null, rows);   //디바이스 존재
                
            }else{

                callback(null, null);   //디바이스 미존재
                
            }
        });
    });
};

const deleteDevice = (mobile, callback) => {
    pool.getConnection((err, conn) => {
        if(err){  
            
            if(conn){
                
                conn.release();
                
            }
            
            callback(err, null);
            return;
            
        }        
        
        var exec = conn.query("delete from device where mobile = ?",
                              mobile, 
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

const adddevice = function(req, res){
    console.log('[adddevice] 호출');
    
    const { mobile, osVersion, model, display, manufacturer, macAddress, registrationId} = req.body;
    
    if(pool){
        addDevice(mobile, osVersion, model, display, manufacturer, macAddress, registrationId, 
                  (err, addedDevice) => {
            
            if(err){
                
                console.error('디바이스 추가 중 오류 : ' + err.stack);
                res.send({code:'500', message:'error', error: err});
                return;
                
            }
            
            if(addedDevice){

                res.send({code:'200', message:'success', error: null});
                
            }else{

                res.send({code:'200', message:'fail', error: null});

            }
            
        });
        
    }else{

        res.send({code:'503', message:'db_fail', error: null});

    }
};

const devicecheck = (req, res) => {
    console.log('[devicecheck] 호출');
    
    const { mobile } = req.body;
    
    if(pool){
        deviceCheck(mobile, 
                    (err, rows) => {
            
            if(err){
                
                console.error('디바이스 확인 중 오류 : ' + err.stack);
                res.send({code:'500', message:'error', error: err});
                return;
            }
            
            if(rows){
                
                res.send({code:'200', message:'YES', error: null});

                
            }else{
                
                res.send({code:'200', message:'NO', error: null});

            }
            
        });
        
    }else{
        
        res.send({code:'503', message:'db_fail', error: null});
        
    }
};

const deletedevice = (req, res) => {
    console.log('[deletedevice] 호출');
    
    const { mobile } = req.body;
    
    if(pool){
        deleteDevice(mobile,  
                     (err, deletedDevice) => {
            
            if(err){
                
                console.error('단말 정보 제거 중 오류 : ' + err.stack);
                res.send({code:'500', message:'error', error: err});
                return;
                
            }
            
            if(deletedDevice){

                res.send({code:'200', message:'success', error: null});

            }else{

                res.send({code:'200', message:'fail', error: null});

            }
            
        });
        
    }else{

        res.send({code:'503', message:'db_fail', error: null});
        
    }
};


module.exports.init = init;
module.exports.adddevice = adddevice;
module.exports.devicecheck = devicecheck;
module.exports.deletedevice = deletedevice;