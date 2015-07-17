(function(module) {
  mifosX.controllers = _.extend(module, {
	  PayInvoiceController: function(scope,webStorage, resourceFactory, routeParams, location,dateFilter,validator,
			                         route,$modal,$rootScope,$locale, $filter) {
		  
		var addAmountValue = 0;
        scope.formData = {};
        scope.creditData = {};
        scope.clientId = routeParams.id;
        var clientData = webStorage.get('clientData');
        scope.walletconfig = webStorage.get('is-wallet-enable');
        scope.configSubscriptionPayment = webStorage.get("client_configuration").SubscriptionPayment;
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
        if(scope.imagePresent){
		scope.image=clientData.image;
		    }
        //scope.datass = {};
         scope.start={};
         scope.start.date = new Date();
         scope.maxDate= scope.start.date;
         
         scope.invoiceDatas = [];
         scope.showInvoiceDetails=false;
         scope.showDepositDetails=false;
         scope.selectAccount = false;
         scope.formData.isSubscriptionPayment= false;
         scope.selectInvoice = false;
         
         var prevAvailAmountArray =[]; 
         var paymentAmount;
         var checkBox = false;
         scope.payAvailAmount = 0;
         scope.creditdistributions = [];
         scope.DepositAmount=0;
         scope.depositDistributions=[];
         
        resourceFactory.paymentsTemplateResource.getPayments({clientId : scope.clientId}, function(data){
        	scope.payments = data;
            scope.data = data.data;
            scope.paymentTypeData=function(value){
            	for(var i=0;i<scope.data.length;i++){
            		if(scope.data[i].id==value){
            			scope.paymentType=scope.data[i].mCodeValue;
            		}
            	}
            };
            scope.depositDatas = data.depositDatas;
        });
        resourceFactory.payInvoiceTemplateResource.getPayInvoices({invoiceId : routeParams.id},function(data){
        		scope.invoiceDatas = data;
        		for(var i in scope.invoiceDatas){
        			scope.invoiceDatas[i].active=checkBox;
        		}
        	});
        
        scope.selectedAccount = function(){
        	$("#amountPaid").removeAttr("readonly");
        	delete this.formData.amountPaid;
        	scope.showInvoiceDetails == false ? scope.showInvoiceDetails = false : scope.showInvoiceDetails = false;
        	scope.selectAccount = true; 
        	scope.selectInvoice = false;  
        	scope.selectDeposit = false;
        };
        
        scope.selectedInvoice = function(){
        	 $("#amountPaid").removeAttr("readonly"); 
        	delete this.formData.amountPaid;
        	delete this.formData.amount;
        	scope.selectInvoice = true; 
        	scope.selectAccount = false; 
        	scope.selectDeposit = false;
        };
        scope.selectedDeposit = function(){
        	$("#amountPaid").attr("readonly","readonly");
        	delete this.formData.amountPaid;
        	delete this.formData.amount;
        	scope.selectDeposit = true;
        	scope.selectInvoice = false; 
        	scope.selectAccount = false; 
        };
        
        scope.amountChange =function(Amount){
        	scope.payAvailAmount=Amount;
        };
        
        scope.showInvoices= function(payAmount){
             scope.showInvoiceDetails=!scope.showInvoiceDetails;
             for(var i in scope.invoiceDatas){
            	 $('#'+scope.invoiceDatas[i].id).prop('checked',false);
            	        // scope.invoiceDatas[i].active = checkBox;
               }
             if(!angular.isUndefined(payAmount)&&scope.showInvoiceDetails){
            	 scope.payAvailAmount=payAmount;
            	 $("#amountPaid").attr("readonly","readonly");
             }else{
            	 $("#amountPaid").removeAttr("readonly"); 
             }
        };
        
        scope.showDeposits= function(){
            scope.showDepositDetails=!scope.showDepositDetails;
            for(var i in scope.depositDatas){
           	 $('#'+scope.depositDatas[i].id).prop('checked',false);
              }
            /*if(!angular.isUndefined(payAmount)&&scope.showDepositDetails){
               scope.DepositAmount=payAmount;
           	 $("#amountPaid").attr("readonly","readonly");
            }else{
           	 $("#amountPaid").removeAttr("readonly"); 
            }*/
            
       };
       
        
        // invoices selecting     
        scope.selectedInvoices = function(invoiceId,amount,active,index){

        	if(!angular.isUndefined(scope.formData.amountPaid)&& scope.formData.amountPaid > 0){
        		$("#amountPaid").attr("readonly","readonly");
        	}
        	if(active == true){
        		 if(scope.payAvailAmount == 0){
        			$('#'+invoiceId).prop('checked',false);
        			scope.invoiceDatas[index].active=false;
        			$modal.open({
              			 templateUrl: 'alert.html',
              			 controller: alertController,
              			 resolve:{}
              		 });
        		}else if(amount >= scope.payAvailAmount){
        			prevAvailAmountArray.push({id : invoiceId,amount : scope.payAvailAmount});
        			paymentAmount = scope.payAvailAmount;
        		    scope.creditdistributions.push({
        				invoiceId : invoiceId,
        				amount : paymentAmount,
						clientId  : parseInt(routeParams.id),
						locale    : $rootScope.locale.code
        				});
        		        if(amount!=scope.payAvailAmount){
                             $modal.open({
        		             templateUrl: 'amountAlert.html',
             			     controller: alertController,
             			     resolve:{}
             		       });
        		         }
        		     scope.payAvailAmount=0;
        			}else{
        			prevAvailAmountArray.push({id : invoiceId,amount : amount});
        			scope.payAvailAmount=parseFloat((scope.payAvailAmount -=amount).toFixed(2));   //Math.round(scope.formData.amountPaid -=amount);
        			scope.creditdistributions.push({
        				invoiceId : invoiceId,
        				amount : amount,
						clientId  : parseInt(routeParams.id),
						locale    : $rootScope.locale.code
        				});
        		}
        		
        	}
        	else{
        		$("#amountPaid").removeAttr("readonly");
        		  for(var i in prevAvailAmountArray){
        			  if(prevAvailAmountArray[i].id==invoiceId){
        				  
        				  if(scope.payAvailAmount == 0)
          					scope.payAvailAmount = prevAvailAmountArray[i].amount;
          				  else
          					scope.payAvailAmount=(parseFloat(scope.payAvailAmount)+parseFloat(prevAvailAmountArray[i].amount)).toFixed(2);
        				  break;
        			  }
        		  }
        		  prevAvailAmountArray = _.filter(prevAvailAmountArray, function(item) {
                      return item.id != invoiceId;
                  });
        		  scope.creditdistributions = _.filter(scope.creditdistributions, function(item) {
                    return item.invoiceId != invoiceId;
               });
        	}
        };
        
         function  alertController($scope, $modalInstance) {
      	    $scope.approve = function () {
      		  $modalInstance.close('delete');
            };
        };
        
        
        
        // deposit selecting
        
        scope.selectedDepositInvoices = function(invoiceId,amount,active,index){
        	//scope.payAvailAmount = availableAmount ;
        	addAmountValue = addAmountValue+amount;
        	//alert("addAmountValue: "+addAmountValue);
        	scope.formData.amountPaid = addAmountValue;
        	if(!angular.isUndefined(scope.formData.amountPaid)&& scope.formData.amountPaid > 0){
        		$("#amountPaid").attr("readonly","readonly");
        	}
        	if(active == true){
        		/*if(scope.DepositAmount < addAmountValue ){
        			$('#'+invoiceId).prop('checked',false);
        			
        			$modal.open({
              			 templateUrl: 'alert.html',
              			 controller: alertController,
              			 resolve:{}
              		 });
        		}else if (scope.DepositAmount >= addAmountValue){//alert('same');
*/        			prevAvailAmountArray.push({id : invoiceId,amount : scope.DepositAmount});
        			//paymentAmount = scope.DepositAmount;
        		    scope.depositDistributions.push({
        				depositId : invoiceId,
        				amount : amount,
						clientId  : parseInt(routeParams.id),
						locale    : $rootScope.locale.code
        				});
        		    console.log("Data: "+scope.depositDistributions[0].amount);
        		    
        			//}
        	/*else{
        			prevAvailAmountArray.push({id : invoiceId,amount : amount});
        			scope.DepositAmount=parseFloat((scope.payAvailAmount -=amount).toFixed(2));                 //Math.round(scope.formData.amountPaid -=amount);
        			console.log(scope.payAvailAmount);
        			scope.creditdistributions.push({
        				invoiceId : invoiceId,
        				amount : amount,
						clientId  : parseInt(routeParams.id),
						locale    : $rootScope.locale.code
						
        				});
        		}*/
        		//if(scope.formData.amountPaid != 0)
        		//	scope.payAvailAmount=parseFloat((scope.payAvailAmount -= amount).toFixed(2));
        	}
        	else{
        		$("#amountPaid").removeAttr("readonly");
        		  for(var i in prevAvailAmountArray){
        			  if(prevAvailAmountArray[i].id==invoiceId){
        				  
        				  if(scope.DepositAmount == 0)
          					scope.DepositAmount = prevAvailAmountArray[i].amount;
          				  else
          					scope.DepositAmount=(parseFloat(scope.DepositAmount)+parseFloat(prevAvailAmountArray[i].amount)).toFixed(2);
        				  break;
        			  }
        		  }
        		  prevAvailAmountArray = _.filter(prevAvailAmountArray, function(item) {
                      return item.id != invoiceId;
                  });
        		scope.depositDistributions = _.filter(scope.depositDistributions, function(item) {
                    return item.invoiceId != invoiceId;
               });
        	}
        };
        
        scope.submitAccount = function() {
        	
            this.formData.locale = $rootScope.locale.code;
            this.formData.dateFormat = "dd MMMM yyyy";
        	var paymentDate = dateFilter(scope.start.date,'dd MMMM yyyy');
            this.formData.paymentDate= paymentDate;
            delete this.formData.amount;
            delete this.formData.invoiceId;
            var res1 = validator.validateZipCode(scope.formData.receiptNo);
            if(scope.selectDeposit==true){
            	this.formData.paymentType = "Deposit";
            	this.formData.deposit= scope.depositDistributions;
            }
            
            resourceFactory.paymentsResource.save({clientId : routeParams.id}, this.formData, function(data){
            	if(!angular.isUndefined(data.resourceId) && scope.creditdistributions.length >0 && scope.selectInvoice==true){
            	for (var i in scope.creditdistributions){
            		scope.creditdistributions[i].paymentId =data.resourceId;
            	}
            	scope.creditData.creditdistributions = scope.creditdistributions;
            	scope.creditData.paymentId = data.resourceId;
            	scope.creditData.locale = $rootScope.locale.code;
            	scope.creditData.avialableAmount=parseFloat(scope.payAvailAmount);
          resourceFactory.creditDistributionResource.save({clientId : routeParams.id},scope.creditData,function(data){});
                }
            location.path('/viewclient/'+routeParams.id);
          	  //route.reload();
          });
       };
    }
  });
  mifosX.ng.application.controller('PayInvoiceController', ['$scope','webStorage', 'ResourceFactory', '$routeParams', 
                                                            '$location','dateFilter','HTValidationService','$route',
                                                            '$modal','$rootScope','$locale','$filter', mifosX.controllers.PayInvoiceController]).run(function($log) {
    $log.info("PayInvoiceController initialized");
  });
}(mifosX.controllers || {}));
