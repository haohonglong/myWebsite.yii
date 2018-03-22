(function(window, undefined,System){
    
	if(!System) {
		alert('without nothing the class of System');
		return 0;
	}
	var __this__=null;
	function Linklist(){
		System.Basis.extends.call(this);
		__this__=this;
		
		
	}

	Linklist.prototype = {
		'constructor':Linklist,
		'__constructor':function(){},
		'firstChild':function(node){//查找下面的元素是不是节点元素
			if(node.firstChild){//有子节点的话
				var n=node.firstChild;
				if(n.nodeType==1) return n;
				return this.nextSibling(n);
			}
			return null;
		},
		'lastChild':function(node){//查找元素最后节点是不是节点元素
			if(node.lastChild){//有子节点的话
				var n=node.lastChild;
				if(n.nodeType==1) return n;
				return this.previousSibling(n);
			}
			return null;
		},
		'previousSibling':function(node){//查找前一个节点是否是元素节点排除所有非元素节点
			if(node.previousSibling){
				var n=node.previousSibling;
				if(n.nodeType==1) return n;
				while(n=n.previousSibling){//查找上一个节点----->上一个节点------->上一个节点.........直到没有节点为止
					if(n.nodeType==1) return n;
				}
			}
			return null;
		},
		'nextSibling':function(node){
			if(node.nextSibling){
				var n=node.nextSibling;
				if(n.nodeType==1) return n;
				while(n=n.nextSibling){//查找下一个节点----->下一个节点------->下一个节点.........直到没有节点为止
					if(n.nodeType==1) return n;
				}
			}
			return null;
		},
		'filterSpaceNode':function(nodes){//过滤元素中包含的所有空白节点
			var ret=[];
			for(var i=0;i<nodes.length;i++){
				if(nodes[i].nodeType===3 && /^\s+$/.test(nodes[i].nodeValue)) continue;//查找是否是文本节点且有空格
				ret.push(nodes[i]);
			}
			return ret;
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
	System.extends(Linklist,System.Basis,1);
	System['Linklist']=Linklist;
})(window,undefined,window[LHH_NAMESPACE_20150715_]);
//==============================================================================================




