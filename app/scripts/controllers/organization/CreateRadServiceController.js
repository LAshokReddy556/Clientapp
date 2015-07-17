(function(module) {
	mifosX.controllers = _.extend(module, {
		CreateRadServiceController : function(scope, location,  $modal, route,$http, webStorage,resourceFactory,routeParams) {

			scope.types =[{key:'K' ,value:"KB"},{key:'M',value:"MB"},{key:'G',value:"GB"}];
			scope.radiusVersion = routeParams.radiusVersion;
			
			scope.formData = {	
					nextsrvid : -1,
					srvtype : 0,
					upType  : scope.types[0].key,
					downType  : scope.types[0].key,
					limitcomb : 0,
					renew : 0,
					limitexpiration  : 1,
					limitdl : 1,
					limitul : 0,
					limituptime : 0,
					poolname : '',
					unitprice : 0,
					unitpriceadd : 0,
					timebaseexp : 2,
					timebaseonline : 0,
					timeunitexp : 0,
					timeunitonline : 0,
					trafficunitul : 0,
					trafficunitcomb : 0,
					inittimeexp : 0,
					inittimeonline : 0,
					initdl : '0',
					initul : 0,
					inittotal : 0,
					timeaddmodeexp : 0,
					timeaddmodeonline : 0,
					trafficaddmode : 0,
					monthly : 0,
					enaddcredits : 0,
					minamount : 1,
					minamountadd : 1,
					resetcounters : 0,
					pricecalcdownload : 0,
					pricecalcupload : 0,
					pricecalcuptime : 0,
					unitpricetax : 0,
					unitpriceaddtax : 0,
					enableburst : 0,
					dlburstlimit : 0,
					ulburstlimit : 0,
					dlburstthreshold : 0,
					ulburstthreshold : 0,
					dlbursttime : 0,
					ulbursttime : 0,
					enableservice : 1,
					ulquota : 0,
					timequota : 0,
					priority : 8,
					dailynextsrvid : '-1',
					disnextsrvid : '-1',
					availucp : 0,
					policymapdl : '',
					policymapul : '',
					custattr : '',
					carryover : 0,
					gentftp : 0,
					cmcfg : '',
					advcmcfg : 0,
					addamount : 1,
					ignstatip : 0
			
			};
			
			scope.updateSelection = function(value,field) {
				
				if(field == 'limitdl'){
					scope.formData.limitdl = 1;
					scope.formData.limitcomb = 0;
				}else {
					scope.formData.limitdl = 0;
					scope.formData.limitcomb = 1;
				}
				
			};

			 scope.reset123 = function(){
	        	   webStorage.add("callingTab", {someString: "radService" });
	           };
	           
	          if(scope.radiusVersion == 'version-2'){
	        	   scope.serviceCodes = [];
	        	   resourceFactory.radServiceTemplateResource.query(function(data) {
	        		   scope.serviceCodes = JSON.parse(data[0].radService);
	        		   //console.log(scope.serviceCodes);
	               });
	           }
			
			scope.submit = function(saveWithOBSValue) {
				if(scope.radiusVersion == 'version-1'){
					scope.formData.value= scope.formData.uprate + scope.formData.upType + "/"+ scope.formData.downrate + scope.formData.downType;
					delete scope.formData.downRate ;
					delete scope.formData.upRate;
				}else if(scope.radiusVersion == 'version-2'){
					var uprateValue = scope.formData.uprate;
					scope.formData.uprate = uprateValue*Math.pow(2,10);
					
					var downrateVlaue = scope.formData.downrate;
					scope.formData.downrate = downrateVlaue*Math.pow(2,10);
					
					var trfficValue = scope.formData.trafficunitdl;
					scope.formData.trafficunitdl = trfficValue*Math.pow(2,30);
					
					scope.formData.descr = scope.formData.srvname;
					scope.formData.isSaveWithOBS = saveWithOBSValue;
					if(scope.formData.trafficunitdl == 0){
						scope.formData.combquota = 0;
						scope.formData.limitcomb = 0;
						scope.formData.dlquota = 0;
						scope.formData.limitdl = 0;
						scope.formData.limitul = 0;
						scope.formData.limitexpiration = 0;
						scope.formData.trafficunitdl = 0;
						console.log("scope.formData.limitdl:"+scope.formData.limitdl);
						console.log("scope.formData.limitexpiration:"+scope.formData.limitexpiration);
						console.log("scope.formData.limitcomb:"+scope.formData.limitcomb);
					}
					if(scope.formData.trafficunitdl != 0 && scope.formData.limitdl == 1){
						scope.formData.dlquota = scope.formData.trafficunitdl;
						scope.formData.combquota = 0;
						scope.formData.trafficunitdl = 0;
					}else if(scope.formData.trafficunitdl != 0 && scope.formData.limitcomb == 1){
						scope.formData.combquota = scope.formData.trafficunitdl;
						scope.formData.dlquota = 0;
						scope.formData.trafficunitdl = 0;
					}
					/*scope.formData.value=scope.formData.downrate + scope.formData.downType +"/"+ scope.formData.uprate + scope.formData.upType;*/
					delete scope.formData.upType;
					delete scope.formData.downType;
				}
					//console.log(scope.formData.value);
			    resourceFactory.radServiceResource.save(scope.formData,function(data){
			        		  location.path('/radius/' );
			          });
			    webStorage.add("callingTab", {someString: "radService" });
				
		  };
		}
	});
	mifosX.ng.application.controller('CreateRadServiceController',[ 
	    '$scope',
	    '$location',
	    '$modal',
	    '$route',
	    '$http',
	    'webStorage',
	    'ResourceFactory',
	    '$routeParams',
	    mifosX.controllers.CreateRadServiceController 
	    ]).run(function($log) {
	    	$log.info("CreateRadServiceController initialized");
	    });
}(mifosX.controllers || {}));
