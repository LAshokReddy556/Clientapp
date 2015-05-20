
(function(mifosX) {
  var defineRoutes = function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/start.html'
      })
      .when('/login', {
        templateUrl: 'views/login.html'
      })
      .when('/home', {
        templateUrl: 'views/home.html'
      })
      .when('/dashboard', {
    	  templateUrl: 'views/private/dashboard.html'
      })

      .when('/definations', {
    	  templateUrl: 'views/private/definations.html'
      })
      
      .when('/templates', {
        templateUrl: 'views/templates/templates.html'
      })
      
      .when('/vendormanagement', {
        templateUrl: 'views/vendormanagement/vendormanagement.html'
      })
      
      .when('/createvendormanagement', {
        templateUrl: 'views/vendormanagement/createvendormanagement.html'
      })
      
      .when('/editvendormanagement/:id', {
        templateUrl: 'views/vendormanagement/editvendormanagement.html'
      })
      
      .when('/viewvendormanagement/:id', {
        templateUrl: 'views/vendormanagement/viewvendormanagement.html'
      })
      
      .when('/vendoragreement', {
        templateUrl: 'views/vendormanagement/vendoragreement.html'
      })
      
      .when('/createvendoragreement/:vendorId', {
        templateUrl: 'views/vendormanagement/createvendoragreement.html'
      })
      
      .when('/editvendoragreement/:id/:vendorId', {
        templateUrl: 'views/vendormanagement/editvendoragreement.html'
      })
      
      .when('/viewvendoragreement/:vendorId/:agreementId', {
        templateUrl: 'views/vendormanagement/viewvendoragreement.html'
      })
      
      .when('/createtemplate', {
        templateUrl: 'views/templates/createtemplate.html'
      })
      .when('/viewtemplate/:id', {
        templateUrl: 'views/templates/viewtemplate.html'
      })
      .when('/edittemplate/:id', {
        templateUrl: 'views/templates/edittemplate.html'
      })
      .when('/admin/viewrole/:id', {
        templateUrl: 'views/administration/viewrole.html'
      })
      .when('/admin/roles', {
        templateUrl: 'views/administration/roles.html'
      })
      .when('/admin/role/:id/edit', {
        templateUrl: 'views/administration/editpermissions.html'
      })
      .when('/admin/addrole', {
        templateUrl: 'views/administration/addrole.html'
      })
      .when('/admin/viewmctasks', {
        templateUrl: 'views/administration/makerchecker.html'
      })
      .when('/admin/users', {
        templateUrl: 'views/administration/users.html'
      })
      .when('/clients', {
        templateUrl: 'views/clients/clients.html'  
      })
      .when('/createclient', {
        templateUrl: 'views/clients/createclient.html'  
      })
      .when('/clientadditionalinfo/:id', {
        templateUrl: 'views/clients/createclientadditionalinfo.html'  
      })
      .when('/editclient/:id', {
        templateUrl : 'views/clients/editclient.html'
      })
      .when('/editadditionaldata/:id', {
        templateUrl : 'views/clients/editadditionalinfo.html'
      })
      .when('/viewclient/:id', {
        templateUrl: 'views/clients/viewclient.html'
      })
      .when('/client/:id/:action', {
        templateUrl: 'views/clients/clientactions.html'  
      })
      .when('/transferclient/:id', {
        templateUrl: 'views/clients/transferclient.html'
      })
      .when('/addclientdocument/:clientId', {
          templateUrl: 'views/clients/addclientdocument.html'
      })
       .when('/profile',{
        templateUrl: 'views/profile.html'
      })
       .when('/messanger',{
        templateUrl: 'views/messanger.html'
      })
       .when('/addnewmesage',{
        templateUrl: 'views/addmessage.html'
      })
      .when('/addclientidentifier/:clientId', {
        templateUrl: 'views/clients/addclientidentifier.html'
      })
      .when('/addclientidentifierdocument/:clientId/:resourceId', {
        templateUrl: 'views/clients/addclientidentifierdocument.html'
      })
     
     
      .when('/organization', {
        templateUrl: 'views/administration/organization.html'  
      })
      .when('/system', {
        templateUrl: 'views/administration/system.html'  
      })
      .when('/mappingconfig', {
          templateUrl: 'views/system/mappingconfiguration.html'  
        })
      .when('/charges', {
        templateUrl: 'views/products/charges.html'
      })
      .when('/viewcharge/:id', {
        templateUrl: 'views/products/viewcharge.html'
      })
      .when('/offices', {
        templateUrl: 'views/organization/offices.html'
      })
      .when('/createoffice', {
        templateUrl: 'views/organization/createoffice.html'
      })
      .when('/viewoffice/:id', {
        templateUrl: 'views/organization/viewoffice.html'
      })
      .when('/editoffice/:id', {
        templateUrl: 'views/organization/editoffice.html'
      })
      .when('/tasks', {
        templateUrl: 'views/tasks.html'
      })
      .when('/currconfig', {
        templateUrl: 'views/organization/currencyconfig.html'
      })
      .when('/search/:query', {
        templateUrl: 'views/search/glresults.html'
      })  
      .when('/usersetting', {
        templateUrl: 'views/administration/usersettings.html'
      })
      .when('/users/', {
        templateUrl: 'views/administration/userslist.html'
      })
      .when('/createuser/', {
        templateUrl: 'views/administration/createuser.html'
      })
      .when('/viewuser/:id', {
        templateUrl: 'views/administration/viewuser.html'
      })
      .when('/edituser/:id', {
        templateUrl: 'views/administration/edituser.html'
      })
      .when('/employees', {
        templateUrl: 'views/organization/employees.html'
      })
      .when('/viewemployee/:id', {
        templateUrl: 'views/organization/viewemployee.html'
      })
      .when('/editemployee/:id', {
        templateUrl: 'views/organization/editemployee.html'
      })
      .when('/createemployee/', {
        templateUrl: 'views/organization/createemployee.html'
      })
      .when('/managefunds/', {
        templateUrl: 'views/organization/managefunds.html'
      })
      .when('/nav/offices', {
        templateUrl: 'views/navigation/offices.html'
      })
      .when('/accounting', {
        templateUrl: 'views/accounting/accounting.html'
      })
      .when('/accounting_coa', {
        templateUrl: 'views/accounting/accounting_coa.html'
      })
      .when('/createglaccount', {
        templateUrl: 'views/accounting/createglaccounting.html'
      })
      .when('/viewglaccount/:id', {
        templateUrl: 'views/accounting/viewglaccounting.html'
      })
      .when('/editglaccount/:id', {
        templateUrl: 'views/accounting/editglaccounting.html'
      })
      .when('/freqposting', {
        templateUrl: 'views/accounting/freqposting.html'
      })
      .when('/viewtransactions/:transactionId', {
        templateUrl: 'views/accounting/view_transactions.html'
      })
      .when('/journalentry', {
        templateUrl: 'views/accounting/journalentry_posting.html'
      })
      .when('/searchtransaction', {
        templateUrl: 'views/accounting/search_transaction.html'
      })
      .when('/accounts_closure', {
        templateUrl: 'views/accounting/accounts_closure.html'
      })
      .when('/view_close_accounting/:id', {
        templateUrl: 'views/accounting/view_close_accounting.html'
      })
      .when('/accounting_rules', {
        templateUrl: 'views/accounting/accounting_rules.html'
      })
      .when('/viewaccrule/:id', {
        templateUrl: 'views/accounting/view_acc_rule.html'
      })
      .when('/add_accrule', {
        templateUrl: 'views/accounting/add_acc_rule.html'
      })
      .when('/editaccrule/:id', {
        templateUrl: 'views/accounting/edit_acc_rule.html'
      })
      .when('/viewcode/:id', {
          templateUrl: 'views/system/viewcode.html'
      })
      .when('/datatables', {
          templateUrl: 'views/system/datatables.html'
      })
      .when('/viewdatatable/:tableName', {
        templateUrl: 'views/system/viewdatatable.html'
      })
      .when('/createdatatable', {
          templateUrl: 'views/system/createdatatable.html'
      })
      .when('/editdatatable/:tableName', {
          templateUrl: 'views/system/editdatatable.html'
      })
      .when('/makedatatableentry/:tableName/:entityId', {
          templateUrl: 'views/system/makedatatableentry.html'
      })
      .when('/viewdatatableentry/:tableName/:entityId/:resourceId', {
          templateUrl: 'views/system/viewdatatableentry.html'
      })
       .when('/viewsingledatatableentry/:tableName/:entityId', {
                templateUrl: 'views/system/viewdatatableentry.html'
       })
      .when('/addcode', {
          templateUrl: 'views/system/addcode.html'
      })
      .when('/jobs', {
          templateUrl: 'views/system/schedulerjobs.html'
      })
      .when('/viewschedulerjob/:id', {
          templateUrl: 'views/system/viewschedulerjob.html'
      })
      .when('/editschedulerjob/:id', {
          templateUrl: 'views/system/editschedulerjob.html'
      })
      .when('/editjobparameters/:id', {
          templateUrl: 'views/system/editjobparameters.html'
      })
      .when('/viewhistory/:id', {
          templateUrl: 'views/system/viewschedulerjobhistory.html'
      })
      .when('/codes', {
          templateUrl: 'views/system/codes.html'
      })
      .when('/editcode/:id', {
          templateUrl: 'views/system/editcode.html'
      })
      .when('/reports', {
          templateUrl: 'views/system/reports.html'
      })
      .when('/system/viewreport/:id', {
          templateUrl: 'views/system/viewreport.html'
      })
      .when('/createreport', {
          templateUrl: 'views/system/createreport.html'
      })
      .when('/editreport/:id', {
          templateUrl: 'views/system/editreport.html'
      })
      .when('/holidays', {
          templateUrl: 'views/organization/holidays.html'
      })
      .when('/createholiday', {
          templateUrl: 'views/organization/createholiday.html'
      })
      .when('/viewholiday/:id', {
          templateUrl: 'views/organization/viewholiday.html'
      })
      .when('/reports/:type', {
        templateUrl: 'views/reports/view_reports.html'
      })
      .when('/run_report/:name', {
        templateUrl: 'views/reports/run_reports.html'
      })
      
      .when('/attachmeeting/:id/:entityType', {
        templateUrl: 'views/groups/attachmeeting.html'
      })
     
      .when('/accounttransfers/:accountType/:accountId', {
        templateUrl: 'views/accounttransfers/make_accounttransfer.html'
      })
      .when('/viewsavingtrxn/:accountId/trxnId/:id', {
        templateUrl: 'views/savings/view_saving_transaction.html'
      })
      .when('/viewgroup/:id', {
        templateUrl: 'views/groups/viewgroup.html'
      })
      .when('/editgroup/:id', {
        templateUrl: 'views/groups/editgroup.html'
      })
      .when('/addmember', {
        templateUrl: 'views/groups/addmember.html'
      })
      .when('/groupattendance', {
        templateUrl: 'views/groups/groupattendance.html'
      })
      .when('/closegroup/:id', {
        templateUrl: 'views/groups/closegroup.html'
      })
      .when('/addrole/:id', {
        templateUrl: 'views/groups/addrole.html'
      })
      .when('/membermanage/:id', {
        templateUrl: 'views/groups/membermanage.html'
      })
      .when('/transferclients/:id', {
        templateUrl: 'views/groups/transferclients.html'
      })
    
      .when('/centerattendance', {
        templateUrl: 'views/centers/centerattendance.html'
      })
      .when('/createcharge', {
          templateUrl: 'views/products/createcharge.html'
      })
      .when('/editcharge/:id', {
        templateUrl: 'views/products/editcharge.html'
      })
      .when('/entercollectionsheet', {
        templateUrl: 'views/collection/entercollectionsheet.html'
      })
      .when('/assignstaff/:id/:entityType', {
        templateUrl: 'views/groups/assignstaff.html'
      })
      .when('/global', {
        templateUrl: 'views/administration/global.html'
      })
     
      .when('/bulkloan', {
        templateUrl: 'views/organization/bulkloan.html'
      })
      .when('/audit', {
        templateUrl: 'views/system/audit.html'
      })
      .when('/viewaudit/:id', {
        templateUrl: 'views/system/viewaudit.html'
      })
      .when('/createclosure', {
        templateUrl: 'views/accounting/createclosure.html'
      })
      
      .when('/about', {
        templateUrl: 'views/system/aboutobs.html'
      })
    
       .when('/contract', {
        templateUrl: 'views/organization/contract.html'
      })
      .when('/createContract/', {
        templateUrl: 'views/organization/createContract.html'
      })
       .when('/viewContract/:id', {
        templateUrl: 'views/organization/viewContract.html'
      })
      .when('/editcontract/:id', {
          templateUrl: 'views/organization/editContract.html'
        })
        
        .when('/services', {
        templateUrl: 'views/organization/services.html'
      })
      .when('/createservice', {
        templateUrl: 'views/organization/createservice.html'
      })
      .when('/viewservice/:id', {
        templateUrl: 'views/organization/viewservice.html'
      })
      .when('/editservice/:id', {
        templateUrl: 'views/organization/editservice.html'
      })
      .when('/assignedtickets', {
        templateUrl: 'views/crm/tickets/assignedtickets.html'  
      })
       .when('/clientinvoice/:id', {
        templateUrl : 'views/clients/clientinvoice.html'
      })
      .when('/statement/:id', {
       templateUrl : 'views/clients/statement.html'
      })
        .when('/billingorder/:id', {
        templateUrl: 'views/clients/viewclient.html'  
      })
      .when('/billmaster/:id', {
        templateUrl: 'views/clients/viewclient.html'  
      })
      .when('/plans', {
        templateUrl: 'views/organization/plans.html'
      })
      .when('/createPlan', {
        templateUrl: 'views/organization/createPlan.html'
      })
      .when('/viewplan/:id', {
        templateUrl: 'views/organization/viewplan.html'
      })
      .when('/editplan/:id', {
          templateUrl: 'views/organization/editplan.html'
      })
      
       .when('/neworder/:planId/:id', {
          templateUrl: 'views/clients/createorder.html'
      })
      .when('/hardwareswap/:id/:clientId/:orderId', {
        templateUrl: 'views/clients/hardwareSwap.html'
      })
     .when('/prices/:id', {
         templateUrl: 'views/organization/prices.html'
      })
      .when('/createprice/:id', {
          templateUrl: 'views/organization/createprice.html'
      })
      .when('/viewprice/:id/:planId', {
          templateUrl: 'views/organization/viewprice.html'
      })
      .when('/editprice/:id', {
          templateUrl: 'views/organization/editprice.html'
      })
      .when('/mediadetails', {
          templateUrl: 'views/organization/mediadetails.html'
      })
      .when('/createMedia', {
          templateUrl: 'views/organization/createmedia.html'
      })
      .when('/viewmedia/:id', {
          templateUrl: 'views/organization/viewmedia.html'
      })
        .when('/editmedia/:id', {
          templateUrl: 'views/organization/editmedia.html'
      })
      .when('/inventory', {
          templateUrl: 'views/logistics/inventory/inventory.html'
      })
      .when('/createitem', {
          templateUrl: 'views/logistics/inventory/item/createitem.html'
      })
        .when('/importing', {
        templateUrl: 'views/import/datauploads.html'
      })
      .when('/uploadFile', {
        templateUrl: 'views/import/uploadfile.html'
      })
      .when('/viewimportfile/:id', {
        templateUrl: 'views/import/viewimport.html'
      })
      .when('/vieworder/:id/:clientId', {
        templateUrl: 'views/clients/vieworder.html'
      })
      .when('/disconnectOrder/:id', {
        templateUrl: 'views/clients/disconnectrorder.html'
      })
      .when('/renewalOrder/:id/:clientId', {
        templateUrl: 'views/clients/renewalorder.html'
      })
      .when('/provision/:orderId/:clientId/:serviceId', {
        templateUrl: 'views/clients/createprovisioning.html'
      })
      .when('/voucherpins', {
        templateUrl: 'views/organization/voucherpins.html'
      })
      .when('/createvoucherpin', {
        templateUrl: 'views/organization/createvoucherpin.html'
      })
      .when('/discounts', {
        templateUrl: 'views/organization/discounts.html'
      })
      .when('/creatediscounts', {
        templateUrl: 'views/organization/creatediscounts.html'
      })
      .when('/viewdiscounts/:id', {
        templateUrl: 'views/organization/viewdiscounts.html'
      })
      .when('/editdiscounts/:id', {
        templateUrl: 'views/organization/editdiscounts.html'
      })
      .when('/leads', {
        templateUrl: 'views/crm/prospects/prospects.html'
      })
      .when('/viewprospects/:id', {
        templateUrl: 'views/crm/prospects/viewprospects.html'
      })
      .when('/createprospects', {
        templateUrl: 'views/crm/prospects/createprospects.html'
      })
      .when('/cancelprospects/:id', {
        templateUrl: 'views/crm/prospects/cancelprospects.html'
      })
      .when('/editprospects/:id', {
        templateUrl: 'views/crm/prospects/editprospects.html'
      })
      .when('/followprospects/:id', {
        templateUrl: 'views/crm/prospects/followprospects.html'
      })
     
      .when('/currencydetails', {
        templateUrl: 'views/organization/currencydetails.html'
      })
      .when('/createcurrencydetails', {
        templateUrl: 'views/organization/createcurrencydetails.html'
      })
      .when('/viewcurrencydetails/:id', {
        templateUrl: 'views/organization/viewcurrencydetails.html'
      })
      .when('/editcurrencydetails/:id', {
        templateUrl: 'views/organization/editcurrencydetails.html'
      })
      .when('/adjustments/:id', {
        templateUrl: 'views/clients/adjustments.html'
      })
      .when('/payments/:id', {
        templateUrl: 'views/clients/payments.html'
      })
      
       .when('/message', {
        templateUrl: 'views/organization/message.html'
      })
      .when('/createMessage', {
        templateUrl: 'views/organization/createMessage.html'
      })
      .when('/viewmessage/:id', {
        templateUrl: 'views/organization/viewmessage.html'
      })
      .when('/editmessage/:id', {
        templateUrl: 'views/organization/editmessage.html'
      })
      .when('/event', {
        templateUrl: 'views/organization/event.html'
      })
       .when('/createEvent', {
        templateUrl: 'views/organization/createEvent.html'
      })   
       .when('/viewEvent/:id', {
        templateUrl: 'views/organization/viewEvent.html'
      })
      .when('/editEvent/:id', {
        templateUrl: 'views/organization/editEvent.html'
      })
      .when('/addPrice/:id', {
        templateUrl: 'views/organization/addPrice.html'
      })
      .when('/viewPrice/:id', {
        templateUrl: 'views/organization/viewPrice.html'
      })
       .when('/viewEventPrices/:id', {
        templateUrl: 'views/organization/viewEventPrices.html'
      })
      .when('/editEventPrice/:id', {
        templateUrl: 'views/organization/editEventPrice.html'
      })
      .when('/regions', {
        templateUrl: 'views/organization/regions.html'
      })
       .when('/createregions', {
        templateUrl: 'views/organization/createRegions.html'
      })
       .when('/viewregions/:id', {
        templateUrl: 'views/organization/viewregions.html'
      })
       .when('/editRegions/:id', {
        templateUrl: 'views/organization/editRegions.html'
      })
      .when('/newTicket/:id', {
        templateUrl : 'views/crm/tickets/newTicket.html'
      })
      .when('/tickets/:id', {
        templateUrl : 'views/crm/tickets/tickets.html'
      })
      .when('/viewTicket/:clientId/:id', {
          templateUrl : 'views/crm/tickets/viewTicket.html'
        })
        .when('/editTicket/:clientId/:id', {
          templateUrl : 'views/crm/tickets/editTicket.html'
        })
         .when('/chargecode', {
        templateUrl: 'views/organization/chargecode.html'
      })
      .when('/createchargecode/', {
        templateUrl: 'views/organization/createchargecode.html'
      })
      .when('/viewchargecode/:id', {
        templateUrl: 'views/organization/viewchargecode.html'
      })
      .when('/editchargecode/:id', {
        templateUrl: 'views/organization/editchargecode.html'
      })
      .when('/taxmapping/:chargeCode/:chargeId', {
        templateUrl: 'views/organization/taxmapping.html'
      })
      .when('/createtaxmapping/:chargeCode', {
        templateUrl: 'views/organization/createtaxmapping.html'
      })
      .when('/viewtaxmapping/:id', {
        templateUrl: 'views/organization/viewtaxmapping.html'
      })
      .when('/edittaxmapping/:id', {
        templateUrl: 'views/organization/edittaxmapping.html'
      })
      .when('/viewitemdetails/:id', {
        templateUrl: 'views/logistics/inventory/viewitemdetails.html'
      })
      .when('/addgrndetails', {
        templateUrl: 'views/logistics/inventory/grn/addgrndetails.html'
      })
     .when('/viewgrndetails', {
        templateUrl: 'views/logistics/inventory/grn/viewgrndetails.html'
      })
      .when('/viewitem/:id/:showtype/:totalItem',{
    	  templateUrl: 'views/logistics/inventory/item/viewitem.html'
      })
      .when('/edititem/:id/:totalItem',{
    	  templateUrl: 'views/logistics/inventory/item/edititem.html'
      })
      .when('/viewgrn/:id',{
    	  templateUrl: 'views/logistics/inventory/grn/viewgrn.html'
      })
      .when('/createitemdetails',{
    	  templateUrl: 'views/logistics/inventory/createitemdetails.html'
      })
      .when('/createmrn',{
    	  templateUrl: 'views/logistics/inventory/mrn/createmrn.html'
      })
       
      .when('/viewmrn/:id',{
    	  templateUrl: 'views/logistics/inventory/mrn/viewmrn.html'
      })
      .when('/viewmovedmrn/:id',{
    	  templateUrl: 'views/logistics/inventory/mrn/viewmovedmrn.html'
      })
      .when('/movemrn/',{
    	  templateUrl: 'views/logistics/inventory/mrn/movemrn.html'
      })
       .when('/createsupplier',{
    	  templateUrl: 'views/logistics/inventory/createsupplier.html'
      })
       .when('/viewfinancialtran/:transactionId/:clientId', {
        templateUrl: 'views/clients/viewfinancialtransaction.html'  
      })
      .when('/addownedhardware/:id', {
        templateUrl: 'views/clients/addownedhardware.html'  
      })
      .when('/viewownhardware/:id', {
        templateUrl: 'views/clients/viewownhardware.html'
      })
      .when('/editownhardware/:id', {
        templateUrl: 'views/clients/editownhardware.html'
      })
       .when('/addonetimesale/:id/:officeId', {
        templateUrl: 'views/clients/addonetimesale.html'
      })
      .when('/devicerental/:id', {
          templateUrl: 'views/clients/devicerental.html'
        })
      .when('/viewonetimesale/:id/:clientId', {
        templateUrl: 'views/clients/viewonetimesale.html'
      })
      .when('/allocatehardwareonetimesale/:itemcode/:quantity/:clientId/:saleId', {
        templateUrl: 'views/clients/allocatehardwareonetimesale.html'
      })
      .when('/event', {
        templateUrl: 'views/organization/event.html'
      })
      .when('/eventorder/:id', {
        templateUrl: 'views/eventorder/eventorder.html'
      })
       .when('/createEvent', {
        templateUrl: 'views/organization/createEvent.html'
      })   
       .when('/viewEvent/:id', {
        templateUrl: 'views/organization/viewEvent.html'
      })
      .when('/editEvent/:id', {
        templateUrl: 'views/organization/editEvent.html'
      })
      .when('/addEventPrice/:id', {
        templateUrl: 'views/organization/addEventPrice.html'
      })
      .when('/viewPrice/:id', {
        templateUrl: 'views/organization/viewPrice.html'
      })
       .when('/viewEventPrice/:id', {
        templateUrl: 'views/organization/viewEventPrice.html'
      })
      .when('/editEventPrice/:id', {
        templateUrl: 'views/organization/editEventPrice.html'
      })
       .when('/newTicket/:id', {
        templateUrl : 'views/crm/tickets/newTicket.html'
      })
      .when('/tickets/:id', {
        templateUrl : 'views/crm/tickets/tickets.html'
      })
      .when('/viewTicket/:clientId/:id', {
          templateUrl : 'views/crm/tickets/viewTicket.html'
        })
      .when('/editTicket/:clientId/:id', {
          templateUrl : 'views/crm/tickets/editTicket.html'
        })
      .when('/closeTicket/:clientId/:id', {
          templateUrl : 'views/crm/tickets/closeTicket.html'
        })  
      .when('/editaddress/:id', {
          templateUrl : 'views/clients/editaddress.html'
        })
        .when('/addaddress/:id', {
        	templateUrl : 'views/clients/addaddress.html'
        })
        .when('/viewstatement/:id', {
          templateUrl : 'views/clients/viewstatement.html'
        })
         .when('/osdMessage/:id', {
          templateUrl : 'views/clients/osdMessage.html'
        })
         .when('/createhardwareplanmapping', {
        templateUrl: 'views/system/createhardwareplanmapping.html'
      })
      .when('/viewhardwareplanmapping/:id', {
          templateUrl : 'views/system/viewhardwareplanmapping.html'
        })
      .when('/edithardwareplanmapping/:id', {
          templateUrl : 'views/system/edithardwareplanmapping.html'
        })
        .when('/association/:id/:orderId', {
          templateUrl : 'views/clients/association.html'
        })
         .when('/viewAssociation/:clientId/:id', {
          templateUrl : 'views/clients/viewAssociation.html'
        })
         .when('/editAssociation/:clientId/:id', {
          templateUrl : 'views/clients/editAssociation.html'
        })
         .when('/viewhardwareplanmapping/:id', {
          templateUrl : 'views/system/viewhardwareplanmapping.html'
        })
        .when('/createServiceMapping', {
        templateUrl: 'views/system/createServiceMapping.html'
        })
        .when('/viewServiceMapping/:id', {
        templateUrl: 'views/system/viewServiceMapping.html'
        })
         .when('/createCurrencyMapping', {
        templateUrl: 'views/system/currencyconfig.html'
        })
          .when('/createclientnewwizard', {
        templateUrl: 'views/clients/createclientnewwizard.html'  
      })
      .when('/createsimpleActivation', {
        templateUrl: 'views/clients/createactivation.html'  
      })
        .when('/editServiceMapping/:id', {
            templateUrl: 'views/system/editServiceMapping.html'
         })
         .when('/createProvisioningmapping', {
             templateUrl: 'views/system/createProvisioningmapping.html'
         })  
          .when('/createsimpleActivation', {
        templateUrl: 'views/clients/createactivation.html'  
      })
         .when('/viewprovisioningmapping/:id', {
             templateUrl: 'views/system/viewprovisioningmapping.html'
         })  
        .when('/editProvisioningMapping/:id', {
             templateUrl: 'views/system/editProvisioningMapping.html'
         })
         .when('/paymentGateway', {
          templateUrl: 'views/paymentgateway/paymentGateway.html'
         })

	    .when('/createeventactionmapping', {
        templateUrl: 'views/system/createeventactionmapping.html'
    	})
    	.when('/vieweventactionmapping/:id', {
        templateUrl: 'views/system/vieweventactionmapping.html'
    	})
    	.when('/editeventactionmapping/:id', {
        templateUrl: 'views/system/editeventactionmapping.html'
    	})
    	.when('/editPaymentGateway/:id', {
          templateUrl: 'views/paymentgateway/editPaymentGateway.html'
         })
       .when('/createpromotion', {
    	templateUrl: 'views/organization/createpromotioncode.html'
       })
       .when('/viewpromotioncode/:id', {
        templateUrl: 'views/organization/viewpromotioncode.html'
      })
       .when('/editpromotioncode/:id', {
        templateUrl: 'views/organization/editpromotioncode.html'
      }) 
      .when('/smartSearch', {
        templateUrl: 'views/system/smartSearch.html'
      })
      .when('/help',{
        templateUrl: 'views/help.html'
      })
       .when('/addressmanage', {
        templateUrl: 'views/organization/addressManage.html'
      })
       .when('/addresstreeview', {
        templateUrl: 'views/organization/addressTreeview.html'
      }) 
      .when('/payinvoice/:id', {
        templateUrl : 'views/clients/payInvoice.html'
      })
      .when('/creditDistribution/:id', {
        templateUrl : 'views/clients/creditDistribution.html'
      })

      .when('/closeclient/:id', {
        templateUrl : 'views/clients/closeclient.html'
      })
      .when('/groupsDetails', {
        templateUrl : 'views/organization/groupsDetails.html'
      })


      .when('/ipPooling', {
        templateUrl : 'views/system/ipPooling.html'
      }) 
       .when('/createippooling', {
        templateUrl : 'views/system/createIpPooling.html'

      })
      .when('/itemsale',{
    	  templateUrl: 'views/organization/itemSale.html'
      })

      .when('/editProvison/:id', {
        templateUrl: 'views/clients/editProvisioning.html'
      })
       .when('/createsmtp/:id', {
        templateUrl: 'views/administration/createsmtp.html'
      })
      .when('/itemsale/:officeId',{
    	  templateUrl: 'views/organization/itemSale.html'
      })
      .when('/officeadjustments/:officeId',{
     templateUrl: 'views/organization/officeadjustments.html'
      })
      .when('/officepayments/:officeId',{
     templateUrl: 'views/organization/officepayments.html'
      })
      .when('/redemption',{
     templateUrl: 'views/organization/redemption.html'
      })
      .when('/editprovison/:orderId/:clientId/:serviceId', {
        templateUrl: 'views/clients/editProvisioning.html'
      })
      .when('/addcreditcarddetails/:clientId', {
          templateUrl: 'views/clients/addcreditcarddetails.html'
      })
      .when('/addachdetails/:clientId', {
          templateUrl: 'views/clients/addachdetails.html'
      })
      .when('/viewcarddetails/:clientId/:id/:type', {
        templateUrl: 'views/clients/viewcarddetails.html'
      })
      .when('/editcarddetails/:clientId/:id/:type', {
        templateUrl: 'views/clients/editcarddetails.html'
      })
      .when('/addnewcreditcarddetails/:clientId/:id/:type', {
        templateUrl: 'views/clients/addnewcreditcarddetails.html'
      })
      .when('/aboutobs', {
        templateUrl: 'views/system/about_obs.html'
      })
      .when('/editippolling/:id', {
        templateUrl : 'views/system/editippolling.html'
      })
       .when('/addbillmodes/:clientId', {
         templateUrl: 'views/clients/addbillmodes.html'
      })
      .when('/viewgroupdetails/:groupName', {
        templateUrl : 'views/organization/viewgroupdetails.html'
      })
      .when('/addsecondsale/:id', {
        templateUrl: 'views/clients/addsecondsale.html'
      })
      .when('/createPlanMapping',{
       templateUrl: 'views/system/createPlanMapping.html'
      })      
      .when('/viewplanmapping/:id',{
       templateUrl: 'views/system/viewplanmapping.html'
      })
      .when('/editPlanMapping/:id',{
       templateUrl: 'views/system/editPlanMapping.html'
      })
      .when('/dalpaybtn', {
        templateUrl : 'views/system/daypaybutton.html'
      })
      .when('/daypaydetailsform', {
        templateUrl : 'views/system/daypaydetailsform.html'
      })
      .when('/dalpaysuccess', {
        templateUrl : 'views/system/dalpaySuccess.html'
      })
      .when('/createevenvalidation', {
        templateUrl: 'views/system/createevenvalidation.html'
      })
      .when('/editgrn/:id',{
    	  templateUrl: 'views/logistics/inventory/grn/editgrn.html'
      })
      .when('/ipchange/:clientId/:orderId/:serviceId',{
    	  templateUrl: 'views/clients/ipchange.html'
      })
      .when('/createAdvanceMedia',{
    	  templateUrl: 'views/organization/createadvancemedia.html'
      })
      .when('/editsupplier/:id',{
    	  templateUrl: 'views/logistics/inventory/editsupplier.html'
      })
      .when('/createEventFromMedia/:mediaId/:mediaTittle/:from', {
        templateUrl: 'views/organization/createEvent.html'
      }) 
      .when('/provision',{
        templateUrl: 'views/system/provision.html'
      })
      .when('/adddevice/:clientId/:officeId', {
        templateUrl: 'views/clients/adddevice.html'
      })
      .when('/viewcheckerinbox/:id', {
                templateUrl: 'views/system/viewcheckerinbox.html'
      })
       .when('/viewMakerCheckerTask/:commandId', {
                templateUrl: 'views/system/viewMakerCheckerTask.html'
      })
      .when('/checkeractionperformed', {
                templateUrl: 'views/system/checkerActionPerformed.html'
      })
      .when('/paymentgatewayconfig', {
        templateUrl: 'views/administration/paymentgatewayconfig.html'
      })
      .when('/eventaction', {
        templateUrl: 'views/administration/eventaction.html'
      })
       .when('/radius', {
        templateUrl: 'views/organization/radius.html'
      })
      .when('/createRadService/:radiusVersion', {
        templateUrl: 'views/organization/createRadService.html'
      })
      .when('/editRadService/:radiusVersion/:serviceId', {
        templateUrl: 'views/organization/editRadService.html'
      })
       .when('/createNas', {
        templateUrl: 'views/organization/createNas.html'
      })
      .when('/viewvouchers/:voucherId', {
        templateUrl: 'views/organization/viewvouchers.html'
      })
      .when('/createaddons', {
        templateUrl: 'views/organization/createaddons.html'
      })
      .when('/viewaddon/:id', {
        templateUrl: 'views/organization/viewaddon.html'
      })
       .when('/editaddon/:id', {
        templateUrl: 'views/organization/editaddon.html'
      })
      .when('/addons', {
        templateUrl: 'views/organization/addons.html'
      })
      .when('/orderaddons',{
    	  templateUrl : 'views/clients/orderaddons.html'
      })
      .when('/createpartner', {
        templateUrl: 'views/organization/createpartner.html'
      })
       .when('/viewpartner/:id/:officeId', {
        templateUrl: 'views/organization/viewpartner.html'
      })
       .when('/createpartneragreement/:id/:officeId', {
        templateUrl: 'views/organization/createpartneragreement.html'
      })  
      .when('/editpartneragreement/:id/:partnerId', {
        templateUrl: 'views/organization/editpartneragreement.html'
      })
      .when('/disbursements', {
        templateUrl: 'views/administration/disbursements.html'
      }) 
      .when('/editpartner/:partnerId', {
        templateUrl: 'views/organization/editpartner.html'
      })
      .when('/officepayments/:officeId/:partnerId',{
       templateUrl: 'views/organization/officepayments.html'
      })
      .when('/officeadjustments/:officeId/:partnerId',{
       templateUrl: 'views/organization/officeadjustments.html'
      })
      .when('/itemsale/:officeId/:partnerId',{
    	  templateUrl: 'views/organization/itemSale.html'
      })
       .when('/property', {
        templateUrl: 'views/organization/property.html'
      })
      .when('/createproperty', {
        templateUrl: 'views/organization/createproperty.html'
      })
      .when('/viewproperty/:id', {
        templateUrl: 'views/organization/viewproperty.html'
      })
      .when('/editproperty/:id', {
        templateUrl: 'views/organization/editproperty.html'
      })
      .when('/servicetransfer/:clientId', {
    	  templateUrl: 'views/clients/servicetransfer.html'
      })
      .when('/feemaster', {
    	  templateUrl: 'views/organization/feemaster.html'
      })
      .when('/createfeemaster', {
    	  templateUrl: 'views/organization/createfeemaster.html'
      })
      .when('/viewfeemaster/:id', {
    	  templateUrl: 'views/organization/viewfeemaster.html'
      })
      .when('/editfeemaster/:id', {
    	  templateUrl: 'views/organization/editfeemaster.html'
      })
      .when('/createpropertydefinition', {
        templateUrl: 'views/organization/createpropertydefinition.html'
      })
       .when('/editpropertydefinition/:id', {
        templateUrl: 'views/organization/editpropertydefinition.html'
      })
      ;
     
    $locationProvider.html5Mode(false);
  };
  mifosX.ng.application.config(defineRoutes).run(function($log) {
    $log.info("Routes definition completed");
  });
}(mifosX || {}));
