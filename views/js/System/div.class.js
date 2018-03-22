(function(window,undefined,System){
	if(!System) {
		alert('without nothing the class of System');
		return 0;
	}
	var __this__=null;
	function Div(){
		System.Basis.extends.call(this);
		__this__=this;
		/*--------------------------------------------------------------------------------------------------*/
		
		this.symbol=[];
		
		
	}
	Div.prototype = {
		'constructor':Div,
		'__constructor':function(){},
		'div':function(obj){
			this.create(obj);
		},

		'create':function(obj){
			/**
				{
					'content':'内容',
					'select':'list'

				}

			*/
			var content=[],div='';
			
			switch(obj['select']){
				case 'content':

				  content.push(div);
				  break;

				case 'list':

				  content.push(div);
				  break;

				case 'title':

				  content.push(div);
				  break;

				case 'form':

				  content.push(div);
				  break;

				case 'table':

				  content.push(div);
				  break;
				case 'box':

				  content.push(div);
				  break;


				default:
				 
			}
			
			
			return content.join();
		},
		'empty':function(){},
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
	System.extends(Div,System.Basis,1);
	System['Div']=Div;
})(window,undefined,window[LHH_NAMESPACE_20150715_]);
