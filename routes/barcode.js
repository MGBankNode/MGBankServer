var pool;

const init = (mysqlPool) => {
    console.log('[barcode init]');
    pool = mysqlPool;
}

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
                        data:null
                });
                return;
            }
            
            if(data){
                
                res.send({
                        code:'200', 
                        message:'success', 
                        error:null,
                        data:{
                            barcode:(data[0].mID).toString(),
                            point:(data[0].mPoint).toString()
                        }
                });
                
            }else{
                
                res.send({
                        code:'200', 
                        message:'fail', 
                        error:null,
                        data:null
                });
                
            }
            
        });
        
    }else{
        
        res.send({
                code:'503',
                message:'db_fail', 
                error:null, 
                data:null

        });
    }
};

module.exports.init = init;
module.exports.barcodepoint = barcodepoint;
