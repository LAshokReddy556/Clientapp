(function(module) {
  mifosX.controllers = _.extend(module, {
    CreateMrnController: function(scope,webStorage, resourceFactory, location,dateFilter,$rootScope) {
    	 scope.officeDatas = [];
    	 scope.itemMasterDatas = [];
    	 scope.first = {};
    	 scope.first.date = new Date();
        resourceFactory.mrnTemplateResource.get(function(data) {
        	scope.officeDatas = data.officeData;
        	scope.itemMasterDatas = data.itemMasterData;
        	scope.formData = data;
        });
        
        scope.selectedMRN=function(){
        	webStorage.add("callingTab", {someString: "mrn" });
        };
        scope.reset123 = function(){
	    	   webStorage.add("callingTab", {someString: "mrn" });
	       };
        scope.submit = function() {
        	
        	this.formData.locale = $rootScope.locale.code;
        	/*var reqDate = dateFilter(scope.formData.requestedDate,'dd MMMM yyyy');
        	this.formData.dateFormat = 'dd MMMM yyyy';
        	this.formData.requestedDate = reqDate;
        	*/
        	
        	
        	
            var reqDate = dateFilter(scope.first.date,'dd MMMM yyyy');//.getFullYear()+"-"+(scope.first.date.getMonth()+1)+"-"+scope.first.date.getDate()+" "+scope.first.date.getHours()+":"+scope.first.date.getMinutes()+":"+scope.first.date.getSeconds();
            this.formData.dateFormat = 'dd MMMM yyyy';
            this.formData.requestedTime = " "+scope.first.date.getHours()+":"+scope.first.date.getMinutes()+":"+scope.first.date.getSeconds();
            this.formData.requestedDate = reqDate;
            
        	delete this.formData.itemMasterData;
        	delete this.formData.officeData;
        	resourceFactory.mrnResource.save(this.formData,function(data){
        			location.path('/inventory');
          });
        };
    }
  });
  mifosX.ng.application.controller('CreateMrnController', ['$scope','webStorage', 'ResourceFactory', '$location','dateFilter','$rootScope', mifosX.controllers.CreateMrnController]).run(function($log) {
    $log.info("CreateMrnController initialized");
  });
}(mifosX.controllers || {}));
