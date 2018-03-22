/**
 * Paint 0.1 pre
 * 创建人：lhh
 * 名称：html5 绘图工具
 * 创建日期：2014.6.4
 * 修改日期：2015.3.25
 * 功能：
 * Copyright Software 
 * 
 * 
 */


(function(window,$,undefined,System){
    
	if(!System) {
		alert('without nothing the class of System');
		return 0;
	}
	var __this__=null;
	
	 

	function Paint(element,init){
		/**
		*	element : 画布dom元素
		*	{
		*	
		*
		*	}
		*
		*/
		System.Basis.extends.call(this,System.Helper);
		__this__=this;
		/*--------------------------------------------------------------------------------------------------*/

		this.team=[];
		this.cxt=null;
		this.element=element;

	}

	Paint.prototype = {
		'constructor':Paint,
		'__constructor':function(){},
		/**
		*	{
		*	(Array)  'position':[0,0,300,150,600,150],
		*	(String)  'color':'#f00'
		*	}
		*/
		'triangle':function(D){
			if(D.color) this.cxt.fillStyle=D.color;
			this.line(D);
			this.cxt.lineTo(D.position[4],D.position[5]);
			this.cxt.closePath();
			return this;
		},

		/**
		*	{
		*	(String)  'src':'flower.png',
		*	(Array)  'position':[0,0]
		*	}
		*/
		'image':function(D){
			var img=new Image()
			img.src=D.src;
			img.onload=function(){
				__this__.cxt.drawImage(img,D.position[0],D.position[1]);
			};
			return this;

		},

		/**
		*	{
		*	'position':[0,0,300,150],
		*	'width':1.5,
		*	'color':'#f60',
		*	'close':true
		*	}
		*/
		'line':function(D){
			if(D.color) this.cxt.strokeStyle=D.color;
			if(D.width) this.cxt.lineWidth=D.width;
			this.cxt.beginPath();
			this.cxt.moveTo(D.position[0],D.position[1]);
			this.cxt.lineTo(D.position[2],D.position[3]);
			if(D.close) this.cxt.closePath();
			return this;
		},

		/**
		*	{
		*	(Object)  'position':{'x':20,'y':20},
		*	(Object)  'size':{'w':150,'h':100},
		*	(String)  'color':'#f00',
		*	(Boolean)  'fill':true
		*	}
		*/
		'rect':function(D){
			if(D.fill){
				if(D.color) this.cxt.fillStyle=D.color;
				this.cxt.rect(D.position.x,D.position.y,D.size.w,D.size.h);
				this.fill();
			}else{
				this.cxt.strokeRect(D.position.x,D.position.y,D.size.w,D.size.h);
				

			}
			return this;

		},

		/**
		*	{
		*	(Array)  'size':[20,20,150,100],
		*	(String) 'color':'#f00'
		*	}
		*/
		'arc':function(D){
			if(D.color) this.cxt.fillStyle=D.color;
			this.cxt.beginPath();
			this.cxt.arc(D.size[0],D.size[1],D.size[2],D.size[3],2*Math.PI,true);
			this.cxt.closePath();
			return this;

		},
		
		'create':function(){
			this.cxt=this.element.getContext('2d');
			// this.team.push(this.cxt);
			return this;
		},
		'fill':function(){
			this.cxt.fill();
			return this;
		},
		'clear':function(x,y,width,height){//在给定的矩形内清除指定的像素
			if(!this.cxt) return false;
			this.cxt.clearRect(x,y,width,height);
			return this;
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
		'destructor':function(){
			
		}

	};
	
	System.extends(Paint,System.Helper,1);
	System['Html5']['Paint']=Paint;
})(window,jQuery,undefined,window[LHH_NAMESPACE_20150715_]);


