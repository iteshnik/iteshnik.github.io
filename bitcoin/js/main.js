// Preloader
$(window).on('load', function () {
	$('body').addClass('open-faq-popup');
    var preloader = $('#page-preloader'),
        spinner = preloader.find('.spinner');
    spinner.fadeOut();
    preloader.delay(1000).fadeOut('slow', function() {
		$('body').removeClass('open-faq-popup');
    });
});

var player1, player2;

window.onYouTubeIframeAPIReady = function() {
	player1 = new YT.Player('Youtube1');
	player2 = new YT.Player('Youtube2');
}

$(document).ready(function() {
	;
	$('#contactform').submit(function(event) {
		event.preventDefault();
	});
		
	$('#subscribe-form').submit(function(event) {

		var label = $(this).find('label');
		
    	label.text('Subscription successful!');
    	label.css('opacity', '1');
    	label.addClass('active');
    	setTimeout(function() {
			label.removeClass('active');    
    		label.css('opacity', '0.3');
    		label.text('Enter your email');
		}, 3000);
	});

	// Resize
    var context;

    if ($(window).width() <= 1024) {
        context = 'tablet';
    } else if ($(window).width() < 1560 && $(window).width() > 1024) {
        context = 'laptop';
    } else if ($(window).width() >= 1560) {
        context = 'desktop';
    }

    $(window).resize(function() {
        if(($(window).width() <= 1024) && (context != 'tablet')) {
            location.reload();
        } 
        if (($(window).width() < 1560) && ($(window).width() > 1024) && (context != 'laptop')) {
            location.reload();
        }
        if (($(window).width() >= 1560) && (context != 'desktop')) {
            location.reload();
        }
    });

    $(window).on("orientationchange",function(){
        location.reload();
    });

    // Header
    $(window).scroll(function(event) {
    	if($(window).scrollTop() > $(window).height() / 2) {
    		$('header.sticky').addClass('show');
    	} else {
    		$('header.sticky').removeClass('show');
    	}
    });

    // ScrollMagic controller
	var controller = new ScrollMagic.Controller();

	// Mobile browser
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	} else {
		// Cloud track and bycicle animation restart
		$(window).resize(function(event) {
			$('.track-1, .track-2').removeClass('left-track-anim');
			$('.track-3, .track-4').removeClass('right-track-anim');
			$('.cloud-1, .wind-1, .wind-2').removeClass('first-cloud-anim');
			$('.cloud-2, .wind-3').removeClass('second-cloud-anim');
			$('.cloud-3, .wind-6, .wind-7').removeClass('third-cloud-anim');
			$('.cloud-4, .wind-5, .wind-4').removeClass('four-cloud-anim');
			$('.bycicle-left').removeClass('bycicle-anim');
			$('.bycicle-right').removeClass('bycicle-reverse-anim');

			setTimeout(function() {
				$('.track-1, .track-2').addClass('left-track-anim');
				$('.track-3, .track-4').addClass('right-track-anim');
				$('.cloud-1, .wind-1, .wind-2').addClass('first-cloud-anim');
				$('.cloud-2, .wind-3').addClass('second-cloud-anim');
				$('.cloud-3, .wind-6, .wind-7').addClass('third-cloud-anim');
				$('.cloud-4, .wind-5, .wind-4').addClass('four-cloud-anim');
				$('.bycicle-left').addClass('bycicle-anim');
				$('.bycicle-right').addClass('bycicle-reverse-anim');
			}, 1);
		});

		if ($('body').hasClass('main')) {
			if ($(window).width() > 1024) {
				var sceneDuration = $('.scene-column').outerHeight(true) - $('.five-step').outerHeight(true),
					firstSceneDuration = $('.first-step').outerHeight(true),
					secondSceneHeight = $('.second-step').outerHeight(true),
					secondSceneDuration = secondSceneHeight + firstSceneDuration,
					thirdSceneHeight = $('.third-step').outerHeight(true),
					fourSceneHeight = $('.four-step').outerHeight(true),
					contractSceneDuration = thirdSceneHeight / 2 + secondSceneDuration,
					contractTitleDuration = firstSceneDuration / 2 + secondSceneHeight / 2,
					bitcoinDuration = secondSceneHeight / 2 + thirdSceneHeight + fourSceneHeight;

				// Scene
				new ScrollMagic.Scene({triggerElement: ".first-step", duration: sceneDuration})
									.setPin(".scene")
									.addTo(controller);
				// Check title
				new ScrollMagic.Scene({triggerElement: ".first-step", duration: firstSceneDuration / 2})
									.setTween(".step-1-title", 0.15, {scale: 0.9, opacity: 0 , marginTop: -50})
									.addTo(controller);
			    // Check background
				new ScrollMagic.Scene({triggerElement: ".first-step", duration: firstSceneDuration / 2})
									.setTween(".step-1-back", 0.1, {scale: 0.3, opacity: 0})
									.addTo(controller);
				// Check and contract front and gift
				var timelineContractBlock = new TimelineLite()
			    	.add(TweenMax.to(".step-1-front", 0.15, {height: 195, marginTop: -100, width: 140, marginLeft: 85}))
			    	.add(TweenMax.to(".step-1-front", 0.25, {height: 195, marginTop: -100, width: 140, marginLeft: 85}))
			    	.add(TweenMax.to(".step-1-front", 0.1, {height: 100, width: 96, marginLeft: 100}))
			    	.add(TweenMax.to(".step-1-front", 0.1, {height: 100}))
			    	.add(TweenMax.to(".step-1-front", 0.1, {rotation: 45}))
			    	.add(TweenMax.to(".step-1-front", 0.1, {scale: 0.6, top: 170}));
				var front = new ScrollMagic.Scene({triggerElement: ".first-step", duration: contractSceneDuration})
									.setTween(timelineContractBlock)
									.addTo(controller);

				front.on("progress", function (event) {
				    if (event.progress >= 1) {
				    	$('.step-1-front').css('opacity', '0');
				    } else {
				    	$('.step-1-front').css('opacity', '1');
				    }
				});
				// Scene wrapper
				new ScrollMagic.Scene({triggerElement: ".second-step", duration: secondSceneHeight / 1.2})
									.setTween(".scene-wrapper", 0.1, {marginTop: 50})
									.addTo(controller);
			    // Contract text
			    var timlineContractTitle = new TimelineLite()
			    	.add(TweenMax.to(".step-2-title", 0.1, {opacity: 1, scale: 1.1}))
			    	.add(TweenMax.to(".step-2-title", 0.1, {opacity: 1, scale: 1.1}))
			    	.add(TweenMax.to(".step-2-title", 0.05, {opacity: 0, scale: 0.7, marginTop: -50}));
				new ScrollMagic.Scene({triggerElement: ".first-step", duration: contractTitleDuration, offset: firstSceneDuration / 2})
									.setTween(timlineContractTitle)
									.addTo(controller);
				// Contract holder
			    var timlineContractHolder = new TimelineLite()
			    	.add(TweenMax.to(".step-2-holder", 0.2, {opacity: 1, top: -104}))
			    	.add(TweenMax.to(".step-2-holder", 0.25, {opacity: 1, top: -104}))
			    	.add(TweenMax.to(".step-2-holder", 0.15, {opacity: 0, top: -170}));
				new ScrollMagic.Scene({triggerElement: ".first-step", duration: contractTitleDuration, offset: firstSceneDuration / 2})
									.setTween(timlineContractHolder)
									.addTo(controller);
				// Contract tablet
			    var timlineContractTablet = new TimelineLite()
			    	.add(TweenMax.to(".step-2-tablet", 0.2, {opacity: 1, top: -102, scale: 1}))
			    	.add(TweenMax.to(".step-2-tablet", 0.25, {opacity: 1, top: -102, scale: 1}))
			    	.add(TweenMax.to(".step-2-tablet", 0.15, {opacity: 0, scale: 0.5, marginTop: -30}));
				new ScrollMagic.Scene({triggerElement: ".first-step", duration: contractTitleDuration, offset: firstSceneDuration / 2})
									.setTween(timlineContractTablet)
									.addTo(controller);
				// Gift label
				new ScrollMagic.Scene({triggerElement: ".second-step", duration: secondSceneHeight / 2, offset: secondSceneHeight / 2})
									.setTween(".step-3-label, .first-gift-wrap, .second-gift-wrap", 0.1, {opacity: 1})
									.addTo(controller);
				// Gift box
				new ScrollMagic.Scene({triggerElement: ".second-step", duration: secondSceneHeight / 2, offset: secondSceneHeight / 1.5})
									.setTween(".step-3-box", 0.1, {opacity: 1, scale: 1})
									.addTo(controller);
				// Small first gift box
				var timlineFirstSmallBox = new TimelineLite()
			    	.add(TweenMax.to(".first-gift-wrap", 0.1, {opacity: 1}))
			    	.add(TweenMax.to(".first-gift-wrap", 0.1, {rotation: 45}))
			    	.add(TweenMax.to(".first-gift-wrap", 0.1, {scale: 0.6, top: -30}));
				var firstSmallGift = new ScrollMagic.Scene({triggerElement: ".second-step", duration: secondSceneHeight, offset: secondSceneHeight / 1.7})
									.setTween(timlineFirstSmallBox)
									.addTo(controller);	
				firstSmallGift.on("progress", function (event) {
				    if (event.progress > 0 && event.progress < 1) {
				    	$('.first-gift-wrap').css('opacity', '1');
				    } else {
				    	$('.first-gift-wrap').css('opacity', '0');
				    }
				});
				// Small second gift box
				var timlineSecondSmallBox = new TimelineLite()
			    	.add(TweenMax.to(".second-gift-wrap", 0.1, {opacity: 1}))
			    	.add(TweenMax.to(".second-gift-wrap", 0.1, {rotation: 45}))
			    	.add(TweenMax.to(".second-gift-wrap", 0.1, {scale: 0.6, top: -10}));
				var secondSmallGift = new ScrollMagic.Scene({triggerElement: ".second-step", duration: secondSceneHeight, offset: secondSceneHeight / 1.7})
									.setTween(timlineSecondSmallBox)
									.addTo(controller);
			    secondSmallGift.on("progress", function (event) {
				    if (event.progress > 0 && event.progress < 1) {
				    	$('.second-gift-wrap').css('opacity', '1');
				    } else {
				    	$('.second-gift-wrap').css('opacity', '0');
				    }
				});
				// Portal
				var timlineBottomPortal = new TimelineLite()
			    	.add(TweenMax.to(".portal-bottom, .portal-top, .portal-hole , .portal-small-hole", 0.1, {opacity: 1, scale: 1}))
			    	.add(TweenMax.to(".portal-bottom, .portal-top, .portal-hole , .portal-small-hole", 0.25, {rotation: 1, scale: 1}))
			    	.add(TweenMax.to(".portal-bottom, .portal-top, .portal-hole , .portal-small-hole", 0.1, {scale: 0}));
				new ScrollMagic.Scene({triggerElement: ".second-step", duration: secondSceneHeight, offset: secondSceneHeight / 1.2})
									.setTween(timlineBottomPortal)
									.addTo(controller);
				// Bitcoin large
				var timleneLargeBitcoin = new TimelineLite()
			    	.add(TweenMax.to(".large-bitcoin-wrap", 0.2, {opacity: 0, top: -290}))
			    	.add(TweenMax.to(".large-bitcoin-wrap", 0.05, {opacity: 1, top: -290}))
			    	.add(TweenMax.to(".large-bitcoin-wrap", 0.15, {top: -170}))
			    	.add(TweenMax.to(".large-bitcoin-wrap", 0.2, {scale: 0.9}))
			    	.add(TweenMax.to(".large-bitcoin-wrap", 0.05, {scale: 0.8}))
			    	.add(TweenMax.to(".large-bitcoin-wrap", 0.05, {scale: 0.7, top: -90}));
				var largeBitcoinScene = new ScrollMagic.Scene({triggerElement: ".second-step", duration: bitcoinDuration, offset: secondSceneHeight / 4})
									.setTween(timleneLargeBitcoin)
									.addTo(controller);
				// Bitcoin first small
				var timlineSmallFirstBitcoin = new TimelineLite()
			    	.add(TweenMax.to(".first-small-bitcoin-wrap", 0.2, {opacity: 0, top: -220}))
			    	.add(TweenMax.to(".first-small-bitcoin-wrap", 0.05, {opacity: 1, top: -220}))
			    	.add(TweenMax.to(".first-small-bitcoin-wrap", 0.15, {top: -160}))
			    	.add(TweenMax.to(".first-small-bitcoin-wrap", 0.2, {scale: 0.8, left: 30}))
			    	.add(TweenMax.to(".first-small-bitcoin-wrap", 0.05, {scale: 0.7, left: 80}))
			    	.add(TweenMax.to(".first-small-bitcoin-wrap", 0.05, {scale: 0.6, top: -80}));
				var largeBitcoinScene = new ScrollMagic.Scene({triggerElement: ".second-step", duration: bitcoinDuration, offset: secondSceneHeight / 4})
									.setTween(timlineSmallFirstBitcoin)
									.addTo(controller);
				// Bitcoin second small
				var timlineSmallSecondBitcoin = new TimelineLite()
			    	.add(TweenMax.to(".second-small-bitcoin-wrap", 0.2, {opacity: 0, top: -230}))
			    	.add(TweenMax.to(".second-small-bitcoin-wrap", 0.05, {opacity: 1, top: -180}))
			    	.add(TweenMax.to(".second-small-bitcoin-wrap", 0.15, {top: -160}))
			    	.add(TweenMax.to(".second-small-bitcoin-wrap", 0.2, {scale: 0.8, left: 190}))
			    	.add(TweenMax.to(".second-small-bitcoin-wrap", 0.05, {scale: 0.7, left: 140}))
			    	.add(TweenMax.to(".second-small-bitcoin-wrap", 0.05, {scale: 0.6, top: -80}));
				var largeBitcoinScene = new ScrollMagic.Scene({triggerElement: ".second-step", duration: bitcoinDuration, offset: secondSceneHeight / 4})
									.setTween(timlineSmallSecondBitcoin)
									.addTo(controller);
				// Bitcoin rotate
				new ScrollMagic.Scene({triggerElement: ".third-step", duration: thirdSceneHeight / 2, offset: thirdSceneHeight / 2})
									.setTween(".bitcoin-front", 0.2, {rotation: -45})
									.addTo(controller);
				// Cup-wrapper show
				var cupScene = new ScrollMagic.Scene({triggerElement: ".four-step", duration: fourSceneHeight / 2, offset: fourSceneHeight / 2})
									.setTween(".cup-wrapper", 0.2, {top: 190})
									.addTo(controller);
				cupScene.on("progress", function (event) {
				    if (event.progress > 0 && event.progress < 1) {
				    	$('.cup-wrapper').css('opacity', '1');
				    } else {
				    	$('.cup-wrapper').css('opacity', '0');
				    }
				});
				// Cup show
				var timlineCup = new TimelineLite()
			    	.add(TweenMax.to(".cup", 0.15, {opacity: 1, top: -70}))
			    	.add(TweenMax.to(".cup", 0.15, {opacity: 1, top: -70}))
			    	.add(TweenMax.to(".cup", 0.2, {top: -90}));
				new ScrollMagic.Scene({triggerElement: ".four-step", duration: fourSceneHeight / 2, offset: fourSceneHeight / 2})
									.setTween(timlineCup)
									.addTo(controller);	
				// Firework
				new ScrollMagic.Scene({triggerElement: ".four-step", duration: fourSceneHeight / 2, offset: fourSceneHeight / 1.5})
									.setTween(".firework", 0.1, {opacity: 1, scale: 1})
									.addTo(controller);
			}
		};
	}
	
	// Burger hover animation
	$('.menu-icon').hover(function() {
		TweenLite.to($('#first-line'), 0.3, {attr:{width:'60%'}, ease: Back.easeOut.config(1.7)});
		TweenLite.to($('#middle-line'), 0.3, {attr:{width:'100%'}, ease: Back.easeOut.config(1.7)});
		TweenLite.to($('#last-line'), 0.3, {attr:{width:'50%'}, ease: Back.easeOut.config(1.7)});
	}, function() {
		TweenLite.to($('#first-line'), 0.3, {attr:{width:'90%'}, ease: Back.easeOut.config(1.7)});
		TweenLite.to($('#middle-line'), 0.3, {attr:{width:'60%'}, ease: Back.easeOut.config(1.7)});
		TweenLite.to($('#last-line'), 0.3, {attr:{width:'100%'}, ease: Back.easeOut.config(1.7)});
	});

	// Cross hover animation
	$('.close-popup-icon').hover(function() {
		var firstLine = $(this).find('.first-line'),
			secondLine = $(this).find('.second-line'),
			tl = new TimelineMax({});

		tl.to(firstLine, 0.3, {attr:{width:'0%', x:'50%'}})
			.to(secondLine, 0.3, {attr:{width:'0%', x:'50%'}}, '-=0.2')
			.to(firstLine, 0.3, {attr:{width:'130%', x:'-15%'}})
			.to(secondLine, 0.3, {attr:{width:'130%', x:'-15%'}}, '-=0.2');
	}, function() {
	});

	// FAQ popup close/open
	$('.faq-wrapper').click(function(event) {
		$('.faq-popup').fadeIn(500);
		$('html, body').addClass('open-popup');
	});

	$('.close-popup-icon').click(function(event) {
		$('.faq-popup').fadeOut(500, function() {
			$('html, body').removeClass('open-popup');
		});
	});

	// guide popup close/open
	$('#guide').click(function(event) {
		$('.guide-popup').fadeIn(500);
		$('html, body').addClass('open-popup');
	});

	$('.close-popup-icon').click(function(event) {
		$('.guide-popup').fadeOut(500, function() {
			$('html, body').removeClass('open-popup');
		});
	});


	// Youtube popup close/open
	$('.btn-wrapper a').click(function(event) {
		event.preventDefault();
		// window.scrollTo(0, 0);
		var btn = $(this);
		$('.modal-bg').show();
		$('.black-bg').animate({
			opacity: 0.8
		}, 300, function() {
			if ($(btn).parent().hasClass('howto-video')) {
				console.log('123');
				$('#video2').show();
				$('#video2 .youtube-container').animate({
					opacity: 1
				}, 500);
				player2.playVideo();
			} else {
				$('#video1').show();
				$('#video1 .youtube-container').animate({
					opacity: 1
				}, 500);
				player1.playVideo();
			}
			
		});
		$('html, body').addClass('open-popup');
	});
	$('.black-bg, .close-youtube-popup').click(function(event) {
		player1.stopVideo();
		player2.stopVideo();
		$('.black-bg').animate({
			'opacity': 0
		}, 300, function() {
			$('.youtube-container').css('opacity', '0');
			$('.modal-bg').hide();
			$('#video1').hide();
			$('#video2').hide();
		});
		$('html, body').removeClass('open-popup');
	});



	$('.howto-video a').click(function(event) {
		event.preventDefault();

		$('.modal-bg-howto').show();
		$('.modal-bg-howto').animate({
			width: '100%',
			height: '120%',
			top: $(document).scrollTop(),
			left: 0,
		}, 200, function() {
			$('.modal-bg-howto').animate({
				'-webkit-border-radius': '0%',
		        '-moz-border-radius': '0%',
		        'border-radius': '0%'
			}, 100);

			$('.black-bg-howto').animate({
				opacity: 0.8
			}, 300, function() {
				$('.youtube-container').animate({
					opacity: 1
				}, 500);
			});
		});
		$('html, body').addClass('open-popup');
	});
	$('.black-bg-howto, .close-youtube-popup-howto').click(function(event) {
		$('.modal-bg-howto').animate({
			opacity: 0
		}, 300, function() {
			$('.modal-bg-howto').css({
				width: '100px',
				height: '100px',
				'-webkit-border-radius': '50%',
		        '-moz-border-radius': '50%',
		        'border-radius': '50%',
				top: $('.howto-video').position().top + ($('.howto-video').height()*2),
				left: $('.howto-video').position().left,
				opacity: 1
			});

			$('.youtube-container').css('opacity', '0');
			$('.black-bg-howto').css('opacity', '0');
			$('.modal-bg-howto').hide();
		});
		$('html, body').removeClass('open-popup');
	});

	// Contact us popup close/open
	$('.contact-us').click(function(event) {
		event.preventDefault();
		$('.contact-popup').fadeIn(500);
		$('html, body').addClass('open-popup');
	});

	$('.close-contact-popup').click(function(event) {
		$('.contact-popup').fadeOut(500, function() {
			$('html, body').removeClass('open-popup');
		});
	});

	// Menu close/open
	$('.menu-icon').click(function(event) {
		$('.menu').addClass('show-menu');
		$('html, body').addClass('open-popup');
	});

	$('.close-menu').click(function(event) {
		$('.menu').removeClass('show-menu');
		$('html, body').removeClass('open-popup');
	});

	// FAQ close/open item
	$('.faq-question').click(function(event) {
		var item = $(this).parents('.faq-item-wrapper'),
			answear = item.find('.faq-answear');

		if (item.hasClass('open')) {
			answear.slideUp(300);
			item.removeClass('open');
		} else {
			$('.faq-answear').not(this).slideUp(300).parent().removeClass('open');
			answear.slideDown(300);
			item.addClass('open');
		}
	});

	if ($('body').hasClass('main')) {
		// Spotlights scroll
		new ScrollMagic.Scene({triggerElement: '.ico'})
						.setClassToggle('.light-right', 'right-rotate')
						.addTo(controller);

		new ScrollMagic.Scene({triggerElement: '.ico'})
						.setClassToggle('.light-left', 'left-rotate')
						.addTo(controller);
	}

	// Footer windows light
	if ($(window).width() > 1024) {
		var footerTriggerOffset = $('.footer-city-block').height() / 2;
		new ScrollMagic.Scene({triggerElement: '.footer-city-block', triggerHook: 'onEnter', offset: footerTriggerOffset})
						.setClassToggle('.windows', 'show')
						.addTo(controller);
						
	} else {
		var footerTriggerOffset = $('.footer-city-block').height() / 2;
		new ScrollMagic.Scene({triggerElement: '.footer-city-block', triggerHook: 'onEnter', offset: footerTriggerOffset})
						.setClassToggle('.windows', 'show')
						.addTo(controller);
						
	}		

	//Menu anchor
	//$('.menu li a').click(function(event) {
		//event.preventDefault();
		//var anchor = $(this).attr('href');
		//$('.close-menu').trigger('click');
		//$('html, body').animate({ 
			//scrollTop: $(anchor).offset().top - 30
		//}, 1000);
	//});	

	if ($('body').hasClass('main')) {	
		// Logo scroll top
		$('.scroll-top').click(function(event) {
			event.preventDefault();
			$('html, body').animate({ 
				scrollTop: 0
			}, 1000);
		});	

		// Menu scroll positions
		var exploreDuration = $('#top').outerHeight(true) + $('.hero-img').outerHeight(true)+ $('.park').outerHeight(true);
		new ScrollMagic.Scene({triggerElement: "#top", duration: exploreDuration})
						.setClassToggle(".explore-link", "active")
						.addTo(controller);

	}

	// Contact us input
	$('.contact-popup input, textarea').focusin(function(event) {
		$(this).prev().addClass('active');
	});

	$('.contact-popup input, textarea').focusout(function(event) {
		$(this).prev().removeClass('active');
	});

	$('.contact-popup form').submit(function(event) {
		event.preventDefault();

		$.ajax({
			url: '/path/to/file',
			type: 'default GET (Other values: POST)',
			dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
			data: {param1: 'value1'},
		})
		.done(function() {
			console.log("success");
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
		
	});

	// Footer input style
	$('footer input[type="email"]').focusin(function(event) {
		$(this).parents('.input-wrapper').find('.email-icon').addClass('active');
		$(this).parents('.input-wrapper').find('.arrow-send').addClass('active');
		$(this).parents('form').find('label').addClass('active');
	});

	$('footer input[type="email"]').focusout(function(event) {
		$(this).parents('.input-wrapper').find('.email-icon').removeClass('active');
		$(this).parents('.input-wrapper').find('.arrow-send').removeClass('active');
		$(this).parents('form').find('label').removeClass('active');
	});

	// Input placeholder
	$('input,textarea').focus(function(){
		$(this).data('placeholder',$(this).attr('placeholder'))
		$(this).attr('placeholder','');
	});
	$('input,textarea').blur(function(){
		$(this).attr('placeholder',$(this).data('placeholder'));
	});

	// Timer
	function get_timer() {
		// Set timer date
		// var date_new = "February 7, 2017 00:00";
		var date_new = $('#timer').text();

		var date_t = new Date(date_new);
		var date = new Date();
		var timer = date_t - date;
		
		if(date_t > date) {
			var day = parseInt(timer/(60*60*1000*24));
			if(day < 10) {
				day = '0' + day;
			}
			day = day.toString();
			var hour = parseInt(timer/(60*60*1000))%24;
			if(hour < 10) {
				hour = '0' + hour;
			}
			hour = hour.toString();
			var min = parseInt(timer/(1000*60))%60;
			if(min < 10) {
				min = '0' + min;
			}
			min = min.toString();
			var sec = parseInt(timer/1000)%60;
			if(sec < 10) {
				sec = '0' + sec;
			}
			sec = sec.toString();
			if(day[1] == 9 && 
				hour[0] == 2 && 
				hour[1] == 3 && 
				min[0] == 5 && 
				min[1] == 9 && 
				sec[0] == 5 && 
				sec[1] == 9) {
				animation($("#day0"),day[0]);
				animation($("#day0-back"),day[0]);
			}
			else {
				$("#day0").html(day[0]);
				$("#day0-back").html(day[0]);
			}
			if(hour[0] == 2 && 
				hour[1] == 3 && 
				min[0] == 5 && 
				min[1] == 9 && 
				sec[0] == 5 && 
				sec[1] == 9) {
				animation($("#day1"),day[1]);
				animation($("#day1-back"),day[1]);
			}
			else {
				$("#day1").html(day[1]);
				$("#day1-back").html(day[1]);
			}
			if(hour[1] == 3 && 
				min[0] == 5 && 
				min[1] == 9 && 
				sec[0] == 5 && 
				sec[1] == 9) {
				animation($("#hour0"),hour[0]);
				animation($("#hour0-back"),hour[0]);
			}
			else {
				$("#hour0").html(hour[0]);
				$("#hour0-back").html(hour[0]);
			}
			if(min[0] == 5 && 
				min[1] == 9 && 
				sec[0] == 5 && 
				sec[1] == 9) {
				animation($("#hour1"),hour[1]);
				animation($("#hour1-back"),hour[1]);
			}
			else {
				$("#hour1").html(hour[1]);
				$("#hour1-back").html(hour[1]);
			}
			if(min[1] == 9 && 
				sec[0] == 5 && 
				sec[1] == 9) {
				animation($("#min0"),min[0]);
				animation($("#min0-back"),min[0]);
			}
			else {
				$("#min0").html(min[0]);
				$("#min0-back").html(min[0]);
			}
			if(sec[0] == 5 && sec[1] == 9) {
				animation($("#min1"),min[1]);
				animation($("#min1-back"),min[1]);
			}
			else {
				$("#min1").html(min[1]);
				$("#min1-back").html(min[1]);
			}
			if(sec[1] == 9) {
				animation($("#sec0"),sec[0]);
				animation($("#sec0-back"),sec[0]);
			}
			else {
				$("#sec0").html(sec[0]);
				$("#sec0-back").html(sec[0]);
			}
			animation($("#sec1"),sec[1]);	
			animation($("#sec1-back"),sec[1]);
			$("#day2").html(day[2]);
				$("#day2-back").html(day[2]);
			setTimeout(get_timer,1000);
		}
	}

	function animation(el, param) {
		if ($(window).width() <= 1024) {
			el.html(param)
				.css({'marginTop':'-10px','opacity':'0'})
				.animate({'marginTop':'0px','opacity':'1'});
		} else {
			el.html(param)
				.css({'marginTop':'-20px','opacity':'0'})
				.animate({'marginTop':'0px','opacity':'1'});
		}
	}

	get_timer();

	$('#statistics').click(function(){
		$('#statsblock').toggle('slow', function(){
			$(this).parent().toggleClass("openstats"); 
		});
	});
});


var BTC_GRANTED = 2285.14687655;
var MDN_RESERVES = 284993.733;
var MDN_CACHE = 3127.768;
var BTC_CACHE = 0;
var BTC_RAIT = "";
var RAIT_X = 50; // %
var MDN_RAIT = 2000 - (2000 / 100 * RAIT_X);
var USD_MIN = 100;
var USD_MAX = 1000;
var LOAN_PERCENT = 0.03;
var MDN_MAX, MDN_MIN, BTC_MAX, BTC_MIN;
var loan_amount;
var btcreserve;
var mdnreserve;
var loan_amount_percent;

var innerexchengebtc = function (mdncoast) {
	var btccoast = 0;
	btccoast = mdncoast * (1 / MDN_RAIT)
	return btccoast;
};

var innerexchengemdn = function (btccoast) {
	var mdncoast = 0;
	mdncoast = btccoast * MDN_RAIT;
	return mdncoast;
};

var initTips = function(){
	//$( ".tips" ).tooltip();
}

var getRate = function (currency) {

	var curs = $.ajax({
		url: 'https://bitpay.com/api/rates/' + currency.toUpperCase(),
		dataType: 'json'
	})
		.done(function (data) {
			if (data) {
				BTC_RAIT = data.rate
				$("#cursbtc").append(data.rate);
				onRequest();
			}
		});
}

var setAmountLoan = function(cache){
		var courentDare1, courentDare2, courentDare3, courentDare4;
		
		
		
		var courentMMDD = moment().add(7, 'days').format("MM/DD/");
		var courentYY = moment().add(7, 'days').format("YYYY");

		courentDare1 = courentMMDD + "<span class='cayan'>" + courentYY + "</span>";
		
		 courentMMDD = moment().add(14, 'days').format("MM/DD/");
		 courentYY = moment().add(14, 'days').format("YYYY");

		courentDare2 = courentMMDD + "<span class='cayan'>" + courentYY + "</span>";

		courentMMDD = moment().add(21, 'days').format("MM/DD/");
		courentYY = moment().add(21, 'days').format("YYYY");

		courentDare3 = courentMMDD + "<span class='cayan'>" + courentYY + "</span>";

		courentMMDD = moment().add(28, 'days').format("MM/DD/");
		courentYY = moment().add(28, 'days').format("YYYY");

		courentDare4 = courentMMDD + "<span class='cayan'>" + courentYY + "</span>";

		$('#terms1 .termsdate').html(courentDare1);
		$('#terms2 .termsdate').html(courentDare2);
		$('#terms3 .termsdate').html(courentDare3);
		$('#terms4 .termsdate').html(courentDare4);

		var cache1, cache2, cache3, cache4;
		cache1 = (cache + cache*0.03)/4;
		cache2 = (cache + cache*0.03)/4;
		cache3 = (cache + cache*0.03)/4;
		cache4 = (cache + cache*0.03)/4;
		$('#terms1 .termsloan').html(cache1.toFixed(8));
		$('#terms2 .termsloan').html(cache2.toFixed(8));
		$('#terms3 .termsloan').html(cache3.toFixed(8));
		$('#terms4 .termsloan').html(cache4.toFixed(8));
}

function onRequest() {
	BTC_MAX = USD_MAX / BTC_RAIT;
	BTC_MIN = USD_MIN / BTC_RAIT;

	MDN_MAX = innerexchengemdn(BTC_MAX);
	MDN_MIN = innerexchengemdn(BTC_MIN);
	init();
};

var  setMdnCache = function (cache){
	cache = cache*1;
	$("#mdncache").animateNumber({
									number: cache.toFixed(3),
									numberStep: function(now, tween) {
										var target = $(tween.elem);
										now = now.toFixed(3);
										target.prop('number', now).text(now);
									}
								});
}
var  setBtcCache = function (cache){
	cache = cache*1;
	$("#btccache").animateNumber({
									number: cache.toFixed(8),
									numberStep: function(now, tween) {
										var target = $(tween.elem);
										now = now.toFixed(8);
										target.prop('number', now).text(now);
									}
								});
};
	
var  setBtcReserve = function (cache){
	cache = cache*1;
	$("#btc_granted").animateNumber({
									number: cache.toFixed(8),
									numberStep: function(now, tween) {
										var target = $(tween.elem);
										now = now.toFixed(8);
										target.prop('number', now).text(now);
									}
								});
};

var  setMdnReserve = function (cache){
	cache = cache*1;
	$("#mdn_reserves").animateNumber({
									number: cache.toFixed(3),
									numberStep: function(now, tween) {
										var target = $(tween.elem);
										now = now.toFixed(3);
										target.prop('number', now).text(now);
									}
								});
};	

var setCreditSlider = function (sliderval){
	$('#slidercredit').slider("value", sliderval);
	
}
var btnShow = function(show){
	if (show) {
		$('#btnblock').show();
	}else{
		$('#btnblock').hide();
	}
}
var balshow = function(show){
	if (show) {
		$('.bal2').hide();
		$('#bal1').show();
	}else{
		$('.bal2').show();
		$('#bal1').hide();
	}
}
function init() {
	setMdnCache(MDN_CACHE);
	setBtcCache(BTC_CACHE);
	initTips();
	
	setBtcReserve(BTC_GRANTED);
	setMdnReserve(MDN_RESERVES);

	$('#slidercredit').slider({
		min: 0,
		max: 4,
		animate: 300,
		value: 3,
		range: "min",
		create:function (event, ui) {
				//alert(ui.value);
		}
	})
	.slider('pips', {
		rest: 'label',
		
		labels:[ "0", "Poor", "Fair", "Good", "Excellent"]	
		
	})
	.slider("disable");

	$("#sliderbtc").slider({
		range: "min",
		value: (BTC_MIN + BTC_MAX) / 2,
		min: BTC_MIN,
		max: BTC_MAX,
		step: 0.00000001,
		slide: function (event, ui) {
			$("#sliderbtcamount i").html(ui.value.toFixed(8));
			$("#amount").html(innerexchengemdn(ui.value).toFixed(3));
		}
	});
	$("#sliderbtcamount i").html($("#sliderbtc").slider("value"));
	$("#amount").html(innerexchengemdn($("#sliderbtc").slider("value")).toFixed(3));
	$("#sliderbtcmin i").html(BTC_MIN.toFixed(8));
	$("#sliderbtcmax i").html(BTC_MAX.toFixed(8));
	

	$("#courentdate").html(function () {
		var courentDDMM = moment().format("MM.DD.");
		var courentYY = moment().format("YYYY");
		var courentDare = courentDDMM + "<span class='cayan'>" + courentYY + "</span>"
		return courentDare;
	});

	$("#submit").click(function(){loan_amount = $("#sliderbtc").slider("value");});
};

var showAppPreloader = function(show){
	if(show){
		$("#app-preloader").animate({
									opacity: 1
									}, 500, function() {
										$(this).css("display","block");
									});
	}else{
		$("#app-preloader").animate({
									opacity: 0
									}, 500, function() {
										$(this).css("display","none");
									});
	}
}

var initAcept = function(){
	$("#accept").click(function(){
		if($(this).prop("checked")){
			$("#okclick").removeClass('disabled');
		}else{
			$("#okclick").addClass('disabled');
		}
	});
}




