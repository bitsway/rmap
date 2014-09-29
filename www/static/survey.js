

var apipath='http://e.businesssolutionapps.com/lscmreporting/syncmobile/';
//var apipath='http://127.0.0.1:8000/lscmreporting/syncmobile/';


//-------GET GEO LOCATION Start----------------------------
function getLocationInfo() { //location
	navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

// onSuccess Geolocation
function onSuccess(position) {		
	$("#lat").val(position.coords.latitude);
	$("#long").val(position.coords.longitude);
	
	$("#lat_p").val(position.coords.latitude);
	$("#long_p").val(position.coords.longitude);
	
	$("#errorChkVSubmit").val('Location Confirmed');
	
}

function onError(error) {
	$("#lat").val(0);
	$("#long").val(0);
	
	$("#lat_p").val(0);
	$("#long_p").val(0);
	
	}

// -------------- If Not synced, Show login
function first_page(){
	if ((localStorage.synced!='YES')){
		var url = "#login";
		$.mobile.navigate(url);		
	}
}

//================= Clear authorization
function clear_autho(){	
	localStorage.cid='';
	localStorage.user_id='';
	localStorage.user_pass='';
	localStorage.synccode='';
	localStorage.marketListStr='';
	localStorage.productListStr='';
	localStorage.marchandizingItem='';
	localStorage.distributorListStr='';	
	localStorage.synced=''
	
	localStorage.client_string=''	
	localStorage.visit_client=''
	
	localStorage.visit_type=''
	localStorage.scheduled_date=''
	localStorage.visitMarketStr=''
	localStorage.marchandizingStr=''
	localStorage.clientProfileStr=''
	
	localStorage.marketInfoLSCStr=''
	localStorage.marketInfoAkijStr=''
	localStorage.marketInfo7RingsStr=''
	localStorage.marketInfoShahStr=''
	localStorage.marketInfoScanStr=''
	
	localStorage.product_tbl_str=''
	
	
	localStorage.marchandizingStrTbl=''	
	localStorage.m_client_string=''
	
	localStorage.product_tbl_del_str=''
	
	localStorage.distributor_name=''
	localStorage.delivery_date=''
	localStorage.dis_client_string=''
	
	localStorage.plan_market=''
	localStorage.plan_date=''
	
	localStorage.m_plan_client_string=''
	localStorage.plan_ret_name=''
	
	localStorage.marketInfoStr=''
	localStorage.productOrderStr=''
	localStorage.marchandizingInfoStr=''
	
	localStorage.visit_plan_marketlist_combo=''
	localStorage.visit_plan_client_cmb_list=''
	localStorage.delivery_distributor_cmb_list=''
	localStorage.delivery_retailer_cmb_list=''
	localStorage.market_cmb_list_cp=''
	localStorage.unschedule_market_cmb_id=''
	
	localStorage.profile_m_client_org_id=''
	
	
	var url = "#login";
	$.mobile.navigate(url);	
	location.reload();
	
}

function get_login() {
	var url = "#login";
	$.mobile.navigate(url);
	}

							
//========================= Longin: Check user
function check_user() {
	var user_id=$("#user_id").val();
	var user_pass=$("#user_pass").val();
	
	//Market,product,merchandizing,distributor
		
	if (user_id=="" || user_id==undefined || user_pass=="" || user_pass==undefined){
		var url = "#login";      
		$.mobile.navigate(url);
		$("#error_login").html("Required Rep ID and Rep Pass");	
	}else{
		$("#error_login").html("");
		
		$("#loginButton").hide();
		$("#wait_image_login").show();
		
		localStorage.cid='LSCRM';
		localStorage.user_id=user_id;
   		localStorage.user_pass=user_pass;   		
		localStorage.synced='NO'
   				
		//alert(apipath+'check_user?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode);
   		//http://127.0.0.1:8000/lscmreporting/syncmobile/check_user?cid=LSCRM&rep_id=1001&rep_pass=123&synccode=
		
		$.ajax({
				 type: 'POST',
				 url: apipath+'check_user?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode,
				 success: function(result) {
					 	
						if (result==''){
							$("#wait_image_login").hide();
							$("#loginButton").show();
							$("#error_login").html('Sorry Network not available');
							
						}else{							
							var resultArray = result.split('<SYNCDATA>');			
							if (resultArray[0]=='FAILED'){
								$("#wait_image_login").hide();
								$("#loginButton").show();								
								$("#error_login").html(resultArray[1]);
								
							}else if (resultArray[0]=='SUCCESS'){
																
								localStorage.synccode=resultArray[1];
								localStorage.marketListStr=resultArray[2];
								localStorage.productListStr=resultArray[3];
								localStorage.marchandizingItem=resultArray[4];
								localStorage.distributorListStr=resultArray[5];
								
								var productList=localStorage.productListStr.split('<rd>');
								var productLength=productList.length;
								
								//------------ Order Item list								
								var product_tbl_order='<table border="0" id="order_tbl" cellpadding="0" cellspacing="0" style="background-color:#F7F7F7; border-radius:5px;">';
								for (var j=0; j < productLength; j++){
									var productArray2 = productList[j].split('<fd>');
									var product_id2=productArray2[0];	
									var product_name2=productArray2[1];
									
									var product_qty='';																		
									product_tbl_order+='<tr  style="border-bottom:1px solid #D2EEE9;"><td width="40%" style="text-align:center; padding-left:5px;"><input type="number" id="order_qty'+product_id2+'" value="'+product_qty+'" placeholder="0" ><input type="hidden" id="order_id'+product_id2+'" value="'+product_id2+'" placeholder="qty" ><input type="hidden" id="order_name'+product_id2+'" value="'+product_name2+'" placeholder="qty" ></td><td width="60%" style="text-align:left;">&nbsp;&nbsp;'+product_name2+'</td></tr>';
								}
								product_tbl_order+='</table>';								
								localStorage.product_tbl_str=product_tbl_order
								//alert(product_tbl_order);
								//--------- Delivery Item List
								
								var product_tbl_delevery='<table border="0" id="delevery_tbl" cellpadding="0" cellspacing="0" style="background-color:#F7F7F7; border-radius:5px;">';
								for (var i=0; i < productLength; i++){
									var productArray = productList[i].split('<fd>');
									var product_id=productArray[0];	
									var product_name=productArray[1];
									
									product_tbl_delevery+='<tr  style="border-bottom:1px solid #D2EEE9;"><td width="40%" style="text-align:center; padding-left:5px;"><input type="number" id="delivery_qty'+product_id+'" value="" placeholder="0" ><input type="hidden" id="delivery_id'+product_id+'" value="'+product_id+'" placeholder="qty" ><input type="hidden" id="delivery_name'+product_id+'" value="'+product_name+'" placeholder="qty" ></td><td width="60%" style="text-align:left;">&nbsp;&nbsp;'+product_name+'</td></tr>';
								}
								product_tbl_delevery+='</table>';								
								localStorage.product_tbl_del_str=product_tbl_delevery
								//alert(product_tbl_delevery);
								//------------- Visit Plan Market List / Client Profile Market List / Unschedule
								var planMarketList = localStorage.marketListStr.split('<rd>');
								var planMarketListShowLength=planMarketList.length	
																
								//var visitPlanMarketComb='<select name="visit_market" id="visit_market_cmb_id" data-native-menu="false">'
								var visitPlanMarketComb='<option value="0" >Select Market</option>'
								
								//var profileMarketComb='<select name="market_cp" id="market_cmb_id_cp" data-native-menu="false">'
								var profileMarketComb='<option value="0" >Select Market</option>'
								
								//var unscheduleMarketComb='<select name="market" id="market_cmb_id" data-native-menu="false">'
								var unscheduleMarketComb='<option value="0" >Select Market</option>'
								
								for (var k=0; k < planMarketListShowLength; k++){
									var planMarketValueArray = planMarketList[k].split('<fd>');
									planMarketID=planMarketValueArray[0];
									planMarketName=planMarketValueArray[1];
									marketID=planMarketID
									marketName=planMarketName
									
									if(planMarketID!=''){
										visitPlanMarketComb+='<option value="'+planMarketName+'-'+planMarketID+'" >'+planMarketName+'-'+planMarketID+'</option>';
										profileMarketComb+='<option value="'+marketName+'-'+marketID+'" >'+marketName+'-'+marketID+'</option>';	
										unscheduleMarketComb+='<option value="'+marketName+'-'+marketID+'" >'+marketName+'-'+marketID+'</option>';									
										}
								}
								//visitPlanMarketComb+='</select>'
								//profileMarketComb+='</select>'
								//unscheduleMarketComb+='</select>'
								
								localStorage.visit_plan_marketlist_combo=visitPlanMarketComb;
								localStorage.market_cmb_list_cp=profileMarketComb;
								localStorage.unschedule_market_cmb_id=unscheduleMarketComb
								
								//------------ Delivery Distributor Combo
								var distributor_string=localStorage.distributorListStr;
								var distributorList = distributor_string.split('<rd>');
								var distributorListShowLength=distributorList.length
								
								//var deliveryDistributorCombo='<select name="distributor" id="distributor_cmb_id" data-native-menu="false">'
								var deliveryDistributorCombo='<option value="0" >Select distributor</option>'
								
								for (var i=0; i < distributorListShowLength; i++){
									var distributorValueArray = distributorList[i].split('<fd>');
									distributorID=distributorValueArray[0];
									distributorName=distributorValueArray[1];
									if (distributorID!=''){
										deliveryDistributorCombo+='<option value="'+distributorName+'-'+distributorID+'" >'+distributorName+'-'+distributorID+'</option>';
										}		
								}								
								//deliveryDistributorCombo+='</select>'								
								localStorage.delivery_distributor_cmb_list=deliveryDistributorCombo
								//---------------
								$("#error_login").html('');
								$("#wait_image_login").hide();
								$("#loginButton").show();
								
								//----------------								
								localStorage.synced='YES';
								var url = "#pageHome";
								$.mobile.navigate(url);								
								location.reload();
								
							}else{
								$("#wait_image_login").hide();
								$("#loginButton").show();
								$("#error_login").html('Server Error');							
								}
						}
				      },
				  error: function(result) {					 
					  $("#wait_image_login").hide();
					  $("#loginButton").show();
					  $("#error_login").html('Invalid Request');
					  
					  var url = "#login";
					  $.mobile.navigate(url);	
				  }
			  });//end ajax
		  }//end else	
	}//function

//-------------- Schedule Date Page
function getScheduleDate(){
	$("#btn_schedule_date").show();
	$("#wait_image_schedule_date").hide();
	
	var search_date=$("#sch_date").val();
	
	if (search_date=='' || search_date==undefined){		
		var now = new Date();
		var month=now.getUTCMonth()+1;
		
		if (month<10){
			month="0"+month
			}
		var day=now.getUTCDate();
		if (day<10){
			day="0"+day
			}		
		search_date = now.getUTCFullYear()+ "-" + month + "-" + day;
		$("#sch_date").val(search_date);
	}
	
	var url = "#page_scheduled";
	$.mobile.navigate(url);
	}


//------------------------------------------- Schedule Visit: Get retailers
function getSheduledRetailer(){	
	var search_date=$("#sch_date").val();
	
	if (search_date=='' || search_date==undefined){		
		$("#err_retailer_date_next").text("Date Required");
	}else{
		var serch_date = new Date(search_date);	
		if (serch_date=='Invalid Date'){		
			$("#err_retailer_date_next").text("Invalid date");
		}else{
			$("#err_retailer_date_next").text("");
			$("#btn_schedule_date").hide();
			$("#wait_image_schedule_date").show();
	
			//alert(apipath+'getScheduleClientList?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&sch_date='+search_date);
			//http://127.0.0.1:8000/lscmreporting/syncmobile/getScheduleClientList?cid=LSCRM&rep_id=1001&rep_pass=123&synccode=2568&sch_date=2014-9-14
			
			// ajax-------
			$.ajax({
				 type: 'POST',
				 url: apipath+'getScheduleClientList?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&sch_date='+search_date,
				 success: function(result) {
						
						if (result==''){
							$("#err_retailer_date_next").html('Sorry Network not available');
							$("#btn_schedule_date").show();
							$("#wait_image_schedule_date").hide();
						}else{					
							var resultArray = result.split('<SYNCDATA>');			
							if (resultArray[0]=='FAILED'){						
								$("#err_retailer_date_next").html(resultArray[1]);								
								$("#btn_schedule_date").show();
								$("#wait_image_schedule_date").hide();
							
							}else if (resultArray[0]=='SUCCESS'){
														
								var client_string=resultArray[1];
																
								//----------------
								var clientList = client_string.split('<rd>');
								var clientListShowLength=clientList.length
								
								var schedule_client_combo='<option value="0" >Select Retailer</option>'						
								for (var i=0; i < clientListShowLength; i++){
									var clientValueArray = clientList[i].split('<fd>');
									var clientID=clientValueArray[0];
									var clientName=clientValueArray[1];
									if (clientID!=''){
										schedule_client_combo+='<option value="'+clientName+'-'+clientID+'" >'+clientName+'-'+clientID+'</option>';
									}
								}
																
								var schedule_client_combo_ob=$('#schedule_client_combo_id');
								schedule_client_combo_ob.empty();	
								schedule_client_combo_ob.append(schedule_client_combo);			
																
								schedule_client_combo_ob[0].selectedIndex = 0;
								
								$(".s_date").html(search_date);
								
								//-----------------
								$("#err_retailer_date_next").text("");
								$("#btn_schedule_date").show();
								$("#wait_image_schedule_date").hide();
								
								//-----
								var url = "#page_scheduled_retailer";
								$.mobile.navigate(url);	
								
								//location.reload();
								
								schedule_client_combo_ob.selectmenu("refresh");
								
							}else{						
								$("#err_retailer_date_next").html('Server Error');
								$("#btn_schedule_date").show();
								$("#wait_image_schedule_date").hide();
								}
						}
					  },
				  error: function(result) {			  
					  $("#err_retailer_date_next").html('Invalid Request');		
					  $("#btn_schedule_date").show();
					  $("#wait_image_schedule_date").hide();	  
				  }
			 });//end ajax
		
		}
	}
}

//------------------------------------------ Schedule Visit: Next button; merchandizing
function sheduledRetailerVisitNext() {
	var search_date=$("#sch_date").val();
	var visit_client=$("#schedule_client_combo_id").val();
	
	var visit_type="Scheduled";
	var scheduled_date=search_date
	
	if(visit_client=='' || visit_client==0){
			$("#err_retailer_next").text("Retailer required");
		}else{
			$("#err_retailer_next").text("");
			$("#btn_schedule_ret").hide();
			$("#wait_image_schedule_ret").show();
			
			
			visitClientId=visit_client.split('-')[1]
			
			//alert(apipath+'getClientInfo?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&client_id='+visitClientId);
   			//http://127.0.0.1:8000/lscmreporting/syncmobile/getClientInfo?cid=LSCRM&rep_id=1001&rep_pass=123&synccode=2568&client_id=R100008
			
			// ajax-------
			$.ajax({
				 type: 'POST',
				 url: apipath+'getClientInfo?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&client_id='+visitClientId,
				 success: function(result) {
						
						//alert(result);
						if (result==''){
							$("#err_retailer_next").html('Sorry Network not available');
							$("#btn_schedule_ret").show();
							$("#wait_image_schedule_ret").hide();
			
						}else{					
							var resultArray = result.split('<SYNCDATA>');			
							if (resultArray[0]=='FAILED'){						
								$("#err_retailer_next").html(resultArray[1]);
								$("#btn_schedule_ret").show();
								$("#wait_image_schedule_ret").hide();
							}else if (resultArray[0]=='SUCCESS'){
								
								var visitMarketStr=resultArray[1];
								var merItemStr=resultArray[2];
																
								
								//localStorage.visitMarketStr=visitMarketStr
								localStorage.marchandizingStr=merItemStr
								
								$(".market").html(visitMarketStr);
								$(".visit_type").html(visit_type);								
								$(".s_date").html(scheduled_date);
								$(".visit_client").html(visit_client);
								
								localStorage.visit_client=visit_client
								localStorage.visit_type=visit_type
								localStorage.scheduled_date=scheduled_date
								
								//------------------- 							
								$("#err_retailer_next").text("");
								$("#btn_schedule_ret").show();
								$("#wait_image_schedule_ret").hide();
			
								var url = "#page_visit";	
								$.mobile.navigate(url);
								
								//location.reload();
								
							}else{						
								$("#err_retailer_next").html('Server Error');	
								$("#btn_schedule_ret").show();
								$("#wait_image_schedule_ret").hide();						
								}
						}
					  },
				  error: function(result) {			  
					  $("#err_retailer_next").html('Invalid Request');
					  $("#btn_schedule_ret").show();
					  $("#wait_image_schedule_ret").hide();
				  }
			 });//end ajax			
		}	
 }

//------------------------------Unsheduled visit: market
function addMarketList() {
	//$("#btn_unschedule_market").hide();
	//$("#wait_image_unschedule_market").show();
	
	
	var unschedule_market_combo_list=localStorage.unschedule_market_cmb_id;
	
	//---
	
	var unschedule_market_combo_ob=$('#unschedule_market_combo_id');
	unschedule_market_combo_ob.empty()
	unschedule_market_combo_ob.append(unschedule_market_combo_list);
	unschedule_market_combo_ob[0].selectedIndex = 0;
	
	//-------	
	var url = "#page_market";
	$.mobile.navigate(url);
	//location.reload();
	unschedule_market_combo_ob.selectmenu("refresh");
}

//--------------------------------- Unsheduled visit: Client list by market id
function marketNext() {
	market_name=$("#unschedule_market_combo_id").val();
	
	if(market_name=='' || market_name==0){
			$("#err_market_next").text("Market required");
		}else{
			$("#err_market_next").text("");			
			$("#btn_unschedule_market").hide();
			$("#wait_image_unschedule_market").show();		
			
			
			//localStorage.visitMarketStr=market_name;
			//visitMarketStr
			var marketNameId=market_name.split('-');
			var market_Id=marketNameId[1];
			
			
			//alert(apipath+'getMarketClientList?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&market_id='+market_Id);
			//http://127.0.0.1:8000/lscmreporting/syncmobile/getMarketClientList?cid=LSCRM&rep_id=1001&rep_pass=123&synccode=7048&market_id=M000003
			// ajax-------
			$.ajax({
				 type: 'POST',
				 url: apipath+'getMarketClientList?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&market_id='+market_Id,
				 success: function(result) {
						
						//alert(result);
						if (result==''){
							$("#err_market_next").text("Sorry Network not available");	
							$("#wait_image_unschedule_market").hide();		
							$("#btn_unschedule_market").show();
						}else{					
							var resultArray = result.split('<SYNCDATA>');			
							if (resultArray[0]=='FAILED'){						
								$("#err_market_next").html(resultArray[1]);
								$("#wait_image_unschedule_market").hide();		
								$("#btn_unschedule_market").show();
							}else if (resultArray[0]=='SUCCESS'){
														
								var m_client_string=resultArray[1];
								//----------------
								
								var visit_type="Unscheduled";
								var scheduled_date="";
								
								//-----------------------------------
								
								var mClientList = m_client_string.split('<rd>');
								var mClientListShowLength=mClientList.length	
								
								var unscheduled_m_client_list='<option value="0" > Select Retailer</option>'
								for (var i=0; i < mClientListShowLength; i++){
									var mClientValueArray = mClientList[i].split('<fd>');
									var mClientID=mClientValueArray[0];
									var mClientName=mClientValueArray[1];
									if(mClientID!=''){
										unscheduled_m_client_list+='<option value="'+mClientName+'-'+mClientID+'" >'+mClientName+'-'+mClientID+'</option>';
										}								
								}
								//---
								
								var unscheduled_m_client_combo_ob=$('#unscheduled_m_client_combo_id');
								unscheduled_m_client_combo_ob.empty()
								unscheduled_m_client_combo_ob.append(unscheduled_m_client_list);
								unscheduled_m_client_combo_ob[0].selectedIndex = 0;
								
								
								$(".market").html(market_name);
								$(".visit_type").html(visit_type);								
								$(".s_date").html(scheduled_date);
								
								localStorage.visit_type=visit_type
								localStorage.scheduled_date=scheduled_date
								
								//-----------------------------------								
								$("#err_market_next").text("");
								$("#wait_image_unschedule_market").hide();		
								$("#btn_unschedule_market").show();
								
								//------- 
								var url = "#page_market_ret";	
								$.mobile.navigate(url);
								
								//location.reload();
								unscheduled_m_client_combo_ob.selectmenu("refresh");
								
								
							}else{						
								$("#err_market_next").html('Server Error');	
								$("#wait_image_unschedule_market").hide();		
								$("#btn_unschedule_market").show();						
								}
						}
					  },
				  error: function(result) {			  
					  	$("#err_market_next").html('Invalid Request');
					  	$("#wait_image_unschedule_market").hide();		
						$("#btn_unschedule_market").show();
				  }
			 });//end ajax				
		}			
}

		

//--------------------------------- Unsheduled visit: retailer next
function marketRetailerNext() {
	$("#err_m_retailer_next").text("");
	visit_client=$("#unscheduled_m_client_combo_id").val();		
	
	if(visit_client=='' || visit_client==0){
			$("#err_m_retailer_next").text("Retailer required");
		}else{
			$("#btn_unschedule_market_ret").hide();
			$("#wait_image_unschedule_market_ret").show();		
			
			
			visitClientId=visit_client.split('-')[1]
			
			//alert(apipath+'getClientInfo?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&client_id='+visitClientId);
   			//http://127.0.0.1:8000/lscmreporting/syncmobile/getClientInfo?cid=LSCRM&rep_id=1001&rep_pass=123&synccode=2568&client_id=R100008
			
			// ajax-------
			$.ajax({
				 type: 'POST',
				 url: apipath+'getClientInfo?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&client_id='+visitClientId,
				 success: function(result) {
						
						if (result==''){
							$("#err_m_retailer_next").text("Sorry Network not available");
							$("#wait_image_unschedule_market_ret").hide();		
							$("#btn_unschedule_market_ret").show();
						}else{					
							var resultArray = result.split('<SYNCDATA>');			
							if (resultArray[0]=='FAILED'){						
								$("#err_m_retailer_next").html(resultArray[1]);
								$("#wait_image_unschedule_market_ret").hide();		
								$("#btn_unschedule_market_ret").show();
		
							}else if (resultArray[0]=='SUCCESS'){
														
								var visitMarketStr=resultArray[1];
								var merItemStr=resultArray[2];
								
								//----------------								
								//localStorage.visitMarketStr=visitMarketStr
								localStorage.marchandizingStr=merItemStr
								
								
								$(".market").html(visitMarketStr);
								$(".visit_client").html(visit_client);
								localStorage.visit_client=visit_client
								
								//--------
								$("#err_m_retailer_next").text("");
								$("#wait_image_unschedule_market_ret").hide();		
								$("#btn_unschedule_market_ret").show();
		
								var url = "#page_visit";
								$.mobile.navigate(url);
								//location.reload();
								
							}else{						
								$("#err_m_retailer_next").html('Server Error');
								$("#wait_image_unschedule_market_ret").hide();		
								$("#btn_unschedule_market_ret").show();							
								}
						}
					  },
				  error: function(result) {
					  	$("#err_m_retailer_next").html('Invalid Request');
					  	$("#wait_image_unschedule_market_ret").hide();		
						$("#btn_unschedule_market_ret").show();
				  }
			 });//end ajax	
			
		}
}


//----------------- Visit: Market Info Dialog show
function marketInfo(result){		
		var brand_name=result;		
		var m_sales='';
		var m_stock='';
		var m_credit='';
		var m_price='';
		var m_free_bag='';
		var m_ret_com='';
		var m_trade_pro='';
		var m_remarks='';
		
		if(brand_name=="LSC"){
			if (localStorage.marketInfoLSCStr!="" &&  localStorage.marketInfoLSCStr!=undefined){
				brandArray=localStorage.marketInfoLSCStr.split("<fd>");				
				m_sales=brandArray[1];
				m_stock=brandArray[2];
				m_credit=brandArray[3];
				m_price=brandArray[4];
				m_free_bag=brandArray[5];
				m_ret_com=brandArray[6];
				m_trade_pro=brandArray[7];
				m_remarks=brandArray[8];				
			}			
		}else if(brand_name=="Akij"){
			if (localStorage.marketInfoAkijStr!="" &&  localStorage.marketInfoAkijStr!=undefined){
				brandArray=localStorage.marketInfoAkijStr.split("<fd>");				
				m_sales=brandArray[1];
				m_stock=brandArray[2];
				m_credit=brandArray[3];
				m_price=brandArray[4];
				m_free_bag=brandArray[5];
				m_ret_com=brandArray[6];
				m_trade_pro=brandArray[7];
				m_remarks=brandArray[8];				
			}	
		
		}else if(brand_name=="7 Ring"){
			if (localStorage.marketInfo7RingsStr!="" &&  localStorage.marketInfo7RingsStr!=undefined){
				brandArray=localStorage.marketInfo7RingsStr.split("<fd>");				
				m_sales=brandArray[1];
				m_stock=brandArray[2];
				m_credit=brandArray[3];
				m_price=brandArray[4];
				m_free_bag=brandArray[5];
				m_ret_com=brandArray[6];
				m_trade_pro=brandArray[7];
				m_remarks=brandArray[8];				
			}	
		}else if(brand_name=="Shah"){
			if (localStorage.marketInfoShahStr!="" &&  localStorage.marketInfoShahStr!=undefined){
				brandArray=localStorage.marketInfoShahStr.split("<fd>");				
				m_sales=brandArray[1];
				m_stock=brandArray[2];
				m_credit=brandArray[3];
				m_price=brandArray[4];
				m_free_bag=brandArray[5];
				m_ret_com=brandArray[6];
				m_trade_pro=brandArray[7];
				m_remarks=brandArray[8];				
			}	
		}else if(brand_name=="Scan"){
			if (localStorage.marketInfoScanStr!="" &&  localStorage.marketInfoScanStr!=undefined){
				brandArray=localStorage.marketInfoScanStr.split("<fd>");				
				m_sales=brandArray[1];
				m_stock=brandArray[2];
				m_credit=brandArray[3];
				m_price=brandArray[4];
				m_free_bag=brandArray[5];
				m_ret_com=brandArray[6];
				m_trade_pro=brandArray[7];
				m_remarks=brandArray[8];				
			}	
		}
		
		
		$("#brand_name").val(brand_name);
		
		$("#m_sales").val(m_sales);
		$("#m_stock").val(m_stock);
		$("#m_credit").val(m_credit);
		$("#m_price").val(m_price);
		$("#m_free_bag").val(m_free_bag);
		$("#m_ret_com").val(m_ret_com);
		//$( "input:radio[name='m_trade_pro'][value='"+m_trade_pro+"']" ).attr('checked','checked');
		
		//$("#m_trade_pro").val(m_trade_pro);
		
		$("#m_remarks").val(m_remarks);
		
		//--------------
		$('#m_trade_pro').empty();
		var selectOption='<option value="" >Select</option><option value="Yes" >Yes</option><option value="No" >No</option>';
		$('#m_trade_pro').append(selectOption);	
		var zselect = $("#m_trade_pro");		
		zselect.val(m_trade_pro);
		//$('#m_trade_pro :selected').text(m_trade_pro);
		
		//----------------
		var url = "#dialogMarketInfo";
		$.mobile.navigate(url);
		
		zselect.selectmenu("refresh");
		
}

//----------------- Visit: Market Info new add from Dialog
function marketInfoAdd(){	
	var m_brand_name=$("#brand_name").val();
	var m_sales=$("#m_sales").val();
	var m_stock=$("#m_stock").val();
	var m_credit=$("#m_credit").val();
	var m_price=$("#m_price").val();
	var m_free_bag=$("#m_free_bag").val();
	var m_ret_com=$("#m_ret_com").val();
	//var m_trade_pro=$("input[name='m_trade_pro']:checked").val()
	var m_trade_pro=$("#m_trade_pro").val();
	var m_remarks=$("#m_remarks").val();
	
	if (m_brand_name=='LSC'){
		localStorage.marketInfoLSCStr=m_brand_name+'<fd>'+m_sales+'<fd>'+m_stock+'<fd>'+m_credit+'<fd>'+m_price+'<fd>'+m_free_bag+'<fd>'+m_ret_com+'<fd>'+m_trade_pro+'<fd>'+m_remarks
		
	}else if (m_brand_name=='Akij'){
		localStorage.marketInfoAkijStr=m_brand_name+'<fd>'+m_sales+'<fd>'+m_stock+'<fd>'+m_credit+'<fd>'+m_price+'<fd>'+m_free_bag+'<fd>'+m_ret_com+'<fd>'+m_trade_pro+'<fd>'+m_remarks	
	
	}else if (m_brand_name=='7 Ring'){
		localStorage.marketInfo7RingsStr=m_brand_name+'<fd>'+m_sales+'<fd>'+m_stock+'<fd>'+m_credit+'<fd>'+m_price+'<fd>'+m_free_bag+'<fd>'+m_ret_com+'<fd>'+m_trade_pro+'<fd>'+m_remarks		
	
	}else if (m_brand_name=='Shah'){
		localStorage.marketInfoShahStr=m_brand_name+'<fd>'+m_sales+'<fd>'+m_stock+'<fd>'+m_credit+'<fd>'+m_price+'<fd>'+m_free_bag+'<fd>'+m_ret_com+'<fd>'+m_trade_pro+'<fd>'+m_remarks		
	
	}else if (m_brand_name=='Scan'){
		localStorage.marketInfoScanStr=m_brand_name+'<fd>'+m_sales+'<fd>'+m_stock+'<fd>'+m_credit+'<fd>'+m_price+'<fd>'+m_free_bag+'<fd>'+m_ret_com+'<fd>'+m_trade_pro+'<fd>'+m_remarks		
		}
	
	
	
	$("#brand_name").val("");
	$("#m_sales").val("");
	$("#m_stock").val("");
	$("#m_credit").val("");
	$("#m_price").val("");
	$("#m_free_bag").val("");
	$("#m_ret_com").val("");
	
	//$("#m_trade_pro").get(0).selectedIndex=0;
	
	//$("input[name='m_trade_pro']:checked").val("");
	//$( "input:radio[name='m_trade_pro'][value='']" ).attr('checked','checked');
	
	$("#m_trade_pro").val("");
	$("#m_remarks").val("");
	
	var url = "#market_info";	
	$.mobile.navigate(url);
	
	//location.reload();
	}

//----------------- Visit: Set market info data
function setMarketInfo(){
	var marketInfoStr='';
	if (localStorage.marketInfoLSCStr!="" &&  localStorage.marketInfoLSCStr!=undefined){
		marketInfoStr=localStorage.marketInfoLSCStr;		
	}
	
	if (localStorage.marketInfoAkijStr!="" &&  localStorage.marketInfoAkijStr!=undefined){
		if(marketInfoStr==""){
			marketInfoStr=localStorage.marketInfoAkijStr
		}else{
			marketInfoStr+='<rd>'+localStorage.marketInfoAkijStr
			}
	}
	
	if (localStorage.marketInfo7RingsStr!="" &&  localStorage.marketInfo7RingsStr!=undefined){
		if(marketInfoStr==""){
			marketInfoStr=localStorage.marketInfo7RingsStr
		}else{
			marketInfoStr+='<rd>'+localStorage.marketInfo7RingsStr
			}
	}
	if (localStorage.marketInfoShahStr!="" &&  localStorage.marketInfoShahStr!=undefined){
		if(marketInfoStr==""){
			marketInfoStr=localStorage.marketInfoShahStr
		}else{
			marketInfoStr+='<rd>'+localStorage.marketInfoShahStr
			}
	}
	if (localStorage.marketInfoScanStr!="" &&  localStorage.marketInfoScanStr!=undefined){
		if(marketInfoStr==""){
			marketInfoStr=localStorage.marketInfoScanStr
		}else{
			marketInfoStr+='<rd>'+localStorage.marketInfoScanStr
			}
	}
	
	localStorage.marketInfoStr=marketInfoStr;
	
	//alert(marketInfoStr);
	var url = "#page_visit";	
	$.mobile.navigate(url);
	
	}

//--------------------------------- Order: Show order from home
function getOrder(){
	//$("#product_list_tbl").html(localStorage.product_tbl_str);
	//$("#product_list_tbl").html(localStorage.product_tbl_str);
	
	//alert(localStorage.product_tbl_str);
	
	var productList=localStorage.productListStr.split('<rd>');
	var productLength=productList.length;
	
	for (var i=0; i < productLength; i++){
		var productArray2 = productList[i].split('<fd>');
		var product_id2=productArray2[0];	
		var product_name2=productArray2[1];
		$("#order_qty"+product_id2).val('');
	}
	
	
	var orderProductList=localStorage.productOrderStr.split('<rd>');
	for (var j=0; j < orderProductList.length; j++){
		orderProductIdQtyList=orderProductList[j].split('<fd>');
		if(orderProductIdQtyList.length==2){
			orderProductId=orderProductIdQtyList[0]
			orderProductQty=orderProductIdQtyList[1]
			
			$("#order_qty"+orderProductId).val(orderProductQty);
			
		}		
	}
	
	var url = "#page_order";	
	$.mobile.navigate(url);
	//location.reload();
	}

//--------------------------------- Order: Set Order data
function getOrderData(){
	var productList2=localStorage.productListStr.split('<rd>');
	var productLength2=productList2.length;
	
	var productOrderStr='';
	//alert(productLength2)
	for (var i=0; i < productLength2; i++){
		var productArray2 = productList2[i].split('<fd>');
		var product_id=productArray2[0];	
		
		var pid=$("#order_id"+product_id).val();
		var pname=$("#order_name"+product_id).val();
		var pqty=$("#order_qty"+product_id).val();
		
		if (pqty!='' && eval(pqty) > 0){
			
			if (productOrderStr==''){
				productOrderStr=pid+'<fd>'+pqty
				productOrderShowStr=pname+'('+pqty+')'
			}else{
				productOrderStr+='<rd>'+pid+'<fd>'+pqty
				productOrderShowStr+=', '+pname+'('+pqty+')'
				}			
		}
		
	};
	localStorage.productOrderStr=productOrderStr
	
	var url = "#page_visit";	
	$.mobile.navigate(url);	
	
	//var url = "#page_order";	
	//$.mobile.navigate(url);
	//location.reload();
	
	}


//------------ marchandizing: Show marchandizing 
function getMarchandizing(){
	//$("#marchandizing_tbl").html('');
	
	var marchandizingList=localStorage.marchandizingStr.split('<rd>');
	var marchandizingItemLength=marchandizingList.length;
	
	var marchandizing='<table style="width:100%" border="0" cellpadding="1px" cellspacing="0" id="tbl_marchandizing">';	
	for (var i=0; i < marchandizingItemLength; i++){
		var marchandizingArray = marchandizingList[i].split('<fd>');
		var item_id=marchandizingArray[0];
		var item_name=marchandizingArray[1];
		var item_qty=marchandizingArray[2];
		var ins_date=marchandizingArray[3];
		
		var item_visible=marchandizingArray[4];
		var item_status=marchandizingArray[5];
		
		var new_flag=marchandizingArray[7];
		
		if(item_id!='' && item_id!=undefined){
					
			var bg_color="background-color:#D8EBEB";
			
			if (new_flag==1){
				bg_color="background-color:#FFF4F4";
				}
			
			//--------------
			var visible_cmbo="";
			if(item_visible=="Yes"){
				visible_cmbo='<select name="" id="item_visible'+i+'" data-native-menu="false"><option value="" >Visible</option><option value="Yes" selected="selected" >Yes</option><option value="No" >No</option></select>';
			}else if(item_visible=="No"){
				visible_cmbo='<select name="" id="item_visible'+i+'" data-native-menu="false"><option value="" >Visible</option><option value="Yes" >Yes</option><option value="No" selected="selected">No</option></select>';
			}else{
				visible_cmbo='<select name="" id="item_visible'+i+'" data-native-menu="false"><option value="" selected="selected" >Visible</option><option value="Yes" >Yes</option><option value="No" >No</option></select>';
				}
			//-------------
			var status_cmbo="";
			if(item_status=="Good"){
				status_cmbo='<select name="" id="item_status'+i+'" data-native-menu="false"><option value="" >Status</option><option value="Good" selected="selected">Good</option><option value="Bad" >Bad</option></select>';			
			}else if(item_status=="Bad"){
				status_cmbo='<select name="" id="item_status'+i+'" data-native-menu="false"><option value="" >Status</option><option value="Good" >Good</option><option value="Bad" selected="selected">Bad</option></select>';
			}else{
				status_cmbo='<select name="" id="item_status'+i+'" data-native-menu="false"><option value="" selected="selected" >Status</option><option value="Good" >Good</option><option value="Bad" >Bad</option></select>';
				}
			
			//---------------
			var lastRow=''
			if (new_flag==1){
				lastRow='<td>Cancel</td><td ><a data-role="button" style="text-decoration:none" onclick=delete_merchandizing('+i+');>X</a></td>';
			}else{
				lastRow='<td>Dismantle</td><td ><input type="checkbox" id="" name="dismantle'+i+'" value="Yes"/></td>';
				}
			
			marchandizing+='<tr id="merchandizingrow_'+i+'" ><td style="width:100%"></br><table width="100%"  style='+bg_color+';>'+
			'<tr ><td>Item</td><td style="font-weight:bold; text-shadow:none; color:#408080;" >:'+item_name+'-'+item_id+'<input type="hidden" id="item_id'+i+'" name="" value="'+item_id+'" /><input type="hidden" id="item_name'+i+'" name="" value="'+item_name+'" /></td></tr>'+
			'<tr><td>Qty</td><td >:'+item_qty+'<input type="hidden" id="item_qty'+i+'" name="" value="'+item_qty+'" /></td></tr>'+
			'<tr><td>Installation Date</td><td >:'+ins_date+'<input type="hidden" id="ins_date'+i+'" name="" value="'+ins_date+'"/></td></tr>'+
			'<tr><td>Visible</td><td >'+visible_cmbo+'</td></tr>'+
			'<tr><td>Status</td><td >'+status_cmbo+'</td></tr>'+			
			'<tr>'+lastRow+'</tr> '+	
			
			'</table></td></tr>';	
			
			
		}
	}
	marchandizing+='</table>';
	localStorage.marchandizingStrTbl=marchandizing
	
	$("#marchandizing_tbl").html(marchandizing)
	
	//-----------------
	var url = "#marchendizing";
	$.mobile.navigate(url);
	//-----------------
	
	
	//location.reload();
	
}

//-------------- Marchandizing Delete
function delete_merchandizing(rowid){
		//alert(rowid);
		//clientDelArray.splice(rowid,1);
		//$("#btn_del_x"+rowid).parent().parent().parent().remove();
		$("#merchandizingrow_"+rowid).remove();
		
		var marchandizingList=localStorage.marchandizingStr.split('<rd>');
		marchandizingList.splice(rowid,1);
		
		var marchandizingStrLast=''
		
		var marchandizingItemLength=marchandizingList.length;
		for (var i=0; i < marchandizingItemLength; i++){
			
			var marchandizingArray = marchandizingList[i].split('<fd>');
			
			var item_id=marchandizingArray[0];
			var item_name=marchandizingArray[1];
			var item_qty=marchandizingArray[2];
			var ins_date=marchandizingArray[3];			
			var item_visible=marchandizingArray[4];
			var item_status=marchandizingArray[5];			
			var new_flag=marchandizingArray[7];
			var dismantle="No";
			
			var mz_str=item_id+'<fd>'+item_name+'<fd>'+item_qty+'<fd>'+ins_date+'<fd>'+item_visible+'<fd>'+item_status+'<fd>'+dismantle+'<fd>'+new_flag;
			
			if(marchandizingStrLast==''){
				marchandizingStrLast=mz_str;
			}else{
				marchandizingStrLast=marchandizingStrLast+'<rd>'+mz_str			
				}
			
		}		
		localStorage.marchandizingStr=marchandizingStrLast;
		
		getMarchandizing();
}


//------------ marchandizing: Set marchandizing  data
function getMarchandizingData(){
	var marchandizingList=localStorage.marchandizingStr.split('<rd>');
	
	var marchandizingItemLength=marchandizingList.length;
	
	var marchandizingStr="";
	for (var i=0; i < marchandizingItemLength; i++){		
		var item_id=$("#item_id"+i).val();
		var item_name=$("#item_name"+i).val();
		var item_qty=$("#item_qty"+i).val();
		var ins_date=$("#ins_date"+i).val();
		var item_status=$("#item_status"+i).val();
		var item_visible=$("#item_visible"+i).val();		
		var item_dismantle=$("input[name='dismantle"+i+"']:checked").val();
		
		if (item_dismantle==undefined){
			item_dismantle='NO'
		}else{
			item_dismantle='YES'
			}
		
		var marchandizingArray = marchandizingList[i].split('<fd>');
		var new_flag=0;
		if(marchandizingArray.length==8){
			new_flag=marchandizingArray[7];
			}
		
		if(item_id==undefined){
			continue;
			}
		
		//-------
		if (marchandizingStr==''){
			marchandizingStr=item_id+'<fd>'+item_name+'<fd>'+item_qty+'<fd>'+ins_date+'<fd>'+item_status+'<fd>'+item_visible+'<fd>'+item_dismantle+'<fd>'+new_flag
			
		}else{
			marchandizingStr+='<rd>'+item_id+'<fd>'+item_name+'<fd>'+item_qty+'<fd>'+ins_date+'<fd>'+item_status+'<fd>'+item_visible+'<fd>'+item_dismantle+'<fd>'+new_flag
			}	
	}
	localStorage.marchandizingInfoStr=marchandizingStr;
	
	var url = "#page_visit";	
	$.mobile.navigate(url);
}

//------------ marchandizing: marchandizing item Dialog 
function addMarchandizingItem(){	
	var marchanItem=localStorage.marchandizingItem.split('<rd>');
	
	var marchandizing_item_ob = $("#marchandizing_item_id");
	marchandizing_item_ob.empty();
	
	var mzItemOption='<option value="0" >Select</option>';
	for (var i=0; i < marchanItem.length; i++){		
		var item_name=marchanItem[i]
		var mItemIList=item_name.split('<fd>');
		var mItemId=mItemIList[0]
		var mItemName=mItemIList[1]
		if (mItemId!=''){
			mzItemOption+='<option value="'+mItemName+'-'+mItemId+'" >'+mItemName+'-'+mItemId+'</option>';
			/*ob1.append('<option value="'+mItemName+'-'+mItemId+'" >'+mItemName+'-'+mItemId+'</option>');*/
			}			
	}	
	marchandizing_item_ob.append(mzItemOption);
	marchandizing_item_ob[0].selectedIndex = 0;
	
	
	$("#mz_qty").val('');
	$("#mz_ins_date").val('');
	
	var mz_visible_ob=$("#mz_visible");
	mz_visible_ob.empty();
	mz_visible_ob.append('<option value="0" >Select</option><option value="Yes" >Yes</option><option value="No" >No</option>');
	mz_visible_ob.selectedIndex = 0;
	
	var mz_status_ob=$("#mz_status");
	mz_status_ob.empty();
	mz_status_ob.append('<option value="0" >Select</option><option value="Good" >Good</option><option value="Bad" >Bad</option>');
	mz_status_ob.selectedIndex = 0;
	
	
	//--------------
	var url = "#dialogAddItem";
	$.mobile.navigate(url);
	
	//-----------------
	marchandizing_item_ob.selectmenu("refresh");
	mz_visible_ob.selectmenu("refresh");
	mz_status_ob.selectmenu("refresh");
	
	}
	
//------------ marchandizing: marchandizing item Dialog add button 
function addMarchandizingInfo(){
	$("#err_merchandizing_dialog").text("");
	
	var mz_item_name_id=$("#marchandizing_item_id").val();
	var mz_item_name_id_List=mz_item_name_id.split('-')
	
	var mz_item_name=mz_item_name_id_List[0]
	var mz_item_id=mz_item_name_id_List[1];
	
	var mz_item_qty=$("#mz_qty").val();
	var mz_date=$("#mz_ins_date").val();
	
	var mz_status=$("#mz_status").val();
	var mz_visible=$("#mz_visible").val();
	var mz_dismantle="No";
	
	if(mz_item_name_id=='' || mz_item_qty=='' || mz_date=='' || mz_status=='' || mz_visible==''){		
		$("#err_merchandizing_dialog").text("All value required");
	}else{
		var tempQty=0
		try{
			tempQty=eval(mz_item_qty);
		}catch(ex){
			tempQty=0;
			}
		
		if(tempQty<=0){
				$("#err_merchandizing_dialog").text("Invalid Quantity");				
		}else{
			
			var mz_date_ok = new Date(mz_date);
			
			if (mz_date_ok.toString()=='Invalid Date'){		
				$("#err_merchandizing_dialog").text("Invalid date");
					
			}else{			
				var mz_n_str=mz_item_id+'<fd>'+mz_item_name+'<fd>'+mz_item_qty+'<fd>'+mz_date+'<fd>'+mz_visible+'<fd>'+mz_status+'<fd>'+mz_dismantle+'<fd>1';
				//alert(mz_n_str);	
				if(localStorage.marchandizingStr=='' || localStorage.marchandizingStr==undefined){
					localStorage.marchandizingStr=mz_n_str;
				}else{
					localStorage.marchandizingStr=localStorage.marchandizingStr+'<rd>'+mz_n_str			
					}
				
				getMarchandizing();
			
		   }//date check
		}//	qty check
		
	}//all value
	
 }//function


//------------------- Client Profile: Page from home
function addMarketListCp() {
	//$("#btn_profile_market").hide();
	//$("#wait_image_profile_market").show();		
	
	var market_cmb_list_cp=localStorage.market_cmb_list_cp;	
	//---
	
	var profile_market_cmb_id_ob=$('#profile_market_cmb_id');
	profile_market_cmb_id_ob.empty()
	profile_market_cmb_id_ob.append(market_cmb_list_cp);
	profile_market_cmb_id_ob[0].selectedIndex = 0;
	
	//-------	
	var url = "#page_market_clprofile";
	$.mobile.navigate(url);
	//location.reload();
	profile_market_cmb_id_ob.selectmenu("refresh");
}


//--------------------------------- Client Profile: Client list by market id
function marketNextCProfile() {
	$("#err_market_next_cp").html('');
	
	var market_name=$("#profile_market_cmb_id").val();
	
	if(market_name=='' || market_name==0){
			$("#err_market_next_cp").text("Market required");
		}else{
			$("#btn_profile_market").hide();
			$("#wait_image_profile_market").show();	
			
			//localStorage.visitMarketStr=market_name;
			//visitMarketStr
			var marketNameId=market_name.split('-');
			var market_Id=marketNameId[1];
			
			
			//alert(apipath+'getMarketClientList?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&market_id='+market_Id);
			//http://127.0.0.1:8000/lscmreporting/syncmobile/getMarketClientList?cid=LSCRM&rep_id=1001&rep_pass=123&synccode=7048&market_id=M000003
			// ajax-------
			$.ajax({
				 type: 'POST',
				 url: apipath+'getMarketClientList?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&market_id='+market_Id,
				 success: function(result) {
						
						//alert(result);
						if (result==''){					
							$("#err_market_next_cp").html('Sorry Network not available');
							$("#wait_image_profile_market").hide();		
							$("#btn_profile_market").show();
						}else{
							var resultArray = result.split('<SYNCDATA>');			
							if (resultArray[0]=='FAILED'){						
								$("#err_market_next_cp").html(resultArray[1]);
								$("#wait_image_profile_market").hide();		
								$("#btn_profile_market").show();
							}else if (resultArray[0]=='SUCCESS'){
														
								var m_client_string=resultArray[1];
								
								//localStorage.m_client_string=m_client_string
								//------
																
								//----------------------
								var mClientList = m_client_string.split('<rd>');
								var mClientListShowLength=mClientList.length	
								
								//var profile_m_client_combo='<select name="m_retailer" id="m_client_org_id_cp" data-native-menu="false">'
								var profile_m_client_combo='<option value="0" > Select Retailer</option>'
								
								for (var i=0; i < mClientListShowLength; i++){
									var mClientValueArray = mClientList[i].split('<fd>');
									var mClientID=mClientValueArray[0];
									var mClientName=mClientValueArray[1];
									if(mClientID!=''){
										profile_m_client_combo+='<option value="'+mClientName+'-'+mClientID+'" >'+mClientName+'-'+mClientID+'</option>';
										}								
								}								
								//---
								var profile_client_id_ob=$('#profile_client_id');
								profile_client_id_ob.empty()
								profile_client_id_ob.append(profile_m_client_combo);
								profile_client_id_ob[0].selectedIndex = 0;
																
								$(".market").html(market_name);								
								
								//---------	
								$("#err_market_next_cp").html('');
								$("#wait_image_profile_market").hide();		
								$("#btn_profile_market").show();
							
								var url = "#page_market_ret_cprofile";	
								$.mobile.navigate(url);
								//location.reload();
								profile_client_id_ob.selectmenu("refresh");
								
							}else{						
								$("#err_market_next_cp").html('Server Error');
								$("#wait_image_profile_market").hide();		
								$("#btn_profile_market").show();							
								}
						}
					  },
				  error: function(result) {			  
					  $("#err_market_next_cp").html('Invalid Request');
					  $("#wait_image_profile_market").hide();		
					  $("#btn_profile_market").show();
				  }
			 });//end ajax	
			
		}	
		
}

//--------------------------------- Client Profile: retailer next
function marketRetailerNextCProfile() {
	$("#err_m_retailer_next_cp").text("");
	$("#err_profile_next_cp").html('');
	$("#errorConfirmProfileUpdate").html('');
	
	
	var profile_client=$("#profile_client_id").val();		
	
	if(profile_client=='' || profile_client==0){
			$("#err_m_retailer_next_cp").text("Retailer required");
		}else{
			$("#btn_profile_market_ret").hide();
			$("#wait_image_profile_market_ret").show();		
			
		
			localStorage.visit_client=profile_client
			
			profileClientId=localStorage.visit_client.split('-')[1]
			
			//alert(apipath+'getClientProfile?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&client_id='+profileClientId);
   			
			// ajax-------
			$.ajax({
				 type: 'POST',
				 url: apipath+'getClientProfile?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&client_id='+profileClientId,
				 success: function(result) {
						
						//alert(result);
						if (result==''){					
							$("#err_m_retailer_next_cp").text('Sorry Network not available');
							$("#wait_image_profile_market_ret").hide();		
							$("#btn_profile_market_ret").show();
			
						}else{					
							var resultArray = result.split('<SYNCDATA>');			
							if (resultArray[0]=='FAILED'){						
								$("#err_m_retailer_next_cp").html(resultArray[1]);
								$("#wait_image_profile_market_ret").hide();		
								$("#btn_profile_market_ret").show();
							
							}else if (resultArray[0]=='SUCCESS'){
														
								var visitMarketStr=resultArray[1];	
								var clientCatStr=resultArray[2];								
								var clientProfileStr=resultArray[3];
								
								//------------------ Client Category
								var clientCatStrList=clientCatStr.split('<fd>')								
								var clientCatStrListLength=clientCatStrList.length									
								//var ob2 = $("#cp_Category");
								var cp_categoryOptions='';							
								for (var k=0; k < clientCatStrListLength; k++){
									var clientCatID = clientCatStrList[k]									
									if(clientCatID!=''){
										cp_categoryOptions+='<option value="'+clientCatID+'" >'+clientCatID+'</option>';
										}								
								}
														
								//----------------						
								//localStorage.visitMarketStr=visitMarketStr								
								//localStorage.clientProfileStr=clientProfileStr								
								
								$("#cp_marketnameid").val(visitMarketStr);
								
								var clientProfileList=clientProfileStr.split('<fd>')
								
								$("#cp_id").val(clientProfileList[0]);
								$("#cp_name").val(clientProfileList[1]);
								$("#cp_address").val(clientProfileList[2]);
								$("#cp_marketid").val(clientProfileList[3]);
								$("#cp_contact1").val(clientProfileList[4]);
								$("#cp_contact2").val(clientProfileList[5]);
								
								$("#cp_owner_name").val(clientProfileList[6]);
								$("#cp_nid").val(clientProfileList[7]);
								$("#cp_Passport").val(clientProfileList[8]);
								$("#cp_dob").val(clientProfileList[9]);
								$("#cp_dom").val(clientProfileList[10]);
								$("#cp_kidsinfo").val(clientProfileList[11]);
								$("#cp_hobby").val(clientProfileList[12]);
								//$("#cp_trade_license").val(clientProfileList[13]);
								var cp_trade_license=clientProfileList[13];
								
								$("#cp_trade_licence_no").val(clientProfileList[14]);
								//$("#cp_vat_registration").val(clientProfileList[15]);
								var cp_vat_registration=clientProfileList[15];
								
								$("#cp_vat_reg_no").val(clientProfileList[16]);
								
								$("#cp_manager_name").val(clientProfileList[17]);
								$("#cp_manager_cont_no").val(clientProfileList[18]);
								$("#cp_starting_year").val(clientProfileList[19]);
								//$("#cp_Category").val(clientProfileList[20]);
								var cp_Category=clientProfileList[20];
								
								//$("#cp_lsc_covered").val(clientProfileList[21]);
								var cp_lsc_covered=clientProfileList[21];
								
								$("#cp_monthly_sales_capacity").val(clientProfileList[22]);
								$("#cp_monthly_sales").val(clientProfileList[23]);
								//$("#cp_shop_rent_own").val(clientProfileList[24]);
								var cp_shop_rent_own=clientProfileList[24];
								
								$("#cp_warehouse_capacity").val(clientProfileList[25]);
								$("#cp_shop_size").val(clientProfileList[26]);
								$("#cp_shop_front_size").val(clientProfileList[27]);
								$("#cp_truck_number").val(clientProfileList[28]);
								$("#cp_barge_number").val(clientProfileList[29]);
								//$("#cp_status").val(clientProfileList[30]);
								var cp_status=clientProfileList[30];
								
								//------------------------------------------
								var cp_trade_license_ob=$("#cp_trade_license");
								cp_trade_license_ob.empty();
								var cp_trade_licenseOption='<option value="" >Select</option><option value="YES" >YES</option><option value="NO" >NO</option>';
								cp_trade_license_ob.append(cp_trade_licenseOption);	
								cp_trade_license_ob.val(cp_trade_license);
								
								var cp_vat_registration_ob=$("#cp_vat_registration");
								cp_vat_registration_ob.empty();
								var cp_vat_registration_obOption='<option value="" >Select</option><option value="YES" >YES</option><option value="NO" >NO</option>';
								cp_vat_registration_ob.append(cp_vat_registration_obOption);	
								cp_vat_registration_ob.val(cp_vat_registration);
								
								var cp_Category_ob=$("#cp_Category");
								cp_Category_ob.empty();
								var cp_Category_obOption=cp_categoryOptions;
								cp_Category_ob.append(cp_Category_obOption);	
								cp_Category_ob.val(cp_Category);
								
								var cp_lsc_covered_ob=$("#cp_lsc_covered");
								cp_lsc_covered_ob.empty();
								var cp_lsc_covered_obOption='<option value="" >Select</option><option value="YES" >YES</option><option value="NO" >NO</option>';
								cp_lsc_covered_ob.append(cp_lsc_covered_obOption);	
								cp_lsc_covered_ob.val(cp_lsc_covered);
								
								var cp_shop_rent_own_ob=$("#cp_shop_rent_own");
								cp_shop_rent_own_ob.empty();
								var cp_shop_rent_own_obOption='<option value="" >Select</option><option value="Rented" >Rented</option><option value="Own" >Own</option>';
								cp_shop_rent_own_ob.append(cp_shop_rent_own_obOption);	
								cp_shop_rent_own_ob.val(cp_shop_rent_own);
								
								var cp_status_ob=$("#cp_status");
								cp_status_ob.empty();
								var cp_status_obOption='<option value="" >Select</option><option value="ACTIVE" >ACTIVE</option><option value="INACTIVE" >INACTIVE</option>';
								cp_status_ob.append(cp_status_obOption);	
								cp_status_ob.val(cp_status);						
								
								//--------------------------------
								$("#wait_image_profile_market_ret").hide();		
								$("#btn_profile_market_ret").show();								
								$("#err_m_retailer_next_cp").text("");	
															
								var url = "#profile_update";
								$.mobile.navigate(url);
								
								//-----------------------								
								cp_trade_license_ob.selectmenu("refresh");
								cp_vat_registration_ob.selectmenu("refresh");
								cp_Category_ob.selectmenu("refresh");
								cp_lsc_covered_ob.selectmenu("refresh");
								cp_shop_rent_own_ob.selectmenu("refresh");
								cp_status_ob.selectmenu("refresh");
								
								//------------------------------------------
								
								
							}else{						
								$("#err_m_retailer_next_cp").html('Server Error');	
								$("#wait_image_profile_market_ret").hide();		
								$("#btn_profile_market_ret").show();						
								}
						}
					  },
				  error: function(result) {			  
					  $("#err_m_retailer_next_cp").html('Invalid Request');
					  $("#wait_image_profile_market_ret").hide();		
					  $("#btn_profile_market_ret").show();
				  }
			 });//end ajax	
			
		}
}



//--------------------------Client profile: profile button Next
var clientUpdateStr=''

function prifileInfoNext(){	
	$("#err_profile_next_cp").html('');
	$("#errorConfirmProfileUpdate").html('');
	
	clientUpdateStr=''
	
	var cp_marketnameid=$("#cp_marketnameid").val();
	
	var cp_id=$("#cp_id").val();
	var cp_name=$("#cp_name").val();
	var cp_address=$("#cp_address").val();
	var cp_marketid=$("#cp_marketid").val();
	var cp_contact1=$("#cp_contact1").val();
	var cp_contact2=$("#cp_contact2").val();
	
	var cp_owner_name=$("#cp_owner_name").val();
	var cp_nid=$("#cp_nid").val();
	var cp_Passport=$("#cp_Passport").val();
	var cp_dob=$("#cp_dob").val();
	var cp_dom=$("#cp_dom").val();
	var cp_kidsinfo=$("#cp_kidsinfo").val();
	var cp_hobby=$("#cp_hobby").val();
	var cp_trade_license=$("#cp_trade_license").val();
	var cp_trade_licence_no=$("#cp_trade_licence_no").val();
	var cp_vat_registration=$("#cp_vat_registration").val();
	var cp_vat_reg_no=$("#cp_vat_reg_no").val();
	
	var cp_manager_name=$("#cp_manager_name").val();
	var cp_manager_cont_no=$("#cp_manager_cont_no").val();
	var cp_starting_year=$("#cp_starting_year").val();
	var cp_Category=$("#cp_Category").val();
	var cp_lsc_covered=$("#cp_lsc_covered").val();
	var cp_monthly_sales_capacity=$("#cp_monthly_sales_capacity").val();
	var cp_monthly_sales=$("#cp_monthly_sales").val();
	var cp_shop_rent_own=$("#cp_shop_rent_own").val();
	var cp_warehouse_capacity=$("#cp_warehouse_capacity").val();
	var cp_shop_size=$("#cp_shop_size").val();
	var cp_shop_front_size=$("#cp_shop_front_size").val();
	var cp_truck_number=$("#cp_truck_number").val();
	var cp_barge_number=$("#cp_barge_number").val();
	var cp_status=$("#cp_status").val();
	
	if(cp_id=='' || cp_name=='' || cp_marketid==''|| cp_contact1=='' || cp_owner_name=='' || cp_trade_license=='' || cp_vat_registration=='' || cp_Category=='' || cp_lsc_covered=='' || cp_shop_rent_own=='' || cp_status==''){
		$("#err_profile_next_cp").html('Important Value Required');
	}else{
		
		//------------------------ Contact 1 check
		var contact1Flag=true;
		try{
		 	cp_contact1=eval(cp_contact1);
			if (cp_contact1<1){
				contact1Flag=false;
				}
		}catch(ex){
			contact1Flag=false;
			}
		//----	condition	
		if (contact1Flag==false){
			$("#err_profile_next_cp").html('Invalid Contact 1');			
		}else{
			
			//------------------------ Contact 2 check
			var contact2Flag=true;
			try{
				if (cp_contact2!=''){
					cp_contact2=eval(cp_contact2);
					if (cp_contact2<1){
						contact2Flag=false;
						}
				}
			}catch(ex){
				contact2Flag=false;
				}
			
			//--------- condition
			if(contact2Flag==false){
				$("#err_profile_next_cp").html('Invalid Contact 2');	
			}else{
				//------------------------ nid check
				var cp_nidFlag=true;
				try{
					if (cp_nid!=''){
						cp_nid=eval(cp_nid);
						if (cp_nid<0){
							cp_nidFlag=false;
							}
					}
				}catch(ex){
					cp_nidFlag=false;
					}
				//--------- condition
				if(cp_nidFlag==false){
					$("#err_profile_next_cp").html('Invalid NID');	
				}else{
					//--------- DOB,DOM Check
					var dateFlag=true;
					if(cp_dob!=''){
						var cp_dob_temp = new Date(cp_dob);		
						if (cp_dob_temp=='Invalid Date'){		
							$("#err_profile_next_cp").text("Invalid DOB");
							dateFlag=false;
						}
					}
					if (dateFlag==true){
						if(cp_dom!=''){
							var cp_dom_temp = new Date(cp_dom);		
							if (cp_dom_temp=='Invalid Date'){		
								$("#err_profile_next_cp").text("Invalid DOM");
								dateFlag=false;
							}						
						
						}
					}
					
					if(dateFlag==true){
						//------------------------ cp_manager_cont_no check
						var cp_manager_cont_noFlag=true;
						try{
							if (cp_manager_cont_no!=''){
								cp_manager_cont_no=eval(cp_manager_cont_no);
								if (cp_manager_cont_no<1){
									cp_manager_cont_noFlag=false;
									}
							}
						}catch(ex){
							cp_manager_cont_noFlag=false;
							}
						//--------- condition
						if(cp_manager_cont_noFlag==false){
							$("#err_profile_next_cp").html('Invalid Manager Cont. No');	
						}else{
							//------------------------ cp_starting_year check
							var cp_starting_yearFlag=true;
							try{
								if (cp_starting_year!=''){
									cp_starting_year=eval(cp_starting_year);
									if (cp_starting_year<1000){
										cp_starting_yearFlag=false;
									}
								}
							}catch(ex){
								cp_starting_yearFlag=false;
								}
							//--------- condition
							if(cp_starting_yearFlag==false){
								$("#err_profile_next_cp").html('Invalid Starting Year');	
							}else{
								
								//------------------------ cp_monthly_sales_capacity check
								var cp_monthly_sales_capacityFlag=true;
								try{
									if (cp_monthly_sales_capacity!=''){
										cp_monthly_sales_capacity=eval(cp_monthly_sales_capacity);
										if (cp_monthly_sales_capacity<0){
											cp_monthly_sales_capacityFlag=false;
										}
									}
								}catch(ex){
									cp_monthly_sales_capacityFlag=false;
									}
								//--------- condition
								if(cp_monthly_sales_capacityFlag==false){
									$("#err_profile_next_cp").html('Invalid Monthly Sales Capacity');	
								}else{
									//------------------------ cp_monthly_sales check
									var cp_monthly_salesFlag=true;
									try{
										if (cp_monthly_sales!=''){
											cp_monthly_sales=eval(cp_monthly_sales);
											if (cp_monthly_sales<0){
												cp_monthly_salesFlag=false;
											}
										}
									}catch(ex){
										cp_monthly_salesFlag=false;
										}
									//--------- condition
									if(cp_monthly_salesFlag==false){
										$("#err_profile_next_cp").html('Invalid Monthly Sales');	
									}else{
										//------------------------ cp_warehouse_capacity check
										var cp_warehouse_capacityFlag=true;
										try{
											if (cp_warehouse_capacity!=''){
												cp_warehouse_capacity=eval(cp_warehouse_capacity);
												if (cp_warehouse_capacity<0){
													cp_warehouse_capacityFlag=false;
												}
											}
										}catch(ex){
											cp_warehouse_capacityFlag=false;
											}
										//--------- condition
										if(cp_warehouse_capacityFlag==false){
											$("#err_profile_next_cp").html('Invalid Warehouse Capacity');	
										}else{
											
											//------------------------ cp_shop_size check
											var cp_shop_sizeFlag=true;
											try{
												if (cp_shop_size!=''){
													cp_shop_size=eval(cp_shop_size);
													if (cp_shop_size<0){
														cp_shop_sizeFlag=false;
													}
												}
											}catch(ex){
												cp_shop_sizeFlag=false;
												}
											//--------- condition
											if(cp_shop_sizeFlag==false){
												$("#err_profile_next_cp").html('Invalid Shop Size');	
											}else{
													//------------------------ cp_shop_front_size check
													var cp_shop_front_sizeFlag=true;
													try{
														if (cp_shop_front_size!=''){
															cp_shop_front_size=eval(cp_shop_front_size);
															if (cp_shop_front_size<0){
																cp_shop_front_sizeFlag=false;
															}
														}
													}catch(ex){
														cp_shop_front_sizeFlag=false;
														}
													//--------- condition
													if(cp_shop_front_sizeFlag==false){
														$("#err_profile_next_cp").html('Invalid Shop Front Size');	
													}else{
															//------------------------ cp_truck_number check
															var cp_truck_numberFlag=true;
															try{
																if (cp_truck_number!=''){
																	cp_truck_number=eval(cp_truck_number);
																	if (cp_truck_number<0){
																		cp_truck_numberFlag=false;
																	}
																}
															}catch(ex){
																cp_truck_numberFlag=false;
																}
															//--------- condition
															if(cp_truck_numberFlag==false){
																$("#err_profile_next_cp").html('Invalid Truck Number');	
															}else{
																//------------------------ cp_barge_number check
																var cp_barge_numberFlag=true;
																try{
																	if (cp_barge_number!=''){
																		cp_barge_number=eval(cp_barge_number);
																		if (cp_barge_number<0){
																			cp_barge_numberFlag=false;
																		}
																	}
																}catch(ex){
																	cp_barge_numberFlag=false;
																	}
																//--------- condition
																if(cp_barge_numberFlag==false){
																	$("#err_profile_next_cp").html('Invalid Barge Number');	
																}else{
																	//==============
																	
																	clientUpdateStr=cp_id+'<fd>'+cp_name+'<fd>'+cp_address+'<fd>'+cp_marketid+'<fd>'+cp_contact1+'<fd>'+cp_contact2+'<fd>'+
																	cp_owner_name+'<fd>'+cp_nid+'<fd>'+cp_Passport+'<fd>'+cp_dob+'<fd>'+cp_dom+'<fd>'+cp_kidsinfo+'<fd>'+cp_hobby+'<fd>'+cp_trade_license+'<fd>'+cp_trade_licence_no+'<fd>'+cp_vat_registration+'<fd>'+cp_vat_reg_no+'<fd>'+
																	cp_manager_name+'<fd>'+cp_manager_cont_no+'<fd>'+cp_starting_year+'<fd>'+cp_Category+'<fd>'+cp_lsc_covered+'<fd>'+cp_monthly_sales_capacity+'<fd>'+cp_monthly_sales+'<fd>'+cp_shop_rent_own+'<fd>'+cp_warehouse_capacity+'<fd>'+cp_shop_size+'<fd>'+cp_shop_front_size+'<fd>'+cp_truck_number+'<fd>'+cp_barge_number+'<fd>'+cp_status
																	
																	var url = "#page_confirm_profile_update";
																	$.mobile.navigate(url);
																	//alert(clientUpdateStr);																	
																	
																	//===============
													}//Barge (Number)
												}//Truck (Number)
											 }//Shop Front Size
											}//Shop Size
										}//Warehouse Capacity
									}//monthly sales
							  }//monthly sales capacity
							}// year check
						}//manager contact							
					 }//date				  
				}	//		NID		
			  }	//contact 2		
			}	//contact 1
		}//must value
		
	}//function
	

//--------------------------Client profile: Profile Submit

function lscProfileSubmit(){
	$("#errorConfirmProfileUpdate").html('');	
	var lat=$("#lat_p").val();
	var long=$("#long_p").val();
	
	if (clientUpdateStr==''){
		$("#errorConfirmProfileUpdate").html('Data not available');		
	}else{
		$("#btn_profile_update").hide();
		$("#wait_image_profile_update").show();		
		
		
		//alert(apipath+'visitSubmit?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&client_id='+visitClientId+'&visit_type='+visit_type+'&schedule_date='+scheduled_date+'&market_info='+marketInfoStr+'&order_info='+productOrderStr+'&merchandizing='+marchandizingInfoStr+'&lat='+lat+'&long='+long)
		// ajax-------
		$.ajax({
			 type: 'POST',
			 url: apipath+'updateClientProfile?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&client_data='+clientUpdateStr+'&lat='+lat+'&long='+long,
			 success: function(result) {
					
					//alert(result);
					if (result==''){					
						$("#errorConfirmProfileUpdate").html('Sorry Network not available');
						$("#wait_image_profile_update").hide();		
						$("#btn_profile_update").show();
		
					}else{					
						var resultArray = result.split('<SYNCDATA>');			
						if (resultArray[0]=='FAILED'){						
							$("#errorConfirmProfileUpdate").html(resultArray[1]);
							$("#wait_image_profile_update").hide();		
							$("#btn_profile_update").show();
							
						}else if (resultArray[0]=='SUCCESS'){
							
							//-----------
							clientUpdateStr=''
							
							$("#wait_image_profile_update").hide();		
							$("#btn_profile_update").show();
												
							var url = "#page_profile_update_success";	
							$.mobile.navigate(url);
							
						}else{						
							$("#errorConfirmProfileUpdate").html('Server Error');
							$("#wait_image_profile_update").hide();		
							$("#btn_profile_update").show();
							}
					}
				  },
			  error: function(result) {			  
				  $("#errorConfirmProfileUpdate").html('Invalid Request');
				  $("#wait_image_profile_update").hide();		
				  $("#btn_profile_update").show();
			  }
		 });//end ajax	
		
	}
  }


//----------------------------------delivery:  Home page Delevery button
function delivery() {
	
	//$("#wait_image_delivery_dealer").show();		
	//$("#btn_delivery_dealer").hide();
	
	var delivery_distributor_cmb_list=localStorage.delivery_distributor_cmb_list;
	
	//---
	
	var delivery_distributor_cmb_ob=$('#delivery_distributor_cmb_id');
	delivery_distributor_cmb_ob.empty()
	delivery_distributor_cmb_ob.append(delivery_distributor_cmb_list);
	delivery_distributor_cmb_ob[0].selectedIndex = 0;
	
	//-------	
	var url = "#page_del_conf";
	$.mobile.navigate(url);
	//location.reload();
	delivery_distributor_cmb_ob.selectmenu("refresh");
	
}


//----------------------------------- delivery: Distributor Next button
function distributorNext() {	
	$("#err_distributor").text("");
	
	distributor_name=$("#delivery_distributor_cmb_id").val();
	deliveryDate=$("#delivery_date").val();
	
	var now = new Date();
	var month=now.getUTCMonth()+1;
	if (month<10){
		month="0"+month
		}
	var day=now.getUTCDate();
	if (day<10){
		day="0"+day
		}
		
	var year=now.getUTCFullYear();
	
	var currentDay = new Date(year+ "-" + month + "-" + day);	
	var delivery_date = new Date(deliveryDate);
	
	if (delivery_date=='Invalid Date'){		
		$("#err_distributor").text("Invalid date");
	}else{
		if (delivery_date>currentDay){
			$("#err_distributor").text("Future date not allowed");
		}else{	
			if(distributor_name=='' || distributor_name==0){
					$("#err_distributor").text("Distributor required");
				}else{
					$("#wait_image_delivery_dealer").show();		
					$("#btn_delivery_dealer").hide();
					
					
					var distributorNameId=distributor_name.split('-');
					var dealer_id=distributorNameId[1];
					
					//alert(apipath+'getDistributorClientList?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&market_id='+market_Id);
					//http://127.0.0.1:8000/lscmreporting/syncmobile/getDistributorClientList?cid=LSCRM&rep_id=1001&rep_pass=123&synccode=7048&market_id=M000003
					// ajax-------
					$.ajax({
						 type: 'POST',
						 url: apipath+'getDistributorClientList?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&dealer_id='+dealer_id,
						 success: function(result) {
								if (result==''){					
									$("#err_distributor").html('Sorry Network not available');
									$("#wait_image_delivery_dealer").hide();		
									$("#btn_delivery_dealer").show();
								}else{					
									var resultArray = result.split('<SYNCDATA>');			
									if (resultArray[0]=='FAILED'){						
										$("#err_distributor").html(resultArray[1]);
										$("#wait_image_delivery_dealer").hide();		
										$("#btn_delivery_dealer").show();
									}else if (resultArray[0]=='SUCCESS'){
											
										var dis_client_string=resultArray[1];
										
										localStorage.delivery_date=deliveryDate;
										localStorage.dis_client_string=dis_client_string;
										localStorage.distributor_name=distributor_name;
										
										//----------------
										var distClientList = localStorage.dis_client_string.split('<rd>');
										var distClientListShowLength=distClientList.length	
										
										//var delivery_retailer_cmb='<select name="distributor_client" id="distributor_client_cmb_id" data-native-menu="false">'						
										var delivery_retailer_cmb='<option value="0" >Select Retailer</option>'
										
										for (var i=0; i < distClientListShowLength; i++){
											var distClientValueArray = distClientList[i].split('<fd>');
											var distClientID=distClientValueArray[0];
											var distClientName=distClientValueArray[1];											
											delivery_retailer_cmb+='<option value="'+distClientName+'-'+distClientID+'" >'+distClientName+'-'+distClientID+'</option>';			
										}	
										
			  							//delivery_retailer_cmb+='</select>'
										//localStorage.delivery_retailer_cmb_list=delivery_retailer_cmb
										
										$(".delivery_dt").html(deliveryDate);
										$(".distributor").html(distributor_name);
										
										//$("#del_product_list_tbl").html(localStorage.product_tbl_del_str);
										
										var delivery_retailer_cmb_ob=$('#delivery_retailer_cmb_id');
										delivery_retailer_cmb_ob.empty()
										delivery_retailer_cmb_ob.append(delivery_retailer_cmb);
										delivery_retailer_cmb_ob[0].selectedIndex = 0;
										
										//----------------	
										$("#err_distributor").text("");	
										$("#wait_image_delivery_dealer").hide();		
										$("#btn_delivery_dealer").show();
											
																			
										var url = "#page_del_item";	
										$.mobile.navigate(url);
										//location.reload();
										delivery_retailer_cmb_ob.selectmenu("refresh");
										
										
									}else{						
										$("#err_distributor").html('Server Error');	
										$("#wait_image_delivery_dealer").hide();		
										$("#btn_delivery_dealer").show();						
										}
								}
							  },
						  error: function(result) {			  
							  	$("#err_distributor").html('Invalid Request');
							  	$("#wait_image_delivery_dealer").hide();		
								$("#btn_delivery_dealer").show();
						  }
					 });//end ajax	
			}
		}
	}
	
}

//---------------------------------------delivery: Add delivery Item
var dist_retailer_name="";
var del_supercrit="";
var del_powercrit="";
var clientDelArray=[]

function addDeliveryItem(){
	$("#err_d_retailer").text("");
	
	dist_retailer_name=$("#delivery_retailer_cmb_id").val();
	clientNameIdList=dist_retailer_name.split('-')
	clientId='';
	clientName='';
	if (clientNameIdList.length==2){
		clientName=clientNameIdList[0]
		clientId=clientNameIdList[1]
		}
	
	if(dist_retailer_name=='' || dist_retailer_name==0){
			$("#err_d_retailer").text("Retailer required");
	}else{
		var productList2=localStorage.productListStr.split('<rd>');
		var productLength2=productList2.length;
		
		var productDeleveryStrShow='';	
		var validFlag=false
		for (var i=0; i < productLength2; i++){
			var productArray = productList2[i].split('<fd>');
			var product_id=productArray[0];	
			var product_name=productArray[1];
						
			var pid=$("#delivery_id"+product_id).val();
			var pname=$("#delivery_name"+product_id).val();
			var pQty=$("#delivery_qty"+product_id).val();	
			
			var pqty=0
			try{
				pqty=eval(pQty)
			}catch(ex){
				pqty=0
				validFlag=false
			}
			
			if (pqty!='' && pqty > 0){
				validFlag=true
				if (productDeleveryStrShow==''){
					productDeleveryStrShow=pid+'<fd>'+pqty+'<fd>'+pname					
				}else{
					productDeleveryStrShow+='<rd>'+pid+'<fd>'+pqty+'<fd>'+pname					
					}			
			}			
		}
		
		if (validFlag==true){
			dictList={'clientId':clientId,'clientName':clientName,'clientData':productDeleveryStrShow}
			clientDelArray.push(dictList)
			$("#err_d_retailer").text( clientName+'-'+clientId+", Added successfully.");
			
			}else{
				$("#err_d_retailer").text("Valid Qty required");
			}
					
		}
	}

//--------------------------------------------delivery: Preview delevery Item
function previewDelivery(){
	$("#err_d_retailer").text("");
	
	arrayLength=clientDelArray.length
	
	if(arrayLength<=0){
		$("#err_d_retailer").text("Data not available");		
	}else{
		
		var prev_del_tbl='';	
		var delivery_pro_list=[];
		var deleveryItemArray =[];
		var item_qty='';
		var item_name='';
		var i=0;
		var j=0;
		
		$('#tbl_delivery_item_prev').empty();				
		
		
		for (i=0; i < arrayLength; i++){		
			clientDictData=clientDelArray[i]
			
			clientID=clientDictData['clientId']
			clientName=clientDictData['clientName']
			clientData=clientDictData['clientData']
			
			//alert(clientID+','+clientData);
				
			prev_del_tbl="<table style='width:100%' border='0' cellpadding='0' cellspacing='0'><tr><td width='99%' colspan='2' style='background-color:#92C9C9; color:#F2F9F9; text-shadow:none;'><b>"+clientName+"-"+clientID+"</b><input type='hidden' id='clientId' value='"+clientId+"'></td><td width='1%' style='background-color:#92C9C9; text-align:right; color:#F2F9F9;'><a id='btn_del_x"+i+"' onclick=delete_delivery('"+i+"');>X</a></td></tr>";
			
			delivery_pro_list=clientData.split('<rd>');
			for (j=0; j < delivery_pro_list.length; j++){
				deleveryItemArray = delivery_pro_list[j].split('<fd>');
				
				item_qty=deleveryItemArray[1];
				item_name=deleveryItemArray[2];
				
				prev_del_tbl+="<tr><td width='20%'>"+item_qty+"</td><td colspan='2' width='80%'>"+item_name+"</td></tr>";
				
				}
				
			prev_del_tbl+="</table>";
			
			//alert(prev_del_tbl);
			
			
			
			$("#tbl_delivery_item_prev").append(prev_del_tbl).trigger('create');			
				
			}
			
			
			var url = "#page_del_preview";	
				$.mobile.navigate(url);
	  }
	}

//--------------------------------------------delivery: Delete delevery Item
function delete_delivery(rowid){
		//alert(rowid);
		clientDelArray.splice(rowid,1);
		$("#btn_del_x"+rowid).parent().parent().parent().remove();
	}

//--------------------------------------------delivery: Submit delevery data
function deliverySubmit(){	
	$("#error_del_submit").text("");
		
	var lat=$("#lat").val();
	var long=$("#long").val();
	
	arrayLength=clientDelArray.length
	if(arrayLength<=0){
		$("#error_del_submit").text("Data not available");		
	}else{		
		del_data=''
		for (i=0; i < arrayLength; i++){		
			clientDictData=clientDelArray[i]
			
			clientID=clientDictData['clientId']
			clientData=clientDictData['clientData']
			
			itemQtyStr=''
			delivery_pro_list=clientData.split('<rd>');
			for (j=0; j < delivery_pro_list.length; j++){
				deleveryItemArray = delivery_pro_list[j].split('<fd>');
				item_id=deleveryItemArray[0];
				item_qty=deleveryItemArray[1];
				
				if (itemQtyStr==''){
					itemQtyStr=item_id+'<fd>'+item_qty
				}else{
					itemQtyStr+='<fdfd>'+item_id+'<fd>'+item_qty						
				}
			   }
			
			if (del_data==''){
					del_data=clientID+'<rd>'+itemQtyStr
			}else{
				del_data+='<rdrd>'+clientID+'<rd>'+itemQtyStr		
			}		
		}
		
		if(del_data==''){		
			$("#error_del_submit").text("Data required");
		}else{
			var distributorNameId=localStorage.distributor_name.split('-');
			var dealer_id=distributorNameId[1];			
			var deliveryDate=localStorage.delivery_date;
			
			if(dealer_id=='' || deliveryDate==''){
				$("#error_del_submit").text("Distributor/Delivery Date not available");
			}else{
				
				$("#wait_image_delivery_submit").show();		
				$("#btn_delivery_submit").hide();
				
				//alert(apipath+'visitSubmit?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&client_id='+visitClientId+'&visit_type='+visit_type+'&schedule_date='+scheduled_date+'&market_info='+marketInfoStr+'&order_info='+productOrderStr+'&merchandizing='+marchandizingInfoStr+'&lat='+lat+'&long='+long)
				// ajax-------
				$.ajax({
					 type: 'POST',
					 url: apipath+'deliverySubmit?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&depot_id='+dealer_id+'&delivery_date='+deliveryDate+'&delivery_data='+del_data+'&lat='+lat+'&long='+long,
					 success: function(result) {
							
							//alert(result);
							if (result==''){					
								$("#error_del_submit").html('Sorry Network not available');								
								$("#wait_image_delivery_submit").hide();		
								$("#btn_delivery_submit").show();
							}else{					
								var resultArray = result.split('<SYNCDATA>');			
								if (resultArray[0]=='FAILED'){						
									$("#error_del_submit").html(resultArray[1]);
									$("#wait_image_delivery_submit").hide();		
									$("#btn_delivery_submit").show();
									
								}else if (resultArray[0]=='SUCCESS'){
									
									//-----------
									clientDelArray=[]
									localStorage.distributor_name=''	
									localStorage.delivery_date=''
									localStorage.dis_client_string=''		
									//-------------
									$("#error_del_submit").html('');
									$("#wait_image_delivery_submit").hide();		
									$("#btn_delivery_submit").show();
								
									var url = "#page_delivery_success";	
									$.mobile.navigate(url);
									//location.reload();
									
								}else{						
									$("#error_del_submit").html('Server Error');		
									$("#wait_image_delivery_submit").hide();		
									$("#btn_delivery_submit").show();					
									}
							}
						  },
					  error: function(result) {			  
						  	$("#error_del_submit").html('Invalid Request');
						  	$("#wait_image_delivery_submit").hide();		
							$("#btn_delivery_submit").show();
					  }
				 });//end ajax	
						
			}
		}
	
	}
}


//----------------------------------Home Page: Visit Plan button click
var plan_retailer_name="";
var planRetailerArray=[]

function addVisitPlanMarketList() {	
	//$("#btn_visit_plan_market").hide();
	//$("#wait_image_visit_plan_market").show();	
	
	var visit_market_cmb_list=localStorage.visit_plan_marketlist_combo;
	
	//---
	var visit_market_cmb_id_ob=$('#visit_market_cmb_id');
	visit_market_cmb_id_ob.empty()
	visit_market_cmb_id_ob.append(visit_market_cmb_list);
	visit_market_cmb_id_ob[0].selectedIndex = 0;
	
	//-------	
	var url = "#page_market_visit_plan";
	$.mobile.navigate(url);
	//location.reload();
	visit_market_cmb_id_ob.selectmenu("refresh");
		
}

//----------------------------------Visit Plan: get client by market
function visitPlanMarketNext() {
	$("#err_p_market").text("");
	
	planMarket=$("#visit_market_cmb_id").val();
	planDate=$("#plan_date").val();	
	
	var now = new Date();
	var month=now.getUTCMonth()+1;
	if (month<10){
		month="0"+month
		}
	var day=now.getUTCDate();
	if (day<10){
		day="0"+day
		}
	
	var year=now.getUTCFullYear();
	
	var currentDay = new Date(year+ "-" + month + "-" + day);	
	var visit_plan_d = new Date(planDate);
	
	if (visit_plan_d=='Invalid Date'){		
		$("#err_p_market").text("Invalid date");
	}else{
		if (visit_plan_d<currentDay){
			$("#err_p_market").text("Plan date can not be previous date");
		}else{
			if(planMarket=='' || planMarket==0){
					$("#err_p_market").text("Market required");
				}else{		
					$("#btn_visit_plan_market").hide();
					$("#wait_image_visit_plan_market").show();		
					
					
					var marketNameId=planMarket.split('-');
					var market_Id=marketNameId[1];
					
					
					//alert(apipath+'getMarketClientList?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&market_id='+market_Id);
					//http://127.0.0.1:8000/lscmreporting/syncmobile/getMarketClientList?cid=LSCRM&rep_id=1001&rep_pass=123&synccode=7048&market_id=M000003
					// ajax-------
					$.ajax({
						 type: 'POST',
						 url: apipath+'getMarketClientList?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&market_id='+market_Id,
						 success: function(result){								
								if (result==''){					
									$("#err_p_market").text('Sorry Network not available');
									$("#wait_image_visit_plan_market").hide();		
									$("#btn_visit_plan_market").show();
								}else{			
									var resultArray = result.split('<SYNCDATA>');			
									if (resultArray[0]=='FAILED'){						
										$("#err_p_market").html(resultArray[1]);
										$("#wait_image_visit_plan_market").hide();		
										$("#btn_visit_plan_market").show();
									}else if (resultArray[0]=='SUCCESS'){
										var plan_client_string=resultArray[1];
										
																				
										localStorage.plan_market=planMarket;
										localStorage.plan_date=planDate;
										//localStorage.m_plan_client_string=plan_client_string
										
										//----------------------------------- Retailer Combo										
										var mPlanClientList = plan_client_string.split('<rd>');
										var mPlanClientListShowLength=mPlanClientList.length	
										
										//var visit_plan_client_cmb_list='<select name="visit_plan_client" id="visit_plan_client_cmb_id" data-native-menu="false">'							
										var visit_plan_client_cmb_list='<option value="0" >Select retailer</option>'
										for (var i=0; i < mPlanClientListShowLength; i++){
											var mPlanClientValueArray = mPlanClientList[i].split('<fd>');
											var mPlanClientID=mPlanClientValueArray[0];
											var mPlanClientName=mPlanClientValueArray[1];
											if (mPlanClientID!=''){
												visit_plan_client_cmb_list+='<option value="'+mPlanClientName+'-'+mPlanClientID+'" >'+mPlanClientName+'-'+mPlanClientID+'</option>';
												}											
										}
										//visit_plan_client_cmb_list+='</select>'
										
										//localStorage.visit_plan_client_cmb_list=visit_plan_client_cmb_list
										
										var visit_plan_client_cmb_id_ob=$('#visit_plan_client_cmb_id');
										visit_plan_client_cmb_id_ob.empty()										
										visit_plan_client_cmb_id_ob.append(visit_plan_client_cmb_list);
										
										//visit_plan_client_cmb_id_ob.val('0');
										visit_plan_client_cmb_id_ob[0].selectedIndex = 0;
										
										$(".visit_plan_date").html(planDate);
										$(".plan_market").html(planMarket);	
										
										$("#tbl_visit_plan_rev").empty();
										$("#tbl_visit_plan_rev").append('<tr ><td colspan="2" style="background-color:#92C9C9; color:#F2F9F9; text-shadow:none;"><b>Retailer Name</b></td></tr>');
										
										planRetailerArray=[]
										
										//-----------------------------------										
										$("#err_p_market").text("");
										$("#wait_image_visit_plan_market").hide();		
										$("#btn_visit_plan_market").show();
									
										var url = "#page_plan";			
										$.mobile.navigate(url);
										//location.reload();
										visit_plan_client_cmb_id_ob.selectmenu("refresh");
										
															
									}else{						
										$("#err_p_market").html('Server Error');			
										$("#wait_image_visit_plan_market").hide();		
										$("#btn_visit_plan_market").show();				
										}
								}
							  },
						  error: function(result) {			  
							  $("#err_p_market").html('Invalid Request');
							  $("#wait_image_visit_plan_market").hide();		
							  $("#btn_visit_plan_market").show();
						  }
					 });//end ajax	
					
				}			
		}
	}
}


//----------------------------------Visit Plan: Add Retailer

function addVisitPlanRetailer(){
	$("#err_plan_visit").html('');
	plan_retailer_name=$("#visit_plan_client_cmb_id").val();
	
	if(plan_retailer_name=='' || plan_retailer_name==0){
		$("#err_plan_visit").html('Retailer required');		
	}else{
		var plan_retailer_NameId=plan_retailer_name.split('-');
		var retailer_Id=plan_retailer_NameId[1];
		var indexVal=planRetailerArray.indexOf(retailer_Id);
		
		if(indexVal<0){
			planRetailerArray.push(retailer_Id)			
			$("#tbl_visit_plan_rev").append("<tr id='planRetailer"+retailer_Id+"'><td class='retailer_name' width='90%'>"+plan_retailer_name+"</td><td width='10%' style='text-align:center'><a onClick=deletePlanRetailer('"+retailer_Id+"');> X </a></td></tr>");
		}else{
			$("#err_plan_visit").html('already exist');				
			}		
	 }	
	}

//----------------------------------Visit Plan: Delete Retailer
function deletePlanRetailer(retid){		
		var index=planRetailerArray.indexOf(retid)		
		planRetailerArray.splice(index,1);
		
		$("#planRetailer"+retid).remove();
				
	}

//----------------------------------Visit Plan: Delete Retailer
function visitPlanSubmit(){
	$("#err_plan_visit").html('');
	plan_ret_list_str=''
	
	arrayLength=planRetailerArray.length
	
	if(arrayLength<=0){
		$("#err_plan_visit").text("Data not available");		
	}else{
		for (i=0; i < arrayLength; i++){		
			planRetailerId=planRetailerArray[i]
			
			if(plan_ret_list_str==""){
			  plan_ret_list_str=planRetailerId
			 }else{
				  plan_ret_list_str=plan_ret_list_str+'<fd>'+planRetailerId
			 }
		}
		//------------------
		$("#btn_visit_plan_submit").hide();
		$("#wait_image_visit_plan_submit").show();		
		
				
		var marketNameId=localStorage.plan_market.split('-');
		var market_Id=marketNameId[1];
		planDate=localStorage.plan_date;
		
		//alert(apipath+'setScheduleClientList?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&market_id='+market_Id);
		// ajax-------
		$.ajax({
			 type: 'POST',
			 url: apipath+'setScheduleClientList?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&market_id='+market_Id+'&plan_date='+planDate+'&client_list='+plan_ret_list_str,
			 success: function(result){								
					if (result==''){					
						$("#err_plan_visit").html('Sorry Network not available');
						$("#wait_image_visit_plan_submit").hide();		
						$("#btn_visit_plan_submit").show();
					}else{			
						var resultArray = result.split('<SYNCDATA>');			
						if (resultArray[0]=='FAILED'){						
							$("#err_plan_visit").html(resultArray[1]);
							$("#wait_image_visit_plan_submit").hide();		
							$("#btn_visit_plan_submit").show();
						}else if (resultArray[0]=='SUCCESS'){
							var plan_client_string=resultArray[1];
							
							localStorage.plan_market='';
							localStorage.plan_date=''
							plan_ret_list_str=''
							planRetailerArray=[]
							
							$("#err_plan_visit").text("");
							$("#wait_image_visit_plan_submit").hide();		
							$("#btn_visit_plan_submit").show();
						
							var url = "#page_visit_plan_success";			
							$.mobile.navigate(url);
							//location.reload();
							
						}else{						
							$("#err_plan_visit").html('Server Error');	
							$("#wait_image_visit_plan_submit").hide();		
							$("#btn_visit_plan_submit").show();						
							}
					}
				  },
			  error: function(result) {			  
				  $("#err_plan_visit").html('Invalid Request');
				  $("#wait_image_visit_plan_submit").hide();		
				  $("#btn_visit_plan_submit").show();
			  }
		 });//end ajax	
		
		//--------------------
	  }
	
	}

//-----VISIT SUBMIT
function lscVisitSubmit(){	
	$("#errorChkVSubmit").text("");
	
	visitClientId=localStorage.visit_client.split('-')[1]	
	visit_type=localStorage.visit_type
	scheduled_date=localStorage.scheduled_date
	
	marketInfoStr=localStorage.marketInfoStr
	productOrderStr=localStorage.productOrderStr
	marchandizingInfoStr=localStorage.marchandizingInfoStr
	if (marketInfoStr==undefined){
		marketInfoStr=''
		}
	if (productOrderStr==undefined){
		productOrderStr=''
		}
	if (marchandizingInfoStr==undefined){
		marchandizingInfoStr=''
		}
	
	var lat=$("#lat").val();
	var long=$("#long").val();
	
	if (visitClientId=='' || visitClientId==undefined){
		$("#errorChkVSubmit").html('Invalid Client');		
	}else{
		if(visit_type=='' || visit_type==undefined){
			$("#errorChkVSubmit").html('Invalid Visit Type');
		}else{
			$("#btn_visit_submit").hide();
			$("#wait_image_visit_submit").show();		
			
			
			//alert(apipath+'visitSubmit?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&client_id='+visitClientId+'&visit_type='+visit_type+'&schedule_date='+scheduled_date+'&market_info='+marketInfoStr+'&order_info='+productOrderStr+'&merchandizing='+marchandizingInfoStr+'&lat='+lat+'&long='+long)
			// ajax-------
			$.ajax({
				 type: 'POST',
				 url: apipath+'visitSubmit?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&client_id='+visitClientId+'&visit_type='+visit_type+'&schedule_date='+scheduled_date+'&market_info='+marketInfoStr+'&order_info='+productOrderStr+'&merchandizing='+marchandizingInfoStr+'&lat='+lat+'&long='+long,
				 success: function(result) {
						
						//alert(result);
						if (result==''){					
							$("#errorChkVSubmit").html('Sorry Network not available');
							$("#wait_image_visit_submit").hide();
							$("#btn_visit_submit").show();									
						}else{					
							var resultArray = result.split('<SYNCDATA>');			
							if (resultArray[0]=='FAILED'){						
								$("#errorChkVSubmit").html(resultArray[1]);
								$("#wait_image_visit_submit").hide();
								$("#btn_visit_submit").show();	
							}else if (resultArray[0]=='SUCCESS'){
								
								//-----------
								localStorage.visit_client=''
								localStorage.visit_type=''
								localStorage.scheduled_date=''
								localStorage.marchandizingStr=''
								
								localStorage.marketInfoLSCStr=''
								localStorage.marketInfoAkijStr=''
								localStorage.marketInfo7RingsStr=''
								localStorage.marketInfoShahStr=''
								localStorage.marketInfoScanStr=''
								
								localStorage.marketInfoStr=''
								localStorage.productOrderStr=''
								localStorage.marchandizingInfoStr=''							
								//-------------
								$("#errorChkVSubmit").html('');
								$("#wait_image_visit_submit").hide();
								$("#btn_visit_submit").show();
								
								var url = "#page_confirm_visit_success";	
								$.mobile.navigate(url);
								//location.reload();
								
							}else{						
								$("#errorChkVSubmit").html('Server Error');
								$("#wait_image_visit_submit").hide();
								$("#btn_visit_submit").show();								
								}
						}
					  },
				  error: function(result) {			  
					  	$("#errorChkVSubmit").html('Invalid Request');
					  	$("#wait_image_visit_submit").hide();
						$("#btn_visit_submit").show();	
				  }
			 });//end ajax	
		}
	}
  }




//--------------------------------------------- Exit Application
function exit() {
navigator.app.exitApp();
}

// ----------------Camera-----------------------------------------------


//Image
function getImage() {
	navigator.camera.getPicture(onSuccessV, onFailV, { quality: 10,
		destinationType: Camera.DestinationType.FILE_URI });
}
function onSuccessV(imageURI) {
    var image = document.getElementById('myImage');
    image.src = imageURI;
	imagePath = imageURI;
	$("#lscPhoto").val(imagePath);
}
function onFailV(message) {
	imagePath="";
    alert('Failed because: ' + message);
}

//image Profile
function getImageProfile() {	
	navigator.camera.getPicture(onSuccessProfile, onFailProfile, { quality: 10,
		destinationType: Camera.DestinationType.FILE_URI });
}
function onSuccessProfile(imageURI) {
    var image = document.getElementById('myImageProfile');
    image.src = imageURI;
	imagePath = imageURI;
	$("#lscPhotoProfile").val(imagePath);
}
function onFailProfile(message) {
	imagePath="";
    alert('Failed because: ' + message);
}

//------------------------------------------------------------------------------
//File upload 
function uploadPhoto(imageURI, imageName) {
    var options = new FileUploadOptions();
    options.fileKey="upload";
//    options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
    options.fileName=imageName;
//	options.fileName = options.fileName
    options.mimeType="image/jpeg";

    var params = {};
    params.value1 = "test";
    params.value2 = "param";

    options.params = params;

    var ft = new FileTransfer();
     ft.upload(imageURI, encodeURI("http://m.businesssolutionapps.com/welcome/wab_sync/fileUploader/"),win,fail,options);
	//ft.upload(imageURI, encodeURI("http://127.0.0.1:8000/welcome/wab_sync/fileUploader/"),win,fail,options);
}

function win(r) {
//    console.log("Code = " + r.responseCode);
//    console.log("Response = " + r.response);
//    console.log("Sent = " + r.bytesSent);
}

function fail(error) {
	$(".errorChk").text('Memory Error. Please Save and Go to Review, Then take new picture and Submit');
    //alert("An error has occurred: Code = " + error.code);
//    console.log("upload error source " + error.source);
//    console.log("upload error target " + error.target);
}
