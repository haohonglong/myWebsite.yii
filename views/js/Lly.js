(function(window,undefined){
	var document = window.document,
		navigator = window.navigator,
		location = window.location,
		lg=function() {
			return new Lly();
		},
		_namespace={},
		_lg=window.lg;
		
		lg.ns=function(name,value){
			var names=name.split("."),Obj=window;
			for(var i=0;i<names.length-1;i++){
				if(!Obj[names[i]]) Obj[names[i]]={};
				Obj=Obj[names[i]];
			}
			_namespace=Obj[names[i]];
			Obj[names[i]]=value;
		},
		toString=Object.prototype.toString,
		hasOwnProperty=Object.prototype.hasOwnProperty,
		push=Array.prototype.push,
		slice=Array.prototype.slice,
		indexOf=Array.prototype.indexOf;
		
		function Lly(){
				
		}
	Lly.prototype={
			toArray:function(){
				return slice.call(this,0);
			},
			get:function(num){
				return num==null?
				this.toArray():
				(num<0?this.slice(num)[0]:this[num]);
			},
			trim:function(s){
				return s.replace(/[ ]/g,""); //替换所有空格！
			},
			changeBgColor:function(id,color){//表格每行鼠标移上去变色，移出恢复
				var table=document.getElementById(id);
				var tr=table.rows;
				for(var i=0;i<tr.length;i++){
					tr[i].onmouseover=function(){
						this.style.backgroundColor=color;
					};
					tr[i].onmouseout=function(){
						this.style.backgroundColor="";
					};
				}
			},
			filterSpaceNode:function(nodes){//过滤元素中包含的所有空白节点
				var ret=[];
				for(var i=0;i<nodes.length;i++){
					if(nodes[i].nodeType===3 && /^\s+$/.test(nodes[i].nodeValue)) continue;//查找是否是文本节点且有空格
					ret.push(nodes[i]);
				}
				return ret;
			},
			getClass:function(className,context,tag){//获取类名集合
				var context=context || document,
					tag=tag||"*";
				if(context.getElementsByClassName){
					return context.getElementsByClassName(className);
				}
				var tags=context.getElementsByTagName(tag);
				var ret=[];
				for(var i=0;i<tags.length;i++){
					if(this.hasClass(tags[i],className)){
						ret.push(tags[i]);
					}
				}
				return ret;
			},
			hasClass:function(node,classNames){//测试一个元素是否有多个类名
				var names=node.className.split(/\s+/);
				for(var i=0;i<names.length;i++){
					if(names[i]==classNames) {
						return true;
					}
				}
				return false;
			},
			css:function(obj,attr,value){//多个同名元素设置用同一样式
				if(undefined==obj.length){
					obj.style[attr]=value;
				}else{
					for(var i=0;i<obj.length;i++){
						obj[i].style[attr]=value;
					}
				}
			},
			addEvent:function(obj,evt,fn){//给某个对象添加多个事件监听函数
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
					return obj;
				}
				
				if(!obj.functions) obj.functions={};
				if(!obj.functions[evt]) obj.functions[evt]=[];
				var functions=obj.functions[evt];
				for(var i=0;i<functions.length;i++){
					if(functions[i]===fn) return obj;//如果已经存在就返回
				}
				functions.push(fn);//把函数保存到数组中
				//fn.index=functions.length-1;
				if(typeof obj["on"+evt]=="function"){//检测是否已经注册过事件监听函数
					if(obj["on"+evt]!=this.handler) functions.push(obj["on"+evt]);//
				}
				obj["on"+evt]=this.handler;
				return obj;
				
			},
			handler:function(){//哪个事件发生了？
				var evt=this.fixEvt(window.event);
				var evtype=evt.type;
				var functions=Lly.addEvent.obj.functions[evt];
				for(var i=0;i<functions.length;i++){
					if(functions[i]) functions[i].call(this,evt);//call的方法起到一个对象冒充的作用（把指向window对象变成指向当前对象）
				}
			},
			fixEvt:function(evt){//解决事件兼容问题
				evt=evt||window.event;
				if("mouseover"==evt.type){
					 evt.relatedTarget=evt.fromElement;
				}else if("mouseout"==evt.type){
					evt.relatedTarget=evt.toElement;
				}
				if(!evt.target){
					evt.target=evt.srcElement;
					evt.layerX=evt.offsetX;
					evt.layerY=evt.offsetY;
					evt.pageX=evt.clientX+document.documentElement.scrollLeft;
					evt.pageY=evt.clientY+document.documentElement.scrollTop;
					evt.stopPropagation=function(){//停止事件冒泡方法
						evt.cancelBubble=true;
					};
					evt.preventDefault=function(){
						evt.returnValue=false;
					};
				}
				return evt;
			},
			addEvent_2:function(obj,evtype,fn){//添加事件监听
				if(obj.addEventListener){//对象检测
					obj.addEventListener(evtype,fn);
				}else if(obj.attachEvent){
					obj.attachEvent("on"+evtype,function(){
						fn.call(obj);
					});//IE不支持事件捕获
				}/*else{
					obj["on"+evtype]=fn;
				}*/
				return obj;
			},
			delEvent:function(obj,evt,fn){//删除事件监听
				if(obj.functions){
					var fns=obj.functions;
					if(fns!=null) {
						fns=fns[evt];
						if(fns!=null){
							for(var i=0;i<fns.length;i++){
								if(fns[i]==fn){
									delete fns[i];
								}
							}
						}
					}
				}
				return obj;
			},
			addClass:function(obj,className){//给指定元素添加类名
				obj.className+=" "+className;
				return obj;
			},
			delClass:function(obj,className){
				var s=obj.className.split(/\s+/);
				for(var i=0;i<s.length;i++){
					if(s[i]==className) delete s[i];
				}
				obj.className=s.join(" ");
				return obj;
			},
			getRealStyle:function(obj,s){//（对象，属性名）获取当前的style元素里的css属性值
				var style;
				if(window.getComputedStyle){//W3C
					Style=window.getComputedStyle(obj,null);
				}else if(obj.currentStyle){//IE
					Style=obj.currentStyle;
				}
				return sytle[s];
			},
			addRule:function(sheet,selector,cssText,i){//向指定样式表中添加一个CSS规则
				if(sheet.insertRule){//W3c
					sheet.insertRule(selector+"{"+cssText+"}",i);
				}else if(sheet.addRule){//IE
					sheet.addRule(selector,cssText,i);
				}
			},
			delRule:function(sheet,index){
				if(sheet.deleteRule){
					sheet.deleteRule(index);
				}else if(sheet.removeRule){
					sheet.removeRule(index);
				}
			},
			setLinkStyle:function(arg){//动态切换样式表
				/**
				{
					csslink:
					url:"skin/style/css/"
					color:
					...
				}
				*/
				for(i in arg){
					if(i=="csslink" || i=="url") continue;
					(function(i){
						arg[i].onclick=function(){
							arg["csslink"].setAttribute("href",arg["url"]+i+".css");
						};		  
					})(i);
				}
			},
			innerSize:function(){//获取浏览器窗口视口宽度和高度
				return{
					width:window.innerWidth || dowument.documentElement.clientWidth,
					height:window.innerHeight || document.documentElement.clientHeight
				};
			},
			dragObj:function(obj){//实现鼠标拖动元素
				this.addEvent(obj,'mousedown',function(evt){
					this.flag=true;
					this.savedMousePos={
						x:evt.layerX,
						y:evt.layerY
					};
				});
				this.addEvent(obj,'mousemove',function(evt){
					evt.preventDefault();
					if(!this.flag){
						return;
					}
					this.style.left=evt.clientX-this.savedMousePos.x+"px";
					this.style.top=evt.clientY-this.savedMousePos.y+"px";
				});
				this.addEvent(document,'mouseup',function(evt){
					obj.flag=false;
				});
			},
			addFavorite:function(address,name){//添加到收藏夹（地址，关键字）
				if(window.external && ("addFavorite" in window.external)){//IE
					window.external.addFavorite(address,name);
				}else if(window.sidebar && window.sidebar.addPanel){//FF
					window.sidebar.addPanel(name,address,name);
				}
			},
			getCookie:function(name){//获取Cookie
				var cookies=document.cookie.split("; ");
				for(var i=0,c;i<cookies.length;i++){
					c=cookies[i].split('=');
					if(c[0]==name) return decodeURIComponent(c[1]);
				}
				return '';
			},
			textMarquee_1:function(but1,but2,time){//滚动文字可随时停止
				var t;
				but1.onclick=function(){//开始按钮
					var s=document.title.split('');
					t=setInterval(function(){
						s.push(s.shift());
						document.title=s.join("");
					},time);
					this.disabled=true;
					but2.disabled=false;
				};
				but2.onclick=function(){//停止按钮
					clearInterval(t);	
					this.disabled=true;
					but1.disabled=false;
				};
			},
			textMarquee_2:function(text,obj,arrt,time){//可设定字符，可设定对象，可设定对象的属性，可设定事件
				text=text.split('');
				setInterval(function(){
					text.push(text.shift());
					obj[arrt]=text.join('');
				},time);
			},
			animation:function(obj,start,alter,dur,fx){//动画（对象，{增量用对象方式传经来}，{开始值用对象方式传经来}，时间,函数）
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
			opacity:function(obj,opacity){//透明度（对象，透明度值）
				//var linear=this.linear;
				var setOpacity=this.setOpacity;
				var curTime=0;
				var t=setInterval(function(){
					if(curTime>=dur) clearInterval(t);
						obj.style=linear(start,alter,curTime,dur)+"px";
					curTime+=50;
				},50);	
			},
			setOpacity:function(obj,opacity){
				if(typeof obj.style.opacity=="string"){//FF
						obj.style.opacity=opacity/100;
				}else {//IE
					obj.style.filter="alpha(opacity="+opacity+")";
				}	
			},
			linear:function(start,alter,curTime,dur){//最简单的线性变化，即匀速运动
				return start+curTime/dur*alter;
			},
			quad:function(start,alter,curTime,dur){//加速变化
				return start+Math.pow(curTime/dur,2)*alter;
			},
			animation_1:function(obj,arrt,add,start,end,t){//动画（对象，样式属性，增量，开始值，结束值，时间）
				var saved=start;
				setInterval(function(){
					if(saved>=end) return;
					saved+=add
					obj.style[arrt]=saved+"px";					 
				},t);	
			},
			firstChild:function(node){//查找下面的元素是不是节点元素
				if(node.firstChild){//有子节点的话
					var n=node.firstChild;
					if(n.nodeType==1) return n;
					return this.nextSibling(n);
				}
				return null;
			},
			lastChild:function(node){//查找元素最后节点是不是节点元素
				if(node.lastChild){//有子节点的话
					var n=node.lastChild;
					if(n.nodeType==1) return n;
					return this.previousSibling(n);
				}
				return null;
			},
			previousSibling:function(node){//查找前一个节点是否是元素节点排除所有非元素节点
				if(node.previousSibling){
					var n=node.previousSibling;
					if(n.nodeType==1) return n;
					while(n=n.previousSibling){//查找上一个节点----->上一个节点------->上一个节点.........直到没有节点为止
						if(n.nodeType==1) return n;
					}
				}
				return null;
			},
			nextSibling:function(node){
				if(node.nextSibling){
					var n=node.nextSibling;
					if(n.nodeType==1) return n;
					while(n=n.nextSibling){//查找下一个节点----->下一个节点------->下一个节点.........直到没有节点为止
						if(n.nodeType==1) return n;
					}
				}
				return null;
			},
			$:function(id){
				return document.getElementById(id);	
			},
			menu:function(menu){//实现点击弹出菜单:(li.menu a div)
				var menus=this.getClass(menu);
				for(var u=0;u<menus.length;u++){
					var list=menus[u].childNodes,//查找每个类名的下一个子节点
						li,a,div;
					for(var i=0;i<list.length;i++){
						if("LI"==list[i].tagName){//类名的下一个子节点是不是li元素
							li=list[i];
							var a=this.firstChild(li);
							if(null ==this.nextSibling(a)) continue;//如果
							div=this.nextSibling(a);
							obj={
								btn:li,
								items:div
							};
							li.relatedItems=obj;
							div.relatedItems=obj;
							li.onmouseover=function(){
								this.relatedItems.items.style.display="block";
							};
							div.onmouseout=function(){
								this.style.display="none";
							};
							li.onmouseout=function(evt){
								evt= evt || window.event;//IE与FF的兼容处理
								evt.relatedTarget=evt.relatedTarget || evt.toElement;//IE与FF的兼容处理
								if(eve.relatedTarget==this.relatedItems.items) return;
								div.style.display="none";
							};
						}
					}
				}
			},
			table:function(table){
				this.table=table;
				return this.table;
			}
			
	};
	window['lg']=lg;
})(window);






