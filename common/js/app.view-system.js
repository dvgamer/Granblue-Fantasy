/* VIEW SYSTEM
============================================================ */
var View_system = function(_model,_view,_controller){
	var _this = this, $this = $(_this), $model = $(_model), $view = $(_view), $controller = $(_controller), change_system_trigger_flg = false, change_enable_flg = false, popstate_flg = false;
	
	
	/* Showed Contents
	-------------------------------------------------- */
	$view.on(_view.dispatch_show_contents,function(){
		if(_model.url.substring(1, 4) == 'sys'){
			console.log('-------------------------------------- showed contents : System');
			change_enable_flg = true; //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<!!!!!!!!!!!!
			
			/* Change Page */
			function change_page(){
				$('.contents').stop().css({display: 'block', opacity: 1});
				
				$(document).on('click', '.change_system_trigger', function(e){
					if(change_enable_flg){ //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<!!!!!!!!!!!!
						console.log('change System');
						
						change_enable_flg = false; //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<!!!!!!!!!!!!
						change_system_trigger_flg = true;
						
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
						change_system_trigger_flg = true; //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<pppppppppppp
						popstate_flg = false; //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<pppppppppppp
						show_page();
					} //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<pppppppppppp
				});
			}
			
			function show_page(){
				if(_model.url.substring(1, 4) == 'sys'){
					if(change_system_trigger_flg){
					  console.log('change System end');
					
						change_system_trigger_flg = false;

            _view.layout_fix_contents();
						$('.contents').stop().css({display: 'block', opacity: 0});
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
thumb_hover();
thumb_slider();
			}

			function thumb_hover(){
				if(_model.url.replace(/\/system\//, '') != 'index.php'){
					console.log('fade hoverrrrrrrrrrrrrrrrrrrrrrrr');
					$('#system .btn_next img').css({display: 'inline', opacity: 0});
					$('#system .btn_prev img').css({display: 'inline', opacity: 0});
					
					$('#system .btn_next, #system .btn_prev').hover(function(){
						$(this).find('img').stop().animate({opacity:1}, 500, 'easeOutExpo');
					}, function(){
						$(this).find('img').stop().animate({opacity:0}, 500, 'easeOutExpo');
					});
				}
			}

      function thumb_slider(){
        if(_model.url.replace(/\/system\//, '') == 'job.php'){
if($(window).width() < 1001) {
          winW = $(window).width();
          var pos = $( "#job_index_select_1" ).position();
          currentPos = pos.left;
          console.log('thumb Sliderrrrrrrrrrrrr：'+currentPos);

          $('#slide_right').click(function(){
            var pos = $( "#job_index_select_1" ).position();
            currentPos = pos.left;
            var slide_num = $('.contents_inner').width();
            var slide_obj = $('#job_index_select_1').width();
            var slide_num_little = slide_num - (slide_num % 143);

            var slide_yet = slide_obj - slide_num + currentPos;

            console.log('slide_yet：'+currentPos);

            if(slide_yet > slide_num) {
              if(slide_num % 143 == 0) {
                $('#job_index_select_1').animate({'left':'-='+slide_num+'px'}, 2500, 'easeOutExpo');
                $('#slide_left').show();
                $('#slide_right').show();
              } else {
                $('#job_index_select_1').animate({'left':'-='+slide_num_little +'px'}, 2500, 'easeOutExpo');
                $('#slide_left').show();
                $('#slide_right').show();
              }
            } else if(slide_yet == slide_num) {
              $('#job_index_select_1').animate({'left':'-='+slide_num+'px'}, 2500, 'easeOutExpo');
              $('#slide_left').show();
              $('#slide_right').hide();
            } else if(slide_yet < slide_num) {
              $('#job_index_select_1').animate({'left':'-='+slide_yet+'px'}, 2500, 'easeOutExpo');
              $('#slide_left').show();
              $('#slide_right').hide();
            }
          });

          $('#slide_left').click(function(){
            var pos = $( "#job_index_select_1" ).position();
            currentPos = pos.left;
            var slide_num = $('.contents_inner').width();
            var slide_obj = $('#job_index_select_1').width();
            var slide_num_little = slide_num - (slide_num % 143);

            var slide_yet = -(currentPos);

            if(slide_yet > slide_num) {
              if(slide_num % 143 == 0) {
                $('#job_index_select_1').animate({'left':'+='+slide_num+'px'}, 2500, 'easeOutExpo');
                $('#slide_left').show();
                $('#slide_right').show();
              } else {
                $('#job_index_select_1').animate({'left':'+='+slide_num_little+'px'}, 2500, 'easeOutExpo');
                $('#slide_left').show();
                $('#slide_right').show();
              }
            } else if(slide_yet == slide_num) {
              $('#job_index_select_1').animate({'left':'+='+slide_num+'px'}, 2500, 'easeOutExpo');
              $('#slide_left').hide();
              $('#slide_right').show();
            } else if(slide_yet < slide_num) {
              $('#job_index_select_1').animate({'left':'+='+slide_yet+'px'}, 2500, 'easeOutExpo');
              $('#slide_left').hide();
              $('#slide_right').show();
            }

          });
        }
}
      }
			thumb_hover();
      thumb_slider();
			change_page();
		} //sys
		
	});
	
}
