$(document).ready(function() {
	// gall1 START
	$('.carousel').carousel({
		interval: 3000 //changes the speed
	})

	// handles the carousel thumbnails
	$('[id^=carousel-selector-]').click(function () {
		var id_selector = $(this).attr("id");
		var id = id_selector.substr(id_selector.length - 1);
		id = parseInt(id);
		$('#myCarousel').carousel(id);
		$('[id^=carousel-selector-]').removeClass('selected');
		$(this).addClass('selected');
	});

	// when the carousel slides, auto update
	$('.carousel').on('slid', function (e) {
		var id = $('.item.active').data('slide-number');
		id = parseInt(id);
		$('[id^=carousel-selector-]').removeClass('selected');
		$('[id=carousel-selector-' + id + ']').addClass('selected');
	});
	// gall1 END
	
	//***********************************************************************
	
	// gall2 START
	$('.carousel').carousel({
		interval: 3000 //changes the speed
	})

	// handles the carousel thumbnails
	$('[id^=carousel-selector-]').click(function () {
		var id_selector = $(this).attr("id");
		var id = id_selector.substr(id_selector.length - 1);
		id = parseInt(id);
		$('#myCarousel').carousel(id);
		$('[id^=carousel-selector-]').removeClass('selected');
		$(this).addClass('selected');
	});

	// when the carousel slides, auto update
	$('.carousel').on('slid', function (e) {
		var id = $('.item.active').data('slide-number');
		id = parseInt(id);
		$('[id^=carousel-selector-]').removeClass('selected');
		$('[id=carousel-selector-' + id + ']').addClass('selected');
	});
	// gall2 END
	
	//***********************************************************************
	
	// gall3 START
	$('.carousel').carousel({
		interval: 3000 //changes the speed
	})

	// handles the carousel thumbnails
	$('[id^=carousel-selector-]').click(function () {
		var id_selector = $(this).attr("id");
		var id = id_selector.substr(id_selector.length - 1);
		id = parseInt(id);
		$('#myCarousel').carousel(id);
		$('[id^=carousel-selector-]').removeClass('selected');
		$(this).addClass('selected');
	});

	// when the carousel slides, auto update
	$('.carousel').on('slid', function (e) {
		var id = $('.item.active').data('slide-number');
		id = parseInt(id);
		$('[id^=carousel-selector-]').removeClass('selected');
		$('[id=carousel-selector-' + id + ']').addClass('selected');
	});
	// gall3 END
	
	//***********************************************************************
	
	// gall4 START
	$('.carousel').carousel({
		interval: 3000 //changes the speed
	})

	// handles the carousel thumbnails
	$('[id^=carousel-selector-]').click(function () {
		var id_selector = $(this).attr("id");
		var id = id_selector.substr(id_selector.length - 1);
		id = parseInt(id);
		$('#myCarousel').carousel(id);
		$('[id^=carousel-selector-]').removeClass('selected');
		$(this).addClass('selected');
	});

	// when the carousel slides, auto update
	$('.carousel').on('slid', function (e) {
		var id = $('.item.active').data('slide-number');
		id = parseInt(id);
		$('[id^=carousel-selector-]').removeClass('selected');
		$('[id=carousel-selector-' + id + ']').addClass('selected');
	});
	// gall4 END
	
});