(function(window,undefined){
	var table=function(col,row,width,w){
		return new CreateTable(col,row,width,w);	
	};
	function CreateTable(col,row,width,w){
		//var col,row,width,w;
		this.setCol(col);
		this.setRow(row);
		this.setWidth(width);//td宽
		this.setW(w);
	}
	CreateTable.prototype={//生产表格
		setCol:function(col){//初始化列数
			this.col=col;
		},
		setRow:function(row){//初始化行数
			this.row=row;
		},
		setWidth:function(width){//初始化宽度
			this.width=width;
		},
		setW:function(w){
			this.w=this.getWidth()+w;
		},
		getCol:function(){
			return this.col;
		},
		getRow:function(){
			return this.row;
		},
		getWidth:function(){
			return this.width;
		},
		getW:function(){
			return this.w;
		},
		tr:function(){
			for(var i=0;i<this.getW();i++){
				document.write(this.getRow());
			}
			document.write('\n');
		},
		td:function(height,tdnum){//
			var tdWidth=this.getWidth()/tdnum-1;
			for(var i=0;i<height;i++){
				if(tdnum>0 && tdWidth>0){
					for(var j=0;j<tdnum;j++){	
						this.sclass(1,this.getCol());
						this.sclass(tdWidth,'&nbsp;');
					}
				}else{
					this.sclass(1,this.getCol());
					this.sclass(this.width,'&nbsp;');
				}
				this.sclass(1,this.getCol());
				document.write('\n');
			}	
		},
		sclass:function(num,str){//输出多少个
			for(var i=0;i<num;i++){
				document.write(str);
			}
		},
		br:function(num){//输出多少个
			for(var i=0;i<num;i++){
				document.write('\n');
			}
		},
		tables:function(n,tdH,tdW){
			var n=n||1;
			for(var i=0;i<n;i++){
				this.tr();
				this.td(tdH,tdW);
				
			}
			/*
			;*/	
		},
		table:function(tr,td,tdW,tdH,content){//产生表格
			document.write('<table id="table" border="1">');
			for(var i=0;i<tr;i++){
				document.write('<tr>');
					for(var j=0;j<td;j++){
						document.write('<td style="width:'+tdW+'px;height:'+tdH+'px;">');
						document.write(content);
						document.write('</td>');
					}
				document.write('</tr>');
			}
			document.write('</table>');
		}
		
	};
	window['table']=table;
})(window);









