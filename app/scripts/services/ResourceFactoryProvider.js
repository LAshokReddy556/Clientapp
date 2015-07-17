(function(module) {
  mifosX.services = _.extend(module, {
    ResourceFactoryProvider: function() {
      var baseUrl = "" , apiVer = "/obsplatform/api/v1";
      this.setBaseUrl = function(url) {baseUrl = url;};
      this.$get = ['$resource','$rootScope', function(resource,$rootScope) {
        var defineResource = function(url, paramDefaults, actions) {
        	var tempUrl =baseUrl;
        	$rootScope.hostUrl =tempUrl;
          return resource(baseUrl + url, paramDefaults, actions);
        };
        return {
          userResource: defineResource(apiVer + "/users/:userId", {}, {
            getAllUsers: {method: 'GET', params: {fields: "id,firstname,lastname,username,officeName"}, isArray: true}
          }),
          roleResource: defineResource(apiVer + "/roles/:roleId", {}, {
            getAllRoles: {method: 'GET', params: {}, isArray: true}
          }),
          rolePermissionResource: defineResource(apiVer + "/roles/:roleId/permissions", {roleId:'@roleId'}, {
            get: {method: 'GET', params: {}},
            update: {method: 'PUT'}
          }),
          permissionResource: defineResource(apiVer + "/permissions", {}, {
            get: {method: 'GET', params: {}, isArray: true},
            update: {method: 'PUT'}
          }),
          officeResource: defineResource(apiVer + "/offices/:officeId", {officeId:"@officeId"}, {
            getAllOffices: {method: 'GET', params: {}, isArray: true},
            update: { method: 'PUT'}
          }),
          
          officeTemplateResource: defineResource(apiVer + "/offices/template", {}, {
              get: {method: 'GET', params: {}},
              
            }),
          clientResource: defineResource(apiVer + "/clients/:clientId/:anotherresource", {clientId:'@clientId',anotherresource:'@anotherresource'}, {
            getAllClients: {method: 'GET', params: {}},
            getClientClosureReasons: {method: 'GET', params: {}},
            getAllClientDocuments: {method: 'GET', params: {}, isArray: true},
            update: { method: 'PUT'}
          }),
          clientIdentifierResource: defineResource(apiVer + "/client_identifiers/:clientIdentityId/documents", {clientIdentityId:'@clientIdentityId'}, {
            get: {method: 'GET', params: {}, isArray:true}
          }),
          groupTemplateResource: defineResource(apiVer + "/groups/template", {}, {
              get: {method: 'GET', params: {}}
          }),
          clientDocumentsResource: defineResource(apiVer + "/clients/:clientId/documents/:documentId", {clientId:'@clientId',documentId:'@documentId'}, {
            getAllClientDocuments: {method: 'GET', params: {}, isArray: true}
          }),
          clientAccountResource: defineResource(apiVer + "/clients/:clientId/accounts", {clientId:'@clientId'}, {
            getAllClients: {method: 'GET', params: {}}
          }),
          clientNotesResource: defineResource(apiVer + "/clients/:clientId/notes", {clientId:'@clientId'}, {
            getAllNotes: {method: 'GET', params: {}, isArray:true}
          }),
          
          clientAdditionalResource: defineResource(apiVer + "/clients/additionalinfo/:clientId", {clientId:'@clientId'}, {
              getAll: {method: 'GET', params: {}, isArray:true},
              update: {method: 'PUT'}
            }),
            
          clientTemplateResource: defineResource(apiVer + "/clients/template", {}, {
            get: {method: 'GET', params: {}}
          }),
          clientAdditionalTemplateResource: defineResource(apiVer + "/clients/additionalinfo/template", {}, {
              get: {method: 'GET', params: {}}
            }),
          clientIdenfierTemplateResource: defineResource(apiVer + "/clients/:clientId/identifiers/template", {clientId:'@clientId'}, {
            get: {method: 'GET', params: {}}
          }),
          clientIdenfierResource: defineResource(apiVer + "/clients/:clientId/identifiers/:id", {clientId:'@clientId', id: '@id'}, {
            get: {method: 'GET', params: {}}
          }),
        
          groupSummaryResource: defineResource(apiVer + "/runreports/:reportSource",{reportSource: '@reportSource'}, {
              getSummary: {method: 'GET', params: {}}
          }),
        
          runReportsResource: defineResource(apiVer + "/runreports/:reportSource", {reportSource : '@reportSource'}, {
            get: {method: 'GET', params: {}, isArray:true},
            getReport: {method: 'GET', params: {}}
          }),
          reportsResource: defineResource(apiVer + "/reports/:id/:resourceType", {id:'@id', resourceType:'@resourceType'}, {
            get: {method: 'GET', params: {id:'@id'}},
            getReport: {method: 'GET', params: {id:'@id'}},
            getReportDetails: {method: 'GET', params: {id:'@id'}},
            update: {method: 'PUT', params: {}}
          }),
          DataTablesResource: defineResource(apiVer + "/datatables/:datatablename/:entityId/:resourceId", {datatablename:'@datatablename',entityId:'@entityId', resourceId:'@resourceId'}, {
            getTableDetails: {method: 'GET', params: {}},
            update: {method: 'PUT'}
          }),
         
          chargeResource: defineResource(apiVer + "/charges/:chargeId", {chargeId:'@chargeId'}, {
            getAllCharges: {method: 'GET', params: {}, isArray:true},
            getCharge: {method: 'GET', params: {}},
            update: {method: 'PUT', params: {}}
          }),
          chargeTemplateResource: defineResource(apiVer + "/charges/template", {
            get: {method: 'GET', params: {}, isArray:true},
            getChargeTemplates: {method: 'GET', params: {}},
          }),
          currencyConfigResource: defineResource(apiVer + "/currencies", {}, {
            get: {method: 'GET', params: {}},
            update: { method: 'PUT'},
            upd: { method: 'PUT', params:{}, isArray:true}
          }),
          userListResource: defineResource(apiVer + "/users/:userId", {userId:'@userId'}, {
            getAllUsers: {method: 'GET', params: {}, isArray: true},
            update: { method: 'PUT' }
          }),
          userTemplateResource: defineResource(apiVer + "/users/template", {}, {
            get: {method: 'GET', params: {}}
          }),
          employeeResource: defineResource(apiVer + "/staff/:staffId", {staffId:'@staffId'}, {
            update: { method: 'PUT' }
          }),
          globalSearch: defineResource(apiVer + "/search", {query:'@query'}, {
            search: { method: 'GET',
                      params: { query: '@query'} ,
                      isArray:true
                    }
          }),
          fundsResource: defineResource(apiVer + "/funds/:fundId", {fundId:'@fundId'}, {
            getAllFunds: {method: 'GET', params: {}, isArray: true}
          }),
          accountingRulesResource: defineResource(apiVer + "/accountingrules/:accountingRuleId", {accountingRuleId:'@accountingRuleId'}, {
            getAllRules: {method: 'GET', params: {associations : 'all'}, isArray: true},
            getById: {method: 'GET', params: {accountingRuleId:'@accountingRuleId'}},
            get: {method: 'GET', params: {}, isArray: true},
            update: {method: 'PUT'}
          }),
          accountingRulesTemplateResource: defineResource(apiVer + "/accountingrules/template", {}, {
            get: {method: 'GET', params: {}}
          }),
          accountCoaResource: defineResource(apiVer + "/glaccounts/:glAccountId", {glAccountId:'@glAccountId'}, {
            getAllAccountCoas: {method: 'GET', params: {}, isArray: true},
            update: { method: 'PUT' }
          }),
          accountCoaTemplateResource: defineResource(apiVer + "/glaccounts/template", {}, {
            get: {method: 'GET', params: {}}
          }),
          journalEntriesResource: defineResource(apiVer + "/journalentries/:trxid", {trxid:'@transactionId'}, {
            get: {method: 'GET', params: {transactionId:'@transactionId'}},
            reverse: {method: 'POST', params:{command:'reverse'}},
            search:{method: 'GET', params: {}}
          }),
          
          smartSearchResource: defineResource(apiVer + "/smartsearch", {}, {
              get: {method: 'GET', params: {transactionId:'@transactionId'}},
              reverse: {method: 'POST', params:{command:'reverse'}},
              search:{method: 'GET', params: {}}
            }),
            
            advanceSearchResource: defineResource(apiVer + "/advancesearch", {}, {
                search:{method: 'GET', params: {}}
              }),
            
          accountingClosureResource: defineResource(apiVer + "/glclosures/:accId", {accId:"@accId"}, {
            get: {method: 'GET', params: {}, isArray:true},
            getView: {method: 'GET', params: {}}
          }) ,
          codeResources: defineResource(apiVer + "/codes/:codeId", {codeId:"@codeId"}, {
                getAllCodes: {method: 'GET', params: {}},
                getData: {method: 'GET', params: {}}
          }),
          codeValueResource: defineResource(apiVer + "/codes/:codeId/codevalues/:codevalueId", {codeId:'@codeId',codevalueId:'@codevalueId'}, {
            getAllCodeValues: {method: 'GET', params: {}, isArray:true},
            update: { method: 'PUT', params: {}, isArray:true }
          }),
        
          accountTransferResource: defineResource(apiVer + "/accounttransfers/:transferId", {transferId:'@transferId'}, {
              get: {method: 'GET', params: {transferId:'@transferId'}}
          }),
          accountTransfersTemplateResource: defineResource(apiVer + "/accounttransfers/template", {}, {
              get: {method: 'GET', params: {}}
          }),
       
          jobsResource: defineResource(apiVer + "/jobs/:jobId/:resourceType", {jobId : '@jobId',resourceType : '@resourceType'}, {
            get: {method: 'GET', params: {}, isArray: true},
            getJobDetails: {method: 'GET', params: {}},
            getJobHistory: {method: 'GET', params: {}},
            update: {method: 'PUT', params: {}},
          }),
          
          jobsparameters: defineResource(apiVer + "/jobs/:jobId/jopparameters", {jobId : '@jobId'}, {
              get: {method: 'GET', params: {}},
              update: {method: 'PUT', params: {}},
            }),
            
          schedulerResource: defineResource(apiVer + "/scheduler", {}, {
            get: {method: 'GET', params: {}}
          }),
         
          configurationResource:defineResource(apiVer + "/configurations/:configId",{configId : '@configId'}, {
            get: {method: 'GET', params: {}},
            update: {method: 'PUT', params: {}}
          }),
          configurationSMTPResource:defineResource(apiVer + "/configurations/smtp",{}, {
              get: {method: 'GET', params: {}}
            }),
          cacheResource:defineResource(apiVer + "/caches",{}, {
            get: {method: 'GET', params: {}, isArray:true},
            update: {method: 'PUT', params: {}}
          }),
          templateResource:defineResource(apiVer + "/templates/:templateId/:resourceType",{templateId: '@templateId', resourceType:'@resourceType'}, {
            get: {method: 'GET', params: {}, isArray:true},
            getTemplateDetails: {method: 'GET', params: {}},
            update: {method: 'PUT', params: {}},
          }),
          
          VendorLemplateResource:defineResource(apiVer + "/vendormanagement/:vendorId",{vendorId: '@vendorId'}, {
              get: {method: 'GET', params: {}, isArray:true},
              getTemplateDetails: {method: 'GET', params: {}},
              update: {method: 'PUT', params: {}},
          }),
          VendorTemplateResource:defineResource(apiVer + "/vendormanagement/template",{}, {
             
              getTemplateDetails: {method: 'GET', params: {}},
              update: {method: 'PUT', params: {}},
          }),
          VendorAgreementTemplateResource:defineResource(apiVer + "/vendoragreement/template",{vendorId: '@vendorId'}, {
              
              getTemplateDetails: {method: 'GET', params: {}},
              update: {method: 'PUT', params: {}},
          }),
          VendorAgreementResource:defineResource(apiVer + "/vendoragreement/:vendorAgreementId/:resourceType",{vendorAgreementId: '@vendorAgreementId', resourceType:'@resourceType'}, {
              get: {method: 'GET', params: {}, isArray:true},
              getTemplateDetails: {method: 'GET', params: {}},
              update: {method: 'PUT', params: {}},
          }),
          VendorAgreementDataResource:defineResource(apiVer + "/vendoragreement/:vendorId",{vendorId: '@vendorId'}, {
              get: {method: 'GET', params: {}, isArray:true},
              getTemplateDetails: {method: 'GET', params: {}},
              update: {method: 'PUT', params: {}},
          }),
       
          auditResource: defineResource(apiVer + "/audits/:templateResource", {templateResource:'@templateResource'}, {
            get: {method: 'GET', params: {}},
            search: {method: 'GET', params: {},isArray:true}
          }),
        
          
          contractTemplateResource: defineResource(apiVer + "/subscriptions/template", {}, {
              get: {method: 'GET', params: {}}
            }),
            
          contractResource: defineResource(apiVer + "/subscriptions/:subscriptionId", {subscriptionId:'@SubscriptionId'}, {
              update: { method: 'PUT' }
          }),
          planResource: defineResource(apiVer + "/plans/:planId", {planId:'@planId'}, {
                update: { method: 'PUT' }
          }),
          
          planQualifierResource: defineResource(apiVer + "/plans/planQulifier/:planId", {planId:'@planId'}, {
        	  get: {method: 'GET', params: {}},
              update: { method: 'PUT' }
          }),
          planTemplateResource: defineResource(apiVer + "/plans/template", {}, {
                  get: {method: 'GET', params: {}}
           }),
                
          priceResource: defineResource(apiVer + "/prices/:planId", {planId:'@planId'}, {
                    getAllPrices: {method: 'GET', params: {}, isArray: true},
                    update: { method: 'PUT' }
           }),
           userChatResource: defineResource(apiVer + "/userchats", {}, {
               get: {method: 'GET', params: {}, isArray: false},
               update: { method: 'PUT' }
           }),
           
           updateUserChatResource: defineResource(apiVer + "/userchats/:messageId", {messageId:'@messageId'}, {
               get: {method: 'GET', params: {}, isArray: false},
               update: { method: 'PUT' }
           }),
           
           userSentMessageResource: defineResource(apiVer + "/userchats/sentmessages/", {}, {
               get: {method: 'GET', params: {}, isArray: false},
               update: { method: 'PUT' }
           }),

           itemResourceTemplate: defineResource(apiVer + "/ownedhardware/template", {}, {
               getAll: {method: 'GET', params: {}}
              }),
           deletePriceResource: defineResource(apiVer + "/prices/:priceId", {priceId:'@priceId'}, {
               update: { method: 'PUT' }
           }),
           getPriceResource: defineResource(apiVer + "/prices/pricedetails/:priceId", {priceId:'@priceId'}, {
               get: {method: 'GET', params: {}},
               update: { method: 'PUT' }
           }),
           updatePriceResource: defineResource(apiVer + "/prices/update/:priceId", {priceId:'@priceId'}, {
               update: { method: 'PUT' }
           }),
           
          priceTemplateResource: defineResource(apiVer + "/prices/template", {}, {
                      get: {method: 'GET', params: {planId:'@planId'}}
           }),
           mediaDetailsResource: defineResource(apiVer + "/assets/mediadata", {}, {}),
           
           mediaTemplateResource: defineResource(apiVer + "/assets/template", {}, {}),
           
           mediaLocationAttributesResource: defineResource(apiVer + "/assets/locationAttributes/:mediaId", {mediaId:'@mediaId'}, {}),
           
           saveMediaResource: defineResource(apiVer + "/assets/:mediaId", {mediaId:'@mediaId'}, {
               getAllMedia: {method: 'GET', params: {}, isArray: true},
                       update: { method: 'PUT' }
           }),
           mediaGameTemplateResource: defineResource(apiVer + "/assets/gamedata/template", {}, {
               get: {method: 'GET', params: {}}
           }),
           saveMediaGameTemplateResource: defineResource(apiVer + "/assets/gamedata", {}, {
               get: {method: 'GET', params: {}}
           }),
          /* itemResource: defineResource(apiVer + "/items/:itemId", {}, {
        	   getAllItems: {method: 'GET', params: {}, isArray: true},
               get: {method: 'GET', params: {}}
           }),*/
           inventoryTemplateResource: defineResource(apiVer + "/items/template", {}, {
               get: {method: 'GET', params: {}}
           }),
           
           importResource: defineResource(apiVer + "/datauploads", {}, {
               getAllimportfiles: {method: 'GET', params: {}, isArray: true},
               getdata: {method: 'GET', params: {}},
               update: { method: 'PUT' }
           }),
         importProcessResource: defineResource(apiVer + "/datauploads/:uploadfileId", {}, {
             update: { method: 'PUT' }
          }),
         
         importviewResource: defineResource(apiVer + "/datauploads/:uploadfileId/", {}, {
        	 get: {method: 'GET', params: {}},
             update: { method: 'PUT' }
          }),
         orderTemplateResource: defineResource(apiVer + "/orders/template", {planId:'@orderId'}, {}),
         
         orderResource: defineResource(apiVer + "/orders/:planId/template", {planId:'@planId'}, {
         get: {method: 'GET', params: {}},
        }),
        saveOrderResource: defineResource(apiVer + "/orders/:clientId", {clientId:'@clientId'}, {
           get: {method: 'GET', params: {}},
           update: { method: 'PUT' }
          
        }),
        OrderSchedulingResource: defineResource(apiVer + "/orders/scheduling/:clientId", {clientId:'@clientId'}, {
            get: {method: 'GET', params: {}},
            update: { method: 'PUT' }
           
         }),
        changeOrderResource: defineResource(apiVer + "/orders/changePlan/:orderId", {orderId:'@orderId'}, {
            get: {method: 'GET', params: {}},
            update: { method: 'PUT' }
           
         }),
        getOrderResource: defineResource(apiVer + "/orders/:clientId/orders", {clientId:'@clientId'}, {
    	  getAllOrders: {method: 'GET', params: {}},
        }),

        EventActionResource: defineResource(apiVer + "/eventactions/:clientId", {clientId:'@clientId'}, {
      	  get: {method: 'GET', params: {},isArray: true},
          }),
          
        getSingleOrderResource: defineResource(apiVer + "/orders/:orderId/orderprice", {orderId:'@orderId'}, {
     	  get: {method: 'GET', params: {}},
     	  update: { method: 'PUT' }
        }),
        
        OrderDisconnectResource: defineResource(apiVer + "/orders/disconnect", {}, {
       	  get: {method: 'GET', params: {}},
        }),
        
        OrderReactiveResource: defineResource(apiVer + "/orders/reactive/:orderId", {orderId:'@orderId'}, {
         	  get: {method: 'GET', params: {}},
         	 update: { method: 'PUT' }
          }),
          
        OrderreconnectResource: defineResource(apiVer + "/orders/reconnect/:orderId", {orderId:'@orderId'},{
           	update: { method: 'PUT' },
            get: {method: 'GET', params: {}},
        }),
        
        OrderTerminateResource: defineResource(apiVer + "/orders/terminate/:orderId", {orderId:'@orderId'},{
           	update: { method: 'PUT' },
        }),
        
        OrderSuspensionResource: defineResource(apiVer + "/orders/suspend/:orderId", {orderId:'@orderId'},{
           	update: { method: 'PUT' },
            get: {method: 'GET', params: {}},
        }),
        OrderrenewalResourceTemplate: defineResource(apiVer + "/orders/renewalorder", {},{
        	 get: {method: 'GET', params: {}},
        	update: { method: 'PUT' }
        }),
        
        LicenseResource: defineResource(apiVer + "/licensekey/:key1", {key:'@key'},{
       	 get: {method: 'GET', params: {}},
       	update: { method: 'PUT' }
       }),
       KeyInfoResource: defineResource(apiVer + "/keyinfo", {},{
         	 get: {method: 'GET', params: {}}
         }),
        OrderrenewalResource: defineResource(apiVer + "/orders/renewal/:orderId", {orderId:'@orderId'},{
       	update: { method: 'PUT' }
       }),
       voucherpinResource: defineResource(apiVer + "/vouchers/:voucherId", {voucherId:'@voucherId'}, {
           getAllEmployees: {method: 'GET', params: {}, isArray: true},
       	   update: {method: 'PUT', params: {}}
         }),
         voucherpinsByIdResource: defineResource(apiVer + "/vouchers/voucherslist/:voucherId", {voucherId:'@voucherId'}, {
           }),
          CancelvoucherpinResource: defineResource(apiVer + "/vouchers/cancel/:voucherId", {voucherId:'@voucherId'}, {
        	  update: { method: 'PUT' }
           }),
         voucherpinTemplateResource: defineResource(apiVer + "/vouchers/template", {}, {}),
         
         discountResource: defineResource(apiVer + "/discount/:discountId", {discountId:'@discountId'}, {
             get: {method: 'GET', params: {}, isArray: true},
         	  update: { method: 'PUT' }
            }),
            
            cancelVoucherTemplateResource: defineResource(apiVer + "/vouchers/cancel/template", {}, {
                get: {method: 'GET', params: {}}
               }),
         discountTemplateResource: defineResource(apiVer + "/discount/template", {}, {
             get: {method: 'GET', params: {}}
            }),
         discountsResource: defineResource(apiVer + "/discount/:discountId/:resourceType", {discountId:'@discountId', resourceType:'@resourceType'}, {
                get: {method: 'GET', params: {discountId:'@discountId'}},
                getDiscount: {method: 'GET', params: {discountId:'@discountId'}, isArray:true},
                getDiscountDetails: {method: 'GET', params: {discountId:'@discountId'}},
                update: {method: 'PUT', params: {}}
              }),
              
         getAllProspectResource: defineResource(apiVer + "/prospects/allprospects",{},  {
              	getAllDetails: {method: 'GET', params: {}},
              	get: {method: 'GET', params: {}}
              }),
         prospectResource: defineResource(apiVer + "/prospects/:prospectId", {prospectId:'@prospectId'}, {
               getAllProspects: {method: 'GET', params: {}, isArray: true},
               getDetails: {method: 'GET', params: {clientProspectId:'@clientProspectId'}},
               getViewProspects: {method: 'GET', params: {}},
               update: {method: 'PUT', params: {}}
                }),            
         prospectTemplateResource: defineResource(apiVer + "/prospects/template", {}, {
             	getTemplate: {method: 'GET', params: {}},
             	update: {method: 'PUT', params: {}}
             	}),
         prospectFollowUpResource: defineResource(apiVer + "/prospects/followup/:prospectId",{prospectId: '@prospectId'}, {
             	get: {method: 'GET', params: {}},
             	update: {method: 'PUT', params: {}}
         		}),       	
         prospectHistoryResource: defineResource(apiVer + "/prospects/:prospectdetailid/history", {prospectdetailid:'@prospectdetailid'}, {
              getHistoryProspects: {method: 'GET', params: {}}
                }),         
         prospectConvertResource: defineResource(apiVer + "/prospects/converttoclient/:deleteProspectId", {deleteProspectId:'@deleteProspectId'}, {
            getViewProspects: {method: 'GET', params: {}}
            }),
         prospectCancelResource: defineResource(apiVer + "/prospects/cancel/:prospectId", {prospectId:'@prospectId'}, {
            getProspects: {method: 'GET', params: {}},
           }),
      
       currencyResource: defineResource(apiVer + "/countrycurrency/:id/:resourceType", {id:'@id', resourceType:'@resourceType'}, {
            update: {method: 'PUT', params: {}}
           }),
       currencyTemplateResource: defineResource(apiVer + "/countrycurrency/template", {}, {
           get: {method: 'GET', params: {}}
           }),
           
       adjustmentTemplateResource: defineResource(apiVer + "/adjustments/template", {}, {
           get: {method: 'GET', params: {}}
           }),
           
       adjustmentResource: defineResource(apiVer + "/adjustments/:clientId", {clientId:'@clientId'}, {
          get: {method: 'GET', params: {}}
          }),
       paymentsTemplateResource: defineResource(apiVer + "/payments/template", {}, {
         getPayments: {method: 'GET', params: {}}
          }),
       paymentsResource: defineResource(apiVer + "/payments/:clientId", {clientId:'@clientId'}, {
          get: {method: 'GET', params: {}}
          }),
       transactionHistoryResource: defineResource(apiVer + "/transactionhistory/:clientId", {clientId:'@clientId'}, {
       	getTransactionHistory: {method: 'GET', params: {clientId:'@clientId'}, }
          }),
          
          transactionOldHistoryResource: defineResource(apiVer + "/transactionhistory/template/:clientId", {clientId:'@clientId'}, {
             	getTransactionHistory: {method: 'GET', params: {clientId:'@clientId'}, }
          }),
     
          serviceResource: defineResource(apiVer + "/servicemasters/:serviceId", {serviceId:"@serviceId"}, {
        	  update: {method: 'PUT'}
            }),
            serviceTemplateResource: defineResource(apiVer + "/servicemasters/template", {}, {}),
            
              assignedTicketsResource: defineResource(apiVer + "/tickets/assignedTickets", {}, {
            	  get: {method: 'GET', params: {}, isArray: true},
            	  update: {method: 'PUT'}
                }),
                getAllTicketResource: defineResource(apiVer + "/tickets/alltickets",{},  {
                	getAllDetails: {method: 'GET', params: {}},
                	get: {method: 'GET', params: {}}
                }),
                
                statementResource: defineResource(apiVer + "/billmaster/:clientId", {clientId:'@clientId'}, {
                    get: {method: 'GET', params: {}, isArray: true},
                    update: { method: 'PUT'}
                }),
                clientInvoiceResource: defineResource(apiVer + "/billingorder/:clientId", {clientId:'@clientId'}, {
                    get: {method: 'GET', params: {}},
                    update: { method: 'PUT'}
                }),
                cancelPaymentResource: defineResource(apiVer + "/payments/cancelpayment/:paymentId", {paymentId:'@paymentId'}, {
                    get: {method: 'GET', params: {}},
                    update: { method: 'PUT'}
                }),  
                messageTemplateResource: defineResource(apiVer + "/messages/template",{},  {
              	  get: {method: 'GET', params: {}}
                }),
                messageSaveResource: defineResource(apiVer + "/messages/:messageId",{messageId:'@messageId'},  {
              	  get: {method: 'GET', params: {}},
              	  update: {method: 'PUT'}
                }),
                eventResource: defineResource(apiVer + "/eventmaster",{},  {
              	  get: {method: 'GET', params: {}, isArray:true }
                }),
                eventEditResource: defineResource(apiVer + "/eventmaster/:eventId",{eventId:'@eventId'},  {
              	  get: {method: 'GET', params: {} },
              	  update: {method: 'PUT'}
                }),
                eventTemplateResource: defineResource(apiVer + "/eventmaster/template",{},  {
              	  get: {method: 'GET', params: {}}
                }),    
                eventPriceTemplateResource: defineResource(apiVer + "/eventprice/template/:resourceType",{eventId:'@eventId', resourceType:'@resourceType'},  {
              	  get: {method: 'GET', params: {eventId:'@eventId'}, isArray:true},
              	  getpriceDetails: {method: 'GET', params: {eventId:'@eventId'}}
                }),
                eventpriceResource: defineResource(apiVer + "/eventprice/:eventId/:resourceType",{eventId:'@eventId', resourceType:'@resourceType'},  {
              	  getprice: {method: 'GET', params: {eventId:'@eventId'}, isArray:true}
                }),
                eventPriceEditResource: defineResource(apiVer + "/eventprice/singleeventprice/:id",{id:'@id'},  {
              	  geteventpricedetail: {method: 'GET', params: {id:'@id'}},
              	  update: {method: 'PUT', params: {}}
                }),
                eventPriceUpdateResource: defineResource(apiVer + "/eventprice/:id",{id:'@id'},  {
                	  update: {method: 'PUT', params: {}}
                }),
                regionResource: defineResource(apiVer + "/regions/:regionId/:resourceType", {regionId:'@regionId', resourceType:'@resourceType'}, {
                    get: {method: 'GET', params: {regionId:'@regionId'}},
                    getRegion: {method: 'GET', params: {regionId:'@regionId'}, isArray:true},
                    getRegionDetails: {method: 'GET', params: {regionId:'@regionId'}},
                    update: {method: 'PUT', params: {}}
                  }),
                regionResourceTemplate: defineResource(apiVer + "/regions/template",{},  {
                	  getAllRegions: {method: 'GET', params: {}}     	 
                  }),
                regionResourceGetStates: defineResource(apiVer + "/regions/getstates/:countryId",{countryId:'@countryId'},  {
                  	  get: {method: 'POST', params: {}}     	 
                  }),    
                  ticketResource: defineResource(apiVer + "/tickets/:clientId/:id",{clientId:'@clientId', id:'@id'},  {
                	  get: {method: 'GET', params: {}},
                	  getAll: {method: 'GET', params: {}, isArray:true}
                }),
                chargecodeResource: defineResource(apiVer + "/chargecode/:chargeCodeId", {chargeCodeId:'@chargeCodeId'}, {
                    update: { method: 'PUT' }
                }),
                chargecodetemplateResource: defineResource(apiVer + "/chargecode/template", {}, {
              	  
                }),
                taxmappingResource: defineResource(apiVer + "/taxmap/:chargeCode/chargetax", {chargeCode:'@chargeCode'}, {
              	  	update: { method: 'PUT' }
                }),
                
                getTaxmappingResource: defineResource(apiVer + "/taxmap/:taxId", {taxId:'@taxId'}, {
                	  update: { method: 'PUT' }
                  }),
                
                taxmappingtemplateResource: defineResource(apiVer + "/taxmap/template", {}, {
              	  getAlltaxmapping: {method: 'GET', params: {}}
                }),
                
                supplierResource: defineResource(apiVer + "/suppliers/:id", {id: '@id'}, {
              	  getAlldetails: {method: 'GET', params: {}},
                    get: {method: 'GET', params: {},isArray: true},
                    update: {method: 'PUT', params: {}}
                }),
                
                grnTemplateResource: defineResource(apiVer + "/grn/template", {},{
                    get: {method: 'GET', params: {}}
                }),
                
                grnResource: defineResource(apiVer + "/grn/:grnId", {grnId: '@grnId'},{
                   get: {method: 'GET', params: {}},
                  update: {method: 'PUT', params: {}}
               }),
               singleItemDetailResource: defineResource(apiVer + "/itemdetails/singleitem/:itemId", {}, {
                   get: {method: 'GET', params: {}}	
               }),
                /* grnapiResource: defineResource(apiVer + "/itemdetails/addgrn", {}, {
              	   getAlldetails: {method: 'GET', params: {}, isArray: true},
                    get: {method: 'GET', params: {}}
                 }),*/
                 itemDetailTemplateResource: defineResource(apiVer + "/itemdetails/template", {grnId: '@grnId'}, {
                       get: {method: 'GET', params: {}}	
                 }),
                 grnUpdateResource: defineResource(apiVer + "/itemdetails/editgrn/:grnId", {grnId: '@grnId'}, {
                     get: {method: 'GET', params: {}},
                     update: {method: 'PUT', params: {}}
                 }),
                 grnIdResource: defineResource(apiVer + "/itemdetails/grn/template", {}, {
                     get: {method: 'GET', params: {},isArray: true}	
                 }),
                 
                 itemResource: defineResource(apiVer + "/items/:itemId", {itemId:'@itemId'}, {
                 	   getAllItems: {method: 'GET', params: {}, isArray: true},
                       get: {method: 'GET', params: {}},
                       update: {method: 'PUT', params: {}}
                  }),
                 itemTemplateResource: defineResource(apiVer + "/items/template", {}, {
               	 getAllItems: {method: 'GET', params: {}, isArray: true},
               	 get: {method: 'GET', params: {}}
                 }),
                 itemDetailsResource: defineResource(apiVer + "/itemdetails/:itemId/:anotherresource", {itemId:'@itemId',anotherresource:'@anotherresource'}, {
               	  getAlldetails: {method: 'GET', params: {}},
                     get: {method: 'GET', params: {}},
		             update: {method: 'PUT', params: {}}
                 }),
                 itemDetailsforDeleteResource: defineResource(apiVer + "/itemdetails/:itemId", {itemId:'@itemId'}, {
                  	  getAlldetails: {method: 'GET', params: {}},
                        get: {method: 'GET', params: {}},
   		             update: {method: 'PUT', params: {}}
                    }),
		        itemQualityResource: defineResource(apiVer + "/itemdetails/itemquality", {}, {
                     get: {method: 'GET', params: {}}	
                 }),	
                 itemResource: defineResource(apiVer + "/items/:itemId", {itemId:'@itemId'}, {
                	   getAllItems: {method: 'GET', params: {}},
                     get: {method: 'GET', params: {}},
                     update: {method: 'PUT', params: {}}
                 }),
                 mrnTemplateResource: defineResource(apiVer + "/mrn/template", {}, {
               	  getAlldetails: {method: 'GET', params: {}, isArray: true},
                     get: {method: 'GET', params: {}}
                 }),
                 mrnResource: defineResource(apiVer + "/mrn/:mrnId", {}, {
               	  getAlldetails: {method: 'GET', params: {}, isArray: true},
                     get: {method: 'GET', params: {}}
                 }),
                 moveMrnResource: defineResource(apiVer + "/mrn/template/ids", {}, {
               	  getAlldetails: {method: 'GET', params: {}, isArray: true},
                     get: {method: 'GET', params: {}}
                 }),
                 moveMrnSaveResource: defineResource(apiVer + "/mrn/movemrn/:mrnId", {}, {
                     get: {method: 'GET', params: {}},
                 	 getMovedMrnResource: {method: 'GET', params: {mrnId:'@mrnId'}}
                 }),
                 moveItemSaleSaveResource: defineResource(apiVer + "/mrn/moveitemsale", {}, {
                     get: {method: 'GET', params: {}},
                 }),
                 viewMrnResource: defineResource(apiVer + "/mrn/view/", {},{
               	  getAlldetails: {method: 'GET', params: {}},
                     get: {method: 'GET', params: {}}
                 }),
                 itemhistoryResource: defineResource(apiVer + "/mrn/history/", {},{
               	  getAlldetails: {method: 'GET', params: {}},
               	  get: {method: 'GET', params: {}}
                 }),
                 FineTransactionResource: defineResource(apiVer + "/financialTransactions/:clientId", {clientId:'@clientId'}, {
                   	getAllFineTransactions: {method: 'GET', params: {}, }
                 }),
                   
                HardwareResource: defineResource(apiVer + "/ownedhardware/:clientId", {clientId:'@clientId'}, {
                 	  getAllOwnHardware: {method: 'GET', params: {}, isArray: true}
                 }),
                ownHardwareResource: defineResource(apiVer + "/ownedhardware/own/:id", {id:'@id'}, {
                	 getSingleOwnHardware: {method: 'GET', params: {}},
                     update: {method: 'PUT', params: {id:'@id'}}
                }),
               
                financialResource: defineResource(apiVer + "/financialTransactions/:transactionId/invoice", {transactionId:'@transactionId'}, {
             	  getAllDetails: {method: 'GET', params: {}}
                }),
               oneTimeSaleResource: defineResource(apiVer + "/onetimesales/:clientId", {clientId:'@clientId'}, {
             	getOneTimeSale: {method: 'GET', params: {clientId:'@clientId'}}
               }),
               deleteOneTimeSaleResource: defineResource(apiVer + "/onetimesales/:saleId", {saleId:'@saleId'}, {
                  	update: {method: 'PUT', params: {saleId:'@saleId'}}
                  }),
              unallocateDeviceResource: defineResource(apiVer + "/itemdetails/deallocate/:allocationId", {allocationId:'@allocationId'}, {
                    	update: {method: 'PUT', params: {saleId:'@saleId'}}
                    }),   
               oneTimeSaleTemplateResource: defineResource(apiVer + "/onetimesales/template", {}, {
                 getOnetimes: {method: 'GET', params: {}}
               }),
               oneTimeSaleTemplateResourceData: defineResource(apiVer + "/onetimesales/:itemId/item", {itemId:'@itemId'}, {
                   get: {method: 'GET', params: {}}
                 }),
               oneTimeSaleQuantityResource: defineResource(apiVer + "/onetimesales/:itemId/totalprice", {itemId:'@itemId'}, {
                get: {method: 'POST', params: {}}
            	  // get: {method: 'GET', params: {}}
                 }),
               oneTimeSaleAllocation: defineResource(apiVer + "/onetimesales/:orderId/allocation", {orderId:'@orderId'}, {
                get: {method: 'GET', params: {}}
                 }),
                      
             allocateHardwareDetails: defineResource(apiVer + "/itemdetails/:oneTimeSaleId/:officeId", {oneTimeSaleId:'@oneTimeSaleId',officeId:'@officeId'}, {
                getItemDetails: {method: 'GET', params: {}},
                getSerialNumbers:{method: 'GET', params:{}}
                }),
             allocateHardwareResource: defineResource(apiVer + "/itemdetails/allocation", {}, {
                get: {method: 'GET', params: {}}
                }),
                eventResource: defineResource(apiVer + "/eventmaster",{},  {
              	  get: {method: 'GET', params: {}, isArray:true }
                }),
                eventEditResource: defineResource(apiVer + "/eventmaster/:eventId",{eventId:'@eventId'},  {
              	  get: {method: 'GET', params: {} },
              	  update: {method: 'PUT'}
                }),
                eventTemplateResource: defineResource(apiVer + "/eventmaster/template",{},  {
              	  get: {method: 'GET', params: {}}
                }),
                eventOrderTemplateResource: defineResource(apiVer + "/eventorder/:clientId",{},  {
                	  get: {method: 'GET', params: {clientId:'@clientId'}}
                }),
                eventOrderPriceTemplateResource: defineResource(apiVer + "/eventorder",{},{
              	  	getEventPrice: {method: 'GET', params: {clientId:'@clientId',ftype:'@ftype',otype:'@otype',eventId:'@eventId'}}
                }),
                eventOrderPriceUpdateTemplateResource: defineResource(apiVer + "/eventorder",{},{
                	update: {method: 'PUT', params: {}},
                    get: {method: 'GET', params: {clientId:'@clientId'},isArray:true }
                }),
                
                eventPriceTemplateResource: defineResource(apiVer + "/eventprice/template/:resourceType",{eventId:'@eventId', resourceType:'@resourceType'},  {
              	  get: {method: 'GET', params: {eventId:'@eventId'}, isArray:true},
              	  getpriceDetails: {method: 'GET', params: {eventId:'@eventId'}}
                }),
                eventpriceResource: defineResource(apiVer + "/eventprice/:eventId/:resourceType",{eventId:'@eventId', resourceType:'@resourceType'},  {
              	  getprice: {method: 'GET', params: {eventId:'@eventId'}, isArray:true}
                }),
                ticketResourceTemplate: defineResource(apiVer + "/tickets/template",{},  {
              	  get: {method: 'GET', params: {}},
              	  getForCloseTicket: {method: 'GET', params: {}, isArray:true}
              }),  
            ticketResource: defineResource(apiVer + "/tickets/:clientId/:id",{clientId:'@clientId', id:'@id'},  {
            	  get: {method: 'GET', params: {}},
            	  getAll: {method: 'GET', params: {}, isArray:true}
            }),
            editTicketResource: defineResource(apiVer + "/tickets/:clientId/update/:id",{clientId:'@clientId', id:'@id'},  {
            	  get: {method: 'GET', params: {}},
            	  getAll: {method: 'GET', params: {}, isArray:true}
            }),
            closeTicketResource: defineResource(apiVer + "/tickets/:id",{id:'@id'},  {
            	  update: {method: 'PUT', params: {}}
            }),
            ticketHistoryResource: defineResource(apiVer + "/tickets/:id/history",{id:'@id'},  {
          	  get: {method: 'GET', params: {}}
            }),
            AddressTemplateResource: defineResource(apiVer + "/address/template/:city", {city:'@city'}, {
                get: {method: 'GET', params: {}}
              }),
              singleStatementResource: defineResource(apiVer + "/billmaster/:billId/billdetails", {billId:'@billId'}, {
                  get: {method: 'GET', params: {},isArray:true}
                }),
            addressEditResource: defineResource(apiVer + "/address/addressdetails/:clientId",{clientId:'@clientId'},  {
            	  get: {method: 'GET', params: {}},
            	  getAll: {method: 'GET', params: {clientId:'@clientId'}}
              }),
           addressResource: defineResource(apiVer + "/address/:clientId",{clientId:'@clientId'},  {
        	   getAllAddresses: {method: 'GET', params: {}},
            	update: {method: 'PUT', params: {}}        	 
          }),
          osdResource:  defineResource(apiVer + "/orders/retrackOsdmessage/:id/:orderId",{id:'@id',orderId:'@orderId'},  {
         	 getPost: {method: 'POST', params: {id:'@id',orderId:'@orderId'} }
          }),         
          associationResource: defineResource(apiVer + "/associations/:clientId/:id", {clientId:'@clientId',id:'@id'}, {
              getAssociation: {method: 'GET', params: {}},
              get: {method: 'GET', params: {},isArray: true}             
          }),
          
          deAssociationResource: defineResource(apiVer + "/associations/deassociation/:id", {id:'@id'}, {
        	  update: { method: 'PUT'}
          }),
          
          associationTemplate:  defineResource(apiVer + "/associations/template",{},  {
         	 get: {method: 'GET', params: {}}     	
          }),
          
          associationSaveResource:  defineResource(apiVer + "/associations/:clientId",{clientId:'@clientId'},  {
         	 get: {method: 'GET', params: {}}
          }),
          associationUpdateResource:  defineResource(apiVer + "/associations/:associationId",{associationId:'@associationId'},  {
          	 update: { method: 'PUT'}
           }),       
          mappingResource: defineResource(apiVer + "/servicemapping/:servicemapId", {servicemapId:'@servicemapId'}, {
              get: {method: 'GET', params: {}},
              update: { method: 'PUT'}
          }),
          hardwareMappingResource: defineResource(apiVer + "/hardwaremapping/:hardwaremapId", {hardwaremapId:'@hardwaremapId'}, {
              getDetails: {method: 'GET', params: {}},
              update: { method: 'PUT'}
          }) ,   
          
          hardwaretemplateMappingResource: defineResource(apiVer + "/hardwaremapping/template", {}, {
                getTemplateData: {method: 'GET', params: {}}
         }),
         hardwareSwapResource: defineResource(apiVer + "/hardwareswapping/:clientId",{clientId:'@clientId'},  {
       	  get: {method: 'GET', params: {clientId:'@clientId'}}
         }),
       
         activationProcessResource: defineResource(apiVer + "/activationprocess",{},  {
         	  get: {method: 'GET', params: {clientId:'@clientId'}}
           }),
         serviceMappingResource: defineResource(apiVer + "/servicemapping/:serviceMappingId", {serviceMappingId: '@serviceMappingId'}, {
               update: { method: 'PUT' }
           }),
           serviceMappingtemplateResource: defineResource(apiVer + "/servicemapping/template", {}, {
           	  getAllserviceMapping: {method: 'GET', params: {}}
             }),
             
             provisioningMappingResource: defineResource(apiVer + "/provisioning/:provisioningId", {provisioningId: '@provisioningId'}, {
             	  getprovisiongData: {method: 'GET', params: {}, isArray: true},
                get: {method: 'GET', params: {}},
                update: { method: 'PUT' }
           }),
           
           updateProvisioningMappingResource: defineResource(apiVer + "/provisioning/updateprovisiondetails/:provisioningId", {provisioningId: '@provisioningId'}, {
             update: { method: 'PUT' }
           }),
           confirmProvisioningDetailsResource: defineResource(apiVer + "/provisioning/confirm/:provisioningId", {provisioningId: '@provisioningId'}, {
               update: { method: 'PUT' }
             }),
           provisioningResource: defineResource(apiVer + "/provisioning/:clientId", {clientId: '@clientId'}, {
          	  getprovisiongData: {method: 'GET', params: {}, isArray: true},
             get: {method: 'GET', params: {}},
             update: { method: 'PUT' }
        }),
        provisioningserviceResource: defineResource(apiVer + "/provisioning/serviceparams/:orderId", {orderId: '@orderId'}, {
      	  getprovisiongData: {method: 'GET', params: {}, isArray: true},
         get: {method: 'GET', params: {}},
         update: { method: 'PUT' }
    }),
//<<<<<<< HEAD
        
     /*   provisioningserviceResource: defineResource(apiVer + "/provisioning/serviceparams/:orderId", {orderId: '@orderId'}, {
        	  getprovisiongData: {method: 'GET', params: {}, isArray: true},
           get: {method: 'GET', params: {}},
           update: { method: 'PUT' }
      }),*/
           /*provisioningtemplateMappingResource: defineResource(apiVer + "/provisioning/template", {}, {
            	  get: {method: 'GET', params: {}}
           }),
//=======
*/        provisioningtemplateMappingResource: defineResource(apiVer + "/provisioning/template/:orderNo", {orderNo: '@orderNo'}, {
            	
           }),
           
     /*      provisioningtemplateMappingResource: defineResource(apiVer + "/provisioning/template", {}, {
         	  get: {method: 'GET', params: {}}
        }),*/
           
         provisioningCreatetemplateDataResource: defineResource(apiVer + "/provisioning/provisiontemplate/:orderId", {orderId:'@orderId'}, {
        	   get: {method: 'GET', params: {}}
           }),
         processRequestResource: defineResource(apiVer + "/provisioning/processRequest/:id", {id: '@id'}, {
         	  get: {method: 'GET', params: {}}
          }),
      
           provisioningtemplateDataResource: defineResource(apiVer + "/provisioning/serviceparmas/:orderId", {orderId:'@orderId'}, {
          	  get: {method: 'GET', params: {}}
            }),
            provisioningIpChangeResource: defineResource(apiVer + "/provisioning/ipdetails/:orderId", {orderId:'@orderId'}, {
            	  get: {method: 'GET', params: {}},
            	  update: { method: 'PUT'}
              }),
            
	       EventActionMappingResource: defineResource(apiVer + "/eventactionmapping/:id", {id:'@id'}, {
               getDetails: {method: 'GET', params: {}},
               update: { method: 'PUT'}
           }),
       
           applyPromotionCodeResource: defineResource(apiVer + "/orders/applypromo/:orderId", {orderId:'@orderId'}, {
               get: {method: 'GET', params: {}, isArray: true},
               update: { method: 'PUT' }
           }),
           
           EventActionMappingTemplateResource: defineResource(apiVer + "/eventactionmapping/template", {}, {
         	  get: {method: 'GET', params: {}}
           })  ,
           paymentGatewayResource: defineResource(apiVer + "/paymentgateways/:id", {id: '@id'}, {
     	   get: {method: 'GET', params: {}},
     	   getData: {method: 'GET', params: {id:'@id'}},
     	   update: { method: 'PUT' }
           }) ,
           downloadPaymentGatewayData: defineResource(apiVer+"/paymentgateways/download",{},{
        	   get: {method: 'GET', params: {}, isArray: true}
           }),
	       Filetrans: defineResource(apiVer + "/financialTransactions/:clientId/type", {clientId:'@clientId'}, {
           	get: {method: 'GET', params: {}, }
	       }),
	       promotionResource: defineResource(apiVer + "/promotioncode/:promotioncodeId", {promotioncodeId:'@promotioncodeId'}, {
        	  get: {method: 'GET', params: {}, isArray: true},
        	  getPrmotioncodeDetails: {method: 'GET', params: {promotioncodeId:'@promotioncodeId'}},
        	  update: { method: 'PUT' }
	       }),  
          
	       promotionTemplateResource: defineResource(apiVer + "/promotioncode/template", {}, {
        	  get: {method: 'GET', params: {}}
	       }),
	       addCountryResource: defineResource(apiVer + "/address/country/new",{},  {
        	  get: {method: 'POST', params: {}}
	       }),
	       editCountryResource: defineResource(apiVer + "/address/country/:id",{id: '@id'},  {
        	 update: { method: 'PUT' }
         }),
         addStateResource: defineResource(apiVer + "/address/state/new",{},  {
       	  get: {method: 'POST', params: {}}
       	  
        }),
        editStateResource: defineResource(apiVer + "/address/state/:id",{id: '@id'},  {
        	update: { method: 'PUT' }
         	  
         }),
        addCityResource: defineResource(apiVer + "/address/city/new",{},  {
         	  get: {method: 'POST', params: {}}
         	  
          }),
          editCityResource: defineResource(apiVer + "/address/city/:id",{id: '@id'},  {
        	  update: { method: 'PUT' }
         	  
          }),
          payInvoiceTemplateResource: defineResource(apiVer + "/invoice/:invoiceId",{invoiceId: '@invoiceId'},  {
        	  getPayInvoices: { method: 'GET', params: {},isArray: true }
         	  
          }),
          creditDistributionTemplateResource: defineResource(apiVer + "/creditdistributions/template/:clientId",{clientId:'@clientId'},  {
        	  get: { method: 'GET', params: {}}
          }),
          creditDistributionResource: defineResource(apiVer + "/creditdistributions/:clientId",{clientId:'@clientId'}, {
        	  get: { method: 'GET', params: {}}
         	  
          }),
          orderExtensionResource: defineResource(apiVer + "/orders/extension/:orderId", {orderId:'@orderId'}, {
             get: {method: 'GET', params: {}},
             update: { method: 'PUT' }
          }),
          groupsDetailsResource: defineResource(apiVer + "/groupsdetails", {}, {}),
          
          groupsDetailsProvisionResource: defineResource(apiVer + "/groupsdetails/provision/:groupId", {groupId:"@groupId"}, {}),

          ipPoolingResource: defineResource(apiVer + "/ippooling/:id", {id: '@id'}, {
         	  get: {method: 'GET', params: {}},
         	  getData: {method: 'GET', params: {id:'@id'}},
         	  update: { method: 'PUT' }
          }) ,

          ipPoolingIpStatusResource: defineResource(apiVer + "/ippooling/updatestatus", {}, {
         	  update: { method: 'PUT' }
          }) ,
          
          ipPoolingStaticIpResource: defineResource(apiVer + "/ippooling/staticip", {}, {
         	  update: { method: 'PUT' }
          }) ,

          clientIpPoolingResource: defineResource(apiVer + "/ippooling/:clientId", {clientId: '@clientId'}, {
         	  get: {method: 'GET', params: {},isArray: true},
         	 
          }) ,
          
          ipStatusResource: defineResource(apiVer + "/ippooling/ping/:id", {id: '@id'}, {
         	  get: {method: 'GET', params: {},isArray: true},
         	  update: { method: 'PUT' }
         	 
          }) ,
          
          ipPoolingTemplateResource: defineResource(apiVer + "/ippooling/template", {}, {
         	  get: {method: 'GET', params: {}},
         	  getData: {method: 'GET', params: {id:'@id'}},
         	 update: { method: 'PUT' }
          }) ,
          ipPoolUpdateResource: defineResource(apiVer + "/ippooling/id/:id", {id: '@id'}, {
         	  get: {method: 'GET', params: {}},
         	  update: { method: 'PUT' }
          }) ,
          itemSaleTemplateResource: defineResource(apiVer + "/itemsales/template", {}, {
           	 get: {method: 'GET', params: {}}
            }) ,
          itemSaleResource: defineResource(apiVer + "/itemsales", {}, {
             	 get: {method: 'GET', params: {}}
            }) ,
            officePaymentsTemplateResource: defineResource(apiVer + "/officepayments/template", {}, {
                getPayments: {method: 'GET', params: {}}
            }),
            officePaymentsResource: defineResource(apiVer + "/officepayments/:officeId", {officeId:'@officeId'}, {
                postPayments: {method: 'POST', params: {officeId:'@officeId'}}
            }),
            officeAdjustmentsTemplateResource: defineResource(apiVer + "/officeadjustments/template", {}, {
                getAdjustments: {method: 'GET', params: {}}
            }),
            officeAdjustmentsResource: defineResource(apiVer + "/officeadjustments/:officeId", {officeId:'@officeId'}, {
                postAdjustments: {method: 'POST', params: {officeId:'@officeId'}}
            }),
            officeFinancialTransactionResource: defineResource(apiVer + "/offices/financialtransactions/:officeId", {officeId:'@officeId'}, {
                get: {method: 'GET', params: {officeId:'@officeId'},isArray: true}
            }),
            agentsResource: defineResource(apiVer + "/agents", {}, {
                postAgent: {method: 'POST', params: {}}
            }),
            redemptionResource: defineResource(apiVer + "/redemption", {}, {
            }),
            ippoolingDetailsResource: defineResource(apiVer + "/ippooling/search", {query: '@query'}, {
        	  getIpAddress: {method: 'GET', params: {query: '@query'}}	
             }),
             creditCardSaveResource: defineResource(apiVer + "/clients/:clientId/carddetails", {clientId:'@clientId'}, {
              get: {method: 'GET', params: {},isArray: true}
            }),
            creditCardUpdateResource: defineResource(apiVer + "/clients/:clientId/carddetails/:id/:cardType", {clientId:'@clientId',id:'@id',cardType:'@cardType'}, {
                get: {method: 'GET', params: {}},
                update: { method: 'PUT' }
            }),
            provisioningUpdateResource: defineResource(apiVer + "/provisioning/serviceparams/:orderId", {orderId:'@orderId'}, {
                update: { method: 'PUT' }
            }),
            taxExemptionResource: defineResource(apiVer + "/taxexemption/:clientId", {clientId:'@clientId'}, {
                update: { method: 'PUT' }
            }),
            clientBillModeResource: defineResource(apiVer + "/billmodes/:clientId", {clientId:'@clientId'}, {
            	get: {method: 'GET', params: {}},
                update: { method: 'PUT' }
            }),
            planMappingResource: defineResource(apiVer + "/planmapping/:planMappingId", {planMappingId:'@planMappingId'}, {
                get: {method: 'GET', params: {}, isArray: true},
                getPlanMapping: {method: 'GET', params: {planMappingId:'@planMappingId'}},
                update: { method: 'PUT'}
            }),  
            planMappingtemplateResource: defineResource(apiVer + "/planmapping/template", {}, {
             	  getAllPlanMapping: {method: 'GET', params: {}}
            }),
            statementEmailResource: defineResource(apiVer + "/billmaster/email/:statementId", {statementId:'@statementId'}, {
                get: {method: 'GET', params: {}, isArray: true},
                update: { method: 'PUT'}
            }),
            EventValidationResource: defineResource(apiVer + "/eventvalidation/:id", {id:'@id'}, {
                get: {method: 'GET', params: {}, isArray: true},
                getDetails: {method: 'GET', params: {}},
                update: { method: 'PUT'}
            }),
            
            
            provisionactionsResource: defineResource(apiVer + "/provisioningactions/:id", {id:'@id'}, {
                get: {method: 'GET', params: {}, isArray: true},
                update: { method: 'PUT'}
            }),
            
            clientParentResource: defineResource(apiVer + "/parentclient/:clientId/:anotherresource", {clientId:'@clientId',anotherresource:'@anotherresource'}, {
                get: {method: 'GET', params: {}},
                update: { method: 'PUT'}
            }),
      
            logoutResource: defineResource(apiVer + "/logout", {id:'@id'}, {
                getAll: {method: 'GET', params: {}}
            }),
            provisionResource: defineResource(apiVer + "/adapter", {}, {
                get: {method: 'GET', params: {}}
            }),
            provisionLogResource: defineResource(apiVer + "/adapter/logs", {}, {}),
            
            cancelStatementResource: defineResource(apiVer + "/billmaster/:statementId", {statementId:'@statementId'}, {
                get: {method: 'GET', params: {}, isArray: true},
                update: { method: 'PUT'}
            }),
            
            paymentGatewayConfigurationResource:defineResource(apiVer + "/paymentgatewayconfigs/:configId",{configId : '@configId'}, {
                get: {method: 'GET', params: {}},
                update: {method: 'PUT', params: {}}
              }),
              
            checkerInboxResource: defineResource(apiVer + "/makercheckers/:templateResource", {templateResource: '@templateResource'}, {
                get: {method: 'GET', params: {}},
                search: {method: 'GET', params: {}, isArray: true}
            }),

            
            itemMasterDetailTemplateResource: defineResource(apiVer + "/itemdetails/serialnum", {}, {}),
            clientConfigurationResource:defineResource(apiVer + "/configurations/config",{}, {
                update: {method: 'PUT', params: {}}
            }),
            
            nasResource: defineResource(apiVer + "/freeradius/nas/:nasId", {nasId: '@nasId'}, {
                update: { method: 'PUT' }
             }),
             
            radServiceResource: defineResource(apiVer + "/freeradius/radservice/:radServiceId", {radServiceId:'@radServiceId'}, {
                 update: { method: 'PUT' }
              }),
              radServiceTemplateResource: defineResource(apiVer + "/freeradius/raduser2/template", {}, {}),
              radiusOnlineUser: defineResource(apiVer + "/freeradius/onlineusers", {}, {
                  update: { method: 'PUT' }
               }),
               nasReloadResource: defineResource(apiVer + "/freeradius/nas/reload", {}, {
                   update: { method: 'PUT' }
                }),

            eventActionResource: defineResource(apiVer + "/eventactions", {}, {}),
            addonsTemplateResource: defineResource(apiVer + "/addons/template", {}, {
                get: {method: 'GET', params: {}},
            }),
        
            addonsResource: defineResource(apiVer + "/addons/:addonId", {addonId :'@addonId'}, {
                get: {method: 'GET', params: {}},
                update: {method: 'PUT', params: {}}
            }),
            orderaddonTemplateResource: defineResource(apiVer + "/orderaddons/template/:planId", {planId :'@planId',chargeCode :'@chargeCode'}, {
                get: {method: 'GET', params: {}}
            }),
            
            orderaddonResource: defineResource(apiVer + "/orderaddons/:orderId", {orderId : '@orderId'}, {
                get: {method: 'GET', params: {}, isArray: true}
            }),
            
            partnerTemplateResource: defineResource(apiVer + "/partners/template", {}, {
                get: {method: 'GET', params: {}}
            }),
            
            partnerResource: defineResource(apiVer + "/partners/:partnerId", {partnerId :'@partnerId'}, {
            	 update: { method: 'PUT' }
            }),
            
            agreementTemplateResource: defineResource(apiVer + "/agreements/template", {}, {
                
            }),
            
            agreementResource: defineResource(apiVer + "/agreements/:partnerId/:agreementId/:anotherResource", {partnerId :'@partnerId',
            	agreementId:'@agreementId',anotherResource:'@anotherResource'}, {
            	 update: { method: 'PUT' }
            }),
           
            patnerDisbursementResource: defineResource(apiVer + "/patnerdisbursement", {}, {
            	update: { method: 'PUT' }
            }),
            patnerDisbursementTemplateResource: defineResource(apiVer + "/patnerdisbursement/template", {}, {
            	update: { method: 'PUT' }
            }),
            itemDetailsTempDropdownResource: defineResource(apiVer + "/itemdetails/template/dropdown", {}, {
            }),
            
            propertyCodeResource: defineResource(apiVer + "/property/:otherResource/:propertyId", {otherResource:'@otherResource',propertyId:'@propertyId'}, {
           	  getAlldetails: {method: 'GET', params: {}},
              update: { method: 'PUT' }
            }),
            
            propertyCodeTemplateResource: defineResource(apiVer + "/property/template", {}, {
            	update: { method: 'PUT' }
            }),
            
            propertydeviceMappingResource: defineResource(apiVer + "/property/allocatedevice/:clientId", {clientId:'@clientId'}, {
            	update: { method: 'PUT' }
            }),
            
            propertydeviceMappingTemaplateResource: defineResource(apiVer + "/property/propertycodes/:clientId", {clientId:'@clientId'}, {
            	 get: {method: 'GET', params: {},isArray: true}
            }),
            
            propertyTemplateResource: defineResource(apiVer + "/propertymaster/template", {}, {
            	update: { method: 'PUT' }
            }),
            
            propertyResource: defineResource(apiVer + "/propertymaster/:otherResource/:propertyId", {otherResource:'@otherResource',propertyId:'@propertyId'}, {
             	  getAlldetails: {method: 'GET', params: {}},
                update: { method: 'PUT' }
              }),
            
            serviceTransferRequestResource: defineResource(apiVer + "/servicetransfer/:clientId", {clientId:'@clientId'}, {}),
            
            KeyInfoResource: defineResource(apiVer + "/keyinfo", {},{}),
            
            feeMasterResource: defineResource(apiVer + "/feemaster/:id", {id:'@id'},{update: { method: 'PUT' }}),
            feeMasterTemplateResource: defineResource(apiVer + "/feemaster/template", {},{}),
            refundAmountResource: defineResource(apiVer + "/refund/:depositId", {depositId:'@depositId'}, {
                get: {method: 'GET', params: {}},
                update: { method: 'PUT'}
            }), 
            depositAmountResource: defineResource(apiVer + "/deposit/:client", {client:'@client'}, {}), 
      
        };
      }];
    }
  });
  mifosX.ng.services.config(function($provide) {
    $provide.provider('ResourceFactory', mifosX.services.ResourceFactoryProvider);
  }).run(function($log) { $log.info("ResourceFactory initialized"); });
}(mifosX.services || {}));
