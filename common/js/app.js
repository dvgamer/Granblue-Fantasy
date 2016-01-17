if(typeof(window.console) == "undefined"){console = {}; console.log = console.warn = console.error = function(a){};}


/* Animation Background
============================================================ */
var create_animation_bg = function(_model){
	/* ver SWF
	-------------------------------------------------- */
	if(_model._browser == 'firefox' || _model._browser == 'ie8' || _model._browser == 'ie9' || _model._browser == 'ie10'){
		$('#init_loader #percent').css({display: 'none'});
		$('#animation_bg').replaceWith('<div id="animation_bg"><div id="embed_area"></div></div>');
		$('#animation_bg').width(1920).height(1080);

    var playerVersion = swfobject.getFlashPlayerVersion();
    var fver = playerVersion.major + "." + playerVersion.minor;

    if(fver == 0) {
		  $('#copyright').after('<div id="getflash_area" class="clearfix"><a href="http://www.adobe.com/go/getflash" target="_blank" class="getflash"><img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif"></a></div>');
    } else {
      if(Number(fver) >= 12.0) {

      } else {
  		  $('#copyright').after('<div id="getflash_area" class="clearfix"><a href="http://www.adobe.com/go/getflash" target="_blank" class="getflash"><img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.png"></a><p>FlashPlayerを最新版にアップデートしてください。<br>' + 'Flash Player version is ' + fver + '</p></div>');
      }
    }

		var flashvars={},params={},attributes={};
		params.scale="noscale"; params.wmode="transparent"; params.allowfullscreen="true"; params.allowscriptaccess="always";
		attributes.id="embed_area";
		swfobject.embedSWF("/common/createjs.animation_bg/animation_bg.swf","embed_area","100%","100%","11.4.0",false,flashvars,params,attributes);
		
		_model.animation_bg_loaded();
	
	/* ver CreateJS (Flash Toolkit for CreateJS)
	-------------------------------------------------- */
	}else{
		var canvas, stage, exportRoot, progressbar_init_pos = 0, over_flg_01 = true, over_flg_02 = true, over_flg_03 = true, over_flg_04 = true;
		
		function init() {
			canvas = document.getElementById("animation_bg");
			images = images||{};
			
			var manifest = [
				{src:"/common/createjs.animation_bg/images/_010_3_1.png", id:"_010_3_1"},
				{src:"/common/createjs.animation_bg/images/_010_3_2.png", id:"_010_3_2"},
				{src:"/common/createjs.animation_bg/images/_012_3.png", id:"_012_3"},
				{src:"/common/createjs.animation_bg/images/_015_3.png", id:"_015_3"},
				{src:"/common/createjs.animation_bg/images/_018_3.png", id:"_018_3"},
				{src:"/common/createjs.animation_bg/images/_020_3_1.png", id:"_020_3_1"},
				{src:"/common/createjs.animation_bg/images/_020_3_2.png", id:"_020_3_2"},
				{src:"/common/createjs.animation_bg/images/_025_3.png", id:"_025_3"},
				{src:"/common/createjs.animation_bg/images/_025_3_2.png", id:"_025_3_2"},
				{src:"/common/createjs.animation_bg/images/_045_3_by.png", id:"_045_3_by"},
				{src:"/common/createjs.animation_bg/images/_060_3.png", id:"_060_3"},
				{src:"/common/createjs.animation_bg/images/_240_3.png", id:"_240_3"},
/*				{src:"/common/createjs.animation_bg/images/_2hane_3_01.png", id:"_2hane_3_01"},
				{src:"/common/createjs.animation_bg/images/_2hane_3_02.png", id:"_2hane_3_02"},
				{src:"/common/createjs.animation_bg/images/_2hane_3_03.png", id:"_2hane_3_03"},
				{src:"/common/createjs.animation_bg/images/_2hane_3_04.png", id:"_2hane_3_04"},
				{src:"/common/createjs.animation_bg/images/_2hane_3_05.png", id:"_2hane_3_05"},
				{src:"/common/createjs.animation_bg/images/_2hane_3_06.png", id:"_2hane_3_06"},
				{src:"/common/createjs.animation_bg/images/_2hane_3_07.png", id:"_2hane_3_07"},
				{src:"/common/createjs.animation_bg/images/_2hane_3_08.png", id:"_2hane_3_08"},
				{src:"/common/createjs.animation_bg/images/_6hane_3_01.png", id:"_6hane_3_01"},
				{src:"/common/createjs.animation_bg/images/_6hane_3_02.png", id:"_6hane_3_02"},
				{src:"/common/createjs.animation_bg/images/_6hane_3_03.png", id:"_6hane_3_03"},
				{src:"/common/createjs.animation_bg/images/_6hane_3_04.png", id:"_6hane_3_04"},*/
				{src:"/common/createjs.animation_bg/images/bg_2256.jpg", id:"bg_2256"},
				{src:"/common/createjs.animation_bg/images/front_cloud_3_by2.png", id:"front_cloud_3_by2"},
				{src:"/common/createjs.animation_bg/images/hikoutei_01_3.png", id:"hikoutei_01_3"},
/*				{src:"/common/createjs.animation_bg/images/hikoutei_02_3.png", id:"hikoutei_02_3"},
				{src:"/common/createjs.animation_bg/images/hikoutei_03_3.png", id:"hikoutei_03_3"},
				{src:"/common/createjs.animation_bg/images/hikoutei_04_3.png", id:"hikoutei_04_3"},
				{src:"/common/createjs.animation_bg/images/hikoutei_05_3.png", id:"hikoutei_05_3"},
				{src:"/common/createjs.animation_bg/images/hikoutei_06_3.png", id:"hikoutei_06_3"},
				{src:"/common/createjs.animation_bg/images/hikoutei_spec_3.png", id:"hikoutei_spec_3"},*/
				{src:"/common/createjs.animation_bg/images/island_01_3.png", id:"island_01_3"},
				{src:"/common/createjs.animation_bg/images/island_02_3.png", id:"island_02_3"},
				{src:"/common/createjs.animation_bg/images/island_03_3.png", id:"island_03_3"},
				{src:"/common/createjs.animation_bg/images/riku_chudan_3.png", id:"riku_chudan_3"},
				{src:"/common/createjs.animation_bg/images/riku_chudan_s_3.png", id:"riku_chudan_s_3"},
				{src:"/common/createjs.animation_bg/images/riku_gedan_3.png", id:"riku_gedan_3"},
				{src:"/common/createjs.animation_bg/images/riku_gedan_s_3.png", id:"riku_gedan_s_3"},
				{src:"/common/createjs.animation_bg/images/riku_jodan_3.png", id:"riku_jodan_3"},
				{src:"/common/createjs.animation_bg/images/riku_jodan_s_3.png", id:"riku_jodan_s_3"},
				{src:"/common/createjs.animation_bg/images/shibuki.png", id:"shibuki"}
			];
			
			//progressbar_init_pos = Number($('#init_loader').find('#progressbar img').css('left').replace(/px/, ''));
			
			var loader = new createjs.LoadQueue(false);
			loader.setMaxConnections(5);
			loader.addEventListener("progress", load_progress);
			loader.addEventListener("fileload", handleFileLoad);
			loader.addEventListener("complete", handleComplete);
			loader.loadManifest(manifest);
		}
		
		function load_progress(e) {
			//横からバージョン
	/*
			var percent = Math.ceil(e.progress * 100),
					$progressbar = $('#init_loader').find('#progressbar img'),
					loaded_bar = Math.ceil(($progressbar.width() / 100) * percent),
					progressbar_pos = progressbar_init_pos + loaded_bar;
					
			$progressbar.css({left: progressbar_pos});
	*/
			
			
			//中央からバージョン
			var percent = Math.ceil(e.progress * 100),
					$progressbar = $('#init_loader').find('#progressbar img'),
					w = Math.ceil(($progressbar.attr('width') / 100) * percent),
					h = Math.ceil(($progressbar.attr('height') / 100) * percent),
					pos_left = -((($progressbar.attr('width') / 2) / 100) * percent),
					pos_top = -((($progressbar.attr('height') / 2) / 100) * percent);
					
			if(percent < 30){
				if(over_flg_01){
					over_flg_01 = false;
					$progressbar.stop().animate({
						width: w,
						height: h,
						marginLeft: pos_left,
						marginTop: pos_top
					},0,'easeInQuart');
				}
				
			}else if(percent > 30 && percent < 60){
				if(over_flg_02){
					over_flg_02 = false;
					$progressbar.stop().animate({
						width: w,
						height: h,
						marginLeft: pos_left,
						marginTop: pos_top
					},0,'easeInQuart');
				}
				
			}else if(percent > 60 && percent < 100){
				if(over_flg_03){
					over_flg_03 = false;
					$progressbar.stop().animate({
						width: w,
						height: h,
						marginLeft: pos_left,
						marginTop: pos_top
					},0,'easeInQuart');
				}
			}else if(percent == 100){
				$progressbar.stop().animate({
					width: w,
					height: h,
					marginLeft: pos_left,
					marginTop: pos_top
				},300,'easeInQuart',function(){
					$progressbar.stop().delay(500).animate({opacity:0}, 1000, 'easeOutQuart');
					$('#init_loader').stop().delay(500).animate({opacity:0}, 1000, 'easeOutQuart');
				});
			}
			
			
			$('#init_loader').find('#percent').find('span').html(percent);
		}
		
		function handleFileLoad(e) {
			if (e.item.type == "image") { images[e.item.id] = e.result; }
			
			//if (o.type == "image") { images[o.id] = o.result; }
		}
		
		function handleComplete() {
			//////////////////////////////////////////////////////////////////////////////////cjs差替え修正箇所↓↓↓
			exportRoot = new lib.top_1129_1920();
			//////////////////////////////////////////////////////////////////////////////////cjs差替え修正箇所
		
			stage = new createjs.Stage(canvas);
			stage.addChild(exportRoot);
			stage.update();
		
			createjs.Ticker.setFPS(30);
			createjs.Ticker.addEventListener("tick", stage);
			
			setTimeout(function(){
				_model.animation_bg_loaded();
			}, 500);
		}
		
		init();
		
	} //else end (Not SWF)
}