(function(window,undefined){
	var scrollText=function(s,fn,t){
		return new ScrollText(s,fn,t);	
	};

	function ScrollText(s,fn,t){//构造滚动的文字：（文字，函数，时间）
		this.setS(s.split(''));
		this.setFn(fn);
		this.setT(t || 300);	
	}
	ScrollText.prototype={
		setS:function(s){
			this.s=s;	
		},
		setFn:function(fn){
			this.fn=fn;	
		},
		setT:function(t){
			this.t=t;	
		},
		getS:function(){
			return this.s;	
		},
		getFn:function(){
			return this.fn;	
		},
		getT:function(){
			return this.t;	
		},
		getInterval:function(){
			var s=this.getS(),fn=this.getFn();
			return 	setInterval(function(){
				s.push(s.shift());
				fn(s.join(''));//函数
			},this.getT());
		},
		start:function(){
			clearInterval(this.getInterval());
			this.getInterval();	
		},
		stops:function(){
			clearInterval(this.getInterval());
		}
	};
	
	function PopMenu(btns,items){
		if(arguments.length==1){
		}else{
			this.btns=btns;
			this.items=items;
		}
		for(var i=0;i<btns.length;i++){
			(function(i){
				btns[i].onmouseover=function(){
					items[i].style.display="block";
				};	
				btns[i].onmouseout=function(){
					items[i].style.display="none";
				};
			})(i);
		}
	}


	window.ScrollText=ScrollText;//注册到window上
})(window);
