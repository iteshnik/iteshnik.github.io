			function mycarousel_itemLoadCallback1(carousel, state){
				thisCarousel = carousel.list[0];
				ajaxUrl_jcar = $(thisCarousel).attr("ajaxurl");
				$(thisCarousel).parent().addClass("anim_start");
				
				if (carousel.has(carousel.first, carousel.last)) {
					return;
				}
				$.getJSON(
					ajaxUrl_jcar,
					{
						first: carousel.first,
						last: carousel.last,
					},
					function(data) {
						mycarousel_itemAddCallback2(carousel, carousel.first, carousel.last, data);
				});
			}

			

			function mycarousel_itemAddCallback2(carousel, first, last, data){
				thisCarousel = carousel.list[0];
				carousel.size(parseInt(data.tov_col));
				carSize = data.tov_col;
				$.each(data.tovars, function(i, tov){
					carousel.add(first + i, mycarousel_getItemHTML(tov.tovar));
				});
				$(thisCarousel).parent().removeClass("anim_start");
				if ($(".product > .product-area .box").length){
					fixWitdhHeight(".product",".product > .product-area .box");
				}
			}

			function mycarousel_getItemHTML(itemHtml){
				return itemHtml;
			};
			function fixWitdhHeight(wrapBlock, fixBlocks){

								fixBlocks = $(fixBlocks);
		$(fixBlocks).width("");
		
		var wrapBlockWidth = $(wrapBlock).width();
		var fixBlocksWidth = $(fixBlocks).width();
		var fixBlocksNum = Math.floor(wrapBlockWidth / fixBlocksWidth); 

		
		fixBlocksLength = $(fixBlocks).length;
		fixBlocksCols = fixBlocksNum
		fixBlocksRows = Math.ceil(fixBlocksLength / fixBlocksCols);

		var i,j;
		var fixBlocksArray = new Array;
		for (i=0; i<fixBlocksRows; i++){
			fixBlocksArray[i] = new Array;
		}
		
		var k=0;
		for (i=0;i<fixBlocksRows;i++){
			for (j=0;j<fixBlocksCols;j++){
				if(k<fixBlocksLength){
					fixBlocksArray[i][j] = $(fixBlocks[k]);
					$(fixBlocksArray[i][j]).height("");
					k++;
				}
			}
		}
		var thisRowMaxHeight;
		var thisHeight;
		for (i=0;i<fixBlocksRows;i++){
			thisRowMaxHeight = 0;
			for (j=0;j<fixBlocksCols;j++){
				if (fixBlocksArray[i][j]){
					
					thisHeight = fixBlocksArray[i][j].height();
					thisRowMaxHeight = Math.max(thisRowMaxHeight, thisHeight);
				}
			}
			for (j=0;j<fixBlocksCols;j++){
				if (fixBlocksArray[i][j]){
					fixBlocksArray[i][j].height(thisRowMaxHeight);
				}
			}
			
		}

		var thisRowMaxHeight;
		var thisRowMaxHeight;
		for (i=0;i<fixBlocksRows;i++){
			thisRowMaxHeight = 0;
			for (j=0;j<fixBlocksCols;j++){
				if (fixBlocksArray[i][j]){
					
					thisHeight = $(fixBlocksArray[i][j]).find(".tovzag").height();
					thisRowMaxHeight = Math.max(thisRowMaxHeight, thisHeight);
				}
			}
			for (j=0;j<fixBlocksCols;j++){
				if (fixBlocksArray[i][j]){
					$(fixBlocksArray[i][j]).find(".tovzag").height(thisRowMaxHeight);
				}
			}
			
		}
	}