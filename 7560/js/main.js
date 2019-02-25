$(document).ready(function() {
  add2Cart();
  
  $("a.zoom").click(function(event) {event.preventDefault();});
  $("a.zoom").click(function(event) {
    $("a.main").trigger('click');
  });
    
  
	if ($("#mycarousel").length){
    $('#mycarousel').jcarousel({
          //itemVisibleOutCallback: {onAfterAnimation: function(carousel, item, i, state, evt) { carousel.remove(i); }},
          itemLoadCallback: mycarousel_itemLoadCallback
    });
   
  }
  
  if ($.browser.msie){IEpngFix();}
	
	var maxWidth = 1280; // max width
	var minWidth = 1000; // min width
	var selector = $("#main"); // selector
	var windowWidthTemp = 0;
	var windowWidth = 0;
	
	if ($("#main").width() > 1200) {
		$('.televizor').css({
			right: "50px"
		})
	};
	if ($.browser.msie) {
		mmwidth();
		$(window).resize(function() {
			windowWidth = $(window).width();
			if (windowWidth != windowWidthTemp) {
				windowWidthTemp = windowWidth;
				mmwidth();
			}
		});
	};
	function mmwidth() {
		$(selector).css({
			width: 100 + "%"
		});
		bodyWidth = $(window).width();
		if (bodyWidth < minWidth) {
			$(selector).width(minWidth);
		}
		else {
			if (bodyWidth > maxWidth) {
				$(selector).width(maxWidth);
			}
			else {
				$(selector).width(100 + "%");
			}
		}
	};
	
	var hhTableHeight;
	var browser = jQuery.browser;
	var browserVer = jQuery.browser.version;
	
	if ($(".reloadcapcha a").length) {
		capcha();
	};
	
	function heighttt() {
		hhTableHeight = $('.hits-holder table').height();
	}
	
	checkHitsHholder = $('.hits-holder').length;
	if (checkHitsHholder) {
		tovarGroupHeight = $(".tovar-group").height();
		$(".hits").height(tovarGroupHeight);
		$('.hits-holder').height(tovarGroupHeight + 8);
		
		$(".hits .bottom span a").click(function(event) {
			event.preventDefault();
		});
		$(".hits .bottom span").hover(function() {
			$(this).addClass("hover");
		}, function() {
			$(this).removeClass("hover")
		});
		$(".hits .bottom span").toggle(function() {
			$('.hits').animate({
				height: hhTableHeight
			}, 1000);
			$('.hits-holder').css({
				height: hhTableHeight + 8
			});
		}, function() {
			$('.hits').animate({
				height: tovarGroupHeight
			}, 1000).queue(function() {
				$(this).dequeue();
				$('.hits-holder').css({
					height: tovarGroupHeight + 8
				});
			});
		});
	}
	//flash televizor
	var days_live = 7 // vremya zhizni cookie
	var cook = $.cookie("switch");
	if ($("#main").width() > 1200) {
		$('.televizor').css({
			right: "50px"
		})
	};
//	if (cook != "off") {
//		$('#televayzer').flash({
//			src: 'swf/tel.swf',
//			width: 307,
//			height: 171
//		}, {
//			version: 8
//		});
//		$('#vkl').removeClass("vkl").addClass("vikl").html("off");
//		$('#vkl').toggle(function() {
//			$('#televayzer').html("");
//			$(this).removeClass("vikl").addClass("vkl").html("on");
//			$.cookie("switch", "off", {
//				expires: days_live
//			});
//		}, function() {
//			$('#televayzer').flash({
//				src: 'swf/tel.swf',
//				width: 307,
//				height: 171
//			}, {
//				version: 8
//			});
//			$(this).removeClass("vkl").addClass("vikl").html("off");
//			$.cookie("switch", "on", {
//				expires: days_live
//			});
//		});
//	}
//	else {
//		$('#vkl').toggle(function() {
//			$('#televayzer').flash({
//				src: 'swf/tel.swf',
//				width: 307,
//				height: 171
//			}, {
//				version: 8
//			});
//			$(this).removeClass("vkl").addClass("vikl").html("off");
//			$.cookie("switch", "on", {
//				expires: days_live
//			});
//		}, function() {
//			$('#televayzer').html("");
//			$(this).removeClass("vikl").addClass("vkl").html("on");
//			$.cookie("switch", "off", {
//				expires: days_live
//			});
//		});
//	}
	
	
	//login popup
	$(".login").hide();
	$(".enterpopup").click(function(event) {event.preventDefault();});
	$(".enterpopup").click(function() {
		$(".login").show()
	});
	$("*:not(.enterpopup)").click(function(e) {
		kids = e.target;
		var _a = kids;
		while (true) {
			_acl = _a.className;
			_atag = _a.tagName;
			if ((_atag && (_acl == 'login')) || (_acl == 'enterpopup')) {
				break;
			}
			else {
				if (!_atag) {
					$(".login").hide();
					break;
				}
				_a = _a.parentNode;
			}
		}
	});
	
	//button-hover
	buttonSrc = $(".login .button").attr("src");
	buttonSrcHover = $(".login .button").attr("srchover");
	$(".login .button").hover(function() {
		$(".login .button").attr({
			src: buttonSrcHover
		})
	}, function() {
		$(".login .button").attr({
			src: buttonSrc
		})
	})
	
	//AJAX tovari
	function callbackFunc() {
		kolvoTovarov = $('.hits-holder .tovar').length;
		$(".hits .bottom a").text(kolvoTovarov);
		$(".hits").animate({"height": tovarGroupHeight}, 1000);
		//if loading all img, then uznayom height
		kolvoImg = $(".hits-holder table img").length;
		ink = 0;

				heighttt();
		if ($.browser.msie) {
			IEpngFix();
		}
	}
	function callbackFunc2(){
    $('.block-news .load').css({display:"none"});
    checkMycarousel = $("#mycarousel").length;
    if(checkMycarousel){
      $('#mycarousel').jcarousel({
          //itemVisibleOutCallback: {onAfterAnimation: function(carousel, item, i, state, evt) { carousel.remove(i); }},
          itemLoadCallback: mycarousel_itemLoadCallback
     });      
//      my_carousel.start = 1;
//      my_carousel.first = 1;
//      my_carousel.last = 3;
//      $('#mycarousel ul').css({left:"0"});
//      mycarousel_itemLoadCallback(my_carousel,'reload');
//      attriboots();
      jcaruselsetings();
    }
    checkComments = $(".add-comment").length;
    if(checkComments){
      capcha();
      addcommnet();
    }
  }
	
	ajaxlink = $(".hits .tabs li").attr("ajaxlink");
	$('.hits-holder').load(ajaxlink, callbackFunc);
	
	$(".tabs li a").click(function(event) {event.preventDefault();});
	
	$(".tabs li").click(function() {
		if (!($(this).hasClass("active"))) {
			parentClass = $(this).parent().parent().attr("class");
			
			oldLink = $("." + parentClass + " .tabs li.active").html();
			newLink = $(this).html();
			
			oldLink = oldLink.replace(/span/gi, "a");
			oldLink = oldLink.replace(/em/gi, "span");
			
			newLink = newLink.replace(/span/gi, "em");
			newLink = newLink.replace(/a/gi, "span");
			
			$("." + parentClass + " .tabs li.active").html(oldLink);
			$(this).html(newLink);
			
			$("." + parentClass + " .tabs li").removeClass("active");
			$(this).addClass("active");
			ajaxlink = $(this).attr("ajaxlink");
			
			
			if (parentClass == "hits") {
				$(".hits").queue(function() {
					$(".hits").animate({"height": "35px"}, 1000);
					$(this).dequeue();
				});
				$(".hits").queue(function() {
					$('.hits-holder').load(ajaxlink, callbackFunc);
					$(this).dequeue();
				});
			}
			else {
				if (parentClass == "block-news") {
					$('.block-news .load').css({
						display: "block"
					});
					$('.block-news .content').text("");
					$('.block-news .content').load(ajaxlink, callbackFunc2);
				};
							};
			
			$("." + parentClass + " .tabs li a").click(function(event) {
				event.preventDefault();
			});
		}
		else {
		
		}
	})
	
	//png fix for ie
	function IEpngFix() {
		if ($.browser.msie) {
			var transparentImage = "i/transparent.gif";
			
			oImg = $("img[src$=.png]");
			lImg = $("img[src$=.png]").length;
			
			for (i = 0; i < lImg; i++) {
				srcImg = $(oImg[i]).attr("src");
				$(oImg[i]).attr({src: transparentImage});
				oImg[i].runtimeStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + srcImg + "',sizingMethod='scale')";
				oImg[i].style.display = "inline-block";
			}
		}
	}
	
	//searchfield
  valtemp = 'Поиск по сайту';
  val = $(".searchfield").attr("value");
  $(".searchfield").focus(function(){
//  altemp = $(".searchfield").attr("value");
    if (valtemp == val){
      $(this).attr({value:""});
    };
  });
  $(".searchfield").blur(function(){
//  valtemp = $(".searchfield").attr("value");
    sizeVal = valtemp.length;
    k=0;
    for (i=0; i<sizeVal;i++){
      if (valtemp[i] == " "){k++;}
    }
    if ((k == sizeVal)||(!valtemp)){
      $(this).attr({value:val});
    }
  });
	
	// navigation slaider
	$(".navigation li ul:not(.activeul)").hide();
	
	current();
  
	function current() {
		$(".navigation #current").parents("ul").show();
		$(".navigation #current").parents("li").addClass("active");
		$(".navigation #current").addClass("active")
	}
	
	$(".navigation li a").click(function(event) {
		activ = $(this).parent().hasClass("active")
		nextTag = $(this).next().attr("tagName");
		if ((!activ) && (nextTag == "UL")) {
			event.preventDefault();
			$(this).parent().addClass("active");
			$(this).next().slideDown(500);
		}
		else {
			if (nextTag == "UL") {
				event.preventDefault()
				thisParent = $(this).parent();
				thisNext = $(this).next();
				$(thisNext).slideUp(500);
				$(thisNext).queue(function() {
					$(thisParent).removeClass("active");
					$(this).dequeue();
				});
			}
			else {
				return true
			};
					}
	});
	
	// catalog tovar height fix
	tovarHeightFix();
	function tovarHeightFix() {
		var tovar = $(".catalog .tovar");
		var tovarImg = $(".catalog .tovar .img");
		var tovarH2 = $(".catalog .tovar h2");
		var maxHeightTov = $(".catalog .tovar").height();
		var maxHeightImg = $(".catalog .tovar .img").height();
		var maxHeightH2 = $(".catalog .tovar h2").height();
		tovarLength = tovar.length;
		
		changeValuta();
		
		function changeValuta() {
			$(".valuta li a").click(function(event) {
				event.preventDefault();
			});
			$(".valuta li a").click(function() {
        var item_id = new Array();
        
        if($('div[id*="pitm_"]').length){
          $('div[id*="pitm_"]').each(function (i) {
            item_id[i] = $(this).attr('id');
          });
        }
        
				ajaxLink = $(this).attr("ajaxlink")
				$.getJSON(ajaxLink, {arr_item_id :item_id}, function(data) {
					$.each(data.prices, function(index, tov) {
//            alert(index+'=='+tov.id+'=='+tov.price+'=='+tov.price_new);
            price = tov.price;
						price_new = tov.price_new;
            
            if(price_new > 0){
              var html_text = '<em>'+price_new+'</em> <span class="val">'+data.valuta+'</span>';
            }
            else{
              var html_text = '<em>'+price+'</em> <span class="val">'+data.valuta+'</span>';
            }
            
						id = tov.id;
            if($("#" + id + " .price").length)
						  $("#" + id + " .price").html(html_text);            
            
            if($("#item_price") && index==1){
              $("#item_price").html(html_text);
            }
            if($("#item_old_price") && index==1){
              if(price_new > 0){
                var html_text = '<em>'+price+'</em> <span class="val">'+data.valuta+'</span>';
              }
              else{
                var html_text = '<em>'+price_new+'</em> <span class="val">'+data.valuta+'</span>';
              }              
              $("#item_old_price").html(html_text);
            }
					})
					$(".incard").text(data.valuta);
					$(".incard2").text(data.valuta);
          
				})
				oldLink = $(".valuta li.active").html();
				newLink = $(this).parent().html();
				
				oldLink = oldLink.replace(/span/gi, "a");
				newLink = newLink.replace(/\<a/gi, '<span');
				newLink = newLink.replace(/\<\/a\>/gi, '</span>');
				$(".valuta li.active").html(oldLink);
				$(".valuta li").removeClass("active");
				$(this).parent().addClass("active");
				$(this).parent().html(newLink);
				
				$(".valuta li a").click(function(event) {
					event.preventDefault();
				});
				changeValuta();
			});
			
		}
		
		$(window).load(function() {
			for (i = 0; i < tovarLength; i++) {
				tovHeightImg = tovarImg[i];
				tovHeightImg = $(tovHeightImg).height();
				if (maxHeightImg < tovHeightImg) {
					maxHeightImg = tovHeightImg;
				}
			}
			//$(".catalog .tovar .img").height(maxHeightImg);
			for (i = 0; i < tovarLength; i++) {
				tovHeightH2 = tovarH2[i];
				tovHeightH2 = $(tovHeightH2).height();
				if (maxHeightH2 < tovHeightH2) {
					maxHeightH2 = tovHeightH2;
				}
			}
			$(".catalog .tovar h2").height(maxHeightH2);
			
			for (i = 0; i < tovarLength; i++) {
				tovHeight = tovar[i];
				tovHeight = $(tovHeight).height();
				if (maxHeightTov < tovHeight) {
					maxHeightTov = tovHeight;
				}
			}
			$(".catalog .tovar").height(maxHeightTov);
			//img{vertical-align:middle;}
//			for (i = 0; i < tovarLength; i++) {
//				tovImg = $(".catalog .tovar .img img:not(.catalog .tovar .img .sale img)")[i];
//				tovImgHeight = $(tovImg).height();
//				imgMarginTop = maxHeightImg - tovImgHeight;
//				$(tovarH2[i]).css({
//					paddingTop: imgMarginTop
//				})
//				
//			}
		});
	};
	
	
	//fix block2 for ie6
	$(window).load(function() {
		if ($.browser.msie) {
			block2Height = $(".block2").height();
			$(".block2").height(block2Height);
			//alert("Fatal ERROR: Access denine. MustDie - MUST DIE!");
			//alert("self-destruction start");
			//alert("www.opera.com");
			//$("#main").css({"display":"none"});
		};
			});
	attriboots();
	//Sravnenie i viborka tovarov
//	var ajaxUrl = "ajax/tovar1.php";
function attriboots(){
  $(".attriboots li a").live("click", function(event){event.preventDefault();});
  ajaxlink2 = $(".attriboots").attr("ajaxlink");
  $(".attriboots li a").live("click", function(){
    $("#carusel_hover").css({zIndex:3});
    $(this).parent().toggleClass("active");
    ajaxUrl = $(this).attr("href");
    
    global_mode = 'attriboots';
    
//    $(".jcarousel-next").trigger("click");        
    
    $.getJSON(ajaxUrl, function(data){
      $.each(data.vals, function(index, tov){
        val = tov.val;
        id = tov.id;
        //alert(val);
        if ($("#"+id).hasClass("false")){
          $("#"+id).removeClass("false");
          chengeLink = $("#"+id).html();
          chengeLink = chengeLink.replace(/\<span/gi, '<a');
          chengeLink = chengeLink.replace(/\<\/span\>/gi, '</a>');
          $("#"+id).html(chengeLink);
        }
        
        if (val==0){
          $("#"+id).addClass("false");
          chengeLink = $("#"+id).html();
          chengeLink = chengeLink.replace(/\<a/gi, '<span');
          chengeLink = chengeLink.replace(/\<\/a\>/gi, '</span>');
          $("#"+id).html(chengeLink);
        }
      });      
    });
    my_carousel.start = 1;
    my_carousel.first = 1;
    my_carousel.last = 3;
    $('li.jcarousel-item').remove();
    $('#mycarousel ul').css({left:"0"});
    mycarousel_itemLoadCallback(my_carousel,'reload');      
    jcaruselsetings();
  });
    
}
	
	
	//run mycarousel
//	mycarouselLin = $("#mycarousel").length;
//	if (mycarouselLin) {
//		$('#mycarousel').jcarousel({
//			itemVisibleOutCallback: {
//				onAfterAnimation: function(carousel, item, i, state, evt) {
//					carousel.remove(i);
//				}
//			},
			//itemLoadCallback: mycarousel_itemLoadCallback,
//			wrap: 'circular',
//			itemVisibleInCallback: {
//				onBeforeAnimation: mycarousel_itemVisibleInCallback
//			},
//			itemVisibleOutCallback: {
//				onAfterAnimation: mycarousel_itemVisibleOutCallback
//			}
//		
//		});
//	};
	
	var caruselHoverHeight;
	
	function jcaruselsetings() {
	
		$("#carusel_hover").css({zIndex: 1});
		caruselHoverHeight = $('.carusel_hover').parent().height();
		$("#carusel_hover").height(caruselHoverHeight);
		$("#carusel_hover div").height(caruselHoverHeight);
		_length = $('#mycarousel li').length;
		
		$("#mycarousel ul").height("");
		carouselHeight = $("#mycarousel ul li").height();
		$("#mycarousel ul").height(carouselHeight);
		
		var caruselTovarImg = $('#mycarousel .tovar .img');
		var caruselTovar = $('#mycarousel .tovar');
		var lenghtImg = $('#mycarousel .tovar .img').length;
		var caruselMaxHeightImg = 0;
		var caruselMaxHeightTov = 0;
		var bMarginTop = 0;
		
		for (i=0;i<lenghtImg;i++){
      caruselImgHeight = caruselTovarImg[i];
      caruselImgHeight = $(caruselImgHeight).height();
      
      if (caruselMaxHeightImg < caruselImgHeight){
        caruselMaxHeightImg = caruselImgHeight;
      }
      if (i==(lenghtImg-1)){$("#mycarousel .tovar .img").height(caruselMaxHeightImg)};
    };
		
		var caruselTovarH2 = $('#mycarousel .tovar h2');
		var lenghtH2 = $('#mycarousel .tovar h2').length;
		var caruselMaxHeightH2 = 0;
		
		for (i = 0; i < lenghtH2; i++) {
			caruselH2Height = caruselTovarH2[i];
			caruselH2Height = $(caruselH2Height).height();
			
			if (caruselMaxHeightH2 < caruselH2Height) {
				caruselMaxHeightH2 = caruselH2Height;
			}
			if (i == (lenghtH2 - 1)) {
				$("#mycarousel .tovar h2").height(caruselMaxHeightH2)
			};
					};
		
		for (i = 0; i < lenghtImg; i++) {
			caruselTovHeight = caruselTovar[i];
			caruselTovHeight = $(caruselTovHeight).height();
			
			if (caruselMaxHeightTov < caruselTovHeight) {
				caruselMaxHeightTov = caruselTovHeight;
			}
			if (i == (lenghtImg - 1)) {
				imgMarginTop = caruselMaxHeightTov / 2 - 10;
				$('#carusel-holder .jcarousel-next').css({
					top: imgMarginTop
				});
				$('#carusel-holder .jcarousel-prev').css({
					top: imgMarginTop
				});
				//alert(imgMarginTop);
			};
					};
		for (i = 0; i < lenghtImg; i++) {
			carTovImg = $("#mycarousel .tovar .img img:not(#mycarousel .tovar .img .sale img)")[i];
			carTovImgHeight = $(carTovImg).height();
			bMarginTop = caruselMaxHeightImg / 2 - carTovImgHeight / 2;
			$(carTovImg).css({
				marginTop: bMarginTop
			})
		}
		IEpngFix();
	};
	// !!!!!!!!!!!!!!!!!! Carousel settings !!!!!!!!!!!!!
	// ajax
	function mycarousel_itemLoadCallback(carousel, state)
  {     
      
    if(typeof(my_carousel) == 'undefined'){
      my_carousel = carousel;
    }
//    if (carousel.has(carousel.first, carousel.last)) {
//      return;
//    }
    var ajaxUrl = $("#mycarousel ul").attr("ajaxlink");
    $.getJSON(
      ajaxUrl,
      {
        first: carousel.first,
        last: carousel.last
      },
      function(data) {
        mycarousel_itemAddCallback(carousel, carousel.first, carousel.last, data);
        jcaruselsetings();
    });
  }
	
	function mycarousel_itemAddCallback(carousel, first, last, data) {
		carousel.size(parseInt(data.tov_col));
		carSize = data.tov_col;
		$(".block-news .tabs li.active em").html("[" + carSize + "]");
		$.each(data.tovars, function(i, tov) {
			carousel.add(first + i, mycarousel_getItemHTML(tov.tovar));
		});
	}
// cirtical
//	function mycarousel_itemVisibleInCallback(carousel, item, i, state, evt) {//alert("i="+i+"   carousel.first = "+carousel.first+"   carousel.last = "+carousel.last);
		//if (carousel.has(carousel.first, carousel.last)) {
		//return;
		//}
//    ajaxUrl = $('div#mycarousel ul').attr("ajaxlink");
//		$.getJSON(ajaxUrl, {
//			first: carousel.first,
//			last: carousel.last
//		}, function(data) {
//			carousel.size(parseInt(data.tov_col));
//			carSize = data.tov_col;
//			$(".block-news .tabs li.active em").html("[" + carSize + "]");
//			$.each(data.tovars, function(i, tov) {
//				carousel.add(carousel.first + i, mycarousel_getItemHTML(tov.tovar));
//			});
//			jcaruselsetings();
//		});
//		
//	};
//	
//	function mycarousel_itemVisibleOutCallback(carousel, item, i, state, evt) {
//		carousel.remove(i);
//	};
	function mycarousel_getItemHTML(itemHtml)
	{
		return itemHtml;
	};
	
	// !!!!!!!!!!!!!!!!!!END Carousel settings !!!!!!!!!!!!!
	
	//ajax capcha
	function capcha() {
		$(".reloadcapcha a").click(function(event) {
			event.preventDefault();
		});
		$(".reloadcapcha a").click(function() {
			ajaxlinkCapcha = $(this).attr("href");
			$(".capcha").load(ajaxlinkCapcha);
		});
	}
	
	//oformit
	var oformitLen = $(".oformit").length;
	if (oformitLen) {
		oformit()
	};
	
	function oformit() {
		$("#ofrmit").click(function(event) {
			event.preventDefault();
		});
		$("#perechitat").click(function(event) {
			event.preventDefault();
		});
		$("#perechitat2").click(function(event) {
			event.preventDefault();
		});
		
		$(".oformit").hide();
		$("#ofrmit").click(function() {
			$(".oformit").slideDown(1000, function() {
				$("#ofrmit").hide();
				$("#perechitat").hide();
				$("#perechitat2").show();
				$(".korzina .kolvo").attr("disabled", "disabled").css({
					backgroundColor: "#f2f2f2"
				});
			})
		});
		$("#perechitat2").click(function() {
			$(".oformit").slideUp(1000, function() {
				$("#ofrmit").show();
				$("#perechitat").show();
				$("#perechitat2").hide();
				$(".korzina .kolvo").removeAttr("disabled").css({
					backgroundColor: "#ffffff"
				});
			})
		});
	}
	
	$(".zoom").click(function(event) {
		event.preventDefault();
	});
	$(".zoom").click(function() {
		$(this).next().triggerHandler("click");
	});
	if($("#addcomment").length>0){
		addcommnet();
	}
	function addcommnet() {
		$("#addcomment").click(function(event) {
			event.preventDefault();
		});
		$("#addcomment").click(function() {
			comName = $("#name").attr("value");
			comText = $("#text").attr("value");
			comCapcha = $("#capcha").attr("value");
			posUrl = $("#ajaxlink").attr("action");
			if (!comName) {
				alert("vvedite NAME")
			}
			else {
				if (!comText) {
					alert("vvedite TEXT");
				}
				else {
					if (!comCapcha) {
						alert("eprst CAPCHA!!!!!")
					}
					else {
            var fields = $('#ajaxlink').serialize();
						$.post(posUrl, fields, comment, "json");
					}
				}
			}
		});
	};
	
	function comment(data) {
		res = data.res
		if (res == 1) {
			comName = comName.replace(/\</gi, '&lt;');
			comName = comName.replace(/\>/gi, '&gt;');
			comText = comText.replace(/\</gi, '&lt;');
			comText = comText.replace(/\>/gi, '&gt;');
			$(".tab5").prepend('<div class="comments" id="newcomment" style="display:none;"><div class="about"><span class="date">' + data.date + '</span><strong class="name">' + comName + '</strong></div><div class="comment-holder"><div class="comment"><p>' + comText + '</p></div></div></div>');
			$("#newcomment").slideDown(500);
			$.post(posUrl, {
				comText: comText,
				comName: comName
			});
			$("#capcha").attr({
				value: ""
			});
			$("#text").attr({
				value: ""
			});
			$(".reloadcapcha a").triggerHandler("click");
			colvoComm = $(".block-news .content .comments").length;
			$(".block-news .tabs li.active em").text("[" + colvoComm + "]");
		}
		else {
			$("#err").prepend("<span>neverniy vvod</span> ");
			$("#capcha").attr({
				value: ""
			});
			$("#err span").fadeOut(1500);
			$(".reloadcapcha a").triggerHandler("click");
		}
	}
	
	
	
	//-------------------
	var keymass = new Array(97, 100, 108, 97, 98, 115, 32, 119, 111, 114, 107);
	var incKey = 0;
	$("input").keypress(function(e) {
	
		if (e.which == keymass[incKey]) {
		
			if (incKey == 10) {
				alert("aga :)")
			}
			incKey++;
		}
		else 
			(incKey = 0);
	});
	$('.zakazedit').css({
		display: "none"
	});
	$('.dataedit_h').css({
		display: "none"
	});
	$('.addredit_h').css({
		display: "none"
	});
	$('.zakaznuber').toggle(function() {
		//$(this).addClass("aaa");
		$(this).find("span").addClass('open');
		$(this).find("em").css({
			display: "none"
		});
		$(this).next().slideDown("slow");
	}, function() {
		$(this).find("em").css({
			display: "block"
		});
		$(this).find("span").removeClass('open');
		//$(this).removeClass("aaa");
		$(this).next().slideUp("slow");
	})
	$('.addredit h5').toggle(function() {
		$(this).addClass('open');
		$('.addredit_h').slideDown("slow");
	}, function() {
		$(this).removeClass('open');
		$('.addredit_h').slideUp("slow");
	})
	$('.dataedit h5').toggle(function() {
		$(this).addClass('open');
		$('.dataedit_h').slideDown("slow");
	}, function() {
		$(this).removeClass('open');
		$('.dataedit_h').slideUp("slow");
	})
	
	if ($("#tabs li").length) {
		tabs("#tabs");
	}
	else {
		$("#tab_content").hide();
	}
	function tabs(tab) {
		$(tab).find("li a").click(function(event) {
			event.preventDefault();
		});
		var activeTab = $(tab).find("li:first").addClass("active").attr("id");
		var thold = $(tab).parents('.tabsholder');
		if ($(thold).find(".tab_content").length) {
			$(thold).find(".tab_content").hide();
			$(thold).find(".tab_content").css({
				"visibility": "visible"
			});
			$(thold).find("." + activeTab).show();
			$(tab).find("li").click(function() {
				activeTab = $(this).attr("id");
				$(thold).find(".tab_content").hide();
				$(thold).find("." + activeTab).show();
				$(tab).find("li").removeClass("active");
				$(this).addClass("active");
			})
		}
	}
				if($(".brands").length>0){
					$('.brands').jcarousel({
						scroll: 3,
						itemLoadCallback: brands_itemLoadCallback
					});
				}
				function brands_itemLoadCallback(carousel, state) {
					//ajaxUrl = "/ajax/brands/"
					ajaxUrl = "/ajax/brands.php"
					if (carousel.has(carousel.first, carousel.last)) {
						return;
					}
					$.getJSON(ajaxUrl, {
						first: carousel.first,
						last: carousel.last
					}, function(data) {
						brands_itemAddCallback(carousel, carousel.first, carousel.last, data);
					});
				};
				
				function brands_itemAddCallback(carousel, first, last, data) {
					  carousel.size(parseInt(data.total));
					$.each(data.brands, function(i, br) {
						carousel.add(first + i, brands_getItemHTML(br.brand));
					});
				};
				
				function brands_getItemHTML(itemHtml) {
					return itemHtml;
					
				};
				
				if($(".popup").length>0){
					popup(".popup")
				}
	function popup(open_btn) {
		var winWidth = $("body").width();
		
		$(".close, .close-popup").live("click", function(event) {
			event.preventDefault();
		});
		$(".close, .close-popup").live("click", function() {
			$(".popupchik").remove();
		});
		$(open_btn).click(function(event) {
			event.preventDefault();
		});
		$(open_btn).click(function(e) {
			$(".popupchik").remove();
			$("*:not(.popupchik)").click(function(e) {
				kids = e.target;
				var _a = kids;
				while (true) {
					_atag = _a.tagName;
					if (_atag && ($(_a).hasClass('popupchik'))) {
						break;
					}
					else {
						if (!_atag) {
							$(".popupchik").remove();
							break;
						}
						_a = _a.parentNode;
					}
				}
			});
			//selector = $(this).parent();
			
			ajaxlink = $(this).attr("href");
			$.get(ajaxlink, function(data) {
				$("body").append('<div class="popupchik"><a href="#" class="close-popup">close</a></div>');
				$(".popupchik").css({
					right: winWidth - e.pageX,
					top: e.pageY
				});
				selector = $(".popupchik");
				$(selector).prepend(data);
				inputValue(".text");
			});
			
		});
	}
function by_popup(popup_text, evnt) {
	var winWidth = $("body").width();
	
	$(".close, .close-popup").live("click", function(event) {
	  event.preventDefault();
	});
	$(".close, .close-popup").live("click", function() {
	  $(".popupchik").remove();
	});

	$("*:not(.popupchik)").click(function(e) {
	  kids = e.target;
	  var _a = kids;
	  while (true) {
		_atag = _a.tagName;
		if (_atag && ($(_a).hasClass('popupchik'))) {
		  break;
		}
		else {
		  if (!_atag) {
			$(".popupchik").remove();
			break;
		  }
		  _a = _a.parentNode;
		}
	  }
	});
	  //selector = $(this).parent();
	  
	ajaxlink = $(this).attr("href");
	$("body").append('<div class="popupchik by_popup"><a href="#" class="close-popup">close</a></div>');
	$(".popupchik").css({
	  right: winWidth - evnt.pageX,
	  top: evnt.pageY
	});
	selector = $(".popupchik");
	$(selector).prepend(popup_text);
	setTimeout(function(){
						$(".by_popup").animate({"opacity":0}, 200).remove;
						}, 3000)
  }
  function add2Cart(){

    $(".incard").live("click", function(ev){
       id = $(this).attr("id");
       if (/^tov_\d{1,10}$/.test(id)){
         tt = id.split('_');
         item_id = tt[1];
       }
       else{
         item_id  = id;
       }

       if($(this).hasClass('itemcart')){
         $.getJSON('/ajax/addcart/',{item_id:item_id},function(result){
          if (result){
            var itm_name = 'tov_'+item_id;
            $("#cart_info").html(result.res);
            $(".after_by").html(result.incard);
            by_popup(result.add_cart_message, ev);
          }
         });
       }
       else{
         $.getJSON('/ajax/addcart/',{item_id:item_id},function(result){
            if (result){
              var itm_name = 'tov_'+item_id;
              res = result.res;
              $("#cart_info").html(res);
              $("#"+id).attr("title", 'уже в корзине');
              $("#"+itm_name).addClass("incard");
              $("#"+itm_name).attr("title", 'уже в корзине');
              by_popup(result.add_cart_message, ev);
            }
          });
       }
       
    });
  }
});