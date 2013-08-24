/**! jQuery UI FormaliZe Plugin  v0.1 Rácz Tibor Zoltán <racztiborzoltan@gmail.com> BSD license */
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
 * @todo majd át kell nézni, hogy milyen plusssz CSS osztályokat érdemes hozzáadni
 *       az egyes elemekhez (pl. ui-form-checkbox az <input> mezőhoz, vagy inkább
 *       már a vizuális checkbox-hoz?)
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
$.widget("z.formz",
{
	// Default settings:
	options: {
		/**
		 * Class of hidden items
		 * @var string
		 */
		hiddenClass: 'ui-helper-hidden-accessible',
		/**
		 * Do not convert elements with this class(es)
		 */
		skipClass: 'ui-form-skip',
		/**
		 * With widget connected event namespace name
		 * @var string
		 */
		eventNamespace: '.ui-form',
		/**
		 * General events
		 */
		events: {
			mouseenter: function() { $(this).addClass('ui-state-hover'); },
			mouseleave: function() { $(this).removeClass('ui-state-hover'); },
			mousedown: function() { $(this).toggleClass('ui-state-active'); },
			mouseup: function() { $(this).toggleClass('ui-state-active'); },
			focus: function() { $(this).toggleClass('ui-state-active'); },
			blur: function() { $(this).toggleClass('ui-state-active'); },
		},
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
		select:{
			/**
			 * visual select type
			 * Possible values:
			 * 	'simple' - add some class and default events
			 * 	'selectable' - create visual select with jQuery UI Selectable plugin
			 */
			type: 'simple',
			/**
			 * Checkbox events
			 * Structure similar to options.events!!
			 *
			 * Default: this.options.events
			 */
			events: {
				focus: function() { $(this).addClass('ui-state-active'); },
				blur: function() { $(this).removeClass('ui-state-active'); }
			},
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
			/**
			 * Checkbox events
			 * Structure similar to options.events!!
			 *
			 * Default: this.options.events
			 */
			events: {},
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
			/**
			 * Radio events
			 * Structure similar to options.events!!
			 *
			 * Default: this.options.events
			 */
			events: {},
		},
		file: {
			iconClass: 'ui-icon-disk',
			/**
			 * File events
			 * Structure similar to options.events!!
			 *
			 * Default: this.options.events
			 */
			events: {},
		}
	},

	_init:function()
	{
		var object = this;
		var context = this.element;
		
		options = $(context).data(this.widgetFullName).options;

		// --------------------------------------
		// Merge the sub configs
		//
		var button_config = options.button;
		var select_config = options.select;
		var checkbox_config = options.checkbox;
		var radio_config = options.radio;
		var file_config = options.file;

		delete options.button;
		delete options.select;
		delete options.checkbox;
		delete options.radio;
		delete options.file;

		button_config = $.extend(true, {}, options, button_config);
		select_config = $.extend(true, {}, options, select_config);
		checkbox_config = $.extend(true, {}, options, checkbox_config);
		radio_config = $.extend(true, {}, options, radio_config);
		file_config = $.extend(true, {}, options, file_config);
		$(context).data(this.widgetFullName).options = options = $.extend(true, {}, options, {button: button_config, select: select_config, checkbox: checkbox_config, radio: radio_config, file: file_config});
		//
		// --------------------------------------

		//
		// Traverse the matched elements:
		//
		context.each(function(i, e) {
			$('form, fieldset, legend, label, :input')
			.each(function(j, item){
				$item = $(item);

				if ($item.hasClass(options.skipClass)) return;

				// Add permanent classes
				if ($item.is('form')) $item.addClass('ui-form ui-widget ui-widget-content ui-corner-all');
				if ($item.is('fieldset')) $item.addClass('ui-form-fieldset ui-widget-content ui-corner-all');
				if ($item.is('legend')) $item.addClass('ui-form-legend ui-widget-header ui-corner-all');
				if ($item.is('label')) $item.addClass('ui-form-label');
				if ($item.is(':input')) $item.addClass('ui-state-default ui-corner-all');
				if ($item.is('input')) $item.addClass('ui-form-input');
				if ($item.is('textarea')) $item.addClass('ui-form-textarea');
				if ($item.is(':text')) $item.addClass('ui-form-text');
				if ($item.is(':password')) $item.addClass('ui-form-password');
				if ($item.is(':radio')) $item.addClass('ui-form-radio');
				if ($item.is(':checkbox')) $item.addClass('ui-form-checkbox');
				if ($item.is(':submit')) $item.addClass('ui-form-button ui-form-submit');
				if ($item.is(':image')) $item.addClass('ui-form-button ui-form-image');
				if ($item.is(':reset')) $item.addClass('ui-form-button ui-form-reset');
				if ($item.is(':button')) $item.addClass('ui-form-button');
				if ($item.is(':file')) $item.addClass('ui-form-file');

				// Some general event binding:
				if ($item.is('input, button, textarea'))
					$item
						.on('mouseenter'+options.eventNamespace, options.events.mouseenter)
						.on('mouseleave'+options.eventNamespace, options.events.mouseleave)
						.on('mousedown'+options.eventNamespace, options.events.mousedown)
						.on('mouseup'+options.eventNamespace, options.events.mouseup)
						.on('focus'+options.eventNamespace, options.events.focus)
						.on('blur'+options.eventNamespace, options.events.blur);

				// Type specific initializations:
				if ($item.is('button, input:reset, input:submit, input[type="button"]')) object.button($item.get(0), context, object);
				if ($item.is('select')) object.select($item.get(0), context, object);
				if ($item.is(':checkbox')) object.checkbox($item.get(0), context, object);
				if ($item.is(':radio')) object.radio($item.get(0), context, object);
				if ($item.is(':file')) object.file($item.get(0), context, object);
			});
		});
	},
	// END _init() method


	// -------------------------------------------------------------------------
	// button function:
	//
	button: function(element, context, object)
	{
		options = $(context).data(object.widgetFullName).options;
		$button = $(element).addClass(options.button.classes);
		if ($button.is(':reset')) $button.addClass('ui-priority-secondary');
	},
	// END .button()
	// -------------------------------------------------------------------------



	// -------------------------------------------------------------------------
	// select function:
	//
	select: function(element, context, object)
	{
		options = $(context).data(object.widgetFullName).options;
		
		if (options.select.type == 'simple') this.select_simple(element, context, object);
		if (options.select.type == 'selectable') this.select_selectable(element, context, object);
	},
	// END .select()
	// -------------------------------------------------------------------------



	/**
	 * Create 'simple' visual select form field
	 * @see this.options.select.type
	 */
	select_simple: function(element, context, object)
	{
		options = $(context).data(object.widgetFullName).options;
		// The real <select>:
		$select = $(element);

		$select
			.on('mouseenter'+options.eventNamespace, options.select.events.mouseenter)
			.on('mouseleave'+options.eventNamespace, options.select.events.mouseleave)
			.on('mousedown'+options.eventNamespace, options.select.events.mousedown)
			.on('mouseup'+options.eventNamespace, options.select.events.mouseup)
			.on('focus'+options.eventNamespace, options.select.events.focus)
			.on('blur'+options.eventNamespace, options.select.events.blur);
	},



	/**
	 * Create 'selectable' visual select form field
	 * @see this.options.select.type
	 */
	select_selectable: function(element, context, object)
	{
		console.error('The "selectable" <select> type is not yet implemented! Sorry! Please Wait!! Thanks!');
		return;

		options = $(context).data(object.widgetFullName).options;

		// The real <select>:
		$real_select = $(element);

		// Csak a tesz erejéig kell ez a sor:
		if (!$real_select.hasClass('test')) return;

		// The imitated select box:
		$select = $('<div class="ui-form-select ui-widget-content ui-corner-all"/>')
			.on('keydown'+options.eventNamespace, function(event){
				$real_select = $(this).find('select');
				$ol = $('ol', this);
				switch (event.keyCode)
				{
					case $.ui.keyCode.UP:
						var next_index = $real_select.prop('selectedIndex');
						if (next_index==0) return;
						next_index--;
						var next_li = $('li.ui-form-option:eq(' + next_index + ')', this).get(0);
						$ol.find('li.ui-form-option.ui-selected').each(function(i,e){
							if (e != next_li) $ol.selectable('option', 'unselected').call($ol, event, {unselected: e});
						});
						$ol.selectable('option', 'selected').call($ol, event, {selected: next_li});
						break;
					case $.ui.keyCode.DOWN:
						var next_index = $real_select.prop('selectedIndex');
						if (next_index == $real_select.prop('options').length-1) return;
						next_index++;
						var next_li = $('li.ui-form-option:eq(' + next_index + ')', this).get(0);
						$ol.find('li.ui-form-option').each(function(i,e){
							if (e != next_li) $ol.selectable('option', 'unselected').call($ol, event, {unselected: e});
						});
						$ol.selectable('option', 'selected').call($ol, event, {selected: next_li});
						break;
				}
			})
			/*
			.on('mouseenter'+options.eventNamespace, options.select.events.mouseenter)
			.on('mouseleave'+options.eventNamespace, options.select.events.mouseleave)
			.on('mousedown'+options.eventNamespace, options.select.events.mousedown)
			.on('mouseup'+options.eventNamespace, options.select.events.mouseup)
			*/
			// Insert box after the real <select>:
			.insertAfter($real_select)
			// The real <select> into box:
			.append($real_select);
		$real_select
			.on('focus'+options.eventNamespace, options.select.events.focus)
			.on('blur'+options.eventNamespace, options.select.events.blur)
			.on('blur'+options.eventNamespace, function(e){

			});

		// If real <select> is not displayed, then hide imitated select box with CSS class:
		if ($real_select.css('display')=='none') $select.addClass(options.hiddenClass);

		// The real <select> hide with CSS class:
		$real_select = $real_select.addClass(options.hiddenClass);

		// ha többsoros <select> elemet kell imitálni:
		if ($real_select.attr('size')>1)
		{
			$ol = $('<ol class="ui-helper-reset ui-selectable ui-form-options"/>')
				.prependTo($select)
				.on('click', function(e){
					$(this).siblings('select').focus();
				});
			// Create items:
			$real_select.find('option, optgroup').each(function(i,e){
				$item = $(e);
				// ha <option>-t találtunk:
				if ($item.is('option'))
				{
					$li = $('<li class="ui-form-option"/>').html($item.html());

					// Ha az aktuális <option> szülője egy <optgroup>, akkor
					// még szükség van egy CSS osztályra:
					if ($item.parent().is('optgroup')) $li.addClass('ui-form-optgroup-option');
					// Ha alapértelmezetten kiválasztott volt az <option>:
					if ($item.attr('selected') || $item.prop('selected')) $li.addClass('ui-selected ui-state-active ui-corner-all');
					$ol.append($li);
				}
				// Ha <optgroup>-ot találtunk:
				if ($item.is('optgroup'))
				{
					$li = $('<li class="ui-form-optgroup"/>').html($item.attr('label'));
					$ol.append($li);
				}
			});

			// Initialize jQuery UI Selectable
			$ol.selectable({
				selected: function(event, ui){
					$selected = $(ui.selected);
					// Az <ol>-hez tartozó <select> elem:
					$select = $selected.parent().siblings('select').focus();
					// Ha 'optgroup', akkor nem kell "megengedni" a kiválasztást:
					if ($selected.hasClass('ui-form-optgroup'))
						$selected.removeClass('ui-selected ui-state-active ui-corner-all');
					else
					{
						var ol = this;
						$selected.addClass('ui-selected ui-state-active ui-corner-all');
						// Az összes <option> elem kiválasztásának törlése:
						$('option', $select).removeAttr('selected').prop('selected', false);
						// Csak az 'ui-selected' osztályú <li> elemekhez tartozó
						// <option> elemek kiválasztása:
						$('.ui-selected', this).each(function(i,e){
							$('option:eq(' + $('li:not(.ui-form-optgroup)', ol).index(e) + ')', $select)
								.attr('selected', 'selected').prop('selected', true);
						});
					}
				},
				unselected: function(event, ui){
					$unselected = $(ui.unselected).removeClass('ui-selected ui-state-active ui-corner-all');
					// Az <ol>-hez tartozó <select> elem:
					$select = $unselected.parent().siblings('select').focus();
					// A megfelelő <option> kiválasztása:
					if (!$unselected.hasClass('ui-form-optgroup'))
					{
						var li_index = $('li:not(.ui-form-optgroup)', this).index(ui.unselected);
						$unselected.parent().siblings('select')
							.find('option:eq(' + li_index + ')')
							.removeAttr('selected')
							.prop('selected', false);
					}
				}
			});
		}
	},



	// -------------------------------------------------------------------------
	// checkbox function:
	//
	checkbox: function(element, context, object)
	{
		options = $(context).data(object.widgetFullName).options;
		// The real input checkbox:
		$checkbox = $(element);

		// Base of visual jQuery UI checkbox, and binding events:
		$spans = $('<span class="ui-state-default ui-corner-all ui-form-checkbox"><span class="ui-icon ui-icon-empty"></span></span>')
			.on('mouseenter'+options.eventNamespace, options.checkbox.events.mouseenter)
			.on('mouseleave'+options.eventNamespace, options.checkbox.events.mouseleave)
			.on('mousedown'+options.eventNamespace, options.checkbox.events.mousedown)
			.on('mouseup'+options.eventNamespace, options.checkbox.events.mouseup)
			// Insert spans after the real checkbox:
			.insertAfter($checkbox)
			// The real checkbox into outer <span>:
			.append($checkbox);
		$checkbox
			.on('focus'+options.eventNamespace, options.checkbox.events.focus)
			.on('blur'+options.eventNamespace, options.checkbox.events.blur);


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
	radio: function(element, context, object){
		options = $(context).data(object.widgetFullName).options;
		// The real input radio:
		$radio = $(element);

		// Base of visual jQuery UI radio, and binding events:
		$spans = $('<span class="ui-state-default ui-corner-all ui-form-radio"><span class="ui-icon ui-icon-radio-off"></span></span>')
			.on('mouseenter'+options.eventNamespace, options.radio.events.mouseenter)
			.on('mouseleave'+options.eventNamespace, options.radio.events.mouseleave)
			.on('mousedown'+options.eventNamespace, options.radio.events.mousedown)
			.on('mouseup'+options.eventNamespace, options.radio.events.mouseup)
			.insertAfter($radio)
			// The real radio input into outer <span>:
			.append($radio);
		$radio
			.on('focus'+options.eventNamespace, options.radio.events.focus)
			.on('blur'+options.eventNamespace, options.radio.events.blur);


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
	file: function(element, context, object){
		options = $(context).data(object.widgetFullName).options;
		// Hide the real file input with CSS class:
		$file = $(element);//.addClass(options.hiddenClass);

		// Base of visual jQuery UI file input, and binding events:
		$spans = $('<span class="ui-state-default ui-corner-all ui-form-input ui-form-file"><span class="ui-icon '+options.file.iconClass+'"></span><span class="ui-form-file-name"></span></span>')
			.insertAfter($file)
			// The real file input into outer <span>:
			.append($file)
			// Hide the file name container:
			.find('.ui-form-file-name').hide();
		$file
			.on('focus'+options.eventNamespace, options.file.focus)
			.on('blur'+options.eventNamespace, options.file.blur);


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