var events = $('.event-row')
events.click(function(){
	

	 if($(this).hasClass('active')){
   		 $(this).removeClass('active'); 
  	} else {
	    $(this).addClass('active').siblings().removeClass('active');
  	}

	var id = $(this).attr("data-id");


	$.get("/api/events/" + id, function(data, status){
        $('#desc').val(data.description);
    });
	console.log(id);
})
