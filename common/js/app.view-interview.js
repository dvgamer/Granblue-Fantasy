/* VIEW INTERVIEW
============================================================ */
var View_interview = function(_model,_view,_controller){
	var _this = this, $this = $(_this), $model = $(_model), $view = $(_view), $controller = $(_controller), change_interview_trigger_flg = false, change_enable_flg = false, popstate_flg = false;
	
	
	/* Showed Contents
	-------------------------------------------------- */
	$view.on(_view.dispatch_show_contents,function(){

		if(_model.url.substring(1, 4) == 'int'){
			console.log('-------------------------------------- showed contents : Interview');
			$('body').removeClass('scroll_full');
			change_enable_flg = true; //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<!!!!!!!!!!!!
			
			/* Change Page */
			function change_page(){
				$('.contents').stop().css({display: 'block', opacity: 1});
				
				$(document).on('click', '.change_interview_trigger', function(e){
					if(change_enable_flg){ //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<!!!!!!!!!!!!
						console.log('change Interview');
						
						change_enable_flg = false; //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<!!!!!!!!!!!!
						change_interview_trigger_flg = true;
						
					  e.preventDefault();
						
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
						change_interview_trigger_flg = true; //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<pppppppppppp
						popstate_flg = false; //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<pppppppppppp
						show_page();
					} //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<pppppppppppp
				});
				
			}
			
			function show_page(){
				if(_model.url.substring(1, 4) == 'int'){
					if(change_interview_trigger_flg){
					  console.log('change Interview end');
						
						change_interview_trigger_flg = false;
						
						_view.layout_fix_contents();
						$('.contents').stop().css({display: 'block', opacity: 0});
						
						thumb_hover();
						
						setTimeout(function(){
							$('#loader').stop().animate({opacity:0},800,'easeOutExpo',function(){
								$(this).css({display: 'none'});
							});
							$('.contents').animate({opacity:1},1000,'easeOutExpo', function(){
								console.log('showed detaillllllllllllllllll'); //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<!!!!!!!!!!!!
								change_enable_flg = true; //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<!!!!!!!!!!!!
							});
						}, 500);
					}
				}
			}
			
			function thumb_hover(){
				$('#interview .btn_next img').css({display: 'inline', opacity: 0});
				$('#interview .btn_prev img').css({display: 'inline', opacity: 0});
				
				$('#interview .btn_next, #interview .btn_prev').hover(function(){
					$(this).find('img').stop().animate({opacity:1}, 500, 'easeOutExpo');
				}, function(){
					$(this).find('img').stop().animate({opacity:0}, 500, 'easeOutExpo');
				});
			}
			
			thumb_hover();
			change_page();
			
		} //wor
		
	});
	
}
