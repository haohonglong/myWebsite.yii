
(function(window,undefined,System){
	if(!System) {
		alert('without nothing the class of System');
		return 0;
	}
	var __this__=null;
	function Less(){
		System.Basis.extends.call(this);
		__this__=this;
		
		this.symbol=[];
		this.var_arr={'var':/^@[a-zA-Z0-9_\-]+/gi};
		
	}
	Less.prototype = {
		'constructor':Less,
		'__constructor':function(){},
		'fined':function(){},
		'check':function(){},
		'init':function(){},
		'display':function(){},
		'read':function(){},
		'replace':function(){},
		'add_symbol':function(s){
			this.symbol.push(s);
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
	System.extends(Less,System.Basis,1);
	System['Less']=Less;
})(window,undefined,window[LHH_NAMESPACE_20150715_]);
