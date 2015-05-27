(function(module) {
  mifosX.controllers = _.extend(module, {
	  EditAdditionalInfoController: function(scope,webStorage, routeParams, resourceFactory, location, http,dateFilter,API_VERSION,$rootScope,$upload,$parse) {
		  scope.offices = [];
         scope.date = {};
        scope.selfcareData = {};
        scope.clientId = routeParams.id;
        scope.date = {};
        scope.walletConfig = webStorage.get('is-wallet-enable');
        var data = webStorage.get("global_configuration");
		for(var i in data){
			if(data[i].name == "is-selfcareuser"){
				scope.isSelfCareUser = data[i].enabled;
				console.log(scope.isSelfCareUser);
			}
		}
        
        var clientData = webStorage.get('clientData');
        
        scope.displayName=clientData.displayName;
        scope.statusActive=clientData.statusActive;
        scope.hwSerialNumber=clientData.hwSerialNumber;
        scope.accountNo=clientData.accountNo;
        scope.officeName=clientData.officeName;
        scope.balanceAmount=clientData.balanceAmount;
        scope.currency=clientData.currency;
        scope.imagePresent=clientData.imagePresent;
        scope.categoryType=clientData.categoryType;
        scope.email=clientData.email;
        scope.phone=clientData.phone;
        scope.formData={};
        scope.entryType;
        if(scope.imagePresent){
        scope.image=clientData.image;
        }
        
        resourceFactory.clientAdditionalResource.get({clientId: routeParams.id,template:'true'} , function(data) {
            
            scope.nationalityDatas= data.nationalityDatas;
            scope.genderDatas= data.genderDatas;
            scope.ageGroupDatas = data.ageGroupDatas;
            scope.customeridentificationDatas= data.customeridentificationDatas;
            scope.cummunitcationDatas= data.cummunitcationDatas;
            scope.languagesDatas= data.languagesDatas;
            if(data){
            scope.formData.nationality = data.nationalityId;
            scope.formData.gender = data.genderId;
            scope.formData.jobTitle = data.jobTitle;
            scope.formData.dateOfBirth = dateFilter(data.dateOfBirth,'dd MMMM yyyy');
            scope.formData.preferredLang = data.preferLanId;
            scope.formData.remarks = data.remarks;
            scope.formData.idType = data.customerIdentificationTypeId;
            scope.formData.idNumber = data.customerIdentificationNumber;
            scope.formData.ageGroup = data.ageGroupId;
            scope.formData.utsCustomerId = data.utsCustomerId;
            scope.formData.financeId = data.financeId;
            scope.formData.preferredCommunication = data.preferCommId;
            if(data.dateOfBirth){
             var dateOfBirth = dateFilter(data.dateOfBirth,'dd MMMM yyyy');
            scope.date.dateOfBirth = new Date(dateOfBirth);
            }
            }
        });
       

        scope.submit = function() {
        	
             this.formData.locale = $rootScope.locale.code;
             this.formData.dateFormat = 'dd MMMM yyyy';
             if(scope.date.activationDate){this.formData.activationDate = dateFilter(scope.date.activationDate,'dd MMMM yyyy');}
             if(scope.date.dateOfBirth){this.formData.dateOfBirth = dateFilter(scope.date.dateOfBirth,'dd MMMM yyyy');}
             
             resourceFactory.clientAdditionalResource.update({'clientId': routeParams.id},this.formData,function(data){
                location.path('/viewclient/' + data.resourceId);
          });
        };
     }
  });
  mifosX.ng.application.controller('EditAdditionalInfoController', ['$scope','webStorage', '$routeParams', 'ResourceFactory', '$location', '$http','dateFilter','API_VERSION','$rootScope','$upload','$parse', mifosX.controllers.EditAdditionalInfoController]).run(function($log) {
    $log.info("EditAdditionalInfoController initialized");
  });
}(mifosX.controllers || {}));
