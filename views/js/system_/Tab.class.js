
(function(window,$,undefined){
		if(!window.System) System={};

		/**
		 *----------------------------------
		 * @author lhh
		 * 产品介绍：tabs 功能可添加多个事件和对应事件添加不同的样式
		 * 创建日期：2014-10-28
		 * 修改日期：2014-11-10 
		 * 名称：toggle_menu
		 * 功能：表格每行鼠标移上去变色，移出恢复
		 * 说明：
		 * 注意：
		 * 参数： {	(jquery Object no null) 'list' :$('a'),
		 *			(String no null) 		'event':'hover', | 'hover,click' | ['hover','click'] | {'hover':'h_cur','click':'c_cur'} 
		 *			(jquery Object) 		'temp' :$('#first'),
		 *			(String no null) 		'live':'live | on',//如果是异步就选择
		 *			(String no null) 		'class':'cur', 	 | 'h_cur,c_cur' | ['h_cur','c_cur']  //对应事件加不同样式
		 *			(jquery Object) 		'block':$('sectionBlock-A1'),
		 *			(function null)			'fn'   :function(){}
		 *			}
		 * Example：
		 *----------------------------------*/
        function Tab(Browser){
			window.System.Basis.extends.call(this);
			var __this__=this;
			/*--------------------------------------------------------------------------------------------------*/

			var bind_eve=function(cur,eve,css){
				/**
				  *	创建日期：2014-11-10 
			 	  * 修改日期：2014-11-10 
				  *	名称：private (void) is_live
				  * 功能：执行异步时绑定的事件
				  * 参数：(Object no null) cur
				  *		  	
				  */
				
				if(cur['live']){
					cur['list'][cur['live']](eve,function(event){
						//cur['or'] 为 true 时当前选中的按钮点击后仍触发事件。默认是如果在当前选中的按钮上再次单击不触发任何事件
						var doif=cur['or'] ? (cur['temp'] || $(this)[0]!=cur['temp'][0]) : (cur['temp'] && $(this)[0]!=cur['temp'][0]);
						cur.cur_even_this=this;
						if(doif) __this__.doit(cur,css,event);
						event.stopPropagation(); 
					},eve=='hover' && !cur['hover']?function(){cur['temp'].removeClass(css)}:null);//当鼠标事件为hover 同时 hover 没有设定 ture 时 鼠标离开时除去移入添加的样式
				}else{
					cur['list']['unbind'](eve);
					cur['list'][eve](function(event){
					//cur['list']['bind'](eve,function(event){
					
						//cur['or'] 为 true 时当前选中的按钮点击后仍触发事件。默认是如果在当前选中的按钮上再次单击不触发任何事件
						var doif=cur['or'] ? (cur['temp'] || $(this)[0]!=cur['temp'][0]) : (cur['temp'] && $(this)[0]!=cur['temp'][0]);
						cur.cur_even_this=this;
						if(doif) __this__.doit(cur,css,event);
						event.stopPropagation(); 
					},eve=='hover' && !cur['hover']?function(){cur['temp'].removeClass(css)}:null);//当鼠标事件为hover 同时 hover 没有设定 ture 时 鼠标离开时除去移入添加的样式
				}

				
			},
			/**
			 *----------------------------------
			 * @author lhh
			 * 产品介绍：
			 * 创建日期：2014-5-29 
		 	 * 修改日期：2015-1-15 
			 * 名称：private (void) select_event
			 * 功能：选择相应的事件
			 * 说明：
			 * 注意：
			 * (Object no null) 	 cur,
			 * (String no null) 	'eve',//要绑定的事件
			 * (String no null) 	'css' //事件绑定时要添加的样式
			 * Example：
			 *----------------------------------*/
			select_event=function(cur,eve,css){
				switch(eve){
					case 'keydown'://判断键盘按下去的按键值
						cur['list'][eve](function(event){
							var e = window.System.Basis.fixEvt(event);
							switch(e && e.keyCode){
								case 27:// 按 Esc 
								
								break;
								case 113:// 按 F2 
								
								break;
								case 13:// enter 键
									e.keyCode=9;
									return false;
								break;
								case 9:// Tab 键
									
								break;


								
								default:
									

							}
						});
					
					break;
					case 'hover':
						cur['list'][eve](function(){
							$(this).addClass(css);
						},function(){
							//if(cur['temp'] && $(this)[0]!=cur['temp'][0]){//只有不是当前选中的才能做下面的事情
								$(this).removeClass(css);
							//}
						});

					break;
					
					default:
						

						bind_eve(cur,eve,css);

				}


			},multi_css=function(cur,arr_eve,arr_css,css){
				/**
				  *	创建日期：2014-11-10 
			 	  * 修改日期：2014-11-10 
				  *	名称：private (void) isArray_css
				  * 功能：对个事件匹配多个样式
				  * 参数： (Object no null) 	 cur,
				  *		   (Array no null) 	'arr_eve',//要绑定的事件集合
				  *		   (Array no null) 	'arr_eve' //事件绑定时要添加的样式的集合
				  *			
				  */
				var flag=false;
				if(arr_css.length > 1) flag=true;
				for(var i=0;i<arr_eve.length;i++){
					if(flag){//多个事件执行不同的选中状态样式 同传入的是对象执行的效果是一样的
						select_event(cur,arr_eve[i],arr_css[i]);
					}else{
						select_event(cur,arr_eve[i],css);

					}
				}

			},Excu_event=function(cur,css){
				/**
				  *	创建日期：
			 	  * 修改日期：2014-11-10 
				  *	名称：private (void) Excu_event
				  * 功能：执行传入的事件行为
				  * 参数：(Object no null) cur
				  *		  	
				  */
				if(__this__.isObject(cur['event'])){//传入的是对象目的多个事件执行不同的选中状态样式
					//{'k':v}
					var E=cur['event'];
					for(var k in E){
						select_event(cur,k,E[k]);
					}

				}else if(__this__.isArray(cur['event'])){//传入的数组
					if(0 === cur['event'].length) {
						alert('数组必须要有值');
						return 0;
					}
					var arr_eve=cur['event'],arr_css=css;
					multi_css(cur,arr_eve,arr_css);
				}else{//传入的是字符串用,号分割
					var arr_eve=cur['event'].split(","),arr_css=css.split(",");
					if(arr_eve.length > 1){
						multi_css(cur,arr_eve,arr_css,css);
					}else{
						bind_eve(cur,cur['event'],css);
						
					}
				}
			};

			this.doClass=function(cur,css){
				var cur=cur || this.cur;
				if(__this__.isS(css)){
					cur['temp'].removeClass(css);
					$(cur.cur_even_this).addClass(css);

				}
				
				
			};

			this.doit=function(cur,css,event){
				var cur=cur || this.cur;
				var temp=cur['temp'];
				if(css){
					__this__.doClass(cur,css);
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
						
						Excu_event(cur,cur['class']);
					}else{//没事件时
						
						cur['list']['each'](function(){
							cur.cur_even_this=this;
							__this__.doit(cur,cur['class']);

						});
						
					}
				}
				
				return cur;
			};

			this.slider=function(){};
			

			
			
		}
		
		window.System.Tab=Tab;
})(window,jQuery);
