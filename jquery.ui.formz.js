/**! jQuery UI FormaliZe Plugin  v0.1 Rácz Tiobr Zoltán <racztiborzoltan@gmail.com> BSD license */
/**
 * jQuery UI FormaliZe Plugin
 * 
 * Requirements:
 * 	- jQuery 1.7+
 * 	- jQuery UI 1.8+ 
 * 
 * Inspired by:
 *  - http://www.tuttoaster.com/enhancing-forms-using-jquery-ui/
 *  - https://github.com/fabiant7t/jQuery-UI-Forms-Plugin
 * 
 * @author Rácz Tiobr Zoltán <racztiborzoltan@gmail.com>
 * @version 0.1
 * @license http://www.opensource.org/licenses/bsd-license.php
 * 
 * To be continued ... ! Please Wait!
 * 
 * Hungarian todo list:
 * @todo options.button.createUIButton beállítás leprogramozása
 * @todo ui-state-disabled osztály hozzáadása a gombokhoz? Megfontolás! Forrás: http://www.tuttoaster.com/enhancing-forms-using-jquery-ui/
 * @todo button() metódus felülvizsgálata
 * @todo Ha van egy stílus választó, amely később más stíluslapot tölt be,
 *       akkor hatástalanítja a .ui-icon-empty osztály beállításait!
 *       Ideiglenes megoldásként a hozzá tartozó egyéni CSS stílus szabály
 *       szelektora van szűkebbre szabva, mint a dinamikusan betöltött jQuery UI
 *       téma fájljában lévő azon szabály, amely felülbírálja az .ui-icon-empty
 *       saját szabályt! 
 */
