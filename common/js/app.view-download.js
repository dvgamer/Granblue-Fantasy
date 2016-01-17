/* VIEW DOWNLOAD
============================================================ */
var View_download = function(_model,_view,_controller){
	var _this = this, $this = $(_this), $model = $(_model), $view = $(_view), $controller = $(_controller);
	
	
	/* Showed Contents
	-------------------------------------------------- */
	$view.on(_view.dispatch_show_contents,function(){

		if(_model.url.substring(1, 4) == 'dow'){
			console.log('-------------------------------------- showed contents : Download');
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

//タブ切り替え
      $(function(){
        var handler = $('ul#dl_tab_select li a');
        var url = document.URL;
        var urlId = url.substr(url.lastIndexOf('#'));
        var urlIdJudgment = urlId.lastIndexOf('#');
        $('ul#dl_tab_select').each(function(){
          $('#tab-box > .tabBox:first').show();
          var imgSrc = $('ul#dl_tab_select li:first img').attr('src');
          var imgDot = imgSrc.lastIndexOf('.');
          var onSrc = imgSrc.substr(0, imgDot) + '_ac' + imgSrc.substr(imgDot, 4);
          $('ul#dl_tab_select li:first img').attr('src',onSrc).addClass('tab-on');
        });

        // クリック時の動作
        handler.click(function() {
          // クリックしたタブ画像をオンの状態に
          var imgSrc = $(this).children('img').attr('src').replace(/_on/g, "");
          var imgDot = imgSrc.lastIndexOf('.');
          var onSrc = imgSrc.substr(0, imgDot) + '_ac' + imgSrc.substr(imgDot, 4);
          $(this).children('img').attr('src',onSrc);
          // タブ画像の切り替え
          var imgOff = $('ul#dl_tab_select li img.tab-on').attr('src').replace(/_ac/g, "");
          $('ul#dl_tab_select li img.tab-on').attr('src',imgOff);
          $('ul#dl_tab_select li img').removeClass('tab-on');
          $(this).children('img').addClass('tab-on');
          // コンテンツの切り替え
          var clickAttr = $(this).attr('href');
          var showAttr = '#' + $('#tab-box > .tabBox:visible').attr('id');
          if(clickAttr !== showAttr) {
            $('#tab-box > .tabBox:visible').hide();
            var showDiv = '#tab-box .tabBox' + clickAttr;
            $(showDiv).show();
            return false;
          } else {
            // 何度もクリックした場合もタブ画像をオンの状態に
            var imgSrc = $(this).children('img').attr('src').replace(/_ac/g, "");
            var imgDot = imgSrc.lastIndexOf('.');
            var onSrc = imgSrc.substr(0, imgDot) + '_ac' + imgSrc.substr(imgDot, 4);
            $(this).children('img').attr('src',onSrc);
            return false;
          }
        })

        // ロールオーバー
        handler.hover(function() {
          var classJudgment = $(this).children('img').attr('class');
          if(classJudgment != 'tab-on') {
            var imgSrc = $(this).children('img').attr('src');
            var imgDot = imgSrc.lastIndexOf('.');
            var onSrc = imgSrc.substr(0, imgDot) + '_on' + imgSrc.substr(imgDot, 4);
            $(this).children('img').attr('src',onSrc);
          }
        }, function() {
          var classJudgment = $(this).children('img').attr('class');
          if(classJudgment != 'tab-on') {
            var imgOff = $(this).children('img').attr('src').replace(/_on/g, "");
            $(this).children('img').attr('src',imgOff);
          }
        });

        // 直接タブを表示
        if(!urlIdJudgment) handler.filter("[href='" + urlId + "']").click();

      });
			
		}
		
	});
	
}
