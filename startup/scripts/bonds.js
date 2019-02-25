$(document).ready(function() {
	
	/* ArcticModal */
	
	$(document).on('click', '.view-contract', function(){
        $('#bonds-modal').arcticmodal();
    });
    $(document).on('click', '.view-request', function(){
		$('#request-modal').arcticmodal();
    });
	$(document).on('click', '.view-button-desc', function(){
        $('#cancel-request-modal').arcticmodal();
    });	
	$(document).on('click', '.more-button', function(){
        $('#list-bonds-modal').arcticmodal();
    });	
	
	/* Customization select */
	
	$(function() {
		$('select').styler();
	});
	
	
	/* Scrollbar */
	
    jQuery('.scrollbar-inner').scrollbar();

	/* Datepicker */
	
	$.datepicker.setDefaults(
        $.extend($.datepicker.regional["ru"])
		);
	$("#datepicker").datepicker();

  
    $(".details-head .link").click(function () {
      $(".link").toggleClass('active');
    });
  
});