/* BGM : CreateJS
============================================================ */
var create_bgm = function(_model){
	if(_model._browser == 'ie8'){
		_model.bgm_loaded();
		
	}else{
		var loader;
		
		function initialize(){
			var manifest = [{'src': '/common/sound/opening_64kbps.mp3', 'id': 'bgm'}];
			loader = new createjs.LoadQueue(false);
			loader.installPlugin(createjs.Sound);
			loader.addEventListener("fileload", sound_loaded);
			loader.addEventListener("error", sound_load_error);
			loader.addEventListener("complete", sound_load_comp);
			loader.loadManifest(manifest);
		}
		
		function sound_loaded(e){
			//console.log(e.item);
			//console.log(e.item.id);
			//console.log(e.item.type);
			//_model.bgm = createjs.Sound.createInstance(e.item.id);
			//_model.bgm_loaded();
		}
		
		function sound_load_error(e){
			console.log('sound load error : ',e.item);
		}
		
		function sound_load_comp(e){
			//createjs.Sound.play("bgm");
			_model.bgm = createjs.Sound.createInstance('bgm');
            //_model.bgm2 = createjs.Sound.createInstance('bgm');//maeno
			_model.bgm_loaded();
			//alert(e.item); //e: Event[type=complete]
			//alert(_model.bgm_loaded()); /* alertしないと走らないしunderfind */
			//alert(_model.bgm_loaded() == null);
			//_model.bgm = createjs.Sound.createInstance(e.item.id);
			//alert(_model.bgm); /* 認識されてない */
			//_model.bgm_loaded();
		}
		
		initialize();
	} //else end (Not ie8)
}
/*VOICE:maeno
============================================================ */
var create_voice = function(c_name){
	var mute_bgm = 4; //BGMを下げる割合を整数で
	var min_voice = 0.3 ;//voiceの最低音量を0から1で
	var org_vol = voice_this.bgm.getVolume();
	if( voice_this.voice_on == 0){
		//var org_vol = voice_this.bgm.getVolume();
		//var org_vol = voice_this.bgm.getVolume();
		voice_this.bgm.setVolume( org_vol / mute_bgm );
		if( org_vol > min_voice){
			voice_vol = org_vol;
		}else{
			voice_vol = min_voice;
		}
		if(voice_this._browser == 'ie8'){
			//voice_this.bgm_loaded();
		}else{
			var loader;
			var randum_of_1to4 = function(){
				Math.ceil(  Math.random() * 4 );
				if(voice_this.voice_num != 4){
					voice_this.voice_num ++;
					console.log( "voice_if : %s" , voice_this.voice_num);
				}else{
					voice_this.voice_num = 1;
					console.log( "voice_if : %s" , voice_this.voice_num);
				};
				return voice_this.voice_num  ;
				console.log( "voice_num : %s" , voice_this.voice_num);
			}
			var src_path ="/common/sound/voice/"+ c_name + "_0" + randum_of_1to4() + ".mp3";

			function initialize(){
				var manifest = [{'src': src_path , 'id': 'voice'}];
				loader = new createjs.LoadQueue(false);
				loader.installPlugin(createjs.Sound);
				loader.addEventListener("fileload", sound_loaded);
				loader.addEventListener("error", sound_load_error);
				loader.addEventListener("complete", sound_load_comp);
				loader.loadManifest(manifest);
				voice_this.voice_on = 1 ;
			}
		}
		
		function sound_loaded(e){
		}
		
		function sound_load_error(e){
			console.log('sound load error : ',e.item);
		}
		
		function sound_load_comp(e){
			voice_this.voice = createjs.Sound.createInstance('voice');
			voice_this.voice.play("none",0,0,0,voice_vol,0);
			voice_this.voice.addEventListener("complete", voice_fin);
			/*
		 * playの補足
		 * 【 example.play("none",0,0,0,1,0); 】
		 *		※以下引数
		 *			interrupt = "割り込み再生を許すかどうか(?)"
		 *			delay  = "再生を遅らせる。msで指定"
		 *			offset  = "再生位置を指定。msで指定"
		 *			loop   = "ループ回数。-1を指定すると無限ループ"
		 *			volume  = "音量を指定"
		 *			pan   = "左右のどちらに音を振るか(HTML Audioでは動かない?"
		 */
		}
		function voice_fin(){
			voice_this.voice_on = 0;
			voice_this.bgm.setVolume( org_vol );
			console.log( "voice_fin : %s" , voice_this.voice_on);
		}
			
			initialize();
	}else{
		voice_this.voice_on = 0;
		voice_this.voice.stop();
		voice_this.bgm.setVolume( org_vol * mute_bgm   );
		console.log( "voice_click_fin : %s" , voice_this.voice_on);
	}
}
//$( '.img_chara detail_chara_07' ).click( create_voice("vee") );
/* MODEL
============================================================ */
var Model = function(){
	var _this = this, $this = $(_this);
	_this._browser = 'pc'; _this.init_app_flg = true; _this.bgm; _this.url = ''; _this.contents = ''; _this.dispatch_initialize = 'initialize'; _this.dispatch_loaded_contents = 'loaded_contents'; _this.change_contents_flg = false; _this.load_contents_flg = '';
	
	(function(){ //Constructor
		var ua = navigator.userAgent;
		
		if(ua.indexOf('iPad') > 0){
			_this._browser = 'tab';
		}else if(ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0){
			_this._browser = 'sp';
		}else if(ua.indexOf('Safari') > 0){
			_this._browser = 'safari';
		}
		
		if(ua.indexOf('Android') > 0){
			_this._browser = 'tab';
		}
		if(ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0){
			_this._browser = 'sp';
		}
		
		if(ua.indexOf('Chrome') > 0){
			_this._browser = 'chrome';
		}
		
		if(ua.indexOf('Firefox') > 0){
			_this._browser = 'firefox';
		}
		
		if(ua.indexOf('MSIE') > 0){
			_this._browser = 'ie';

			if(ua.indexOf('MSIE 10') >= 0){
				_this._browser = 'ie10';
			}			
			if(ua.indexOf('MSIE 9') >= 0){
				_this._browser = 'ie9';
			}
			if(ua.indexOf('MSIE 8') >= 0){
				_this._browser = 'ie8';
			}
		}
	})();
	
	
	/* Initialize 
	-------------------------------------------------- */
	_this.init_app = function(){ //Init
		create_bgm(_this);
	}
	
	_this.bgm_loaded = function(){ //Init
		create_animation_bg(_this);
		_this.set_voice();//キャラクタvoice　maeno
	}
	
	_this.animation_bg_loaded = function(){ //Init
		$this.trigger(_this.dispatch_initialize);
	}
	_this.set_voice = function(){//キャラクタvoice　maeno
		console.log('voice set');
		$( '#play_voice_02' ).click( function(){create_voice("cv_2")});
		$( '#play_voice_05' ).click( function(){create_voice("cv_5")});
		$( '#play_voice_07' ).click( function(){create_voice("cv_7")});
		$( '#play_voice_13' ).click( function(){create_voice("cv_13")});
		$( '#play_voice_18' ).click( function(){create_voice("cv_18")});
		$( '#play_voice_24' ).click( function(){create_voice("cv_24")});
		$( '#play_voice_28' ).click( function(){create_voice("cv_28")});
	}
	
	
	/* Load Contents
	-------------------------------------------------- */
	_this.load_contents = function(){
    $.pjax({
      url: _this.url,
      container : '#change_contents',
      fragment : '#change_contents',
      timeout : 2000
    });
	}
	$(document).on('pjax:error', function(){
	  console.log('contents error');
		_this.load_contents_flg = 'error';
		$this.trigger(_this.dispatch_loaded_contents);
	});
	$(document).on('pjax:timeout', function(){
	  console.log('contents timeout');
		_this.load_contents_flg = 'timeout';
		$this.trigger(_this.dispatch_loaded_contents);
	});
	$(document).on('pjax:popstate', function(){
	  console.log('contents popstate');
		_this.load_contents_flg = 'popstate';
		$this.trigger(_this.dispatch_loaded_contents);
	});
	$(document).on('pjax:end', function(){
	  console.log('load contents end');
		voice_this.voice_num = 0 ;//voice_num_maeno
		ga('set', 'location', window.location.href);
    ga('send', 'pageview');
		_this.load_contents_flg = 'end';
		$this.trigger(_this.dispatch_loaded_contents);
		_this.set_voice();//キャラクタvoice　maeno
	});
	voice_this = _this;//voice用グローバルオブジェクトmaeno
	voice_this.voice_on = 0 ;//voice用再生フラグmaeno
	voice_this.voice_num = 0 ;//voice_nummaeno
}



