/**! jQuery UI FormaliZe Plugin  v0.1 Rácz Tibor Zoltán <racztiborzoltan@gmail.com> BSD license */
/**
 * jQuery UI FormaliZe Plugin
 *
 * Requirements:
 * 	- jQuery 1.9+
 * 	- jQuery UI 1.9+
 *
 * Inspired by:
 *  - http://www.tuttoaster.com/enhancing-forms-using-jquery-ui/
 *  - https://github.com/fabiant7t/jQuery-UI-Forms-Plugin
 *
 * @author Rácz Tiobr Zoltán <racztiborzoltan@gmail.com>
 * @version 0.1
 * @license http://www.opensource.org/licenses/bsd-license.php
 *
 * Hungarian todo list:
 * @todo majd át kell nézni, hogy milyen plussz CSS osztályokat érdemes hozzáadni
 *       az egyes elemekhez (pl. ui-form-checkbox az <input> mezőhoz, vagy inkább
 *       már a vizuális checkbox-hoz?)
 * @todo ui-state-disabled osztály hozzáadása a gombokhoz? Megfontolás! Forrás: http://www.tuttoaster.com/enhancing-forms-using-jquery-ui/
 */
;(function ( $, window, document, undefined ) {

	var NAMESPACE = 'z';
	var WIDGETNAME = 'formalize';
	
	var WIDGET_VERSION = '0.1';
	
	$.widget( NAMESPACE + "." + WIDGETNAME , {
		
		options: {
			defaultEvents:{
				mouseenter: function() { $(this).addClass('ui-state-hover'); },
				mouseleave: function() { $(this).removeClass('ui-state-hover'); },
				mousedown: function() { $(this).toggleClass('ui-state-active'); },
				mouseup: function() { $(this).toggleClass('ui-state-active'); },
				focus: function() { $(this).toggleClass('ui-state-active'); },
				blur: function() { $(this).toggleClass('ui-state-active'); },
			},
			/**
			 * Structure:
			 * {
			 * 	'selector' : callback_function,
			 * 	...
			 * }
			 * 
			 * Arguments of 'callback_function':
			 * 	ui - object
			 * 		Structure:
			 * 			{
			 * 				'element' : jquery object with matched element or elements,
			 * 				'widget' : widget instance
			 * 			}
			 * 
			 *  In callback function the 'this' variable equal to 'ui.widget'!
			 * 
			 * @var object
			 */
			selectors: {
				'form' : function(ui){
					ui.element.addClass('ui-form ui-widget ui-widget-content ui-corner-all');
				},
				'fieldset': function(ui){
					ui.element.addClass('ui-form-fieldset ui-widget-content ui-corner-all');
				},
				'legend': function(ui){
					ui.element.addClass('ui-form-legend ui-widget-header ui-corner-all');
				},
				'label': function(ui){
					ui.element.addClass('ui-form-label');
				},
				':input': function(ui){
					ui.element.addClass('ui-state-default ui-corner-all');
				},
				'input': function(ui){
					ui.element.addClass('ui-form-input');
				},
				'textarea': function(ui){
					ui.element.addClass('ui-form-textarea');
				},
				':text': function(ui){
					ui.element.addClass('ui-form-text');
				},
				':password': function(ui){
					ui.element.addClass('ui-form-password');
				},
				':radio': function(ui){
					ui.element.addClass('ui-form-radio');
					ui.widget._radio(ui.element);
				},
				':checkbox': function(ui){
					ui.element.addClass('ui-form-checkbox');
					ui.widget._checkbox(ui.element);
				},
				':file': function(ui){
					ui.element.addClass('ui-form-file');
					ui.widget._file(ui.element);
				},
				':submit': function(ui){
					ui.element.addClass('ui-form-button ui-form-submit');
				},
				':image': function(ui){
					ui.element.addClass('ui-form-button ui-form-image');
				},
				':reset': function(ui){
					ui.element
						.addClass('ui-form-button ui-form-reset')
						.addClass('ui-priority-secondary');
				},
				':button': function(ui){
					ui.element.addClass('ui-form-button');
				},
				'input, button, textarea, select': function(ui){
					ui.element
						.on('mouseenter'+ui.widget.eventNamespace, ui.widget.options.defaultEvents.mouseenter)
						.on('mouseleave'+ui.widget.eventNamespace, ui.widget.options.defaultEvents.mouseleave)
						.on('mousedown'+ui.widget.eventNamespace, ui.widget.options.defaultEvents.mousedown)
						.on('mouseup'+ui.widget.eventNamespace, ui.widget.options.defaultEvents.mouseup)
						.on('focus'+ui.widget.eventNamespace, ui.widget.options.defaultEvents.focus)
						.on('blur'+ui.widget.eventNamespace, ui.widget.options.defaultEvents.blur);
				},
				'button, input:reset, input:submit, input[type="button"]': function(ui){
					ui.element.addClass('ui-priority-primary ui-corner-all');
				},
				'select': function(ui){
				}
			}
		},

		//Setup widget (eg. element creation, apply theming, bind events etc.)
		_create: function () {
			var widget = this;
			var $temp = null;
			
			for(var selector in widget.options.selectors)
			{
				$temp = $(widget.element);
				
				if ($temp.hasClass('ui-form-no')) continue;
				
				if ($temp.is(selector))
				{
					widget._call_selector_callback($temp, selector);
					continue;
				}
				$temp = $(selector, widget.element);
				if ($temp.length)
				{
					widget._call_selector_callback($temp, selector);
					continue;
				}
				
			}
			
		},
		
		
		_call_selector_callback: function($jquery_object, selector)
		{
			var widget = this;
			$jquery_object.each(function(){
				var ui = {};
				ui.element = $(this);
				ui.widget = widget;
				widget.options.selectors[selector].call(widget, ui);
			});
			
		},
		
		
		// -------------------------------------------------------------------------
		// _checkbox function:
		//
		_checkbox: function(element)
		{
			var widget = this;
			// The real input checkbox:
			var $checkbox = $(element);

			// Base of visual jQuery UI checkbox, and binding events:
			var $spans = $('<span class="ui-state-default ui-corner-all ui-form-checkbox"><span class="ui-icon ui-icon-empty"></span></span>')
				.on('mouseenter'+widget.eventNamespace, widget.options.defaultEvents.mouseenter)
				.on('mouseleave'+widget.eventNamespace, widget.options.defaultEvents.mouseleave)
				.on('mousedown'+widget.eventNamespace, widget.options.defaultEvents.mousedown)
				.on('mouseup'+widget.eventNamespace, widget.options.defaultEvents.mouseup)
				.on('checkboxfocus'+widget.eventNamespace, widget.options.defaultEvents.focus)
				.on('checkboxblur'+widget.eventNamespace, widget.options.defaultEvents.blur)
				// Insert spans after the real checkbox:
				.insertAfter($checkbox)
				// The real checkbox into outer <span>:
				.append($checkbox);
			
			$checkbox
				.on('focus'+widget.eventNamespace, function(){
					$(this).parent().trigger('checkboxfocus');
				})
				.on('blur'+widget.eventNamespace, function(){
					$(this).parent().trigger('checkboxblur');
				});


			// If real checkbox is not displayed, then hide visual checkbox with CSS class:
			if ($checkbox.css('display')=='none') $spans.addClass('ui-helper-hidden-accessible');

			// The real input checkbox hide with CSS class:
			$checkbox = $checkbox.addClass('ui-helper-hidden-accessible');

			// Change CSS type of inner <span> if the real checkbox is default checked:
			if ($checkbox.is(':checked')) $('span.ui-icon', $spans).toggleClass('ui-icon-empty ui-icon-check');

			// Change event on real checkbox input:
			$checkbox.on('change'+widget.eventNamespace, function(e){
				// Change CSS type of inner <span> if this checkbox is checked:
				$inner_span = $(this).siblings('span');
				if (this.checked) $inner_span.removeClass('ui-icon-empty').addClass('ui-icon-check');
				else $inner_span.addClass('ui-icon-empty').removeClass('ui-icon-check');
			});

			// If checkbox not in <label>, then define a click event on outer <span>:
			if ($checkbox.parents('label').length==0)
			{
				$spans.on('click', function(e){
					// if and only if, then click on outer <span>:
					if (!$(e.target).is('input'))
					{
						$checkbox = $('input', this);
						if ($checkbox.is(':checked')) $checkbox.removeAttr('checked').change();
						else $checkbox.attr('checked', 'checked').change();
						$checkbox.trigger('focus');
					}
				});
			}
		},
		// END ._checkbox()
		// -------------------------------------------------------------------------
		
		
		// -------------------------------------------------------------------------
		// _radio function:
		//
		_radio: function(element)
		{
			var widget = this;
			// The real input radio:
			var $radio = $(element);

			// Base of visual jQuery UI radio, and binding events:
			var $spans = $('<span class="ui-state-default ui-corner-all ui-form-radio"><span class="ui-icon ui-icon-radio-off"></span></span>')
				.on('mouseenter'+widget.eventNamespace, widget.options.defaultEvents.mouseenter)
				.on('mouseleave'+widget.eventNamespace, widget.options.defaultEvents.mouseleave)
				.on('mousedown'+widget.eventNamespace, widget.options.defaultEvents.mousedown)
				.on('mouseup'+widget.eventNamespace, widget.options.defaultEvents.mouseup)
				.on('radiofocus'+widget.eventNamespace, widget.options.defaultEvents.focus)
				.on('radioblur'+widget.eventNamespace, widget.options.defaultEvents.blur)
				.insertAfter($radio)
				// The real radio input into outer <span>:
				.append($radio);
			$radio
				.on('focus'+widget.eventNamespace, function(){
					$(this).parent().trigger('radiofocus');
				})
				.on('blur'+widget.eventNamespace, function(){
					$(this).parent().trigger('radioblur');
				});


			// If real radio input is not displayed, then hide visual radio with CSS class:
			if ($radio.css('display')=='none') $spans.addClass('ui-helper-hidden-accessible');

			// The real radio input hide with CSS class:
			$radio = $radio.addClass('ui-helper-hidden-accessible');

			// Change CSS type of inner <span> if the real radio input is default checked:
			if ($radio.is(':checked')) $('span.ui-icon', $spans).toggleClass('ui-icon-radio-off ui-icon-bullet');

			// Change event on real radio input:
			$radio.on('change'+widget.eventNamespace, function(e){
				if ($(this).attr('name'))
				{
					// Az összes ilyen nevű elemnek a megfelelő <span> viziuális
					// elemét "unchecked" állapotúra kell állítani:
					$('[name="'+$(this).attr('name')+'"]').siblings('span.ui-icon').addClass('ui-icon-radio-off').removeClass('ui-icon-bullet');
					// Csak a kattintott elemhez tartozó <span> kap "checked" állapotot:
					$(this).siblings('span.ui-icon').addClass('ui-icon-bullet').removeClass('ui-icon-radio-off');
				}
			});

			// If radio not in <label>, then define a click event on outer <span>:
			if ($radio.parents('label').length==0)
			{
				$spans.on('click', function(e){
					// if and only if, then click on outer <span>:
					if (!$(e.target).is('input'))
					{
						$radio = $('input', this);
						if ($radio.is(':checked')) $radio.removeAttr('checked').change();
						else $radio.attr('checked', 'checked').change();
					}
				});
			}
		},
		// END ._radio()
		// -------------------------------------------------------------------------
		
		
		// -------------------------------------------------------------------------
		// _file function:
		//
		_file: function(element, context, object){
			var widget = this;
			// Hide the real file input with CSS class:
			var $file = $(element).addClass('ui-helper-hidden-accessible');

			// Base of visual jQuery UI file input, and binding events:
			var $spans = $('<span class="ui-state-default ui-corner-all ui-form-input ui-form-file"><span class="ui-icon ui-icon-disk"></span><span class="ui-form-file-name"></span></span>')
				.on('filefocus'+widget.eventNamespace, widget.options.defaultEvents.focus)
				.on('fileblur'+widget.eventNamespace, widget.options.defaultEvents.blur)
				.insertAfter($file)
				// The real file input into outer <span>:
				.append($file)
				// Hide the file name container:
				.find('.ui-form-file-name').hide().end();
			$file
				.on('focus'+widget.eventNamespace, function(){
					$(this).parent().trigger('filefocus');
				})
				.on('blur'+widget.eventNamespace, function(){
					$(this).parent().trigger('fileblur');
				});

			
			// If real file input is not displayed, then hide visual file input with CSS class:
			if ($file.css('display')=='none') $spans.addClass('ui-helper-hidden-accessible');

			//
			// Original source and idea: http://viget.com/inspire/custom-file-inputs-with-a-bit-of-jquery
			//
			$file.on('change focus click', function(e){
				var $this = $(this), valArray = $this.val().split('\\'), newVal = valArray[valArray.length-1];
				if(newVal !== '')  $this.siblings('.ui-form-file-name').html(newVal).show();
			}).change();
		},
		// END ._file()
		// -------------------------------------------------------------------------
		
		
		/**
		 * Return version of widget
		 */
		version: function()
		{
			return WIDGET_VERSION;
		},
		
		// Destroy an instantiated plugin and clean up
		// modifications the widget has made to the DOM
		destroy: function () {
			// For UI 1.8, destroy must be invoked from the
			// base widget
			if ($.ui.version.search('1.8.')!=-1)
				$.Widget.prototype.destroy.call(this);
			// For UI 1.9, define _destroy instead and don't worry about
		},

		// Respond to any changes the user makes to the
		// option method
		_setOption: function ( key, value ) {
			switch (key) {
				default:
					this.options[ key ] = value;
					break;
			}
			
			// For UI 1.8, _setOption must be manually invoked
			// from the base widget
			if ($.ui.version.search('1.8.')!=-1)
				$.Widget.prototype._setOption.apply( this, arguments );
			// For UI 1.9 the _super method can be used instead
			if ($.ui.version.search(/^1.(9|10)./)!=-1)
				this._super( "_setOption", key, value );
		}
	});
	
})( jQuery, window, document );