/**
 * Tools 0.1 pre
 * 创建人：龙昊宏
 * 名称：工具类
 * 功能：菜单滑动门、
 *       弹出层、
 *		 区域隐藏或显示、
 *		 文本框输入时设默认文字提示、
 *		 图片动画移动
 *	修改日期：3013.11.08		
 * 
 *
 * Copyright Software 
 * 
 * 
 */

(function(window,jQuery,undefined){
	if(!window.System) {window.System={};}
	var $=jQuery;
	function Tools(Browser){
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
		 

		/**
		 * 创建日期：
		 * 修改日期：2014-3-24
		 * 名称：(Object) toggle_menu
		 * 功能：多菜单切换
		 * 参数： {	(jquery Object no null) 'list' :$('a'),
		 *			(String no null) 		'event':'click',
		 *			(jquery Object no null) 'temp' :$('#first'),
		 *			(String no null) 		'class':'name',
		 *			(function null)			'fn'   :function(){}
		 *			}
		 */

		this.toggle_menu=function(cur){
			var doClass=function(cur){
				if(__this__.isS(cur['class'])){
					cur['temp'].removeClass(cur['class']);
					$(this).addClass(cur['class']);

				}else if(__this__.isArray(cur['class'])){
					var arr=cur['class'];
					for(var i=0;i<arr.length;i++){
						cur['temp'].removeClass(arr[i]);
						$(this).addClass(arr[i]);
					}
				}else if(__this__.isO(cur['class'])){
					if(cur['class']['remove']){
						var arr=cur['class']['remove'];
						for(var i=0;i<arr.length;i++){
							$(this).removeClass(arr[i]);
						}
					}else if(cur['class']['add']){
						var arr=cur['class']['add'];
						for(var i=0;i<arr.length;i++){
							$(this).addClass(arr[i]);
						}
					}

				}
				
			},

			doit=function(cur){
				var temp=cur['temp'];
				if(cur['class']){
					doClass.call(this,cur);
				}
				cur['temp']=$(this);
				if(__this__.isF(cur['fn'])){
					cur['fn'].call(this,{'temp':temp,'current':cur,'index':$(this).index()});
				}
			};

			cur['temp']=cur['temp'] ? cur['temp'] : $(cur['list'][0]);
			if(cur['list'] && cur['event'] ){
				cur['list'][cur['event']](function(){
					//cur['or'] 为 true 时当前选中的按钮点击后仍触发事件。默认是如果在当前选中的按钮上再次单击不触发任何事件
					var doif=cur['or'] ? (cur['temp'] || $(this)[0]!=cur['temp'][0]) : (cur['temp'] && $(this)[0]!=cur['temp'][0]);
					if(doif) doit.call(this,cur);
				},cur['event']=='hover' && !cur['hover']?function(){cur['temp'].removeClass(cur['class'])}:null);//当鼠标事件为hover 同时 hover 没有设定 ture 时 鼠标离开时除去移入添加的样式
			}
			
			return cur;
		};

		
		 /**
		 * 创建日期：
		 * 修改日期：2014-3-24
		 * 名称：(vido) hide_or_show_area
		 * 功能：隐藏或显示指定区域
		 * 参数： {	(Object) 'hide':{[]},
		 *			(Object) 'show':{[]}
		 *			}
		 */
		this.hide_or_show_area=function(menu){
			if(!menu) return false;
			if(arguments.length>1){
				var arr=arguments;
				this.each(arr,function(i){
					if(0==i){
						this.style.display="";
					}else{
						this.style.display="none";
					}
					
				});
				
			}else{
				if(menu.hide){
					this.each(menu.hide,function(){
						
							if(this[0]){
								this.hide();
							}else{
								if(typeof this.style !== 'undefined')
									this.style.display="none";	
							}
						
					});

				}
				if(menu.show){
					this.each(menu.show,function(){
						if(this[0]){
							this.show();
						}else{
							if(typeof this.style !== 'undefined')
								this.style.display="";	
						}
					});
				}
			}
		};

		/**
		 * 创建日期：2014/7/25
		 * 修改日期：2014/7/25
		 * 名称：(vido) hover_next_box_show
		 * 功能：鼠标hover时下面的隐藏模块显示,鼠标移除隐藏模块时模块恢复隐藏
		 * 参数：(string a,
		 *		 String nextBox)
		 * Example:
				hover_next_box_show('.js_showBoxA1','.sectionShowBox-A1');
		 		
			html_strure:
				<div class="js_showBoxA1">
					<div class="sectionShowBox-A1 none">
					....
					</div>
				</div>

		 *	
		 */
		this.hover_next_box_show=function(a,nexBox){
			$(a).hover(function(){
	            $(this).find(nexBox).show().hover(null,function(){
	                $(this).hide();
	                return false;
	            });;
	            return false;
	        });
		};

		/**
		 * 创建日期：
		 * 修改日期：2014/7/25
		 * 名称：(vido) fake_drop_down_box
		 * 功能：伪下拉框
		 * 参数：(jQuery obj $select,
		 *		 String selectBox)
		 * 	Example:
				fake_drop_down_box($('.sectionSelect-A1'),'.js_select1');
		 	
		 	html_strure:
				<div class="sectionSelect-A1">
                    <input type="hidden" value="" name="">
                    <span>更换部门至</span>
                    <div class="sectionArrow-A1 sectionArrow-A1-3 sectionArrow-A1-3-2"><i class="down"></i></div>
                </div>
                <div class="sectionShowBox-A3 sectionShowBox-A3-3 sectionList-A3 sectionList-A3-2 js_select1 none">
                    <ul class="border">
                        <li>text...</li>
                    </ul>
                </div>
		 *	
		 */
		this.fake_drop_down_box=function($select,selectBox){
			$select.click(function(event){
                $(selectBox).show();
                event.stopPropagation();
            });
            $(selectBox).find('li').click(function(){
                var val=$(this).text();
                $select.find('span').text(val);
                $select.find('input').val(val);
                $(this).parents(selectBox).hide();
                

            });

            $(window).click(function(){
                $(selectBox).hide();
            });
		};

		/**
		 * 创建日期：2014/8/14
		 * 修改日期：2014/8/14
		 * 名称：(vido) fake_drop_down_box_toggle
		 * 功能：伪下拉框 跟上面不同的是只有点击下拉框标题才隐藏内容 html_strure都是一样的
		 * 参数：(jQuery obj $select,
		 *		 String selectBox)
		 * 	Example:
				fake_drop_down_box_toggle($('.sectionSelect-A1'),'.js_select1');
		 *	
		 */
		this.fake_drop_down_box_toggle=function($select,selectBox){
			$select.toggle(function(){
                $(selectBox).show();
                
            },function(){
                $(selectBox).hide();
                
            });
            $(selectBox).find('li').click(function(){
                var val=$(this).text();
                $select.find('span').text(val);
                $select.find('input').val(val);
            });

		};


		
		 /**
		 * 创建日期：2013/12/12
		 * 修改日期：2014/9/30
		 * 名称：(vido) gotoTop
		 * 功能：到页面顶端
		 * 参数： (jqery Object) $('.div'),
		 *		  (String) 'hover'//鼠标经过变化的样式
		 *			
		 */
		this.gotoTop=function($dom,css,fast){
			$dom.hide();
			if(window.ActiveXObject && !window.XMLHttpRequest){//this is IE6
				$dom.parent().css('position', 'relative');
				
			}
			if(fast){
				$(window).scroll(function(){  
			        var vtop=$(document).scrollTop();
			        if(vtop>0){
						$dom.show().hover(function(){
				         	if(css){
				         		$dom.addClass(css);
				         	}
				         	
				         },function(){
				         	if(css){
				         		$dom.removeClass(css);
				         	}
				         	
				         }).click(function(){
				         	$(document).scrollTop(0);
				         });

				        if(window.ActiveXObject && !window.XMLHttpRequest){//this is IE6
							__this__.Browser.fixed($dom[0]);
						}
			        }else{
			         	$dom.hide();
			        }
			    }); 
			}else{
				$(window).scroll(function () {
		            if ($(this).scrollTop() > 600) {
		                    $dom.unbind('hover');
		                    $dom.hover(function(){
					         	if(css){
					         		$dom.addClass(css);
					         	}
					         },function(){
					         	if(css){
					         		$dom.removeClass(css);
					         	}
					         	
					         }).fadeIn();
		            } else {
		                    $dom.fadeOut();
		            }
			    });

				// scroll body to 0px on click
		        $dom.click(function () {
		                $('body,html').animate({
		                        scrollTop: 0
		                }, 2000/*, 'easeInOutQuint'*/);
		                return false;
		        });
			}
			
			

		};	
		

		 /**
		 * 创建日期：2013/12/11
		 * 修改日期：2014/9/4
		 * 名称：(vido) menu_of_auto_fixed
		 * 功能：菜单随滚条改为以定位方式(固定要浏览器顶部);
		 		 滚动条滚动到一定距离时执行
		 * 参数： {
		 *			$dom(no null) :对应的元素
		 *			css(null) :固定定位的样式
		 *			fn1(null) :到达浏览器顶部要做的事
		 *			fn2(null):低于浏览器顶部要做的事
		 *			height(null):被别的元素挡着的高度 后者滚动条滚到一定的距离
		 *			}
		 *			
		 */
		this.menu_of_auto_fixed=function(A){
			//获取要定位元素距离浏览器顶部的距离
			var height=A.height || 0;
			var navH;
			if(A.$dom){
				navH =parseInt( A.$dom.offset().top);	
				navH-=height;
			}else{
				navH=height;
			}
			
			
			//滚动条事件
			$(window).scroll(function(){
				//获取滚动条的滑动距离
				var scroH = $(this).scrollTop();
				//滚动条的滑动距离大于等于定位元素距离浏览器顶部的距离，就固定，反之就不固定
				if(scroH >= navH){
					if (A.css) A.$dom.addClass(A.css);
					if(__this__.isF(A.fn1)) A.fn1(scroH);
				}else{
					if(A.css) A.$dom.removeClass(A.css);
					if(__this__.isF(A.fn2)) A.fn2(scroH);
				}

			});

		};


		

		 /**
		 * 创建日期：2014/5/16
		 * 修改日期：2014/5/16
		 * 名称：(vido) floating_ads
		 * 功能：漂浮广告
		 * 参数： {
		 *			'div' : 			漂浮的容器
		 *			'xPos': 			
		 *			'yPos':
		 *			'time':
		 *			'fn'  :
		 *			}
		 *			
		 */
		this.floating_ads=function(A){
			var D={
				'iSpeedX':A.xPos || 1,
				'iSpeedY':A.yPos || 1,
				'div':A.div,
				'time':A.time || 30,
				'body_w':A.wrap ? A.wrap.outerWidth(true)  : $(window).width(),
				'body_h':A.wrap ? A.wrap.outerHeight(true) : $(window).height(),
				'timer':null
			};

			var div =D.div.get(0);

			function float(){
				var l=div.offsetLeft+D.iSpeedX;
				var t=div.offsetTop +D.iSpeedY;
				D.body_w=A.wrap ? A.wrap.outerWidth(true)  : document.documentElement.clientWidth;
				D.body_h=A.wrap ? A.wrap.outerHeight(true) : document.documentElement.clientHeight;

				if(t >= D.body_h - div.offsetHeight){
					D.iSpeedY*=-1;
					t = D.body_h - div.offsetHeight;
				}
				
				if(t <= 0){
					D.iSpeedY*=-1;
					t=0;
				}

				if(l >= D.body_w - div.offsetWidth){
					D.iSpeedX*=-1;
					l = D.body_w - div.offsetWidth;
				}

				if(l <= 0){
					D.iSpeedX*=-1;
					l=0;
				}



				div.style.left=l+'px';
				div.style.top =t+'px';

			
			}

			function jump(){
				var l=div.offsetLeft+D.iSpeedX;
				var t=div.offsetTop +D.iSpeedY;
				D.body_w=A.wrap ? A.wrap.outerWidth(true)  : $(window).width();
				D.body_h=A.wrap ? A.wrap.outerHeight(true) : $(window).height();
				if(t >= D.body_h - div.offsetHeight){
					D.iSpeedY*=-1;
					t = D.body_h - div.offsetHeight;
				}
				
				if(t <= 0){
					D.iSpeedY*=-1;
					t=0;
				}

				if(l >= D.body_w - div.offsetWidth){
					D.iSpeedX*=-1;
					l = D.body_w - div.offsetWidth;
				}

				if(l <= 0){
					D.iSpeedX*=-1;
					l=0;
				}



				div.style.left=l+'px';
				div.style.top =t+'px';

			
			}

			function start(fn){
				D.timer=setInterval(function(){fn();},D.time)
			}
			function stop (){
				clearInterval(D.timer);
			}

			

			if(__this__.isF(A['fn'])){
				A['fn'].call(A,{
								'f_start':start,
								'f_stop':stop,
								'f_jump':jump,
								'f_float':float

						});
			}
		};


		/**
		 * 创建日期：2014-3-19
		 * 修改日期：2014-3-19
		 * 名称：
		 * 功能：把一个区域内容copy到另一个区域中
		 * 参数：vido info_to_info({ 
		 							'$big'  :,
		 *							'$small':,
		 *							'src'   :'b_src',
		 *							'text'  :'.sectionMask-A1'
		 *						});
		 * 
		 *
		 *
		 */
		
		this.info_to_info=function (obj){
			obj.src=obj.src ? obj.src : 'src';
			obj.$big.find('img').attr('src',obj.$small.find('img').attr(obj.src));
			if(obj.text){//copy遮罩标题
				obj.$big.find(obj.text).html(obj.$small.find(obj.text).html());
			}
			if(this.isF(obj.fn)){
				obj.fn.call(obj);
			}
			
		};
		
		
		/**
		 * 创建日期：2014-8-12
		 * 修改日期：2014-8-12
		 * 名称：
		 * 功能：当前行下移，下移，移到最后一个，移到最上面
		 * 参数：object  move_next_prev_first_last({
		 							'$event'  :$(event.target),
		 							'parent': '.box',
		 							'chose':  'next'
		 *						});
		 * 
		 *
		 *
		 */
		
		this.move_next_prev_first_last=function (D){
			D.$cur=D.$event.parents(D.parent);
			D.$copy=D.$cur.clone(true);
			switch(D['chose']){
                case 'next'	:
            		if(D.$cur.next().hasClass(D.parent.substr(1))){
            			D.$cur.next().after( D.$copy);
            			D.$cur.remove();
            		}
                  break;
                case 'prev'	:
                	if(D.$cur.prev().hasClass(D.parent.substr(1))){
                		D.$cur.prev().before( D.$copy);
                		D.$cur.remove();
                	}
                  break;
                case 'first':
                	$(D.parent).first().before( D.$copy);
                	D.$cur.remove();
                  break;
                case 'last'	:
                	$(D.parent).last().after( D.$copy);
                	D.$cur.remove();
                  break;
                  alert("Error");
                default:
                  
            }
			
			return D;
			
		};
		
		/**
		 * 创建日期：2014-8-13
		 * 修改日期：2014-8-13
		 * 名称：
		 * 功能：多选框全选反选，默认为反选状态，输入chexkbox 才可改变全选专态
		 * 参数：vido  checkboxSelectAll(list,checkbox);
		 * 参数：(Array) 	list 		//所有的checkbox
		 * 参数：(Node) 	checkbox 	//当前所点全选的checkbox
		 */
		
		this.checkboxSelectAll=function (list,checkbox) {
			 for (var i=0;i<list.length;i++) {
				  var e=list[i];
				  if(checkbox){
				  	e.checked=checkbox.checked;
				  }else{
				  	e.checked=!e.checked;
				  }
				  
			 }
		};
		

		/**
		 * 修改日期：2014-1-10
		 * 名称：
		 * 功能：输入框是否为空如为空就显示默认字符，触发事件时若是默认文字就清空
		 * 参数：node obj
		 */
		
		this.input_text=function(obj){
			var text=$(obj).attr('default'),value;
			if(!text) return;
			obj.onclick=function(){
				value=obj.value.replace(/\s/g,"");
				if(value==text)
					obj.value='';
			};
			obj.onblur=function(){
				value=obj.value.replace(/\s/g,"");
				if(value=='')
					obj.value=text;
			};	
			
		};

		

		/**
		 * 创建日期：2014-9-2
		 * 修改日期：2014-9-12
		 * 名称：
		 * 功能：把指定的元素设为全屏或全屏减去指定的只存
		 * 参数：Object obj
		 * 	{
		 *		'$div':$(),
		 *		'w':true,
		 *		'h':true,
		 *		'wSize':0,
		 *		'hSize':0
		 *	 }
		 * 
		 * 
		 * 
		 * 
		 */
		
		this.set_whole_screen_size=function(obj){
			var wSize=obj.wSize || 0;
			var hSize=obj.hSize || 0;
			var width,height,getWindowSize=window.System.Basis.getBodySize;
            var setSize=function(){
            	if(obj.w){
	            	width=getWindowSize('w');
	            	obj.$div.width(width-wSize);
	            } 
	            if(obj.h){
	            	height=getWindowSize('h');
	            	obj.$div.height(height-hSize);
	            }
            };
			$(window).resize(function() {
	          	setSize();
	          	
	        });

	        setSize();
			
		};


		/**
		 * 创建日期：2014-10-22
		 * 修改日期：2014-10-22
		 * 名称：loadImages
		 * 功能：图片预加载
		 * 参数： 
		 * 	(node)		I:要放图片的img元素
		 *	(Number)	h:img元素的高度，像素
		 *	(Number)	w:img元素的宽度，像素
		 * Example:
		 			loadImages(img).src="/image/1.jpg";
		 */
		this.loadImages=function(I){
	        var image=new Image(); 
	        image.onload=function(){
	        	I.src=this.src;
		        
	        };
	        return image;
	        
	    };

		/**
		 * 创建日期：2014-9-3
		 * 修改日期：2014-9-3
		 * 名称：imageProportionalzoom
		 * 功能：图片等比例放大缩小
		 * 参数：Object obj
		 * 	ImgD:要放图片的img元素，onload时传参可用this
		 *	h:img元素的高度，像素
		 *	w:img元素的宽度，像素
		 *
		 * 
		 * 
		 * 
		 */
		this.imageProportionalzoom=function(ImgD,h,w){
	        var image=new Image(); 
	        image.src=ImgD.src; 
	        if (image.width<w && image.height<h){
	            ImgD.width=image.width;
	            ImgD.height=image.height;
	        }else{
	            if (w / h <= image.width / image.height){
	                ImgD.width=w;
	                ImgD.height=w * (image.height / image.width);
	            }else{
	                ImgD.width=h * (image.width / image.height);
	                ImgD.height=h;
	            }
	        }
	        
	        //图片居中，IE8有效果，IE9,火狐无效果，请在页面用table居中
	        //ImgD.style.paddingLeft = (w + 20 - ImgD.width) / 2;   //20是指padding-left和padding-right距离的和
	        //ImgD.style.paddingTop=(h + 20 -ImgD.height) / 2;     //20是指padding-top和padding-bottom距离的和
	    };

		
		/**
		 * 名称：addFavorite
		 * 功能：加入到收藏夹
		 * 
		 */
	
		this.addFavorite=function(name,url){
			var ctrl=(navigator.userAgent.toLowerCase()).indexOf('mac')!=-1?'Command/Cmd': 'CTRL';
			if(document.all){
				window.external.addFavorite(url,name);
			}else if(window.sidebar){
				window.sidebar.addPanel(name,url, "");
			}else{ 
				alert('您可以通过快捷键' + ctrl + ' + D 加入到收藏夹');
			}
		};
		

		
		/**
		 * 创建日期：2014-3-24
		 * 修改日期：2014-3-24
		 * 名称：vido control_cms_img
		 * 功能：查找文章中所有图片如果图片宽度大于规定的图片就限制负责不处理,并且在图片外层加一个容器好让图片居中，这个容器可以自定义。
		 * 参数： {	(jquery object) 'cms':$dom,
		 *			(String) 		'img':'',
		 *			(int)    		'width':500,
		 *			(String) 		'div':'<div class="img-parDiv mb10"></div>'
		 *			}
		 */
		this.control_cms_img=function(C){
			//找出文章中所有的图片
			var control_img=function($div,img,div,width){
				var imgs,i=0;
				if(imgs=$div.find(img)){
					for(i=0;i<imgs.length;i++){
						var $curImg=$(imgs[i]);
						$div=$(div);
						if($curImg.width()>width){
							$curImg.width(width)
						}
						if($div){
							$curImg.before($div);
							$curImg.appendTo($div);
						}
						
						
					}
					return true;
				}
				return false;
			};
			
			control_img(C.cms,C.img || 'img',C.div,C.width);
			
		};


		/**
		 * 创建日期：2014-3-27
		 * 修改日期：2014-3-27
		 * 名称：vido textMarquee
		 * 功能：滚动文字可设定字符，可设定对象，可设定对象的属性，可设定事件
		 * 参数： 	(String) 	text,
		 *			(Number) 	time,
		 *			(function)  fn
		 *			
		 */
		this.textMarquee=function(text,time,fn){
			if(!text || !time || !__this__.isF(fn)){
				alert('出错了！');
				return false;
			}
			text=text.split('');
			setInterval(function(){
				text.push(text.shift());
				fn.call(text.join(''));
			},time);
		};


	}
	window['System']['Tools']=Tools;
})(window,jQuery);

