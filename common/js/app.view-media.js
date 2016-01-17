/* VIEW MEDIA
============================================================ */
var View_media = function(_model,_view,_controller){
	var _this = this, $this = $(_this), $model = $(_model), $view = $(_view), $controller = $(_controller);
	
	
	/* Showed Contents
	-------------------------------------------------- */
	$view.on(_view.dispatch_show_contents,function(){

		if(_model.url.substring(1, 4) == 'med'){
			console.log('-------------------------------------- showed contents : Media');
	        $('body').addClass('scroll_full');
			
			$('.game_links_tab').find('a').click(function(){
				console.log('click');
				console.log(Number($('.contents_l').css('left').replace(/px/, '')));
				if(Number($('.contents_l').css('left').replace(/px/, '')) < 0){
					$(this).css({backgroundPosition: 'left bottom'});
					$('.contents_l').stop().animate({left: 0},500,'easeOutExpo');
				}else{
					$(this).css({backgroundPosition: 'left top'});
					$('.contents_l').stop().animate({left: -224},500,'easeOutExpo');
				}
			});
			
			if($(window).width() <= 768){
				$('.game_links_tab').find('a').css({backgroundPosition: 'left bottom'});
				$('.contents_l').stop().css({left: 0});
			}
			
			$(window).resize(function(){
				if($(window).width() >= 1000){
					$('.contents_l').css({left: '50%'});
				}else{
					$('.contents_l').css({left: '-224px'});
				}
			});
			
		}
		
	});
	
}
