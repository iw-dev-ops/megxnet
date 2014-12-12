MegxFormWidget = function(cfg) {

	Alpaca.defaultUI = "jquery-ui";
	Alpaca.logLevel = Alpaca.ERROR;
	this.renderForm(cfg);

}
MegxFormWidget.prototype = {

	submitForm : function(field) {
		var form = field.form;

		if (form) {
			form.refreshValidationState(false);

			form
					.registerSubmitHandler(function(e, form) {
						// validate the entire form (top control + all children)
						form.validate(true);
						// draw the validation state (top control + all
						// children)
						form.refreshValidationState(true);

						// now display something
						if (form.isFormValid()) {
							var json = form.getValue();
							var formJson = JSON.stringify(field.getValue());
							// alert("formJson: " + formJson);
							$('<input/>').attr('name', 'json').attr('value',
									formJson).appendTo("#" + cfg.formId);
						} else {
							alert("There is wrong input.  Please make necessary corrections as (hopefully) indicated.");
							return false;
						}
						e.stopPropagation();
						return true;
					});
		}
	},

	renderForm : function(cfg) {

		var alpacaOptions = {
			"optionsSource" : cfg.optionsLocation,
			"schemaSource" : cfg.schemaLocation,
			"view" : {

				"parent" : "VIEW_JQUERYUI_CREATE",

			},

			"isDynamicCreation" : true,

			"postRender" : function(field) {
				var form = field.form;

				if (form) {
					form.refreshValidationState(false);

					form
							.registerSubmitHandler(function(e, form) {
								// validate the entire form (top control + all
								// children)
								form.validate(true);
								// draw the validation state (top control + all
								// children)
								form.refreshValidationState(true);

								// now display something
								if (form.isFormValid()) {
									var json = form.getValue();
									var formJson = JSON.stringify(field
											.getValue());
									// alert("formJson: " + formJson);
									$('<input/>').attr('name', 'json').attr(
											'value', formJson).appendTo(
											"#" + cfg.formId);
								} else {
									alert("There is wrong input.  Please make necessary corrections as (hopefully) indicated.");
									return false;
								}
								e.stopPropagation();
								return true;
							});
				}
			}
		};

		var buts = {
        	"done" : {
        		"validateOnClick" : true,
        		"onClick" : function() {
//        			alert("done clicked."); 
        			submitForm( $("#" + cfg.formId) )
        		}
        	},
        		
          "next" : {
            "validateOnClick" : true,
            "onClick" : function() {
//            alert("Fired next.onClick handler");
            }
          },
          "prev" : {
            "validateOnClick" : true,
            "onClick" : function() {
            //alert("Fired prev.onClick handler");
            }
          }
        };
		
		// now adding wizard to view in case we have one
		if (typeof cfg.wizard != "undefined" && cfg.wizard) {
			alpacaOptions.view.wizard = cfg.wizard;
			alpacaOptions.view.wizard.buttons = buts;
		}

		$("#" + cfg.target).alpaca(alpacaOptions);
	}
}