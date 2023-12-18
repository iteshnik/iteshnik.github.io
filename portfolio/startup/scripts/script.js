//SLIDER
$(document).ready(function() {
	$("#owl-demo").owlCarousel({
        items : 3,
      	itemsDesktop : [1199,3],
      	itemsDesktopSmall : [979,3],
      	navigation : true,
        lazyLoad : true,
        navigation : true
      });



	
	$('.internal-btn2').click(function(){
		$('.form-iternal2').addClass('form-iternal-dis_b');
		$('.form-iternal1').removeClass('form-iternal-dis_b');
		$('.internal-btn1').removeClass('internal-btn-active');
		$(this).addClass('internal-btn-active');
		$('.form-iternal3').addClass('form-iternal-dis_b');
	});
	$('.internal-btn1').click(function(){
		$('.form-iternal1').addClass('form-iternal-dis_b');
		$('.form-iternal3').addClass('form-iternal-dis_b');
		$('.form-iternal2').removeClass('form-iternal-dis_b');
		$('.internal-btn2').removeClass('internal-btn-active');
		$(this).addClass('internal-btn-active');
	});

	$('.form-iternal2 .opt-type-pay').click(function(){
		$('.form-iternal2 #opt-but-wrap').removeClass('dis_n');
	});

	$('.form-iternal2 .opt1-but').click(function(){
		$('.form-iternal2 #opt-but-wrap').addClass('dis_n');
		$('.form-iternal2 .iban1').removeClass('dis_n');
		$('.form-iternal2 .iban2').addClass('dis_n');
		$('.form-iternal3').addClass('form-iternal-dis_b');
		$('.form-iternal2').removeClass('form-iternal-dis_b');
	});
	$('.form-iternal2 .opt2-but').click(function(){
		$('.form-iternal2 #opt-but-wrap').addClass('dis_n');
		$('.form-iternal2 .iban2').removeClass('dis_n');
		$('.form-iternal2 .iban1').addClass('dis_n');
		$('.form-iternal2').addClass('form-iternal-dis_b');
		$('.form-iternal3').removeClass('form-iternal-dis_b');
	});


	$('.form-iternal3 .opt-type-pay').click(function(){
		$('.form-iternal3 #opt-but-wrap').removeClass('dis_n');
	});

	$('.form-iternal3 .opt1-but').click(function(){
		$('.form-iternal3 #opt-but-wrap').addClass('dis_n');
		$('.form-iternal3 .iban1').removeClass('dis_n');
		$('.form-iternal3 .iban2').addClass('dis_n');
		$('.form-iternal3').addClass('form-iternal-dis_b');
		$('.form-iternal2').removeClass('form-iternal-dis_b');
	});
	$('.form-iternal3 .opt2-but').click(function(){
		$('.form-iternal3 #opt-but-wrap').addClass('dis_n');
		$('.form-iternal3 .iban2').removeClass('dis_n');
		$('.form-iternal3 .iban1').addClass('dis_n');
		$('.form-iternal2').addClass('form-iternal-dis_b');
		$('.form-iternal3').removeClass('form-iternal-dis_b');
	});

	/* ----- Boottrap modal fix ----- */


});