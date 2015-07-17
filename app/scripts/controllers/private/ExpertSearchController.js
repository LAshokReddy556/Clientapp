(function (module) {
    mifosX.controllers = _.extend(module, {
        ExpertSearchController: function (scope, resourceFactory, location,localStorageService) {
        	
        	scope.dashModel = 'home';
        	scope.recent = [];
            scope.recent = localStorageService.get('Location');
            scope.recentEight = [];
            scope.frequent = [];
            scope.recentArray = [];
            scope.uniqueArray = [];
            scope.searchParams = [];
            scope.recents = [];
        	
        	 //to retrieve last 8 recent activities
             for (var rev = scope.recent.length - 1; rev > 0; rev--) {
                 scope.recentArray.push(scope.recent[rev]);
             }
             
             scope.unique = function (array) {
                 array.forEach(function (value) {
                     if (scope.uniqueArray.indexOf(value) === -1) {
                     	if (value) {
                             if (value != '/') {
                                 if (value != '/home') {
                                 	scope.uniqueArray.push(value);
                                 }
                             }
                     	}
                     }
                 });
             };
             scope.unique(scope.recentArray);
             //recent activities retrieved
             
           //retrieve last 8 recent activities
             for (var l in scope.uniqueArray) {
            	 if(l<8){
            		 scope.recents.push(scope.uniqueArray[l]);
            	 }
             }
             // 8 recent activities retrieved
             
           //count duplicates
             var i = scope.recent.length;
             var obj = {};
             while (i) {
                 obj[scope.recent[--i]] = (obj[scope.recent[i]] || 0) + 1;
             }
             //count ends here
             
             //to sort based on counts
             var sortable = [];
             for (var i in obj) {
                 sortable.push([i, obj[i]]);
             }
             sortable.sort(function (a, b) {
                 return a[1] - b[1]
             });
             //sort end here
           //to retrieve the locations from sorted array
             var sortedArray = [];
             for (var key in sortable) {
                 sortedArray.push(sortable[key][0]);
             }
             //retrieving ends here

             //retrieve last 8 frequent actions
             for (var freq = sortedArray.length - 1; freq > sortedArray.length - 9; freq--) {
                 if (sortedArray[freq]) {
                     if (sortedArray[freq] != '/') {
                         if (sortedArray[freq] != '/home') {
                        	 if(sortedArray[freq].indexOf('/viewclient') === -1){
                        		 scope.frequent.push(sortedArray[freq]);
                        	 }
                         }
                     }
                 }
             }
             // retrieved 8 frequent actions end
             var recentClients = [];
             	recentClients = localStorageService.get('recentClients')||[];
           //count duplicates for clients
             var len = recentClients.length;
             var objClients = {};
             while (len) {
            	 objClients[recentClients[--len].accountNo] = (objClients[recentClients[len].accountNo] || 0) + 1;
                 if((objClients[recentClients[len].accountNo]) > 1){
                	 recentClients.splice(len,1);
                 }
             }
             
             var count = 0;
             resourceFactory.runReportsResource.get({reportSource: 'ClientCounts',genericResultSet:false} , function(data) {
           	  for(var i in data){
           		  if(data[i].status == 'New')
           			count = data[i].counts;
           		  if(data[i].status == 'Active')
           			count = data[i].counts;
           		  if(data[i].status == 'Inactive')
           			count = data[i].counts;
           		  if(data[i].status == 'Pending')
           			count = data[i].counts;
           	  }
           	  scope.recentClients = [];
           	  if(count){
           		  for (var val = recentClients.length - 1; val > recentClients.length - 9; val--) {
           			  if(recentClients[val]){
           				  scope.recentClients.push({
           					  accountNo : recentClients[val].accountNo,
           					  href : "/viewclient/"+parseInt(recentClients[val].accountNo),
           					  displayName : recentClients[val].displayName
           				  });	
           			  }
           		  }
           	  }else{
           		  localStorageService.remove('recentClients')
           	  }
             });
             
             /* scope.recentClients = [];
              for (var val = recentClients.length - 1; val > recentClients.length - 9; val--) {
                   if(recentClients[val]){
		            	  scope.recentClients.push({
								            		  accountNo : recentClients[val].accountNo,
								            		  href : "/viewclient/"+parseInt(recentClients[val].accountNo),
								            		  displayName : recentClients[val].displayName
								            	  });	
                   }
              }*/
             
            scope.switch1 = function() {
	        	location.path('/dashboard');
			};
			
			  scope.switchDef = function() {
		        	location.path('/definations');
				};
            
            scope.searchParams = ['Leads','Create Prospect','Inventory','Create Itemdetail','Create GRN','Create MRN','Move MRN','Create Item Sale','Create Item','Create Supplier',
                                  'Create Client','Clients','New Activation','Tickets','System','Users','Create User','Configurations','Create SMTP',
                                  'View Roles','Add Role','Mapping Configurations','Create Service Mapping','Create Plan Mapping','Create Hardware Plan Mapping','Create Provisioning','Create EventAction Mapping',
                                  'Create Currency Configuration','Create Event Validation','Maker Checker Configurations','Data Table','Create DataTable','Audit Trails','Manage Reports','Create Report',
                                  'About OBS','Manage Codes','Add Code','Organization','Offices','Create Office','Contracts','Create Contract','Employees','Create Employee','Charge Code','Create Charge Code',
                                  'Currency Details','Create Currency Details','Discounts','Create Discount','Create Promotion Code','Address Master','Regions','Create Regions','Voucher Pins','Create Voucherpin',
                                  'Media Details','Add Media Details','Add Advanced Media Details','Messages','Create Message','Event Master','Create Event','IP Pool Management','Create IP Pool','Services',
                                  'Create Service','Closed User Group','Plans','Create Plan','Accounting','Frequent Postings','Chart Of Accounts','Add Journal Entry','Account Closure','Close Accounting','Search Transaction',
                                  'Accounting Rules','Create Accounting Rule','Data Uploads','Upload File','Scheduler Jobs','Create Redemption','Smart Search','Payment Gateway','Adapter Provision','Navigation','Shortcuts',
                                  'User Profile','View Permissions','Messanger','User Notification','User Settings','Add Ons','Templates','Fee Master','Create Fee Master','Property','Create Property'];
            scope.search = function () {
		      switch (this.formData.search) {
		          case 'Leads':
		              location.path('/leads');
		              break;
		          case 'Create Prospect':
		              location.path('/createprospects');
		              break;
		          case 'create group':
		              location.path('/creategroup');
		              break;
		          case 'Inventory':
		              location.path('/inventory');
		              break;
		          case 'Create Itemdetail':
		              location.path('/createitemdetails');
		              break;
		          case 'Create GRN':
		              location.path('/addgrndetails');
		              break;
		          case 'Create MRN':
		              location.path('/createmrn');
		              break;
		          case 'Move MRN':
		              location.path('/movemrn');
		              break;
		          case 'Create Item Sale':
		              location.path('/itemsale/0');
		              break;
		          case 'Create Item':
		              location.path('/createitem');
		              break;
		          case 'Create Supplier':
		              location.path('/createsupplier');
		              break;
		          case 'Create Client':
		              location.path('/createclient');
		              break;
		          case 'Clients':
		              location.path('/clients');
		              break;
		          case 'New Activation':
		              location.path('/createsimpleActivation');
		              break;
		          case 'Tickets':
		              location.path('/assignedtickets');
		              break;
		          case 'System':
		              location.path('/system');
		              break;
		          case 'Users':
		              location.path('/users');
		              break;
		          case 'Create User':
		              location.path('/createuser');
		              break;
		          case 'Configurations':
		              location.path('/global');
		              break;
		          case 'Create SMTP':
		              location.path('/createsmtp');
		              break;
		          case 'View Roles':
		        	  location.path('/admin/roles');
		        	  break;
		          case 'Add Role':
		        	  location.path('/admin/addrole');
		        	  break;
		          case 'Mapping Configurations':
		        	  location.path('/mappingconfig');
		        	  break;
		          case 'Create Service Mapping':
		        	  location.path('/createServiceMapping');
		        	  break;
		          case 'Create Plan Mapping':
		        	  location.path('/createPlanMapping');
		        	  break;
		          case 'Create Hardware Plan Mapping':
		        	  location.path('/createhardwareplanmapping');
		        	  break;
		          case 'Create Provisioning':
		        	  location.path('/createProvisioningmapping');
		        	  break;
		          case 'Create EventAction Mapping':
		        	  location.path('/createeventactionmapping');
		        	  break;
		          case 'Create Currency Configuration':
		        	  location.path('/createCurrencyMapping');
		        	  break;
		          case 'Create Event Validation':
		        	  location.path('/createevenvalidation');
		        	  break;
		          case 'Maker Checker Configurations':
		        	  location.path('/admin/viewmctasks');
		        	  break;
		          case 'Manage Data Table':
		        	  location.path('/datatables');
		        	  break;
		          case 'Create DataTable':
		        	  location.path('/createdatatable');
		        	  break;
		          case 'Audit Trails':
		        	  location.path('/audit');
		        	  break;
		          case 'Manage Reports':
		        	  location.path('/reports');
		        	  break;
		          case 'Create Report':
		        	  location.path('/createreport');
		        	  break;
		          case 'About OBS':
		        	  location.path('/aboutobs');
		        	  break;
		          case 'Manage Codes':
		        	  location.path('/codes');
		        	  break;
		          case 'Add Code':
		        	  location.path('/addcode');
		        	  break;
		          case 'Organization':
		        	  location.path('/organization');
		        	  break;
		          case 'Offices':
		        	  location.path('/offices');
		        	  break;
		          case 'Create Office':
		        	  location.path('/createoffice');
		        	  break;
		          case 'Contracts':
		        	  location.path('/contract');
		        	  break;
		          case 'Create Contract':
		        	  location.path('/createContract');
		        	  break;
		          case 'Employees':
		        	  location.path('/employees');
		        	  break;
		          case 'Create Employee':
		        	  location.path('/createemployee');
		        	  break;
		          case 'Charge Code':
		        	  location.path('/chargecode');
		        	  break;
		          case 'Create Charge Code':
		        	  location.path('/createchargecode');
		        	  break;
		          case 'Currency Details':
		        	  location.path('/currencydetails');
		        	  break;
		          case 'Create Currency Details':
		        	  location.path('/createcurrencydetails');
		        	  break;
		          case 'Discounts':
		              location.path('/discounts');
		              break;
		          case 'Create Discount':
		              location.path('/creatediscounts');
		              break;
		          case 'Create Promotion Code':
		              location.path('/createpromotion');
		              break;
		          case 'Address Master':
		              location.path('/addressmanage');
		              break;
		          case 'Regions':
		              location.path('/regions');
		              break;
		          case 'Create Regions':
		              location.path('/createregions');
		              break;
		          case 'Voucher Pins':
		              location.path('/voucherpins');
		              break;
		          case 'Create Voucherpin':
		              location.path('/createvoucherpin');
		              break;
		          case 'Media Details':
		              location.path('/mediadetails');
		              break;
		          case 'Add Media Details':
		              location.path('/createMedia');
		              break;
		          case 'Add Advanced Media Details':
		              location.path('/createAdvanceMedia');
		              break;
		          case 'Messages':
		              location.path('/message');
		              break;
		          case 'Create Message':
		              location.path('/createMessage');
		              break;
		          case 'Event Master':
		              location.path('/event');
		              break;
		          case 'Create Event':
		              location.path('/createEvent');
		              break;
		          case 'IP Pool Management':
		              location.path('/ipPooling');
		              break;
		          case 'Create IP Pool':
		              location.path('/createippooling');
		              break;
		          case 'Services':
		              location.path('/services');
		              break;
		          case 'Create Service':
		              location.path('/createservice');
		              break;
		          case 'Closed User Group':
		              location.path('/groupsDetails');
		              break;
		          case 'Plans':
		              location.path('/plans');
		              break;
		          case 'Create Plan':
		              location.path('/createPlan');
		              break;
		          case 'Accounting':
		              location.path('/accounting');
		              break;
		          case 'Frequent Postings':
		              location.path('/freqposting');
		              break;
		          case 'Chart Of Accounts':
		              location.path('/accounting_coa');
		              break;
		          case 'Add Journal Entry':
		        	  location.path('/journalentry');
		        	  break;
		          case 'Account Closure':
		              location.path('/accounts_closure');
		              break;
		          case 'Close Accounting':
		        	  location.path('/createclosure');
		        	  break;
		          case 'Search Transaction':
		              location.path('/searchtransaction');
		              break;
		          case 'Accounting Rules':
		              location.path('/accounting_rules');
		              break;
		          case 'Create Accounting Rule':
		              location.path('/add_accrule');
		              break;
		          case 'Data Uploads':
		              location.path('/importing');
		              break;
		          case 'Upload File':
		        	  location.path('/uploadFile');
		        	  break;
		          case 'Scheduler Jobs':
		        	  location.path('/jobs');
		        	  break;
		          case 'Create Redemption':
		        	  location.path('/redemption');
		        	  break;
		          case 'Smart Search':
		        	  location.path('/smartSearch');
		        	  break;
		          case 'Payment Gateway':
		        	  location.path('/paymentGateway');
		        	  break;
		          case 'Adapter Provision':
		              location.path('/provision');
		              break;
		          case 'Navigation':
		              location.path('/nav/offices');
		              break;
		          case 'Shortcuts':
		              location.path('/help');
		              break;
		          case 'User Profile':
		              location.path('/profile');
		              break;
		          case 'View Permissions':
		              location.path('/admin/roles');
		              break;
		          case 'Messanger':
		              location.path('/messanger');
		              break;
		          case 'User Notification':
		              location.path('/addnewmesage');
		              break;
		          case 'User Settings':
		              location.path('/usersetting');
		              break;
		          case 'Add Ons':
		              location.path('/addons');
		              break;
		          case 'Templates':
		              location.path('/templates');
		              break;
		          case 'Fee Master':
		        	  location.path('/feemaster');
		        	  break;
		          case 'Create Fee Master':
		        	  location.path('/createfeemaster');
		        	  break;
		          case 'Property':
		        	  location.path('/property');
		        	  break;
		          case 'Create Property':
		        	  location.path('/createproperty');
		        	  break;  
		          default:
		              location.path('/home');
		      }
            }

        }

    });
    mifosX.ng.application.controller('ExpertSearchController', ['$scope', 'ResourceFactory', '$location','localStorageService', mifosX.controllers.ExpertSearchController]).run(function ($log) {
        $log.info("ExpertSearchController initialized");
    });
}(mifosX.controllers || {}));
