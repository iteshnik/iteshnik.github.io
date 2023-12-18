$(document).ready(function() {
	$('.product a').BlackAndWhite({
		hoverEffect : true, // default true
		// set the path to BnWWorker.js for a superfast implementation
		webworkerPath : false,
		// to invert the hover effect
		invertHoverEffect: false,
		// this option works only on the modern browsers ( on IE lower than 9 it remains always 1)
		intensity:1,
		speed: { //this property could also be just speed: value for both fadeIn and fadeOut
			fadeIn: 800, // 200ms for fadeIn animations
			fadeOut: 800 // 800ms for fadeOut animations
		},
		onImageReady:function(img) {
			// this callback gets executed anytime an image is converted
		}
	});
	$('.slidenav a').click(function(event) {
		event.preventDefault();
		id = $(this).attr("href");
		position = $(id).offset().top - 55 ;
		jQuery.scrollTo(position, 1500, {
			duration: 2000,
			easing: 'linear'
		});
    });
});