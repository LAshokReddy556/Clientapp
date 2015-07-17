InternalPaymentController = function(scope, routeParams, location, localStorageService,$timeout,RequestSender) {
	
	scope.formData 				= {};
	scope.formData.clientId 	= routeParams.clientId;
	scope.formData.Amount 		= routeParams.amount;
	var screenName 				= routeParams.screenName,
		planId 					= routeParams.planId || '',
		priceId 				= routeParams.priceId || '',
		isValueVoucher 			= false;
	
	scope.pinNoValidationFun = function(id){
		 if(id){
			 RequestSender.VoucherResource.query({pinNumber:id},function(data){
				 if(data.length == 1){
					 var pinType 	= data[0].pinType;
					 var pinValue 	= data[0].pinValue;
					 if(pinType == 'VALUE'){
						 scope.errorStatus='';
						 if(pinValue == scope.formData.Amount || scope.formData.Amount < pinValue){
							 isValueVoucher = true;
						 }else{
							 isValueVoucher = false;
							 scope.errorStatus = "VoucherPin Value Greatethan or Equal to Plan Amount";
						 }
						 
					 }else{
						 isValueVoucher = false;
						 delete scope.formData.pinNumber;
						 scope.errorStatus = '';
						 alert("Please Go to Redemption Option");
					 }
				 }else{
					 isValueVoucher = false;
					 delete scope.formData.pinNumber;
					 scope.errorStatus = "Invalid Voucher Pin:"+id;
				 }
				 
			 });
		 }
	 };
	 
	 scope.submit = function(){
		 if(isValueVoucher){
			 
			 RequestSender.redemptionResource.save(scope.formData,function(data){
				 localStorageService.add("paymentgatewayresponse", {data:data});
				 if(screenName == 'payment'){
					 location.path('/paymentgatewayresponse/'+scope.formData.clientId);
				 }else{	
					 var pathUrl = "/orderbookingscreen/"+screenName+"/"+scope.formData.clientId+"/"+planId+"/"+priceId;
					 location.path(pathUrl);
					
				 }
	          });
		 }
	 };
};
    
selfcareApp.controller('InternalPaymentController', ['$scope', 
                                                '$routeParams', 
                                                '$location', 
                                                'localStorageService', 
                                                '$timeout', 
                                                'RequestSender',
                                                InternalPaymentController]);
