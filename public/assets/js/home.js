
//add event handler
$('.btn-link').click(function() {
	var target = $(this).attr('data-target');
	document.location = target;

})