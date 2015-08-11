(function(module) {
	mifosX.controllers = _.extend(module, {				
		EditVendorAgreementController : function(scope,resourceFactory, 
				location, dateFilter,validator, $rootScope, $upload, API_VERSION, routeParams) {
			
			scope.priceRegionDatas = [];
			scope.servicesData = [];
			scope.planDatas = [];
			scope.agreementTypes = [];
			
			scope.formData = {};
			scope.json = {};
			scope.vendorAgreeDetailFormData={};
			 scope.vendorAgreeDetails=[];
			 scope.deleteAttributes=[];
			 scope.start ={};
			 scope.end ={};
			 /*var datetime = new Date();
			 scope.start.date = datetime;
			 scope.minDate = new Date();*/
			 scope.vendorId = routeParams.vendorId;
			 scope.agreementId = routeParams.id;
						
			resourceFactory.VendorAgreementResource.getTemplateDetails({vendorAgreementId:scope.agreementId,resourceType:'details',template:true}, function(data) {
				scope.start.date = new Date(data.date);
				scope.minDate = new Date(data.date);
				
				scope.priceRegionDatas = data.priceRegionData;
				scope.servicesData = data.servicesData;
				scope.planDatas = data.planDatas;
				scope.agreementTypes = data.agreementTypes;
				scope.start.date = new Date(dateFilter(data.agreementStartDate,'dd MMMM yyyy'));
				scope.end.date = new Date(dateFilter(data.agreementEndDate,'dd MMMM yyyy'));
				scope.vendorAgreeDetails = data.vendorAgreementDetailsData;
				scope.formData = {
						agreementStatus : data.agreementStatus,
						contentType : data.contentType
				};
			});
			
			scope.addVendorAgreeDetails = function () {
	        	if (scope.vendorAgreeDetailFormData.contentCodeId && scope.vendorAgreeDetailFormData.loyaltyType 
	        			&& (scope.vendorAgreeDetailFormData.loyaltyShare || scope.vendorAgreeDetailFormData.contentCost) && scope.vendorAgreeDetailFormData.priceRegion) {
	        			
	        		if(scope.vendorAgreeDetailFormData.loyaltyShare){
								scope.vendorAgreeDetails
											.push({
													loyaltyType : scope.vendorAgreeDetailFormData.loyaltyType,
													contentCodeId : scope.vendorAgreeDetailFormData.contentCodeId,
													loyaltyShare : scope.vendorAgreeDetailFormData.loyaltyShare,
													priceRegion : scope.vendorAgreeDetailFormData.priceRegion
											});
								scope.vendorAgreeDetailFormData.loyaltyShare = undefined;
	        		}else{
	        			scope.vendorAgreeDetails
						.push({
								loyaltyType : scope.vendorAgreeDetailFormData.loyaltyType,
								contentCodeId : scope.vendorAgreeDetailFormData.contentCodeId,
								contentCost : scope.vendorAgreeDetailFormData.contentCost,
								priceRegion : scope.vendorAgreeDetailFormData.priceRegion
						});
	        			scope.vendorAgreeDetailFormData.contentCost = undefined;
	        		}
	          
	        	}
	        };
	        scope.deleteVendorAgreeDetails = function (index) {
	        	 
	        	  scope.deleteAttributes.push({contentCode:scope.vendorAgreeDetails[index].contentCodeId,
	        		  locale:$rootScope.locale.code, id:scope.vendorAgreeDetails[index].id});
	        	  console.log(scope.deleteAttributes);
	              scope.vendorAgreeDetails.splice(index,1);
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
				scope.formData.removeVendorDetails = new Array();
				
				if (scope.vendorAgreeDetails.length > 0) {
		              
	                 for (var i in scope.vendorAgreeDetails) {
						                   scope.formData.vendorDetails
													.push({
														id : scope.vendorAgreeDetails[i].id,
														contentCode : scope.vendorAgreeDetails[i].contentCodeId,
														loyaltyType : scope.vendorAgreeDetails[i].loyaltyType,
														loyaltyShare : scope.vendorAgreeDetails[i].loyaltyShare,
														contentCost :scope.vendorAgreeDetails[i].contentCost,
														priceRegion : scope.vendorAgreeDetails[i].priceRegion,
														locale : $rootScope.locale.code});
	                 };
	               }
				if(scope.deleteAttributes.length > 0){
	        		 scope.formData.removeVendorDetails = scope.deleteAttributes;
	        	 }
					scope.json.jsonData = scope.formData;
					console.log(scope.json);			
				
				$upload.upload({
	                url: $rootScope.hostUrl+ API_VERSION +'/vendoragreement/'+scope.agreementId, 
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
	mifosX.ng.application.controller('EditVendorAgreementController', [ 
	'$scope', 
	'ResourceFactory', 
	'$location', 
	'dateFilter',
	'HTValidationService', 
	'$rootScope',
	'$upload',
	'API_VERSION',
	'$routeParams',
	mifosX.controllers.EditVendorAgreementController 
	]).run(function($log) {
		$log.info("EditVendorAgreementController initialized");	
	});
}(mifosX.controllers || {}));
