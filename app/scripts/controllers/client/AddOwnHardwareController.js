(function(module) {
  mifosX.controllers = _.extend(module, {
	  AddOwnHardwareController: function(scope,webStorage,routeParams, resourceFactory, location, dateFilter,$rootScope) {
        scope.itemtypes = [];
        scope.serialnumber = [];
        scope.provisioningserialnumber = {};
        scope.first = {};
        //scope.first.date = new Date();
        
        scope.serialnumber={};
        scope.formData = {};
        scope.clientId = routeParams.id;
        var clientData = webStorage.get('clientData');
        scope.hwSerialNumber=clientData.hwSerialNumber;
        scope.displayName=clientData.displayName;
        scope.statusActive=clientData.statusActive;
        scope.accountNo=clientData.accountNo;
        scope.officeName=clientData.officeName;
        scope.balanceAmount=clientData.balanceAmount;
        scope.currency=clientData.currency;
        scope.imagePresent=clientData.imagePresent;
        scope.categoryType=clientData.categoryType;
        scope.email=clientData.email;
        scope.phone=clientData.phone;
        scope.walletConfig = webStorage.get('is-wallet-enable');
    
        resourceFactory.itemResourceTemplate.getAll(function(data){
        	
        	  scope.first.date = new Date(data.date);
        	  scope.itemtypes=data.itemDatas;
        	  
	 
        });
                 
        scope.reset123 = function(){
     	   webStorage.add("callingTab", {someString: "Sale" });
        };
        
        scope.submit = function() {
            
            this.formData.locale = $rootScope.locale.code;
           
            
            var reqDate = dateFilter(scope.first.date,'dd MMMM yyyy');
            this.formData.dateFormat = 'dd MMMM yyyy';
            this.formData.allocationDate = reqDate;
            this.formData.status = "ACTIVE";
//            delete this.formData.preferredCallingTime;
            	
            resourceFactory.HardwareResource.save({'clientId':routeParams.id},this.formData,function(data){
            	// alert(routeParams.id);
	            location.path('/viewclient/' +routeParams.id);
	          });
            webStorage.add("callingTab", {someString: "Sale" });
        }; 
            
            
      }
 });     
        mifosX.ng.application.controller('AddOwnHardwareController', ['$scope','webStorage','$routeParams', 'ResourceFactory', '$location','dateFilter','$rootScope', mifosX.controllers.AddOwnHardwareController]).run(function($log) {
		    $log.info("AddOwnHardwareController initialized");
		  });
		}(mifosX.controllers || {}));
		     
          