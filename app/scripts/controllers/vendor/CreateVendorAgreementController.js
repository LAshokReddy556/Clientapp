(function(module) {
	mifosX.controllers = _.extend(module, {				
		CreateVendorAgreementController : function(scope,routeParams,resourceFactory, 
				location, dateFilter,validator, $rootScope, $upload, API_VERSION, routeParams) {
			
			scope.priceRegionDatas = [];
			scope.servicesData = [];
			scope.planDatas = [];
			scope.agreementTypes = [];
			
			scope.formData = {};
			scope.json = {};
			scope.detailsFormData={};
			 scope.vendorDetailsDatas=[];
			 scope.start ={};
			 scope.end ={};
			 /*var datetime = new Date();
			 scope.start.date = datetime;
			 scope.end.date = datetime;
			 scope.minDate = new Date();*/
			 scope.vendorId = routeParams.vendorId;
			 scope.formData.contentType = "Service";
						
			resourceFactory.VendorAgreementTemplateResource.getTemplateDetails({'vendorId':routeParams.vendorId},function(data) {
				 var datetime = new Date(data.date);
				 scope.start.date = datetime;
				 scope.end.date = datetime;
				 scope.minDate = new Date(data.date);
				scope.priceRegionDatas = data.priceRegionData;
				scope.servicesData = data.servicesData;
				scope.planDatas = data.planDatas;
				scope.agreementTypes = data.agreementTypes;
			});
			
			scope.addVendorDetails = function () {
	        	if (scope.detailsFormData.contentCode && scope.detailsFormData.loyaltyType 
	        			&& (scope.detailsFormData.loyaltyShare || scope.detailsFormData.contentCost) && scope.detailsFormData.priceRegion) {
	        		
	        			if(scope.detailsFormData.loyaltyShare){
	        				scope.vendorDetailsDatas
							.push({
								loyaltyType : scope.detailsFormData.loyaltyType,
								contentCode : scope.detailsFormData.contentCode,
								loyaltyShare : scope.detailsFormData.loyaltyShare,
								priceRegion : scope.detailsFormData.priceRegion
							});
	        				scope.detailsFormData.loyaltyShare = undefined;
	        			}else{
	        				
	        				scope.vendorDetailsDatas
							.push({
								loyaltyType : scope.detailsFormData.loyaltyType,
								contentCode : scope.detailsFormData.contentCode,
								contentCost : scope.detailsFormData.contentCost,
								priceRegion : scope.detailsFormData.priceRegion
							});
	        				scope.detailsFormData.contentCost = undefined;
	        			}
	         
	        	}
	        };
	        scope.deleteVendorDetails = function (index) {
	              scope.vendorDetailsDatas.splice(index,1);
	        };
	          
			scope.onFileSelect = function($files) {
	            scope.file = $files[0];
	        };
				
			scope.submit = function() {			
				this.formData.locale = $rootScope.locale.code;
				this.formData.dateFormat = 'dd MMMM yyyy';
				this.formData.vendorId = routeParams.vendorId;
				
	        	var reqDate = dateFilter(scope.start.date,'dd MMMM yyyy');
	        	var reqEndDate = dateFilter(scope.end.date,'dd MMMM yyyy');
	        	
	            this.formData.startDate = reqDate;
	            this.formData.endDate = reqEndDate;
				
				scope.formData.vendorDetails =new Array();
				
				if (scope.vendorDetailsDatas.length > 0) {
		              
	                 for (var i in scope.vendorDetailsDatas) {
						                   scope.formData.vendorDetails
													.push({
														contentCode : scope.vendorDetailsDatas[i].contentCode,
														loyaltyType : scope.vendorDetailsDatas[i].loyaltyType,
														loyaltyShare :scope.vendorDetailsDatas[i].loyaltyShare,
														contentCost :scope.vendorDetailsDatas[i].contentCost,
														priceRegion : scope.vendorDetailsDatas[i].priceRegion,
														locale : $rootScope.locale.code});
	                 };
	               }
					scope.json.jsonData = scope.formData;
					console.log(scope.json);			
				
				$upload.upload({
	                url: $rootScope.hostUrl+ API_VERSION +'/vendoragreement', 
	                data: scope.json,
	                file: scope.file
	              }).then(function(data) {
	                // to fix IE not refreshing the model
	                if (!scope.$$phase) {
	                  scope.$apply();
	                }
	                location.path('/viewvendormanagement/'+routeParams.vendorId);
	              });
			};						
		}			
	});
	mifosX.ng.application.controller('CreateVendorAgreementController', [ 
	'$scope', 
	'$routeParams',
	'ResourceFactory', 
	'$location', 
	'dateFilter',
	'HTValidationService', 
	'$rootScope',
	'$upload',
	'API_VERSION',
	'$routeParams',
	mifosX.controllers.CreateVendorAgreementController 
	]).run(function($log) {
		$log.info("CreateVendorAgreementController initialized");	
	});
}(mifosX.controllers || {}));
