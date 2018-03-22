
/**
 * LamborghiniJS 0.3 pre
 * 创建人：lhh
 * 创建日期:2015/7/22	
 * 修改日期:2015/7/23	
 * 名称：帮助类
 * 功能：服务于基于jQuery 的类
 * 说明 : 
 *        
 * note : 
 * 		  
 *		
 * 
 */
(function(window,jQuery,undefined,System){
	if(!System) {
		alert('without nothing the class of System');
		return 0;
	}
	var __this__=null;
	var $=jQuery;
	var document=window.document;
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
	/*---------------------------------
	Basis static mothed
	-------*/

	/**
	 * 
	 * @author lhh
	 * 创建日期：2014/12/10
	 * 修改日期：2014/12/10
	 * 名称：public (Number) MySystem.Basis.contains
	 * 功能：检查一个对象是否包含在另外一个对象中的方法，contains方法。MSIE和FireFox分别提供了检查的方法
	 * 注意：这个函数在IE中不支持,但文档上却写在在FF中原本为4的结果,在IE中为2
	 * 说明：ExtJS的源码用到的方法 
	 * @param   parentNode() 	NO NULL : 
	 * @param 	childNode()     NO NULL :  
	 * Example：
	 *		
	 */
	System.Basis.contains=function(parentNode, childNode){
	    return contains(parentNode, childNode);
	};
	System.Basis.jQuery=function(src){
		!window.jQuery && document.write('<script src="'+src+'" type="text/javascript"><\/script>');
	};
	System.Basis.printScript=function(src){
		document.write('<script src="'+src+'" type="text/javascript"><\/script>');
	};
	/**
	 *
	 * @author lhh
	 * 产品介绍：
	 * 创建日期：2015-1-15
	 * 修改日期：2015-1-15
	 * 名称：window.MySystem.Basis.fixEvt
	 * 功能：解决事件兼容问题
	 * 说明：
	 * 注意：
	 * @param   (event)event 			NO NULL :
	 * Example：
	 */
	System.Basis.fixEvt=function(event){//解决事件兼容问题
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
	System.Basis.addFavorite=function(address,name){//添加到收藏夹（地址，关键字）
		if(window.external && ("addFavorite" in window.external)){//IE
			window.external.addFavorite(address,name);
		}else if(window.sidebar && window.sidebar.addPanel){//FF
			window.sidebar.addPanel(name,address,name);
		}else{
			alert("加入收藏失败，请按Ctrl+D进行添加");
		}
	};
	

	System.Basis.changeBgColor=function(dom_table,color){//(节点对象)表格每行鼠标移上去变色，移出恢复
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
	System.Basis.getRealStyle=function(o,key){//（对象，属性名）获取当前的style元素里的css属性值
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
	System.Basis.addRule=function(sheet,selector,cssText,i){//向指定样式表中添加一个CSS规则
		if(sheet.insertRule){//W3c
			sheet.insertRule(selector+"{"+cssText+"}",i);
		}else if(sheet.addRule){//IE
			sheet.addRule(selector,cssText,i);
		}
	};
	System.Basis.delRule=function(sheet,index){
		if(sheet.deleteRule){
			sheet.deleteRule(index);
		}else if(sheet.removeRule){
			sheet.removeRule(index);
		}
	};
	System.Basis.setLinkStyle=function(arg){//动态切换样式表
		/**forexample:
		{
			'csslink':document.getElementById('dom'),
			'url':"skin/style/css/",
			'event':'onclick',
			'skin1':$('dom')
			
		}
		*/
		var key;
		var set=function(key){
			arg[key][arg['event']]=function(){
				arg["csslink"].setAttribute("href",arg["url"]+key+".css");
			};
		};
		for(key in arg){
			if("csslink"===key || "url"===key || "event"===key) {continue;}
			set(key);
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
	System.Basis.getBodySize=function(get,n,show) {
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
	System.Basis.getViewWH=function(){
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
	System.Basis.getBodyWH=function(){
		var wh = {};
		"Height Width".replace(/[^\s]+/g,function(a){
			var b = a.toLowerCase();
			wh[b]=document.compatMode ==="CSS1Compat" && document.documentElement["scroll".concat(a)] || document.body["scroll".concat(a)];
		});
		return wh;
	};
	System.Basis.fixed_element=function($elem){
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
	System.Basis.handler=function(Event,functions){//哪个事件发生了？
		var evt=System.Basis.fixEvt(Event);
		//evt.type :当前 Event 对象表示的事件的名称
		var functions=functions[evt.type];//
		for(var i=0,len=functions.length;i<len;i++){
			if(functions[i]) 
				functions[i].call(this,evt);//call的方法起到一个对象冒充的作用（把指向window对象变成指向当前对象）
		}
	};
	//添加事件
	System.Basis.addEvent=function(obj,evt,fn){
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
				if(obj["on"+evt] != System.Basis.handler) 
					functions.push(obj["on"+evt]);//
			}
			obj["on"+evt]=function(){
				System.Basis.handler.call(this,functions);
			};
		}
		return obj;
	};
	function Helper(){
		System.Basis.extends.call(this);
		__this__=this;
		
		
		
	}
	Helper.prototype = {
		'constructor':Helper,
		'$':function(id){return document.getElementById(id);},
		/**
         * @author lhh
         * 产品介绍：
         * 创建日期：2015-6-25
         * 修改日期：2015-6-25
         * 名称：get_url_Param
         * 功能：获取url指定的参数
         * 说明：
         * 注意：
         * @param   (String)name            NO NULL :参数名称
         * @return  String
         *
         */
        'get_url_Param':function(name){
            var search = document.location.search;
            var pattern = new RegExp("[?&]"+name+"\=([^&]+)", "g");
            var matcher = pattern.exec(search);
            var items = null;
            if(null != matcher){
                try{
                    items = decodeURIComponent(decodeURIComponent(matcher[1]));
                }catch(e){
                    try{
                        items = decodeURIComponent(matcher[1]);
                    }catch(e){
                        items = matcher[1];
                    }
                }
            }
            return items;
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
			if(object.getElementsByClassName){
				return object.getElementsByClassName(className);
			}
			var tags=object.getElementsByTagName(tag);
			var ret=[];
			for(var i=0,len = tags.length; i < len;i++){
				if(this.hasClass(tags[i],className))
					ret.push(tags[i]);
			}
			
			// if (1 === ret.length){//如果只有一个就直接返回节点元素
			//   return ret[0];
			// }

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
		/**
		 * 
		 * @author lhh
		 * 功能：窗口重新调整大小
		 * 名称：winResize 
		 * 创建日期：2014-11-28
		 * 修改日期：2014-11-28
		 * @param	        $div(jQuery obj) NO NULL : //被居中的容器
		 * @param(Object) 	fn(Function)        NULL : callBack 
		 * 调用方式：var lib=new  window.MySystem.Basis();
		 				 lib.winResize($('div'),function(){
			             var size=window.MySystem.autoCenter($(window).width(),this.width(),
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
					System.Basis.fixed_element($div);
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
					var size=MySystem.autoCenter($window.w,this.width(),
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
			    var evt = Basis.fixEvt(e);
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
	System.extends(Helper,System.Basis,1);
	System['Helper']=Helper;
})(window,jQuery,undefined,window[LHH_NAMESPACE_20150715_]);