/* VIEW
============================================================ */
var View = function(_model,_controller){
	var _this = this, $this = $(_this), $model = $(_model), $controller = $(_controller), popstate_flg = false, hide_title_flg = false, hide_contents_flg = false, preurl = '', change_enable_flg = false;
	_this.dispatch_show_contents = 'show_contents'; _this.displayed_title_flg = false; _this.loaded_contents_flg = false;

	(function(){ //Constructor
		var view_top = null, //[app.view-top.js]
				view_news = null, //[app.view-news.js]
				view_world = null, //[app.view-world.js]
				view_system = null, //[app.view-system.js]
				view_theatre = null, //[app.view-theatre.js]
				view_interview = null, //[app.view-interview.js]
				view_media = null; //[app.view-media.js]
				view_download = null; //[app.view-download.js]
	})();
	
	
	/* Initialize
	-------------------------------------------------- */
	$model.on(_model.dispatch_initialize,function(){
		protect_img();

//荒川追記・IE9ではロードの瞬間にコンテンツのY位置を調整
if(_model._browser == 'ie8' || _model._browser == 'ie9') {
  _this.layout_fix_contents();
}
//荒川追記ここまで
		
		$(window).resize(function(){
			sizeupdate_animation_bg();
		});
		sizeupdate_animation_bg();
		set_volume();
		set_gnav_hover();
		set_change_contents();
		
		//最初だけページ情報を取得
		var domain = location.href.match(/^https?:\/\/[^\/]+/),
				url = location.href.replace(domain[0], '');
		_model.url = url;
		
		console.log('初期表示 : ', _model.url);
		
		if(_model.url == '/' || _model.url == '/index.php'){
			//最初でtopのときはtrailer
			console.log('topppppppppppp');
			if(_model.init_app_flg){
				_model.init_app_flg = false;
				
				if($.cookie('access_top') == 'set_term'){
					console.log('訪問済み');
					show_html_init();
					show_init_top();
				}else{
					console.log('未訪問');
// 荒川追記 140410
//					create_trailer();
  					show_html_init();
	  				show_init_top();
				}
				
				var date = new Date();
				date.setTime(date.getTime() + (60*60*1000)); //1時間
				$.cookie('access_top', 'set_term', {expires: date}); //ID, 値, 期間
			}
		}else{
			console.log('subbbbbbbbbbbb');
			if(_model.init_app_flg){
				show_html_init();
				
				//コンテンツ透過 > タイトル表示 > タイトル消す > コンテンツ表示
				$('#change_contents').css({opacity: 0});
				setTimeout(function(){
					show_title();
				}, 1000);
			}
		}
	});
	
	function protect_img(){
		$('img').mousedown(function(){ //ドラッグ禁止
			return false;
		});
		$('img, area').on('contextmenu',function(){ //右クリック禁止
			return false;
		});
	}
	
	function sizeupdate_animation_bg(){
		var el = $('#animation_bg'),
				el_w = el.width(),
				el_h = el.height(),
				ww = $(window).width(),
				wh = $(window).height(),
				percent = 0,
				update_w = 0,
				update_h = 0,
				mt = 0, ml = 0;
				
		percent = ww / el_w;
		
		if(wh > (el_h * percent)){
			percent = wh / el_h;
			
			update_w = Math.round(el_w * percent);
			update_h = Math.round(el_h * percent);
			mt = 0;
			ml = -(Math.round((update_w - ww) / 2));
		}else{
			update_w = Math.round(el_w * percent);
			update_h = Math.round(el_h * percent);
			mt = -(Math.round((update_h - wh) / 2));
			ml = 0;
		}
		
		el.width(update_w).height(update_h).css({marginTop : mt, marginLeft : ml});
	}
	
	function bgm_play(){
		console.log('BGM再生');
		//if(_model._browser == 'ie9' || _model._browser == 'ie8'){
		if(_model._browser == 'ie8'){
    } else if(_model._browser == 'ie9') {
$('#volume').css({display: 'none'})
		console.log('IE9ではBGM再生しません');
		}else{
			$('#volume').css({backgroundPosition: 'left -60px'});
			_model.bgm.play("none",0,0,-1,0.5,0);
		}
		
		/*
		 * playの補足
		 * 【 example.play("none",0,0,0,1,0); 】
		 *		※以下引数
		 *			interrupt = "割り込み再生を許すかどうか(?)"
		 *			delay  = "再生を遅らせる。msで指定"
		 *			offset  = "再生位置を指定。msで指定"
		 *			loop   = "ループ回数。-1を指定すると無限ループ"
		 *			volume  = "音量を指定"
		 *			pan   = "左右のどちらに音を振るか(HTML Audioでは動かない?"
		 */
	}
	
	function set_volume(){
		//if(_model._browser == 'ie9' || _model._browser == 'ie8'){
		if(_model._browser == 'ie8'){
			$('#volume').css({display: 'none'});
    } else if(_model._browser == 'ie9') {
			$('#volume').css({display: 'none'});
			var vol = 0;
			console.log('初期(IE9): ', vol);
		}else{
			var vol = 0.5;
			console.log('初期: ', vol);
			
			function change_volume() {
				if(vol >= 0.1){
					console.log('resume');
					_model.bgm.resume();
				}
				if(vol == 0){
					console.log('pause');
					_model.bgm.pause();
				}
				
				_model.bgm.setVolume(vol);
			}
			
			
			$('#volume .speaker').click(function(){
				console.log('speaker click');
/*
				vol = (vol + 0.1) * 10;
				vol = Math.round(vol);
				vol = vol /= 10;
				
				if(vol > 1){
					vol = 0;
				}
				console.log(vol);
				
				change_volume();
*/
				var bgm_volume = $('#volume .slider .bar').width();

				if( bgm_volume > 0 ) {
					vol = 0;
					$('#volume .slider .btn').css('left','-3px');
					$('#volume .slider .bar').width(0);
					$('#volume .speaker').css({backgroundPosition: 'left bottom'});
					change_volume();
				} else {
					vol = 0.5;
					$('#volume .slider .btn').css('left','22px');
					$('#volume .slider .bar').width(25);
					$('#volume .speaker').css({backgroundPosition: 'left -17px'});
					change_volume();
				}
			});
			
			
			var drag_flg = false;
			$('#volume .slider .btn').mousedown(function(event){
			 $(this).addClass('drag');
			 
			 drag_flg = true;
			 
			 eX = event.pageX - $(this).css('left').replace(/px/,'');
			 eY = event.pageY - $(this).css('top').replace(/px/,'');
			 
			 
			 $(document).mousemove(function(event){
			 	if(drag_flg){
				 	var pos = event.pageX - eX;
				 	
				 	//bar
				 	$('#volume .slider .bar').width(pos);
				 	
				 	//btn
				  $('#volume .slider .drag').css('left', pos - 3);//.css('top',event.pageY - eY);
				  
				  if(pos <= 0){ //リミット
				  	$('#volume .slider .bar').width(0);
				  }else if(pos >= 50){
				  	$('#volume .slider .bar').width(50);
				  }
				  if(pos <= -3){ //リミット
					  $('#volume .slider .drag').css('left', -3);
				  }else if(pos >= 47){
					  $('#volume .slider .drag').css('left', 47);
				  }
				  
				  //vol
					if(pos <= 0){
						vol = 0;
						$('#volume .speaker').css({backgroundPosition: 'left bottom'});
						console.log(vol);
					}else if(pos >= 1 && pos <= 5){
						vol = 0.1;
						$('#volume .speaker').css({backgroundPosition: 'left -34px'});
						console.log(vol);
					}else if(pos >= 6 && pos <= 10){
						vol = 0.2;
						$('#volume .speaker').css({backgroundPosition: 'left -34px'});
						console.log(vol);
					}else if(pos >= 11 && pos <= 15){
						vol = 0.3;
						$('#volume .speaker').css({backgroundPosition: 'left -34px'});
						console.log(vol);
					}else if(pos >= 16 && pos <= 20){
						vol = 0.4;
						$('#volume .speaker').css({backgroundPosition: 'left -17px'});
						console.log(vol);
					}else if(pos >= 21 && pos <= 25){
						vol = 0.5;
						$('#volume .speaker').css({backgroundPosition: 'left -17px'});
						console.log(vol);
					}else if(pos >= 26 && pos <= 30){
						vol = 0.6;
						$('#volume .speaker').css({backgroundPosition: 'left -17px'});
						console.log(vol);
					}else if(pos >= 31 && pos <= 35){
						vol = 0.7;
						$('#volume .speaker').css({backgroundPosition: 'left -17px'});
						console.log(vol);
					}else if(pos >= 36 && pos <= 40){
						vol = 0.8;
						$('#volume .speaker').css({backgroundPosition: 'left -17px'});
						console.log(vol);
					}else if(pos >= 41 && pos <= 45){
						vol = 0.9;
						$('#volume .speaker').css({backgroundPosition: 'left top'});
						console.log(vol);
					}else if(pos >= 46 && pos <= 50){
						vol = 1;
						$('#volume .speaker').css({backgroundPosition: 'left top'});
						console.log(vol);
					}
					
					change_volume();
			 	}
			 });
			 
			 $(document).mouseup(function(event){
			 	drag_flg = false;
			  $('#volume .slider .drag').unbind('mousemove');
			  $('#volume .slider .drag').removeClass('drag');
			 });
			});
			
		}
		
		
		//////////////////////////////////////////////////if(_this._browser != 'ie9' || _this._browser != 'ie8'){$('#site_footer_r_inner').prepend('<a href="javascript:void(0);" id="volume"><span class="hide">volume</span></a>');}
		//$('#volume').click(function(){
			//if(_this._browser != 'ie9' || _this._browser != 'ie8'){
				
/*OLD //////////////////////////////////////////////////
				var vol = _model.bgm.getVolume();

				
				switch(vol){
					case 0:
						vol = 0.1;
						console.log('resume');
						_model.bgm.resume();
						$('#volume').css({backgroundPosition: 'left -120px'});
						break;
					case 0.1:
						vol = 0.2;
						$('#volume').css({backgroundPosition: 'left -100px'});
						break;
					case 0.2:
						vol = 0.4;
						$('#volume').css({backgroundPosition: 'left -80px'});
						break;
					case 0.4:
						vol = 0.5;
						$('#volume').css({backgroundPosition: 'left -60px'});
						break;
					case 0.5:
						vol = 0.7;
						$('#volume').css({backgroundPosition: 'left -40px'});
						break;
					case 0.7:
						vol = 0.8;
						$('#volume').css({backgroundPosition: 'left -20px'});
						break;
					case 0.8:
						vol = 1;
						$('#volume').css({backgroundPosition: 'left top'});
						break;
					case 1:
						vol = 0;
						console.log('pause');
						_model.bgm.pause();
						$('#volume').css({backgroundPosition: 'left bottom'});
						break;
				}
				
				console.log(vol);
				_model.bgm.setVolume(vol);
//////////////////////////////////////////////////*/
				
/*
				var vol = _model.bgm.getVolume() + 0.1;
				vol = vol * 10;
				vol = Math.round(vol);
				vol = vol /= 10;
				if(vol > 1){
					vol = 0;
				}
				_model.bgm.setVolume(vol);
				console.log(vol);
				
				if(vol == 0){
					console.log('pause');
					_model.bgm.pause();
					$('#volume').css({backgroundPosition: 'left bottom'});
				}else if(vol == 0.1){
					console.log('resume');
					_model.bgm.resume();
				}
*/
			//}
		//});
	}
	
	function set_gnav_hover(){
		$('#global_nav').find('a').hover(function(){
			$(this).find('.over').stop().css({display:'block',opacity:0}).animate({'opacity':1},300,'easeOutQuart');
			
		},function(){
			$(this).find('.over').stop().animate({'opacity':0},500,'easeInQuart',function(){
				$(this).css({display:'none'});
			});
		});
	}
	function gnav_indicater(){
		$('#global_nav').find('li').removeClass('active');
		
		if(_model.url == '/' || _model.url == '/index.php'){
			$('#global_nav').find('li').eq(0).addClass('active');
		}else{
			switch(_model.url.substring(1, 4)){
				case 'new': //news
					$('#global_nav').find('li').eq(1).addClass('active');
					break;
				case 'wor': //world
					$('#global_nav').find('li').eq(2).addClass('active');
					break;
				case 'sys': //system
					$('#global_nav').find('li').eq(3).addClass('active');
					break;
				case 'the': //theatre
					$('#global_nav').find('li').eq(4).addClass('active');
					break;
				case 'int': //interview
					$('#global_nav').find('li').eq(5).addClass('active');
					break;
				case 'med': //media
					$('#global_nav').find('li').eq(6).addClass('active');
					break;
				case 'dow': //download
					$('#global_nav').find('li').eq(7).addClass('active');
					break;
			}
		}
	}
	
	function show_html_init(){
		console.log('initloaderとwallをフェードアウト');
  	
		$('#init_loader').animate({opacity:0},1000,'easeInCirc',function(){
			$(this).css({display:'none'});
		});
		
		$('#init_wall').animate({opacity:0},1000,'easeInCirc',function(){
			$(this).css({display:'none'});
			if(_model.url == '/' || _model.url == '/index.php'){
			}else{
				if(_model._browser != 'tab'){bgm_play();}
			}
		});
	}
	
	function create_trailer(){
		console.log('trailer生成');
		var trailer_cont_source = '<div id="trailer_content"><div id="trailer"></div><a href="javascript:void(0);" id="trailer_close"><img src="/common/images/trailer_close.png" alt="" width="50" height="50"></a></div>',
				trailer_source = '<iframe width="640" height="360" src="//www.youtube-nocookie.com/embed/19s0G5lLc0g?rel=0&autoplay=1" frameborder="0" allowfullscreen></iframe>';
		
		$('#trailer_content').css({display: 'block'});
		$('#trailer').append(trailer_source);
  	
		$(window).resize(function(){
			size_update_trailer();
		});
		size_update_trailer();
		
  	$('#trailer_close').click(function(){
			$('#trailer_content').stop().animate({opacity:0},500,'linear',function(){
				show_init_top();
			});
  	});
  	
		setTimeout(function(){ //ムービーのノイズをかくすため、ムービー生成後interval（500）をおいてからwall系を消す
			show_html_init();
		}, 500)
	}
	function size_update_trailer(){
		var el = $('#trailer').find('iframe'),
				el_w = el.width(),
				el_h = el.height(),
				ww = $(window).width(),
				wh = $(window).height(),
				percent = 0,
				update_w = 0,
				update_h = 0,
				mt = 0;
				
		percent = ww / el_w;
		
		if(wh > (el_h * percent)){
			update_w = Math.round(el_w * percent);
			update_h = Math.round(el_h * percent);
			mt = Math.round((wh - update_h) / 2);
		}else{
			percent = wh / el_h;
			update_w = Math.round(el_w * percent);
			update_h = Math.round(el_h * percent);
			mt = 0;
		}
		
		el.width(update_w).height(update_h).css({marginTop : mt});
	}
	
	function show_init_top(){
		console.log('トップ初期表示');
		
		gnav_indicater();
		
		if($('#trailer_content').length){
			$('#trailer_content').remove();
		}
		if(_model._browser != 'tab'){bgm_play();}
		$this.trigger(_this.dispatch_show_contents);
		
		console.log('showedddddddddddddddddddddddddddd');
		change_enable_flg = true;
	}
	
	
	/* Change Contents
	-------------------------------------------------- */
	function set_change_contents(){ ////////////////////////////////////////////////////////////////////このあとにmodelでpjaxするのはchange_contents_triggerがクリックされたときだけ！
		$(document).on('click', '.change_contents_trigger', function(e){
			if(change_enable_flg){
				console.log('============================================ change contents');
				
				change_enable_flg = false;
				
			  e.preventDefault();
				preurl = _model.url;
			  _model.url = $(this).attr('href');
				
				hide_contents();
				if(_model.url == '/' || _model.url == '/index.php'){
				}else{
					show_title();
				}
			
			}else{
				return false;
			}
		});
	}
	
	function show_title(){
		console.log('タイトルフェードイン');
		
		var title_target = 0;
		switch(_model.url.substring(1, 4)){
			case 'wor': //world
				title_target = 1;
				break;
			case 'sys': //system
				title_target = 2;
				break;
			case 'the': //theatre
				title_target = 3;
				break;
			case 'int': //interview
				title_target = 4;
				break;
			case 'med': //media
				title_target = 5;
				break;
			case 'abo': //about_this_site
				title_target = 6;
				break;
			case 'pri': //privacy_policy
				title_target = 7;
				break;
			case 'dow': //download
				title_target = 5;
				break;
		}
		
		//表示
		if(title_target == 6 || title_target == 7){
			_this.displayed_title_flg = true;
			show_contents();
		
		//Not AboutThisSite or PrivacyPolicy
		}else{
			//初期化
			$('#page_title').find('.bg').stop().css({display: 'block', opacity: 0});
			$('#page_title').find('.line').stop().css({width: 0, left: 0});
			$('#page_title').find('h2').stop().css({display: 'block', opacity: 0});
			$('#page_title').stop().css({display: 'block', opacity: 0});
			
			//アニメーション
			$('#page_title').css({opacity: 0});
			$('#page_title').find('.bg').animate({opacity: 1},500,'easeOutExpo');
			$('#page_title').find('.line').delay(200).animate({width: '100%'},300,'easeOutExpo', function(){
				$(this).delay(200).animate({width: 0, left: $(window).width()+10},300,'easeOutExpo');
			});
			$('#page_title').find('h2').eq(title_target).delay(300).animate({opacity: 1},0,'easeOutExpo', function(){
				setTimeout(function(){
					_this.displayed_title_flg = true;
					show_contents();
				},0);
			});
			
		}
	}

	function hide_title(){
		console.log('タイトルフェードアウト');
		$('#page_title').stop().animate({opacity: 0},200,'easeInExpo',function(){
			$(this).css({display: 'none'});
			
/* OLD //////////////////////////////////////////////////////
			$(this).css({display: 'none'});
			$('#page_title_l').stop().css({left: -1650});
			$('#page_title_r').stop().css({right: -1650});
			$('#page_title').find('h2').stop().css({width: '100%', height: '10%', display: 'none', opacity: 0});
//////////////////////////////////////////////////////*/
			
			//hide_title_flg = true;
			//console.log('>>>>>>>>>>>>>>>>> hide title load handler >>>>>>>>>>>>>>>>>');
			//set_load_contents();
		});
	}
	
	function hide_contents(){
		console.log('コンテンツアウト');
		
/*
		$('#change_contents').css({opacity: 0});
		_controller.load_contents_handler();
*/

		$('#change_contents').animate({opacity: 0},200,'easeOutExpo',function(){
			console.log('>>>>>>>>>>>>>>>>> load handler >>>>>>>>>>>>>>>>>');
			//set_load_contents();
			
			hide_contents_flg = true;
			_controller.load_contents_handler();
		});
	}
	
/*
	function set_load_contents(){
//		if(preurl == '/' || preurl == '/index.php'){
//			hide_contents_flg = false;
//			_controller.load_contents_handler();
//			console.log('>>>>>>>>>>>>>>>>> load >>>>>>>>>>>>>>>>>');
//		}else{
			
			console.log('hide_title_flg : ', hide_title_flg);
			console.log('hide_contents_flg : ', hide_contents_flg);
			if(hide_title_flg && hide_contents_flg){
				hide_title_flg = false;
				hide_contents_flg = false;
				_controller.load_contents_handler();
				console.log('>>>>>>>>>>>>>>>>> load >>>>>>>>>>>>>>>>>');
			}
//		}
	}
*/
	
	$model.on(_model.dispatch_loaded_contents,function(){
		console.log('コンテンツロード完了');
		if(_model.load_contents_flg == 'end'){
			console.log('popstate_flg : ', popstate_flg);
			
			
			
			
			_this.loaded_contents_flg = true;
			show_contents();
		}else if(_model.load_contents_flg == 'popstate'){
			var domain = location.href.match(/^https?:\/\/[^\/]+/),
					url = location.href.replace(domain[0], '');
			_model.url = url;
			
			popstate_flg = true;
		}
	});
	
	function show_contents(){
		$(window).resize(function(){
			_this.layout_fix_contents();
		});
		_this.layout_fix_contents();
		
		if(_model.url == '/' || _model.url == '/index.php'){
			if(!popstate_flg){
				if(_this.loaded_contents_flg){
					
					//タイトルが表示されていたら初期化
/* OLD
					$('#page_title').stop().css({display: 'none', opacity: 0});
					$('#page_title_l').stop().css({left: -1650});
					$('#page_title_r').stop().css({right: -1650});
					$('#page_title').find('h2').stop().css({display: 'none', opacity: 0});
*/
					
					console.log('トップコンテンツフェードイン');
					$('#change_contents').stop().animate({opacity:1},100,'easeInExpo');
					$this.trigger(_this.dispatch_show_contents);
					
					gnav_indicater();
					
					_this.loaded_contents_flg = false;
					change_enable_flg = true;
				}
			}
		
		}else{
			if(!popstate_flg){
				if(_model.init_app_flg){
					_model.init_app_flg = false;
					if(_this.displayed_title_flg){
						hide_title();
						console.log('下層コンテンツフェードイン');
						$('#change_contents').stop().css({display: 'block', opacity: 0}).animate({opacity:1},500,'easeInExpo', function(){
							_this.displayed_title_flg = false;
							change_enable_flg = true;
						});
						$this.trigger(_this.dispatch_show_contents);
						
						gnav_indicater();
					}
					
				}else{
					if(_this.displayed_title_flg && _this.loaded_contents_flg){
						hide_title();
						console.log('下層コンテンツフェードイン');
						$('#change_contents').stop().css({display: 'block', opacity: 0}).animate({opacity:1},500,'easeInExpo', function(){
							_this.displayed_title_flg = false;
							_this.loaded_contents_flg = false;
							change_enable_flg = true;
						});
						$this.trigger(_this.dispatch_show_contents);
						
						gnav_indicater();
					}
				}
			}
		}
		
		if(popstate_flg && _this.loaded_contents_flg){
			console.log('///////////////////////////////////////////////////// popstate > end');
			
			console.log(_model.url);
			
			$('#change_contents').stop().css({display: 'block', opacity: 1});
			$this.trigger(_this.dispatch_show_contents);
			
			gnav_indicater();
			
			popstate_flg = false;
			_this.displayed_title_flg = false;
			_this.loaded_contents_flg = false;
		}
	}
	
	_this.layout_fix_contents = function(){ //コンテンツをロードしてるときのみ ・サイト表示時 ・コンテンツロード時
		var wh = $(window).height(),
				header_h = 80,
				footer_h = 60, //実際は34だがコンテンツを中央寄せは上下のマージンを合わせる必要があるのでheaderに合わせる
				contents_h = 620,
				base_h = header_h + footer_h + contents_h,
				fix_h = 0, //contentsの位置
				fix_pos = 0; //containerの位置

		if(wh > base_h){
//　NEWSとMEDIAとDOWNLOADの場合は
//　コンテンツの位置はヘッダ80px・フッタ40pxに固定し、コンテンツの高さを可変にする
			if($('#news').length || $('#media').length || $('#download').length){
				fix_h = Math.floor(wh - (header_h + footer_h) - 60) ; //42 : main_titleのheight(40) + 下ボーダー(2)
				fix_pos = 80;
//　通常はコンテンツの高さを620pxに固定
			} else {
				fix_h = contents_h - 44; //42 : main_titleのheight(40) + 下ボーダー(2)
				fix_pos = Math.floor((wh - (fix_h + 44)) / 2);
			}
//　JOBの場合contents_wrapperの高さを496px
if($('#job').length) {
	$('.contents_wrapper').height(496);
}

if($('#battle').length) {
	$('.contents_wrapper').height(456);
}

//　ウィンドウの高さが740px以下の場合、コンテンツの高さを縮小表示
		}else{
			if($('#news').length || $('#media').length || $('#download').length){
				fix_pos = 80;
				fix_h = Math.floor((wh - (header_h + footer_h)) - 64);
			} else {
				fix_pos = 80;
				fix_h = Math.floor((wh - (header_h + footer_h)) - 64);
			}

//　JOBの場合contents_wrapperの高さを変動させスクロールさせる
if($('#job').length) {
	$('.contents_wrapper').height(fix_h - 80);
}
if($('#battle').length) {
	$('.contents_wrapper').height(fix_h - 120);
}

			console.log('mini');
		}

//		console.log('wh : ', wh);
//		console.log('fix_c_h : ', fix_c_h);

		
//		console.log('fix_c_pos : ', fix_c_pos);


//		if($('#media').length){
//			$('.contents').height(fix_h);
//		} else if($('#news').length){
//			$('.contents').height(fix_h);
//		} else {
//			$('.contents').height(fix_h);
//		}

		$('.contents').height(fix_h);
		$('.container').css({top: fix_pos});

//		console.log('.contents : スクロールバーをだしたい要素');
//		console.log('.contents height : ', $('.contents').height());
		
		//.contents内に.contents_scroll_innerがある場合はスクロールエリアを.contents_scroll_innerに変更
		if($('.contents_scroll_inner').length){
			$('.contents').css({overflow: 'hidden'});
			$('.contents_scroll_inner').height(fix_h - 40);
		} 
		
		
		
	}
	
}


/* CONTROLLER
============================================================ */
var Controller=function(_model){
	var _this = this, $this = $(_this), $model = $(_model);
	
	(function(){ //Constructor
	})();
	
	
	/* Load Contents Handler
	-------------------------------------------------- */
	_this.load_contents_handler = function(){
		_model.load_contents();
	}
}



$(function(){
	var model = new Model(),
			controller = new Controller(model),
			view = new View(model,controller);

	jQuery.event.add(window,"load",function(){
		model.init_app();
	});
});