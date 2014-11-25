
//var apipath='http://e.businesssolutionapps.com/lscmreporting/syncmobile/';
//var apipath='http://127.0.0.1:8000/lscmreporting/syncmobile/';

//var apipath_base_photo_dm='http://localhost/dmpath/index.php?CID=LSCRM&HTTPPASS=e99business321cba'

//var apipath_base_photo_dm='http://e.businesssolutionapps.com/syncmobile/dmpath?CID=LSCRM&HTTPPASS=e99business321cba'
var apipath_base_photo_dm='http://e.businesssolutionapps.com/lscrmap/syncmobile_new/dmpath?CID=LSCRM&HTTPPASS=e99business321cba'
//var apipath_base_photo_dm='http://127.0.0.1:8000/lscmreporting/syncmobile/dmpath?CID=LSCRM&HTTPPASS=e99business321cba'


var mobile_off_flag=0;

//-------GET GEO LOCATION
function getLocationInfo() { //location
	navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

// onSuccess Geolocation
function onSuccess(position) {
	$("#lat").val(position.coords.latitude);
	$("#long").val(position.coords.longitude);
	
	$("#lat_p").val(position.coords.latitude);
	$("#long_p").val(position.coords.longitude);
	
	$("#checkLocation").html('Location Confirmed');
	$("#checkLocationProfileUpdate").html('Location Confirmed');	
}

function onError(error) {
	$("#lat").val(0);
	$("#long").val(0);
	
	$("#lat_p").val(0);
	$("#long_p").val(0);
	
	$("#checkLocation").html('Location not found');
	$("#checkLocationProfileUpdate").html('Location not found');
	}

// -------------- If Not synced, Show login
function first_page(){
	if ((localStorage.synced!='YES')){
		var url = "#login";
		$.mobile.navigate(url);		
	}
}

// -------------- visit page show if mobile off 
function cancelVisitPage(){
	localStorage.visit_page=""
	mobile_off_flag=0;
	
	localStorage.visitMarketStr=""
	localStorage.visit_distributor_nameid=""
	localStorage.visit_type=""
	localStorage.scheduled_date=""
	localStorage.visit_client=""
	
	var url = "#pageHome";
	$.mobile.navigate(url);
}

//================= Clear authorization
function clear_autho(){	
	var check_clear=$("input[name='clear_auth_check']:checked").val();
	
	if(check_clear!='Yes'){
		$("#error_login").html("Required Confirm Clear");			
	}else{
		localStorage.base_url='';
		localStorage.photo_url='';
		localStorage.photo_submit_url='';
		
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
		localStorage.visit_distributor_nameid=''
		localStorage.marchandizingStr=''
		localStorage.clientProfileStr=''
		
			
		localStorage.product_tbl_str=''
		
		localStorage.product_tbl_del_str=''
		
		localStorage.distributor_name=''
		localStorage.delivery_date=''
		localStorage.dis_client_string=''
		
		localStorage.plan_market=''
		localStorage.plan_date=''
		
		localStorage.m_plan_client_string=''
		localStorage.plan_ret_name=''
		
		localStorage.marketInfoStr=''
		localStorage.marketInfoSubmitStr=''
		localStorage.productOrderStr=''
		localStorage.marchandizingInfoStr=''
		
		localStorage.visit_plan_marketlist_combo=''
		localStorage.visit_plan_client_cmb_list=''
		localStorage.delivery_distributor_cmb_list=''
		localStorage.delivery_retailer_cmb_list=''
		localStorage.market_cmb_list_cp=''
		localStorage.unschedule_market_cmb_id=''
		
		localStorage.profile_m_client_org_id=''
		
		//----------
		localStorage.campaign_string=''	
		localStorage.visit_camp_list_str=''
		localStorage.visit_camp_submit_str=''
		//------
		localStorage.brand_list_string=''
		
		localStorage.visit_page=""
		
		localStorage.region_string=""
		
		
		//----------- empty brand data from local storage
		var brandList = localStorage.brand_list_string.split('<rd>');
		var brandListLength=brandList.length	
		for (var i=0; i < brandListLength; i++){
			var brandName = brandList[i]
			if(brandName!=""){
				var brandCharStr=brandName.replace(' ','').replace('-','').replace('.','');
				localStorage[brandCharStr]='';	
			}																					
		}
		
		var url = "#login";
		$.mobile.navigate(url);	
		location.reload();
	};
}

function get_login() {
	var url = "#login";
	$.mobile.navigate(url);
	}

							
//========================= Longin: Check user
function check_user() {
	var user_id=$("#user_id").val();
	var user_pass=$("#user_pass").val();
	
	var base_url='';
	var photo_url='';
	
	
	//-----
	
	if (user_id=="" || user_id==undefined || user_pass=="" || user_pass==undefined){
		var url = "#login";      
		$.mobile.navigate(url);
		$("#error_login").html("Required User ID and Password");	
	}else{
		//-----------------
		localStorage.base_url='';
		localStorage.photo_url='';
		localStorage.photo_submit_url='';
		
		//alert(apipath_base_photo_dm);
		
		//----
		$.ajax({
			 type: 'POST',
			 url: apipath_base_photo_dm,
			 success: function(result) {					
				if (result==''){
					$("#wait_image_login").hide();
					$("#loginButton").show();
					$("#error_login").html('Base URL not available');						
				}else{
					var startIndex=result.indexOf('<start>')
					var endIndex=result.indexOf('<end>')
					
					var urlResult=result.substring(startIndex+7,endIndex);
					
					var resultArray = urlResult.split('<fd>');		
					if(resultArray.length==3){
						base_url=resultArray[0]
						photo_url=resultArray[1]
						photo_submit_url=resultArray[2]
						alert (photo_submit_url)
						//-------------
						if(base_url=='' || photo_url==''){	
							$("#wait_image_login").hide();
							$("#loginButton").show();
							$("#error_login").html('Base URL not available');	
						}else{
							//--------------------------
							$("#error_login").html("");		
							$("#loginButton").hide();
							$("#wait_image_login").show();
							
							localStorage.base_url=base_url;
							localStorage.photo_url=photo_url;
							localStorage.photo_submit_url=photo_submit_url;
							
							localStorage.cid='LSCRM';
							localStorage.user_id=user_id;
							localStorage.user_pass=user_pass;   		
							localStorage.synced='NO'
							
							//alert(localStorage.base_url+'check_user?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode);
							//http://127.0.0.1:8000/lscmreporting/syncmobile/check_user?cid=LSCRM&rep_id=1001&rep_pass=123&synccode=
							
							$.ajax({
									 type: 'POST',
									 url: localStorage.base_url+'check_user?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode,
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
													// $("#error_login").html(apipath_base_photo_dm);	
												}else if (resultArray[0]=='SUCCESS'){
													
													localStorage.synccode=resultArray[1];
													localStorage.marketListStr=resultArray[2];
													localStorage.productListStr=resultArray[3];
													localStorage.marchandizingItem=resultArray[4];
													localStorage.distributorListStr=resultArray[5];								
													localStorage.brand_list_string=resultArray[6];
													
													localStorage.complain_type_string=resultArray[7];
													localStorage.complain_from_string=resultArray[8];
													localStorage.task_type_string=resultArray[9];
													region_string=resultArray[10];
													
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
													
													//------------- Visit Plan Market List / Client Profile Market List / Unschedule
													var planMarketList = localStorage.marketListStr.split('<rd>');
													var planMarketListShowLength=planMarketList.length	
													
													var visitPlanMarketComb=''								
													var profileMarketComb='';								
													var unscheduleMarketComb='';
													
													for (var k=0; k < planMarketListShowLength; k++){
														var planMarketValueArray = planMarketList[k].split('<fd>');
														planMarketID=planMarketValueArray[0];
														planMarketName=planMarketValueArray[1];
														marketID=planMarketID
														marketName=planMarketName
														var marketNameID=planMarketName+'-'+planMarketID;
														
														if(planMarketID!=''){
															unscheduleMarketComb+='<li class="ui-btn ui-shadow ui-corner-all ui-btn-icon-left ui-icon-location" style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin"><a onClick="marketNextLV(\''+marketNameID+'\')">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+marketNameID+'</a></li>';
															visitPlanMarketComb+='<li class="ui-btn ui-shadow ui-corner-all ui-btn-icon-left ui-icon-location" style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin"><a onClick="visitPlanMarketNextLV(\''+marketNameID+'\')">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+marketNameID+'</a></li>';
															profileMarketComb+='<li class="ui-btn ui-shadow ui-corner-all ui-btn-icon-left ui-icon-location" style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin"><a onClick="marketNextCProfileLV(\''+marketNameID+'\')">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+marketNameID+'</a></li>';
															}
													}
																					
													localStorage.visit_plan_marketlist_combo=visitPlanMarketComb;								
													localStorage.unschedule_market_cmb_id=unscheduleMarketComb
													localStorage.market_cmb_list_cp=profileMarketComb;
													
													//------------ Delivery Distributor Combo
													var distributor_string=localStorage.distributorListStr;
													var distributorList = distributor_string.split('<rd>');
													var distributorListShowLength=distributorList.length
													
													var deliveryDistributorCombo=''
													
													for (var i=0; i < distributorListShowLength; i++){
														var distributorValueArray = distributorList[i].split('<fd>');
														distributorID=distributorValueArray[0];
														distributorName=distributorValueArray[1];
														var distributorNameID=distributorName+'-'+distributorID;
														if (distributorID!=''){
															deliveryDistributorCombo+='<li class="ui-btn ui-shadow ui-corner-all ui-btn-icon-left ui-icon-location" style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin"><a onClick="distributorNextLV(\''+distributorNameID+'\')">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+distributorNameID+'</a></li>';
															}		
													}								
													localStorage.delivery_distributor_cmb_list=deliveryDistributorCombo
													
													//-------------
													
													var region_stringList = region_string.split('<rd>');
													var region_stringListLength=region_stringList.length
													
													var region_combo='<option value="0" >Select Region</option>'
													for (var i=0; i < region_stringListLength; i++){
														var regionListArray = region_stringList[i].split('<fd>');
														var regionID=regionListArray[0];
														var regionName=regionListArray[1].replace('-',' ');
														if (regionID!=''){
															region_combo+='<option value="'+regionName+'-'+regionID+'" >'+regionName+'-'+regionID+'</option>';
														}
													}
													localStorage.region_string=region_combo
													
													//---------------
													$("#error_login").html('');
													$("#wait_image_login").hide();
													$("#loginButton").show();
													
													//----------------
													localStorage.visit_page=""
																		
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
								}//base url check
						
						//-------------		
					}else{
						$("#wait_image_login").hide();
						$("#loginButton").show();
						$("#error_login").html('Base URL Settings Incorrect');	
					}
					
				}
			  },
			  error: function(result) {			  	   
				  $("#wait_image_login").hide();
				  $("#loginButton").show();
				  $("#error_login").html('Invalid Request to get Base URL');				  	
			  }
			  
		});//end ajax
		
		//alert(base_url+','+photo_url+'2');
		
		
		  }//end else	
	}//function

function getOtherOutlet(){	
	if (mobile_off_flag==1){
		mobile_off_flag=0;
		
		var url = "#pageHome";
		$.mobile.navigate(url);
		
	}else{
		var visit_type=localStorage.visit_type;
		//alert(visit_type);
		if (visit_type=="Scheduled"){
			var url = "#page_scheduled";
			$.mobile.navigate(url);
			
		}else if(visit_type=="Unscheduled"){
			var url = "#page_market_ret";
			$.mobile.navigate(url);
		};
	};
}

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
	$("#schedule_client_combo_id").val('');
	
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
	
			//alert(localStorage.base_url+'getScheduleClientList?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&sch_date='+search_date);
			//http://127.0.0.1:8000/lscmreporting/syncmobile/getScheduleClientList?cid=LSCRM&rep_id=1001&rep_pass=123&synccode=2568&sch_date=2014-9-14
			
			// ajax-------
			$.ajax({
				 type: 'POST',
				 url: localStorage.base_url+'getScheduleClientList?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&sch_date='+search_date,
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
								
								//var schedule_client_combo='<option value="0" >Select Retailer</option>'
								var schedule_client_combo=''			
								for (var i=0; i < clientListShowLength; i++){
									var clientValueArray = clientList[i].split('<fd>');
									var clientID=clientValueArray[0];
									var clientName=clientValueArray[1];
									if (clientID!=''){
										//schedule_client_combo+='<option value="'+clientName+'-'+clientID+'" >'+clientName+'-'+clientID+'</option>';
										schedule_client_combo+='<li class="ui-btn ui-shadow ui-corner-all ui-btn-icon-left ui-icon-location" style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin"><a onClick="sheduledRetailerVisitNextLV(\''+clientName+'-'+clientID+'\')">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+clientName+'-'+clientID+'</a></li>';
									}
								}
																
								var schedule_client_combo_ob=$('#schedule_client_combo_id_lv');
								schedule_client_combo_ob.empty();	
								schedule_client_combo_ob.append(schedule_client_combo);			
																
								//schedule_client_combo_ob[0].selectedIndex = 0;
								
								$(".s_date").html(search_date);
								
								
								//-----------------
								$("#err_retailer_date_next").text("");
								$("#btn_schedule_date").show();
								$("#wait_image_schedule_date").hide();
								
								//-----
								var url = "#page_scheduled_retailer";
								$.mobile.navigate(url);	
								
								//schedule_client_combo_ob.selectmenu("refresh");
								schedule_client_combo_ob.listview("refresh");
								
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
function sheduledRetailerVisitNextLV(lvalue) {
	$("#schedule_client_combo_id").val(lvalue);
	sheduledRetailerVisitNext();	
	}
	
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
			
			//alert(localStorage.base_url+'getClientInfo?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&client_id='+visitClientId);
   			//http://127.0.0.1:8000/lscmreporting/syncmobile/getClientInfo?cid=LSCRM&rep_id=1001&rep_pass=123&synccode=2568&client_id=R100008
			
			// ajax-------
			$.ajax({
				 type: 'POST',
				 url: localStorage.base_url+'getClientInfo?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&client_id='+visitClientId,
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
								var lastMarketInfoStr=resultArray[3];
								
								//------------------------- Campaign
								localStorage.campaign_string=resultArray[4];
								localStorage.visit_camp_list_str=resultArray[5];
								
								var visit_distributor_nameid=resultArray[6];
														
								localStorage.visit_camp_submit_str=''
								
								//------
								localStorage.marchandizingStr=merItemStr
								localStorage.marchandizingInfoStr=''
								
								//----------- empty brand data from local storage
								var brandList = localStorage.brand_list_string.split('<rd>');
								var brandListLength=brandList.length	
								for (var i=0; i < brandListLength; i++){
									var brandName = brandList[i]
									
									if(brandName!=""){
										var brandCharStr=brandName.replace(' ','').replace('-','').replace('.','');
										localStorage[brandCharStr]='';	
									}																												
								}
								
								//-------------------	
								localStorage.marketInfoStr=lastMarketInfoStr
								localStorage.marketInfoSubmitStr=''
								
								var lastMarketInfoStrList = lastMarketInfoStr.split('<rd>');
								var lastMarketInfoStrListLength=lastMarketInfoStrList.length
								for (var i=0; i < lastMarketInfoStrListLength; i++){
									var brandNameStrDetails = lastMarketInfoStrList[i]
									
									if(brandNameStrDetails!=''){
										var brandNameStrDetailsList=brandNameStrDetails.split('<fd>');
										var brandNameCurrent=brandNameStrDetailsList[0]
										
										var brandCharStrCurrent=brandNameCurrent.replace(' ','').replace('-','').replace('.','');
										localStorage[brandCharStrCurrent]=brandNameStrDetails;										
									}
								}
								
								//---------------
								$(".market").html(visitMarketStr);
								$(".visit_distributor").html(visit_distributor_nameid);
								$(".visit_type").html(visit_type);								
								$(".s_date").html(scheduled_date);
								$(".visit_client").html(visit_client);
								
								localStorage.visit_client=visit_client
								localStorage.visit_type=visit_type
								localStorage.scheduled_date=scheduled_date
								localStorage.visitMarketStr=visitMarketStr
								localStorage.visit_distributor_nameid=visit_distributor_nameid
										
								localStorage.visit_page="YES"
								
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
	$("#unschedule_market_combo_id").val('');
	
	var unschedule_market_combo_list=localStorage.unschedule_market_cmb_id;
	
	//---
	
	/*var unschedule_market_combo_ob=$('#unschedule_market_combo_id');
	unschedule_market_combo_ob.empty()
	unschedule_market_combo_ob.append(unschedule_market_combo_list);
	unschedule_market_combo_ob[0].selectedIndex = 0;*/
	
	var unschedule_market_combo_ob=$('#unschedule_market_combo_id_lv');
	unschedule_market_combo_ob.empty()
	unschedule_market_combo_ob.append(unschedule_market_combo_list);
	
	//-------	
	var url = "#page_market";
	$.mobile.navigate(url);
	//unschedule_market_combo_ob.selectmenu("refresh");
	unschedule_market_combo_ob.listview("refresh");
}

//--------------------------------- Unsheduled visit: Client list by market id

function marketNextLV(lvalue) {
	$("#unschedule_market_combo_id").val(lvalue);
	//alert(lvalue);
	marketNext();	
	}

function marketNext() {
	$("#unscheduled_m_client_combo_id").val('');
	
	market_name=$("#unschedule_market_combo_id").val();
	
	if(market_name=='' || market_name==0){
			$("#err_market_next").text("Market required");
		}else{
			$("#err_market_next").text("");			
			$("#btn_unschedule_market").hide();
			$("#wait_image_unschedule_market").show();		
			
			
			//visitMarketStr
			var marketNameId=market_name.split('-');
			var market_Id=marketNameId[1];
			
			//http://127.0.0.1:8000/lscmreporting/syncmobile/getMarketClientList?cid=LSCRM&rep_id=1001&rep_pass=123&synccode=7048&market_id=M000003
			// ajax-------
			$.ajax({
				 type: 'POST',
				 url: localStorage.base_url+'getMarketClientList?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&market_id='+market_Id,
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
								
								//var unscheduled_m_client_list='<option value="0" > Select Retailer</option>'
								var unscheduled_m_client_list=''
								for (var i=0; i < mClientListShowLength; i++){
									var mClientValueArray = mClientList[i].split('<fd>');
									var mClientID=mClientValueArray[0];
									var mClientName=mClientValueArray[1];
									if(mClientID!=''){
										//unscheduled_m_client_list+='<option value="'+mClientName+'-'+mClientID+'" >'+mClientName+'-'+mClientID+'</option>';
										unscheduled_m_client_list+='<li class="ui-btn ui-shadow ui-corner-all ui-btn-icon-left ui-icon-location" style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin"><a onClick="marketRetailerNextLV(\''+mClientName+'-'+mClientID+'\')">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+mClientName+'-'+mClientID+'</a></li>';
										}								
								}
								//---class="ui-li-count" +'<img src="location.png" alt="" class="ui-li-icon ui-corner-none">'+'<img src="location.png" alt="">' 
								
								/*var unscheduled_m_client_combo_ob=$('#unscheduled_m_client_combo_id');
								unscheduled_m_client_combo_ob.empty()
								unscheduled_m_client_combo_ob.append(unscheduled_m_client_list);
								unscheduled_m_client_combo_ob[0].selectedIndex = 0;*/
								
								var unscheduled_m_client_combo_ob=$('#unscheduled_m_client_combo_id_lv');
								unscheduled_m_client_combo_ob.empty()
								unscheduled_m_client_combo_ob.append(unscheduled_m_client_list);
																
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
								
								//unscheduled_m_client_combo_ob.selectmenu("refresh");
								unscheduled_m_client_combo_ob.listview("refresh");
								
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
function marketRetailerNextLV(lvalue) {
	$("#unscheduled_m_client_combo_id").val(lvalue);
	//alert(lvalue);
	marketRetailerNext();	
	}

function marketRetailerNext() {
	$("#err_m_retailer_next").text("");
	visit_client=$("#unscheduled_m_client_combo_id").val();		
	
	if(visit_client=='' || visit_client==0){
			$("#err_m_retailer_next").text("Retailer required");
		}else{
			$("#btn_unschedule_market_ret").hide();
			$("#wait_image_unschedule_market_ret").show();		
			
			visitClientId=visit_client.split('-')[1]
			
			//alert(localStorage.base_url+'getClientInfo?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&client_id='+visitClientId);
   			
			// ajax-------
			$.ajax({
				 type: 'POST',
				 url: localStorage.base_url+'getClientInfo?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&client_id='+visitClientId,
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
								var lastMarketInfoStr=resultArray[3];
								
								//------------------------- Campaign
								localStorage.campaign_string=resultArray[4];
								localStorage.visit_camp_list_str=resultArray[5];
								
								var visit_distributor_nameid=resultArray[6];
								
								localStorage.visit_camp_submit_str=''
								
								//----------------
								localStorage.marchandizingStr=merItemStr
								localStorage.marchandizingInfoStr=''
								
								//----------- empty brand data from local storage
								var brandList = localStorage.brand_list_string.split('<rd>');
								var brandListLength=brandList.length	
								for (var i=0; i < brandListLength; i++){
									var brandName = brandList[i]
									
									if(brandName!=""){
										var brandCharStr=brandName.replace(' ','').replace('-','').replace('.','');
										localStorage[brandCharStr]='';	
									}																												
								}
								
								//-------------------	
								localStorage.marketInfoStr=lastMarketInfoStr
								localStorage.marketInfoSubmitStr=''
								
								var lastMarketInfoStrList = lastMarketInfoStr.split('<rd>');
								var lastMarketInfoStrListLength=lastMarketInfoStrList.length
								for (var i=0; i < lastMarketInfoStrListLength; i++){
									var brandNameStrDetails = lastMarketInfoStrList[i]
									
									if(brandNameStrDetails!=''){
										var brandNameStrDetailsList=brandNameStrDetails.split('<fd>');
										var brandNameCurrent=brandNameStrDetailsList[0]
										
										var brandCharStrCurrent=brandNameCurrent.replace(' ','').replace('-','').replace('.','');
										localStorage[brandCharStrCurrent]=brandNameStrDetails;										
									}
								}
								//----------
								
								$(".market").html(visitMarketStr);
								$(".visit_distributor").html(visit_distributor_nameid);
								$(".visit_client").html(visit_client);
									
								localStorage.visit_client=visit_client
								localStorage.visitMarketStr=visitMarketStr
								localStorage.visit_distributor_nameid=visit_distributor_nameid
								
								localStorage.visit_page="YES"
								
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

//------------------------------Visit: Market Info List Show
function getMarketInfo() {
	var brandList = localStorage.brand_list_string.split('<rd>');
	var brandListLength=brandList.length
	var market_brand_list=''
	for (var i=0; i < brandListLength; i++){
		var brandName = brandList[i]
		
		if(brandName!=''){
			var brandCharStr=brandName.replace(' ','').replace('-','').replace('.','');
			var marketInfoBrandStr=localStorage[brandCharStr];
			
			if (marketInfoBrandStr=='' || marketInfoBrandStr==undefined){
				market_brand_list+='<li style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin"><a onClick="marketInfo(\''+brandName+'\')">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+brandName+'</a></li>';
			}else{
				market_brand_list+='<li class="ui-btn ui-shadow ui-corner-all ui-btn-icon-left ui-icon-check" style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin"><a onClick="marketInfo(\''+brandName+'\')">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+brandName+'</a></li>';
				}
			
		}
	}
	
	//----------------
	var market_info_lv_ob=$('#market_info_lv');
	market_info_lv_ob.empty()
	market_info_lv_ob.append(market_brand_list);
	
	//-------	
	var url = "#market_info";
	$.mobile.navigate(url);
	market_info_lv_ob.listview("refresh");
}


//----------------- Visit: Market Info Dialog show
function marketInfo(result){	
		$("#error_marketinfo_dialog").html('');
		
		var brand_name=result;		
		var m_sales='';
		var m_stock='';
		var m_credit='';
		var m_price='';
		var m_free_bag='';
		var m_ret_com='';
		var m_trade_pro='';
		var m_remarks='';
		
		var brandCharStr=brand_name.replace(' ','').replace('-','').replace('.','');
		
		var marketInfoBrandStr=localStorage[brandCharStr]
		
		if (marketInfoBrandStr!="" &&  marketInfoBrandStr!=undefined){
			var brandArray=marketInfoBrandStr.split("<fd>");				
			m_sales=brandArray[1];
			m_stock=brandArray[2];
			m_credit=brandArray[3];
			m_price=brandArray[4];
			m_free_bag=brandArray[5];
			m_ret_com=brandArray[6];
			m_trade_pro=brandArray[7];
			m_remarks=brandArray[8];			
			}
		
		//----------------
		$("#brand_name").val(brand_name);
		
		$("#m_sales").val(m_sales);
		$("#m_stock").val(m_stock);
		$("#m_credit").val(m_credit);
		$("#m_price").val(m_price);
		$("#m_free_bag").val(m_free_bag);
		$("#m_ret_com").val(m_ret_com);
		
		$("#m_remarks").val(m_remarks);
		
		//--------------
		$('#m_trade_pro').empty();
		var selectOption='<option value="" >Select</option><option value="Yes" >Yes</option><option value="No" >No</option>';
		$('#m_trade_pro').append(selectOption);	
		var zselect = $("#m_trade_pro");		
		zselect.val(m_trade_pro);
		
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
	var m_trade_pro=$("#m_trade_pro").val();
	var m_remarks=$("#m_remarks").val();
	
	if(m_brand_name==''){
		$("#error_marketinfo_dialog").html('Brand Name Required');
		
	}else if(m_stock==''){
		$("#error_marketinfo_dialog").html('Stock Required');
		
	}else if(m_price==''){
		$("#error_marketinfo_dialog").html('Price Required');
		
	}else if(m_sales==''){
		$("#error_marketinfo_dialog").html('Monthly Sales Required');
		
	}else if(m_trade_pro==''){
		$("#error_marketinfo_dialog").html('Trade Promotion Required');
		
	}else{
		var brandCharStr=m_brand_name.replace(' ','').replace('-','').replace('.','');
		localStorage[brandCharStr]=m_brand_name+'<fd>'+m_sales+'<fd>'+m_stock+'<fd>'+m_credit+'<fd>'+m_price+'<fd>'+m_free_bag+'<fd>'+m_ret_com+'<fd>'+m_trade_pro+'<fd>'+m_remarks;
		
		//--------------------------	
		$("#brand_name").val("");
		$("#m_sales").val("");
		$("#m_stock").val("");
		$("#m_credit").val("");
		$("#m_price").val("");
		$("#m_free_bag").val("");
		$("#m_ret_com").val("");
			
		$("#m_trade_pro").val("");
		$("#m_remarks").val("");
		
		getMarketInfo();
		}
	}

//----------------- Visit: Market Info cancel from Dialog
function marketInfoCancel(){	
	var m_brand_name=$("#brand_name").val();
	
	var brandCharStr=m_brand_name.replace(' ','').replace('-','').replace('.','');
	localStorage[brandCharStr]="";
	
	//--------------------------	
	$("#brand_name").val("");
	$("#m_sales").val("");
	$("#m_stock").val("");
	$("#m_credit").val("");
	$("#m_price").val("");
	$("#m_free_bag").val("");
	$("#m_ret_com").val("");
	
	$("#m_trade_pro").val("");
	$("#m_remarks").val("");
	
	getMarketInfo();
		
	}
	
//----------------- Visit: Set market info data
function setMarketInfo(){
	var marketInfoStr='';
	
	var brandList = localStorage.brand_list_string.split('<rd>');
	var brandListLength=brandList.length;
	
	for (var i=0; i < brandListLength; i++){
		var brandName = brandList[i]
		var brandCharStr=brandName.replace(' ','').replace('-','').replace('.','');
		var marketInfoBrandStr=localStorage[brandCharStr];
		
		if (marketInfoBrandStr!="" &&  marketInfoBrandStr!=undefined){
			if(marketInfoStr==""){
				marketInfoStr=marketInfoBrandStr
			}else{
				marketInfoStr+='<rd>'+marketInfoBrandStr
				}	
		}
		
	}
	
	localStorage.marketInfoStr=marketInfoStr;
	localStorage.marketInfoSubmitStr=marketInfoStr;
	
	var url = "#page_visit";	
	$.mobile.navigate(url);
	
	}

//--------------------------------- Order: Show order from home
function getOrder(){	
	var url = "#page_order";	
	$.mobile.navigate(url);	
	//-----
	
	var productList=localStorage.productListStr.split('<rd>');
	var productLength=productList.length;
	
	for (var i=0; i < productLength; i++){
		var productArray2 = productList[i].split('<fd>');
		var product_id2=productArray2[0];	
		var product_name2=productArray2[1];
		$("#order_qty"+product_id2).val('');
	}
	
	var orderProductList=localStorage.productOrderStr.split('<rd>');
	var orderProductLength=orderProductList.length;
	for (var j=0; j < orderProductLength; j++){
		var orderProductIdQtyList=orderProductList[j].split('<fd>');
		if(orderProductIdQtyList.length==2){
			var orderProductId=orderProductIdQtyList[0];
			var orderProductQty=orderProductIdQtyList[1];		
			$("#order_qty"+orderProductId).val(orderProductQty);
		}		
	}
	
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
		
	}


//------------ marchandizing: Show marchandizing page
function getMarchandizing(){
	
	var marchandizingList=localStorage.marchandizingStr.split('<rd>');
	var marchandizingItemLength=marchandizingList.length;
	
	$("#tbl_marchandizing_show").empty();
	
	for (var i=0; i < marchandizingItemLength; i++){
		var marchandizingArray = marchandizingList[i].split('<fd>');
		var item_id=marchandizingArray[0];
		var item_name=marchandizingArray[1];
		var item_qty=marchandizingArray[2];
		var ins_date=marchandizingArray[3];
		
		var item_visible=marchandizingArray[4];
		var item_status=marchandizingArray[5];
		var item_dismantle=marchandizingArray[6];
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
			//alert(marchandizingList[i]);
			
			var status_cmbo="";
			if(item_status=="Good"){
				status_cmbo='<select name="" id="item_status'+i+'" data-native-menu="false"><option value="" >Status</option><option value="Good" selected="selected">Good</option><option value="Bad" >Bad</option></select>';
				
							
			}else if(item_status=="Bad"){
				status_cmbo='<select name="" id="item_status'+i+'" data-native-menu="false"><option value="" >Status</option><option value="Good" >Good</option><option value="Bad" selected="selected">Bad</option></select>';
				
				
			}else{
				status_cmbo='<select name="" id="item_status'+i+'" data-native-menu="false"><option value="" selected="selected" >Status</option><option value="Good" >Good</option><option value="Bad" >Bad</option></select>';
				}
			
			//--------------- <input type="button" name="" id="" style="width:50%" onclick=delete_merchandizing('+i+'); value=" X "/>
			var lastRow=''
			if (new_flag==1){
				lastRow='<td>Cancel</td><td ><a data-role="button" style="text-decoration:none" onclick=delete_merchandizing('+i+');>X</a></td>';
			}else{
				if(item_dismantle=='YES'){
					lastRow='<td>Dismantle</td><td ><input type="checkbox" id="" name="dismantle'+i+'" value="YES" checked/></td>';
				}else{
					lastRow='<td>Dismantle</td><td ><input type="checkbox" id="" name="dismantle'+i+'" value="YES"/></td>';
					}
				}
			
			marchandizing='<tr id="merchandizingrow_'+i+'" ><td style="width:100%"></br><table width="100%"  style='+bg_color+';>'+
			'<tr ><td>Item</td><td style="font-weight:bold; text-shadow:none; color:#408080;" >:'+item_name+'-'+item_id+'<input type="hidden" id="item_id'+i+'" name="" value="'+item_id+'" /><input type="hidden" id="item_name'+i+'" name="" value="'+item_name+'" /></td></tr>'+
			'<tr><td>Qty</td><td >:'+item_qty+'<input type="hidden" id="item_qty'+i+'" name="" value="'+item_qty+'" /></td></tr>'+
			'<tr><td>Installation Date</td><td >:'+ins_date+'<input type="hidden" id="ins_date'+i+'" name="" value="'+ins_date+'"/></td></tr>'+
			
			'<tr><td>Visible</td><td >'+visible_cmbo+'</td></tr>'+
			'<tr><td>Status</td><td >'+status_cmbo+'</td></tr>'+			
			'<tr>'+lastRow+'</tr> '+	
			
			'</table></td></tr>';	
			
			$("#tbl_marchandizing_show").append(marchandizing).trigger('create');
		}
	}
	
	
	//---------------------------------
		
	var url = "#marchendizing";
	$.mobile.navigate(url);
	
	//-----------------
	
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
			var dismantle=marchandizingArray[6];	
			//var dismantle="NO";	
			var new_flag=marchandizingArray[7];
			
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



//------------ marchandizing: marchandizing item Dialog  new
function addMarchandizingItem(){	
	var marchanItem=localStorage.marchandizingItem.split('<rd>');
	
	var marchandizing_item_ob = $("#marchandizing_item_id");
	marchandizing_item_ob.empty();
	
	var mzItemOption='<option value="" >Select</option>';
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
	mz_visible_ob.append('<option value="" >Select</option><option value="Yes" >Yes</option><option value="No" >No</option>');
	mz_visible_ob.selectedIndex = 0;
	
	var mz_status_ob=$("#mz_status");
	mz_status_ob.empty();
	mz_status_ob.append('<option value="" >Select</option><option value="Good" >Good</option><option value="Bad" >Bad</option>');
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
	var mz_dismantle="NO";
	
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


//------------ marchandizing: Set marchandizing  data for done
function getMarchandizingData(){
	var marchandizingList=localStorage.marchandizingStr.split('<rd>');
	
	var marchandizingItemLength=marchandizingList.length;
	
	var marchandizingStr="";
	for (var i=0; i < marchandizingItemLength; i++){		
		var item_id=$("#item_id"+i).val();
		var item_name=$("#item_name"+i).val();
		var item_qty=$("#item_qty"+i).val();
		var ins_date=$("#ins_date"+i).val();
		var item_visible=$("#item_visible"+i).val();
		var item_status=$("#item_status"+i).val();				
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
		
		//alert(item_id+'<fd>'+item_name+'<fd>'+item_qty+'<fd>'+ins_date+'<fd>'+item_visible+'<fd>'+item_status+'<fd>'+item_dismantle+'<fd>'+new_flag);
		//-------
		if (marchandizingStr==''){
			marchandizingStr=item_id+'<fd>'+item_name+'<fd>'+item_qty+'<fd>'+ins_date+'<fd>'+item_visible+'<fd>'+item_status+'<fd>'+item_dismantle+'<fd>'+new_flag
			
		}else{
			marchandizingStr+='<rd>'+item_id+'<fd>'+item_name+'<fd>'+item_qty+'<fd>'+ins_date+'<fd>'+item_visible+'<fd>'+item_status+'<fd>'+item_dismantle+'<fd>'+new_flag
			
			}	
	}	
	localStorage.marchandizingStr=marchandizingStr;
	localStorage.marchandizingInfoStr=marchandizingStr;
	
	var url = "#page_visit";	
	$.mobile.navigate(url);
}

//----------------- Campaign
var visitCampaginTempArray=[]
var visitCampaginArray=[]

function getVisitCampaign(){
	var campaignList = localStorage.campaign_string.split('<rd>');
	var campaignListLength=campaignList.length
	
	var campaign_cmb_listStr='<option value="0">Select Offer</option>'
	for (var i=0; i < campaignListLength; i++){
		var campaignArray = campaignList[i].split('<fd>');
		var campaignOfferId=campaignArray[0];
		var campaignOfferName=campaignArray[1];
		var campaignDes=campaignArray[2];
		if (campaignOfferId!='' && campaignOfferId!=undefined){
			campaign_cmb_listStr+='<option value="'+campaignOfferId+'_'+campaignOfferName+'_'+campaignDes+'" >'+campaignOfferName+' ('+campaignOfferId+')</option>';
			}
	}
	
	//-------------------------
	$("#error_visit_campaign").text("");
	
	var visit_campaign_cmb_ob=$('#visit_campaign_cmb_id');
	visit_campaign_cmb_ob.empty()
	visit_campaign_cmb_ob.append(campaign_cmb_listStr);
	visit_campaign_cmb_ob[0].selectedIndex = 0;
	
	//-------------- exist data show
	visitCampaginTempArray=[]
	visitCampaginArray=[]
	
	$("#tbl_visit_campaign").empty();
	$("#tbl_visit_campaign").append('<tr ><td style="background-color:#92C9C9; color:#F2F9F9; text-shadow:none;"><b>Offer</b></td><td style="background-color:#92C9C9; color:#F2F9F9; text-shadow:none;"><b>Period</b></td><td style="background-color:#92C9C9; color:#F2F9F9; text-shadow:none;"><b>Delete</b></td></tr>');
	
	if(localStorage.visit_camp_list_str!=undefined && localStorage.visit_camp_list_str!=''){
		//added campaign
		visitCampaginTempArray=localStorage.visit_camp_list_str.split('<rd>');
		var campTempArrayLength=visitCampaginTempArray.length;
		
		//totalCampaign				
		for (i=0; i < campTempArrayLength; i++){		
			var offer_data=visitCampaginTempArray[i];
				
			if(offer_data!=''){
				var offer_list=offer_data.split('<fd>');
				
				var offer_id=offer_list[0]
				var campaignOffName=offer_list[1];
				var campaignOffDes=offer_list[2];
							
				visitCampaginArray.push(offer_data)
				$("#tbl_visit_campaign").append("<tr id='visitCamp"+offer_id+"'><td class='offer_name' width='50%'>"+campaignOffName+" ("+offer_id+")</td><td class='offer_des' width='40%'>"+campaignOffDes+"</td><td width='10%' style='text-align:center'><a onClick=deleteVisitCampaign('"+offer_id+"');> X </a></td></tr>");
											 
			 }
		}
		
	}
	
	//----
	
	var url = "#page_campaign";
	$.mobile.navigate(url);
	visit_campaign_cmb_ob.selectmenu("refresh");
	
}

//----------------------------------Visit Plan: Add Retailer
function addVisitCampaign(){
	$("#error_visit_campaign").html('');
	visit_campaign_offer_name=$("#visit_campaign_cmb_id").val();
	
	if(visit_campaign_offer_name=='' || visit_campaign_offer_name==0){
		$("#error_visit_campaign").html('Offer required');		
	}else{
		var offer_IdNameDesList=visit_campaign_offer_name.split('_');
		var offer_id=offer_IdNameDesList[0];
		var offer_name=offer_IdNameDesList[1];
		var offer_des=offer_IdNameDesList[2];
		
		var offer_data=offer_id+'<fd>'+offer_name+'<fd>'+offer_des
		
		var indexVal=visitCampaginArray.indexOf(offer_data);
		
		if(indexVal<0){
			visitCampaginArray.push(offer_data)			
			$("#tbl_visit_campaign").append("<tr id='visitCamp"+offer_id+"'><td class='offer_name' width='50%'>"+offer_name+" ("+offer_id+")</td><td class='offer_des' width='40%'>"+offer_des+"</td><td width='10%' style='text-align:center'><a onClick=deleteVisitCampaign('"+offer_id+"');> X </a></td></tr>");
		}else{
			$("#error_visit_campaign").html('already exist');				
			}		
	  }
	}

//----------------------------------Visit Plan: Delete Retailer
function deleteVisitCampaign(campaignid){		
		var visitCampaginArrayLength=visitCampaginArray.length;
		
		//totalCampaign				
		for (i=0; i < visitCampaginArrayLength; i++){		
			var offer_data=visitCampaginArray[i];
			
			if(offer_data!=''){
				var offer_list=offer_data.split('<fd>');
				
				var offer_id=offer_list[0]
				var campaignOffName=offer_list[1];
				var campaignOffDes=offer_list[2];
				
				if(offer_id==campaignid){
					var campData=offer_id+'<fd>'+campaignOffName+'<fd>'+campaignOffDes
					
					var index=visitCampaginArray.indexOf(campData)
										
					visitCampaginArray.splice(index,1);
					$("#visitCamp"+campaignid).remove();
					
				}
			}
		}
  }

function getVisitCampaignData(){
	var visit_camp_list_str=''
	var visit_camp_submit_str=''
	
	campArrayLength=visitCampaginArray.length
	for (i=0; i < campArrayLength; i++){		
		var offer_data=visitCampaginArray[i];
		if(offer_data!=''){
			var offer_list=offer_data.split('<fd>');
			
			var offer_id=offer_list[0]
			var offer_name=offer_list[1];
			var offer_des=offer_list[2];
			
			if(offer_id!=''){
				if(visit_camp_list_str==""){
					  visit_camp_list_str=offer_id+'<fd>'+offer_name+'<fd>'+offer_des;
					  visit_camp_submit_str=offer_id;
				 }else{
					  visit_camp_list_str+='<rd>'+offer_id+'<fd>'+offer_name+'<fd>'+offer_des;
					  visit_camp_submit_str+='<fd>'+offer_id;
				 }
			}
	    }	
	  }
	
	localStorage.visit_camp_list_str=visit_camp_list_str;
	localStorage.visit_camp_submit_str=visit_camp_submit_str;
		
	var url = "#page_visit";
	$.mobile.navigate(url);
}
//-----VISIT SUBMIT
function lscVisitSubmit(){	
	$("#errorChkVSubmit").text("");
	
	visitClientId=localStorage.visit_client.split('-')[1]	
	visit_type=localStorage.visit_type
	scheduled_date=localStorage.scheduled_date
	
	marketInfoStr=localStorage.marketInfoSubmitStr //Generated by Done
	productOrderStr=localStorage.productOrderStr
	marchandizingInfoStr=localStorage.marchandizingInfoStr //Generated by Done
	//marchandizingInfoStr=localStorage.marchandizingStr;
	//campaign_str=localStorage.visit_camp_list_str;
	campaign_str=localStorage.visit_camp_submit_str //Generated by Done
	
	if (marketInfoStr==undefined){
		marketInfoStr=''
		}
	if (productOrderStr==undefined){
		productOrderStr=''
		}
	
	//----------------------- marchandizing status check
	if (marchandizingInfoStr==undefined){
		marchandizingInfoStr=''
	}else{
		var marchandizingList=marchandizingInfoStr.split('<rd>');	
		var marchandizingItemLength=marchandizingList.length;	
		var photoRequired="No";
		for (var i=0; i < marchandizingItemLength; i++){		
			var marchandizingArray = marchandizingList[i].split('<fd>');
			var item_status=marchandizingArray[5];	
			if(item_status=='Bad'){
				photoRequired="Yes";
				break;
				}
		}
	}
	
	//------------------------
	if (campaign_str==undefined){
		campaign_str=''
		}
	
	var lscPhoto=$("#lscPhoto").val();
	var lat=$("#lat").val();
	var long=$("#long").val();
	var now = $.now();
	
	//alert(photoRequired+','+lscPhoto);
	
	if (photoRequired=='Yes' && lscPhoto==''){
		$("#errorChkVSubmit").html('Picture required, Because of Bad marchandizing');
	}else{
		var imageName=localStorage.user_id+'_'+now.toString()+'.jpg';
		
		
		if (lat=='' || lat==0 || long=='' || long==0){
			$("#errorChkVSubmit").html('Location not Confirmed');		
		}else{
			
			if (visitClientId=='' || visitClientId==undefined){
				$("#errorChkVSubmit").html('Invalid Client');		
			}else{
				if(visit_type=='' || visit_type==undefined){
					$("#errorChkVSubmit").html('Invalid Visit Type');
				}else{
					$("#btn_visit_submit").hide();
					$("#wait_image_visit_submit").show();		
					
					//alert(localStorage.base_url+'visitSubmit?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&client_id='+visitClientId+'&visit_type='+visit_type+'&schedule_date='+scheduled_date+'&market_info='+marketInfoStr+'&order_info='+productOrderStr+'&merchandizing='+marchandizingInfoStr+'&campaign='+campaign_str+'&lat='+lat+'&long='+long+'&visit_photo='+imageName)
					// ajax-------
					$.ajax({
						 type: 'POST',
						 url: localStorage.base_url+'visitSubmit?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&client_id='+visitClientId+'&visit_type='+visit_type+'&schedule_date='+scheduled_date+'&market_info='+marketInfoStr+'&order_info='+productOrderStr+'&merchandizing='+marchandizingInfoStr+'&campaign='+campaign_str+'&lat='+lat+'&long='+long+'&visit_photo='+imageName,
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
										//localStorage.visit_type=''
										//localStorage.scheduled_date=''
										localStorage.marchandizingStr=''
										
										/*localStorage.marketInfoLSCStr=''
										localStorage.marketInfoAkijStr=''
										localStorage.marketInfo7RingsStr=''
										localStorage.marketInfoShahStr=''
										localStorage.marketInfoScanStr=''*/
										
										localStorage.marketInfoStr=''
										localStorage.marketInfoSubmitStr=''
										
										localStorage.productOrderStr=''
										localStorage.marchandizingInfoStr=''	
										localStorage.visit_camp_list_str=''
										localStorage.visit_camp_submit_str=''
										visitCampaginTempArray=[]
										visitCampaginArray=[]
										
										localStorage.visit_page=""
										
										//----------- empty brand data from local storage
										var brandList = localStorage.brand_list_string.split('<rd>');
										var brandListLength=brandList.length	
										for (var i=0; i < brandListLength; i++){
											var brandName = brandList[i]
											
											if(brandName!=""){
												var brandCharStr=brandName.replace(' ','').replace('-','').replace('.','');
												localStorage[brandCharStr]='';	
											}
																														
										}
										
										//-------------
										$("#errorChkVSubmit").html('');
										$("#lat").val('');
										$("#long").val('');
										$("#lscPhoto").val('');
										document.getElementById('myImage').src = '';
										
										$("#lat_p").val('');
										$("#long_p").val('');								
										
										$("#checkLocation").html('');
										$("#checkLocationProfileUpdate").html('');
										
										$("#wait_image_visit_submit").hide();
										$("#btn_visit_submit").show();
										
										//image upload function									
										uploadPhotoV(lscPhoto, imageName);
										
										//--
										var url = "#page_confirm_visit_success";	
										$.mobile.navigate(url);
																				
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
		  }//locaction check
	}
  }


//------------------- Client Profile: Page from home
function addMarketListCp() {
	$("#profile_market_cmb_id").val('');
	
	//$("#btn_profile_market").hide();
	//$("#wait_image_profile_market").show();
	
	var market_cmb_list_cp=localStorage.market_cmb_list_cp;	
	//---
	/*var profile_market_cmb_id_ob=$('#profile_market_cmb_id');
	profile_market_cmb_id_ob.empty()
	profile_market_cmb_id_ob.append(market_cmb_list_cp);
	profile_market_cmb_id_ob[0].selectedIndex = 0;*/
	
	//var market_cmb_list_cplv=localStorage.market_cmb_list_cplv;
	var profile_market_cmb_id_oblv=$('#profile_market_cmb_id_lv');
	profile_market_cmb_id_oblv.empty();
	profile_market_cmb_id_oblv.append(market_cmb_list_cp);
	
	//-------
	var url = "#page_market_clprofile";
	$.mobile.navigate(url);
	//location.reload();
	//profile_market_cmb_id_ob.selectmenu("refresh");
	profile_market_cmb_id_oblv.listview("refresh");
}


//--------------------------------- Client Profile: Client list by market id

function marketNextCProfileLV(lvalue) {
	$("#profile_market_cmb_id").val(lvalue);
	//alert(lvalue);
	marketNextCProfile();
	
	}


function marketNextCProfile() {
	$("#err_market_next_cp").html('');
	$("#profile_client_id").val('');
	
	var market_name=$("#profile_market_cmb_id").val();
	
	if(market_name=='' || market_name==0){
			$("#err_market_next_cp").text("Market required");
		}else{
			$("#btn_profile_market").hide();
			$("#wait_image_profile_market").show();	
			
			
			//visitMarketStr
			var marketNameId=market_name.split('-');
			var market_Id=marketNameId[1];
			
			
			//alert(localStorage.base_url+'getMarketClientList?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&market_id='+market_Id);
			// ajax-------
			$.ajax({
				 type: 'POST',
				 url: localStorage.base_url+'getMarketClientList?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&market_id='+market_Id,
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
								
								//------
																
								//----------------------
								var mClientList = m_client_string.split('<rd>');
								var mClientListShowLength=mClientList.length	
								
								//var profile_m_client_combo='<option value="0" > Select Retailer</option>'
								var profile_m_client_combo=''
								for (var i=0; i < mClientListShowLength; i++){
									var mClientValueArray = mClientList[i].split('<fd>');
									var mClientID=mClientValueArray[0];
									var mClientName=mClientValueArray[1];
									if(mClientID!=''){
										//profile_m_client_combo+='<option value="'+mClientName+'-'+mClientID+'" >'+mClientName+'-'+mClientID+'</option>';
										profile_m_client_combo+='<li class="ui-btn ui-shadow ui-corner-all ui-btn-icon-left ui-icon-location" style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin"><a onClick="marketRetailerNextCProfileLV(\''+mClientName+'-'+mClientID+'\')">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+mClientName+'-'+mClientID+'</a></li>';
										
										}								
								}								
								//---
								/*var profile_client_id_ob=$('#profile_client_id');
								profile_client_id_ob.empty()
								profile_client_id_ob.append(profile_m_client_combo);
								profile_client_id_ob[0].selectedIndex = 0;*/
								
								var profile_client_id_ob=$('#profile_client_id_lv');
								profile_client_id_ob.empty()
								profile_client_id_ob.append(profile_m_client_combo);
								
								$(".market").html(market_name);								
																
								//---------	
								$("#err_market_next_cp").html('');
								$("#wait_image_profile_market").hide();		
								$("#btn_profile_market").show();
								
								//-----
								var url = "#page_market_ret_cprofile";	
								$.mobile.navigate(url);
								//----
								
								//profile_client_id_ob.selectmenu("refresh");
								profile_client_id_ob.listview("refresh");
								
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

function marketRetailerNextCProfileLV(lvalue) {
	$("#profile_client_id").val(lvalue);
	//alert(lvalue);
	marketRetailerNextCProfile();	
	}
	
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
			
			//alert(localStorage.base_url+'getClientProfile?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&client_id='+profileClientId);
   			
			// ajax-------
			$.ajax({
				 type: 'POST',
				 url: localStorage.base_url+'getClientProfile?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&client_id='+profileClientId,
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
								var clientProfileDistributorStr=resultArray[4];
								
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
								
								
								//--------
								$(".prof_market_class").html(visitMarketStr);
								$(".prof_distributor_class").html(clientProfileDistributorStr);								
								$(".prof_retailer_class").html(profileClientId);
												
								//----------------						
												
								//localStorage.clientProfileStr=clientProfileStr								
								
								//$("#cp_marketnameid").val(visitMarketStr);
								
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
								var client_photo_str=clientProfileList[31];
								
								//--------------
								var client_photo_strimage = document.getElementById('clientProfileImage');
    							
								//client_photo_strimage.src = 'http://e.businesssolutionapps.com/lscmreporting/static/client_pic/'+client_photo_str;
								client_photo_strimage.src = localStorage.photo_url+'client_pic/'+client_photo_str;
								
								//$("#clientProfileImage").src = client_photo_str;
								
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
	
	$("#checkLocation").html('');
	$("#checkLocationProfileUpdate").html('');
	
	
	clientUpdateStr=''
	
	//var cp_marketnameid=$("#cp_marketnameid").val();
	
	var cp_id=$("#cp_id").val();
	var cp_name=$("#cp_name").val();
	var cp_name=$("#cp_name").val();
	cp_name=cp_name.replace('&',' and ');
	
	var cp_address=$("#cp_address").val();
	cp_address=cp_address.replace('&',' and ');
	
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
	var client_id=$("#cp_id").val();
	
	var lscPhotoProfile=$("#lscPhotoProfile").val();
	
	var imageName=client_id+'.jpg'
	
	if (lat=='' || lat==0 || long=='' || long==0){
		$("#errorConfirmProfileUpdate").html('Location not Confirmed');		
	}else{
		
		if (clientUpdateStr==''){
			//alert (localStorage.photo_submit_url+"fileUploaderProfile/");
			$("#errorConfirmProfileUpdate").html('Data not available');		
		}else{
			$("#btn_profile_update").hide();
			$("#wait_image_profile_update").show();		
			
			//alert(localStorage.base_url+'updateClientProfile?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&client_data='+encodeURI(clientUpdateStr)+'&lat='+lat+'&long='+long+'&profile_photo='+imageName+'&profile_photo_str=abc')
			// ajax-------
			$.ajax({
				 type: 'POST',
				 url: localStorage.base_url+'updateClientProfile?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&client_data='+encodeURI(clientUpdateStr)+'&lat='+lat+'&long='+long+'&profile_photo='+imageName+'&profile_photo_str=abc',
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
								$("#lat_p").val('');
								$("#long_p").val('');								
								$("#lscPhotoProfile").val('');
								//$("#myImageProfile").src='';								
    							document.getElementById('myImageProfile').src = '';
								
										
								$("#lat").val('');
								$("#long").val('');
								
								$(".prof_market_class").html('');
								$(".prof_distributor_class").html('');								
								$(".prof_retailer_class").html('');
								
								$("#wait_image_profile_update").hide();		
								$("#btn_profile_update").show();
								
								//image upload function			
								
								uploadPhotoProfile(lscPhotoProfile, imageName);
								
								//----
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
	}//check location
  }


//----------------------------------Delivery:  Home page Delevery button
function delivery() {	
	//$("#wait_image_delivery_dealer").show();		
	//$("#btn_delivery_dealer").hide();
	$("#delivery_distributor_cmb_id").val('');	
	
	var delivery_distributor_cmb_list=localStorage.delivery_distributor_cmb_list;
	
	//---	
	/*var delivery_distributor_cmb_ob=$('#delivery_distributor_cmb_id');
	delivery_distributor_cmb_ob.empty()
	delivery_distributor_cmb_ob.append(delivery_distributor_cmb_list);
	delivery_distributor_cmb_ob[0].selectedIndex = 0;*/
	
	var delivery_distributor_cmb_ob=$('#delivery_distributor_cmb_id_lv');
	delivery_distributor_cmb_ob.empty()
	delivery_distributor_cmb_ob.append(delivery_distributor_cmb_list);
		
	//-------	
	var url = "#page_del_conf";
	$.mobile.navigate(url);
	//delivery_distributor_cmb_ob.selectmenu("refresh");
	delivery_distributor_cmb_ob.listview("refresh");
}


//----------------------------------- delivery: Distributor Next button
function distributorNextLV(lvalue) {
	$("#delivery_distributor_cmb_id").val(lvalue);	
	distributorNext();	
	}


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
					
					//alert(localStorage.base_url+'getDistributorClientList?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&market_id='+market_Id);
					// ajax-------
					$.ajax({
						 type: 'POST',
						 url: localStorage.base_url+'getDistributorClientList?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&dealer_id='+dealer_id,
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
										
										//--------------
										var productList=localStorage.productListStr.split('<rd>');
										var productLength=productList.length;										
										for (var j=0; j < productLength; j++){				
											var deleveryItemArray = productList[j].split('<fd>');
											var productId=deleveryItemArray[0];											
											jQuery("#delivery_qty"+productId).val("");
										}
										
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
				
				//alert(localStorage.base_url+'visitSubmit?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&client_id='+visitClientId+'&visit_type='+visit_type+'&schedule_date='+scheduled_date+'&market_info='+marketInfoStr+'&order_info='+productOrderStr+'&merchandizing='+marchandizingInfoStr+'&lat='+lat+'&long='+long)
				// ajax-------
				$.ajax({
					 type: 'POST',
					 url: localStorage.base_url+'deliverySubmit?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&depot_id='+dealer_id+'&delivery_date='+deliveryDate+'&delivery_data='+del_data+'&lat='+lat+'&long='+long,
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


//----------------------------------Visit Plan Page: Visit Plan button click
var plan_retailer_name="";
var planRetailerArray=[]

function addVisitPlanMarketList() {	
	//$("#btn_visit_plan_market").hide();
	//$("#wait_image_visit_plan_market").show();	
	$("#plan_date").val('');
	$("#visit_market_cmb_id").val('');
	
	var visit_market_cmb_list=localStorage.visit_plan_marketlist_combo;
	
	//---
	/*var visit_market_cmb_id_ob=$('#visit_market_cmb_id');
	visit_market_cmb_id_ob.empty()
	visit_market_cmb_id_ob.append(visit_market_cmb_list);
	visit_market_cmb_id_ob[0].selectedIndex = 0;*/
	
	var visit_market_cmb_id_ob=$('#visit_market_cmb_id_lv');
	visit_market_cmb_id_ob.empty()
	visit_market_cmb_id_ob.append(visit_market_cmb_list);
	
	//-------	
	var url = "#page_market_visit_plan";
	$.mobile.navigate(url);
	//location.reload();
	//visit_market_cmb_id_ob.selectmenu("refresh");
	visit_market_cmb_id_ob.listview("refresh");
	
}

//----------------------------------Visit Plan: get client by market
function visitPlanMarketNextLV(lvalue) {
	$("#visit_market_cmb_id").val(lvalue);
	//alert(lvalue);
	visitPlanMarketNext();	
	}

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
					
					//alert(localStorage.base_url+'getMarketClientList?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&market_id='+market_Id);
					// ajax-------
					$.ajax({
						 type: 'POST',
						 url: localStorage.base_url+'getMarketClientList?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&market_id='+market_Id,
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
		
		//alert(localStorage.base_url+'setScheduleClientList?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&market_id='+market_Id);
		// ajax-------
		$.ajax({
			 type: 'POST',
			 url: localStorage.base_url+'setScheduleClientList?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&market_id='+market_Id+'&plan_date='+planDate+'&client_list='+plan_ret_list_str,
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


//-------------------------- Visit Report: Show
function getVisitReportPage(){
	$("#err_visit_rpt").html('');	
	$("#wait_image_visit_report").hide();		
	
	$("#tbl_visit_rpt_show_campaign").empty();
	$("#tbl_visit_rpt_show_stock").empty();
	$("#tbl_visit_rpt_show_sales").empty();
	
	$("#ChartDivRetStock").empty();
	$("#retailerStock").val('');
	
	var url = "#page_visit_rpt";			
	$.mobile.navigate(url);
}


function visitReport(){
	$("#err_visit_rpt").html('');	
	$("#wait_image_visit_report").show();		
	
	$("#tbl_visit_rpt_show_campaign").empty();
	$("#tbl_visit_rpt_show_stock").empty();
	$("#tbl_visit_rpt_show_sales").empty();
	
	$("#ChartDivRetStock").empty();
	$("#retailerStock").val('');
	
	visit_client=localStorage.visit_client	
	clientId=visit_client.split('-')[1]
	
	//alert(localStorage.base_url+'getVisitReport?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&client_id='+clientId)
	// ajax-------
	$.ajax({
		 type: 'POST',
		 url: localStorage.base_url+'getVisitReport?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&client_id='+clientId,
		 success: function(result) {
				
				//alert(result);
				if (result==''){					
					$("#err_visit_rpt").html('Sorry Network not available');
					$("#wait_image_visit_report").hide();
	
				}else{					
					var resultArray = result.split('<SYNCDATA>');			
					if (resultArray[0]=='FAILED'){						
						$("#err_visit_rpt").html(resultArray[1]);
						$("#wait_image_visit_report").hide();
						
					}else if (resultArray[0]=='SUCCESS'){								
						//-----------
						$("#wait_image_visit_report").hide();
						
						var campaignData=resultArray[1]
						var stockData=resultArray[2]
						var marketInfoStockList=resultArray[3]
						var deliverySalesList=eval(resultArray[4])
						
						
						//------------------------
						var salesStrData='<tr ><td colspan="2" ><b>LSC Sales:</b></td></tr>'
                		salesStrData+='<tr style="font-weight:bold; text-shadow:none; color:#408080;" ><td >Month</td><td >Qty</td></tr>'
                		
						var deliverySalesListLength=deliverySalesList.length;						
						for (i=0; i < deliverySalesListLength; i++){
							var salesDictData=deliverySalesList[i];
							
							var month=salesDictData['Month']
							var qty=salesDictData['Qty']
							
							salesStrData+='<tr style="font-size:11px;"><td >'+month+'</td><td >'+qty+'</td></tr>'
							
							//alert(month+','+qty);
							}
												
						$("#tbl_visit_rpt_show_campaign").append(campaignData).trigger('create');						
						$("#tbl_visit_rpt_show_stock").append(stockData).trigger('create');
						$("#retailerStock").val(marketInfoStockList);
						
						$("#tbl_visit_rpt_show_sales").append(salesStrData).trigger('create');
						
						loadChart();
						//----
												
					}else{						
						$("#err_visit_rpt").html('Server Error');
						$("#wait_image_visit_report").hide();
						}
				}
			  },
		  error: function(result) {			  
			  $("#err_visit_rpt").html('Invalid Request');
			  $("#wait_image_visit_report").hide();
		  }
	 });//end ajax	
	
  }

//-------------------------------------

function getComplain() {	
	$("#error_complain").text("");
	
	var complain_type_string=localStorage.complain_type_string
	var complain_from_string=localStorage.complain_from_string
	
	//-----------------------------------	
	var complain_from_List = complain_from_string.split('<rd>');
	var complain_from_ListLength=complain_from_List.length	
	
	var complain_fromList='<option value="0" >Select From</option>'
	for (var i=0; i < complain_from_ListLength; i++){
		var complain_from= complain_from_List[i];		
		if(complain_from!=''){
			complain_fromList+='<option value="'+complain_from+'" >'+complain_from+'</option>';
			}								
	}
	
	var complain_from_id_ob=$('#complain_from_id');
	complain_from_id_ob.empty()
	complain_from_id_ob.append(complain_fromList);
	complain_from_id_ob[0].selectedIndex = 0;
	
	//-----------------------------------	
	var complain_type_List = complain_type_string.split('<rd>');
	var complain_type_ListLength=complain_type_List.length	
	
	var complainTypeList='<option value="0" > Select Type</option>'
	for (var j=0; j < complain_type_ListLength; j++){
		var complain_type= complain_type_List[j];		
		if(complain_type!=''){
			complainTypeList+='<option value="'+complain_type+'" >'+complain_type+'</option>';
			}
	}
	
	var complain_type_id_ob=$('#complain_type_id');
	complain_type_id_ob.empty()
	complain_type_id_ob.append(complainTypeList);
	complain_type_id_ob[0].selectedIndex = 0;
	
	$("#complain_ref").val('');
	$("#complain_details").val('');
	
	//-----------------------------------	
	var url = "#page_complain_new";	
	$.mobile.navigate(url);
	
	complain_from_id_ob.selectmenu("refresh");
	complain_type_id_ob.selectmenu("refresh");			
}

//=====
function complainSubmit(){
	$("#error_complain").html('');
	
	var complain_from=$("#complain_from_id").val();
	var complain_ref=$("#complain_ref").val();
	var complain_type=$("#complain_type_id").val();
	var complain_details=$("#complain_details").val();
	
	if(complain_from=='' || complain_from==0){
		$("#error_complain").html('Complain From Required');
	}else{
		if(complain_ref=='' || complain_ref==0){
			$("#error_complain").html('Reference Required');	
		}else{
			if(complain_type=='' || complain_type==0){
				$("#error_complain").html('Complain Type Required');	
			}else{
				
				$("#btn_complain_submit").hide();
				$("#wait_image_complain_submit").show();	
				
				//alert(localStorage.base_url+'complainSubmit?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&complain_from='+complain_from+'&complain_ref='+complain_ref+'&complain_type='+complain_type+'&complain_details='+complain_details)
				
				// ajax-------
				$.ajax({
					 type: 'POST',
					 url: localStorage.base_url+'complainSubmit?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&complain_from='+complain_from+'&complain_ref='+complain_ref+'&complain_type='+complain_type+'&complain_details='+complain_details,
					 success: function(result) {
							
							if (result==''){					
								$("#err_visit_rpt").html('Sorry Network not available');
								$("#wait_image_complain_submit").hide();
								$("#btn_complain_submit").show();
								
							}else{					
								var resultArray = result.split('<SYNCDATA>');			
								if (resultArray[0]=='FAILED'){						
									$("#error_complain").html(resultArray[1]);
									$("#wait_image_complain_submit").hide();
									$("#btn_complain_submit").show();
									
								}else if (resultArray[0]=='SUCCESS'){								
									//-----------
									$("#wait_image_complain_submit").hide();
									$("#btn_complain_submit").show();
									
									var sl=resultArray[1]
									
									var url = "#page_complain_success";	
									$.mobile.navigate(url);
									
									//----
												
								}else{						
									$("#error_complain").html('Server Error');
									$("#wait_image_complain_submit").hide();
									$("#btn_complain_submit").show();
									}
							}
						  },
					  error: function(result) {			  
						  $("#error_complain").html('Invalid Request');
						  $("#wait_image_complain_submit").hide();
						  $("#btn_complain_submit").show();
					  }
				 });//end ajax	
			}
		}
	}
  }

//----
function showComplain(){
	$("#error_complain_page").html('');
	/*$("#btn_complain_submit").hide();
	$("#wait_image_complain_submit").show();*/	
	
	$("#tbl_show_complain").empty();
	
	//alert(localStorage.base_url+'showComplain?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode)
	
	// ajax-------
	$.ajax({
		 type: 'POST',
		 url: localStorage.base_url+'showComplain?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode,
		 success: function(result) {
				
				if (result==''){					
					$("#error_complain_page").html('Sorry Network not available');
					
				}else{					
					var resultArray = result.split('<SYNCDATA>');			
					if (resultArray[0]=='FAILED'){						
						$("#error_complain_page").html(resultArray[1]);
												
					}else if (resultArray[0]=='SUCCESS'){								
						//-----------
						
						var resData=resultArray[1]
						
						
						$("#tbl_show_complain").append(resData).trigger('create');
						
						
						var url = "#page_complain_show";	
						$.mobile.navigate(url);
						
						//----
									
					}else{						
						$("#error_complain_page").html('Server Error');						
						}
				}
			  },
		  error: function(result) {			  
			  $("#error_complain_page").html('Invalid Request');
		  }
	 });//end ajax
  }


//============= Show Task
function showTask(){
	$("#error_task_page").html('');
	
	$("#wait_image_task_submit").hide();
	
	$("#tbl_show_task").empty();
	
	//alert(localStorage.base_url+'showTask?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode)
	
	// ajax-------
	$.ajax({
		 type: 'POST',
		 url: localStorage.base_url+'showTask?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode,
		 success: function(result) {
				
				if (result==''){					
					$("#error_task_page").html('Sorry Network not available');
					
				}else{					
					var resultArray = result.split('<SYNCDATA>');			
					if (resultArray[0]=='FAILED'){						
						$("#error_task_page").html(resultArray[1]);
						
					}else if (resultArray[0]=='SUCCESS'){								
						//-----------
						
						var resData=resultArray[1]
						
						$("#tbl_show_task").append(resData).trigger('create');
						
						var url = "#page_task_show";	
						$.mobile.navigate(url);
						
						//----		
					}else{						
						$("#error_task_page").html('Server Error');						
						}
				}
			  },
		  error: function(result) {			  
			  $("#error_task_page").html('Invalid Request');
		  }
	 });//end ajax
  }

//============= Show Task
function updateTask(rowid){
	$("#error_task_list").html('');
	
	$("#btn_task_update"+rowid).hide();
	$("#wait_image_task_submit").show();
	
	$("#tbl_show_task").empty();
	
	//alert(localStorage.base_url+'showTask?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode)
	
	// ajax-------
	$.ajax({
		 type: 'POST',
		 url: localStorage.base_url+'showTask?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&action=Update&rowid='+rowid,
		 success: function(result) {
				
				if (result==''){					
					$("#error_task_list").html('Sorry Network not available');
					$("#btn_task_update"+rowid).show();
					$("#wait_image_task_submit").hide();
				}else{					
					var resultArray = result.split('<SYNCDATA>');			
					if (resultArray[0]=='FAILED'){						
						$("#error_task_list").html(resultArray[1]);
						$("#btn_task_update"+rowid).show();
						$("#wait_image_task_submit").hide();
					
					}else if (resultArray[0]=='SUCCESS'){								
						//-----------
						var resData=resultArray[1]
						
						$("#wait_image_task_submit").hide();
						
						$("#tbl_show_task").append(resData).trigger('create');
						
						var url = "#page_task_show";	
						$.mobile.navigate(url);
						
						//----		
					}else{						
						$("#error_task_list").html('Server Error');
						$("#btn_task_update"+rowid).show();
						$("#wait_image_task_submit").hide();				
						}
				}
			  },
		  error: function(result) {			  
			  $("#error_task_list").html('Invalid Request');
			  $("#btn_task_update"+rowid).show();
			  $("#wait_image_task_submit").hide();
		  }
	 });//end ajax
  }
  

//------------------------------ Report part: Show
function getRegionReport() {
	$("#tbl_region_show_report").empty();
	
	var region_combo_list=localStorage.region_string;
	
	//-------
	var rpt_region_cmb_id_ob=$('#rpt_region_cmb_id');
	rpt_region_cmb_id_ob.empty()
	rpt_region_cmb_id_ob.append(region_combo_list);
	rpt_region_cmb_id_ob[0].selectedIndex = 0;
	
	//-------	
	var url = "#page_report";
	$.mobile.navigate(url);
	rpt_region_cmb_id_ob.selectmenu("refresh");
}

//============= Show region Order
function regionOrderReport(){
	$("#err_region_rpt").html('');
	$("#wait_image_region_report").show();	
	$("#tbl_region_show_report").empty();
	
	var region=$("#rpt_region_cmb_id").val();
	var month=$("#rpt_region_month_cmb_id").val();
	
	if (region=='0'){
		$("#err_region_rpt").html('Region Required');
		$("#wait_image_region_report").hide();
		
	}else if(month==''){
		$("#err_region_rpt").html('Month Required');
		$("#wait_image_region_report").hide();
		
	}else{
		
		var regionId=region.split('-')[1]
		
		//alert(localStorage.base_url+'regionTodaySummary?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&regionId='+regionId+'&month='+month)
		
		// ajax -------
		$.ajax({
			 type: 'POST',
			 url: localStorage.base_url+'regionOrderReport?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&regionId='+regionId+'&month='+month,
			 success: function(result) {
					
					if (result==''){					
						$("#err_region_rpt").html('Sorry Network not available');
						$("#wait_image_region_report").hide();
					}else{					
						var resultArray = result.split('<SYNCDATA>');			
						if (resultArray[0]=='FAILED'){						
							$("#err_region_rpt").html(resultArray[1]);
							$("#wait_image_region_report").hide();
						}else if (resultArray[0]=='SUCCESS'){								
							//-----------						
							var resData=resultArray[1]
							
							$("#wait_image_region_report").hide();
							
							$("#tbl_region_show_report").append(resData).trigger('create');
														
							//----		
						}else{						
							$("#err_region_rpt").html('Server Error');	
							$("#wait_image_region_report").hide();					
							}
					}
				  },
			  error: function(result) {			  
				  $("#err_region_rpt").html('Invalid Request');
				  $("#wait_image_region_report").hide();
				  
			  }
		 });//end ajax
	 
	}
  }


//============= Show region Sales Confirmation
function regionSalesConfReport(){
	$("#err_region_rpt").html('');
	$("#wait_image_region_report").show();	
	$("#tbl_region_show_report").empty();
	
	var region=$("#rpt_region_cmb_id").val();
	var month=$("#rpt_region_month_cmb_id").val();
	
	if (region=='0'){
		$("#err_region_rpt").html('Region Required');
		$("#wait_image_region_report").hide();
		
	}else if(month==''){
		$("#err_region_rpt").html('Month Required');
		$("#wait_image_region_report").hide();
		
	}else{
		
		var regionId=region.split('-')[1]
		
		//alert(localStorage.base_url+'regionTodaySummary?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&regionId='+regionId+'&month='+month)
		
		// ajax -------
		$.ajax({
			 type: 'POST',
			 url: localStorage.base_url+'regionSalesConfReport?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&regionId='+regionId+'&month='+month,
			 success: function(result) {
					
					if (result==''){					
						$("#err_region_rpt").html('Sorry Network not available');
						$("#wait_image_region_report").hide();
					}else{					
						var resultArray = result.split('<SYNCDATA>');			
						if (resultArray[0]=='FAILED'){						
							$("#err_region_rpt").html(resultArray[1]);
							$("#wait_image_region_report").hide();
						}else if (resultArray[0]=='SUCCESS'){								
							//-----------						
							var resData=resultArray[1]
							
							$("#wait_image_region_report").hide();
							
							$("#tbl_region_show_report").append(resData).trigger('create');
														
							//----		
						}else{						
							$("#err_region_rpt").html('Server Error');	
							$("#wait_image_region_report").hide();					
							}
					}
				  },
			  error: function(result) {			  
				  $("#err_region_rpt").html('Invalid Request');
				  $("#wait_image_region_report").hide();
				  
			  }
		 });//end ajax
	 
	}
  }



//============= Show region Visit Summary
function regionVisitSummaryReport(){
	$("#err_region_rpt").html('');
	$("#wait_image_region_report").show();	
	$("#tbl_region_show_report").empty();
	
	var region=$("#rpt_region_cmb_id").val();
	var month=$("#rpt_region_month_cmb_id").val();
	
	if (region=='0'){
		$("#err_region_rpt").html('Region Required');
		$("#wait_image_region_report").hide();
		
	}else if(month==''){
		$("#err_region_rpt").html('Month Required');
		$("#wait_image_region_report").hide();
		
	}else{
		
		var regionId=region.split('-')[1]
		
		//alert(localStorage.base_url+'regionTodaySummary?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&regionId='+regionId+'&month='+month)
		
		// ajax -------
		$.ajax({
			 type: 'POST',
			 url: localStorage.base_url+'regionVisitSummaryReport?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&regionId='+regionId+'&month='+month,
			 success: function(result) {
					
					if (result==''){					
						$("#err_region_rpt").html('Sorry Network not available');
						$("#wait_image_region_report").hide();
					}else{					
						var resultArray = result.split('<SYNCDATA>');			
						if (resultArray[0]=='FAILED'){						
							$("#err_region_rpt").html(resultArray[1]);
							$("#wait_image_region_report").hide();
						}else if (resultArray[0]=='SUCCESS'){								
							//-----------						
							var resData=resultArray[1]
							
							$("#wait_image_region_report").hide();
							
							$("#tbl_region_show_report").append(resData).trigger('create');
							
							//----		
						}else{						
							$("#err_region_rpt").html('Server Error');	
							$("#wait_image_region_report").hide();					
							}
					}
				  },
			  error: function(result) {			  
				  $("#err_region_rpt").html('Invalid Request');
				  $("#wait_image_region_report").hide();
				  
			  }
		 });//end ajax
	}
  }



//============= Show region Target Vs Achievement
function regionTarVsAchReport(){
	$("#err_region_rpt").html('');
	$("#wait_image_region_report").show();	
	$("#tbl_region_show_report").empty();
	
	var region=$("#rpt_region_cmb_id").val();
	var month=$("#rpt_region_month_cmb_id").val();
	
	if (region=='0'){
		$("#err_region_rpt").html('Region Required');
		$("#wait_image_region_report").hide();
		
	}else if(month==''){
		$("#err_region_rpt").html('Month Required');
		$("#wait_image_region_report").hide();
		
	}else{
		
		var regionId=region.split('-')[1]
		
		//alert(localStorage.base_url+'regionTodaySummary?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&regionId='+regionId+'&month='+month)
		
		// ajax -------
		$.ajax({
			 type: 'POST',
			 url: localStorage.base_url+'regionTarVsAchReport?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&regionId='+regionId+'&month='+month,
			 success: function(result) {
					
					if (result==''){					
						$("#err_region_rpt").html('Sorry Network not available');
						$("#wait_image_region_report").hide();
					}else{					
						var resultArray = result.split('<SYNCDATA>');			
						if (resultArray[0]=='FAILED'){						
							$("#err_region_rpt").html(resultArray[1]);
							$("#wait_image_region_report").hide();
						}else if (resultArray[0]=='SUCCESS'){								
							//-----------						
							var resData=resultArray[1]
							
							$("#wait_image_region_report").hide();
							
							$("#tbl_region_show_report").append(resData).trigger('create');
							
							//----		
						}else{						
							$("#err_region_rpt").html('Server Error');	
							$("#wait_image_region_report").hide();					
							}
					}
				  },
			  error: function(result) {			  
				  $("#err_region_rpt").html('Invalid Request');
				  $("#wait_image_region_report").hide();
				  
			  }
		 });//end ajax
	}
  }


//============= Show Today summary region
function regionTodaySummReport(){
	$("#err_region_rpt").html('');
	$("#wait_image_region_report").show();	
	$("#tbl_region_show_report").empty();
		
	var region=$("#rpt_region_cmb_id").val();
	var month=$("#rpt_region_month_cmb_id").val();
	
	if (region=='0'){
		$("#err_region_rpt").html('Region Required');
		$("#wait_image_region_report").hide();
		
	}else if(month==''){
		$("#err_region_rpt").html('Month Required');
		$("#wait_image_region_report").hide();
		
	}else{
		
		var regionId=region.split('-')[1]
		
		//alert(localStorage.base_url+'regionTodaySummary?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&regionId='+regionId+'&month='+month)
		
		// ajax-------
		$.ajax({
			 type: 'POST',
			 url: localStorage.base_url+'regionTodaySummary?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&regionId='+regionId+'&month='+month,
			 success: function(result) {
					
					if (result==''){					
						$("#err_region_rpt").html('Sorry Network not available');
						$("#wait_image_region_report").hide();
					}else{					
						var resultArray = result.split('<SYNCDATA>');			
						if (resultArray[0]=='FAILED'){						
							$("#err_region_rpt").html(resultArray[1]);
							$("#wait_image_region_report").hide();
						}else if (resultArray[0]=='SUCCESS'){								
							//-----------						
							var resData=resultArray[1]
							
							$("#wait_image_region_report").hide();
							
							$("#tbl_region_show_report").append(resData).trigger('create');
														
							//----		
						}else{						
							$("#err_region_rpt").html('Server Error');	
							$("#wait_image_region_report").hide();					
							}
					}
				  },
			  error: function(result) {			  
				  $("#err_region_rpt").html('Invalid Request');
				  $("#wait_image_region_report").hide();
				  
			  }
		 });//end ajax
	 
	}
  }













//---------------------- Exit Application
function exit() {	
	navigator.app.exitApp();
}

// ----------------Camera------------

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
function uploadPhotoV(imageURI, imageName) {
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
     ft.upload(imageURI, encodeURI(localStorage.photo_submit_url+"fileUploaderVisit/"),winV,failV,options);
	//ft.upload(imageURI, encodeURI("http://127.0.0.1:8000/welcome/wab_sync/fileUploader/"),win,fail,options);
}

function winV(r) {
//    console.log("Code = " + r.responseCode);
//    console.log("Response = " + r.response);
//    console.log("Sent = " + r.bytesSent);
}

function failV(error) {
	$(".errorChkVSubmit").text('Memory Error. Please take new picture and Submit');
    //alert("An error has occurred: Code = " + error.code);
//    console.log("upload error source " + error.source);
//    console.log("upload error target " + error.target);
}

//------------------------------------------------------------------------------
//File upload 
function uploadPhotoProfile(imageURI, imageName) {
    var options = new FileUploadOptions();
    options.fileKey="upload";
    options.fileName=imageName;
    options.mimeType="image/jpeg";
	
    var params = {};
    params.value1 = "test";
    params.value2 = "param";
	
    options.params = params;
	
    var ft = new FileTransfer();
	
     ft.upload(imageURI, encodeURI(localStorage.photo_submit_url+"fileUploaderProfile/"),winProfile,failProfile,options);
}

function winProfile(r) {
//    console.log("Code = " + r.responseCode);
//    console.log("Response = " + r.response);
//    console.log("Sent = " + r.bytesSent);
}

function failProfile(error) {
	$(".errorConfirmProfileUpdate").text('Memory Error. Please take new picture and Submit');
    //alert("An error has occurred: Code = " + error.code);
//    console.log("upload error source " + error.source);
//    console.log("upload error target " + error.target);
}



//=====================MAP Start=====================
function marketNextCProfile_map() {
	
	$("#err_m_retailer_next_cp").html('');
	
	var market_name=$("#profile_market_cmb_id").val();
	
	if(market_name=='' || market_name==0){
			$("#err_m_retailer_next_cp").text("Market required");
		}else{
			$("#wait_image_profile_market_ret").show();	
			
			
			//visitMarketStr
			var marketNameId=market_name.split('-');
			var market_Id=marketNameId[1];
			
			//alert(localStorage.base_url+'getMarketClientListMap?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&market_id='+market_Id);
			//$("#map_path").text(localStorage.base_url+'getMarketClientListMap?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&market_id='+market_Id);
			
			// ajax-------
			$.ajax({
				 type: 'POST',
				 url: localStorage.base_url+'getMarketClientListMap?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&market_id='+market_Id,
				 success: function(result) {
						
						//alert(result);
						if (result==''){					
							$("#err_m_retailer_next_cp").html('Sorry Network not available');
							$("#wait_image_profile_market_ret").hide();
						}else{
							var resultArray = result.split('<SYNCDATA>');			
							if (resultArray[0]=='FAILED'){						
								$("#err_m_retailer_next_cp").html(resultArray[1]);
								$("#wait_image_profile_market_ret").hide();
							}else if (resultArray[0]=='SUCCESS'){
														
								var m_client_string=resultArray[1];
								var result_show_Array = m_client_string.split('<fdfd>');	
								
								localStorage.map_desc=result_show_Array[0];
								localStorage.c_point=result_show_Array[1]
								
								$("#desc").val(localStorage.map_desc);
								$("#c_point").val(localStorage.c_point);
								
								initialize();
								google.maps.event.addDomListener(window, 'load', initialize);
								
								//-----
								$("#err_m_retailer_next_cp").html('');
								$("#wait_image_profile_market_ret").hide();	
								
								//---------	
								
								var url = "#page_market_ret_cprofile_map";
								$.mobile.navigate(url);
								
								}								
						}
					  },
				  error: function(result) {			  
					  $("#err_m_retailer_next_cp").html('Invalid Request');
					  $("#wait_image_profile_market_ret").hide();
					  
				  }
			 });//end ajax	
			
		}	
	
}
function initialize() {
  var center_point=$("#c_point").val();
  var center_point_Array = center_point.split(',');	
 // alert (center_point);
  var myLatlng = new google.maps.LatLng(parseFloat(center_point_Array[0]),parseFloat(center_point_Array[1]));
 // var myLatlng_1 = new google.maps.LatLng(60, 105);
  var mapOptions = {
    zoom: 12,
    center: myLatlng
	

  }

 var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  var marker, i;
  var icons="lafarge_g.png";
  var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'Outlet',
	  icon: icons
	  
  });
 //alert ('nadira');
 var p_station=$("#desc").val();
 

  
  
  var fields = p_station.split('rdrd');
  var total_fields=p_station.split("rdrd").length
  //alert (total_fields);
  
  
 var locations = [];
 var field=[];
 var j=0;
 
 for (j = 0; j < total_fields; j++){
	 var s=0;
	 var fields_single = fields[j].split(',');
  	 var total_fields_single=fields[j].split(",").length
	 var arr=[];
	 for (s = 0; s < total_fields_single; s++){
		 arr.push(fields_single[s]);
  		}
	locations.push(arr);
 }
 
 
 var infowindow = new google.maps.InfoWindow();
 var marker, i;
 var icons="lafarge_g.png";
 
 
 
 for (i = 0; i < locations.length; i++) {  
 	
   //check double shop==============
	  var searchS=locations[i][1]+','+locations[i][2];
	  var mOutlet = p_station.split('rdrd');
	  var total_mOutlet=p_station.split("rdrd").length
	  show_info='';
	  //alert (total_mOutlet);
	  for (var m = 0; m < total_mOutlet; m++){
		
		 if ( (mOutlet[m].search(searchS))!= -1 ){
			 var mOutlet_single=mOutlet[m].split(',');
			 if (show_info==''){
				 show_info='<div  style="height:300px; width:700px">'+mOutlet_single[m][0]+'</div>';
				 icons="lafarge_g.png";
			 }
			 else{
				//alert (locations[i][0]); 
				show_info=show_info+'<div style="background-color:#408080; height:2px"></div>'+'<div  style="height:300px; width:700px">'+mOutlet_single[m][0]+'</div>';	 
				icons="lafarge_g.png";
			 }
			 
		 }
		
		 //alert ('start: '+locations[i][0])
	   }// double check for loop
	  
   //======check double shop end========
   		
		
	  marker = new google.maps.Marker({
		position: new google.maps.LatLng(locations[i][1], locations[i][2]),
		map: map,
		icon: icons
	   
	  });
		  
		  

      		google.maps.event.addListener(marker, 'click', (function(marker, i) {
				return function() {
					
				  //check double shop==============
				  var searchS=locations[i][1]+','+locations[i][2];
				  var mOutlet = p_station.split('rdrd');
				  var total_mOutlet=p_station.split("rdrd").length
				  show_info='';
				  
				  for (var m = 0; m < total_mOutlet; m++){
					 if ( (mOutlet[m].search(searchS))!= -1 ){
						 var mOutlet_single=mOutlet[m].split(',');
						 if (show_info==''){
							 show_info='<div  style="height:auto; width:auto">'+locations[i][0]+'</div>';
							
						 }
						 else{
							show_info=show_info+'<div style="background-color:#408080; height:2px"></div>'+'<div  style="height:300px; width:700px">'+locations[i][0]+'</div>';	 
							
						 }
						
					 }
					 
				   }// double check for loop
			   //======check double shop end========	
					
				  infowindow.setContent(show_info);
				  infowindow.open(map, marker);
				}
      		})(marker, i));
	  
  
  		//alert (i)
  
 }  //main for
  
  
}
//=====================MAP End=====================

function test_server() {
	 $("#checkLocationProfileUpdate_test").html(localStorage.photo_submit_url+"fileUploaderProfile");
//	=======================================================		
			// ajax-------
			$.ajax({
				 type: 'POST',
				 url: localStorage.photo_submit_url+"fileUploaderProfile",
				 success: function(result) {
						alert (result);
						
					  },
				  error: function(result) {		
				     alert ('ajax error')
					//  $("#checkLocationProfileUpdate").html('Invalid Request');
					 
					  
				  }
			 });//end ajax

//	=======================================================
}