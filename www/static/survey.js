// Put your custom code here
//var apipath='http://127.0.0.1:8000/em/default/';
//var apipath='http://e.businesssolutionapps.com/em/default/';
//var apipath='http://127.0.0.1:8000/em/default/';

//var apipath='http://e2.businesssolutionapps.com/unilever/syncmobile/';
//var apipath_image = 'http://e2.businesssolutionapps.com/unilever/';
//var apipath_image = 'http://127.0.0.1:8000/gpmreporting/';

//var apipath='http://e.businesssolutionapps.com/gp/syncmobile/';
var apipath='http://127.0.0.1:8000/gpmreporting/syncmobile/';


//-------GET GEO LOCATION Start----------------------------
function getlocationand_askhelp() { //location
	navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

// onSuccess Geolocation
function onSuccess(position) {		
	$("#lat").val(position.coords.latitude);
	$("#long").val(position.coords.longitude);
}

function onError(error) {
	$("#lat").val(0);
	$("#long").val(0);
	}


//========================= Longin-Check user
function check_user() {
	var user_id=$("#user_id").val();
	var user_pass=$("#user_pass").val();
	
	localStorage.marketListStr='001<fd>Basundhara Road<rd>002<fd>kuril Road<rd>003<fd>Badda';
	localStorage.productListStr='001<fd>Supercrit<rd>002<fd>Powercrit';
	localStorage.distributorListStr='001<fd>ABC Traders<rd>002<fd>Jamuna Traders<rd>003<fd>Karim Traders';
	
	
	var url = "#pageHome";      
	$.mobile.navigate(url);
	//location.reload();
	/*if (cm_id=="" || cm_id==undefined || cm_pass=="" || cm_pass==undefined){
		var url = "#login";      
		$.mobile.navigate(url);
		$("#error_login").html("Required Rep ID and Rep Pass");	
	}else{
		$("#error_login").html("");	
		
		$("#login_image").show();
		$("#loginButton").hide();
		localStorage.cid='GP';
		localStorage.cm_id=cm_id;
   		localStorage.cm_pass=cm_pass;
   		//localStorage.synccode=synccode;
		localStorage.synced='NO'
   		
		//alert(apipath+'check_user?cid='+localStorage.cid+'&repid='+localStorage.cm_id+'&rep_pass='+localStorage.cm_pass+'&synccode='+localStorage.synccode);	
		//$("#error_login").html(apipath+'check_user?cid='+localStorage.cid+'&repid='+localStorage.cm_id+'&rep_pass='+localStorage.cm_pass+'&synccode='+localStorage.synccode);	
   		
		$.ajax({
				 type: 'POST',
				 url: apipath+'check_user?cid='+localStorage.cid+'&repid='+localStorage.cm_id+'&rep_pass='+localStorage.cm_pass+'&synccode='+localStorage.synccode,
				 success: function(result) {
					 	//$("#error_login").html('ajax');				
						if (result==''){
							$("#loginButton").show();
							$("#login_image").hide();
							alert ('Sorry Network not available');
							
						}else{
							
							var resultArray = result.split('<SYNCDATA>');			
							if (resultArray[0]=='FAILED'){
								$("#loginButton").show();
								$("#login_image").hide();
								$("#error_login").html('Unauthorized User');
								
							}else if (resultArray[0]=='SUCCESS'){
								$("#loginButton").show();
								$("#login_image").hide();
								
								
								localStorage.synccode=resultArray[1];
								localStorage.clientListStr=resultArray[2];
								localStorage.visitTypeListStr=resultArray[3];
								localStorage.repListStr=resultArray[4];
								
								var rep_string=resultArray[4];
															
								var repList = rep_string.split('<rd>');
								
								//======= Name of rep/KAM report
								var repListShowReport=''
								var rptRepListShowLength=repList.length
								if (rep_string!=''){									
									repListShowReport='<select name="rpt_rep" id="rpt_rep_id" data-native-menu="false"><option value="0" >Select KAM</option>'
									repListShowReport=repListShowReport+'<option value="ALL" >ALL</option>'
									for (var i=0; i < rptRepListShowLength; i++){
										var rptRepValueArray = repList[i].split('<fd>');
										var repID=rptRepValueArray[0];
										var repName=rptRepValueArray[1];																		
										repListShowReport=repListShowReport+'<option value="'+repID+'" >'+repName+'-'+repID+'</option>'
									}
									repListShowReport=repListShowReport+'</select>'									
								
								}
								localStorage.repListShowReport=repListShowReport;
								
								//====================
								
								localStorage.synced='YES';
								
								var url = "#menuPage";
								$.mobile.navigate(url);
								//location.reload();
								
							}else{
								$("#loginButton").show();
								$("#login_image").hide();
								$("#error_login").html('Unauthorized User');							
								}
						}
				      },
				  error: function(result) {
					  $("#loginButton").show();
					  $("#login_image").hide();
					  var url = "#login";
					  $.mobile.navigate(url);	
				  }
			  });//end ajax
		  }//end else	*/
	}//function






//=================after select an outlet
function clear_autho(){	
	localStorage.cid='';
	localStorage.user_id='';
	localStorage.user_pass='';
	
	var url = "#login";
	$.mobile.navigate(url);	
	location.reload();
	
}




function getSheduledRetailer(){
	
	var search_date=$("#sch_date").val();
	if (search_date=='' || search_date==undefined){
		search_date= '2014-08-28'//Date.getYear().toString()+'-'+Date.getMonth().toString()+'-'+Date.getDay().toString()
		}
	// ajax-------
	var client_string='c001<fd>ABC Traders<rd>c002<fd>Karim Traders<rd>c003<fd>Janata Traders<rd>c004<fd>Jamuna Traders'
	localStorage.client_string=client_string
	
	localStorage.search_date=search_date
	var url = "#page_scheduled";
	$.mobile.navigate(url);	
	location.reload();
	}


//===========  retailer/Client List Combo
function getClientList() {
	
	//var client_string=localStorage.clientListStr;
	
	var clientList = localStorage.client_string.split('<rd>');
	var clientListShowLength=clientList.length
	 	 
	var ob1 = $("#client_org_id");	
	//ob1.val('');
	//client_str='<select name="client" id="client_org_id" data-native-menu="false"><option value="0" >Retailer</option>';
	
	for (var i=0; i < clientListShowLength; i++){
		var clientValueArray = clientList[i].split('<fd>');
		var clientID=clientValueArray[0];
		var clientName=clientValueArray[1];
		//client_str=client_str+'<option value="'+clientID+'" >'+clientName+'-'+clientID+'</option>'
		ob1.append('<option value="'+clientName+'-'+clientID+'" >'+clientName+'-'+clientID+'</option>');
		
	}
	//client_str+='</select>';
	
	
	//var url = "#page_scheduled";
	//$.mobile.navigate(url);
}

//===========  sheduled retailer/client visit 
function sheduledRetailerVisitNext() {
	localStorage.client_str=$("#client_org_id").val();
	$(".m_client").text(localStorage.client_str);
	
	if(localStorage.client_str=='' || localStorage.client_str==0){
			$("#err_retailer_next").text("Retailer required");
		}else{
			$("#err_retailer_next").text("");
			var url = "#page_visit";			
			}
	$.mobile.navigate(url);
}



//===========  market List Combo
function addMarketList() {	
	var market_string=localStorage.marketListStr;
	
	var marketList = market_string.split('<rd>');
	var marketListShowLength=marketList.length	
	
	var ob1 = $("#market_cmb_id");
	
	var marketID='';
	var marketName='';
	
	for (var i=0; i < marketListShowLength; i++){
		var marketValueArray = marketList[i].split('<fd>');
		marketID=marketValueArray[0];
		marketName=marketValueArray[1];
		
		ob1.append('<option value="'+marketName+'-'+marketID+'" >'+marketName+'-'+marketID+'</option>');
	}
	
	var url = "#page_market";
	$.mobile.navigate(url);
}


//===========  market 
function marketNext() {
	localStorage.market_name=$("#market_cmb_id").val();
	//var client_string=localStorage.clientListStr;
	$(".market").text(localStorage.market_name);
	
	var m_client_string='c001<fd>ABC Traders<rd>c002<fd>Karim Traders<rd>c003<fd>Janata Traders<rd>c004<fd>Jamuna Traders'
	localStorage.m_client_string=m_client_string
	
	var mClientList = localStorage.m_client_string.split('<rd>');
	var mClientListShowLength=mClientList.length	
	
	var ob1 = $("#m_client_org_id");
			
	for (var i=0; i < mClientListShowLength; i++){
		var mClientValueArray = mClientList[i].split('<fd>');
		var mClientID=mClientValueArray[0];
		var mClientName=mClientValueArray[1];
		
		ob1.append('<option value="'+mClientName+'-'+mClientID+'" >'+mClientName+'-'+mClientID+'</option>');
		
	}
	
	var url = "#page_market_ret";
	$.mobile.navigate(url);
}


//===========  market retailer 
function marketRetailerNext() {
	localStorage.m_client_str=$("#m_client_org_id").val();
	$(".m_client").text(localStorage.m_client_str);	
	
	if(localStorage.m_client_str=='' || localStorage.m_client_str==0){
			$("#err_m_retailer_next").text("Retailer required");
		}else{
			$("#err_m_retailer_next").text("");
			var url = "#page_visit";			
			}
	$.mobile.navigate(url);
}



//=========== distributor List Combo
function delivery() {	
	var distributor_string=localStorage.distributorListStr;
	
	var distributorList = distributor_string.split('<rd>');
	var distributorListShowLength=distributorList.length	
	
	var ob1 = $("#dictrbutor_cmb_id");
	
	var marketID='';
	var marketName='';
	
	for (var i=0; i < distributorListShowLength; i++){
		var distributorValueArray = distributorList[i].split('<fd>');
		distributorID=distributorValueArray[0];
		distributorName=distributorValueArray[1];
		
		ob1.append('<option value="'+distributorName+'-'+distributorID+'" >'+distributorName+'-'+distributorID+'</option>');
	}
	
	var url = "#page_del_conf";
	$.mobile.navigate(url);
}


//===========  distributor client 
function distributorNext() {	
	localStorage.distributor_name=$("#dictrbutor_cmb_id").val();
	//var client_string=localStorage.clientListStr;
	$("#distributor").text(localStorage.distributor_name);
	
	if(localStorage.distributor_name=='' || localStorage.distributor_name==0){
			$("#err_distributor").text("Distributor required");
		}else{
			
			var dis_client_string='c001<fd>ABC Traders<rd>c002<fd>Karim Traders<rd>c003<fd>Janata Traders<rd>c004<fd>Jamuna Traders'
			localStorage.dis_client_string=dis_client_string
			
			var distClientList = localStorage.dis_client_string.split('<rd>');
			var distClientListShowLength=distClientList.length	
			
			var ob1 = $("#distributor_client_cmb_id");
					
			for (var i=0; i < distClientListShowLength; i++){
				var distClientValueArray = distClientList[i].split('<fd>');
				var distClientID=distClientValueArray[0];
				var distClientName=distClientValueArray[1];
				
				ob1.append('<option value="'+distClientName+'-'+distClientID+'" >'+distClientName+'-'+distClientID+'</option>');
				
				
			}			
			var url = "#page_del_item";
			$.mobile.navigate(url);		
	}
	
	
}


function addDeliveryItem(){
	var dist_retailer_name=$("#distributor_client_cmb_id").val();
	var del_supercrit=$("#qty_sup_del").val();
	var del_powercrit=$("#qty_pow_del").val();
	
	if(dist_retailer_name=='' || dist_retailer_name==0){
			$("#err_d_retailer").text("Retailer required");
		}else{			
			$("#tbl_delivery_item_prev").append("<tr><td colspan='2' style='background-color:#92C9C9; color:#F2F9F9; text-shadow:none;'><b>"+dist_retailer_name+"</b></td></tr><tr><td width='20%'>"+del_supercrit+"</td><td width='80%'>Supercrit</td></tr><tr><td width='20%'>"+del_powercrit+"</td><td width='80%'>Powercrit</td></tr>");
			$("#msg_add_delivery_item").text("Add");
			$("#qty_sup_del").val("");
			$("#qty_pow_del").val("");
		}
	}


function del_preview(){
		
	$("#del_retailer").text(localStorage.distributor_name);
	
		var url = "#page_del_preview";
		$.mobile.navigate(url);
	
	}

//===========  plan market List Combo
function addVisitPlanMarketList() {	
	var market_string=localStorage.marketListStr;
	
	var marketList = market_string.split('<rd>');
	var marketListShowLength=marketList.length	
	
	var ob1 = $("#visit_market_cmb_id");
	
	var marketID='';
	var marketName='';
	
	for (var i=0; i < marketListShowLength; i++){
		var marketValueArray = marketList[i].split('<fd>');
		marketID=marketValueArray[0];
		marketName=marketValueArray[1];
		
		ob1.append('<option value="'+marketName+'-'+marketID+'" >'+marketName+'-'+marketID+'</option>');
	}
	
	var url = "#page_market_visit_plan";
	$.mobile.navigate(url);
	//location.reload();
	
}


//===========  visit plan market next 
function visitPlanMarketNext() {
	localStorage.plan_market=$("#visit_market_cmb_id").val();
	localStorage.plan_date=$("#plan_date").val();
	$("#plan_market").text(localStorage.plan_market);
	$("#visit_plan_date").text(localStorage.plan_date);
	
	if(localStorage.plan_market=='' || localStorage.plan_market==0){
			$("#err_p_market").text("Market required");
		}else{			
				var plan_client_string='c001<fd>ABC Traders<rd>c002<fd>Karim Traders<rd>c003<fd>Janata Traders<rd>c004<fd>Jamuna Traders'
				localStorage.m_plan_client_string=plan_client_string
				
				var mPlanClientList = localStorage.m_plan_client_string.split('<rd>');
				var mPlanClientListShowLength=mPlanClientList.length	
				
				var ob1 = $("#visit_plan_client_cmb_id");
						
				for (var i=0; i < mPlanClientListShowLength; i++){
					var mPlanClientValueArray = mPlanClientList[i].split('<fd>');
					var mPlanClientID=mPlanClientValueArray[0];
					var mPlanClientName=mPlanClientValueArray[1];
					
					ob1.append('<option value="'+mPlanClientName+'-'+mPlanClientID+'" >'+mPlanClientName+'-'+mPlanClientID+'</option>');
					
				}
	
			$("#err_p_market").text("");
			var url = "#page_plan";			
			}
	$.mobile.navigate(url);
}


//---------------------- add retailer
function addVisitPlanRetailer(){
	var retailer_name=$("#visit_plan_client_cmb_id").val();
	$("#tbl_visit_plan_rev").append("<tr><td width='90%'>"+retailer_name+"</td><td width='10%' style='text-align:center'><a data-role='button' >X</a></td></tr>");
	$("#msg_add_visit_retailer").text("Add");
	}


function deliverySubmit(){
	
	var url = "#page_del_conf";	
	$.mobile.navigate(url);
	
	
	}
	
function visitPlanSubmit(){
	
	var url = "#page_market_visit_plan";	
	$.mobile.navigate(url);
	
	
	}



function lscDataSubmit(){
	
	var url = "#pageHome";	
	$.mobile.navigate(url);
	
	}









//--------------------------------------------- Exit Application
function exit() {
navigator.app.exitApp();
}

// ----------------Camera-----------------------------------------------
//Acheivement
function getImage() {
	navigator.camera.getPicture(onSuccessA, onFailA, { quality: 10,
		destinationType: Camera.DestinationType.FILE_URI });
}

function onSuccessA(imageURI) {
    var image = document.getElementById('myImageA');
    image.src = imageURI;
	imagePathA = imageURI;
	$("#lscPhoto").val(imagePathA);
}

function onFailA(message) {
	imagePathA="";
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
