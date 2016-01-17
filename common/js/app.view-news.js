/* VIEW NEWS
============================================================ */
var View_news = function(_model,_view,_controller){
	var _this = this, $this = $(_this), $model = $(_model), $view = $(_view), $controller = $(_controller), change_page_flg = false, change_news_trigger_flg = false, change_enable_flg = false, popstate_flg = false; //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<!!!!!!!!!!!!ppppppppp
	
	
	/* Showed Contents
	-------------------------------------------------- */
	$view.on(_view.dispatch_show_contents,function(){

		if(_model.url.substring(1, 4) == 'new' || _model.url.substring(1, 4) == 'pag'){
			console.log('-------------------------------------- showed contents : News');
	        $('body').addClass('scroll_full');
			//gapi.plusone.go();
			change_enable_flg = true; //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<!!!!!!!!!!!!
			
			$('.contents_l').stop().css({display: 'block'});
			
			
			function sns_update(){
				if($('.contents').find('.social_bookmark').length){
					if($('.detail_social_bookmark').length){
						if(!window.twttr){
							console.log('Not twitterrrrrrrrrrrrrrrrrrrrrrr');
							
						}else{
							console.log('twitterrrrrrrrrrrrrrrrrrrrrrr');
							var share_url = String(encodeURI(location.href));
							$('.twitter-share-button').attr('data-url', share_url);
							console.log('twitter再ロード');
							//$('.twitter-share-button').replaceWith('<a href="https://twitter.com/share" class="twitter-share-button" data-lang="ja" data-url="' + encodeURI(location.href) + '"  data-text="詳細ページ01" data-hashtags="ぐらぶる">ツイート</a>');
						}
					}
					
					FB.XFBML.parse(); //facebookアップデート
					gapi.plusone.go(); //Google+アップデート
					//※mixiはブラウザの戻る進むでイイネが増殖するらしい
				}
				
				twttr.widgets.load(); //twitterアップデート（サイドのタイムラインのアップデートも含む）
			}
			
			
			function change_page(){
				$(document).on('click', '.change_news_trigger', function(e){
					if(change_enable_flg){ //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<!!!!!!!!!!!!
						console.log('change page');
						
						change_enable_flg = false; //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<!!!!!!!!!!!!
						change_news_trigger_flg = true;
						
					  e.preventDefault();
						
						if($(this).attr('href').match(/http/)){
							console.log('フルパス');
							var domain = $(this).attr('href').match(/^https?:\/\/[^\/]+/),
									url = $(this).attr('href').replace(domain[0], '');
							_model.url = url;
						}else{
							console.log('ルート相対パス');
							 _model.url = $(this).attr('href');
						}
						console.log(_model.url);
						
						//$('#loader').stop().css({display: 'block', opacity: 0}).animate({opacity:1},500,'easeOutExpo');
						$('.contents_l').stop().animate({opacity:0},500,'easeOutExpo',function(){
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
						change_news_trigger_flg = true; //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<pppppppppppp
						popstate_flg = false; //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<pppppppppppp
						show_page();
					} //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<pppppppppppp
				});
			}
			
			function show_page(){
/*
				var domain = location.href.match(/^https?:\/\/[^\/]+/)[0],
						url = location.href.replace(domain, '');
				_model.url = url;
				console.log('urlllllllllllllllllllllllll : ', _model.url);
*/
				
				console.log('=================================================');
				console.log('_model.url : ', _model.url);
				console.log('change_news_trigger_flg : ', change_news_trigger_flg);
				
				
				if(_model.url.substring(1, 4) == 'new' || _model.url.substring(1, 4) == 'pag'){
					if(change_news_trigger_flg){
					  console.log('change NEWS end');
					
						change_news_trigger_flg = false;
					
						_view.layout_fix_contents();
						$('.contents_l').stop().css({display: 'block', opacity: 0});
						
						setTimeout(function(){ ///////////////////////////////////////////////////////////////////???????????
		/*
							$('#loader').stop().animate({opacity:0},800,'easeOutExpo',function(){
								$(this).css({display: 'none'});
							});
		*/
		
							scroll_fade_show();
							$('.contents_l').animate({opacity:1},800,'easeOutExpo', function(){ //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<fffffffffffff
								console.log('showed detaillllllllllllllllll'); //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<!!!!!!!!!!!!
								sns_update();
								change_enable_flg = true; //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<!!!!!!!!!!!!
							});
						}, 500);
					}
				}
			}
			
			
			/* Scroll Fade Show（コンテンツをスクロールで順に表示） */
			function scroll_fade_show(){
				var $box = $('.scroll_show_box'), fade_view_init = true;
				
				//$box.prev('.loader').remove();
				//$box.before('<div class="loader"></div>');
				$box.css({display: 'block', opacity: 0});
				
				function update(){
					
					var show_line = ($('.contents').offset().top + $('.contents').height());// + $('.contents').scrollTop();
					
					$box.each(function(i){
						if($(this).css('opacity') == 0){
							if(Math.floor($(this).offset().top) <= show_line){
								var target_num = i;
								//setTimeout(function(){ //setTimeout内の$(this)はwindowになってしまう
									//$box.eq(target_num).prev('.loader').remove();
									$box.eq(target_num).delay(500).animate({opacity: 1}, 500);
								//}, 500);
							}
						}
						
						i++;
					});
				}
				
				$('.contents').scroll(function(){
					update();
				});
				
				$(window).resize(function(){
					update();
				});
				
				update();
			}
			
			
			sns_update();
			change_page();
			scroll_fade_show();
			
		} //new
		
	});
	
}
