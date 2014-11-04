$(document).ready(function() {

    $("#submitBookmark").click(function() {
        $("#bookmarkForm").validate({
            errorClass: "my-error-class",
            validClass: "my-valid-class",
            rules: {
                longitude: {
                    required: true,
                    range: [-180, 180]
                },
                latitude: {
                    required: true,
                    range: [-90, 90]
                }
            },
            messages: {
                longitude: "Please enter a valid longitude range.",
                latitude: "Please enter a valid latitude range."
            }
        });
        
        if ($("#bookmarkForm").valid()) {
            insertBookmark();
        }
    });

});

function emptyMessageDiv() {
    $("#message").html("");
    $("#message").removeAttr("style")
}

function insertBookmark() {

    $.ajax({
        contentType: 'application/json',
        data: {
            "article": JSON.stringify(collectData())
        },
        dataType: 'json',
        success: function(message) {
            $("#message")
	            .html(
	                "<button class='close' type='button' onclick='emptyMessageDiv()'>×</button><p>" + message + "</p>");
	        $("#message").css("background-color", "#DFF0D8");
	        $("#message").css("border", "1px solid #D6E9C6");
	        $("#message").css("color", "#468847");
	        $("#message").css("border-radius", "15px");
	        $("#message").css("padding-left", "10px");
	        $("input[type=text]").val("");
            
        },
        error: function(a, b, c) {
            $("#message")
                .html(
                    "<button class='close' onclick='emptyMessageDiv()' type='button'>×</button><p>Server error bookmark not stored to server.</p>");
            $("#message").css("background-color", "#F2DEDE");
            $("#message").css("border", "1px solid #EED3D7");
            $("#message").css("color", "#B94A48");
            $("#message").css("border-radius", "15px");
            $("#message").css("padding-left", "10px");
        },
        // processData : false,
        type: 'POST',
        url: ctx.siteUrl + '/ws/v1/pubmap/v1.0.0/article'
    });
}

function collectData() {

    var megxbar = {
        title: msg.article.title,
        authors: msg.article.authors,
        lon: $('#longitude').val(),
        lat: $('#latitude').val()
    };


    var article = {
        pmid: msg.article.pmid,
        url: msg.article.url,
        lon: $('#longitude').val(),
        lat: $('#latitude').val(),
        megxBarJSON: JSON.stringify(megxbar),
        articleXML: msg.article.xml
    };

    return article;

};