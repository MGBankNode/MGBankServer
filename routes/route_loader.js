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

        var pathLen = curRoute.path.length;
        for(var j = 0; j < pathLen; j++){
            if(curRoute.type[j] == 'get'){
            
                router.route(curRoute.path[j]).get(curModule[curRoute.method[j]]);
            
            }else if(curRoute.type[j] == 'post'){

                router.route(curRoute.path[j]).post(curModule[curRoute.method[j]]);

            }else{

                router.route(curRoute.path[j]).post(curModule[curRoute.method[j]]);

            }
        }
    }
    
    app.use('/',router);
}

module.exports = route_loader;
