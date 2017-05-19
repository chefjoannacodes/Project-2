

var attendesTemplate;


function renderAttendees(data) {
    var rows = data.attendees;
    var context = {'rows':rows};
    console.log(data);
    var html    = attendesTemplate(context);


    $('#event-detail').empty();
    $('#event-detail').append(html);
}


//load handlebars template to be process on client side
$.get('/assets/template/event-attendees.handlebars', function(source) {
    attendesTemplate = Handlebars.compile(source);
});


//match all events to add click event handler
var events = $('.event-row')
events.click(function(){
	 if($(this).hasClass('active')){
   		 $(this).removeClass('active'); 
  	} else {
	    $(this).addClass('active').siblings().removeClass('active');
  	}
	var id = $(this).attr("data-id");

    $.get('/api/events/' + id, function(data) {
        renderAttendees(data);
    });


})



//add event handler to change status attend button
//in this case we would call API to update user status, comment
var attendStatusButton = $('.attend-status');
attendStatusButton.click(function() {
	var clicked = $(this);
	var eventId = clicked.attr('data-event-id');
	var status = clicked.attr('data-status');
	var userId = clicked.attr('data-user-id');

	//remove class from other status button
	 $(this).siblings().removeClass('btn-success');
	clicked.addClass('btn-success')

    $.ajax({
  		type: "POST",
 	 	url: "/api/events/" + eventId + "/attendee",
  		data: {
  			user_id:userId,
  			status:status,
  			comments: $('#comments-' + eventId).text()
  		},
	  	success: function(data) {
  			renderAttendees(data);
	  	}
	});
});


//sets status based on value being non empty
function updateValidationStatus(element) {
	var container = element.parent();
	if(!element.val().trim()) {
        container.addClass('has-error');
	} else if(container.hasClass('has-error')){
        container.removeClass('has-error');
	} else {
        container.addClass('has-success');
    }
    console.log('adding val class'  + container.attr('class'))
}


//add event handling
var createEvent = $('#createEvent')
createEvent.click(function() {
	$('#event-form').removeClass('hidden');
	$('#event-list').addClass('hidden');

});



var submitEvent = $('#submitEvent');

submitEvent.click(function() {

	

    var name = $('#name').val().trim();
    updateValidationStatus($('#name'));

    var description = $('#description').val().trim();
    updateValidationStatus($('#description'));

    var date = $('#date').val().trim();
    updateValidationStatus($('#date'));

    var type = $('#type').val();
    updateValidationStatus($('#type'));


    if (!name || !description || !date || !type) {
        return
    }


    $.ajax({
        type: "POST",
        url: "/api/events/",
        data: {


            name:name,
            description:description,
            date: date,
            type:type
        },
        success: function(data) {
            document.location = "/events";
        }
    });

    console.log('creating an event !!!');
});
