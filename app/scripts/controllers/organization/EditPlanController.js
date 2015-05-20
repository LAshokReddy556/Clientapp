(function(module) {
  mifosX.controllers = _.extend(module, {
    EditPlanController: function(scope, routeParams, resourceFactory,dateFilter, location,$rootScope) {
    	
    	scope.planId = routeParams.id;
    	scope.formData = {};
    	scope.planStatus = [];
        scope.billRuleDatas = [];
        scope.provisionSysDatas = [];
        scope.date = {};
        scope.services=[];
        scope.selectedServices = [];
        scope.volumeTypes=[];
        
        resourceFactory.planResource.get({planId: scope.planId, template: 'true'} , function(data) {
            scope.formData = {
            					planCode 				: data.planCode,
            					status 					: data.status,
            					planDescription 		: data.planDescription,
            					billRule 				: data.billRule,
            					provisioingSystem		: data.provisionSystem,
            				  };
            
            scope.planStatus=data.planStatus;
            scope.billRuleDatas = data.billRuleDatas;
            scope.provisionSysDatas=data.provisionSysData;
            
            var startDate =data.startDate; 
            var endDate =data.endDate;
            
            scope.date.startDate = dateFilter(new Date(startDate),'dd MMMM yyyy');
            if(endDate){
            	 scope.date.endDate = dateFilter(new Date(endDate),'dd MMMM yyyy');
            }
            scope.services = data.services;
            scope.selectedServices = data.selectedServices;
            scope.volumeTypes=data.volumeTypes;
            
            if(data.allowTopup == 'Y'){
            	scope.formData.allowTopup = true;
            	scope.formData.volume = data.volume;
            	scope.formData.units = data.units;
            }else{
            	scope.formData.allowTopup = false;
            }
            scope.formData.isPrepaid = data.isPrepaid =='Y'?true:false;
            scope.formData.isHwReq = data.isHwReq =='Y'?true:false;
        });
        
    	
        scope.restrict = function(){
            for(var i in scope.allowed)
            {
                for(var j in scope.services){
                    if(scope.services[j].id == scope.allowed[i])
                    {
                        scope.selectedServices.push(scope.services[j]);
                        scope.services.splice(j,1);
                    }
                }
            }
        };
        scope.allow = function(){
            for(var i in scope.restricted)
            {
                for(var j in scope.selectedServices){
                    if(scope.selectedServices[j].id == scope.restricted[i])
                    {
                        scope.services.push(scope.selectedServices[j]);
                        scope.selectedServices.splice(j,1);
                    }
                }
            }
        };
        
        scope.submit = function() {
          
          // reformatting selected services
             scope.formData.services = [];
             for(var i in scope.selectedServices){
            	 scope.formData.services[i] = scope.selectedServices[i].id;
             }
             if(scope.formData.isPrepaid){
             	scope.formData.units =0;
             	scope.formData.volume = "None";
             	}
             scope.formData.locale = $rootScope.locale.code;
             scope.formData.dateFormat = 'dd MMMM yyyy';
             scope.formData.volume='None';
         	scope.formData.units=0;
             scope.formData.startDate = dateFilter(scope.date.startDate,scope.formData.dateFormat);
             scope.formData.endDate = dateFilter(scope.date.endDate,scope.formData.dateFormat);
             resourceFactory.planResource.update({'planId':scope.planId},scope.formData,function(data){
            	 location.path('/viewplan/' + data.resourceId);
             });
        };
    }
  });
  mifosX.ng.application.controller('EditPlanController', [
   '$scope', 
   '$routeParams', 
   'ResourceFactory', 
   'dateFilter',
   '$location',
   '$rootScope', 
   mifosX.controllers.EditPlanController]).run(function($log) {
    $log.info("EditPlanController initialized");
  });
}(mifosX.controllers || {}));
