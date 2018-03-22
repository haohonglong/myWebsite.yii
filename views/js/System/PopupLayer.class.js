 /**
 * 
 * @author lhh
 * 名称：弹出层 
 * 功能：可自动居中且兼容IE6
 * 创建日期：2014-12-1
 * 修改日期：2014-12-1
 * @param	        popLayout(node) NO NULL : //弹出层
 * @param	        mask 	 (node)    NULL : //弹出层下的蒙版
 * @param 			padding(intger)    NULL : callBack 有padding值时 
 * @param 			Browser(Object)    NULL : 传浏览器对象用于处理兼容问题 (一般不用这个参数)
 * Example:
 * 			pop=new System.PopupLayer('.sectionFixed-A1','.sectionMask-A2','1');
 *			$dom=$(pop.popLayout);
 *			$mask=$(pop.mask);
 *			pop.isIE().resize().setCenter().closed($('.sectionBox-B7 .icon'),function(){
 *				$mask.hide();
 *				$dom.hide();
 *			});
 * 
 */
(function(window,$,System){
    
	if(!System) {
		alert('without nothing the class of System');
		return 0;
	}
	var __this__=null;
	
	function PopupLayer(popLayout,mask,padding,Browser){
		
		System.Basis.extends.call(this,System.Helper);
		__this__=this;
		/*--------------------------------------------------------------------------------------------------*/
		if(this.empty(popLayout)) return this;

		this.popLayout  = popLayout;
		this.padding	= padding || 0;
		this.mask 		= mask 	  || null;
	}


	PopupLayer.prototype={
		'constructor': PopupLayer,
		'__constructor':function(){},
		'setCenter':function(fn){//fn 传回调方法 可自定义居中方式
			fn = fn || null;
			this.autoScreenCenter($(this.popLayout),this.padding,fn);
			return this;
		},
		'isIE':function(){return this;},
		'resize':function(){return this;},

		'create':function(obj){
			/**
				{
					'div_class_PopupLayer_wrap_name':'section sectionPopupLayer-A1',
					'div_class_colose_name':'close',
					'div_title_name':'sectionBox sectionTitle',
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
				  	container ='<div class="'+obj["div_class_PopupLayer_wrap_name"]+'"> \
									<div class="'+obj["div_class_colose_name"]+'"></div> \
									<div class="p10"> \
										<div class="content"> \
											<div class="'+obj["div_title_name"]+'"> \
												<h2>'+obj["title"]+'</h2>';
					if(obj["more"]){
						container +=			'<div class="more">'+obj["more"]+'</div>';
					}
						container +=		'</div> \
											<div class="'+obj["div_content_name"]+'"><div class="p15">'+obj["content"]+'</div></div> \
										</div> \
									</div> \
								</div>' ;
				  break;


				default:
				 
			}
			
			
			return container;
		},
		'closed':function($div,fn){
			$div.on('click',function(){
				fn.call(this);
			});
		},

		'close':function(close,fn){
			var $popLayout=$(this.popLayout);
			var $close=$popLayout.find(close);
			$close.on('click',function(){
				$popLayout.hide();
				fn.call(this);
			});
		},
		'show':function(){
			$(this.popLayout).show();
			$(this.mask).show();
		},
		'hide':function(){
			$(this.popLayout).hide();
			$(this.mask).hide();
		},

		'append':function($div,nodes){$div.append(nodes);},
		'empty':function(){$(this.popLayout).empty();},
		'remove':function(){$(this.popLayout).remove();},
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

	System.extends(PopupLayer,System.Helper,1);
	System['PopupLayer']=PopupLayer;
	
})(window,jQuery,window[LHH_NAMESPACE_20150715_]);

