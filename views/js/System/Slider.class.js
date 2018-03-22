
(function(window,jQuery,undefined,System){
	
	if(!System) {
        alert('without nothing the class of System');
        return 0;
    }
	var $=jQuery;
	function Slider(init){
		/**
		 *
		 *
		 * 功能：自动轮播，next，pre,可以跳转到指定的位置
		 * (jQuery obj)	'$pre':$('#slidePre'), 			:NULL
		 * (jQuery obj)	'$next':$('#slideNext'),		:NULL
		 * (jQuery obj)	'$elem':$('#imgList'),//		:NO NULL
		 * (int)		'size':1800,//移动图片的宽度	:NO NULL
		 * (int)		'event':'click',//事件			:NULL
		 * (int)		'imglen':12,//图片长度			:NO NULL
		 * (int)		'number':6,//显示多少个			:NO NULL
		 * (int)		'flag':0,						:NO NULL
		 * (String)		'position':'left',				:NO NULL
		 * (jQuery obj)	'$autoHandler':$(""),//自动		:NULL
		 * (int)		'move_time':50,
		 * (int)		'time':5000,
		 * (Boolear)	'noLoop':false|true,			:NULL //不循环轮播默认循环状态(false)
		 * (Object)		'sport':Sport
		 * }
		 *
		*/
		
		System.Basis.extends.call(this,System.Helper);
		var __this__=this;
		/*--------------------------------------------------------------------------------------------------*/

		this.init=init;
		this.slide=null;
		

		
	}
	Slider.prototype = {
		'constructor':Slider,
		'move':function(len,position){
			var init=this.init;
			var elem=init.$elem[0];
			var position=position||init.position;
			var time=init.move_time || 50;
			
			if("left"===position || "right"===position || "top"===position || "bottom"===position){
				if(init.sport){
					var P={};
					P[position]=len;
					init.sport.Animate(elem,P,time);
				}else{
					elem.style[position]=len+"px";
				}
			}else{
				alert("错误!只能传('left' | 'right' | 'top' | 'bottom') 其中之一");
			}

		},
		'click':function(eve,fn){
			var init=this.init;
			var $pre=init.$pre,
				$next=init.$next;
			if($next){
				$next[eve](function(){
					if((init.imglen-init.number)>init.flag){
						__this__.next();
					}else{
						if(!init.noLoop){
							__this__.jump_start();
						}
					}
					
					if(fn) fn();
				});
			}
			if($pre){
				$pre[eve](function(){
					if(init.flag>0){
						__this__.pre();
					}else{
						if(!init.noLoop){
							__this__.jump_end();
						}
					}
					
					if(fn) fn();
				});
			}
		},
		'next':function(){
			var init=this.init;
			this.invoke(++init.flag);
			
		},
		'pre':function(){
			var init=this.init;
			if(init.flag>0){
				this.invoke(--init.flag);
			}
		},
		'auto':function($elem,fn){
			var init=this.init;
			var time=init.time || 5000;
			if($elem){
				$elem.hover(function(){
					__this__.stop();
				},function(){
					__this__.auto(null);
				});				
			}
			this.slide=setInterval(function(){
				if((init.imglen-init.number)>init.flag){
					__this__.next();
				}else{
					__this__.jump_start();
				}
			},time);
			if(fn) fn();
		},
		'start':function(){
			this.auto(null);
		},
		'stop':function(){
			clearInterval(this.slide);
		},
		'invoke':function(n){//跳转到第几步
			var init=this.init;
			init.flag=n;
			if(init.flag>=0 && (init.imglen-init.number)>=init.flag){
				this.move(-(init.size)*init.flag);
				
			}else{
				return 0;
			}
			
		},
		'jump_start':function(){
			this.invoke(0);
		},
		
		'jump_end':function(){
			var init=this.init;
			if(init.imglen < init.number) return;
			this.invoke(init.imglen-init.number);
		},
		'run':function(fn){
			var init=this.init;
			if(init.event){
				this.click(init.event,fn);	
			}
			if(init.$autoHandler){
				this.auto(init.$autoHandler);
			}
			return this;
		},
		'getInit':function(){
			var init=this.init;
			return init;
		},
		'__constructor':function(){},
		
		/**
		 *
		 * @author lhh
		 * 产品介绍：析构方法
		 * 创建日期：2015-4-2
		 * 修改日期：2015-4-2
		 * 名称：destructor
		 * 功能：在注销Basis对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()						:
		 * Example：
		 */
		'destructor':function(){}
	};
	System.extends(Slider,System.Helper,1);
	System['Slider']=Slider;
})(window,jQuery,undefined,window[LHH_NAMESPACE_20150715_]);

