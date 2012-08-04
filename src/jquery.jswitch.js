/**
 * jSwitch - Image gallery for jQuery
 * Written by Akop Kesheshyan
 * Twitter: http://twitter.com/creativator_ru
 *
 * @author Akop Kesheshyan
 * @site http://creativator.net/
 * @version 0.9.1
 *
 **/
(function($){		
	$.extend({
		jswitch:{
			object:{},
			settings:{
				speed: 500,
				auto: 7,
				callback:false
			},
			configurations:{
				imageNormalWidth:0,
				imageNormalSpace:16,				
				imageFullWidth:0,
				imageNormalMarginTop:0
			},
			init: function($this, $settings){
				
				this.object = $this;					
				this.settings = $.extend(this.settings,$settings);				
				
				this.configurations.imageNormalWidth = parseInt(this.object.width()/3);
				this.configurations.imageFullWidth = parseInt($this.css('width').replace(/px/,''));					
				var _imgNormalHeight = parseInt(this.configurations.imageNormalWidth/($this.width()/$this.height()));				
				this.configurations.imageNormalMarginTop = (parseInt($this.css('height').replace(/px/,'')) - _imgNormalHeight)/2;
				
				$('ul',this.object).css({
					left:(this.configurations.imageNormalWidth-this.configurations.imageNormalSpace),
					height:parseInt($this.css('height').replace(/px/,'')),
					width:10000,
					float:'left',
					margin:0,
					padding:0,
					whiteSpace:'nowrap',
					position:'absolute',
					zIndex:1000
				});
				
				
				$('img',this.object).css({
					width:this.configurations.imageNormalWidth,
					marginLeft:this.configurations.imageNormalSpace,
					marginRight:this.configurations.imageNormalSpace,
					marginTop:this.configurations.imageNormalMarginTop,
					float:'left'
				}).appendTo($('ul',this.object)).filter(':first').addClass('zoomed');
				
				this.openImage();
				
				$('li',this.object).remove();					
				
				if(this.settings.auto){
					this.setAuto();
				}				
				
				if($.isFunction(this.settings.callback)){
					return this.settings.callback(this);
				}
			},
			openImage: function(callback){
				return $('.zoomed',this.object).animate({marginTop:0,width:this.configurations.imageFullWidth,marginLeft:-this.configurations.imageNormalWidth+(this.configurations.imageNormalSpace),marginRight:0},this.settings.speed+(this.settings.speed/3*2),function(){
					if($.isFunction(callback)){
						return callback();
					}
				}).addClass('zoomed');
			},
			closeImage: function(callback){
				return $('.zoomed',this.object).animate({marginTop:this.configurations.imageNormalMarginTop,width:this.configurations.imageNormalWidth,marginRight:this.configurations.imageNormalSpace,marginLeft:this.configurations.imageNormalSpace},this.settings.speed,function(){
					if($.isFunction(callback)){
						return callback();
					}
				}).removeClass('zoomed');
			},
			nextImage: function(){
				var $this = this;
				var $zoomed = $('.zoomed',this.object).next();
				var $offset = '-='+($this.configurations.imageNormalWidth+$this.configurations.imageNormalSpace*2)+'px';
					if(!$zoomed.size()){
						$offset = (this.configurations.imageNormalWidth-this.configurations.imageNormalSpace)+'px';
						$zoomed = $('img:first',this.object);
					}
						this.closeImage(function(){
							$('ul',$this.object).animate({left: $offset}, $this.settings.speed,function(){
								$zoomed.addClass('zoomed');
								return $this.openImage();
							});
						});
				
			},
			prevImage: function(){
				var $this = this;
				var $zoomed = $('.zoomed',this.object);
				if($zoomed.prev().size()){
					this.closeImage(function(){
						$('ul',$this.object).animate({left: '+='+($this.configurations.imageNormalWidth+$this.configurations.imageNormalSpace*2)+'px'}, $this.settings.speed,function(){	
							$zoomed.prev().addClass('zoomed');
							return $this.openImage();
						});
					});
				}				
			},
			setAuto: function(){
				var $this = this;					
				window.setTimeout(function(){ $this.setAuto(); $this.nextImage();},$this.settings.auto*1000);
			}
		}
	});
	
	$.extend($.fn, {
		jswitch: function(settings){
			$.jswitch.init(this,settings);
		}
	});	


})(jQuery);