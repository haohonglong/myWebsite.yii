/**
 * my_libs 0.1 pre
 * 创建人：龙昊宏
 * 名称：基类
 * 功能：服务于调用类
 *			
 *	修改日期：2014/8/29	
 *
 * Copyright Software 
 * 
 * 
 */



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
}



String.prototype.trim=function(){//替换所有前后空格！
	return this.replace(/^\s+|\s+$/g,""); 
};

/**
 * 返回一个数组元素的下标，返回下标
 * @param val
 * @returns {Number}
 */
Array.prototype.indexOf = function(val) { 
    for (var i = 0; i < this.length; i++) 
    	if (this[i] == val) 
    		return i;  
	return -1;   
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
Array.prototype.contains = function(obj) {
        var i = this.length;
        while(i--)
			if (this[i] === obj)
				return true;
		return false;
} ;

if(!window.System) System={};

/**
Documentation:
	//要继承System.Basis这个类都要加这么一段
	//如果有window.System.Basis这个类并且它下面的子类已经继承了这个类就不继承了
	if(window.System && window.System.Basis ) {
		if(!this.setBrowser){
			window.System.Basis.call(this);
		}
		//如果它下面的子类已经设置了浏览器就不再设置浏览器
		if((typeof Browser  !='undefined') && Browser && !this.Browser) this.setBrowser(Browser);
		
	}else{
		alter("Error: without System.Basis class");
	}
	
====================================================================================================
*/

(function(window, undefined){
	if(!window.System) System={};
	function Basis(){
		var __this__=this;
		this.super ={};
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

		// if(!this.Browser){
		// 	alert("you need put an argument to setBrowser method!");
		// }

		this.each=function(a,fun){
			if(!a || !this.isF(fun)) 
				return;
			for(var i=0;i<a.length;i++)
				fun.call(a[i],i,a[i]);
		};
		
		/**
		 * 如果对象的属性的值还是一个对象的话就递归搜索，直到对象下的属性不是对象位置
		 * @ Obj : 对象
		 * @ fn : 回调的方法
		 */
		this.list=function(Obj,fn){
			var k,v;
			if(!this.isO(Obj)) 
				return Obj;
			for(k in Obj){
				this.list(Obj[k],fn);
				if(this.isF(fn)){v=Obj[k];fn.call(Obj,k,v);}
			}
		};
		
		

		/**
		 * 
		 * 创建人：龙昊宏
		 * 功能：输入一个下标索引返回对象的 value
		 * 名称：putIndexGetObjectTheValue
		 * 创建日期：2014.6.15
		 * 修改日期：2014.6.15
		 * @param(Object) 		NO NULL : Obj 
		 * @param(int) 			NO NULL : n 
		 * @return (var) 	
		 */
		this.putIndexGetObjectTheValue=function(obj,n){
			//输入的一定是对象和数字
			if(this.isO(obj) && this.isNum(n)){
				//防止输入的下标大于对象的长度
				if(window.System.length(obj) < n){
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
		};


		this.$=function(id){return document.getElementById(id);};
		this.toString=function(){};
		this.isS=function(s){return ('string'===typeof s);};
		this.isF=function(fn){return ('function'===typeof fn);};
		this.isO=function(obj){
			if(obj instanceof Object) return true;
			var flag=false;
			if('object'===typeof obj){
				for(var i in obj)
					return true;
			}else{
				flag=false;
			}
			return flag;
		};
		this.obj_isEmpty=function(obj){
		    for(var n in obj){return false} 
		    return true; 
		};
		this.isUndef=function(obj){return ("undefined"==typeof obj);};
		this.isNum=function(n){return ("Number"==typeof n);};
		this.isArray=function(arr){
			return (arr.constructor == Array) || (arr instanceof Array) || (Object.prototype.toString.call(arr) === '[object Array]');
		};
		
		this.isEmpty=function($obj) {
		    return !(String($obj) != '' && String($obj) != 'undefined');
		};
		
		this.findClass=function(node,attName){
			for(var i=0;i<node.attributes.length;i++){
				if(node.attributes[i].nodeName==attName)
					return true;
			}
			return false;
		};


		//取消HTML代码
		this.shtmlspecialchars=function($string) {
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
		};
		
		this.getStyle=function(obj,attr){
			if(obj.currentStyle){
				return obj.currentStyle[attr];
			}else if (window.getComputedStyle){
				return getComputedStyle(obj,false)[attr];
			}else{
				window.getComputedStyle = function (obj, attr) {
		            this.obj = obj;
		            this.getPropertyValue = function (attr) {
		                var re = /(\-([a-z]){1})/g;
		                if (attr === 'float') attr = 'styleFloat';
		                if (re.test(attr)) {
		                    attr = attr.replace(re, function () {
		                        return arguments[2].toUpperCase();
		                    });
		                }
		                return obj.currentStyle[attr] ? obj.currentStyle[attr] : null;
		            };
		            return this;
		        };
				
			}
		};

		
		this.addClass=function(obj,className){//给指定元素添加类名
			obj.className+=" "+className;
			return obj;
		};
		this.delClass=function(obj,className){
			var s=obj.className.split(/\s+/);
			for(var i=0;i<s.length;i++){
				if(s[i]==className) {
					delete s[i];
				}
			}
			obj.className=s.join(" ");
			return obj;
		};

		this.hasClass=function(node,classNames){//测试一个元素是否有多个类名
			var names=node.className.split(/\s+/);
			for(var i=0;i<names.length;i++){
				if(names[i]==classNames) {
					return true;
				}
			}
			return false;
		};
		this.getElementsByClass=function(object, tag, className){//获取类名集合
			return System.Basis.getElementsByClass(object, tag, className);
		};
		this.css=function(obj,attr,value){//多个同名元素设置用同一样式
			if(undefined==obj.length){
				obj.style[attr]=value;
			}else{
				for(var i=0;i<obj.length;i++)
					obj[i].style[attr]=value;
			}
		};
		
		
		this.getCookie=function(name){//获取Cookie
			var cookies=document.cookie.split("; ");
			for(var i=0,c;i<cookies.length;i++){
				c=cookies[i].split('=');
				if(c[0]==name) 
					return decodeURIComponent(c[1]);
			}
			return '';
		};
		
		
		
		
		/*----------------------------------
		filter all string return number of them
		过滤所有字符串返回数字
		Number filter_char(String s);
		---------------------------------*/
		this.filter_char=function(s){return String(s).replace(/[^\d]*/ig,"");};
		

		this.find_str=function(s){
			if(""===s) 
				return;
			return String(s).match(/[^\d]*/i);
		};
		
		this.compare_two_str=function(s1,s2){
			if(s1=="" || s2=="") 
				return false;
			s1=String(s1).match(/[^\d]*/i);
			s2=String(s2).match(/[^\d]*/i);
			if(s1==s2)
				return true;
			else
				return false;
		};
		this.swap=function(A,B){
			return [B,A];
		};
		
		
		this.sort=function(fn_info,a,key){
			if(!a) return;
			a.sort(function(x,y){
				var flag=0,n1,n2;
				if(__this__.isO(x) && __this__.isO(y) && __this__.isS(x[key]) && __this__.isS(y[key])){
					n1=__this__.filter_char(x[key]);
					n2=__this__.filter_char(y[key]);
				}else{
					n1=__this__.filter_char(x);
					n2=__this__.filter_char(y);
				}
				if(n1>n2){
					flag=1;
				}else if(n1<n2){
					flag=-1;
				}else{
					x.flag=y.flag=1;
					if(__this__.isF(fn_info)){
						fn_info.call(this,x[key]);
					}
					
				}
				return flag;
			});
		};

		this.bind=function(obj,evt,fn){//给某个对象添加多个事件监听函数
			if(obj.addEventListener){//对象检测
				if("[object Opera]"==String(window.opera)){
					obj.addEventListener(evt,function(evt){
						evt.layerX=evt.offsetX;
						evt.layerY=evt.offsetY;
						fn.call(this,evt);
					},false);	
				}else{
					obj.addEventListener(evt,fn,false);	
				}
				
			}else{
				
				if(!obj.functions) obj.functions={};
				if(!obj.functions[evt]) obj.functions[evt]=[];
				var functions=obj.functions[evt];
				for(var i=0;i<functions.length;i++){
					if(functions[i]===fn) return obj;//如果已经存在就返回
				}
				functions.push(fn);//把函数保存到数组中
				//fn.index=functions.length-1;
				if(this.isF(obj["on"+evt])){//检测是否已经注册过事件监听函数
					if(obj["on"+evt]!=__this__.handler) 
						functions.push(obj["on"+evt]);//
				}
				obj["on"+evt]=function(){
					__this__.handler();	
				};
			}
			return obj;
			
		};
		this.handler=function(e){//哪个事件发生了？
			var evt=System.Basis.fixEvt(e);
			var evtype=evt.type;
			var functions=this.bind().functions[evt];//有问题待检查
			for(var i=0;i<functions.length;i++){
				if(functions[i]) 
					functions[i].call(Basis,evt);//call的方法起到一个对象冒充的作用（把指向window对象变成指向当前对象）
			}
		};
		this.unbind=function(obj,evt,fn){//删除事件监听
			if(obj.functions){
				var fns=obj.functions;
				if(fns!=null){
					fns=fns[evt];
					if(fns !=null){
						for(var i=0;i<fns.length;i++){
							if(fns[i]==fn){
								delete fns[i];
							}
						}
					}
				}
			}
			return obj;
		};


		/**
		 *每隔规定的时间数再去调用传进来的函数
		 *
		 *
		 *(Function)	'fn':function(){}, 			:NO NULL
		 *(Number)		5000
		 *
		*/
		this.sleep=function(fn,time){
		   
		   	if(__this__.isF(fn)) {
			   	time=time || 30;
			   	if(fn.timer){
			      clearInterval(fn.timer);
			    }
			    fn.timer = setInterval(function(){fn();}, time);
			}else{
				return -1;
			}
		};
		
		this.getDocument_body=function(){
			return document.documentElement || document.body;
		};

		this.fixed_element=function($elem){
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

		this.autoScreenCenter=function($div,pandding){
			pandding=pandding || 0;
			$div.css('position','absolute');
			var run=function(){
				$div.css({	
							'top':parseInt(($(window).height()-$div.height()-pandding)/2)+'px',
							'left':parseInt(($(window).width()-$div.width()-pandding)/2)+'px'
						});
			};
			run();
			$(window).resize(function() {
				run();
			});
			$(window).scroll(function() {
				__this__.fixed_element($div);
				run();
			});
		};

		 /**
		 * 创建日期：2014/8/26
		 * 修改日期：2014/8/26
		 * 名称：(vido) setIEfixed
		 * 功能：IE 6,7固定位置
		 * 参数： $elem (jQuery obj)
		 *			
		 */
		this.setIEfixed=function($elem){
			if(this.Browser != null && this.Browser != undefined && this.Browser.isIE6()){
				$elem.css('position','absolute');
				$(window).scroll(function() {
					$elem.animate({'top': $(document).scrollTop()},10);
					
						
				});
			}
		};


		
		
	}



	/*-------------------------------------------------------------------
	static mothed
	---------------------------------------------------------------------------*/
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
	Basis.getElementsByClass=function(object, tag, className){//获取类名集合
		var object=object || document,
			tag=tag||"*";
		if(object.getElementsByClassName)
			return object.getElementsByClassName(className);
		var tags=object.getElementsByTagName(tag);
		var ret=[];
		for(var i=0;i<tags.length;i++){
			if(this.hasClass(tags[i],className))
				ret.push(tags[i]);
		}
		if (ret.length == 1) ret = ret[0];
		return ret;
	};

	
	Basis.changeBgColor=function(dom_table,color){//(节点对象)表格每行鼠标移上去变色，移出恢复
		var table=dom_table;
		var tr=table.rows;
		for(var i=0;i<tr.length;i++){
			tr[i].onmouseover=function(){
				this.style.backgroundColor=color;
			};
			tr[i].onmouseout=function(){
				this.style.backgroundColor="";
			};
		}
	};

	
	Basis.fixEvt=function(e){//解决事件兼容问题
		e = e || window.event;
		if("mouseover" == e.type){
			 e.relatedTarget = e.fromElement;
		}else if("mouseout" == e.type){
			e.relatedTarget = e.toElement;
		}
		if(!e.target){
			e.target=e.srcElement;
			e.layerX=e.offsetX;
			e.layerY=e.offsetY;
			e.pageX=e.clientX+document.documentElement.scrollLeft;
			e.pageY=e.clientY+document.documentElement.scrollTop;
			e.stopPropagation=function(){//停止事件冒泡方法
				e.cancelBubble=true;
			};
			e.preventDefault=function(){
				e.returnValue=false;
			};
		}
		return e;
	};
	Basis.getRealStyle=function(obj,s){//（对象，属性名）获取当前的style元素里的css属性值
		var style;
		if(window.getComputedStyle){//W3C
			Style=window.getComputedStyle(obj,null);
		}else if(obj.currentStyle){//IE
			Style=obj.currentStyle;
		}
		return sytle[s];
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


	

	window.System.Basis=Basis;
})(window);


window.System.main=function(Obj,fn){
	if(!fn) return;
	var Obj=Obj||this;
	if(fn){
		fn.call(Obj);
	}
};

window.System.length=function(obj){
	obj=obj||this;
	var n=0,i;
	for(i in obj) 
		n++;
	return n;
};
/**
 * 子类继承父类对象
 * @
 * @
 */
window.System.extends_o=function(obj_sub,obj_super,type){
	type=type || false;
	if('p'==type){
		for(var i in obj_super)
			obj_sub[i].prototype=obj_super[i];
	}else{
		obj_super.call(obj_sub);
	}
	
};
/**
 * 在对象中扩充指定的方法
 * @
 * @
 */
window.System.extends_f=function(obj,name,fn){
	obj.prototype[name]=fn;
};


/**
 * 覆写方法
 * @
 * @
 */
window.System.override_f=function(old_fn,new_fn){
	old_fn=new_fn;

};






(function(window,undefined){
	if(!window.System) System={};
	function Browser(){
		//要继承System.Basis这个类都要加这么一段
		//如果有window.System.Basis这个类并且它下面的子类已经继承了这个类就不继承了
		if(window.System && window.System.Basis ) {
			if(!this.setBrowser){
				window.System.Basis.call(this);
			}
		}else{
			alter("Error: without System.Basis class");
		}

		var __this__=this;
		this.where=function(){};
		this.isIE=function(){
			return !!window.ActiveXObject;
			//简短
			//return !-[1,];
			//浏览器检测
			//return /MSIE/.test(navigator.userAgent);
		};
		this.isIE6=function(){
			//if(!-[1,] && !window.XMLHttpRequest){
			if(this.isIE() && !window.XMLHttpRequest){
				return true;
			}else{
				return false;
			}
		};
		this.isIE7=function(){
			if(this.isIE() && !this.isIE6() && !this.isIE8()){
				return true;
			}else{
				return false;
			}
		};

		this.isIE8=function(){
			if(this.isIE() && !!document.documentMode){
				return true;
			}else{
				return false;
			}
		};

		
		this.innerSize=function(){//获取浏览器窗口视口宽度和高度
			return{
				width  : window.innerWidth  || document.documentElement.clientWidth,
				height : window.innerHeight || document.documentElement.clientHeight
			};
		};

		
		this.fixEvt=function(e){//解决事件兼容问题
			return System.Basis.fixEvt(e);
		};

		this.fixed=function(elem){//IE实现 css fixed
			var style = elem.style,
				dom = document.documentElement || document.body,
				top = parseInt(style.top);
			if(dom.scrollTop > 0 || old < dom.scrollTop){
				top=top+dom.scrollTop;
				style.top=top+"px";
				old=dom.scrollTop;
			}else if(dom.scrollTop < 0 || old > dom.scrollTop){
				top=top-dom.scrollTop;
				style.top=top+"px";
				old=dom.scrollTop;
			}
		};

		this.auto_center=function(pad,elem){
			var pad=pad||0,
				style=elem.style,
				top=parseInt(elem.offsetHeight),
				left=parseInt(elem.offsetWidth),
				h=parseInt(this.innerSize().height),
				w=parseInt(this.innerSize().width);
			style.top=(h-top-pad)/2+'px';
			style.left=(w-left-pad)/2+'px';
			if(this.isIE6()){
				this.fixed(elem);
			}else{
				style.position="fixed";
			}
		};
		
		this.showDialog=function(url){
			if(document.all){//IE   
			   feature="dialogWidth:300px;dialogHeight:200px;status:no;help:no";  
			   window.showModalDialog(url,null,feature);  
		   }else{  
			 //modelessDialog可以将modal换成dialog=yes  
			   feature ="width=300,height=200,menubar=no,toolbar=no,location=no,";  
			   feature+="scrollbars=no,status=no,modal=yes";    
			   window.open(url,null,feature);  
		   }  
		};


	}
	window.System.Browser=Browser;
})(window);


//运动框架
(function(window,jQuery,undefined){
	if(!window.System) System={};
	var $=jQuery;
	function Sport(Browser){
		var __this__=this;

		//要继承System.Basis这个类都要加这么一段
		//如果有window.System.Basis这个类并且它下面的子类已经继承了这个类就不继承了
		if(window.System && window.System.Basis ) {
			if(!this.setBrowser){
				window.System.Basis.call(this);
			}
			//如果它下面的子类已经设置了浏览器就不再设置浏览器
			if((typeof Browser  !='undefined') && Browser && !this.Browser) this.setBrowser(Browser);
			
		}else{
			alter("Error: without System.Basis class");
		}

		function Move(obj,oTarget,fn){
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
		}

		this.doMove=function (obj,oTarget,time,fn){
			var time=time||30;
			if(obj.timer){clearInterval(obj.timer);}
			obj.timer=setInterval(function(){Move(obj,oTarget,fn)},time);
		};


		this.startMove=function (obj,oTarget,time,fn){
			var time=time||30;
			if(obj.timer){clearInterval(obj.timer);}
			obj.timer=setInterval(function(){fn(obj,oTarget)},time);
		};




		/**
		 * 动画（对象，增量用对象方式传经来，开始值用对象方式传经来，时间）
		 * 
		 * 
		 */
	　　this.animation=function(obj,start,alter,dur){
			var linear=this.linear;
			var curTime=0;
			var t=setInterval(function(){
				if(curTime>=dur) clearInterval(t);
				for(var i in start){
					obj.style[i]=linear(start[i],alter[i],curTime,dur)+"px";
				}
				curTime+=50;
			},50);	
		};

		/**
		 * 优先用这个方法
		 * 
		 * 
		 */

		this.Animate=function(obj, json,time){
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
		};

		/**
		 * 动画（对象，{增量用对象方式传经来}，{开始值用对象方式传经来}，时间,函数）
		 * 
		 * 
		 */
		this.animation_A=function(obj,start,alter,dur,fx){
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
		};
		this.opacity=function(obj,opacity){//透明度（对象，透明度值）
			//var linear=this.linear;
			var setOpacity=this.setOpacity;
			var curTime=0;
			var t=setInterval(function(){
				if(curTime>=dur) clearInterval(t);
					obj.style=__this__.linear(start,alter,curTime,dur)+"px";
				curTime+=50;
			},50);	
		};
		this.setOpacity=function(obj,opacity){
			if(typeof obj.style.opacity=="string"){//FF
					obj.style.opacity=opacity/100;
			}else {//IE
				obj.style.filter="alpha(opacity="+opacity+")";
			}	
		};
		this.linear=function(start,alter,curTime,dur){//最简单的线性变化，即匀速运动
			return start+curTime/dur*alter;
		};
		this.quad=function(start,alter,curTime,dur){//加速变化
			return start+Math.pow(curTime/dur,2)*alter;
		};
		/**
		 * 动画（对象，样式属性，增量，开始值，结束值，时间）
		 * 
		 * 
		 */
		this.animation_B=function(obj,arrt,add,start,end,t){
			var saved=start;
			setInterval(function(){
				if(saved>=end) return;
				saved+=add
				obj.style[arrt]=saved+"px";					 
			},t);	
		};

	}
	window.System.Sport=Sport;
})(window,jQuery);


/**
 * 创建日期：2014-10-18
 * 修改日期：2014-10-22
 * 名称：Drag
 * 功能：1.自由拖拽
 		 2.鼠标点击某个区域 垂直滑动拖拽，或者水平滑动拖拽
 * 参数：(dom_node) dom,
 		 (Object)	init
 * Example:
 			getElementById('node'),{
					 			//拖拽方向
								(String)	'coord':'x'
								//允许拖拽的区域
								(dom_node)	'arear': getElementById('node')
								}
 *		
 * 
 */

(function(window,undefined){
	if(!window.System) System={};
	function Drag(dom,init){//实现鼠标拖动元素
		
		if(!dom) return this;

		//要继承System.Basis这个类都要加这么一段
		//如果有window.System.Basis这个类并且它下面的子类已经继承了这个类就不继承了
		if(window.System && window.System.Basis ) {
			if(!this.setBrowser){
				window.System.Basis.call(this);
			}
			//如果它下面的子类已经设置了浏览器就不再设置浏览器
			if((typeof Browser  !='undefined') && Browser && !this.Browser) this.setBrowser(Browser);
			
		}else{
			alter("Error: without System.Basis class");
		}

		var __this__=this;
		this.disX=0;
		this.disY=0;
		this.dom=dom;
		if(init.arear) this.arear=init.arear;
		if(init.coord) this.coord=init.coord;
		if(init.sport) this.sport=init.sport;
		this.fixEvt = System.Basis.fixEvt;
		this.dom.onmousedown=function(e){
			__this__.fnDown(e);
			return false;
		};

		this.fnDown=function(e){
			e = this.fixEvt(e);
			this.disX = e.clientX - this.dom.offsetLeft;
			this.disY = e.clientY - this.dom.offsetTop;
			e.stopPropagation(); 
			document.onmousemove=function(e){
				__this__.move(e);
			};
			document.onmouseup=function(){
				__this__.fnUp();
			};
		};

		this.move_level=function(e,l){
			__this__.dom.style.left = l+'px';
		};

		this.move_vertical=function(e,t){
			__this__.dom.style.top = t+'px';
		};

		this.move=function(e){
			e = this.fixEvt(e);
			var l=e.clientX-this.disX;
			var t=e.clientY-this.disY;
			switch(this.coord){
	            case 'x':
	            	return this.move_level(e,l,t);
				break;
	            case 'y':
					return this.move_vertical(e,t,l);
	            break;
	            default://自由拖拽
	              	this.free(l,t);
	        }

			
		};

		this.free=function(l,t){
			if(l<0){
				l=0;
			}else if(l>document.documentElement.clientWidth-this.dom.offsetWidth){
				l=document.documentElement.clientWidth-this.dom.offsetWidth;
			}

			if(t<0){
				t=0;
			}else if(t>document.documentElement.clientHeight-this.dom.offsetHeight){
				t=document.documentElement.clientHeight-this.dom.offsetHeight;
			}
          	this.dom.style.left = l+'px';
			this.dom.style.top  = t+'px';
		};

		this.fnUp=function(){
			document.onmousemove=null;
			document.onmouseup=null;
		};
		
	}


	
	window.System.Drag=Drag;
	
})(window);





/**
 * 名称：弹出层
 * 功能：可自动居中且兼容IE6
 * Example:
 * 	pop=new System.PopupLayer('.sectionFixed-A1','.sectionMask-A2','1');
 *	$dom=$(pop.popLayout);
 *	$mask=$(pop.mask);
 *	pop.isIE().resize().setCenter().closed($('.sectionBox-B7 .icon'),function(){
 *		$mask.hide();
 *		$dom.hide();
 *	});
 */
(function(window,$){
	if(!window.System) System={};
	function PopupLayer(popLayout,mask,padding,Browser){
		var __this__=this;
		var old=0;
		this.padding=padding||40;
		this.popLayout=popLayout;
		this.mask=mask;

		//要继承System.Basis这个类都要加这么一段
		//如果有window.System.Basis这个类并且它下面的子类已经继承了这个类就不继承了
		if(window.System && window.System.Basis ) {
			if(!this.setBrowser){
				window.System.Basis.call(this);
			}
			//如果它下面的子类已经设置了浏览器就不再设置浏览器
			if((typeof Browser  !='undefined') && Browser && !this.Browser) this.setBrowser(Browser);
			
		}else{
			alter("Error: without System.Basis class");
		}
		
		
		this.setCenter=function(){
			var h=$(window).height();
			var w=$(window).width();
			var pop=$(this.popLayout);
			pop.css({'top':parseInt((h-pop.height()-this.padding)/2)+'px',
					'left':parseInt((w-pop.width()-this.padding)/2)+'px'
					});
			return this;
		};
		this.isIE=function(){
			if(window.ActiveXObject){//IE
				if(window.ActiveXObject && !window.XMLHttpRequest){//this is IE6
					var pop=$(this.popLayout);
					pop.css('position','absolute');
					$(this.mask).css({'position':'absolute',
									'top':0,
									'bottom':0,
									'height':'auto'
									});
					window.onscroll=function(){
						__this__.setCenter();
						__this__.fixed(pop[0]);
					};
				}
			}
			return this;
		};
		this.getDocument_body=function(){
			return document.documentElement || document.body;
		};

		this.fixed=function(elem){
			var style = elem.style,
				dom = this.getDocument_body(),
				top=parseInt(style.top);
			if(dom.scrollTop>0 || old<dom.scrollTop){
				top=top+dom.scrollTop;
				style.top=top+"px";
				old=dom.scrollTop;
			}else if(dom.scrollTop<0 || old>dom.scrollTop){
				top=top-dom.scrollTop;
				style.top=top+"px";
				old=dom.scrollTop;
			}
		};
		this.resize=function(){
			$(window).resize(function(){__this__.setCenter();});
			return this;
		};
		this.popLayer_text=function(obj){
			/**
				{
					'div_class_pop_wrap_name':'section sectionPopupLayer-A1',
					'div_class_colose_name':'close',
					'div_title_name':'标题类名称',
					'div_content_name':'content',
					'more':'更多>>',
					'title':'标题',
					'content':'内容',
					'select':0

				}

			*/
			var container='';
			switch(obj['select']){
				case 0:
				  	container +='<div class="'+obj["div_class_PopupLayer_wrap_name"]+'">';
					container +=	'<div class="'+obj["div_class_colose_name"]+'"></div>';
					container +=	'<div class="p10">';
					container +=		'<div class="content">';
					container +=			'<div class="'+obj["div_title_name"]+'">';
					container +=				'<h2>'+obj["title"]+'</h2>';
					if(obj["more"]){
					container +=				'<div class="more">'+obj["more"]+'</div>';
					}
					container +=			'</div>';
					container +=			'<div class="'+obj["div_content_name"]+'"><div class="p15">'+obj["content"]+'</div></div>';
					container +=		'</div>';
					container +=	'</div>';
					container +='</div>';
				  break;


				default:
				 
			}
			
			
			return container;
		};
		this.closed=function(obj,fn){
			obj.live('click',function(){
				fn.call(this);
			});
		};

		this.append=function(obj,nodes){
			obj.append(nodes);
		};
		this.empty=function(){
			$(this.popLayout).empty();
		};


	}

	window.System.PopupLayer=PopupLayer;
	
})(window,jQuery);




(function(window,$,undefined){//
		if(!window.System) System={};

		/**
		 * 创建日期：
		 * 修改日期：2014-5-29 
		 * 功能描述：
		 *			tabs 功能
		 *			表格每行鼠标移上去变色，移出恢复
		 *			
		 *			
	 	 *         
		 *
		 * 名称：(Object) toggle_menu
		 * 功能：多菜单切换
		 * 参数： {	(jquery Object no null) 'list' :$('a'),
		 *			(String no null) 		'event':'hover', | ['hover','click']
		 *			(jquery Object) 		'temp' :$('#first'),
		 *			(String no null) 		'class':'name',
		 *			(jquery Object) 		'block':$('sectionBlock-A1'),
		 *			(function null)			'fn'   :function(){}
		 *			}
		 */	
        function Tab(Browser){
			
			//要继承System.Basis这个类都要加这么一段
			//如果有window.System.Basis这个类并且它下面的子类已经继承了这个类就不继承了
			if(window.System && window.System.Basis ) {
				if(!this.setBrowser){
					window.System.Basis.call(this);
				}
				//如果它下面的子类已经设置了浏览器就不再设置浏览器
				if((typeof Browser  !='undefined') && Browser && !this.Browser) this.setBrowser(Browser);
				
			}else{
				alter("Error: without System.Basis class");
			}
			var __this__=this;

			var select_event=function(cur,eve){
				switch(eve){
					case 'hover':
						cur['list'][eve](function(){
							$(this).addClass(cur['class']);
						},function(){
							if(cur['temp'] && $(this)[0]!=cur['temp'][0]){//只有不是当前选中的才能做下面的事情
								$(this).removeClass(cur['class'])
							}
						});

					break;
					
					case 'click':
						cur['list'][eve](function(){
								//cur['or'] 为 true 时当前选中的按钮点击后仍触发事件。默认是如果在当前选中的按钮上再次单击不触发任何事件
								var doif=cur['or'] ? (cur['temp'] || $(this)[0]!=cur['temp'][0]) : (cur['temp'] && $(this)[0]!=cur['temp'][0]);
								cur.cur_even_this=this;
								if(doif) __this__.doit(cur);
							});
					break;

					default:
						cur['list'][cur['event'][eve]](function(){
									//cur['or'] 为 true 时当前选中的按钮点击后仍触发事件。默认是如果在当前选中的按钮上再次单击不触发任何事件
									var doif=cur['or'] ? (cur['temp'] || $(this)[0]!=cur['temp'][0]) : (cur['temp'] && $(this)[0]!=cur['temp'][0]);
									cur.cur_even_this=this;
									if(doif) __this__.doit(cur);
								});

				}

			};

			var Excu_event=function(cur){
				
				if(__this__.isArray(cur['event'])){
					for(var i=0;i<cur['event'].length;i++){
						select_event(cur,cur['event'][i]);
						
					}

				}else{
					var arr=cur['event'].split(",");
					if(arr.length > 1){
						for(var i=0;i<arr.length;i++){
							select_event(cur,arr[i]);
							
						}
						
					}else{
						if(cur['live']){
							cur['list'][cur['live']](cur['event'],function(event){
								
								//cur['or'] 为 true 时当前选中的按钮点击后仍触发事件。默认是如果在当前选中的按钮上再次单击不触发任何事件
								var doif=cur['or'] ? (cur['temp'] || $(this)[0]!=cur['temp'][0]) : (cur['temp'] && $(this)[0]!=cur['temp'][0]);
								cur.cur_even_this=this;
								if(doif) __this__.doit(cur,event);
								event.stopPropagation(); 
							},cur['event']=='hover' && !cur['hover']?function(){cur['temp'].removeClass(cur['class'])}:null);//当鼠标事件为hover 同时 hover 没有设定 ture 时 鼠标离开时除去移入添加的样式
						}else{
							cur['list']['unbind'](cur['event']);
							cur['list'][cur['event']](function(event){
							
								//cur['or'] 为 true 时当前选中的按钮点击后仍触发事件。默认是如果在当前选中的按钮上再次单击不触发任何事件
								var doif=cur['or'] ? (cur['temp'] || $(this)[0]!=cur['temp'][0]) : (cur['temp'] && $(this)[0]!=cur['temp'][0]);
								cur.cur_even_this=this;
								if(doif) __this__.doit(cur,event);
								event.stopPropagation(); 
							},cur['event']=='hover' && !cur['hover']?function(){cur['temp'].removeClass(cur['class'])}:null);//当鼠标事件为hover 同时 hover 没有设定 ture 时 鼠标离开时除去移入添加的样式
						}
					}
				}
			};

			this.doClass=function(cur){
				var cur=cur || this.cur;
				if(__this__.isS(cur['class'])){
					cur['temp'].removeClass(cur['class']);
					$(cur.cur_even_this).addClass(cur['class']);

				}else if(__this__.isArray(cur['class'])){
					var arr=cur['class'];
					for(var i=0;i<arr.length;i++){
						cur['temp'].removeClass(arr[i]);
						$(cur.cur_even_this).addClass(arr[i]);
					}
				}else if(__this__.isO(cur['class'])){
					if(cur['class']['remove']){
						var arr=cur['class']['remove'];
						for(var i=0;i<arr.length;i++){
							$(cur.cur_even_this).removeClass(arr[i]);
						}
					}else if(cur['class']['add']){
						var arr=cur['class']['add'];
						for(var i=0;i<arr.length;i++){
							$(cur.cur_even_this).addClass(arr[i]);
						}
					}

				}
				
			};

			this.doit=function(cur,event){
				var cur=cur || this.cur;
				var temp=cur['temp'];
				if(cur['class']){
					__this__.doClass(cur);
				}
				cur['temp']=$(cur.cur_even_this);
				if(__this__.isF(cur['fn'])){
					cur['fn'].call(cur.cur_even_this,{
										'temp':temp,
										'temp_index':temp.index(),
										'current':cur,
										'event':event,
										'cur_even_this':$(cur.cur_even_this),
										'this_index':$(cur.cur_even_this).index()
									});
				}
			};
			this.run=function(cur){
				this.cur=cur;
				cur['temp']=cur['temp'] ? cur['temp'] : $(cur['list'][0]);
				if(cur['list']){
					if(cur['event']){//有事件时
						
						Excu_event(cur);
					}else{//没事件时
						
						cur['list']['each'](function(){
							cur.cur_even_this=this;
							__this__.doit(cur);

						});
						
					}
				}
				
				return cur;
			};


			

			
			
		}
		
		window.System.Tab=Tab;
})(window,jQuery);



(function(window,jQuery,undefined){
	if(!window.System) System={};
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
		
		var __this__=this;
		//要继承System.Basis这个类都要加这么一段
		//如果有window.System.Basis这个类并且它下面的子类已经继承了这个类就不继承了
		if(window.System && window.System.Basis ) {
			if(!this.setBrowser){
				window.System.Basis.call(this);
			}
			//如果它下面的子类已经设置了浏览器就不再设置浏览器
			if((typeof Browser  !='undefined') && Browser && !this.Browser) this.setBrowser(Browser);
			
		}else{
			alter("Error: without System.Basis class");
		}

		this.init=init;
		this.slide=null;
		this.move=function(len,position){
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

		};
		
		this.click=function(eve,fn){
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
		};
		this.next=function(){
			this.invoke(++init.flag);
			
		};
		this.pre=function(){
			if(init.flag>0){
				this.invoke(--init.flag);
			}
		};
		
		this.auto=function($elem,fn){
			var time=init.time || 5000;
			if($elem){
				$elem.hover(function(){
					__this__.clearAuto();
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
		};
		this.start=function(){
			this.auto(null);
		};
		this.clearAuto=function(){
			clearInterval(this.slide);
		};
		this.stop=this.clearAuto;
		this.invoke=function(n){//跳转到第几步
			init.flag=n;
			if(init.flag>=0 && (init.imglen-init.number)>=init.flag){
				this.move(-(init.size)*init.flag);
				
			}else{
				return 0;
			}
			
		};
		this.jump_start=function(){
			this.invoke(0);
		};
		

		this.jump_end=function(){
			if(init.imglen < init.number) return;
			this.invoke(init.imglen-init.number);
		};
		this.run=function(fn){
			if(init.event){
				this.click(init.event,fn);	
			}
			if(init.$autoHandler){
				this.auto(init.$autoHandler);
			}
			return this;
		};
		this.getInit=function(){
			return init;
		};

		
	}
	window.System.Slider=Slider;
})(window,jQuery);











