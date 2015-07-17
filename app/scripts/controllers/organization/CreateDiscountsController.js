(function(module) {
	  mifosX.controllers = _.extend(module, {
		  CreateDiscountsController: function(scope, resourceFactory, location, dateFilter, $rootScope) {
			  
	        scope.discountTypeDatas = [];
	        scope.statusDatas = [];
	        scope.start = {};
	        scope.start.date = dateFilter(new Date(), 'dd MMMM yyyy');
	        
	        resourceFactory.discountTemplateResource.get(function(data) {
	        	scope.discountTypeDatas = data.discountTypeData;
	            scope.statusDatas = data.statusData;
	            scope.formData = {};
	        });
	     
	        scope.submit = function() {  
	        	
	        	 this.formData.locale = $rootScope.locale.code;
	             this.formData.dateFormat = "dd MMMM yyyy";
	             var startDate = dateFilter(scope.start.date, 'dd MMMM yyyy');
	             this.formData.startDate = startDate;
	             
	            resourceFactory.discountResource.save(this.formData, function(data){
	            		location.path('/discounts');
	          });
	          
	        };
	    }
	  });
	  mifosX.ng.application.controller('CreateDiscountsController', [
	      '$scope',
	      'ResourceFactory',
	      '$location',
	      'dateFilter',
	      '$rootScope',
	      mifosX.controllers.CreateDiscountsController
	      ]).run(function($log) {
	    	  $log.info("CreateDiscountsController initialized");
	  });
	}(mifosX.controllers || {}));