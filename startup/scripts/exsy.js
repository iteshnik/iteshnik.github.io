$(document).ready(function() {
	$('.banker-form__group').submit(function() {
		$(this).siblings('.banker-overlay').fadeIn(300);
		return false;
	});
	$('.banker-overlay a').click(function() {
		$(this).parent().fadeOut(300);
		return false;
	});
	$('.textwrap textarea').autoResize({
		extraSpace : 0
	});
	
	var now = new Date(),
		month = now.getMonth() + 1;
	//console.log()
	/*$('.set-datepick').val(now.getDate() + '-' + month  + '-' + now.getFullYear());*/
	

	$('.trigger').click(function() {
		$(this).toggleClass('off');
	});	


	$('.sidebar-right__person_mobile-back-button').on('click', function () {
		$('.ui-overlay').trigger('click');
	});


	//$(".bootstrap-select.btn-group .dropdown-menu.open").customScroll();


//	blockToggle($('.my-panel__pension .my-panel_heading:not(.no-click)'), $(".my-panel__pension .panel-body"));
//	blockToggle($('.my-panel__pension-account .my-panel_heading:not(.no-click)'), $(".my-panel__pension-account .my-panel_data-pension"));
//	blockToggle($('.my-panel__pension-account .my-panel_operations:not(.no-click)'),
//				$(".my-panel__pension-account .panel-list, .my-panel__pension-account .my-panel_filter, .my-panel__pension-account .btn-row__show-more"));
//
//
//
//	blockToggle($('.basic.bonds .my-panel__funds > .my-panel_heading:not(.no-click)'),
//				$(".basic.bonds .my-panel__funds > .my-panel_data-funds"));
//
//	blockToggle($('.basic.bonds .my-panel__funds > .my-panel_title-list:not(.no-click)'),
//				$(".basic.bonds .my-panel__funds > .my-panel_funds-title," +
//				   ".basic.bonds .my-panel__funds > .panel-list," +
//				   ".basic.bonds .my-panel__funds > .btn-row__show-more"));



	function blockToggle(clickEl, toggleEl) {



		if ($(window).width() < 767) {
			clickEl.on('click', function () {
				toggleEl.slideToggle(300);
			});
		}

	}

	

	
});