$(document).ready(function(){
	var attr = $("#all_attr .attr");
	var attr_btn = $("#all_attr .attr .attr_btn");
	var attr_hold = $("#all_attr .attr .attr_hold");
	var v_time = 250;
	var thisBtn;
	if(attr.length>0){
		$(attr_hold).hide();
		$(attr_btn).click(function(){
										thisBtn = $(this);
										if ($(thisBtn).next(":visible").length>0){
											$(thisBtn).next().slideUp(v_time,function(){
													$(thisBtn).toggleClass("active")
												});
											
										}else{
											$(thisBtn).toggleClass("active").next().slideDown(v_time);
										}
									});
	}
	
	var attr_chk = $("#all_attr .attr .attr_hold input:checkbox");
	var attr_chk_td = $(attr_chk).parent("td");
	var attr_chk_fs = $(attr_chk_td).find("fieldset");
	var attr_radio = $(attr_chk_fs).find("input:radio");
	change_color_td = function(ind, col){
		$(attr_chk_td[ind]).removeAttr('class').addClass(col);
		$(attr_chk_fs[ind]).find('label').removeClass('active');
		col_class = '.'+col;
		$(attr_chk_fs[ind]).find('p'+col_class+' label').addClass('active');
	};
	change_active_attr = function(ind, col){
		$(attr_chk_td[ind]).removeAttr('class').addClass(col);
		$(attr_chk_fs[ind]).toggleClass('active');
	}
	$(attr_chk).click(function(){
			checked = $(this).attr('checked');
			aIND = $(attr_chk).index(this);
			color = $(attr_chk_fs[aIND]).find('input:checked').parent('p').attr('class');
			if(checked){
				change_active_attr(aIND, color);
				$(attr_chk_fs[aIND]).find('input').removeAttr('disabled');
				$(attr_chk_fs[aIND]).find('input:checked').next('label').toggleClass('active');
			}else{
				change_active_attr(aIND, '');
				$(attr_chk_fs[aIND]).find('input').attr({'disabled':'disabled'});
				$(attr_chk_fs[aIND]).find('input:checked').next('label').toggleClass('active');
			}
		});
	$(attr_radio).change(function(){
		this_fs = $(this).parents('fieldset');
		aIND = $(attr_chk_fs).index(this_fs);
		color = $(attr_chk_fs[aIND]).find('input:checked').parent('p').attr('class');
		change_color_td(aIND, color);
	});
/**
* Dewelop
**/
//	var radio_btn = function(ind, name){
//		name = 'n' + name;
//		id = name;
//		val = 'v';
//		return  '<fieldset title="Параметры активности атрибута"><p class="d1"><input type="radio" disabled="disabled" name="'+ name +'" value="'+ val +'1" id="'+ id +'_1"><label for="'+ id +'_1">Основной параметр</label></p><p class="d2"><input type="radio" disabled="disabled" name="'+ name +'" value="'+ val +'2" id="'+ id +'_2"><label for="'+ id +'_2">Дополнительный параметр</label></p><p class="d3"><input type="radio" checked="checked" disabled="disabled" name="'+ name +'" value="'+ val +'3" id="'+ id +'_3"><label for="'+ id+'_3">Не участвует</label></p></fieldset>'
//		
//	}
//	$(attr_chk_td).each(function(i){
//		val = $(attr_chk[i]).val();
//		text = $(attr_chk_td[i]).text();
//		$(attr_chk[i]).attr({'id':'id_chk'+val})
//		aHTML = $(this).html();
//		$(this).html('');
//		aHTML = aHTML.replace(text, '');
//		aHTML = aHTML+'<label for="id_chk'+val+'">'+text+'</label>';
//		$(this).append(aHTML);
//		$(this).append(radio_btn(i,val)).find('div').addClass('attr_radio');
//	});

	

});

