(function(module) {
    mifosX.controllers = _.extend(module, {
    	MessangerController: function(scope,webStorage,route,resourceFactory,dateFilter,location,PermissionService,$rootScope) {
    		scope.userChatDatas=[];
    		 scope.first = {};
    		 scope.PermissionService = PermissionService;
   		  //scope.first.date = new Date();
   		  scope.appUserDatas=[];
   		scope.userSentmessageDatas=[];
   		 
   		scope.flag=false;
   		// scope.formData=[];
   		  /*scope.first.time = scope.first.date.getHours()+":"+scope.first.date.getMinutes();
   		scope.minDate = new Date();*/
		  $('#timepicker1').timepicker({
			  showMeridian:false
		  });
    		
	/*	scope.updateRead=function(){
			var id='1';
			resourceFactory.updateUserChatResource.update({messageId:'1'},id , function(data){
                	
              });
		};
	        */
            resourceFactory.userChatResource.get({} , function(data) {
            	scope.first.date = new Date(data.date);
            	scope.first.time = scope.first.date.getHours()+":"+scope.first.date.getMinutes();
           		scope.minDate = new Date(data.date);
            	
            	scope.userChatDatas = data.userChatDatas;
            	scope.appUserDatas=data.appUserDatas;
            });
            
               scope.getSentMessages=function(data){
	        	
	        	resourceFactory.userSentMessageResource.get(function(data) {
	           	 scope.userSentmessageDatas=data.userChatDatas; 
	           });
	        	
	        };
	        scope.updateFlag =function(id){
	        	
	        	resourceFactory.updateUserChatResource.update({messageId:id},function(data){
	        		location.path("/messanger");
	        		route.reload();
	          });
	        };
	        scope.deleteFlag =function(did){
	        	resourceFactory.updateUserChatResource.delete({messageId:did},{},function(data){
	        		location.path("/messanger");
	        		route.reload();
	          });
	        };
            scope.saveMessage = function() {   
            	scope.flag=false; 
            	this.formData.locale=$rootScope.locale.code;
            	this.formData.dateFormat="dd MMMM yyyy";
            	this.formData.message=this.formData.note;
            	var reqDate = dateFilter(scope.first.date,'dd MMMM yyyy');
            	this.formData.messageDate=reqDate;
            	delete this.formData.note;
                resourceFactory.userChatResource.save({}, this.formData , function(data){
                	scope.flag=true;
                	location.path("/messanger");
               /* var today = new Date();
                temp = { id: data.resourceId , note : scope.formData.note , createdByUsername : "test" , createdOn : today } ;
                scope.clientNotes.push(temp);
                scope.formData.note = "";
                scope.predicate = '-id';*/
                	
              });
            }
            
        }
    });
    mifosX.ng.application.controller('MessangerController', ['$scope', 'webStorage','$route','ResourceFactory','dateFilter','$location','PermissionService','$rootScope', mifosX.controllers.MessangerController]).run(function($log) {
        $log.info("MessangerController initialized");
    });
}(mifosX.controllers || {}));

