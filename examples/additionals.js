/**
 * Additional features for jQuery-UI-FormaliZe examples
 */

$(function(){

	//
	// "With(out)" link:
	//
	if (window.location.search == '?without_plugin')
		$('#with_or_without_plugin').html('With plugin').attr('href', window.location.pathname );
	else $('#with_or_without_plugin').html('Without plugin').attr('href', '?without_plugin');
	$('#with_or_without_plugin').button({icons:{primary:'ui-icon-extlink'}});
	
	
	//
	// Show or hide hidden area:
	//
	$('#show_hidden_area').button().click(function(){
		$text = $('.ui-button-text', this);
		console.log($text.html());
		if ($text.html() == 'Show hidden area')
		{
			$('#not_visible_items').show();
			$text.html('Hide hidden area');
		}
		else
		{
			$('#not_visible_items').hide();
			$text.html('Show hidden area');
		}
		
	});
	

	// Collect the inline "style" text:
	$('.text-css').each(function(i,e){
		$item = $(e);
		$style = $('head style[generated="true"]');
		if ($style.length==0) $style = $('<style type="text/css" generated="true"/>').appendTo('head');
		$style.html( $style.html() + '\n' + $item.text());
		$item.remove();
	});

	// jQuery UI ThemeSwitcher initialization:
	$('#switcher').themeswitcher({
		imgpath: "https://raw.github.com/harborhoffer/Super-Theme-Switcher/master/images/"
	})
	.css('vertical-align', 'text-bottom')
		.find('>a')
		.css({'border-radius':'6px','-webkit-border-radius':'6px','-moz-border-radius':'6px'});
	


	// Generate test <option> tags:
	generate_select_items( $('select[name="dropdown_select"]').html(''), {optionNumber: 40} );
	generate_select_items( $('select[name="dropdown_optgroup_select"]').html(''), {optgroup:true});
	generate_select_items( $('select[name="multiline_select"]').html('') );
	generate_select_items( $('select[name="multiline_optgroup_select"]').html(''), {optgroup:true});
	generate_select_items( $('select[name="multiple_dropdown_select"]').html('') );
	generate_select_items( $('select[name="multiple_dropdown_optgroup_select"]').html(''), {optgroup:true});
	generate_select_items( $('select[name="multiline_multiple_select"]').html('') );
	generate_select_items( $('select[name="multiline_multiple_optgroup_select"]').html(''), {optgroup:true});

});



/*
 * Additional functions for jQuery-UI-FormaliZe examples
 */

/**
 * Generate select <option> and <optgroup> items
 * @param $element jQuery-object <select> element in jQuery object
 * @param options simple-object additional options. Structure in function (var defaults = ...)!
 */
function generate_select_items($element, options)
{
	if(typeof(options)==='undefined') options = {};

	var defaults = {
		optionNumber: 9,
		selectOption: true,
		optgroup: false,
		optgroupNumber: 3,
		optionsPerOptgroup: 3,
	};
	options = $.extend(true, defaults, options);

	if (options.optgroup)
	{
		var k = 1;
		// Add some item to "Drop-down select with optgroup":
		for(var i=1; i<=options.optgroupNumber; i++)
		{
			$element.append('<optgroup label="Optgroup '+i+'"/>');
			for(var j=1; j<=options.optionsPerOptgroup; j++)
				$('optgroup:eq('+(i-1)+')', $element).append('<option>Option '+(k++)+'<\/option>');
		}
		if (options.selectOption)
			$('option:eq(' + Math.floor(Math.random()*k) + ')', $element).attr('selected', 'selected');

	}
	else
	{
		for(i=1; i<=options.optionNumber; i++) $element.append('<option>Option '+i+'<\/option>');
		if (options.selectOption)
			$('option:eq(' + Math.floor(Math.random()*options.optionNumber) + ')', $element).attr('selected', 'selected');
	}

}
