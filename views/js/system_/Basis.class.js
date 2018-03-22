/**
 * my_libs 0.2 pre
 * 创建人：lhh
 * 名称：基类
 * 功能：服务于应用层类
 *			
 * 修改日期：2015/3/20	
 *
 * Copyright Software 
 * 
 * 
 */
(function(window, undefined){
	window.System={
		/**
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2014-12-23
		 * 修改日期：2015-3-18
		 * 名称：window.System.main
		 * 功能：程序主方法
		 * 说明：
		 * 注意：
		 * @param   (Function)fn 			NO NULL :调用main 方法要执行的操作
		 * @param   (Object)Obj 			   NULL :改变回掉方法中的this对象，默认为System 对象
		 * @return  (Object)						:返回Obj对象
		 * Example：
		 */
		'main':function(fn,Obj){
			if(!fn) return this;
			var Obj=Obj||this;
			if(fn){
				fn.call(Obj);
			}
			return Obj;
		},

		/**
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2014-12-23
		 * 修改日期：2015-3-18
		 * 名称：window.System.obj_len
		 * 功能：返回指定对象下面成员数量
		 * 说明：
		 * 注意：
		 * @param   (Object)Obj 			   NULL :指定的对象
		 * @return  (Number)						:返回成员数量
		 * Example：
		 */

		'obj_len':function(obj){
			obj=obj||this;
			var n=0,i;
			for(i in obj) 
				n++;
			return n;
		},


		/**
		 * 
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2015-3-18
		 * 修改日期：2015-3-20
		 * 名称：window.System.extends
		 * 功能：子类继承父类对象
		 * 说明：System类范围内
		 * 注意： 
		 * @param   (Object)this 			NO NULL :子类对象
		 * @param   (Function)o_sub 		   NULL :子类名称
		 * @param   (Function)o_super   	NO NULL :父类名称
		 * @param   (String)type 			NO NULL :1:原型链反射继承;2(默认):对象冒充方式继承 
		 * @param   ([])arg 			   	   NULL :继承父类时传的构造参数
		 * @return  (void)
		 * Example：
		 *		对象冒充方式继承:window.System.extends.call(this,o_sub,o_super,type,[,extraParameters]);
		 *		原型链继承:window.System.extends(o_sub,o_super,type);
		 */
		'extends':function(o_sub,o_super,type,arg){
			type=type || 2;
			arg = arg || null;
			switch(type){
				case 1:
					for(var v in o_super.prototype){
						if(!o_sub.prototype[v]){
							o_sub.prototype[v]=o_super.prototype[v];
						}
					}
				break;
				case 2:
					if(arg && arg.length > 0){//传构造参数
						o_super.apply(this,arg);
					}else{//无构造参数
						o_super.call(this);
					}
				break;
				

				default:
					alert('error： type 非法类型');

			}
			
			
		},
		/**
		 * 
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2015-3-27
		 * 修改日期：2015-3-27
		 * 名称：window.System.extend
		 * 功能：合并多个对象方法
		 * 说明：
		 * 注意： 
		 * @return  (Object) 合并后的对象 
		 * Example：
		 *		window.System.extend(A,B,C,D...);
		 */  
		'extend':function(){  
		    var paramsLen = arguments.length;  
		    if(paramsLen<1){  
		        return false;  
		    }  

		    var target = arguments[0];  
		    for(var i=1;i<paramsLen;++i){  
		        for(var j in arguments[i]){  
		            target[j] = arguments[i][j];  
		        }  
		    }  

		    return target;  
		},  

		 /**
		 * 
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2015-3-18
		 * 修改日期：2015-3-18
		 * 名称：window.System.extends_f
		 * 功能：在指定对象的原型链上动态扩充方法
		 * 说明：调用call方法改变this指针
		 * 注意：不调用call方法，就是在window.System对象上扩充方法
		 * @param   (Object)this 			NO NULL :指定对象
		 * @param   (String)name   			NO NULL :扩充的方法名称
		 * @param   (Function)fn 			NO NULL :方法原型
		 * @return  (Object) 返回扩充的对象
		 * Example：
		 *		在window.System.Basis 的原型上扩充一个set方法
		 *		window.System.extends_f.call(window.System.Basis,'set',function(){});
		 *		
		 *		在window.System 的原型上扩充一个set方法
		 *		window.System.extends_f('set',function(){});
		 *
		 */
		'extends_f':function(name,fn){
			this.prototype[name]=fn;
			return this;
		},



		/**
		 * 
		 * @author lhh
		 * 产品介绍：覆写方法
		 * 创建日期：
		 * 修改日期：
		 * 名称： window.System.override
		 * 功能：
		 * 说明： 
		 * 注意： 
		 * @param   (Function)old_fn 	 NO NULL : 
		 * @param 	(Function)new_fn     NO NULL :
		 * Example：
		 *		
		 */
		'override':function(old_fn,new_fn){
			var old=old_fn;
			old_fn=new_fn;
			return old;
		},




		 /**
		 *
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2014-11-27
		 * 修改日期：2014-11-27
		 * 名称：window.System.autoCenter
		 * 功能：元素自定垂直居中容器中间
		 * 说明：
		 * 注意：
		 * @param(Number) 		NO NULL : W  容器宽
		 * @param(Number) 		NO NULL : w  元素宽
		 * @param(Number) 		NO NULL : H  容器高
		 * @param(Number) 		NO NULL : h  元素高
		 * @param(Number) 		NULL 	: p  有padding值时 
		 * @return (Object) 返回居中位置的xy 坐标 	
		 * Example：
		 *		window.System.autoCenter(500,10,500,10,0);
		 */
		'autoCenter':function(W,w,H,h,p){
			p=p || 0;
			W=parseInt(W);
			w=parseInt(w);
			H=parseInt(H);
			h=parseInt(h);
			p=parseInt(p);
			if(!W || !w || !H || !h) return 0;
			return {'x':parseInt((W-w-p)/2),'y':parseInt((H-h-p)/2)};
		}
	};

	/**
	*
	* 对Date的扩展，将 Date 转化为指定格式的String 
	* 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
	* 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
	* 例子： 
	* (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
	* (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
	*
	*
	*/
	Date.prototype.Format = function(fmt) { //author: meizz 
	  var o = { 
	    "M+" : this.getMonth()+1,                 //月份 
	    "d+" : this.getDate(),                    //日 
	    "h+" : this.getHours(),                   //小时 
	    "m+" : this.getMinutes(),                 //分 
	    "s+" : this.getSeconds(),                 //秒 
	    "q+" : Math.floor((this.getMonth()+3)/3), //季度 
	    "S"  : this.getMilliseconds()             //毫秒 
	  }; 
	  if(/(y+)/.test(fmt)) 
	    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
	  for(var k in o) 
	    if(new RegExp("("+ k +")").test(fmt)) 
	  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length))); 
	  return fmt; 
	};


	String.prototype.trim=function(){//替换所有前后空格！
		return this.replace(/(^\s+)|\s+$/g,"");
	};

	/**
	 * 返回一个数组元素的下标，返回下标
	 * @param val
	 * @returns {Number}
	 */
	Array.prototype.indexOf=function(o){
		for(var i=0,len=this.length;i < len;i++){
			if(this[i] == o)
				return i;
		}
		return-1;
	};

	/**
	 * 返回一个数组元素的下标，返回下标
	 * @param val
	 * @returns {Number}
	 */
	Array.prototype.lastIndexOf=function(o){
		for(var i=this.length-1;i>=0;i--){
			if(this[i]==o)
				return i;
		}
		return-1;
	};

	/**
	 * 根据内容删除一个元素，返回数组
	 * @param val
	 */
	Array.prototype.remove = function(val) {    
		var index = this.indexOf(val);      
		if (index > -1)          
			this.splice(index, 1);    
	}; 
	/**
	 * 数组根据下标删除一个元素，返回一个删除后的数组
	 * @param n
	 * @returns
	 */
	Array.prototype.del=function(n) {  //n表示第几项，从0开始算起。
	    //prototype为对象原型，注意这里为对象增加自定义方法的方法。
	      if(n<0)  //如果n<0，则不进行任何操作。
	        return this;
	      else
	        return this.slice(0,n).concat(this.slice(n+1,this.length));
	        /*
	          concat方法：返回一个新数组，这个新数组是由两个或更多数组组合而成的。
	          　　　　　　这里就是返回this.slice(0,n)/this.slice(n+1,this.length)
	         　　　　　　组成的新数组，这中间，刚好少了第n项。
	          slice方法： 返回一个数组的一段，两个参数，分别指定开始和结束的位置。
	        */
	}
	 
	//添加一个数组包含的方法
	// Array.prototype.contains = function(obj) {
	//         var i = this.length;
	//         while(i--)
	// 			if (this[i] === obj)
	// 				return true;
	// 		return false;
	// } ;

	Array.prototype.contains=function(o){
		return this.indexOf(o) != -1;
	};

	Array.prototype.copy=function(o){
		return this.concat();
	};
	Array.prototype.insertAt=function(o,i){
		this.splice(i,0,o);
	};
	Array.prototype.insertBefore=function(o,o2){
		var i=this.indexOf(o2);
		if(i== -1)
			this.push(o);
		else 
			this.splice(i,0,o);
	};


	Array.prototype.removeAt=function(i){
		this.splice(i,1);
	};
	Array.prototype.remove=function(o){
		var i=this.indexOf(o);
		if(i!= -1)
			this.splice(i,1);
	};



	Function.READ=1;
	Function.WRITE=2;
	Function.READ_WRITE=3;
	//添加属性
	Function.prototype.addProperty=function(sName,nReadWrite){
		nReadWrite=nReadWrite||Function.READ_WRITE;
		var capitalized=sName.charAt(0).toUpperCase()+sName.substr(1);
		if(nReadWrite&Function.READ)
			this.prototype["get"+capitalized]=new Function("","return this._"+sName+";");
		if(nReadWrite&Function.WRITE)
			this.prototype["set"+capitalized]=new Function(sName,"this._"+sName+" = "+sName+";");
	};
	//函数在原型里定义一个方法
	Function.prototype.method=function(name,fn){
		this.prototype[name] = fn;
		return this;
	};



	//Documentation:
	/*------------------------------
		//要继承System.Drag这个类都要加这么一段
	    //如果有window.System.Drag这个类并且它下面的子类已经继承了这个类就不继承了
	   if(window.System && window.System.Drag ) {
	        if(!this.setBrowser){
	            window.System.Drag.call(this,dom,init);
	        }
	        //如果它下面的子类已经设置了浏览器就不再设置浏览器
	        if((typeof Browser  !='undefined') && Browser && !this.Browser) this.setBrowser(Browser);
	        
	    }else{
	        alter("Error: without System.Basis class");
	        return 0;
	    }
		
	------------------------------*/
		



	if(!window.System) {
		alert('without nothing the class of window.System');
		return 0;
	}
	
	/**
	 * 
	 * @author lhh
	 * 创建日期：2014/12/10
	 * 修改日期：2014/12/10
	 * 名称：private (Number) contains
	 * 功能：检查一个对象是否包含在另外一个对象中的方法，contains方法。MSIE和FireFox分别提供了检查的方法
	 * 注意：这个函数在IE中不支持,但文档上却写在在FF中原本为4的结果,在IE中为2
	 * 说明：ExtJS的源码用到的方法 
	 * @param   parentNode() 	NO NULL : 
	 * @param 	childNode()     NO NULL :  
	 * Example：
	 *		
	 */
	var contains=function(parentNode, childNode){
	    if (parentNode.contains) {
	        return parentNode != childNode && parentNode.contains(childNode);
	    } else {
	        return !!(parentNode.compareDocumentPosition(childNode) & 16);
	    }
	};
	/**
	 *
	 * @author lhh
	 * 产品介绍：
	 * 创建日期：2014.9.28
	 * 修改日期：2014.9.28
	 * 名称：private isType
	 * 功能：判断数据是什么类型的
	 * 说明：
	 * 注意：
	 * @param   (var)type 			NO NULL :
	 * 调用方式：this.isString('aaaa');
	 * Example：
	 */
	var isType=function(type) {
	  return function(obj) {
	    return Object.prototype.toString.call(obj) === "[object " + type + "]";
	  }
	};

	var __this__=null;
	function Basis(){
		__this__=this;
		this._super ={};
		this.reg={
			'email'   : /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
			'email_2' : /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
        	'phone'   : /^(13[0-9]{9})|(15[89][0-9]{8})$/
		};
		this.Browser=null;
		this.setBrowser=function(Browser){
			if(Browser && !this.Browser){
				this.Browser=Browser;
			}
		};

		

		
		this.isObject   	= isType("Object");
		this.isString   	= isType("String");
		this.isArrayI    	= Array.isArray || isType("Array");
		this.isFunction 	= isType("Function");

		/*-----------------------------*/

	}



	/*---------------------------------
	static mothed
	-------*/
	Basis.jQuery=function(url){
		!window.jQuery && document.write('<script src="'+url+'" type="text/javascript"><\/script>');
	};

	Basis.addFavorite=function(address,name){//添加到收藏夹（地址，关键字）
		if(window.external && ("addFavorite" in window.external)){//IE
			window.external.addFavorite(address,name);
		}else if(window.sidebar && window.sidebar.addPanel){//FF
			window.sidebar.addPanel(name,address,name);
		}else{
			alert("加入收藏失败，请按Ctrl+D进行添加");
		}
	};
	

	Basis.changeBgColor=function(dom_table,color){//(节点对象)表格每行鼠标移上去变色，移出恢复
		var table=dom_table;
		var tr=table.rows;
		for(var i=0,len=tr.length;i<len;i++){
			tr[i].onmouseover=function(){
				this.style.backgroundColor=color;
			};
			tr[i].onmouseout=function(){
				this.style.backgroundColor="";
			};
		}
	};

	/**
	 *
	 * @author lhh
	 * 产品介绍：
	 * 创建日期：2015-1-15
	 * 修改日期：2015-1-15
	 * 名称：window.System.Basis.fixEvt
	 * 功能：解决事件兼容问题
	 * 说明：
	 * 注意：
	 * @param   (event)event 			NO NULL :
	 * Example：
	 */
	Basis.fixEvt=function(event){//解决事件兼容问题
		var e = event || window.event || arguments.callee.caller.arguments[0];
		//解决mouseover与mouserout事件不停切换的问题（问题不是由冒泡产生的） 
		if("mouseover" == e.type){
			e.relatedTarget = e.fromElement;
		}else if("mouseout" == e.type){
			e.relatedTarget = e.toElement;
		}
		if(!e.target){//IE下没有下面的属性和方法，需要自定义下
			e.target = e.srcElement;
			e.layerX = e.offsetX;
			e.layerY = e.offsetY;
			e.pageX  = e.clientX+document.documentElement.scrollLeft;
			e.pageY  = e.clientY+document.documentElement.scrollTop;
			e.stopPropagation=function(){//停止事件冒泡方法
				e.cancelBubble=true;
			};
			e.preventDefault=function(){//阻止事件的默认行为，例如click <a>后的跳转
				e.returnValue=false;
			};
		}
		return e;
	};
	Basis.fixed_element=function($elem){
		if(!window.lly_befor_scrollTop) window.lly_befor_scrollTop=0;
		var scrollTop = $(document).scrollTop(),
			top=$elem.offset().top;
		
		if(scrollTop>0 || lly_befor_scrollTop<scrollTop){
			top=top+scrollTop;
			$elem.css('top',top);
			lly_befor_scrollTop=scrollTop;
		}else if(scrollTop<0 || lly_befor_scrollTop>scrollTop){
			top=top-scrollTop;
			$elem.css('top',top);
			lly_befor_scrollTop=scrollTop;
		}
	};


	//绑定事件的句柄
	Basis.handler=function(Event,functions){//哪个事件发生了？
		var evt=System.Basis.fixEvt(Event);
		//evt.type :当前 Event 对象表示的事件的名称
		var functions=functions[evt.type];//
		for(var i=0,len=functions.length;i<len;i++){
			if(functions[i]) 
				functions[i].call(this,evt);//call的方法起到一个对象冒充的作用（把指向window对象变成指向当前对象）
		}
	};
	//添加事件
	Basis.addEvent=function(obj,evt,fn){
		if("[object Opera]"==String(window.opera)){
			obj.addEventListener(evt,function(evt){
				evt.layerX=evt.offsetX;
				evt.layerY=evt.offsetY;
				fn.call(this,evt);
			},false);
		}else if(obj.addEventListener){
			obj.addEventListener(evt,fn,false);
		}else if(obj.attachEvent){
			obj.attachEvent("on"+evt,function(){
				fn.call(this);
			});
		}else{
			if(!obj.functions) obj.functions={};
			//检测有没有存储事件名的数组
			if(!obj.functions[evt]) obj.functions[evt] = [];
			var functions=obj.functions[evt];
			for(var i=0,len=functions.length;i < len; i++){
				if(functions[i] === fn) return obj;//判断之前是否有添加过要添加的事件监听函数
			}
			//没添加就把函数保存到数组中
			functions.push(fn);
			//fn.index=functions.length-1;
			if(__this__.isF(obj["on"+evt])){//检测是否已经注册过事件监听函数
				if(obj["on"+evt] != Basis.handler) 
					functions.push(obj["on"+evt]);//
			}
			obj["on"+evt]=function(){
				Basis.handler.call(this,functions);
			};
		}
		return obj;
	};
	
	
	 /**
	 * 
	 * @author lhh
	 * 创建日期：2014/12/10
	 * 修改日期：2014/12/10
	 * 名称：public (Number) System.Basis.contains
	 * 功能：检查一个对象是否包含在另外一个对象中的方法，contains方法。MSIE和FireFox分别提供了检查的方法
	 * 注意：这个函数在IE中不支持,但文档上却写在在FF中原本为4的结果,在IE中为2
	 * 说明：ExtJS的源码用到的方法 
	 * @param   parentNode() 	NO NULL : 
	 * @param 	childNode()     NO NULL :  
	 * Example：
	 *		
	 */
	Basis.contains=function(parentNode, childNode){
	    return contains(parentNode, childNode);
	};

	Basis.getRealStyle=function(o,key){//（对象，属性名）获取当前的style元素里的css属性值
		// var style;
		// if(window.getComputedStyle){//W3C
		// 	Style=window.getComputedStyle(obj,null);
		// }else if(obj.currentStyle){//IE
		// 	Style=obj.currentStyle;
		// }
		// return sytle[s];

		return o.currentStyle? o.currentStyle[key] : document.defaultView.getComputedStyle(o,false)[key];     
    	//document.defaultView.getComputedStyle 这是w3c标准方法，取得元素的样式信息，因为有些样式是在外部css文件定义的，所以用element.style是取不到的 如果是IE,可以用 element.currentStyle["name"] 
	};
	Basis.addRule=function(sheet,selector,cssText,i){//向指定样式表中添加一个CSS规则
		if(sheet.insertRule){//W3c
			sheet.insertRule(selector+"{"+cssText+"}",i);
		}else if(sheet.addRule){//IE
			sheet.addRule(selector,cssText,i);
		}
	};
	Basis.delRule=function(sheet,index){
		if(sheet.deleteRule){
			sheet.deleteRule(index);
		}else if(sheet.removeRule){
			sheet.removeRule(index);
		}
	};
	Basis.setLinkStyle=function(arg){//动态切换样式表
		/**
		{
			csslink:document.getElementById('dom'),
			url:"skin/style/css/",
			event:'onclick',
			color:
			...
		}
		*/
		for(i in arg){
			if("csslink"===i || "url"===i || "event"===i) {continue;}
			(function(i){
				arg[i][arg['event']]=function(){
					arg["csslink"].setAttribute("href",arg["url"]+i+".css");
				};
			})(i);
		}
	};

	/**
	 * 创建日期：2014/8/29
	 * 修改日期：2014/8/29
	 * 名称： getBodySize
	 * 功能：获取网页的宽度和高度
	 * @param 	String get   	需要的宽（w）或高（h）
	 * @param 	Numver n   		获取哪种方式 默认不用输入
	 * @param 	Boolean show   	是否在console.log()中打印出数据值调试 默认不打印，如要打印设为true
	 * @return  (Number | Array) 如果参数get存在，则返回相应宽或高，如果get没有写则返回数组
	 */
	Basis.getBodySize=function(get,n,show) {
	    var bodySize = [];
	    switch(n){
			case 1:
			  	if($(document.body).width()>$(window).width() && $(document.body).width()>$(document).width()){
			    	bodySize['w']=$(document.body).width();
			    }else if($(window).width()>$(document).width()){
					bodySize['w']=$(window).width();
			    }else{
			    	bodySize['w']=$(document).width();
			    }
			    

			    if($(document.body).height()>$(window).height() && $(document.body).height()>$(document).height()){
			    	bodySize['h']=$(document.body).height();
			    }else if($(window).height()>$(document).height()){
					bodySize['h']=$(window).height();
			    }else{
			    	bodySize['h']=$(document).height();
			    }
			    
			  break;
			default:
				bodySize['w']=($(document.body).width()>$(window).width())? $(document.body).width():$(window).width();
				bodySize['h']=($(document.body).height()>$(window).height())? $(document.body).height():$(window).height();
				
				
		}
		if(show){
			console.log('window:'+$(window).height() +'|document.body:'+$(document.body).height() +'|document:'+$(document).height()+'|bodySize[h]:'+bodySize['h']+'|bodySize:'+bodySize)
		}
		return get?bodySize[get]:bodySize;
	};



	/**
	* 创建日期：
	* 修改日期：
	* 名称：getViewWH
	* 功能：了解两个名词：BackCompat 标准兼容模式关闭（怪异模式）CSS1Compat 标准兼容模式开启
    *		这个方法为获取页面可视区域的高度，普通情况下，window.innerHeight 即可获取，如果是正常模式，并且有clientHeight的情况下， 
    *		document.documentElement.clientHeight 获取的就是可视区域高度。在怪异模式下，是使用document.body获取。
	* @param   (voide)
	* @return  (Object) 
	*
	*/
	Basis.getViewWH=function(){
		var wh = {};
		"Height Width".replace(/[^\s]+/g,function(a){
			var b = a.toLowerCase();
			wh[b]=window["inner".concat(a)] || document.compatMode ==="CSS1Compat" && document.documentElement["client".concat(a)] || document.body["client".concat(a)];
		});
		return wh;
	};
	
	/**
	* 创建日期：
	* 修改日期：
	* 名称： getBodyWH
	* 功能： 这个为获取页面的高度，用于iframe的自适应时候获取。
	* @param   (voide)
	* @return  (Object) 
	*/
	Basis.getBodyWH=function(){
		var wh = {};
		"Height Width".replace(/[^\s]+/g,function(a){
			var b = a.toLowerCase();
			wh[b]=document.compatMode ==="CSS1Compat" && document.documentElement["scroll".concat(a)] || document.body["scroll".concat(a)];
		});
		return wh;
	};

	/**
	 * 创建日期：2014-9-3
	 * 修改日期：2014-9-3
	 * 名称：(String) inputSizeGetProportion
	 * 功能：输入宽和高返回尺寸的比例
	 * 参数：Number $a
	 * 		 Number $b
	 * Example:
	 *		window.System.Basis.inputSizeGetProportion(1280,720);
	 *		w = 1280;
	 *		h = 720;
	 *		n = gcd(w, h);
	 *		echo w/n, ':', h/n; 
	 * 
	 */
	Basis.inputSizeGetProportion=function(w, h) {
	  var gcd=function($a,$b){
	  	if($a%$b){
		   return gcd($b, $a%$b);
		}else{
		   return $b;
		}
	  };
	  
	  var n=gcd(w,h);
	  return w/n+' : '+h/n;
	};
	
	/**
	 * 创建日期：2014-9-3
	 * 修改日期：2014-9-3
	 * 名称：(String) forSizeforSize
	 * 功能：输入1280px 参考尺寸返回一个什么样的宽度符合被平均分成3份并且符合 4:6 的一个尺寸
	 * 参数：Number a 
	 * 		 Number b
	 * 		 Number size
	 * 		 Number n
	 * Example:
	 *		window.System.Basis.forSize(4,6,1280,3);
	 *		return :1280被平分3份后能被4整除，width,height
	 * 
	 */
	Basis.forSize=function(a, b,size,n) {
	  	var w=h=0;
	  	while(true){
	  		if(0 === size%n && size !=0){
	  			//求出符合几比几的宽度
	  			w=size/n;
	  			if(0 === w%a){
	  				//求出符合几比几的高度
	  				h=(w/a)*b;
	  				return size+'被平分'+n+'份后能被'+a+'整除,得出最适合尺寸是：\
 						 W: ('+size+'/'+n+')='+w+'  \
						 H: ('+size+'/'+n+'/'+a+'*'+b+')='+h;
	  			}

	  		}
	  		size++;
	  	}

  	};

  	/**
	 * 创建日期：2014-9-3
	 * 修改日期：2014-9-3
	 * 名称：(Array) getToSize 
	 * 功能：输入开始尺寸到结束尺寸范围内获取几比几的一个比例下有多少组尺寸符合
	 * 参数：Number a 
	 * 		 Number b 
	 * 		 Number s 开始值
	 * 		 Number e 结束值
	 *
	 * Example:
	 *		window.System.Basis.getToSize(4,6,1280,15000);
	 * 
	 */
	Basis.getToSize=function(a, b,s,e) {
	  	if(!s) return;
	  	var arry=[];
	  	while(true){
	  		if(0 === s%a && s !=0){
	  			//arry.push({'w':s,'h':s/a*b});
	  			arry.push('{w:'+s+', h:'+(s/a*b)+'}');
	  		}
	  		if(s>e){
	  			return arry;
	  		}
	  		s++;
	  	}

  	};

  	/**
	 *
	 * @author lhh
	 * 产品介绍：
	 * 创建日期：2015-3-18
	 * 修改日期：2015-3-19
	 * 名称：window.System.Basis.extends
	 * 功能：继承Basis类
	 * 说明：Basis类静态方法。 调用call方法改变this指针
	 * 注意：调用必须用call方法
	 * @param   (Object)this 			NO NULL :子类对象
	 * @param   (Function)o_super   	NO NULL :父类名称 
	 * @param   (String)type 			NO NULL :1:原型链继承;默认2:对象冒充方式继承 
	 * @param   ([])arg 			   	   NULL :继承父类时传的构造参数
	 * @return  (void)
	 * Example：
	 *		window.System.Basis.extends.call(this,o_super,type,[a,b,c,...]);
	 */
	Basis.extends=function(o_super,type,arg) {
		o_super = o_super  || window.System.Basis;
		type 	  = type || 2;
		arg = arg || null;
	  /*------------------------------*/
		//要继承System.Basis这个类都要加这么一段
		//如果有window.System.Basis这个类并且它下面的子类已经继承了这个类就不继承了
		if(window.System && o_super ) {
			if(!this.setBrowser){
				window.System.extends.call(this,null,o_super,type,arg);
			}
			//如果它下面的子类已经设置了浏览器就不再设置浏览器
			// if(Browser && (typeof Browser  !='undefined') && !this.Browser) this.setBrowser(Browser);
			
		}else{
			alter("Error: without "+o_super);
			return 0;
		}
	  /*------------------------------*/
		 
	};


	Basis.prototype={
		'constructor': Basis,
		'__constructor':function(){},
		'each':function(a,fun){
			if(!a || !this.isF(fun)) 
				return;
			for(var i=0,len=a.length;i<len;i++)
				fun.call(a[i],i,a[i]);
		},
		
		/**
		 * 如果对象的属性的值还是一个对象的话就递归搜索，直到对象下的属性不是对象位置
		 * @ Obj : 对象
		 * @ fn : 回调的方法
		 */
		'list':function(Obj,fn){
			var k,v;
			if(!this.isO(Obj)) 
				return Obj;
			for(k in Obj){
				this.list(Obj[k],fn);
				if(this.isF(fn)){v=Obj[k];fn.call(Obj,k,v);}
			}
		},
		/**
		 * 
		 * 创建人：lhh
		 * 功能：输入一个下标索引返回对象的 value
		 * 名称：putIndexGetObjectTheValue
		 * 创建日期：2014.6.15
		 * 修改日期：2014.6.15
		 * @param(Object) 		NO NULL : Obj 
		 * @param(int) 			NO NULL : n 
		 * @return (var) 	
		 */
		'putIndexGetObjectTheValue':function(obj,n){
			//输入的一定是对象和数字
			if(this.isO(obj) && this.isNum(n)){
				//防止输入的下标大于对象的长度
				if(window.System.obj_len(obj) < n){
					return false;
				}else{
					var i=0;
					for(var key in obj){
						
						if(i==n){
							return obj[key];
						}else{
							i++;
						}
					}
				}

			}else{
				return false;
			}
			return false;
		},
		'$':function(id){return document.getElementById(id);},
		'isS':function(s){
			return !this.is_numeric(s) && ('string' === typeof s);
		},
		'isF':function(fn){return ('function'=== typeof fn);},
		'isO':function(obj){
			if(obj instanceof Object) return true;
			var flag=false;
			if('object'===typeof obj){
				for(var i in obj)
					return true;
			}else{
				flag=false;
			}
			return flag;
		},

		'isEmptyObject':function( obj ) {
			for ( var name in obj ) {
				return false;
			}
			return true;
		},

		'error':function( msg ) {
			throw new Error( msg );
		},

		'isset':function(s){return (typeof s != "undefined");},
		//检测是否是数字
		'is_numeric':function(n){
			return !isNaN(n);
		},
		'isArray':function(arr){
			return (arr.constructor === Array) || (arr instanceof Array) || (Object.prototype.toString.call(arr) === '[object Array]');
		},
		
		'empty':function(s) {
		    return !(this.isset(s) && String(s).trim() != '' && s != null);
		},
		
		'arr_isEmpty':function(arr){
		    if(this.isArray(arr)){
		    	if(!arr.length){
			    	return true
			    }else{
			    	return false; 
			    } 
		    }else{
		    	alert('这不是数组');
		    }
		    
		},
		'findClass':function(node,attName){
			for(var i=0,len=node.attributes.length;i<len;i++){
				if(node.attributes[i].nodeName==attName)
					return true;
			}
			return false;
		},
		//取消HTML代码
		'shtmlspecialchars':function($string) {
	        $unallowed = {
	                '&': '&',
	                '"': '"',
	                '<': '<',
	                '>': '>'
	        };
	        for($p in $unallowed){
	                 $string = $string.replace(eval('/'+$p+'/g'), $unallowed[$p]);
	        }
	        return $string;
		},
		
		'getStyle':function(obj,attr){
			if(obj.currentStyle){
				return obj.currentStyle[attr];
			}else{
				return getComputedStyle(obj,false)[attr];
			}
		},

		
		'addClass':function(obj,className){//给指定元素添加类名
			obj.className+=" "+className;
			return obj;
		},
		'delClass':function(obj,className){
			var s=obj.className.split(/\s+/);
			for(var i=0,len=s.length;i<len;i++){
				if(s[i]==className) {
					delete s[i];
				}
			}
			obj.className=s.join(" ");
			return obj;
		},

		'hasClass':function(node,classNames){//测试一个元素是否有多个类名
			var names=node.className.split(/\s+/);
			for(var i=0,len=names.length;i<len;i++){
				if(names[i]==classNames) {
					return true;
				}
			}
			return false;
		},


		/**
		 *
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2014-11-28
		 * 修改日期：2014-12-22
		 * 名称：[] getElementsByClass
		 * 功能：获取类名集合
		 * 说明：
		 * 注意：
		 * @param   (Dom)object 			NO NULL :dom节点
		 * @param   (String)tag 			NO NULL :标签名称
		 * @param   (String)className 		NO NULL :要查找的类名称
		 * Example：
		 */
		'getElementsByClass':function(object, tag, className){//获取类名集合
			var object = object || document,
				tag    = tag    || "*";
			if(object.getElementsByClassName)
				return object.getElementsByClassName(className);
			var tags=object.getElementsByTagName(tag);
			var ret=[];
			for(var i=0,len = tags.length; i < len;i++){
				if(this.hasClass(tags[i],className))
					ret.push(tags[i]);
			}
			if (1 === ret.length) 
				return ret[0];
			return ret;
		},

		
		/**
		 *
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2014-11-28
		 * 修改日期：2014-12-22
		 * 名称：[] getByClass
		 * 功能：获取类名集合
		 * 说明：
		 * 注意：
		 * @param   (String)s			NO NULL :class 名称
		 * @param   (String)p 			NO NULL :
		 * @param   (String)t 			NO NULL :
		 * Example：
		 */
		'getByClass':function(s,p,t){//使用class获取元素
			var reg=new RegExp('\\b'+s+'\\b');
			var aResult=[];
			var aElement=(p||document).getElementsByTagName(t || '*');

			for(var i=0;i<aElement.length;i++)
			{
				if(reg.test(aElement[i].className))
				{
					aResult.push(aElement[i])
				}
			}
			return aResult;
		},


		'css':function(obj,attr,value){//多个同名元素设置用同一样式
			if(undefined==obj.length){
				obj.style[attr]=value;
			}else{
				for(var i=0,len=obj.length;i<len;i++)
					obj[i].style[attr]=value;
			}
		},
		
		
		'getCookie':function(name){//获取Cookie
			var cookies=document.cookie.split("; ");
			for(var i=0,c,len=cookies.length;i<len;i++){
				c=cookies[i].split('=');
				if(c[0]==name) 
					return decodeURIComponent(c[1]);
			}
			return '';
		},
		/*
		filter all string return number of them
		过滤所有字符串返回数字
		Number filter_char(String s);
		---------------------------------*/
		'filter_char':function(s){return String(s).replace(/[^\d]*/ig,"");},
		

		'find_str':function(s){
			if(""===s) 
				return;
			return String(s).match(/[^\d]*/i);
		},
		
		'compare_two_str':function(s1,s2){
			if(s1=="" || s2=="") 
				return false;
			s1=String(s1).match(/[^\d]*/i);
			s2=String(s2).match(/[^\d]*/i);
			if(s1==s2)
				return true;
			else
				return false;
		},
		'swap':function(A,B){
			return [B,A];
		},
		
		
		'sort':function(a,b,fn){},

		/**
		 *
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2014-12-22
		 * 修改日期：2014-12-22
		 * 名称：每隔规定的时间数再去调用传进来的函数
		 * 功能：
		 * 说明：
		 * 注意：
		 * @param   (Function)fn 			NO NULL :
		 * @param   (Number)time 			NO NULL :
		 * Example：
		 */
		'sleep':function(fn,time){
		   
		   	if(this.isF(fn)) {
			   	time=time || 30;
			   	if(fn.timer){
			      clearTimeout(fn.timer);
			    }
			    fn.timer = setTimeout(fn, time);
			}else{
				return -1;
			}
		},

		/**
         *
         * @author lhh
         * 产品介绍：
         * 创建日期：2014-12-20
         * 修改日期：2014-12-20
         * 名称：queues
         * 功能：队列 
         * 说明：
         * 注意：
         * @param   (Array)arr          NO NULL :
         * @param   (Number)n           NO NULL :算时间差的值
         * @param   (Function)fn        NO NULL :
         * Example：
         */
        'queues':function(arr,n,fn){
           if(!this.isF(fn)) return -1;
           var time=0;
           for(var i=0,len=arr.length; i<len; i++){
                time = n*i;
                fn.call(arr[i],time,i);
                
            }
        },
		
		'getDocument_body':function(){
			return document.documentElement || document.body;
		},

		/**
         *
         * @author lhh
         * 产品介绍：
         * 创建日期：2014-12-25
         * 修改日期：2014-12-25
         * 名称：(Number) getScrollTop
         * 功能：获取滚动条距离顶端的距离
         * 说明：支持IE6 
         * 注意：
         * Example：
         */
		'getScrollTop':function(){
		        var scrollPos;  
		        if (window.pageYOffset){  
			        scrollPos = window.pageYOffset; 
			    }else if (document.compatMode && document.compatMode != 'BackCompat'){
				    scrollPos = document.documentElement.scrollTop; 
				}else if (document.body) {
					scrollPos = document.body.scrollTop;
				}   
		        return scrollPos;
		},
		/**
		 * 
		 * @author lhh
		 * 功能：窗口重新调整大小
		 * 名称：winResize 
		 * 创建日期：2014-11-28
		 * 修改日期：2014-11-28
		 * @param	        $div(jQuery obj) NO NULL : //被居中的容器
		 * @param(Object) 	fn(Function)        NULL : callBack 
		 * 调用方式：var lib=new  window.System.Basis();
		 				 lib.winResize($('div'),function(){
			             var size=window.System.autoCenter($(window).width(),this.width(),
																  $(window).height(),this.height(),100);
								this.css({'top':size.y+'px',
										 'left':size.x+'px'
										});
			        });
		 * 
		 */
		'winResize':function($div,fn){
			var run=function(){
				if(__this__.isF(fn)){
					fn.call($div,{'w':$(window).width(),'h':$(window).height()});
				}else{
					alert('缺少回调函数');
				}
				
			};
			$(window).resize(function() {
				run();
			});
			run();
			return run;
			

		},
		/**
		 * 创建日期：2014/12/1
		 * 修改日期：2014/12/1
		 * 名称：(vido) setFixed
		 * 功能：给元素设置固定样式
		 * @param	$div(jQuery obj) NO NULL : //被设置的元素
		 * @param 	fn(Function)        NULL : callBack 在scroll 时要执行的行为
		 * 		  
		 *			
		 */
		'setFixed':function($div,fn){
			if('fixed' != $div.css('position')){
				$div.css('position','absolute');
				$(window).scroll(function() {
					__this__.isF(fn) && fn();
					Basis.fixed_element($div);
				});
			}

		},

		/**
		 * 创建日期：2014/8/26
		 * 修改日期：2014/8/26
		 * 名称：(vido) setIEfixed
		 * 功能：IE 6,7固定位置
		 * 参数： $elem (jQuery obj)
		 *			
		 */
		'setIEfixed':function($elem){
			if(this.Browser != null && this.Browser != undefined && this.Browser.isIE6()){
				$elem.css('position','absolute');
				$(window).scroll(function() {
					$elem.animate({'top': $(document).scrollTop()},10);
					
						
				});
			}
		},
		'bind':function(obj,evt,fn){//给某个对象添加多个事件监听函数
			return Basis.addEvent(obj,evt,fn);
		},
		
		'unbind':function(obj,evt,fn){//删除事件监听
			if(obj.functions){
				var fns = obj.functions;
				if(fns != null){
					fns = fns[evt];
					if(fns != null){
						for(var i=0,len=fns.length; i<len ; i++){
							if(fns[i] === fn){
								delete fns[i];
							}
						}
					}
				}
			}
			return obj;
		},

		/**
		 * 创建日期：2014/11/28
		 * 修改日期：2014/11/28
		 * 名称：(vido) autoScreenCenter
		 * 功能：自动居中屏幕，回调函数可以不传，传过回调函数后就能在一个指定范围中垂直居中对齐
		 * @param	$div(jQuery obj) NO NULL : //被居中的容器
		 * @param 	padding(intger)     NULL : callBack 
		 * @param 	fn(Function)        NULL : callBack 自定义居中外围的容器
		 * 		  
		 *			
		 */

		'autoScreenCenter':function($div,pandding,fn){
			pandding=pandding || 0;
			if(!('fixed' === $div.css('position'))){
				$div.css('position','absolute');

			}
			var run=this.winResize($div,function($window){
				if(__this__.isF(fn)){
					fn.call($div,$window);
				}else{
					var size=window.System.autoCenter($window.w,this.width(),
												 $window.h,this.height(),pandding);
					this.css({'top':size.y+'px',
							 'left':size.x+'px'
							});
				}
				
			});
			
			if('fixed' != $div.css('position')){
				this.setFixed($div,run);
			}else{
				run=null;
			}
		},

		/**
		 *
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2014-12-22
		 * 修改日期：2014-12-23
		 * 名称：mousewheel
		 * 功能：鼠标滚轮事件注册
		 * 说明：dom 是滚动的范围区域
		 * 注意：这个功能只能在鼠标滚动时返回滚动的方向,和滚轮滚动判断方向的值
		 * @param   (Dom)dom 			NO NULL :dom节点对象
		 * @param   (Function)fn 		NO NULL :返回滚动方向
		 * Example：
		 */
		'mousewheel':function(dom,fn){
			//鼠标滚轮事件处理函数
			//direction 
			if(!dom) alert("dom 参数必填");
			var fnMouseWheel=function(e) {
			    var evt = System.Basis.fixEvt(e);
			    var wheelDelta = evt.wheelDelta || evt.detail; //鼠标滚动值，可由此判断鼠标滚动方向
			    if (wheelDelta == -120 || wheelDelta == 3 || wheelDelta < 0){
			    	fn.call(evt,{'direction':'down','wheelDelta':wheelDelta});
			    }else if (wheelDelta == 120 || wheelDelta == -3 || wheelDelta > 0){
			       fn.call(evt,{'direction':'up','wheelDelta':wheelDelta});
			    }
			};

			//if (dom.addEventListener) {  //for firefox
			    //dom.addEventListener("DOMMouseScroll", fnMouseWheel);
			    this.bind(dom,"DOMMouseScroll",fnMouseWheel);
			//}
			
			dom.onmousewheel = fnMouseWheel; // for other browser
		},




		/**
		 *
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2014-12-23
		 * 修改日期：2015-3-18
		 * 名称：extends
		 * 功能：动态继承对象
		 * 说明：
		 * 注意：在实例化Basis对象时调用此方法
		 * @param   (Object)sub 			NO NULL :
		 * @param   (Object)_super 			NO NULL :
		 * @return  (Object)						:返回继承完父类后的子类对象
		 * Example：
		 */
		'extends': function( sub,_super) {
		  var key, value;
		  for (key in _super ) {
		    value = _super[key];
		    if (null == sub[key]) {
		      sub[key] = value;
		    }
		  }
		  return sub;
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

	

	window.System.Basis=Basis;
})(window);









/**
 * @author lhh
 * 产品介绍：
 * 创建日期：2014-11-28
 * 修改日期：2014-11-28
 * 名称：
 * 功能：
 * 说明：
 * 注意：
 * @param   (String)param 			NO NULL :
 * @return   :
 * Example：
 */
