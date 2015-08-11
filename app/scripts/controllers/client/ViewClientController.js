(function(module) {
  mifosX.controllers = _.extend(module, {
    ViewClientController: function(scope,webStorage, routeParams , route, location, resourceFactory,paginatorService, http,$modal,dateFilter,API_VERSION,$rootScope,PermissionService,localStorageService,TENANT) {
        scope.clientId = routeParams.id;

    	 scope.client = [];
         scope.error = {};
         scope.identitydocuments = [];
         scope.buttons = [];
         scope.clientdocuments = [];
         scope.clientcarddetails = [];
         scope.staffData = {};
         scope.orders = [];
         scope.scheduleorders=[];
         scope.ippoolDatas = [];
         scope.formData = {};
 		 scope.start = {};
         scope.start.date = new Date();
         scope.payment = "PAYMENT";
         scope.invoice = "INVOICE";
         scope.adjustment = "ADJUSTMENT";
         scope.journal ="JOURNAL VOUCHER";
         scope.depositAndRefund ="DEPOSIT&REFUND";
         
         scope.financialJournals =[];
         scope.PermissionService = PermissionService;
         scope.ipstatus;
         scope.ipId;
         scope.walletconfig = webStorage.get('is-wallet-enable');
         scope.propertyMaster = webStorage.get("is-propertycode-enabled");
         
         var callingTab = webStorage.get('callingTab', null);
         if(callingTab == null){
        	 callingTab = "";
         }else{
        	 scope.displayTab=callingTab.someString;
 		  
        	 if( scope.displayTab == "moreInfo"){
        		 scope.moreInfoTab = true;
        		 webStorage.remove('callingTab');
        	 }
        	 else if(scope.displayTab == "documents"){
        		 scope.moreInfoTab = true;
        		 webStorage.remove('callingTab');
        	 }
        	 else if(scope.displayTab == "Tickets"){
        		 scope.TicketsTab = true;
        		 webStorage.remove('callingTab');
        	 }
        	 else if(scope.displayTab == "eventordertab"){
        		 scope.eventordertab =  true;
        		 webStorage.remove('callingTab');
        	 }
        	 else if(scope.displayTab == "Sale"){
        		 scope.SaleTab =  true;
        		 scope.eventsaleC="active";
        		 scope.mydeviceC="";
        		 webStorage.remove('callingTab');
        	 }
        	 else if(scope.displayTab == "StatementsTab"){
        		 scope.StatementsTab =  true;
        		 webStorage.remove('callingTab');
        	 }
        	 else if(scope.displayTab == "eventOrders"){
        		 scope.SaleTab = true;
        		 scope.eventsaleC = "";
        		 scope.eventorderC = "active";
        		 webStorage.remove('callingTab');
        	 }else if(scope.displayTab == "creditCardDetails"){
        		 scope.moreInfoTab = true;
        		 webStorage.remove('callingTab');
        	 }else if(scope.displayTab == "ACHDetailsTab"){
        		 scope.moreInfoTab = true;
        		 webStorage.remove('callingTab');
        	 }else if(scope.displayTab == "ChildDetailsTab"){
        		 scope.identitiesTab = true;
        		 webStorage.remove('callingTab');
        	 }else {
 			  webStorage.remove('callingTab');
        	 };
         }
         
         scope.routeTogeneral = function(orderid, clientid){
        	 location.path('/vieworder/'+orderid+'/'+ clientid);
         };
           
         scope.routeToOwnHardware = function(id){
             location.path('/viewownhardware/'+ id);
         };
           
         scope.routeToticket = function(clientId,ticketid){
             location.path('/viewTicket/'+clientId+'/'+ticketid);
         };
         
         scope.routeToFollowupTicket=function(clientId,ticketid){
        	 location.path('/editTicket/'+clientId+'/'+ticketid);
         };
         
         scope.routeToCloseTicket=function(clientId,ticketid){
        	 location.path('/closeTicket/'+clientId+'/'+ticketid);
         };
         
         scope.routeTostatement = function(statementid){
             location.path('/viewstatement/'+statementid);
         };
         
         scope.routeTofinancial = function(transactionId, transtype, clientid){
        	 if(transtype == 'INVOICE'){
        		 location.path('/viewfinancialtran/'+ transactionId +'/'+ clientid);
        	 }
         };
         
         scope.routeToItemSale = function(onetimesaleid, clientid){
        	 location.path('/viewonetimesale/'+ onetimesaleid +'/'+ clientid);
         };

         scope.routeToCardDetails = function(clientid, id, cardType){
        	 location.path('/viewcarddetails/'+ clientid +'/'+ id +'/'+ cardType);
         };
          
         scope.routeTotable = function(tableName, clientId, cardType){
             location.path('/viewdatatableentry/'+ tableName +'/'+ clientId +'/'+ cardType);
         };
          
         var bookOrder = PermissionService.showMenu('CREATE_ORDER')&&PermissionService.showMenu('READ_ORDER');
         var redemption = PermissionService.showMenu('CREATE_REDEMPTION');
         var riseTicket = PermissionService.showMenu('CREATE_TICKET')&&PermissionService.showMenu('READ_TICKET');
         var makePayment = PermissionService.showMenu('CREATE_PAYMENT')&&PermissionService.showMenu('READ_GETPAYMENT');
         var payInvoice = PermissionService.showMenu('CREATE_PAYMENT')&&PermissionService.showMenu('READ_GETPAYMENT')&&PermissionService.showMenu('READ_INVOICEMAP');
         var distribute =  PermissionService.showMenu('CREATE_CREDITDISTRIBUTION')&&PermissionService.showMenu('READ_CREDITDISTRIBUTION');
         var postAdjustment =  PermissionService.showMenu('CREATE_ADJUSTMENT')&&PermissionService.showMenu('READ_ADJUSTMENT');
         var doInvoice = PermissionService.showMenu('CREATE_INVOICE');
         var statement = PermissionService.showMenu('READ_BILLMASTER');
         var edit = PermissionService.showMenu('UPDATE_CLIENT');
         var acceptTransfer = PermissionService.showMenu('ACCEPTTRANSFER_CLIENT');
         var rejectTransfer = PermissionService.showMenu('REJECTTRANSFER_CLIENT');
         var undoTransfer = PermissionService.showMenu('WITHDRAWTRANSFER_CLIENT');

         var getDetails = function(){
        	 
        	
        	resourceFactory.clientResource.get({clientId: routeParams.id} , function(data) {
        		scope.orders = [];
                scope.client = data;
                
                //adding account no and name to display recent clients in dashboard
                $rootScope.clientAccountNo = data.accountNo;
                $rootScope.clientDisplayName = data.displayName;
                
                webStorage.add("walletAmount",scope.client.walletAmount);
                scope.statusActive = scope.client.status.code;
                scope.taxExemption = scope.client.taxExemption;
                if(scope.taxExemption == 'N'){
                	$('#offbtn').removeClass("btn-default");
                    $('#offbtn').addClass("active btn-primary");
                    $('#onbtn').removeClass("active btn-primary");
                    $('#onbtn').addClass("btn-default");
                } else{
                	$('#onbtn').removeClass(" btn-default");
                    $('#onbtn').addClass("active btn-primary");
                    $('#offbtn').removeClass("active btn-primary");
                    $('#offbtn').addClass("btn-default");
                }
                scope.staffData.staffId = data.staffId;
                    
                $rootScope.ClientData = {clientId:routeParams.id,
                						 balanceAmount: data.balanceAmount, 
                						 displayName: data.displayName, 
                						 hwSerialNumber: data.hwSerialNumber,
                						 statusActive: data.status.value, 
                						 accountNo: data.accountNo, 
                						 officeName: data.officeName,
                						 officeId:data.officeId,
                						 currency: data.currency,
                						 imagePresent: data.imagePresent, 
                						 phone:data.phone, 
                						 email:data.email, 
                						 categoryType:data.categoryType };

                 webStorage.add("clientData", $rootScope.ClientData); 
                 if (data.imagePresent) {
                	 http({
                		 method:'GET',
                		 url: $rootScope.hostUrl+ API_VERSION +'/clients/'+ routeParams.id +'/images'
                      	 }).then(function(imageData) {
                         scope.image = imageData.data;
                         $rootScope.ClientData.image=imageData.data;
                         webStorage.add("clientData", $rootScope.ClientData);
                      	 });
                 }
                 //if (data.status.value == "Active") {
                 scope.buttons = [{
                      	                  name:"label.add.device",
                      	                  href:"#/adddevice",
                      	                  icon:"icon-tag",
                      	                  ngShow : bookOrder
                         	            },
                         	            {
                                            name:"button.neworder",
                                            href:"#/neworder/0",
                                            icon :"icon-plus-sign",
                                            ngShow : bookOrder
                                          	 
                                         },
                                         {
                                             name:"button.payments",
                                             href:"#/payinvoice",
                                             icon :"icon-usd",
                                             ngShow : payInvoice
                                          },
                                          {
                                              name:"button.invoice",
                                              href:"#/clientinvoice",
                                              icon :"icon-play",
                                              ngShow : doInvoice
                                           },
                                           {                                 
 	                                          name:"Service Transfer ",	
 	                                          href:"#/servicetransfer",
 	                                          icon :"icon-map-marker",
 	                                          ngShow : "serviceTransfer"
                                           },
                         	              {
                                            name:"button.redemption",
                                            href:"#/redemption",
                                            icon :"icon-plus-sign",
                                            ngShow : redemption
                                          	 
                                          },
                                          {
 	                                          name:"Static Ip",	
 	                                          href:"#/staticip",
 	                                          icon :"",
 	                                          ngShow : "staticIp"
                                           },
                                           {
   	                                        name:"button.edit",
   	                                        href:"#/editclient",
   	                                        icon :"icon-edit",
   	                                        ngShow : edit
                                           },
                                           {
                                            name:"Deposit",
                                            href:"#/depositPopup",
                                            icon:"icon-briefcase",
                                            ngShow : "true"
                                           },
                                           {
                                           	name:"Close",
                                           	href:"#/closeclient",
                                           	icon:"icon-remove",
                                           	ngShow : "true"
                                           },
                                        /*{
                                          name:"button.newTicket",
                                          href:"#/newTicket",
                                          icon :"icon-flag",
                                          ngShow : riseTicket
                                        },*/
                                        
                                        /*{

                                            name:"button.payments",
                                            href:"#/payments",
                                            icon :"icon-usd",
                                            ngShow : makePayment
                                         },
                                            icon :"icon-usd"
                                         },*/
                                         /* {

                                              name:"button.distribution",
                                              href:"#/creditDistribution",
                                              icon :"icon-usd",
                                              ngShow : distribute
                                           },
                                              icon :"icon-usd"
                                           },*/
                                          
                                        /* {
                                             name:"button.adjustments",
                                             href:"#/adjustments",
                                             icon :"icon-adjust",
                                             ngShow : postAdjustment
                                         },*/
                                          /*{
                                             name:"button.statement",
                                             href:"#/statement",
                                             icon :"icon-file",
                                             ngShow : statement
                                         },*/                                                                              
                                        {
	                                          name:"",	
	                                          href:"#/viewclient",
	                                          icon :"icon-refresh",
	                                          ngShow : "true"
                                        }
                                      ];

                   

                 if (data.status.value == "Transfer in progress") {
                	 scope.buttons = [{
                                        name:"button.accept.transfer",
                                        href:"#/client",
                                        subhref:"acceptclienttransfer",
                                        icon :"icon-check-sign",
                                        ngShow : acceptTransfer
                                      },
                                      {
                                        name:"button.reject.transfer",
                                        href:"#/client",
                                        subhref:"rejecttransfer",
                                        icon :"icon-remove",
                                        ngShow : rejectTransfer
                                      },
                                      {
                                        name:"button.undo.transfer",
                                        href:"#/client",
                                        subhref:"undotransfer",
                                        icon :"icon-undo",
                                        ngShow : undoTransfer
                                      }];
                  }
                  if (data.status.value == "Transfer on hold") {
                	  scope.buttons = [{
                                        name:"button.undo.transfer",
                                        href:"#/client",
                                        subhref:"undotransfer",
                                        icon :"icon-undo",
                                        ngShow : undoTransfer
                                      }];
                  }
                  if(PermissionService.showMenu('READ_ORDER'))
                	  resourceFactory.getOrderResource.getAllOrders({clientId: routeParams.id} , function(data) {
                		  scope.orders = data.clientOrders;
                	  });
                  	  resourceFactory.EventActionResource.get({clientId: routeParams.id} , function(data) {
                  		  scope.scheduleorders = data;   
                  	  });
                  	  resourceFactory.DataTablesResource.query({apptable: 'm_client'}, function (data) {
                  		  scope.clientdatatables = data;
                  	  });
            });
        };
      
        getDetails();
        
        scope.allocateProperty = function(serialnum){
      	  scope.errorStatus=[];scope.errorDetails=[];
      	  scope.serialnum = serialnum;
      	  $modal.open({
                templateUrl: 'allocateproperty.html',
                controller: AllocatePropertyController,
                resolve:{}
            });
        };
        
        /* view provisioning data        */
        scope.getAllProvisioningDetails = function () {
            
            resourceFactory.provisioningDetailsMappingResource.query({clientId:scope.clientId} , function(data) {
                scope.provisioningdatas = data;
                scope.sentMessagesData = [];
                for(var i in data){
              	  scope.sentMessagesData.push(data[i]);
                };
                
              });
        };
        scope.reProcess=function(processId){
      	  
      	  resourceFactory.updateProvisioningMappingResource.update({'provisioningId':processId},{},function(data){
            	/*location.path('/vieworder/'+routeParams.id+'/'+scope.orderPriceDatas[0].clientId);
            	location.path('/vieworder/'+routeParams.id+"/"+scope.clientId);*/
      		  route.reload();
  	           
  	          });
        }
        scope.confirmRequest = function (provId){
          	scope.errorStatus=[];
          	scope.errorDetails=[];
          	scope.provId=provId;
          	 $modal.open({
                   templateUrl: 'ApproveConfirm.html',
                   controller: ApproveConfirm,
                   resolve:{}
               });
            };
            //sent message pop up start 
            scope.sentMessagePopup = function(id){
          	  
          	  scope.provisioningDataId = id;
          	  $modal.open({
                    templateUrl: 'sentMessage.html',
                    controller: SentMessageController,
                    resolve:{}
                });	
            }
            
            var ApproveConfirm= function ($scope, $modalInstance) {
        		
                $scope.approveTerminate = function () {

                	$scope.flagapproveTerminate=true;
                	if(this.formData == undefined || this.formData == null){
                		this.formData = {};
                	}
                	  resourceFactory.confirmProvisioningDetailsResource.update({'provisioningId':scope.provId},{},function(data){
                		/*resourceFactory.getSingleOrderResource.get({orderId: routeParams.id} , function(data) {
                            scope.orderPriceDatas= data.orderPriceData;
                            scope.orderHistorydata=data.orderHistory;
                            scope.orderData=data.orderData;
                        });
                		location.path('/vieworder/'+routeParams.id+"/"+scope.clientId);*/
                		  scope.getAllProvisioningDetails(scope.orderNumber);
                        $modalInstance.close('delete');
                    },function(errData){
    	        		$scope.flagApproveReconnect = false;
    		          });
                	
                };
                $scope.cancelReconnect = function () {
                    $modalInstance.dismiss('cancel');
                };
            };  
            var SentMessageController = function($scope,$modalInstance){
          	  
          	  $scope.sentMessage = {};
          	  $scope.messageData = [];
          	  
          	  for (var i in scope.sentMessagesData){
          		  	
          		 if( scope.sentMessagesData[i].id == scope.provisioningDataId){
          			 
          			 try{
          				 var obj  = JSON.parse(scope.sentMessagesData[i].sentMessage);
          				 $scope.sentMessage = obj;
          			 }catch(e){
          				 console.log(e.message);
          			 }
          			 
          	    	  for (var key in $scope.sentMessage) {
          	    		  if(key == "IP_ADDRESS"){
          	    			  var outerStr = $scope.sentMessage[key].toString();$scope.sentMessage[key] = [];
          	    			  $scope.sentMessage[key].push({"key":outerStr,"value":""});
          	    			  $scope.messageData.push({
      		  											"key" : key,
      		  											"value" :$scope.sentMessage[key],
          	    			   });	
          	    			  
          	    		  }else{
          	    			  var outerObj = $scope.sentMessage[key];$scope.sentMessage[key] = [];
          	    			  if(typeof(outerObj) == 'object'){
          	    				  var obj1 = outerObj[0];
          	    				  if(typeof(obj1) == 'string'){
          	    					  try {
          	    						  var obj2 = JSON.parse(obj1);
          	    						  outerObj = [];outerObj.push(obj2);
          	    					  }catch(e) {
          	    						  console.log(e.message);
          	    					  }
          	    				  }
      	    	    			  for(var key1 in outerObj){ var innerObj = outerObj[key1];
      	    	    				  for(var key2 in innerObj){
      	    	    					  $scope.sentMessage[key].push({"key":key2,"value":innerObj[key2]});
      	    	    				  };
      	    	    			  };
          	    			  }else{
          	    				  $scope.sentMessage[key].push({"key":outerObj,"value":""});
          	    			  }
          	    			  $scope.messageData.push({
          	    			  						"key" : key,
          	    			  						"value" : $scope.sentMessage[key],
          	    			  });	
          	    		  }
          	    	  };
         	    		break;
          		 };
          	  }
          	  
      			$scope.cancel = function(){
      				$modalInstance.dismiss('cancel');
      			};
          };
            
        
        
        var AllocatePropertyController = function ($scope, $modalInstance) {
            
      	  $scope.propertycodes = [];
            resourceFactory.propertydeviceMappingTemaplateResource.get({'clientId': routeParams.id},function(data) {
                $scope.propertycodes = data;
            });
      	  
      	  $scope.approveAllocate = function () {
      		  $scope.flagOrderDisconnect=true;
      		  
      		  if(this.formData == undefined || this.formData == null){
      			 /// this.formData = {"disconnectReason":""};
      		  }
      		this.formData.serialNumber=scope.serialnum;
      		  resourceFactory.propertydeviceMappingResource.update({'clientId': routeParams.id},this.formData,function(data){
      	            /*location.path('/viewclient/'+scope.orderPriceDatas[0].clientId);
      	            location.path('/vieworder/'+data.resourceId);*/
      			  resourceFactory.oneTimeSaleResource.getOneTimeSale({clientId: routeParams.id}, function(data) {
                  	scope.onetimesales = data.oneTimeSaleData;
                      scope.eventOrders = data.eventOrdersData;
                  });
      	            $modalInstance.close('delete');
      	        },function(orderErrorData){
      	        	 $scope.flagOrderDisconnect=false;
      	        	$scope.orderError = orderErrorData.data.errors[0].userMessageGlobalisationCode;
      	        });
      		  
            };
            $scope.cancelAllocate = function () {
                $modalInstance.dismiss('cancel');
            };
            
            
        };
        
        var Approve = function($scope, $modalInstance){
        	 scope.errorDetails = [];
        	 scope.errorStatus = [];
        	$scope.accept = function(date){
        		$scope.flagapprove1 = true;
			    scope.formData.locale = $rootScope.locale.code;
			    var reqDate = dateFilter(date, 'dd MMMM yyyy');
			    scope.formData.dateFormat = 'dd MMMM yyyy';
			    scope.formData.systemDate = reqDate;
			    resourceFactory.clientInvoiceResource.save({'clientId': routeParams.id}, scope.formData, function(data, putResponseHeaders){
			    	$modalInstance.close('delete');
			        getDetails();
			    },function(errData){
			    	$scope.flagapprove1 = false;
			        $scope.error = errData.data.errors[0].userMessageGlobalisationCode;
			      });
			};
			
			$scope.reject = function(){
				$modalInstance.dismiss('cancel');
			};
			
		};
		
		var CancelPayment = function($scope, $modalInstance, getPaymentId){
			
			$scope.accept = function(cancelRemark){
				$scope.flagcancelpayment = true;
				var paymentId = getPaymentId;
				scope.formData.cancelRemark = cancelRemark;
				resourceFactory.cancelPaymentResource.update({'paymentId':paymentId}, scope.formData, function(data){
					$modalInstance.close('delete');
				    getDetails();
				    scope.getAllFineTransactions();
				},function(errData){
					$scope.flagcancelpayment = false;
				  });         
			};
			
			$scope.reject = function(){
				$modalInstance.dismiss('cancel');
			};
		};
			
		scope.deleteChildsFromparent = function(childId){
			
			resourceFactory.clientParentResource.remove({clientId:routeParams.id, anotherresource:childId}, {}, function(data){
					location.path('/viewclient/'+ routeParams.id);
					route.reload();
                });
		};
			
        scope.cancelPayment = function(id){
        	
        	$modal.open({
                templateUrl: 'cancelpayment.html',
                controller: CancelPayment,
                resolve:{
                	 	getPaymentId:function(){
                	 		return id;
                	 	}
                }
            });
        };
        
		scope.getMe = function(href, cId, subHref){
			
			var url = href.replace("#","")+"/"+ cId +""+(subHref == undefined?"":"/"+ subHref);
			if(href == "#/adddevice"){
        		location.path(url+"/"+scope.client.officeId);

        	}else if(href == "#/clientinvoice"){

        		$modal.open({
                    templateUrl: 'approve1.html',
                    controller: Approve,
                    resolve:{}
                });
        	}else if(href == "#/statement"){
        		$modal.open({
                    templateUrl: 'StatementPop.html',
                    controller: StatementPopController,
                    resolve:{}
                });
        	}else if(href == "#/redemption"){
        		$modal.open({
                    templateUrl: 'redemptionpop.html',
                    controller: redemptionPopController,
                    resolve:{}
                });
        	}else if(href == "#/staticip"){

        		$modal.open({
                    templateUrl: 'Staticip.html',
                    controller: StaticIpPopController,
                    resolve:{}
                });
        	}else if(href == "#/depositPopup"){

        		$modal.open({
                    templateUrl: 'depositpop.html',
                    controller: depositPopController,
                    resolve:{}
                });
        	}else if(href == "#/viewclient"){
        		route.reload();
        	}else{
        		location.path(url);
        	}
        };
        
        var StatementPopController = function($scope, $modalInstance){
        	
        	$scope.start = {};
            $scope.start.date = new Date();
        	$scope.acceptStatement = function(){
        		
        		$scope.flagStatementPop = true;
        		console.log("Accept Statement");
        		if($scope.formData == undefined || $scope.formData == null){
        			$scope.formData = {"message":""};
                }
        		this.formData.locale = $rootScope.locale.code;
   	         	var reqDate = dateFilter($scope.start.date, 'dd MMMM yyyy');
   	         	this.formData.dateFormat = 'dd MMMM yyyy';
   	         	this.formData.dueDate = reqDate;
        		resourceFactory.statementResource.save({'clientId': routeParams.id}, this.formData, function(data) {
                    location.path('/billmaster/' +routeParams.id);
                    $modalInstance.close('delete');
                },function(errorData){
                	$scope.flagStatementPop = false;
                	$scope.stmError = errorData.data.errors[0].userMessageGlobalisationCode;
                	console.log(errorData);
                	console.log($scope.stmError);
                });
        	};
        
        	$scope.rejectStatement = function(){
        		console.log("Reject Statement");
        		$modalInstance.dismiss('cancel');
        	};
        };
        
 var redemptionPopController = function($scope, $modalInstance){
        	
	 		scope.errorDetails = [];
	 		scope.errorStatus = [];
        	$scope.acceptRedemption= function(){
        		
        		$scope.flagStatementPop = true;
        		
        		if($scope.formData == undefined || $scope.formData == null){
        			$scope.formData = {"pinNumber":""};
                }
        		this.formData.clientId= routeParams.id;
        		  
        		  resourceFactory.redemptionResource.save(this.formData,function(data){
//        				location.path("/viewclient/"+routeParams.id);
        			  route.reload();
                    $modalInstance.close('delete');
                },function(errorData){
                	$scope.flagStatementPop = false;
                	$scope.stmError = errorData.data.errors[0].userMessageGlobalisationCode;
                	console.log(errorData);
                	console.log($scope.stmError);
                });
        	};
        
        	$scope.rejectStatement = function(){
        		console.log("Reject Statement");
        		$modalInstance.dismiss('cancel');
        	};
        };
        
        
        scope.deleteClient = function () {
        	
            $modal.open({
                templateUrl: 'deleteClient.html',
                controller: ClientDeleteCtrl
            });
        };
        
        scope.unassignStaffCenter = function () {
        	
            $modal.open({
                templateUrl: 'clientunassignstaff.html',
                controller: ClientUnassignCtrl
            });
        };
        
        var ClientDeleteCtrl = function ($scope, $modalInstance) {
        	
            $scope.deleteClientConfirm = function () {
                resourceFactory.clientResource.remove({clientId: routeParams.id}, {}, function(data){
                    location.path('/clients');
                });
                $modalInstance.close('delete');
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };
        
        var ClientUnassignCtrl = function ($scope, $modalInstance) {
            $scope.unassign = function () {
                resourceFactory.clientResource.save({clientId: routeParams.id, command : 'unassignstaff'}, scope.staffData,function(data){
                    route.reload();
                });
                $modalInstance.close('unassign');
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };
        
        scope.getClientNotes = function(){
        	if(PermissionService.showMenu('READ_CLIENTNOTE')){
        		resourceFactory.clientNotesResource.getAllNotes({clientId: routeParams.id} , function(data) {
        			scope.clientNotes = data;
        		});
        	}
        };
        
        scope.getClientIdentityDocuments = function () {
 
        	scope.indentitiesSubTab = "active";
        	scope.documnetsUploadsTab = "";
        	scope.additionaldataSubTab = "";
        	scope.additionaladdressdataSubTab="";
        	scope.additionaladdressdataSubTab = "";
        	scope.creditCardDetailsTab = "";
        	scope.ACHDetailsTab = "";
        	scope.ChildDetailsTab = "";
        	
        	if(scope.displayTab == "documents"){
        		scope.indentitiesSubTab = "";
        		scope.additionaldataSubTab = "";
        		scope.additionaladdressdataSubTab = "";
            	scope.documnetsUploadsTab = "active";
            	scope.creditCardDetailsTab = "";
            	scope.ACHDetailsTab = "";
            	scope.ChildDetailsTab = "";
            	scope.displayTab = "";
            	scope.documnetsUploadsTabFun();
        		
        	}else if(scope.displayTab == "additionaldata"){
        		scope.indentitiesSubTab = "";
            	scope.documnetsUploadsTab = "";
            	scope.additionaldataSubTab = "active";
            	scope.additionaladdressdataSubTab = "";
            	scope.creditCardDetailsTab = "";
            	scope.ACHDetailsTab = "";
            	scope.ChildDetailsTab="";
            	scope.displayTab = "";
            	scope.additionalDataTabFun();
        	}else if(scope.displayTab == "additionaladdress"){
        		scope.indentitiesSubTab = "";
            	scope.documnetsUploadsTab = "";
            	scope.additionaldataSubTab = "";
            	scope.additionaladdressdataSubTab = "active";
            	scope.creditCardDetailsTab = "";
            	scope.ACHDetailsTab = "";
            	scope.ChildDetailsTab="";
            	scope.displayTab = "";
            	scope.additionalDataTabFun();
            	scope.additionalAddressTabFun();
        	}else if(scope.displayTab == "creditCardDetails"){
        		scope.indentitiesSubTab = "";
            	scope.documnetsUploadsTab = "";
            	scope.additionaladdressdataSubTab = "";
            	scope.additionaldataSubTab = "";
            	scope.creditCardDetailsTab = "active";
            	scope.ACHDetailsTab = "";
            	scope.ChildDetailsTab="";
            	scope.displayTab = "";
            	scope.creditCardDetailsTabFun();
            	
        	}else if(scope.displayTab == "ACHDetailsTab"){
        		scope.indentitiesSubTab = "";
            	scope.documnetsUploadsTab = "";
            	scope.additionaladdressdataSubTab = "";
            	scope.additionaldataSubTab = "";
            	scope.creditCardDetailsTab = "";
            	scope.ACHDetailsTab = "active";
            	scope.ChildDetailsTab = "";
            	scope.displayTab = "";
            	scope.ACHDetailsTabFun();
        	}else if(scope.displayTab == "ChildDetailsTab"){
        		scope.indentitiesSubTab = "";
        		scope.additionaladdressdataSubTab = "";
            	scope.documnetsUploadsTab = "";
            	scope.creditCardDetailsTab = "";
            	scope.additionaldataSubTab = "";
            	scope.ACHDetailsTab = "";
            	scope.ChildDetailsTab = "active";
            	scope.displayTab = "";
            	scope.childsFun();
        	}
        	scope.offbtn = function(){
        		$('#offbtn').removeClass("btn-default");
           	   	$('#offbtn').addClass("active btn-primary");
           	  	$('#onbtn').removeClass("active btn-primary");
           	  	$('#onbtn').addClass("btn-default");
           	  	var obj = {"taxExemption":false};
           	  	if(scope.taxExemption!='N'){
           	  		scope.taxExemption='N';
           	  		resourceFactory.taxExemptionResource.update({clientId:routeParams.id}, obj, function(data){
           	  		});
           	  	}	
            };
            scope.onbtn = function(){
            	$('#onbtn').removeClass("btn-default");
           	   	$('#onbtn').addClass("active btn-primary");
           	   	$('#offbtn').addClass("btn-default");
           	   	$('#offbtn').removeClass("active btn-primary");
           	   	var obj = {"taxExemption":true};
           	   	if(scope.taxExemption!='Y'){
           	   		scope.taxExemption='Y';
           	  		resourceFactory.taxExemptionResource.update({clientId:routeParams.id}, obj, function(data){
           	  		});
           	  	}
            };
        	
            resourceFactory.clientResource.getAllClientDocuments({clientId: routeParams.id, anotherresource: 'identifiers'}, function(data) {
            	scope.identitydocuments = data;
            	
            	for(var i = 0; i < scope.identitydocuments.length; i++) {
            		resourceFactory.clientIdentifierResource.get({clientIdentityId: scope.identitydocuments[i].id}, function(data) {
            			for(var j = 0; j < scope.identitydocuments.length; j++) {
            				if(data.length > 0 && scope.identitydocuments[j].id == data[0].parentEntityId){
            					scope.identitydocuments[j].documents = data;
            				}
            			}
            		});
            	}
            });
         
            //parentClient 
            resourceFactory.clientParentResource.get({clientId:routeParams.id}, function(data) {
            	scope.parent = [];
            	scope.parent = data.parentClientData;
            	scope.parentCount = data.count; 
            });
          
        };
        
        
        //identities tab fun
        scope.indentitiesTabFun = function(){
        	
        	scope.indentitiesSubTab = "active";
        	scope.additionaldataSubTab ="";
        	scope.additionaladdressdataSubTab = "";
        	scope.documnetsUploadsTab = "";
        	scope.creditCardDetailsTab = "";
        	scope.ACHDetailsTab = "";
        	scope.ChildDetailsTab = "";
        	
        	resourceFactory.clientResource.getAllClientDocuments({clientId: routeParams.id, anotherresource: 'identifiers'} , function(data) {
                scope.identitydocuments = data;
                for(var i = 0; i < scope.identitydocuments.length; i++) {
                	resourceFactory.clientIdentifierResource.get({clientIdentityId: scope.identitydocuments[i].id} , function(data) {
                		for(var j = 0; j < scope.identitydocuments.length; j++) {
                			if(data.length > 0 && scope.identitydocuments[j].id == data[0].parentEntityId){
                				scope.identitydocuments[j].documents = data;
                			}
                		}
                	});
                }
            }); 
        };
        
        scope.documnetsUploadsTabFun = function(){
        	
        	scope.indentitiesSubTab = "";
        	scope.additionaladdressdataSubTab = "";
        	scope.documnetsUploadsTab = "active";
        	scope.additionaldataSubTab ="";
        	scope.creditCardDetailsTab = "";
        	scope.ACHDetailsTab = "";
        	scope.ChildDetailsTab = "";
        	//documents details
            if(PermissionService.showMenu('READ_DOCUMENT')){
        		resourceFactory.clientDocumentsResource.getAllClientDocuments({clientId: routeParams.id}, function(data) {
        			scope.clientdocuments = data;
        		});
        	}  
        };
        
        scope.creditCardDetailsTabFun = function(){
        	
        	scope.indentitiesSubTab = "";
        	scope.additionaladdressdataSubTab = "";
        	scope.documnetsUploadsTab = "";
        	scope.additionaldataSubTab ="";
        	scope.creditCardDetailsTab = "active";
        	scope.ACHDetailsTab = "";
        	scope.ChildDetailsTab = "";
        	
        	//credit card details
            resourceFactory.creditCardSaveResource.get({clientId: routeParams.id}, function(data1) {

            	var key  = mifosX.models.encrptionKey;
                scope.clientcarddetails = data1;
                for ( var i in scope.clientcarddetails) {	

                	if(scope.clientcarddetails[i].type == 'CreditCard'){
                  	  
                		var decrypted1 = CryptoJS.AES.decrypt(scope.clientcarddetails[i].cardNumber, key);
  				        var cardNum = decrypted1.toString(CryptoJS.enc.Utf8);
  				        var stars = "";
  				        for (var j in cardNum){
  				        	if(j>=0&&j<(cardNum.length)-4){
  				        		stars += "*";
  				        	}
  				        }
  				        cardNum = stars+cardNum.substr(cardNum.length-4, cardNum.length-1);
  				        scope.clientcarddetails[i].cardNumber = cardNum;
  				        var decrypted2 = CryptoJS.AES.decrypt(scope.clientcarddetails[i].cardExpiryDate,  key);
  				        scope.clientcarddetails[i].cardExpiryDate = decrypted2.toString(CryptoJS.enc.Utf8);
  				        
                    }else if(scope.clientcarddetails[i].type == 'ACH'){
                	        
                    	var decrypted1 = CryptoJS.AES.decrypt(scope.clientcarddetails[i].routingNumber,  key);
  				        var routingNumber = decrypted1.toString(CryptoJS.enc.Utf8);
  				        var stars = "";
  				        for (var j in routingNumber){
  				        	if(j>=0&&j<(routingNumber.length)-4){
  				        		stars += "*";
  				        	}
  				        }
  				        routingNumber = stars+routingNumber.substr(routingNumber.length-4,routingNumber.length-1);
  				        scope.clientcarddetails[i].routingNumber = routingNumber;

  				        var decrypted2 = CryptoJS.AES.decrypt(scope.clientcarddetails[i].bankAccountNumber, key);
  				        var bankAccountNumber = decrypted2.toString(CryptoJS.enc.Utf8);
  				        var stars = "";
  				        for (var j in bankAccountNumber){
  				        	if(j>=0&&j<(bankAccountNumber.length)-4){
  				        		stars += "*";
  				        	}
  				        }
  				        bankAccountNumber = stars+bankAccountNumber.substr(bankAccountNumber.length-4, bankAccountNumber.length-1);
  				        scope.clientcarddetails[i].bankAccountNumber = bankAccountNumber;
  				         
  				        var decrypted3 = CryptoJS.AES.decrypt(scope.clientcarddetails[i].bankName, key);
  					    scope.clientcarddetails[i].bankName = decrypted3.toString(CryptoJS.enc.Utf8);
                    }
                }
            });
        };
        
           scope.additionalDataTabFun = function(){
        	   
        	scope.indentitiesSubTab = "";
        	scope.documnetsUploadsTab = "";
        	scope.additionaladdressdataSubTab = "";
        	scope.creditCardDetailsTab = "";
        	scope.additionaldataSubTab = "active";
        	scope.ACHDetailsTab = "";
        	scope.ChildDetailsTab = "";
        	
        	scope.clientAdditionalData = webStorage.get("client-additional-data");
        	//credit card details
        	 scope.additionalDatas = {};
        	 resourceFactory.clientAdditionalResource.get({clientId: routeParams.id}, function(data) {
        		 var dataObj = JSON.parse(angular.toJson(data));
        		 console.log(Object.keys(dataObj).length);
        		 Object.keys(dataObj).length == 0 ? scope.editAdditionalDatasBtn = false : scope.editAdditionalDatasBtn = true;
        		 if(Object.keys(dataObj).length !=0 ){
        			 
	        		 resourceFactory.clientAdditionalResource.get({clientId: routeParams.id,template:true}, function(data) {
	        			 var nationalityDatas 				= data.nationalityDatas;
	        			 var languagesDatas 					= data.languagesDatas;
	        			 
	        			 
	        			 scope.additionalDatas.remarks = data.remarks;
	        			 scope.additionalDatas.dateOfBirth = data.dateOfBirth;
	        			 scope.additionalDatas.financeId = data.financeId;
	        			 for(var i in nationalityDatas){
	        				 if(data.nationalityId == nationalityDatas[i].id){
	        					 scope.additionalDatas.nationality = nationalityDatas[i].mCodeValue;
	        					 break;
	        				 }
	        			 }
	        			 for(var i in languagesDatas){
	        				 if(data.preferLanId == languagesDatas[i].id){
	        					 scope.additionalDatas.preferredLang = languagesDatas[i].mCodeValue;
	        					 break;
	        				 }
	        			 }
	        		 });
        		 } 
	        });
        };
        
        scope.additionalAddressTabFun = function(){
        	
        	scope.indentitiesSubTab = "";
        	scope.documnetsUploadsTab = "";
        	scope.creditCardDetailsTab = "";
        	scope.additionaladdressdataSubTab = "active";
        	scope.additionaldataSubTab = "";
        	scope.ACHDetailsTab = "";
        	scope.ChildDetailsTab = "";
        	
        	scope.clientAdditionalData = webStorage.get("client-additional-data");
        	//credit card details
        	 scope.additionaladdressDatas = {};
        	 resourceFactory.addressEditResource.get({clientId: routeParams.id,addressType:'BILLING'}, function(data) {
        		 scope.additionaladdressDatas=data.datas;
        	 });
        };
        
        
        
        scope.ACHDetailsTabFun = function(){
        	
        	scope.indentitiesSubTab = "";
        	scope.documnetsUploadsTab = "";
        	scope.creditCardDetailsTab = "";
        	scope.additionaladdressdataSubTab = "";
        	scope.additionaldataSubTab ="";
        	scope.ACHDetailsTab = "active";
        	scope.ChildDetailsTab = "";
        	//credit card details
            resourceFactory.creditCardSaveResource.get({clientId: routeParams.id} , function(data1) {

                var key  = mifosX.models.encrptionKey;
                scope.clientcarddetails = data1;
                for ( var i in scope.clientcarddetails) {	

                	if(scope.clientcarddetails[i].type == 'CreditCard'){
                  	  
                		var decrypted1 = CryptoJS.AES.decrypt(scope.clientcarddetails[i].cardNumber, key);
  				        var cardNum = decrypted1.toString(CryptoJS.enc.Utf8);
  				        var stars = "";
  				        for (var j in cardNum){
  				        	if(j>=0&&j<(cardNum.length)-4){
  				        		stars += "*";
  				        	}
  				        }
  				        cardNum = stars+cardNum.substr(cardNum.length-4, cardNum.length-1);
  				        scope.clientcarddetails[i].cardNumber = cardNum;
  				        var decrypted2 = CryptoJS.AES.decrypt(scope.clientcarddetails[i].cardExpiryDate, key);
  				        scope.clientcarddetails[i].cardExpiryDate = decrypted2.toString(CryptoJS.enc.Utf8);
  				        
                    }else if(scope.clientcarddetails[i].type == 'ACH'){
                	        
                    	var decrypted1 = CryptoJS.AES.decrypt(scope.clientcarddetails[i].routingNumber, key);
  				        var routingNumber = decrypted1.toString(CryptoJS.enc.Utf8);
  				        var stars = "";
  				        for (var j in routingNumber){
  				        	if(j>=0&&j<(routingNumber.length)-4){
  				        		stars += "*";
  				        	}
  				        }
  				        routingNumber = stars+routingNumber.substr(routingNumber.length-4, routingNumber.length-1);
  				        scope.clientcarddetails[i].routingNumber = routingNumber;

  				        var decrypted2 = CryptoJS.AES.decrypt(scope.clientcarddetails[i].bankAccountNumber, key);
  				        var bankAccountNumber = decrypted2.toString(CryptoJS.enc.Utf8);
  				        var stars = "";
  				        for (var j in bankAccountNumber){
  				        	if(j>=0&&j<(bankAccountNumber.length)-4){
  				        		stars += "*";
  				        	}
  				        }
  				        bankAccountNumber = stars+bankAccountNumber.substr(bankAccountNumber.length-4, bankAccountNumber.length-1);
  				        scope.clientcarddetails[i].bankAccountNumber = bankAccountNumber;
  				         
  				        var decrypted3 = CryptoJS.AES.decrypt(scope.clientcarddetails[i].bankName, key);
  					    scope.clientcarddetails[i].bankName = decrypted3.toString(CryptoJS.enc.Utf8);
                    }
                }
            });
        };

        /**Child Details Function*/ 	
        scope.childsFun = function(){
        	
        	scope.indentitiesSubTab = "";
        	cope.additionaladdressdataSubTab = "";
        	scope.documnetsUploadsTab = "";
        	scope.creditCardDetailsTab = "";
        	scope.additionaldataSubTab ="";
        	scope.ACHDetailsTab = "";
        	scope.ChildDetailsTab = "active";
        	
        	/*resourceFactory.clientParentResource.get({clientId:routeParams.id}, function(data) {
          	  scope.childsDatas = data.parentClientData;
          	  scope.parentCount = data.count;
            }); */
        };
        
        //leftside orderMenu function
        /*   scope.selectedOrder = function(status){
        	if(status="ACTIVE")
        		scope.orderMenu = true;
        }*/
        
        scope.getClientTemplateDocuments = function() {
        	resourceFactory.templateResource.get({entityId : 0, typeId : 0}, function(data) {
        		scope.clientTemplateData = data;
        	});
        };

        /*scope.getTransactionHistory = function () {
            resourceFactory.transactionHistoryResource.getTransactionHistory({clientId: routeParams.id} , function(data) {
              scope.transactionhistory = data;
            });
          };
        */
        
        scope.getTransactionHistoryFetchFunction = function(offset, limit, callback) {
        	resourceFactory.transactionHistoryResource.getTransactionHistory({clientId: routeParams.id, offset: offset, limit: limit} , callback);
  		};
  			
  		scope.getOldTransactionHistoryFetchFunction = function(offset, limit, callback) {
  	  		resourceFactory.transactionOldHistoryResource.getTransactionHistory({clientId: routeParams.id, offset: offset, limit: limit} , callback);
  	  	};
  			
  		scope.getClientDistributionFetchFunction = function(offset, limit, callback) {
    		resourceFactory.creditDistributionResource.get({clientId: routeParams.id, offset: offset, limit: limit} , callback);
    	};
    			
    	scope.getClientNetworkIpsFetchFunction = function() {
    		resourceFactory.clientIpPoolingResource.get({clientId: routeParams.id}, function(data) {
               scope.ippoolDatas = data;
            });
    	};
    	
        scope.getTransactionHistory = function () {
        	scope.activitylogC = "active";
       	   	 scope.oldActivitylogC = "";
          	scope.transactionhistory = paginatorService.paginate(scope.getTransactionHistoryFetchFunction, 14);
        };
          
        scope.getOldTransactionHistory = function () {
        	scope.activitylogC = "";
        	scope.oldActivitylogC = "active";
            scope.transactionhistoryOld = paginatorService.paginate(scope.getOldTransactionHistoryFetchFunction, 14);
        };
      
        scope.getClientDistribution = function(){
        	scope.clientDistribution = paginatorService.paginate(scope.getClientDistributionFetchFunction, 14);
        };
        
        scope.searchTransactionHistory123 = function(offset, limit, callback) {
        	resourceFactory.transactionHistoryResource.getTransactionHistory({ clientId: routeParams.id ,
        		offset: offset, limit: limit ,sqlSearch: scope.filterText } , callback); 
	    };
	  		
	  	scope.searchTransactionHistory = function(filterText) {
	  		scope.transactionhistory = paginatorService.paginate(scope.searchTransactionHistory123, 14);
	  	};
	  		
	  	scope.searchOldTransactionHistory = function(filterText) {
	  		scope.transactionhistory = paginatorService.paginate(scope.searchOldTransactionHistory, 14);
	  	};
        
	  	scope.searchOldTransactionHistory = function(offset, limit, callback) {
	  		resourceFactory.transactionHistoryResource.transactionOldHistoryResource({ clientId: routeParams.id ,
	  				offset: offset, limit: limit, sqlSearch: scope.filterText } , callback); 
		};
        
		scope.getClientTemplate = function(templateId) {
		    scope.selectedTemplate = templateId;
		    http({
		    	method:'POST',
		    	url: $rootScope.hostUrl+ API_VERSION +'/templates/'+ templateId +'?clientId='+ routeParams.id,
		    	data: {}
		    	}).then(function(data) {
		    		scope.template = data.data;
		    	});
		};

		    /* resourceFactory.DataTablesResource.getAllDataTables({apptable: 'm_client'} , function(data) {
          	scope.clientdatatables = data;
        	});*/
        
        scope.getClientStatements = function () {
            resourceFactory.statementResource.get({clientId: routeParams.id} , function(data) {	
            	scope.states = data;
                scope.url = mifosX.models.url;
                scope.mail = mifosX.models.mail;
            });
           
        };
               
        scope.routeToEmail = function (statementId) {
        	resourceFactory.statementEmailResource.update({statementId: statementId} , function(data) {	
            });
        };  
                      
        scope.routeToCancelBill = function (statementId) {
        	resourceFactory.cancelStatementResource.remove({statementId: statementId}, function(data) {	
        		//  webStorage.add("callingTab", {someString: "Statements" });
        		//  location.path("/viewclient/"+routeParams.id);
        		scope.getClientStatements(); 
        		//  route.reload(); 
            });
        };    
               
        scope.getClientAssociation = function () {
        	resourceFactory.associationResource.get({clientId: routeParams.id} , function(data) {	
        		scope.associations = data;
            });
        };        
               
        scope.downloadFile = function (statementId){
        	 
        	 /*http({
                 method:'PUT',
                 url: $rootScope.hostUrl+ API_VERSION +'/billmaster/'+statementId+'/print?tenantIdentifier=default',
                 data: {}
               })*/
              
              window.open($rootScope.hostUrl+ API_VERSION +'/billmaster/'+ statementId +'/print?tenantIdentifier='+TENANT);
        };
        
        scope.downloadInvoice = function (invoiceId){
       	 
       	 /*http({
                method:'PUT',
                url: $rootScope.hostUrl+ API_VERSION +'/billmaster/'+statementId+'/print?tenantIdentifier=default',
                data: {}
              })*/
             
             window.open($rootScope.hostUrl+ API_VERSION +'/billmaster/invoice/'+ routeParams.id +'/'+invoiceId+'?email=false&tenantIdentifier='+TENANT);
             
       };
       
       
       scope.downloadPayment = function (paymentId){
            
            window.open($rootScope.hostUrl+ API_VERSION +'/billmaster/payment/'+ routeParams.id +'/'+paymentId+'?email=false&tenantIdentifier='+TENANT);
      };
         
        scope.cancelScheduleOrder = function(id){
        	resourceFactory.OrderSchedulingResource.remove({'clientId':id}, {}, function(data){
        		// location.path('/viewclient/' + routeParams.id);
        		route.reload();	
            });
        };
       
        scope.getAllTickets=function(){      
        	resourceFactory.ticketResource.getAll({clientId: routeParams.id}, function(data) {	        
        		scope.tickets = data;
   	            scope.clientId= routeParams.id;	  
   	        });
        };
	
        scope.financialsummeryTab = function(){
        	scope.financialsummaryC = "active";
        	scope.invoicesC = "";
        	scope.paymentsC = "";
        	scope.adjustmentsC = "";
        	scope.journalsC ="";
        	scope.depositC = "";
        	scope.financialtransactions = paginatorService.paginate(scope.getFinancialTransactionsFetchFunction, 14);
        };
        scope.invoicesTab = function(){
        	scope.financialsummaryC = "";
        	scope.paymentsC = "";
        	scope.invoicesC = "active";
        	scope.adjustmentsC = "";
        	scope.journalsC ="";
        	scope.depositC = "";
        	scope.financialInvoices = paginatorService.paginate(scope.getInvoice, 14);
        };
        scope.paymentsTab = function(){
        	scope.financialsummaryC = "";
        	scope.invoicesC = "";
        	scope.paymentsC = "active";
        	scope.adjustmentsC = "";
        	scope.journalsC ="";
        	scope.depositC = "";
        	scope.financialPayments = paginatorService.paginate(scope.getPayments, 14);
        };
        scope.adjustmentsTab = function(){
        	scope.financialsummaryC = "";
        	scope.invoicesC = "";
        	scope.paymentsC = "";
        	scope.adjustmentsC = "active";
        	scope.journalsC ="";
        	scope.depositC = "";
        	scope.financialAdjustments = paginatorService.paginate(scope.getAdjustments, 14);
        };
        
        scope.journalsTab = function(){
        	scope.financialsummaryC = "";
        	scope.invoicesC = "";
        	scope.paymentsC = "";
        	scope.adjustmentsC = "";
        	scope.journalsC ="active";
        	scope.depositC = "";
        	scope.financialJournals = paginatorService.paginate(scope.getjournals, 14);
        };
        
        scope.depositsTab = function(){
        	scope.financialsummaryC = "";
        	scope.invoicesC = "";
        	scope.paymentsC = "";
        	scope.adjustmentsC = "";
        	scope.journalsC ="";
        	scope.depositC = "active";
        	scope.financialDeposits = paginatorService.paginate(scope.getDeposits, 14);
        	
        };
        
        scope.eventsaleTab = function(){
        	scope.eventsaleC = "active";
        	scope.mydeviceC = "";
        };
        scope.eventorderCTab = function(){
        	scope.eventsaleC = "";
        	scope.mydeviceC = "active";
        };
        scope.getOneTimeSale = function () {
            scope.eventsaleC = "active";
            scope.mydeviceC = "";
            if(scope.displayTab == "eventOrders"){
            	scope.eventsaleC = "";
                scope.mydeviceC = "active";
            }
            resourceFactory.oneTimeSaleResource.getOneTimeSale({clientId: routeParams.id}, function(data) {
            	scope.onetimesales = data.oneTimeSaleData;
                scope.eventOrders = data.eventOrdersData;
            });
        };
                
        scope.getEventSale = function () {
              	  
        	resourceFactory.eventOrderPriceUpdateTemplateResource.get({clientId: routeParams.id}, function(data) {
        		scope.eventOrders = data;
            });
        };       
                          
        scope.dataTableChange = function(clientdatatable) {
        	
        	resourceFactory.DataTablesResource.getTableDetails({datatablename: clientdatatable.registeredTableName,
        		entityId: routeParams.id, genericResultSet: 'true'}, function(data) {
        			scope.datatabledetails = data;
        			scope.datatabledetails.isData = data.data.length > 0 ? true : false;
        			scope.datatabledetails.isMultirow = data.columnHeaders[0].columnName == "id" ? true : false;
        			scope.showDataTableAddButton = false;
        			scope.showDataTableEditButton = false;
        			scope.showDataTableAddButton = (!scope.datatabledetails.isData || scope.datatabledetails.isMultirow);
        			scope.showDataTableEditButton = (scope.datatabledetails.isData && !scope.datatabledetails.isMultirow);
        			scope.singleRow = [];
        			for(var i in data.columnHeaders) {
        				if (scope.datatabledetails.columnHeaders[i].columnCode) {
        					for (var j in scope.datatabledetails.columnHeaders[i].columnValues){
        						for(var k in data.data) {
        							if (data.data[k].row[i] == scope.datatabledetails.columnHeaders[i].columnValues[j].id) {
        								data.data[k].row[i] = scope.datatabledetails.columnHeaders[i].columnValues[j].value;
        							}
        						}
        					}
        				}
        			}
        			if (scope.datatabledetails.isData) {
        				for (var i in data.columnHeaders) {
        					if (!scope.datatabledetails.isMultirow) {
        						var row = {};
        						row.key = data.columnHeaders[i].columnName;
        						row.value = data.data[0].row[i];
        						scope.singleRow.push(row);
        					}
        				}
        			}
        	});
        };
        scope.viewDataTable = function (registeredTableName, data) {
        	
            if (scope.datatabledetails.isMultirow) {
                location.path("/viewdatatableentry/" + registeredTableName + "/" + scope.client.id + "/" + data.row[0]);
            } else {
                location.path("/viewsingledatatableentry/" + registeredTableName + "/" + scope.client.id);
            }
        };
        
        scope.deleteAll = function (apptableName, entityId) {
        	resourceFactory.DataTablesResource.remove({datatablename:apptableName, entityId:entityId, genericResultSet:'true'}, {}, function(data){
        		route.reload();
        	});
        };
        /*scope.getClientDocuments = function () {
        	
        	if(PermissionService.showMenu('READ_DOCUMENT')){
        		resourceFactory.clientDocumentsResource.getAllClientDocuments({clientId: routeParams.id} , function(data) {
        				scope.clientdocuments = data;
        		});
        	}    
          
          resourceFactory.creditCardSaveResource.get({clientId: routeParams.id} , function(data1) {

              var key  = mifosX.models.encrptionKey;
              scope.clientcarddetails = data1;
              for ( var i in scope.clientcarddetails) {	

                  if(scope.clientcarddetails[i].type=='CreditCard'){
                	  
				        var decrypted1 = CryptoJS.AES.decrypt(scope.clientcarddetails[i].cardNumber, key);
				         var cardNum = decrypted1.toString(CryptoJS.enc.Utf8);
				          var stars = "";
				         for (var j in cardNum){
				        	 if(j>=0&&j<(cardNum.length)-4){
				        		 stars += "*";
				        	 };
				         }
				         cardNum = stars+cardNum.substr(cardNum.length-4,cardNum.length-1);
				         scope.clientcarddetails[i].cardNumber = cardNum;
				        var decrypted2 = CryptoJS.AES.decrypt(scope.clientcarddetails[i].cardExpiryDate,  key);
				        scope.clientcarddetails[i].cardExpiryDate = decrypted2.toString(CryptoJS.enc.Utf8);
				        
                  }else if(scope.clientcarddetails[i].type=='ACH'){
              	        
				        var decrypted1 = CryptoJS.AES.decrypt(scope.clientcarddetails[i].routingNumber,  key);
				        var routingNumber = decrypted1.toString(CryptoJS.enc.Utf8);
				          var stars = "";
				         for (var j in routingNumber){
				        	 if(j>=0&&j<(routingNumber.length)-4){
				        		 stars += "*";
				        	 };
				         }
				         routingNumber = stars+routingNumber.substr(routingNumber.length-4,routingNumber.length-1);
				         scope.clientcarddetails[i].routingNumber = routingNumber;

				        var decrypted2 = CryptoJS.AES.decrypt(scope.clientcarddetails[i].bankAccountNumber,  key);
				        var bankAccountNumber = decrypted2.toString(CryptoJS.enc.Utf8);
				          var stars = "";
				         for (var j in bankAccountNumber){
				        	 if(j>=0&&j<(bankAccountNumber.length)-4){
				        		 stars += "*";
				        	 };
				         }
				         bankAccountNumber = stars+bankAccountNumber.substr(bankAccountNumber.length-4,bankAccountNumber.length-1);
				         scope.clientcarddetails[i].bankAccountNumber = bankAccountNumber;
				         
				         var decrypted3 = CryptoJS.AES.decrypt(scope.clientcarddetails[i].bankName,  key);
					        scope.clientcarddetails[i].bankName = decrypted3.toString(CryptoJS.enc.Utf8);

                  }
              }
            });

        };*/

        scope.deleteDocument = function (documentId, index) {
        	resourceFactory.clientDocumentsResource.remove({clientId: routeParams.id, documentId: documentId}, '', function(data) {
        		scope.clientdocuments.splice(index,1);
        	});
        };

        scope.downloadDocument = function(documentId,index) {
        	window.open($rootScope.hostUrl+ API_VERSION +'/clients/'+ routeParams.id +'/documents/'+ documentId +'/attachment?tenantIdentifier='+TENANT);
            /*resourceFactory.clientDocumentsResource.get({clientId: routeParams.id, documentId: documentId}, '', function(data) {
                scope.clientdocuments.splice(index,1);
            });*/
        };
        scope.isNotClosed = function(loanaccount) {
        	if(loanaccount.status.code === "loanStatusType.closed.written.off" || 
        			loanaccount.status.code === "loanStatusType.rejected") {
        		return false;
        	} else{
        		return true;
        	}
        };

        scope.isClosed = function(loanaccount) {
        	if(loanaccount.status.code === "loanStatusType.closed.written.off" || 
        			loanaccount.status.code === "loanStatusType.rejected") {
        				return true;
        	} else{
        		return false;
        	}
        };
        
        scope.getAllOwnHardware = function () {
        	scope.eventsaleC = "";
       	 	scope.mydeviceC = "active";
            resourceFactory.HardwareResource.getAllOwnHardware({clientId: routeParams.id}, function(data) {
            	scope.ownhardwares = data;
            }); 
        };
        
        scope.cancelSale = function(otsId,index){
        	resourceFactory.deleteOneTimeSaleResource.remove({saleId: otsId}, function(data) {
        		scope.onetimesales.splice(index, 1);
        		getDetails();
            },function(errorData){
             });
        };
        
        scope.unallocateDevice = function(otsId, serialNo){
        	this.formData.clientId = routeParams.id;
        	this.formData.serialNo = serialNo;
        	resourceFactory.unallocateDeviceResource.update({allocationId: otsId}, this.formData, function(data) {
        		route.reload();
            },function(errorData){
            	
            });
        }; 
        /*scope.getAllFineTransactions = function () {
              resourceFactory.FineTransactionResource.getAllFineTransactions({clientId: routeParams.id} , function(data) {
                scope.financialtransactions = data;
                
                
             });

            };
        */

        scope.getFinancialTransactionsFetchFunction = function(offset, limit, callback) {
        	resourceFactory.FineTransactionResource.getAllFineTransactions({clientId: routeParams.id, offset: offset, limit: limit} , callback);
  		};
	
  		scope.getInvoice = function(offset, limit, callback, invoice) {
  	  		resourceFactory.Filetrans.get({clientId: routeParams.id, offset: offset, limit: limit, type:scope.invoice}, callback);
  	  	};
  			
  	  	scope.getPayments = function(offset, limit, callback, payment) {
	  		resourceFactory.Filetrans.get({clientId: routeParams.id ,offset: offset, limit: limit, type:scope.payment}, callback);
	  	};
	  		
	  	scope.getAdjustments = function(offset, limit, callback,adjustment) {
  	  		resourceFactory.Filetrans.get({clientId: routeParams.id, offset: offset, limit: limit, type:scope.adjustment}, callback);
  	  	};
  	  	
  	  scope.getjournals = function(offset, limit, callback,adjustment) {
	  		resourceFactory.Filetrans.get({clientId: routeParams.id, offset: offset, limit: limit, type:scope.journal}, callback);
	  	};
	  	
	  	scope.getDeposits = function(offset, limit, callback,adjustment) {
	  		resourceFactory.Filetrans.get({clientId: routeParams.id, offset: offset, limit: limit, type:scope.depositAndRefund}, callback);
	  	};
	  	
        scope.getAllFineTransactions = function () {
        	scope.financialsummaryC = "active";
       	   	scope.invoicesC = "";
       	   	scope.paymentsC = "";
       	   	scope.adjustmentsC = "";
       	   	scope.journalsC = "";
       	   	scope.depositC = "";
          	scope.financialtransactions = paginatorService.paginate(scope.getFinancialTransactionsFetchFunction, 14);
        };
          
        scope.sendIp = function (id){  
        	
        	resourceFactory.ipStatusResource.update({id: id} , {} , function(data) {
        		scope.ipstatus = data.resourceIdentifier;
            	console.log(data);
            	scope.ipId = id;
            },function(errorData){
              	
              });          
        }; 
        scope.searchFinancialTransactions123 = function(offset, limit, callback) {
        	resourceFactory.FineTransactionResource.getAllFineTransactions({ clientId: routeParams.id ,
        		offset: offset, limit: limit, sqlSearch: scope.filterText }, callback); 
	        };
	  		
	  		scope.searchFinancialTransactions = function(filterText) {
	  			scope.financialtransactions = paginatorService.paginate(scope.searchFinancialTransactions123, 14);
	  		};  
          
	  		scope.saveNote = function() {   
	  			resourceFactory.clientResource.save({clientId: routeParams.id, anotherresource: 'notes'}, this.formData , function(data){
	  				var today = new Date();
	  				temp = { id: data.resourceId, note : scope.formData.note , createdByUsername : "test", createdOn : today } ;
	  				scope.clientNotes.push(temp);
	  				scope.formData.note = "";
	  				scope.predicate = '-id';
	  			});
	  		};

	  		scope.deleteClientIdentifierDocument = function (clientId, entityId, index){
	  			resourceFactory.clientIdenfierResource.remove({clientId: clientId, id: entityId}, '', function(data) {
	  				scope.identitydocuments.splice(index, 1);
	  			});
	  		};

	  		scope.downloadClientIdentifierDocument=function (identifierId, documentId){
	  			console.log(identifierId, documentId);
	  		};
        
	  		/* scope.getparent = function(query){
        	if(query.length>0){
        		resourceFactory.clientParentResource.get({query: query}, function(data) { 	        	
     	            scope.parentClients = data;
     	        }); 
        	}else{
            	
        	}
        	};*/
	  		scope.$watch('parentClient', function() {
	  			if(scope.parentClient){
	  				$('.btn-disabled').prop('disabled', false);
	  			}
	  			else{
	  				$('.btn-disabled').prop('disabled', true);
	  			}
	  		});
	  		
	  		scope.getparent = function(query){
        		
	  			return http.get($rootScope.hostUrl+ '/obsplatform/api/v1/parentclient/', {
	  				params: {
	  					query: query
	  				}
        	    }).then(function(res){
        	     parentClients = [];
        	      for(var i in res.data){
        	    	  parentClients.push(res.data[i]);
        	    	  if(i == 7)
        	    		  break;
        	      }
        	      return  parentClients;
        	    });
	  		};
	  		scope.saveParent = function(displayLabel){
        	
	  			var firstSplit = displayLabel.split('[');
	  			var displayName = firstSplit[0];
	  			var array = firstSplit[1].split(']');
	  			var accountNo = array[0];
	  			var obj = {"accountNo":accountNo,"displayName":displayName};
	  			resourceFactory.clientParentResource.update({clientId:routeParams.id}, obj,function(data) { 	
	  				location.path('/viewclient/' +routeParams.id);
	  				route.reload();
	  			});
	  			//  webStorage.add("callingTab", {someString: "moreInfo" });
	  		};
	  		scope.routeToParentClientOrChildClient = function(id){
	  			webStorage.add("callingTab", {someString: "moreInfo" });
	  			webStorage.add("callingTab", {someString: "ChildDetailsTab" });
	  			location.path('/viewclient/'+id);
	  		};
        
	  		
		// *********************** InVenture controller ***********************
	  		scope.fetchInventureScore = function(){
	  			// dummy data for the graph - DEBUG purpose
	  			var inventureScore = getRandomInt(450,800);
	  			var natAverage = getRandomInt(450,800);
	  			var industryAverage = getRandomInt(450,800);
	  			var inventureMinScore = 300;
	  			var inventureMaxScore = 850;

	  			// dummy data for inventure loan recommendation - DEBUG purpose
	  			scope.inventureAgricultureLimit = '21,000';
	  			scope.inventureFishermenLimit = '27,500';
	  			scope.inventureHousingLimit = '385,000';
	  			scope.inventureBusinessLimit = '10,000';

	  			// this part is used to generate data to see the look of the graph
	  			function getRandomInt (min, max) {
	  				return Math.floor(Math.random() * (max - min + 1)) + min;
	  			}

	  			// CHART1 - comparison chart control
	  			var comparisonData = [
                  {
                	  key: "Score Comparison",
                	  values: [
                        { 
                        	"label" : "National Average",
                        	"value" : (natAverage)
                        }, 
                        { 
                        	"label" : "Agriculture Average", 
                        	"value" : (industryAverage)
                        }, 
                        { 
                        	"label" : "This Client", 
                        	"value" : (inventureScore)
                        }
                      ]
                  }
                ];

	  			// add the comparison chart to the viewclient.html
	  			nv.addGraph(function() {
	  				var comparisonChart = nv.models.discreteBarChart()
	  				.x(function(d) { return d.label; })
	  				.y(function(d) { return d.value; })
	  				.staggerLabels(true)
	  				.tooltips(true)
	  				.showValues(true);
                
	  				// set all display value to integer
	  				comparisonChart.yAxis.tickFormat(d3.format('d'));
	  				comparisonChart.valueFormat(d3.format('d'));
	  				comparisonChart.forceY([inventureMinScore, inventureMaxScore]);

	  				d3.select('#inventureBarChart svg')
	  				.datum(comparisonData)
	  				.transition().duration(1500)
	  				.call(comparisonChart);

	  				nv.utils.windowResize(comparisonChart.update);
	  				return comparisonChart;
	  			});

	  			// CHART2 - inventure score bullet chart control
	  			nv.addGraph(function() {  
	  				var bullet = nv.models.bulletChart()
	  				.tooltips(false);

	  				d3.select('#inventureBulletChart svg')
	  				.datum(scoreData())
	  				.transition().duration(1500)
	  				.call(bullet);

	  				nv.utils.windowResize(bullet.update);
	  				return bullet;
	  			});

   
	  			function scoreData() {
	  				return {
	  					"title": "",
	  					"ranges": [(inventureMinScore - 300), (inventureMaxScore - 300)],
	  					"measures": [(inventureScore - 300)],
	  					"markers": [(inventureScore - 300)]};	
	  				}

	  				// this will be used to display the score on the viewclient.html
	  				scope.inventureScore = inventureScore;
	  			};
 
	  			var DownloadCSVFinancialDataController = function($scope, $modalInstance){
				
	  				var date = new Date(), y = date.getFullYear(), m = date.getMonth();
	  				$scope.formData = {};
	  				$scope.formData.downloadType ='csv';
	  				$scope.start = {};
	  				$scope.start.date = new Date(y, m, 1);
	  				$scope.to = {};
	  				$scope.to.date = new Date();
				
	  				$scope.accept = function(){
	  					var fromDate = new Date($scope.start.date).getTime();
	  					var toDate = new Date($scope.to.date).getTime();
	  					var downloadType = $scope.formData.downloadType;
	  					window.open($rootScope.hostUrl+ API_VERSION +'/financialTransactions/download/'+ routeParams.id +'?downloadType='+ downloadType +'&fromDate='+fromDate+'&toDate='+toDate+'&tenantIdentifier='+TENANT);
	  					$modalInstance.close('delete');
	  				};
				
	  				$scope.reject = function(){
	  					$modalInstance.dismiss('cancel');
	  				};
	  			};
	  			
	  			
	  			 scope.deleteaddress = function (id){
			    	 scope.id=id;
			    	 scope.errorDetails = [];
			    	 scope.errorStatus = [];
			    	 $modal.open({
			    		 templateUrl: 'deletePopup.html',
			  	         controller: approve3,
			  	         resolve:{}
			  	     });
			     };
			          
			     function  approve3($scope, $modalInstance) {
			    	 $scope.approve = function () {
			    		 resourceFactory.addressResource.remove({clientId:scope.id} , {} , function(data) {
			    			 $modalInstance.dismiss('delete');
			    			  route.reload();
			             },function(errorData){
			            	 $scope.orderError = errorData.data.errors[0].userMessageGlobalisationCode;
			             });
			      	 };
			         $scope.cancel = function () {
			        	 $modalInstance.dismiss('cancel');
			         };
			     }
	  			
	  			
	  			/**
		       	 * Delete Popup Confirm Screens
		       	 * */
		        scope.deletePopUp = function (firstId, secondId, index, screenName){
		         	scope.idValuePopup = firstId;
		         	scope.secondIdValuePopup = secondId;
		         	scope.indexPopup = index;
		         	scope.screenNamePopup = screenName;
		         	
		          	 $modal.open({
		  	                templateUrl: 'deletePopup.html',
		  	                controller: approve,
		  	                resolve:{}			// scope.routeToCancelBill
		  	         });
		        };
		        
		        /** Delete Popup Controller */
		      	function  approve($scope, $modalInstance) {
		      		$scope.deletePopupName = scope.screenNamePopup;
		      		$scope.approve = function () {
		      			
		      			switch(scope.screenNamePopup){
		      			
		      				case 'Delete Identities' :
		      						
		      						scope.deleteClientIdentifierDocument(scope.idValuePopup, scope.secondIdValuePopup, scope.indexPopup);
		      						break;
		      						
		      				case 'Delete Document' :
		      						
		      						scope.deleteDocument(scope.secondIdValuePopup, scope.indexPopup);
		      						break;
		      				
		      				case 'Delete Child' :
  						
		      						scope.deleteChildsFromparent(scope.idValuePopup);
		      						break;
		      				
		      				case 'Cancel Sale' :
		      						
		      						scope.cancelSale(scope.idValuePopup, scope.indexPopup);
		      						break;
		      				
    						case 'Unallocate Device' :
    								
    								scope.unallocateDevice(scope.idValuePopup, scope.secondIdValuePopup);
    								break;
							
  							case 'Unallocate Ip' :
  									
  									if(this.formData == undefined || this.formData == null){
  										this.formData = {"ipAddress":scope.idValuePopup, "status":'F'};
  									}
  									resourceFactory.ipPoolingIpStatusResource.update({}, this.formData, function(data) {              	
  										route.reload(); 
  									},function(errData){
  									});
									break;
							
  							case 'Cancel Statement' :
  									scope.routeToCancelBill(scope.idValuePopup);
									break;
									
  							case 'default' :
  								
  									break;
						}
		              	
		      			/*if(scope.screenNamePopup == 'Delete Identities'){
		      				
		      				scope.deleteClientIdentifierDocument(scope.idValuePopup, scope.secondIdValuePopup, scope.indexPopup);
		      			}else if(scope.screenNamePopup == 'Delete Document'){
		      				
		      				scope.deleteDocument(scope.secondIdValuePopup, scope.indexPopup);
		      			}else if(scope.screenNamePopup == 'Delete Child'){
		      				
		      				scope.deleteChildsFromparent(scope.idValuePopup);
		      			}else if(scope.screenNamePopup == 'Cancel Sale'){
		      				
		      				scope.cancelSale(scope.idValuePopup, scope.indexPopup);
		      			}else if(scope.screenNamePopup == 'Unallocate Device'){
		      				
		      				scope.unallocateDevice(scope.idValuePopup, scope.secondIdValuePopup);
		      			}else if(scope.screenNamePopup == 'Unallocate Ip'){
		      				
		      				if(this.formData == undefined || this.formData == null){
		  						this.formData = {"ipAddress":scope.idValuePopup, "status":'F'};
		  					}
		  					resourceFactory.ipPoolingIpStatusResource.update({}, this.formData, function(data) {              	
		  						route.reload(); 
		  					},function(errData){
		  					});
		      			}else if(scope.screenNamePopup == 'Cancel Statement'){
		      				
		      				scope.routeToCancelBill(scope.idValuePopup);
		      			}*/
		      			
		              	$modalInstance.dismiss('delete');
		      		};
		            $scope.cancel = function () {
		                  $modalInstance.dismiss('cancel');
		            };
		        }
		      	
		     	 scope.refundAmount = function(id,amount){
			         	scope.errorDetails = [];
			         	scope.errorStatus = [];
			         	$modal.open({
			                 templateUrl: 'refundamount.html',
			                 controller: RefundAmountController,
			                 resolve:{
			                 	 	getPaymentId:function(){
			                 	 		return id;
			                 	 	},
			                 	 	getAmount:function(){
			                 	 		return amount;
			                 	 	}
			                 }
			             });
			         };
			         
			         var RefundAmountController = function($scope, $modalInstance, getPaymentId,getAmount){
			        	$scope.formData = {};
			        	resourceFactory.refundAmountResource.get({depositAmount:getAmount,depositId:scope.clientId} , function(data){
			        		$scope.formData.refundAmount = data.availAmount;
			        		$scope.refundModeData=data.data;
			            },function(errorData){
	  	                	$scope.stmError = errorData.data.errors[0].userMessageGlobalisationCode;
	  	                	
	  	                });
			        	
			        	$scope.formData.locale = "en";
			 			$scope.accept = function(){
			 				var depositId = getPaymentId;
			 				resourceFactory.refundAmountResource.save({'depositId':depositId}, $scope.formData, function(data){
			 					$modalInstance.close('delete');
			 				    getDetails();
			 				    scope.getAllFineTransactions();
			 				},function(errorData){
		  	                	$scope.stmError = errorData.data.errors[0].userMessageGlobalisationCode;
		  	                	
		  	                });         
			 			};
			 			
			 			$scope.reject = function(){
			 				$modalInstance.dismiss('cancel');
			 			};
			 		};
		      	
	  			//export financial csv 
	  			scope.exportFinancialCSV = function(){
            	
	  				$modal.open({
	  					templateUrl: 'downloadCSVFinancialData.html',
	  					controller: DownloadCSVFinancialDataController,
	  					resolve:{}
	  				});
	  			};
	  			
	  			scope.ipChaneFunction = function(){
	  				$modal.open({
	                    templateUrl: 'Staticip.html',
	                    controller: StaticIpPopController,
	                    resolve:{}
	                });
	  			};
	  			
	  			var StaticIpPopController = function($scope, $modalInstance){
	  				scope.errorDetails = [];
	  				scope.errorStatus = [];
	  				$scope.formData = {};
	  				$scope.ipdata = {};
	  				$scope.formData.poolName = "Adhoc";
	  				$scope.getData = function(query){
	 	  	       	   return http.get($rootScope.hostUrl+API_VERSION+'/ippooling/search/', {
	 	  	       	      params: {
	 	  	       	    	  query: query
	 	  	       	      }
	 	  	       	    }).then(function(res){
	 	  	       	    	ipPoolData = [];
	 	  	       	    	for(var i in res.data.ipAddressData){
	 	  	       	    		ipPoolData.push(res.data.ipAddressData[i]);
	 	  	       	    		if(i==5){
	 	  	       	    			break;
	 	  	       	    		}
	 	  	       	    	}
	 	  	       	      return  ipPoolData;
	 	  	       	    });
	 	  	       
	 	  	       };
	  				
	  	        	$scope.acceptStatement = function(){
	  	        		
	  	        		$scope.flagStatementPop = true;
	  	        		$scope.formData.status = 'A';
	  	        		$scope.formData.clientId = scope.clientId;
	  	        		$scope.formData.staticIpType = 'create';
	  	        		if($scope.ipdata.ipAddressPool){
	  	        			$scope.formData.ipAddress = $scope.ipdata.ipAddressPool;
	  	        		}else if($scope.ipdata.ipAddressStatic){
	  	        			delete $scope.formData.poolName;
	  	        			$scope.formData.ipAddress = $scope.ipdata.ipAddressStatic;
	  	        		}else{
	  	        			
	  	        		}
	  	        		
	  	        		resourceFactory.ipPoolingStaticIpResource.update(this.formData, function(data) {
	  	                    location.path('/viewclient/' +scope.clientId);
	  	                    $modalInstance.close('delete');
	  	                },function(errorData){
	  	                	$scope.flagStatementPop = false;
	  	                	$scope.stmError = errorData.data.errors[0].userMessageGlobalisationCode;
	  	                	console.log(errorData);
	  	                	console.log($scope.stmError);
	  	                });
	  	        	};
	  	        	
	  	        	$scope.removeIp = function(){
	  	        		
	  	        		$scope.flagStatementPop = true;
	  	        		$scope.formData.status = 'F';
	  	        		$scope.formData.clientId = scope.clientId;
	  	        		$scope.formData.staticIpType = 'remove';
	  	        		
	  	        		resourceFactory.ipPoolingStaticIpResource.update(this.formData, function(data) {
	  	                    location.path('/viewclient/' +scope.clientId);
	  	                    $modalInstance.close('delete');
	  	                },function(errorData){
	  	                	$scope.flagStatementPop = false;
	  	                	$scope.stmError = errorData.data.errors[0].userMessageGlobalisationCode;
	  	                	console.log(errorData);
	  	                	console.log($scope.stmError);
	  	                });
	  	        	};
	  	        
	  	        	$scope.rejectStatement = function(){
	  	        		console.log("Reject Statement");
	  	        		$modalInstance.dismiss('cancel');
	  	        	};
	  	        };
	  	        
	  	        
	  	       function depositPopController($scope, $modalInstance){
		        	$scope.formData = {};
		        	resourceFactory.depositAmountResource.query({client:scope.clientId} , function(data){
		        		$scope.depositAmount =data[0].defaultFeeAmount;
		        		$scope.formData.feeId = data[0].id;
		            },function(errorData){
 	                	$scope.stmError = errorData.data.errors[0].userMessageGlobalisationCode;
 	                	
 	                });
		        	
		        	$scope.formData.clientId =scope.clientId;
		 			$scope.accept = function(){
		 				resourceFactory.depositAmountResource.save($scope.formData, function(data){
		 					$modalInstance.close('delete');
		 				},function(errorData){
	  	                	$scope.stmError = errorData.data.errors[0].userMessageGlobalisationCode;
	  	                	
	  	                });         
		 			};
		 			$scope.reject = function(){
		 				$modalInstance.dismiss('cancel');
		 			};
		 		};
	  	      
    	}
  });
  
  mifosX.ng.application.controller('ViewClientController', [
      '$scope',
      'webStorage',
      '$routeParams',
      '$route',
      '$location', 
      'ResourceFactory',
      'PaginatorService',
      '$http',
      '$modal',
      'dateFilter',
      'API_VERSION',
      '$rootScope',
      'PermissionService', 
      'localStorageService', 
      'TENANT',
      mifosX.controllers.ViewClientController
      ]).run(function($log) {
    	  $log.info("ViewClientController initialized");
      });
}(mifosX.controllers || {}));
