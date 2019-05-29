var pool;

const init = (mysqlPool) => {
    console.log('[barcode init]');
    pool = mysqlPool;
}

const barcodeInfo = (barcode, callback) => {
    pool.getConnection((err, conn) => {
        
        if(err){  
            if(conn){
                
                conn.release();
                
            }
            
            callback(err, null);
            return;
        }
        

        var exeQuery = "select name, mPoint from user, membership where user.mID = ? AND membership.mID = ?";
        var exec = conn.query(exeQuery, 
                              [barcode, barcode], 
                              (err, result) => {
            conn.release();
            console.log('실행 SQL = ', exec.sql);

            if(result){

                callback(null, result); 

            }else{

                callback(null, null);

            }
 
        });
    });
};

const addPoint = (barcode, point, callback) => {
    pool.getConnection((err, conn) => {
        
        if(err){  
            if(conn){
                
                conn.release();
                
            }
            
            callback(err, null);
            return;
        }
        

        var exeQuery = "update membership set mPoint = mPoint + ? where mID = ?";
        var exec = conn.query(exeQuery, 
                              [point, barcode], 
                              (err, result) => {
            conn.release();
            console.log('실행 SQL = ', exec.sql);

            if(result){

                callback(null, result); 

            }else{

                callback(null, null);

            }
 
        });
    });
};


const barcodePoint = (id, callback) => {
    pool.getConnection((err, conn) => {
        
        if(err){  
            if(conn){
                
                conn.release();
                
            }
            
            callback(err, null);
            return;
        }
        

        var exeQuery = "select mID, mPoint from membership where mID = (select mID from user where id=?)";
        var exec = conn.query(exeQuery, 
                              id, 
                              (err, result) => {
            conn.release();
            console.log('실행 SQL = ', exec.sql);

            if(result){

                callback(null, result); 

            }else{

                callback(null, null);

            }
 
        });
    });
};

const barcodepoint = (req, res) => {
    
    console.log('[barcodepoint] 호출');
    
    const { id } = req.body;
    
    if(pool){
        
        barcodePoint(id, (err, data) => {
            
            if(err){
                
                console.error('포인트 중 오류 : ' + err.stack);
                res.send({
                        code:'500', 
                        message:'error', 
                        error: err,
                        data:'null'
                });
                return;
            }
            
            if(data){
                
                res.send({
                        code:'200', 
                        message:'success', 
                        error:'null',
                        data:{
                            barcode:(data[0].mID).toString(),
                            point:(data[0].mPoint).toString()
                        }
                });
                
            }else{
                
                res.send({
                        code:'200', 
                        message:'fail', 
                        error:'null',
                        data:'null'
                });
                
            }
            
        });
        
    }else{
        
        res.send({
                code:'503',
                message:'db_fail', 
                error:'null', 
                data:'null'

        });
    }
};

const barcodeinfo = (req, res) =>{
    console.log('[barcodeinfo] 호출');
    
    const { barcode } = req.body;
    
    if(pool){
        
        barcodeInfo(barcode, (err, data) => {
            
            if(err){
                
                console.error('바코드 정보 조회 중 오류 : ' + err.stack);
                res.send({
                        code:'500', 
                        message:'error', 
                        error: err,
                        data:'null'
                });
                return;
            }
            
            if(data){
                
                res.send({
                        code:'200', 
                        message:'success', 
                        error:'null',
                        data:{
                            name:data[0].name,
                            point:(data[0].mPoint).toString()
                        }
                });
                
            }else{
                
                res.send({
                        code:'200', 
                        message:'fail', 
                        error:'null',
                        data:'null'
                });
                
            }
            
        });
        
    }else{
        
        res.send({
                code:'503',
                message:'db_fail', 
                error:'null', 
                data:'null'
        });
        
    }
};

const addpoint = (req, res) => {
    console.log('[addpoint] 호출');
    
    const { barcode, point } = req.body;
    
    if(pool){
        
        addPoint(barcode, point, (err, data) => {
            
            if(err){
                
                console.error('포인트 적립 중 오류 : ' + err.stack);
                res.send({
                        code:'500', 
                        message:'error', 
                        error: err
                });
                return;
            }
            
            if(data.affectedRows > 0){
                
                res.send({
                        code:'200', 
                        message:'success', 
                        error:'null'
                });
                
            }else{
                
                res.send({
                        code:'200', 
                        message:'fail', 
                        error:'null'
                });
                
            }
            
        });
        
    }else{
        
        res.send({
                code:'503',
                message:'db_fail', 
                error:'null'
        });
        
    }
};

module.exports.init = init;
module.exports.barcodepoint = barcodepoint;
module.exports.barcodeinfo = barcodeinfo;
module.exports.addpoint = addpoint;
