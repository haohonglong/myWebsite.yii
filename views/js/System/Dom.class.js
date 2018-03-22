
(function(window,undefined,System){
	if(!System) {
		alert('without nothing the class of System');
		return 0;
	}
	var __this__=null;
	function Dom(){
		System.Basis.extends.call(this);
		__this__=this;
	}

	Dom.prototype = {
		'constructor':Dom,
		'__constructor':function(){},
		/**
		 * 节点元素属性的获取或设置操作
		 * tagName :节点元素标签名
		 * Obj :{'key':value}
		 * return : 返回节点元素
		 */
		'createTag':function(tagName,Obj){
			var node=document.createElement(tagName);
			for(var key in Obj){
				if(key!=null && Obj[key] != null)
					node.setAttribute(key,Obj[key]);
			}
			return node;
		},
		'cloneNode':function(node,logic){
			 if(logic)
			 	return node.cloneNode(true);
			 else
			 	return node.cloneNode(false);
		},
		'removeAttr':function(node,attrName){
			node.removeAttribute(attrName);
		},
		'append':function(oldNode,newNode){
			oldNode.appendChild(newNode);
		},
		'getNodeName':function(node){
			return node.nodeName;
		},
		'delNode':function(node){//在它的父节点调用removeChild 然后把它自身移除
			this.getParent(node).removeChild(node);
		},
		'getParent':function(node){//获取当前节点的父节点
			return node.parentNode;
		},
		'replaceNode':function(newNode,current){//替换节点
			this.getParent(current).replaceChild(newNode , current);
		},
		'insertBefore':function(newNode , current){//在oldNode的父节点上调用insertBefore燃后把新节点插入它自身前面
			this.getParent(current).insertBefore(newNode , current);
			
		},
		'insertAfter':function(node,newNode){
			if(node.nextSibling){//如果node有下一个节点的话
				this.insertBefore(newNode,node.nextSibling);
			}else{
				this.append(this.getParent(node),newNode);
			}
			return newNode;
		},
		'delNodeMore':function(){//删除多个节点
			for(var i=0;i<arguments.length;i++){
				this.delNode(auguments[i]);
			}
		},
　  	

　　
		/**
		 * 节点元素属性的获取或设置操作
		 * 
		 */
		'attr':function(){
			var node,key,itme,
				len=arguments.length;
			switch (len){
				case 3:
					node=arguments[0];
					name=arguments[1];
					item=arguments[2];
					try{
						node.setAttribute(name,item);
					}catch(e){
						alert("sorry without the method of setAttribute "+e.name);
					}
				break;
				case 2:
					node=arguments[0];
					name=arguments[1];
					try{
						return node.getAttribute(name);
					}catch(e){
						alert("sorry without the method of setAttribute "+e.name);
					}
					
				break;
				default:
			}
			
		},
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
	System.extends(Dom,System.Basis,1);
	System['Dom']=Dom;
})(window,undefined,window[LHH_NAMESPACE_20150715_]);

