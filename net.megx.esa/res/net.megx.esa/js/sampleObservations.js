$(document).ready(function(){
	var NB_OBSERVATIONS = 2;
	var OBSERVATIONS_URL = ctx.siteUrl + '/ws/esa/observations/';
	var SAMPLE_THUMBNAILS_URL = ctx.siteUrl + '/ws/esa/content/photo/thumbnail/';
	var NO_IMAGE_ICON_URL = ctx.siteUrl + '/net.megx.esa/img/no_photo.png';
	
	var ajaxCall = function (httpVerb, url, data, successHandler, errorHandler) {
        $.ajax({
            type: httpVerb,
            url: url,
            data: data,
            success: function (response) {
                if (successHandler) {
                    successHandler.call(this, response.data);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (errorHandler) {
                    errorHandler.call(this, response, jqXHR, textStatus, errorThrown);
                }
            }
        });
    };
	
    var renderObservation = function(observation){
    	observation = observation || {};
    	var imgSrc = observation.thumbnailId ? SAMPLE_THUMBNAILS_URL + observation.thumbnailId : NO_IMAGE_ICON_URL;
    	var htmlToRender = ['<table style="width: 100%;">',
    	                    	'<tr style="width: 100%;">',
    	                    		'<td style="width: 40%;">',
    	                    			'<img src="', imgSrc ,'" + style="width: 100px; padding-left: 15px; padding-top: 7px; border-radius: 4px;" />',
    	                    		'</td>',
    	                    		'<td>',
    	                    			'<table style="width: 100%;"',
    	                    				'<tr>',
    	                    					'<td>Observer: ', observation.observer, '</td>',
	                    					'</tr>',
	                    					'<tr>',
		                    					'<td>Place: Fiji Helgoland </td>',
	                    					'</tr>',
	                    					'<tr>',
	                    						'<td>Ocean: Atlantic ocean </td>',
                    						'</tr>',
	                    					'<tr>',
		                    					'<td>Date: ', observation.taken, '</td>',
	                    					'</tr>',
                    					'</table>',
                					'</td>',
	                    		'</tr>',
                    		'</table>'
    	                    ].join('');
    	
    	$('#recentObservations').after(htmlToRender);
    	
    };
    
	var getLatestObservations = function () {
	    ajaxCall('GET', OBSERVATIONS_URL + NB_OBSERVATIONS, null, function (response) {
	        $.each(response, function(i, observation){
	        	renderObservation(observation);
	        });
	    }, function (jqXHR, textStatus, errorThrown) {
	        console.log('Error occured while retrieving latest observations: ', errorThrown);
	    });
	}();
});