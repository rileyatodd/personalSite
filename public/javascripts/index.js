//Change colors of headers when they are selected from the navbar to show the
//button works even if it doesn't scroll the page 
$(document).ready(function(){
	$('ul.navbar-nav').on('click', 'li', function(){
		if (!$(this).hasClass('dropdown')) {
			var href = $(this).find('a').prop('href');
			var anchor = href.slice(href.indexOf('#'));
			$('.highlighted').removeClass('highlighted');
			$(anchor).addClass('highlighted');
		}
	});
});