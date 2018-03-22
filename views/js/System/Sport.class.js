
//运动框架
(function(window,jQuery,undefined,System){
	
	if(!System) {
		alert('without nothing the class of System');
		return 0;
	}
	var __this__=null;
	var $=jQuery;
	
	var MOVE_TYPE={
	 		'BUFFER':1,
	 		'FLEX'	:2
	};
	var Move=function(obj,oTarget,fn){
			var iCur=0;
			var arr="";
			var bStop=true;
			for(arr in oTarget){
				if(arr=="opacity"){
					iCur=parseInt(parseFloat(__this__.getStyle(obj, 'opacity'))*100);
				}else{
					iCur=parseInt(__this__.getStyle(obj,arr));
				}
				if(isNaN(iCur)){iCur=0;}
				var speed=(oTarget[arr]-iCur)/5;
				speed=speed>0?Math.ceil(speed):Math.floor(speed);
				if(oTarget[arr]!=iCur){bStop=false;}
				if(arr=="opacity"){
					obj.style.filter="alpha(opacity:"+(iCur+speed)+")";
					obj.style.opacity=(iCur+speed)/100;
				}else{
					obj.style[arr]=iCur+speed+"px";
				}
			}
			if(bStop){
				clearInterval(obj.timer);
				obj.timer=null;
			}
			if(fn){fn();}
		},
		/**
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2014-11-28
		 * 修改日期：2014-11-28
		 * 名称：private Movei
		 * 功能：运动框架
		 * 说明：
		 * 注意：
		 * @param   (Dom)obj 				NO NULL :
		 * @param   (String)oTarget 		   NULL : 目标的(如运动多少距离)
		 * @param   (String)iType 		   	   NULL : 运动类型
		 * @param   (Function)fnCallBack 	   NULL : 运动结束后调用
		 * @param   (Function)fnDuring 		   NULL : 运动进行时调用 (同步)
		 * Example：
		 */
		Movei=function(obj,oTarget,iType,fnCallBack,fnDuring){
			var fnMove=null;
			if(obj.timer){
				clearInterval(obj.timer);
			}
			switch(iType){
				case MOVE_TYPE.BUFFER
					fnMove=__this__.linear;
				break;
				case MOVE_TYPE.FLEX
					fnMove=__this__.quad;
				break;
				default;

			}

			obj.timer=setInterval(function(){
				fnMove(obj,oTarget,fnCallBack,fnDuring)
			},15);
		};

	function Sport(Browser){
		System.Basis.extends.call(this,System.Helper);
		__this__=this;

		
	}

	Sport.prototype = {
		'constructor':Sport,
		'__constructor':function(){},
		'doMove':function (obj,oTarget,time,fn){
			var time=time||30;
			if(obj.timer){clearInterval(obj.timer);}
			obj.timer=setInterval(function(){Move(obj,oTarget,fn)},time);
		},
		'startMove':function (obj,oTarget,time,fn){
			var time=time||30;
			if(obj.timer){clearInterval(obj.timer);}
			obj.timer=setInterval(function(){fn(obj,oTarget)},time);
		},




		/**
		 * 动画（对象，增量用对象方式传经来，开始值用对象方式传经来，时间）
		 * 
		 * 
		 */
		'animation':function(obj,start,alter,dur){
			var linear=this.linear;
			var curTime=0;
			var t=setInterval(function(){
				if(curTime>=dur) clearInterval(t);
				for(var i in start){
					obj.style[i]=linear(start[i],alter[i],curTime,dur)+"px";
				}
				curTime+=50;
			},50);	
		},

		/**
		 * 优先用这个方法
		 * 
		 * 
		 */
		'Animate':function(obj, json,time){
		   	time=time || 30;
		   	if(obj.timer){
		      clearInterval(obj.timer);
		    }
		    obj.timer = setInterval(function(){
		      for(var attr in json){
		        var iCur = parseInt(__this__.getStyle(obj, attr));
		        iCur = iCur ? iCur : 0;
		        var iSpeed = (json[attr] - iCur) / 3;
		        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
		        obj.style[attr] = iCur + iSpeed + 'px';
		        if(iCur == json[attr]){
		          clearInterval(obj.timer);
		        }
		      }
		    }, time);
		},

		/**
		 * 动画（对象，{增量用对象方式传经来}，{开始值用对象方式传经来}，时间,函数）
		 * 
		 * 
		 */
		'animation_A':function(obj,start,alter,dur,fx){
			/**
			参数说明：
			curTime:当前时间，即动画已经进行了多长时间，开始时间为0
			start:开始值
			dur:动画持续多长时间
			alter:总的变化量
			*/
			var curTime=0;
			var t=setInterval(function(){
				if(curTime>=dur) clearInterval(t);
				for(var i in start){
					obj.style[i]=fx(start[i],alter[i],curTime,dur)+"px";
				}
				curTime+=50;
			},50);	
			return t;
		},
		'opacity':function(obj,opacity){//透明度（对象，透明度值）
			//var linear=this.linear;
			var setOpacity=this.setOpacity;
			var curTime=0;
			var t=setInterval(function(){
				if(curTime>=dur) clearInterval(t);
					obj.style=__this__.linear(start,alter,curTime,dur)+"px";
				curTime+=50;
			},50);	
		},
		'setOpacity':function(obj,opacity){
			if(typeof obj.style.opacity=="string"){//FF
					obj.style.opacity=opacity/100;
			}else {//IE
				obj.style.filter="alpha(opacity="+opacity+")";
			}	
		},
		'linear':function(start,alter,curTime,dur){//最简单的线性变化，即匀速运动
			return start+curTime/dur*alter;
		},
		'quad':function(start,alter,curTime,dur){//加速变化
			return start+Math.pow(curTime/dur,2)*alter;
		},
		'FLEX':function(){//弹性运动
			
		},

		/**
		 * 动画（对象，样式属性，增量，开始值，结束值，时间）
		 * 
		 * 
		 */
		'animation_B':function(obj,arrt,add,start,end,t){
			var saved=start;
			setInterval(function(){
				if(saved>=end) return;
				saved+=add
				obj.style[arrt]=saved+"px";					 
			},t);	
		},

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
	System.extends(Sport,System.Helper,1);
	System['Sport']=Sport;
})(window,jQuery,undefined,window[LHH_NAMESPACE_20150715_]);

