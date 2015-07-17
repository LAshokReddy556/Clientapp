(function(module) {
  mifosX.controllers = _.extend(module, {
	  CreateActivationController: function(scope,webStorage,routeParams, resourceFactory, location, http,filter,PermissionService, dateFilter,$rootScope,API_VERSION) {
		 
		
		  scope.ActivationData = {};
		  scope.ActivationData.client = [];
		  scope.ActivationData.sale = [];
		  scope.ActivationData.allocate = [];
		  scope.ActivationData.bookorder = [];
		  scope.ActivationData.owndevice = [];
		  scope.data={};
		  //var config = filter('ConfigLookup')('deviceAgrementType');
		 
		  scope.configPayment = webStorage.get("client_configuration").payment;
		  scope.PermissionService = PermissionService;
		  scope.propertyMaster = webStorage.get("is-propertycode-enabled");
		 
		  
//create client controller
          scope.offices = [];
          scope.first = {};
          scope.allocation={};
          scope.first.date = new Date();
          scope.allocation.date=new Date();
          scope.formData1 = {};
          scope.formData={};
          scope.clientCategoryDatas=[];
          scope.configurationProperty=[];
          
          resourceFactory.clientTemplateResource.get(function(data) {
              scope.offices = data.officeOptions;
              scope.formData1.officeId = scope.offices[0].id;
              scope.clientCategoryDatas=data.clientCategoryDatas;
              scope.formData1.clientCategory=scope.clientCategoryDatas[0].id;
              scope.cities=data.addressTemplateData.cityData;
              scope.configurationProperty=data.loginConfigurationProperty.enabled;
          });
          
          scope.formName=function(name){
	    	  
              
              var mesage_array = new Array();
              mesage_array = (name.split(" "));
           
           this.formData1.firstname=mesage_array[0];
           this.formData1.lastname=mesage_array[1];
           if(this.formData1.lastname == null){
        	   this.formData1.lastname="Mr.";
           }
        	  
          };
         
          scope.getStateAndCountry=function(city){
        	 
        	  resourceFactory.AddressTemplateResource.get({city :city}, function(data) {
            		scope.formData1.state = data.state;
            		scope.formData1.country = data.country;
        	  });
          };
          
          scope.getExistsProperty = function(query){
	           	return http.get($rootScope.hostUrl+API_VERSION+'/property/propertycode/', {
	           	      params: {
	           	    	  		query: query
	           	      		   }
	           	    }).then(function(res){   
	           	    	 scope.propertyCodesData=res.data;
	           	      return scope.propertyCodesData;
	           	    });
	             };  
	             
	   scope.getPropertyDetails = function(existsProperty){   
	            if(!angular.isUndefined(existsProperty)){
	                 for(var j in scope.propertyCodesData)  {
	            			 if(existsProperty == scope.propertyCodesData[j].propertyCode){
	            				 scope.formData1.addressNo = scope.propertyCodesData[j].propertyCode;
	            				 if(scope.propertyCodesData[j].street.length > 0){
	            					
	            					 scope.formData1.street = scope.propertyCodesData[j].street;
	            				 }
	            				 scope.formData1.city  =  scope.propertyCodesData[j].precinct; 
	            				 scope.formData1.state =  scope.propertyCodesData[j].state;
	            				 scope.formData1.country = scope.propertyCodesData[j].country;
	            				 if(scope.propertyCodesData[j].poBox.length > 0){
	            					
	            					 scope.formData1.zipCode = scope.propertyCodesData[j].poBox;
	            				 }
	            				 scope.status=scope.propertyCodesData[j].status;
	            				 scope.propetyId=scope.propertyCodesData[j].id;
	            				 break;
	            			 }
	            		 }
	            	   }else{
	            		 delete scope.formData1.street;
	            		 delete scope.formData1.city;
	            		 delete scope.formData1.state;
	            		 delete scope.formData1.country;
	            		 delete scope.formData1.zipCode;
	            	   }
	             };        
	             
        
//addonetimsale controller
      	
			  scope.formData2 = {};
	          scope.maxDate = new Date();
	          
	          var config = webStorage.get("client_configuration").deviceAgrementType;
			  scope.config=config;
			  
	          if(config == "SALE"){
	        	  if(PermissionService.showMenu('CREATE_NEWSALE')){ 
	        		  scope.formData2.saleType='NEWSALE';
	    		  }else if(PermissionService.showMenu('CREATE_SECONDSALE')){
	    			  scope.formData2.saleType='SECONDSALE';
	              }
	        	  
	        	  scope.clientId=routeParams.id;
		           resourceFactory.oneTimeSaleTemplateResource.getOnetimes({clientId: scope.clientId}, function(data) {
		        	   scope.itemDatas = data.itemDatas;
		            	scope.discountMasterDatas = data.discountMasterDatas;
			            scope.officesDatas=data.officesData;
			            	
			            for(var i=0;i<scope.officesDatas.length;i++){
			            	if(scope.officesDatas[i].id==1){
			            		scope.formData2.officeId=scope.officesDatas[i].id;
			            	}
			            }
	                    scope.onetimesales=data;
		            scope.date= {};
		            scope.date.saleDate = new Date();
		            
		        });
	        
	          }else{
	        	  scope.itemtypes=[];
	              resourceFactory.itemResourceTemplate.getAll(function(data){
	            	  scope.itemtypes=data.itemDatas;
	              });	  
	          }
	       
	        scope.itemData=function(itemId,officeId){
	        	
	        	  scope.saleType=scope.formData2.saleType;
	        	resourceFactory.oneTimeSaleTemplateResourceData.get({itemId: itemId,region:scope.formData1.state}, function(data) {
	        	
	        		scope.formData2=data;
	        		scope.formData2.itemId=itemId;
	        		scope.formData2.officeId=officeId;
	        		scope.formData2.discountId = scope.discountMasterDatas[0].id;
	        		scope.formData2.saleType=scope.saleType;
	        		scope.data.unitPrice=scope.formData2.unitPrice;
	        		scope.data.locale=$rootScope.locale.code;
	        		scope.data.quantity=1;
	        		scope.data.units=scope.formData2.units;
	        		scope.formData2.quantity=1;
	        		scope.formData2.totalPrice=scope.formData2.unitPrice;
	        		scope.formData2.itemId=itemId;
	        		scope.formData2.discountId = scope.discountMasterDatas[0].id;
	        		
	        	/*	resourceFactory.oneTimeSaleQuantityResource.get({quantity:1,itemId:itemId},scope.data, function(data) {
		        		
	        			scope.formData2.quantity=1;
		        		scope.formData2.totalPrice=data.totalPrice;
		        		scope.formData2.itemId=itemId;
		        		scope.formData2.discountId = scope.discountMasterDatas[0].id;
		        		
			        });	*/
	        		
	        		
		        });	
	        };
	        scope.itemDataQuantity=function(quantity,itemId){
	        	
	        	this.data.unitPrice=this.formData2.unitPrice;
	        	this.data.locale=$rootScope.locale.code;
	        	this.data.quantity=1;
	        	
	        	resourceFactory.oneTimeSaleQuantityResource.get({quantity: quantity,itemId:itemId},this.data, function(data) {
	        		scope.formData2=data;
	        		scope.formData2.quantity=quantity;
	        		scope.formData2.itemId=itemId;
	        		scope.formData2.discountId = scope.discountMasterDatas[0].id;
	        		
		        });	
	        	 
	        	scope.formData3.quantity=this.data.quantity;
	        	
	        };
	       
	        scope.submit2 = function() {
	        };

//allocation  controller
	          scope.formData3 = {};
			  scope.clientId=routeParams.clientId;
	        scope.getData = function(query,officeId){
	        	if(query.length>0){
	        		resourceFactory.allocateHardwareDetails.getSerialNumbers({oneTimeSaleId:scope.formData2.itemId,officeId:officeId,query: query}, function(data) { 	        	
	     	            scope.itemDetails = data.serialNumbers;
	     	          
	     	        }); 
	        	}else{
	            	
	        	}
            };
            
            scope.getNumber= function(num) {
            	
            	if(num == undefined){
            		  return new Array(1);   
            	}
	             return new Array(parseInt(num));   
	         };
	        scope.submit3 = function() {
	        	
	        };
          
  //createorder controller
	        scope.plandatas = [];
	        scope.subscriptiondatas=[];
	        scope.paytermdatas=[];
	        scope.start = {};
	        scope.start.date = new Date();
	        scope.sortingOrder = 'planCode';
	        scope.reverse = false;
	        scope.filteredItems = [];
	        scope.prepaidPalnfilteredItems = [];
	        scope.groupedItems = [];
	        scope.itemsPerPage =6;
	        scope.pagedItems = [];
	        scope.prepaidPlanspagedItems = [];
	        scope.currentPage = 0;
	        scope.items =[];
	        scope.formData4 =[];
	        scope.formData5 ={};
	        scope.formData6={};
	       
	        resourceFactory.orderTemplateResource.get({planId:'0'},function(data) {
	        	 
	          scope.plandatas = data.plandata;
	          scope.items = data.plandata;
	          scope.prepaidPlansitems = data.plandata;
	          scope.subscriptiondatas=data.subscriptiondata;
	          scope.paytermdatas=data.paytermdata;
	          scope.clientId = routeParams.id;
	      
	          scope.formData4 = {
	            		billAlign: false,
	            		
	                  };
	        });
	        
	        scope.setBillingFrequency = function(value) {
	        	scope.paytermdatas=undefined;
	        	 resourceFactory.orderResource.get({planId:value, template: 'true'} , function(data) {
	        		 
	        		 scope.paytermdatas=data.paytermdata;
	        		 scope.formData4.isPrepaid=data.isPrepaid;
	        		 scope.isPrepaidPlanFormData4=data.isPrepaid;
	        		 scope.formData4.planCode=value;
	        		 
	        		  for (var i in data.subscriptiondata) {
	                 	if(data.subscriptiondata[i].Contractdata == data.contractPeriod){
	                 		 scope.formData4.contractPeriod=data.subscriptiondata[i].id; 
	                 	}
	                   
	                  };
	             });
	       };
	        
	        scope.submit4 = function() {   
	        	scope.flag = true;
	        	this.formData4.locale = $rootScope.locale.code;
	        	this.formData4.isNewplan=true;
	        	var reqDate = dateFilter(scope.start.date,'dd MMMM yyyy');
	            this.formData4.dateFormat = 'dd MMMM yyyy';
	            this.formData4.start_date = reqDate;
	            if(this.formData4.isPrepaid == 'Y'){
	            	  for (var i in scope.paytermdatas) {
	                     	if(scope.paytermdatas[i].duration == this.formData4.contractPeriod){
	                     		 this.formData4.paytermCode=scope.paytermdatas[i].paytermtype; 
	                     	}
	                  };
	                  for (var i in scope.subscriptiondatas) {
	                   	if(scope.subscriptiondatas[i].Contractdata == this.formData4.contractPeriod){
	                   		 this.formData4.contractPeriod=scope.subscriptiondatas[i].id;
	                   		
	                   	}
	                };    
	            //this.formData.paytermCode='Monthly';
	                this.formData4.billAlign=false;
	            }

	            delete this.formData4.planId;
	            delete this.formData4.id;
	            delete this.formData4.isPrepaid;
	           
	            	scope.ActivationData = {};
	      		  scope.ActivationData.client = [];
	      		  scope.ActivationData.sale = [];
	      		  scope.ActivationData.allocate = [];
	      		  scope.ActivationData.bookorder = [];
	      		scope.ActivationData.owndevice=[];
	                  var reqDate = dateFilter(scope.first.date,'dd MMMM yyyy');
	                  this.formData1.locale = $rootScope.locale.code;
	                  this.formData1.active = true;
	                  this.formData1.dateFormat = 'dd MMMM yyyy';
	                  this.formData1.activationDate = reqDate;
	                  this.formData1.state=scope.formData1.state;
	                  this.formData1.country=scope.formData1.country;
	                  this.formData1.entryType="IND";
                      if(!scope.propertyMaster){
                       this.formData1.addressNo="Addr1";
	                  }
	                  this.formData1.flag=scope.configurationProperty;
	                  delete this.formData1.middlename;
	                  
	                if(config =='SALE'){  
	                	
	 	        	 this.formData2.locale = $rootScope.locale.code;
	 	             this.formData2.dateFormat = "dd MMMM yyyy";
	 	            this.formData2.quantity=1;
	 	            
	        		this.formData2.totalPrice=scope.formData2.totalPrice;
	 	             var actDate = dateFilter(scope.date.saleDate,'dd MMMM yyyy');
	 	             this.formData2.saleDate=actDate;
	 	             delete this.formData2.discountMasterDatas;   
	 	             delete this.formData2.warranty;
	 	             delete this.formData2.itemDatas;
	 	             delete this.formData2.units;
	 	             delete this.formData2.itemCode;
	 	             delete this.formData2.id;
	               delete this.formData2.chargesData;
	               delete this.formData2.feeMasterData;
	                }else if(config =='OWN'){
	                	
	                	  scope.formData5.locale = $rootScope.locale.code;
	  		            var reqDate = dateFilter(scope.first.date,'dd MMMM yyyy');
	  		            scope.formData5.dateFormat = 'dd MMMM yyyy';
	  		            scope.formData5.allocationDate = reqDate;
	  		            scope.formData5.status = "ACTIVE";
	  		          //scope.formData5.serialNumber=scope.formData5.provisioningSerialNumber;
	  		              if(scope.formData5.provisioningSerialNumber == undefined){ 
	  		            	scope.formData5.provisioningSerialNumber = scope.formData5.serialNumber;
	  		              }
	                }else{
	                	
	                }
	 	            
	                if(config =='SALE'){
	                	var temp1 = new Array();
	    	 	        
		 	        	$("input[name='serial']").each(function(){
		 	        		var temp = {};
		 	    			temp["serialNumber"] = $(this).val();
		 	    			temp["orderId"] = routeParams.id;
		 	    			temp["clientId"] = routeParams.clientId;
		 	    			temp["status"] = "allocated";
		 	    			temp["itemMasterId"] = scope.formData2.itemId;
		 	    			  
		 	    			temp["isNewHw"]="Y";
		 	    			temp1.push(temp);
		 	        	});
		 	        	this.formData2.serialNumber=temp1;
	                }
	 	        	
	 	            
	 	        	 scope.formData3.itemMasterId=scope.formData2.itemId;
	 	            

	 	            var clientId=null;
	 	            if(config =='OWN'){
	 	            	scope.ActivationData.owndevice.push(this.formData5);
	 	            }
		            scope.ActivationData.bookorder.push(this.formData4);
	 	            scope.ActivationData.allocate.push(this.formData3);
	 	            if(config =='SALE'){
	 	            	scope.ActivationData.sale.push(this.formData2);
	 	            }
	 	            scope.ActivationData.client.push(this.formData1);
	 	            
	 	            delete this.formData3.serialNumbers;
	 	            delete this.formData2.pageItems;
	 	            delete this.formData2.totalFilteredRecords;

	 	           
	 	    
	           	var resourceId=null;
	           	var paymentData=[];
	           	paymentData=scope.formData6;
	           
	            resourceFactory.activationProcessResource.save(scope.ActivationData,function(data){
	            	resourceId=data.resourceId;
	            	//var resp = filter('ConfigLookup')('payment');
	            	var resp = webStorage.get("client_configuration").payment;
	          
	            	if(resp){
	            	
	            	scope.formData6.paymentCode=23;
	            	scope.formData6.locale=$rootScope.locale.code;
	            	scope.formData6.dateFormat = 'dd MMMM yyyy';
	            	scope.formData6.paymentDate=reqDate;
	            	var num=Math.floor((Math.random()*900)+100);
	            	scope.formData6.receiptNo="SA"+num+"_"+scope.formData6.receiptNo;
	            	resourceFactory.paymentsResource.save({clientId :resourceId}, scope.formData6,function(data){
	            		

	            	});
	            	}
	            	location.path('/viewclient/'+ resourceId);
	            });
	           
	        };
    	  
		  
	
    }
  });
  mifosX.ng.application.controller('CreateActivationController', [
                                                                  '$scope',
                                                                  'webStorage',
                                                                  '$routeParams',
                                                                  'ResourceFactory', 
                                                                  '$location', 
                                                                  '$http',
                                                                  '$filter',
                                                                  'PermissionService', 
                                                                  'dateFilter',
                                                                  '$rootScope',
                                                                  'API_VERSION',
                                                                  mifosX.controllers.CreateActivationController]).run(function($log) {
    $log.info("CreateActivationController initialized");
  });
}(mifosX.controllers || {}));
