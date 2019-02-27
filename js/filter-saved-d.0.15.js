/*
 FSF Filter Save  Field - v0.15 rtm - https://fsf.dev/ 
 Copyright 2018 fenopix

  --------------------- License Information --------------------
 FSF is a commercial product which requires purchase of license. 
 Without a commercial license you can use it for evaluation purposes for upto 30 days. 
 Please refer to the following link for further details.
 https://fsf.dev/license/
 */
(function ($) {
	window.class_form = $('.hsf');
	window.debug = true; // Set true if you need to look all the steps in your console log
	window.autosubmit = false; // apply the filter in the form

    $.Fsf = function (debug, form) { //renamed arg for readability
        // this.class_form = (form instanceof $) ? window.class_form : $('.'+class_form);
        // console.log(this.class_form);
    };

    //assigning an object literal to the prototype is a shorter syntax
    //than assigning one property at a time
    $.Fsf.prototype = {
    	Constructu: function () {

    		var that = this;

    		if(window.class_form.length > 0) {
				window.class_form.each(function(i, obj) {
					for (var ind = obj.length - 2; ind >= 0; ind--) {

						if(obj.getAttribute('action') != '' || obj.getAttribute('action') != null) {
							if (obj[ind] !== "undefined" && obj.getAttribute('action') !== 'undefined' && obj[ind].getAttribute('name') !== 'undefined') {
								obj[ind].addEventListener('blur', function () {
									if($(this).attr('type') == 'text') {
										var valor = $(this)[0].value;
									} else {
										var valor = $('#'+$(this)[0].id+' :selected').val();
									}
									that.saveStorage(
										that.makeKeyStorage(obj.getAttribute('action'), $(this).attr('name')),
										valor);
								}, true);

								// set all value why saved in storage
								if(obj[ind].getAttribute('name') != '') {
										var value = that.loadStorage(that.makeKeyStorage(obj.getAttribute('action'), obj[ind].getAttribute('name')));
										if(typeof value !== 'undefined' && value != '' && value != null) {
											if(obj[ind].getAttribute('type') == 'text') {
												obj[ind].value=String(value);
											} else {
												that.SelectElement(obj[ind].id, value);
											}
										}
								}
							}
						}

					};
				});
    		}
    	},

		saveStorage: function(key, value) {
			if (typeof(Storage) !== "undefined") {
				localStorage.setItem(key, value);
			} else {
				that.printError('Sorry, your browser does not support web storage...\n', true);
			}
		},

		loadStorage: function(element) {
			return localStorage.getItem(element);
		},

		loadAllStorage: function() {
			for (var i = 0; i < localStorage.length; i++){
				obj.setAttribute('value	' ,value);
				var arr = localStorage.getItem(localStorage.key(i)).split('___');
			}
		},

		makeKeyStorage: function(referemcia, element) {
			var key = referemcia+'___'+element;
			return key;
		},

		SelectElement: function(id, valueToSelect) {
			var element = document.getElementById(id);
			element.value = valueToSelect;
		},

        getLocated: function () {
			var x = document.getElementById("demo");

			function getLocation() {
			  	if (navigator.geolocation) {
			    	navigator.geolocation.getCurrentPosition(showPosition);
				} else {
					that.printError('Geolocation is not supported by this browser.\n', true);
			  	}
			}

			function showPosition(position) {
				if(window.debug == true) {
					console.log("Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude);
				}
			}
        },

		printError: function(error, explicit) {
		    console.log(`[${explicit ? 'EXPLICIT' : 'INEXPLICIT'}] ${error.name}: ${error.message}`);
		}

    };

}(jQuery));

//so you can use it as:
var Fsf = new $.Fsf(true);
Fsf.Constructu();