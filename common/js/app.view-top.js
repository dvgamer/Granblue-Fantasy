/* VIEW TOP
============================================================ */
var View_top = function(_model,_view,_controller){
	var _this = this, $this = $(_this), $model = $(_model), $view = $(_view), $controller = $(_controller);
	
	
	/* Showed Contents フェードインが始まるタイミングにdispatch
	-------------------------------------------------- */
	$view.on(_view.dispatch_show_contents,function(){


		if(_model.url == '/' || _model.url == '/index.php'){
			console.log('-------------------------------------- showed contents : Top');
			$('body').removeClass('scroll_full');

$('#top_news_list').mCustomScrollbar({
  mouseWheel : true,
  mouseWheelPixels:'auto',
  advanced:{
    updateOnContentResize: true,
  }
});

			function links_slide(){
				if(Number($('#links_content').css('left').replace(/px/, '')) < 0){
					$('#links_content').find('.tab a').css({backgroundPosition: 'left bottom'});
					$('#links_content').stop().animate({left: -0},500,'easeOutExpo');
				}else{
					$('#links_content').find('.tab a').css({backgroundPosition: 'left top'});
					$('#links_content').stop().animate({left: -426},500,'easeOutExpo');
				}
			}
			$('#links_content').find('.tab a').click(function(){
				links_slide();
			});
			
			function news_slide(){
				if(Number($('#news_content').css('right').replace(/px/, '')) < 0){
					$('#news_content').find('.tab a').css({backgroundPosition: 'left top'});
					$('#news_content').stop().animate({right: 0},500,'easeOutExpo');
				}else{
					$('#news_content').find('.tab a').css({backgroundPosition: 'left bottom'});
					$('#news_content').stop().animate({right: -410},500,'easeOutExpo');
				}
			}
			$('#news_content').find('.tab a').click(function(){
				news_slide();
			});
			
			/* Movie Overlay */

			$(".to_movie a").fancybox({
				autoSize: false,
        width: '90%',
        height: '90%'
			});

			
			$(".to_movie a").fancybox({
				'padding' : 0,
				'overlayColor' : '#000',
				'overlayOpacity' : 0.5,
				'type' : 'iframe',
				'onComplete' : function(){console.log('comp'); _model.bgm.pause();},
				'onClosed' : function(){console.log('close'); _model.bgm.resume();}
			});
			

			$('#links_content').find('.tab a').css({backgroundPosition: 'left top'});
			$('#links_content').stop().delay(300).animate({right: 0},500,'easeOutExpo');
			$('#news_content').find('.tab a').css({backgroundPosition: 'left top'});
			$('#news_content').stop().delay(400).animate({right: 0},500,'easeOutExpo');

			if(_model._browser == 'tab'){
				links_slide();
				news_slide();
			}else{
				setTimeout(function(){
					links_slide();
				},3000);
			}

		}
	});
}
