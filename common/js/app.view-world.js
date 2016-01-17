/* VIEW WORLD
============================================================ */
var View_world = function(_model,_view,_controller){
	var _this = this, $this = $(_this), $model = $(_model), $view = $(_view), $controller = $(_controller), change_world_trigger_flg = false, change_enable_flg = false, popstate_flg = false;
	
	
	/* Showed Contents
	-------------------------------------------------- */
	$view.on(_view.dispatch_show_contents,function(){

		if(_model.url.substring(1, 4) == 'wor'){
			console.log('-------------------------------------- showed contents : World');
			$('body').removeClass('scroll_full');
			change_enable_flg = true; //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<!!!!!!!!!!!!
			
			/* Change Page */
			function change_page(){
				$('.contents').stop().css({display: 'block', opacity: 1});
				
				$(document).on('click', '.change_world_trigger', function(e){
					if(change_enable_flg){ //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<!!!!!!!!!!!!
						console.log('change World');
						
						change_enable_flg = false; //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<!!!!!!!!!!!!
						change_world_trigger_flg = true;
						
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
						change_world_trigger_flg = true; //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<pppppppppppp
						popstate_flg = false; //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<pppppppppppp
						show_page();
					} //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<pppppppppppp
				});
				
			}
			
			function show_page(){
				if(_model.url.substring(1, 4) == 'wor'){
					if(change_world_trigger_flg){
					  console.log('change World end');
					
						change_world_trigger_flg = false;
						
						_view.layout_fix_contents();
						$('.contents').stop().css({display: 'block', opacity: 0});
						if($('#island').length){image_overlay();}
						
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
			
			/* Image Overlay */
			function image_overlay(){
				$("a[rel=island_image]").fancybox({
					'padding' : 0,
					/* 'titleShow' : false, */
					'overlayColor' : '#000',
					'overlayOpacity' : 0.8,
					'showNavArrows' : true
					/*'showNavArrows' : false
,
					'cyclic' : true
*/
				});
			}
			
			if($('#island').length){image_overlay();}
			change_page();
			
		} //wor
		
	});
	
}
