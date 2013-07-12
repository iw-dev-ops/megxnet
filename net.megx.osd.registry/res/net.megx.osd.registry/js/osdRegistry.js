$(document).ready(function() {
	
	$("#submitOSDParticipant").click(function() {
		$("#participantForm").validate({
			rules: {
				siteName: {
					required: true
				},
				institution: {
					required: true
				},
				institutionAddress: {
					required: true
				},
				country: {
					required: true
				},
				institutionWebAddress: {
					required: true,
					url: true
				},
				siteCoordinator: {
					required: true
				},
				coordinatorEmail: {
					required: true,
					email: true
				},
				siteLat: {
					required: true,
					number: true
				},
				siteLong: {
					required: true,
					number: true
				},
				institutionLat: {
					required: true,
					number: true
				},
				institutionLong: {
					required: true,
					number: true
				}
			}
		});
		if($("#participantForm").valid()){
			submitParticipant();
		}
	});
	
	var ajaxCall = function(httpVerb, url, data, successHandler, errorHandler){
		$.ajax({
			  type: httpVerb,
			  url: url,
			  data: data,
			  contentType : "application/json",
			  success: function(data){
				  successHandler.call(this, data);
			  },
			  error: function(jqXHR, textStatus, errorThrown ){
				  errorHandler.call(this, data, jqXHR, textStatus, errorThrown );
			  }
		});
	};
	
	var loadParticipantData = function(id, handler){
		var url = ctx.siteUrl + "/ws/v1/OSDRegistry/v1.0.0/getParticipant";
		
		ajaxCall("GET", url, {id:id}, handler);
	};

	var submitParticipant = function() {
		
		var url = "";
		var redirectUrl = ctx.siteUrl + "/osd/list";
		
		if(isInEditMode){
			url = ctx.siteUrl + "/ws/v1/OSDRegistry/v1.0.0/updateParticipant";
		} else{
			url = ctx.siteUrl + "/ws/v1/OSDRegistry/v1.0.0/addParticipant";
		}
		
		ajaxCall("POST", url, JSON.stringify(retrieveFormData()), redirectToURL(redirectUrl));
	};
	
	var redirectToURL = function(url){
		window.location.href = url;
	};
	
	var retrieveFormData = function(){
		var populatedObject = {
			"siteName" : $("#siteName").val(),
			"institution" : $("#institution").val(),
			"institutionAddress" : $("#institutionAddress").val(),
			"country" :$("#country").val(),
			"institutionWebAddress" : $("#institutionWebAddress").val(),
			"siteCoordinator" : $("#siteCoordinator").val(),
			"coordinatorEmail" : $("#coordinatorEmail").val(),
			"siteLat" : $("#siteLat").val(),
			"siteLong" : $("#siteLong").val(),
			"institutionLat" : $("#institutionLat").val(),
			"institutionLong" : $("#institutionLong").val(),
			"id" : isInEditMode == true ? participantID : ""
		};
		
		return populatedObject;
	};
	
	var populateFormData = function(retrievedData){
		$("#siteName").val(retrievedData.siteName);
		$("#institution").val(retrievedData.institution);
		$("#institutionAddress").val(retrievedData.institutionAddress);
		$("#country").val(retrievedData.country);
		$("#institutionWebAddress").val(retrievedData.institutionWebAddress);
		$("#siteCoordinator").val(retrievedData.siteCoordinator);
		$("#coordinatorEmail").val(retrievedData.coordinatorEmail);
		$("#siteLat").val(retrievedData.siteLat);
		$("#siteLong").val(retrievedData.siteLong);
		$("#institutionLat").val(retrievedData.institutionLat);
		$("#institutionLong").val(retrievedData.institutionLong);
	};
	
	if(typeof isInEditMode != 'undefined' && isInEditMode){
		loadParticipantData(participantID, populateFormData);
	}
	
	$('a.deleteParticipantClass').live('click', function(){
		var recordID = $(this).attr("id");
		$("#deleteDialog").data("id", recordID).dialog('open');
		return false;
	});
	
	var deleteParticipant = function(id){
		var url = ctx.siteUrl + "/ws/v1/OSDRegistry/v1.0.0/deleteParticipant";
		var redirectUrl = ctx.siteUrl + "/osd/list";
		
		ajaxCall("POST", url, {id:id}, deleteDialogSuccess(redirectUrl), deleteDialogError);
	};
	
	var deleteDialogSuccess = function(redirectUrl){
		$("#deleteDialog").dialog( "close" );
		  window.location.href = redirectUrl;
	};
	
	var deleteDialogError = function() {
		$("#deleteDialog").dialog( "close" );
	};
	
	$("#deleteDialog").dialog({
		  resizable: false,
	      autoOpen: false,
		  height: 150,
		  width: 320,
	      modal: true,
	      title: "Confirm delete",
	      buttons: {
	        Ok: function() {
	          var id = $(this).data("id");
	          deleteParticipant(id);
	        },
	        Cancel: function() {
	          $( this ).dialog( "close" );
	        }
	      }
	});
	
	$('a.viewParticipantClass').live('click', function(){
		var recordID = $(this).attr("name");
		$('.MapBox div').each(function(){
			if($(this).css("z-index")){
				var z = $(this).css("z-index") - 100;
				if(!$(this).attr("z")){
					$(this).css("z-index", z);
					$(this).attr("z", "true");
				}
				
			}
		});
		$("#viewDialog").data("id", recordID).dialog("open");
		return false;
	});
	
	$("#viewDialog").dialog({
		  resizable: false,
	      autoOpen: false,
		  height: 'auto',
		  width: 600,
	      modal: true,
	      title: "OSD participant info",
	      buttons: {
	        Close: function() {
	          $( this ).dialog( "close" );
	        }
	      },
	      open: function(){
	    	  var id = $(this).data("id");
	    	  loadParticipantData(id, populateViewDialog);
	      }
	});
	
	var populateViewDialog = function(retrievedData){
		$("#siteNameVal").text(retrievedData.siteName);
		$("#institutionVal").text(retrievedData.institution);
		$("#institutionAddressVal").text(retrievedData.institutionAddress);
		$("#countryVal").text(retrievedData.country);
		var webAddress = "<a href='" + retrievedData.institutionWebAddress + "'>" + retrievedData.institutionWebAddress + "</a>";
		$("#institutionWebAddressVal").html(webAddress);
		$("#siteCoordinatorVal").text(retrievedData.siteCoordinator);
		$("#coordinatorEmailVal").text(retrievedData.coordinatorEmail);
		$("#siteLatVal").text(retrievedData.siteLat);
		$("#siteLongVal").text(retrievedData.siteLong);
		$("#institutionLatVal").text(retrievedData.institutionLat);
		$("#institutionLongVal").text(retrievedData.institutionLong);
	};
	
	$(".addNewParticipant").click(function(){
		window.location.href = ctx.siteUrl + "/osd/add";
	});

});