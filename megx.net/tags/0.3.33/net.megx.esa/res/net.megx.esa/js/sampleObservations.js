$(document).ready(function(){
	var NB_OBSERVATIONS = 2;
	var OBSERVATIONS_URL = ctx.siteUrl + '/ws/v1/esa/v1.0.0/observations/';
	var SAMPLE_THUMBNAILS_URL = ctx.siteUrl + '/ws/v1/esa/v1.0.0/content/photo/thumbnail/';
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
	
    handleError = function(img){
		console.log('error event called!!!');
		$(img).attr('src', NO_IMAGE_ICON_URL);
	};
    
    var renderObservation = function(observation){
    	observation = observation || {};
    	var imgSrc = observation.thumbnailId ? SAMPLE_THUMBNAILS_URL + observation.thumbnailId : NO_IMAGE_ICON_URL;
    	var htmlToRender = ['<table style="width: 100%;">',
    	                    	'<tr style="width: 100%;">',
    	                    		'<td style="width: 35%;">',
    	                    			'<img src="', imgSrc ,'" + style="width: 100px; padding-left: 3px; padding-top: 7px; border-radius: 4px;" onError="handleError(this);" />',
    	                    		'</td>',
    	                    		'<td>',
    	                    			'<table style="width: 100%;"',
    	                    				'<tr>',
    	                    					'<td>Observer: ', observation.observer, '</td>',
	                    					'</tr>',
	                    					'<tr>',
		                    					'<td>Sample name:', observation.sampleName ,'</td>',
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
    	
    	$('#recentObservations').append(htmlToRender);
    	
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