;(function($) {
$.widget("ui.formz",
{
	// Default settings:
	options: { 
		/**
		 * Class of hidden items
		 * @var string
		 */
		hiddenClass: 'ui-helper-hidden-accessible',
		/**
		 * With widget connected event namespace name
		 * @var string
		 */
		eventNamespace: '.ui-form',
		/**
		 * General events BEGIN!!
		 */
		mouseenter: function() { $(this).addClass('ui-state-hover'); },
		mouseleave: function() { $(this).removeClass('ui-state-hover'); },
		mousedown: function() { $(this).toggleClass('ui-state-active'); },
		mouseup: function() { $(this).toggleClass('ui-state-active'); },
		/**
		 * General events END!!
		 */
		/**
		 * Visual button settings:
		 */
		button:{
			/**
			 * Default button CSS classes
			 * @var string
			 */
			classes: 'ui-priority-primary ui-corner-all',
			/**
			 * Create jQuery UI Button with .button() method?
			 * @var boolean
			 */
			createUIButton: false,
			uiButtonSettings: {},
		},
		/**
		 * Visual checkbox settings:
		 */
		checkbox:{
			/**
			 * Class of checked visual checkbox
			 * @var string
			 */
			checkedClass: 'ui-icon-check',
			/**
			 * Class of unchecked visual checkbox
			 * @var string
			 */
			uncheckedClass: 'ui-icon-empty',
			mouseenter: function() { $(this).addClass('ui-state-hover'); },
			mouseleave: function() { $(this).removeClass('ui-state-hover'); },
			mousedown: function() { $(this).toggleClass('ui-state-active'); },
			mouseup: function() { $(this).toggleClass('ui-state-active'); }
		},
		/**
		 * Visual radio button settings:
		 */
		radio: {
			/**
			 * Class of checked visual radio
			 * @var string
			 */
			checkedClass: 'ui-icon-bullet',
			/**
			 * Class of unchecked visual radio
			 * @var string
			 */
			uncheckedClass: 'ui-icon-radio-off',
			mouseenter: function() { $(this).addClass('ui-state-hover'); },
			mouseleave: function() { $(this).removeClass('ui-state-hover'); },
			mousedown: function() { $(this).toggleClass('ui-state-active'); },
			mouseup: function() { $(this).toggleClass('ui-state-active'); }
		},
		file: {
			iconClass: 'ui-icon-disk',
			mouseenter: function() { $(this).addClass('ui-state-hover'); },
			mouseleave: function() { $(this).removeClass('ui-state-hover'); },
			mousedown: function() { $(this).toggleClass('ui-state-active'); },
			mouseup: function() { $(this).toggleClass('ui-state-active'); }
		}
	},
	
	_init:function()
	{
		var object = this;
		var context = this.element;
		
		context.each(function(i, e) {
			options = $(context).data('formz').options;
			// Add permanent classes
			$('form', e).addClass('ui-form ui-widget ui-widget-content ui-corner-all');
			$('fieldset', e).addClass('ui-form-fieldset ui-widget-content ui-corner-all');
			$('legend', e).addClass('ui-form-legend ui-widget-header ui-corner-all');
			$('label', e).addClass('ui-form-label');
			$(':input', e).addClass('ui-form-input ui-state-default ui-corner-all');
			$('textarea', e).addClass('ui-form-textarea');
			$(':text', e).addClass('ui-form-text');
			$(':password', e).addClass('ui-form-password');
			$(':radio', e).addClass('ui-form-radio');
			$(':checkbox', e).addClass('ui-form-checkbox');
			$(':submit', e).addClass('ui-form-button ui-form-submit');
			$(':image', e).addClass('ui-form-button ui-form-image');
			$(':reset', e).addClass('ui-form-button ui-form-reset');
			$(':button', e).addClass('ui-form-button');
			$(':file', e).addClass('ui-form-file');
			
			// Some general event binding:
			$('input, button, select, textarea', e)
			.on('mouseenter'+options.eventNamespace, options.mouseenter)
			.on('mouseleave'+options.eventNamespace, options.mouseleave)
			.on('mousedown'+options.eventNamespace, options.mousedown)
			.on('mouseup'+options.eventNamespace, options.mouseup);
			
			// Type specific initializations:
			$('button, input:reset, input:submit, input[type="button"]', e).each(function(j, f) { object.button(this, context); } );
			$(':checkbox', e).each(function(j, f) { object.checkbox(this, context); } );
			$(':radio', e).each(function() { object.radio(this, context); } );
			$(':file', e).each(function() { object.file(this, context); } );
		});
	},
	
	
	// -------------------------------------------------------------------------
	// button function:
	//
	button: function(element, context)
	{
		options = $(context).data('formz').options;
		$button = $(element).addClass(options.button.classes);
		if ($button.is(':reset')) $button.addClass('ui-priority-secondary');
	},
	// END .button()
	// -------------------------------------------------------------------------



	// -------------------------------------------------------------------------
	// checkbox function:
	//
	checkbox: function(element, context)
	{
		options = $(context).data('formz').options;
		// The real input checkbox:
		$checkbox = $(element);
		
		// Base of visual jQuery UI checkbox, and binding events:
		$spans = $('<span class="ui-state-default ui-corner-all ui-form-checkbox"><span class="ui-icon ui-icon-empty"></span></span>')
			.on('mouseenter'+options.eventNamespace, options.checkbox.mouseenter)
			.on('mouseleave'+options.eventNamespace, options.checkbox.mouseleave)
			.on('mousedown'+options.eventNamespace, options.checkbox.mousedown)
			.on('mouseup'+options.eventNamespace, options.checkbox.mouseup)
			// Insert spans after the real checkbox:
			.insertAfter($checkbox)
			// The real checkbox into outer <span>:
			.append($checkbox);
		
		// If real checkbox is not displayed, then hide visual checkbox with CSS class:
		if ($checkbox.css('display')=='none') $spans.addClass(options.hiddenClass);
		
		// The real input checkbox hide with CSS class:
		$checkbox = $checkbox.addClass(options.hiddenClass);
		
		// Change CSS type of inner <span> if the real checkbox is default checked:
		if ($checkbox.is(':checked')) $('span.ui-icon', $spans).toggleClass(options.checkbox.uncheckedClass+' '+options.checkbox.checkedClass);
		
		// Change event on real checkbox input:
		$checkbox.on('change'+options.eventNamespace, function(e){
			// Change CSS type of inner <span> if this checkbox is checked:
			$inner_span = $(this).siblings('span');
			if (this.checked) $inner_span.removeClass(options.checkbox.uncheckedClass).addClass(options.checkbox.checkedClass);
			else $inner_span.addClass(options.checkbox.uncheckedClass).removeClass(options.checkbox.checkedClass);
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
				}
			});
		}
	}, 
	// END .checkbox()
	// -------------------------------------------------------------------------
	
	
	// -------------------------------------------------------------------------
	// radio function:
	//
	radio: function(element, context){
		options = $(context).data('formz').options;
		// The real input radio:
		$radio = $(element);
		
		// Base of visual jQuery UI radio, and binding events:
		$spans = $('<span class="ui-state-default ui-corner-all ui-form-radio"><span class="ui-icon ui-icon-radio-off"></span></span>')
			.on('mouseenter'+options.eventNamespace, options.radio.mouseenter)
			.on('mouseleave'+options.eventNamespace, options.radio.mouseleave)
			.on('mousedown'+options.eventNamespace, options.radio.mousedown)
			.on('mouseup'+options.eventNamespace, options.radio.mouseup)
			.insertAfter($radio)
			// The real radio input into outer <span>:
			.append($radio);
		
		// If real radio input is not displayed, then hide visual checkbox with CSS class:
		if ($radio.css('display')=='none') $spans.addClass(options.hiddenClass);
		
		// The real radio input hide with CSS class:
		$radio = $radio.addClass(options.hiddenClass);
		
		// Change CSS type of inner <span> if the real radio input is default checked:
		if ($radio.is(':checked')) $('span.ui-icon', $spans).toggleClass(options.radio.uncheckedClass+' '+options.radio.checkedClass);
		
		// Change event on real radio input:
		$radio.on('change'+options.eventNamespace, function(e){
			if ($(this).attr('name'))
			{
				// Az összes ilyen nevű elemnek a megfelelő <span> viziuális 
				// elemét "unchecked" állapotúra kell állítani:
				$('[name="'+$(this).attr('name')+'"]').siblings('span.ui-icon').addClass(options.radio.uncheckedClass).removeClass(options.radio.checkedClass);
				// Csak a kattintott elemhez tartozó <span> kap "checked" állapotot:
				$(this).siblings('span.ui-icon').addClass(options.radio.checkedClass).removeClass(options.radio.uncheckedClass);
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
	// END .radio()
	// -------------------------------------------------------------------------

	
	// -------------------------------------------------------------------------
	// file function:
	//
	file: function(element, context){
		options = $(context).data('formz').options;
		// Hide the real file input with CSS class:
		$file = $(element);//.addClass(options.hiddenClass);
		
		// Base of visual jQuery UI file input, and binding events:
		$spans = $('<span class="ui-state-default ui-corner-all ui-form-input ui-form-file"><span class="ui-icon '+options.file.iconClass+'"></span><span class="ui-form-file-name"></span></span>')
			.insertAfter($file)
			// The real file input into outer <span>:
			.append($file)
			// Hide the file name container:
			.find('.ui-form-file-name').hide();
		
		// If real file input is not displayed, then hide visual checkbox with CSS class:
		if ($file.css('display')=='none') $spans.addClass(options.hiddenClass);

		//
		// Original source and idea: http://viget.com/inspire/custom-file-inputs-with-a-bit-of-jquery
		//
		$file.on('change focus click', function(e){
			var $this = $(this), valArray = $this.val().split('\\'), newVal = valArray[valArray.length-1];
			if(newVal !== '')  $this.siblings('.ui-form-file-name').html(newVal).show();
		}).change();
	},
	// END .file()
	// -------------------------------------------------------------------------
	
});

})(jQuery);