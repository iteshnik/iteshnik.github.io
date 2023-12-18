$(document).ready(function() {
	if ($.browser.msie) {
		IEpngFix();
	};
	//png fix for ie
	function IEpngFix() {
		if ($.browser.msie) {
			var transparentImage = "i/tr.gif";
			
			oImg = $("img[src$=.png].png");
			lImg = $("img[src$=.png].png").length;
			
			for (i = 0; i < lImg; i++) {
				srcImg = $(oImg[i]).attr("src");
				$(oImg[i]).attr({
					src: transparentImage
				});
				oImg[i].runtimeStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + srcImg + "',sizingMethod='scale')";
				oImg[i].style.display = "inline-block";
			}
		}
	}
	
	
	
	popup(".show a");
	popup(".product-list ul a.est");
	function popup(open_btn) {
		$(".close").live("click", function(event) {
			event.preventDefault();
		});
		$(".close").live("click", function() {
			$(".popupchik").remove();
		});
		$(open_btn).click(function(event) {
			event.preventDefault();
		});
		$(open_btn).click(function() {
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
			selector = $(this).parent();
			ajaxlink = $(this).attr("href");
			$.get(ajaxlink, function(data) {
				$(selector).css({
					zIndex: 10
				});
				$(selector).prepend(data);
				inputValue(".input-text .text");
			});
			
		});
	};
	if ($(".search .text").length > 0) {
		inputValue(".search .text");
	}
	function inputValue(input) {
		var asInitVals = new Array;
		$(input).each(function(i) {
			asInitVals[i] = $(this).val();
		});
		$(input).focus(function() {
			if ($(this).val() == asInitVals[$(input).index(this)]) {
				$(this).val("");
			}
		});
		$(input).blur(function(i) {
			if (!(jQuery.trim($(this).val()))) {
				$(this).val(asInitVals[$(input).index(this)]);
			}
		});
	}
	
	
	//	if ($('.brand-holder ul').length > 0) {
	//		$('.brand-holder ul').jcarousel({
	//			scroll: 1
	//		});
	//	}
	if ($("#podbor select").length > 0) {
		podbor("#podbor select");
	}
	function podbor(pSelector) {
		initPodbor(pSelector);
		$("body").delegate(pSelector, "change", function() {
			//tName = $(this).attr("name");
			tName = $(this).attr("id");
			$(this).parents(".podborholder").append("<div class='wait'></div>");
			$("#resetpodbor").show();
			
			ajaxQuestion(pSelector, tName);
		});
		
		$("#resetpodbor").live("click", function(event) {
			event.preventDefault();
		});
		$("#resetpodbor").live("click", function() {
			$(this).parents("form").find("select option").removeAttr("disabled").removeAttr("selected");
			$(this).hide();
			$("#search_btn span").text("подобрать");
		});
		
		var cookieOptions = {
			path: '/',
			expires: 7
		};
		
		$("#search_more").click(function(event) {
			event.preventDefault();
		});
		opend = $.cookie("open_dopsearch");
		if (opend) {
			opend2 = 0;
		}
		opend = opend * 1;
		$("#search_more").click(function() {
			if (!opend) {
				//ajaxlink = "/ajax/doppodbor.html";
				ajaxlink = "/ajax/dopparam";
				var param = "";
				fAction = "/";
				var catVal = $("#podbor_cat_id").val();
				fAction += "cat/" + catVal + "/";
				var brandVal = $("#podbor_brand_id").val();
				if (brandVal) 
					fAction += "brand/" + brandVal + "/";
				var attr_param = '';
				$("#podbor select").each(function(i, pItem) {
					thisName = $(this).attr("id");
					thisVal = $(this).val();
					if (i == 0) { // для цен
						if (thisVal > 0) 
							fAction += thisName + "/" + thisVal + "/";
					}
					else { // для атрибутов
						if (thisVal > 0) {
							attr_id = thisName.replace(/^attr_/, '');
							attr_param += "a" + attr_id + 'v' + thisVal;
						}
					}
				});
				
				if (attr_param.length > 0) 
					attr_param = 'at/' + attr_param + '/';
				
				param = fAction + attr_param;
				fAction += attr_param;
				ajaxlink += param;
				
				$(this).parents(".podborholder").append("<div class='wait'></div>")
				$(".search_more").load(ajaxlink, function() {
					wait = $(".wait").length;
					if (wait > 0) {
						$(".wait").remove();
					};
					$("#search_more").text("меньше параметров");
					
					$.cookie("open_dopsearch", "1", cookieOptions);
					initPodbor(pSelector);
				});
				opend = 1;
				opend2 = 0;
			}
			else {
				if (opend2) {
					$(".search_more").slideDown();
					$("#search_more").text("меньше параметров");
					$.cookie("open_dopsearch", "1", cookieOptions);
					opend2 = 0;
				}
				else {
					$(".search_more").slideUp();
					$("#search_more").text("больше параметров");
					$.cookie("open_dopsearch", "0", cookieOptions);
					opend2 = 1;
				}
			}
		})
	};
	
	$("#search_btn").live("click", function(event) {
		event.preventDefault();
	});
	$("#search_btn").live("click", function() {
		thisURL = $(this).parents("form").attr("action");
		window.location = thisURL;
	});
	
	function ajaxQuestion(thisSelector, fName) {
		var ajaxlink = "/ajax/podbor";
		var param = "";
		fAction = "/";
		var catVal = $("#podbor_cat_id").val();
		fAction += "cat/" + catVal + "/";
		var brandVal = $("#podbor_brand_id").val();
		if (brandVal) 
			fAction += "brand/" + brandVal + "/";
		
		var attr_param = '';
		$(thisSelector).each(function(i, pItem) {
			thisName = $(this).attr("id");
			thisVal = $(this).val();
			if (i == 0 && thisName == 'price') { // для цен
				if (thisVal > 0) 
					fAction += thisName + "/" + thisVal + "/";
			}
			else { // для атрибутов
				if (thisVal > 0) {
					attr_id = thisName.replace(/^attr_/, '');
					attr_param += "a" + attr_id + 'v' + thisVal;
				}
			}
		});
		
		if (attr_param.length > 0) 
			attr_param = 'at/' + attr_param + '/';
		
		param = fAction + attr_param + "fname/" + fName + "/";
		fAction += attr_param;
		ajaxlink += param;
		
		$(thisSelector).parents("form").attr({
			"action": fAction
		});
		
		$.getJSON(ajaxlink, null, function(data) {
			$.each(data.name, function(i) {
				thisID = '';
				for (var name in this) {
					thisID += name
				};
				thisObj = eval("this." + thisID);
				$(thisObj).each(function(j) {
					if (!this.dis) {
						$("#" + thisID + "_" + this.val).attr({
							"disabled": "disabled"
						});
					}
					else {
						$("#" + thisID + "_" + this.val).attr({
							"disabled": ""
						});
					}
				});
				
			});
			$("#search_btn span").text(data.finds);
			wait = $(".wait").length;
			if (wait > 0) {
				$(".wait").remove();
			};
					});
	}
	function initPodbor(sel) {
		$(sel).each(function() {
			var thisID = $(this).attr("id");
			var thisName;
			$(this).find("option").each(function(i) {
				thisVal = $(this).val();
				$(this).attr({
					"id": thisID + "_" + thisVal
				});
			});
		});
	};
	
	$(".product-box .price_hold").hover(function() {
		$(this).find("input").focus();
	}, function() {
		$(this).find("input").blur();
	});
	$(".in-basket").live("click", function(event) {
		event.preventDefault();
	});
	$(".in-basket").live("click", function() {
		add2Cart(this, "/ajax/addcart/", callBackTov);
		$("#menuhov").css({
			"zIndex": 100
		});
	});
	
	function add2Cart(thisTovar, ajaxlink, callBackFunc) {
		var myClass = $(thisTovar).attr("id");
		myClass = myClass.replace(/[icr]/, '');
		var myClassStr = myClass;
		var count = $("." + myClassStr).val();
		count = parseInt(count);
		if ((count * 1) > 0) {
			arr = myClass.split('-');
			var param = "item_id=" + arr[0] + "&itm_count=" + count + "&itm_unit=" + arr[1];
			$.getJSON(ajaxlink, param, function(data) {
				callBackFunc(data);
			});
			//animaciya
			$("body").prepend("<div id='tovimg'></div>");
			offsetBody = self.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop);
			offsetImg = $(thisTovar).parents(".product-box").find(".img-box img").offset();
			$("#tovimg").css({
				"left": offsetImg.left,
				"top": offsetImg.top
			});
			$(thisTovar).parents(".product-box").find(".img-box img").clone().appendTo("#tovimg");
			offsetBasket = $(".header .basket").offset();
			$("body").scrollTo({
				top: '0',
				left: '0'
			}, 500, function() {
				$("#tovimg").animate({
					"left": offsetBasket.left,
					"top": offsetBasket.top,
					"opacity": 0,
					"width": 100,
					"height": 40
				}, 400, function() {
					$(this).remove();
					$("#basket_anim").animate({
						"opacity": 1
					}, 300).animate({
						"opacity": 0
					}, 300, function() {
						$("body").scrollTo({
							top: offsetBody,
							left: '0'
						}, 500, function() {
							$("#menuhov").css({
								"zIndex": 0
							});
						});
					});
				});
			});
		}
		else {
			alert("Введите количество товара больше нуля");
		}
	};
	function add2ShopCart(thisTovar, ajaxlink, callBackFunc) {
		var myClass = $(thisTovar).attr("id");
		myClass = myClass.replace(/[icr]/, '');
		var myClassStr = myClass;
		var count = $("." + myClassStr).val();
		count = parseInt(count);
		arr = myClass.split('-');
		var param = "item_id=" + arr[0] + "&itm_count=" + count + "&itm_unit=" + arr[1];
		$.getJSON(ajaxlink, param, function(data) {
			callBackFunc(data);
		});
		
	};
	function callBackShopcard(result) {
		$(".basket .list").html(result.cart_html);
		$(".total-list .price em").html(result.total_price);
		$("#asd").html(result.asd);
		//$(".optskid").html(result.cart_percent);
		$.each(result.prices, function(index, tov) {
			price = tov.price;
			item_price = tov.item_price;
			id = tov.id;
			unit = tov.unit;
			thisTov = $("." + id + "-" + unit).parent().parent().parent();
			$(thisTov).find(".cena1 .price em").html(price);
			$(thisTov).find(".cena2 .price em").html(item_price);
		});
		wait = $(".wait").length;
		if (wait > 0) {
			$(".wait").remove();
		};
			};
	
	function callBackTov(result) {
		$(".basket .list").html(result.res);
		$("#inbaskettovs").html(result.inbaskettovs);
		//id = result.id;
		//$("#"+id).parents(".formadd").find(".add input[type=image]").attr({"src":"/i/incard.png"}).removeClass("bhover");
		wait = $(".wait").length;
		if (wait > 0) {
			$(".wait").remove();
		};
			};
	
	$("#ask").toggle(function() {
		$(".ask").slideDown();
		$(this).addClass("askopen");
	}, function() {
		$(".ask").slideUp();
		$(this).removeClass("askopen");
	});
	
	faq();
	function faq() {
		$(".faq li .row a").click(function(event) {
			event.preventDefault();
		});
		$(".faq li .box:not(#ask-question)").hide();
		faq = $(".faq");
		
		if (faq.length) {
			$(".faq li .row .link").toggle(function() {
				$(this).parent().next().slideDown();
				$(this).parent().parent().toggleClass("open");
			}, function() {
				$(this).parent().next().slideUp();
				thisH2 = $(this);
				$(this).queue(function() {
					$(thisH2).parent().parent().toggleClass("open");
					$(this).dequeue();
				});
			});
		};
			};
	
	$.fn.extend({
		reset: function() {
			return this.each(function() {
				$(this).is('form') && this.reset();
			});
		}
	});
	
	$(".add input:not(.add input.bhover)").live("click", function(event) {
		event.preventDefault();
	});
	$(".cancel").live("click", function(event) {
		event.preventDefault();
	});
	
	/*$("a[rel=gallary]").fancybox({
	 'transitionIn' : 'none',
	 'transitionOut' : 'none',
	 'titlePosition' : 'outside',
	 'titleFormat' : function(title, currentArray, currentIndex, currentOpts) {
	 return '<span id="fancybox-title-over">Изображение ' + (currentIndex + 1) + ' из ' + currentArray.length + ' ' + '</span>';
	 }
	 });
	 $("a[class=zoom_image]").fancybox();*/
	function checkFormPurchase() {
		email = $("#email").val();
		phone = $("#phone").val();
		//city = $("#city").val();
		name = $("#name").val();
		
		if (name == '') {
			alert('Заполните поле Имя');
			return false;
		}
		//		if (email == '') {
		//			alert('Заполните поле Email');
		//			return false;
		//		}
		if (email.length > 0) 
			if (!/^([\w-~_]+\.)*[\w-~_]+@([\w-_]+\.){1,3}\w{2,4}$/.test(email)) {
				alert('Поле Email имеет неверный формат');
				return false;
			}
		if (phone == '') {
			alert('Заполните поле Телефон');
			return false;
		}
		if (!/\d+/.test(phone)) {
			alert('Номер телефона содержит нецифровые символы');
			return false;
		}
		
		/*if(city == ''){
		 alert('Заполните поле Адрес доставки');
		 return false;
		 }*/
		return true;
	}
	
	// покупка товара
	$(".send").click(function() {
	
		if (checkFormPurchase()) {
			//type = $("#payment_type").val();
			
			type = 0; // заглушка для типа оплаты: работает только наличный расчет
			if (type == 0) {
				// наличный расчет: делаем сабмит формы
				$("#cart_form").submit();
			}
			if (type > 0) {
				// безналичный расчет
				
				email = $("#email").val();
				phone = $("#phone").val();
				city = $("#city").val();
				name = $("#name").val();
				info = $("#nfo").val();
				param = 'type=' + type + '&email=' + email + '&phone=' + phone + '&city=' + city + '&name=' + name + '&info=' + info;
				param = encodeURI(param);
				
				$.getJSON("/cart/getnewzakaz/", param, function(data) {
					$("#payment_hash").val(data.hash);
					$("#payment_order").val(data.id);
					$("#payment_info").val(data.name);
					$("#payment_deliver").val(data.city);
					
					price = $(".withnds .prices span").text();
					price = price.replace(/\D/, "");
					price = price.replace(/,/, ".");
					price = price.replace(".", "");
					price = parseInt(price, 0);
					$("#payment_amount").val(price);
					$("#payment_type2").val(type);
					$("#form_money_ua").submit();
				});
			}
			return false;
		}
		else 
			return false;
	});
	
	$("#select_category").change(function() {
		var gallery = $(this).val();
		var href = "/gallary/";
		if (gallery > 0) 
			href = href + gallery + "/";
		window.location.href = href;
	});
	
	$("body").delegate(".sel_sort", "change", function() {
		var pathLocation = $(this).val();
		window.location.href = pathLocation;
	});
	$("body").delegate(".sel_otb", "change", function() {
		var kolvoOtbr = $(this).val();
		var cookieOptions = {
			path: '/',
			expires: 7
		};
		$.cookie("kolvoOtbr", kolvoOtbr, cookieOptions);
		window.location.reload(true);
		
	});
	$(".submitform").live("click", function() {
		$(this).parents("form").submit();
	});
	
	$(".history-info .hide").toggle(function() {
		$(this).parent().parent().addClass("open-cart");
		$(this).html("<span>спрятать</span>");
	}, function() {
		$(this).parent().parent().removeClass("open-cart");
		$(this).html("<span>подробнее</span>");
	});
	
	$(".history .hide").toggle(function() {
		$(this).parent().parent().addClass("open-history");
		$(this).html("<span>спрятать</span>");
	}, function() {
		$(this).parent().parent().removeClass("open-history");
		$(this).html("<span>подробнее</span>");
	});
	
	$(".profile .hide").toggle(function() {
		$(this).parent().parent().removeClass("open-profile");
		$(this).html("<span>подробнее</span>");
	}, function() {
		$(this).parent().parent().addClass("open-profile");
		$(this).html("<span>спрятать</span>");
	});
	
	hideMenu();
	function hideMenu() {
		var menuHold = $(".product-list ul");
		var menuHoldHeight = $(menuHold).height();
		var menuItems = $(menuHold).find("li");
		var colvoCol = $(menuHold).width() / $(menuItems[0]).width();
		colvoCol = Math.floor(colvoCol);
		var padd = $(menuItems[0]).css("paddingBottom");
		var n = 3;
		var maxHeight = 0;
		var thHeight = 0;
		var cookieOptions = {
			path: '/',
			expires: 7
		};
		
		padd = parseInt(padd);
		if (($(menuItems).length > (colvoCol * n)) && ($(".banner01").length == 0)) {
			for (i = 0; i < colvoCol; i++) {
				thHeight = 0;
				for (j = i; j < n; j++) {
					thHeight += $(menuItems[j + colvoCol]).height();
				}
				maxHeight = Math.max(maxHeight, thHeight);
			}
			
			maxHeight += n * padd;
			if ($(menuHold).hasClass("hide_menu")) {
				$(menuHold).height(maxHeight);
			}
			$("#menuhov").height(maxHeight);
			time = 1000;
			time2 = 300;
			var status_hover = "close";
			var delay_out = 0;
			var delay_in;
			$(menuHold).find("li a.est").live("click", function() {
				if ($(menuHold).hasClass("hide_menu")) {
					$(menuHold).animate({
						height: menuHoldHeight
					}, 500, function() {
						$("#show_more").text("скрыть")
					}).removeClass("hide_menu");
					$.cookie("hide_menu", "1", cookieOptions);
				}
			});
			$("#show_more").click(function() {
				if ($(menuHold).hasClass("hide_menu")) {
					$(menuHold).animate({
						height: menuHoldHeight
					}, 500, function() {
						$("#show_more").text("скрыть")
					}).removeClass("hide_menu");
					$.cookie("hide_menu", "1", cookieOptions);
				}
				else {
					$(menuHold).animate({
						height: maxHeight
					}, 500, function() {
						$("#show_more").text("показать весь каталог")
					}).addClass("hide_menu");
					$.cookie("hide_menu", "0", cookieOptions);
				}
			});
		}
	}
	
	$("#sendphone").live("click", function(event) {
		event.preventDefault();
	});
	$("#sendphone").live("click", function() {
		ajaxurl="/ajax/phone.php"
		//ajaxurl = "/ajax/leavephone/";
		var phone = $(this).parents("form").find("input[type=text]").val();
		thisBTN = $(this);
		$.getJSON(ajaxurl, {
			"phone": phone
		}, function(data) {
			valid = data.valid * 1;
			if (valid) {
				$(".inbaskettovs").remove();
				$(thisBTN).parents("form").find(".row").html(data.mess);
				$(thisBTN).remove();
				
				setTimeout(popupchickClose, 1500)
			}
			else {
				$(thisBTN).parents("form").find(".inbaskettovs").remove();
				$(thisBTN).parents("form").find(".row").before("<div class='inbaskettovs'>" + data.mess + "</div>")
			}
		})
	});
	function popupchickClose() {
		$(".popupchik").remove();
	}
	
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
		if ($(thold).find(".tb").length) {
			$(thold).find(".tb").hide();
			$(thold).find(".tb").css({
				"visibility": "visible"
			});
			$(thold).find("." + activeTab).show();
			$(tab).find("li").click(function() {
				activeTab = $(this).attr("id");
				$(thold).find(".tb").hide();
				$(thold).find("." + activeTab).show();
				$(tab).find("li").removeClass("active");
				$(this).addClass("active");
			})
		}
	}
	function fixedBlock(sel) {
		var offset = $(sel).offset();
		var topPadding = 15;
		$(window).scroll(function() {
			if ($(window).scrollTop() > offset.top) {
				$(sel).stop().animate({
					marginTop: $(window).scrollTop() - offset.top + topPadding
				}, 500);
			}
			else {
				$(sel).stop().animate({
					marginTop: 0
				}, 500);
			};
					});
	}
	if ($("#fixed").length) {
		fixedBlock("#fixed");
	}
	if ($("#fixed2").length) {
		fixedBlock("#fixed2");
	}
	
	/**Корзина**/
	
	var shopcard = ".shopcart .table2";
	var arrKolvo = new Array;
	removTov(shopcard);
	function removTov(table) {
		$("#remove").hide();
		var thisTr = $(table + ' tbody tr');
		var thisTrLength = $(thisTr).length;
		var thisCheckbox = $(thisTr).find("input:checkbox ");
		$(thisCheckbox).change(function() {
			var checked = false;
			checked = $(this).attr("checked");
			indexCheck = $(thisCheckbox).index(this);
			thisCount = $(thisTr[indexCheck]).find("input.count");
			if (checked) {
				arrKolvo[indexCheck] = $(thisCount).val();
				$(thisCount).val("0");
				thisID = $(this).parents('tr.formadd').attr('id');
				incValueLoad(shopcard, thisID);
			}
			else {
				$(thisCount).val(arrKolvo[indexCheck]);
				thisID = $(this).parents('tr.formadd').attr('id');
				incValueLoad(shopcard, thisID);
			}
			var checked3;
			for (i = 0; i < thisTrLength; i++) {
				checked2 = $(thisCheckbox[i]).attr("checked");
				checked3 = checked3 || checked2;
				if (checked3) {
					$("#remove").show();
				}
				else {
					$("#remove").hide();
				}
			}
		});
	}
	/**
	* Функция серверного расчёта цен
	*/
	if ($("#remove").length>0){
		$("#remove").click(function(){
			var thisTr = $(shopcard + ' tr');
			var thisChecked = $(thisTr).find("input:checked");
			var thisCheckbox = $(thisTr).find("input:checkbox");

			if($(thisCheckbox).length==$(thisChecked).length){
				ajaxlink = "/ajax/clearcart/";
				$.getJSON(ajaxlink, function(data){
					$(".shopcart").html(data.cart_text);
					$(".basket .list").html(data.cart_html);
				});
			}else{
				ajaxlink = "/ajax/delitem/";
				$.getJSON(ajaxlink,function(data){
					$(thisChecked).parents('.formadd').remove();
					$(".basket .list").html(data.cart_html);
				});
			}
		});
	}
	if ($("#clearcart").length>0){
		$("#clearcart").click(function(){
                        if(confirm('Вы уверены, что хотите удалить из корзины все товары?')){
                            ajaxlink = "/ajax/clearcart/";
                            $.getJSON(ajaxlink, function(data){
                                    $(".shopcart").html(data.cart_text);
                                    $(".basket .list").html(data.cart_html);
                            });
                        }
		});
	}
	function incValueLoad(table, thisId) {
		var thisTr = $(table + ' tbody tr');
		var thisTrLength = $(thisTr).length;
		var thisCheckbox = $(thisTr).find("input:checkbox ");
		var checked3;
		var itm_id = thisId.replace('itm_','');
			itm_id_tmp = itm_id.indexOf('_');
			itm_id = itm_id.slice(0,itm_id_tmp);
		var itm_count = $('#'+thisId).find('.count').val();
		var itm_unit = $('#'+thisId).attr('itm_unit');
//		var ajaxlink = '/ajax/cart.json';
		var ajaxlink = '/ajax/rcart/';
		var param = 'item_id='+itm_id+'&itm_count='+itm_count+'&itm_unit='+itm_unit;
		
		for (i = 0; i < thisTrLength; i++) {
			checked2 = $(thisCheckbox[i]).attr("checked");
			checked3 = checked3 || checked2;
			if (i == thisTrLength - 1) {
				if (checked3) {
					$("#remove").show();
				}
				else {
					$("#remove").hide();
				}
			}
		}
		$.getJSON(ajaxlink, param, function(data){
				$('#totalprice em').text(data.total);
				$(data.prices).each(function(i){
						$("#"+this.id).find(".cena1 em").text(this.price);
						$("#"+this.id).find(".cena2 em").text(this.cena);
						
					})
				$(".basket .list").html(data.cart_html);
			});
	}
	/**
	* Функция инкрементирования и декрементирования значений колличества товаров
	*/
	if ($('.plus, .minus').length>0){
		incValue();
	}
	function incValue() {
		var incVal;
		$('.plus, .minus').live("click", function(event) {
			event.preventDefault();
		});
		$('.plus').click(function() {
			thisInc = $(this).parent().prev();
			incVal = $(thisInc).val();
			if (incVal == 0) {
				$(this).parent().parent().parent().parent().find("input:checkbox").trigger('click');
			}
			incVal++;
			$(thisInc).val(incVal);
			thisID = $(this).parents('tr.formadd').attr('id');
			incValueLoad(shopcard, thisID);
		})
		$('.minus').click(function() {
			thisInc = $(this).parent().prev();
			incVal = $(thisInc).val();
			if (incVal > 0) {
				incVal--;
				if (incVal == 0) {
					$(this).parent().parent().parent().parent().find("input:checkbox").trigger('click');
				}
				$(thisInc).val(incVal);
			}
			thisID = $(this).parents('tr.formadd').attr('id');
			incValueLoad(shopcard, thisID);
		});
		
		var valBefore;
		$(".count").focus(function(e) {
			valBefore = $(this).val();
		});
		$(".count").keyup(function(e) {
			if (((48 <= e.which) && (e.which <= 57)) || ((96 <= e.which) && (e.which <= 105)) || (e.which == 8) || (e.which == 39) || (e.which == 37) || (e.which == 46) || (e.which == 27) || (e.which == 17) || (e.which == 16)) {
				thisKolvo = $(this).val();
				valBefore = $(this).val();
				if (valBefore == 0) {
					$(this).parent().parent().parent().find("input:checkbox").trigger('click');
				}
				else {
					$(this).parent().parent().parent().find("input:checkbox").attr({
						"checked": ""
					});
				}
				thisID = $(this).parents('tr.formadd').attr('id');
				incValueLoad(shopcard, thisID);
			}
			else {
				$(this).val(valBefore);
				thisID = $(this).parents('tr.formadd').attr('id');
				incValueLoad(shopcard, thisID);
			}
		});
	};
	if ($(".ask").length > 0) {
		$(".ask").hide();
		$("#oformit").toggle(function() {
			$(".ask").slideDown();
		}, function() {
			$(".ask").slideUp()
		});
	}

	$('.zakaznuber').toggle(function() {
		$(this).addClass("aaa");
		$(".aaa span").addClass('open');
		$(this).find("em").css({
			display: "none"
		});
		$(this).next().slideDown("slow");
	}, function() {
		$(this).find("em").css({
			display: "block"
		});
		$(".aaa span").removeClass('open');
		$(this).removeClass("aaa");
		$(this).next().slideUp("slow");
	});
	
	$("#submitform").click(function(event){ event.preventDefault();});
	$("#submitform").click(function(){
		var errorVal = "поле обязательно для заполнения";
		//var starArr = new Array;
		var starLenght;
		var k = 0;
		star = $("#cart_form .mark");
		starLenght = $(star).length;
		for (i=0; i<starLenght; i++ ){
			idInput = $(star[i]).parent().attr("for");
			valInput = $("#"+idInput).val();
			if ((valInput=="")||(valInput==errorVal)){
				k++;
				$("#"+idInput).addClass("star").val(errorVal);
			}
		}
		if (k==0){
			$('#cart_form').submit();
		}else{
			formInputVal();
		}
	});
	function formInputVal(){
		formInput = "#cart_form input";
		className = "star";
		var asInitVals = new Array();
		$(formInput).each( function (i) {
				asInitVals[i] = $(this).val();
		});
		
		$(formInput).focus( function () {
				if ( $(this).hasClass(className) ){
					$(this).removeClass(className);
					$(this).val("");
				}
			});
		$(formInput).blur( function (i) {
					thisValue = jQuery.trim(this.val());
				if (thisValue == "" ){
					$(this).addClass(className);
					this.val(asInitVals[$(formInput).index(this)]);
				}
			});
	}
});
