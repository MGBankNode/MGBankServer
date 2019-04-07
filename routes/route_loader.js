var route_loader = {};
var config = require('../config/config');

route_loader.init = function(app, router, pool){
    
    console.log('route_loader 호출');
    
    return initRoutes(app, router, pool);
}

function initRoutes(app, router, pool){
    
    var infoLen = config.route_info.length;
    
    for(var i = 0; i < infoLen; i++){
        
        var curRoute = config.route_info[i];
        var curModule = require(curRoute.file);
        
        curModule.init(pool);
        
        if(curRoute.type == 'get'){
            
            router.route(curRoute.path).get(curModule[curRoute.method]);
            
        }else if(curRoute.type == 'post'){
            
            router.route(curRoute.path).post(curModule[curRoute.method]);
            
        }else{
            
            router.route(curRoute.path).post(curModule[curRoute.method]);
            
        }
    }
    
    app.use('/',router);
}

module.exports = route_loader;
