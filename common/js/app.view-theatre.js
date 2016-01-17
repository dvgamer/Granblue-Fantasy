/* VIEW THEATRE
============================================================ */
var View_theatre = function(_model,_view,_controller){
	var _this = this, $this = $(_this), $model = $(_model), $view = $(_view), $controller = $(_controller), change_page_flg = false, change_theatre_trigger_flg = false, change_enable_flg = false, popstate_flg = false;
	
	
	/* Showed Contents
	-------------------------------------------------- */
	$view.on(_view.dispatch_show_contents,function(){

		if(_model.url.substring(1, 4) == 'the'){
			console.log('-------------------------------------- showed contents : Theatre');
			$('body').removeClass('scroll_full');

			change_enable_flg = true; //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<!!!!!!!!!!!!
			
			var top_cont_pos_01 = 0, top_cont_pos_02 = 3572;
			
			//$('#theatre .contents').perfectScrollbar();
			
			
			/* Thumbnail List Slide */
			//TOP : NextPrevによる移動のパターン
			function list_slider(){
				var ww , wh, ww_harf, cont = $('.thamb_character'), cont_w = cont.width(), base_pos, percent, status, direction = '', scroll_timer, repeat_l_flg = true, repeat_r_flg = true, interval = 1, speed = 30;
				
				$('#thamb_character_01').css({left: top_cont_pos_01});
				$('#thamb_character_02').css({left: top_cont_pos_02});
				
				
				// Thumbnail Repeater
				function thumb_repeater(){
					var buffer = 100, line_l = -(cont_w + buffer), line_r = cont_w - buffer;
					
					cont.each(function(){
						//console.log($(this).offset().left);
						
						if($(this).offset().left <= line_l){
							//console.log($(this).attr('id'));
							$(this).css({left: $(this).offset().left + (cont_w * 2)});
						}
						if($(this).offset().left > line_r){
							//console.log($(this).attr('id'));
							$(this).css({left: $(this).offset().left - (cont_w * 2)});
						}
					});
					
					
/*
					var line_l = -200, line_r = $(window).width() + 200, cont_l = cont.offset().left, cont_r = cont_l + cont_w;
					console.log('line_l : ', line_l);
					console.log('line_r : ', line_r);
					console.log('cont_l : ', cont_l);
					console.log('cont_r : ', cont_r);
					
					if(cont_l > line_l){ //左がこえた
						if(repeat_l_flg){
							console.log('左がこえた');
							
							repeat_l_flg = false;
							
							clone_l = cont.clone(true);
							clone_l.css({left: cont_l - (cont_w + 4)}); // 4 : マージン分
							cont.parent().prepend(clone_l);
						}
						
					}else{ //左がおさまった
						console.log('左がおさまった');
						
						repeat_l_flg = true;
					}
					
					if(cont_r < line_r){ //右がこえた
						console.log('右がこえた');
					}else{ //右がおさまった
						console.log('右がおさまった');
					}
*/
				}
				
				$(window).resize(function(){
					thumb_repeater();
				});
				thumb_repeater();
				
				
				function cont_scroll_to(){
					clearTimeout(scroll_timer);
					
					scroll_timer=setInterval(function(){
						//console.log('scroll to');
						if(direction == 'next'){
							cont.each(function(){
								$(this).css({left: $(this).offset().left - interval});
							});
							thumb_repeater();
							
/*
							thumb_repeater();
							cont.stop().animate({left: cont.offset().left - 100}, 300, 'linear',function(){
								thumb_repeater();
							});
*/
							//cont.stop().animate({left: cont.offset().left - 100}, 1000, 'easeOutExpo');
							
						}else{
							cont.each(function(){
								$(this).css({left: $(this).offset().left + interval});
							});
							thumb_repeater();
							
/*
							thumb_repeater();
							cont.stop().animate({left: cont.offset().left + 100}, 300, 'linear',function(){
								thumb_repeater();
							});
*/
							//cont.stop().animate({left: cont.offset().left + 100}, 1000, 'easeOutExpo');
							
						}
					}, speed); //easeOutExpo : 100, linear : 180
				}
				function cont_scroll_stop(){
					//console.log('scroll stop');
					clearTimeout(scroll_timer);
				}
				
				$('.theatre_top .to_next').mousedown(function(){
					cont_scroll_stop();
					speed = 1;
					direction = 'next';
					interval = 5;
					cont_scroll_to();
				});
				$('.theatre_top .to_prev').mousedown(function(){
					cont_scroll_stop();
					speed = 1;
					direction = 'prev';
					interval = 5;
					cont_scroll_to();
				});
				
				$('.theatre_top .to_next').mouseup(function(){
					cont_scroll_stop();
					speed = 30;
					direction = 'next';
					interval = 1;
					cont_scroll_to();
				});
				$('.theatre_top .to_prev').mouseup(function(){
					cont_scroll_stop();
					speed = 30;
					direction = 'next';
					interval = 1;
					cont_scroll_to();
				});
				
				cont_scroll_stop();
				direction = 'next';
				cont_scroll_to();
			}
			
			//TOP : マウス位置による移動のパターン
/*
			function list_slider(){
				var ww , wh, ww_harf, cont = $('.thamb_character'), cont_w = cont.width(), base_pos, percent;
				//console.log('cont_w : ', cont_w);
				//console.log(cont.outerWidth());
				
				function update_size(){
					ww = $(window).width();
					wh = $(window).height();
					ww_harf = ww / 2;
					base_pos = -((cont_w - ww) / 2);
					percent = (cont_w / 2) / (ww / 2);
					
					//console.log('percent : ', percent);
				}
				
				$(window).resize(function(){
					update_size();
				});
				update_size();
				
				$('#theatre .contents').mousemove(function(e){
					//console.log('e.pageX : ', e.pageX);
					
					var interval = 0;
					
					if(e.pageX < ww_harf){
						console.log('中心より左');
						//console.log(Math.ceil((ww_harf - e.pageX) * percent));
						interval = base_pos + Math.ceil((ww_harf - e.pageX) * percent);
						
					}else{
						//console.log('中心より右');
						//console.log(Math.ceil((e.pageX - ww_harf) * percent));
						interval = base_pos - Math.ceil((e.pageX - ww_harf) * percent);
					}
					
					//cont.css({left: interval});
					//console.log('interval : ', interval);
					cont.stop().animate({left: interval}, 800, 'easeOutExpo');
				});
			}
*/
			
			
			/* Change Page */
			function change_page(){
				$('.contents').stop().css({display: 'block', opacity: 1});
				
				$(document).on('click', '.change_theatre_trigger', function(e){
					if(change_enable_flg){ //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<!!!!!!!!!!!!
						console.log('change THEATRE');
						
						change_enable_flg = false; //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<!!!!!!!!!!!!
						change_theatre_trigger_flg = true;
						
					  e.preventDefault();
						
						if(_model.url.replace(/\/theatre\//, '') == 'index.php' || _model.url.replace(/\/theatre\//, '') == ''){
							top_cont_pos_01 = $('#thamb_character_01').offset().left;
							top_cont_pos_02 = $('#thamb_character_02').offset().left;
						}
						
					  _model.url = $(this).attr('href');
						
						$('#loader').stop().css({display: 'block', opacity: 0}).animate({opacity:1},500,'easeOutExpo');
						$('.contents').stop().animate({opacity:0},500,'easeOutExpo',function(){
					    $.pjax({
					      url: _model.url,
					      container : '#change_contents',
					      fragment : '#change_contents',
					      timeout : 2000
					    });
						});
					
					}else{
						return false;
					}
				});
				
				$(document).on('pjax:error', function(){
				});
				$(document).on('pjax:timeout', function(){
				});
				$(document).on('pjax:popstate', function(){
					popstate_flg = true; //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<pppppppppppp
				});
				$(document).on('pjax:end', function(){
					if(!popstate_flg){ //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<pppppppppppp
						show_page();
					}else{ //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<pppppppppppp
						console.log('under popstateeeeeeeee');
						change_theatre_trigger_flg = true; //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<pppppppppppp
						popstate_flg = false; //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<pppppppppppp
						show_page();
					} //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<pppppppppppp
				});
				
			}
			
			function show_page(){
				if(_model.url.substring(1, 4) == 'the'){
					if(change_theatre_trigger_flg){
					  console.log('change THEATRE end');
					
						change_theatre_trigger_flg = false;
						
						_view.layout_fix_contents();
						$('.contents').stop().css({display: 'block', opacity: 0});
						
						thumb_hover();
						
						if(_model.url.replace(/\/theatre\//, '') == 'index.php'){
							list_slider();
						}
						
						setTimeout(function(){
							$('#loader').stop().animate({opacity: 0}, 800, 'easeOutExpo',function(){
								$(this).css({display: 'none'});
							});
							$('.contents').animate({opacity: 1}, 1000, 'easeOutExpo', function(){
								console.log('showed detaillllllllllllllllll'); //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<!!!!!!!!!!!!
								change_enable_flg = true; //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<!!!!!!!!!!!!
							});
						}, 500);
					}
				}
			}
			
			function thumb_hover(){
				if(_model.url.replace(/\/theatre\//, '') != 'index.php'){
					console.log('fade hoverrrrrrrrrrrrrrrrrrrrrrrr');
					$('#theatre .theatre_inner .btn_next img').css({display: 'inline', opacity: 0});
					$('#theatre .theatre_inner .btn_prev img').css({display: 'inline', opacity: 0});
					
					$('#theatre .theatre_inner .btn_next, #theatre .theatre_inner .btn_prev').hover(function(){
						$(this).find('img').stop().animate({opacity:1}, 500, 'easeOutExpo');
					}, function(){
						$(this).find('img').stop().animate({opacity:0}, 500, 'easeOutExpo');
					});
				}
			}
			
			change_page();
			thumb_hover();
			if(_model.url.replace(/\/theatre\//, '') == 'index.php' || _model.url.replace(/\/theatre\//, '') == ''){
				console.log('??????????????????? pjax end');
				list_slider();
			}
			
		} //the
		
	});

}
