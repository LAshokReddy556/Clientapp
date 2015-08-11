(function(module) {
	mifosX.controllers = _.extend(module, {
		CreateChargeCodeController : function(scope, resourceFactory, location,	$rootScope) {
			scope.chargeTypes = [];
			scope.durationTypes = [];
			scope.billFrequencyCodes = [];
			resourceFactory.chargecodetemplateResource.get(function(data) {
				scope.chargeTypes = data.chargeTypeData;
				scope.durationTypes = data.durationTypeData;
				scope.billFrequencyCodes = data.billFrequencyCodeData;
				scope.formData = {
					taxInclusive : false,	/** Do not remove this one */
				};
			});

			scope.submit = function() {
				this.formData.locale = $rootScope.locale.code;
				resourceFactory.chargecodeResource.save(this.formData,function(data) {
					location.path('/chargecode');
				});
			};
		}
	});
	mifosX.ng.application.controller('CreateChargeCodeController',[
	     '$scope',
	     'ResourceFactory', 
	     '$location',
	     '$rootScope',
	     mifosX.controllers.CreateChargeCodeController 
	     ]).run(function($log) {
	    	 $log.info("CreateChargeCodeController initialized");
	     });
}(mifosX.controllers || {}));
