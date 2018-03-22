/*
 * 标准 : 类及成员名称一旦定义不能轻易修改，如若修改就要升级版本！如若在遇到与第三方插件发生冲突要修改，请参考基类里的说明文档。
 *		
 * 
 */

/**
 * LamborghiniJS 0.3 pre
 * 创建人：lhh
 * 创建日期:2015/3/20	
 * 修改日期:2015/7/15	
 * 名称：基类
 * 功能：服务于派生类
 * 命名空间接口定义: var LHH_NAMESPACE_20150715_='interfaceName';
 * 命名空间接口调用: window[LHH_NAMESPACE_20150715_]  或者 window['interfaceName']
 * 说明 : 成员都是受保护的，不对外共享，如要在外面修改或者复写，都要通过接口。
 *        命名空间接口的设计是灵活的，修改接口名不影响库文件里的内核代码及类接口。
 *        命名空间接口设计的宗旨是:只要修改一处就可搞定一切与第三方插件的冲突。
 *        与第三方插件发生冲突时解决方法:  修改变量 'LHH_NAMESPACE_20150715_' 里的值 即可。'LHH_NAMESPACE_20150715_' 是命名空间接口的密钥 作用是定义命名空间。
 * 	      调用基类的静态成员方法:(调用接口.静态成员)。
 * 	      这个基类不允许被实例化，要实例化它的派生类。
 * 	      页面中要引入'config.js'这个文件,因为这个文件里已经引入了'Basis.class.js'文件,所以不用在页面中再引入'Basis.class.js'文件了。
 * 	      'LHH_NAMESPACE_20150715_' 的设定也在'config.js'里设定,不要修改这里的 'LHH_NAMESPACE_20150715_' 的值。
 * 	      
 * note : 
 * 		  
 *		
 * 
 */

if(!LHH_NAMESPACE_20150715_){
	var LHH_NAMESPACE_20150715_='System';
}

;(function(window, undefined,namespace){
	var Function = {};
	var Date     = {};
	var String   = {};
	var Array    = {};
	if(window){
		Function = window.Function;
		Date     = window.Date;
		String   = window.String;
		Array    = window.Array;
	}
	

	//函数在原型里定义一个方法
	Function.prototype.method=function(name,fn){
		if(!this.prototype[name]){
			this.prototype[name] = fn;
		}
		return this;
	};

	
	/**
	*
	* 对Date的扩展，将 Date 转化为指定格式的String 
	* 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
	* 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
	* 例子： 
	* (new Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
	* (new Date()).format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
	*
	*
	*/
	Date.method('format',function(fmt){
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
	});
	

	String.method('trim',function(){
		return this.replace(/(^\s+)|\s+$/g,'');
	});
	

	/**
	 * 返回一个数组元素的下标，返回下标
	 * @param val
	 * @returns {Number}
	 */
	 Array.method('indexOf',function(o){
		for(var i=0,len=this.length;i < len;i++){
			if(this[i] == o)
				return i;
		}
		return-1;
	});

	/**
	 * 返回一个数组元素的下标，返回下标
	 * @param val
	 * @returns {Number}
	 */
	 Array.method('lastIndexOf',function(o){
		for(var i=this.length-1;i>=0;i--){
			if(this[i]==o)
				return i;
		}
		return-1;
	});

	/**
	 * 根据内容删除一个元素，返回数组
	 * @param val
	 */
	 Array.method('remove',function(val){
		var index = this.indexOf(val);      
		if (index > -1)          
			this.splice(index, 1);  
	});

	/**
	 * 数组根据下标删除一个元素，返回一个删除后的数组
	 * @param n
	 * @returns
	 */
	 Array.method('del',function(n){//n表示第几项，从0开始算起。
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
	});
	 
	//添加一个数组包含的方法
	// Array.prototype.contains = function(obj) {
	//         var i = this.length;
	//         while(i--)
	// 			if (this[i] === obj)
	// 				return true;
	// 		return false;
	// } ;
	Array.method('contains',function(o){
		return this.indexOf(o) != -1;
	});

	Array.method('copy',function(){
		return this.concat();
	});

	Array.method('insertAt',function(o,i){
		this.splice(i,0,o);
	});
	
	Array.method('insertBefore',function(o,o2){
		var i=this.indexOf(o2);
		if(i== -1)
			this.push(o);
		else 
			this.splice(i,0,o);
	});
	

	Array.method('removeAt',function(i){
		this.splice(i,1);
	});
	
	Array.method('remove',function(o){
		var i=this.indexOf(o);
		if(i!= -1)
			this.splice(i,1);
	});

	



	Function.READ=1;
	Function.WRITE=2;
	Function.READ_WRITE=3;
	//添加属性
	Function.method('addProperty',function(sName,nReadWrite){
		nReadWrite=nReadWrite||Function.READ_WRITE;
		var capitalized=sName.charAt(0).toUpperCase()+sName.substr(1);
		if(nReadWrite&Function.READ)
			this.prototype["get"+capitalized]=new Function("","return this._"+sName+";");
		if(nReadWrite&Function.WRITE)
			this.prototype["set"+capitalized]=new Function(sName,"this._"+sName+" = "+sName+";");
	});

	

	
	/**
	 * @author lhh
	 * 产品介绍：
	 * 创建日期：2014-12-23
	 * 修改日期：2015-7-10
	 * 名称：MySystem
	 * 功能：
	 * 方法列表:
	 *			main
	 *			obj_len
	 *			extends
	 *			extend
	 *			extends_f
	 *			override
	 *			autoCenter
	 * 对象列表:
	 *			Function
	 *			Date
	 *			String
	 *			Array
	 * 说明：MySystem对象已继承了上面定义对象里的所有方法
	 * 注意：
	 */
var MySystem={
		//interface
		'Html5':{
			'Paint':{}
		},
		'Basis'      :{},
		'Helper'     :{},
		'BiObject'   :{},
		'Browser'    :{},
		'Cookie'     :{},
		'Div'        :{},
		'Dom'        :{},
		'Drag'       :{},
		'Drag_xy'    :{},
		'Error'      :{},
		'Event'      :{},
		'FakeSelect' :{},
		'Fsc'        :{},
		'Less'       :{},
		'Linklist'   :{},
		'PopupLayer' :{},
		'Roll'       :{},
		'Slider'     :{},
		'Sport'      :{},
		'Tab'        :{},
		'Tools'      :{},
		/**
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2014-12-23
		 * 修改日期：2015-3-18
		 * 名称：MySystem.main
		 * 功能：程序主方法
		 * 说明：
		 * 注意：
		 * @param   (Arrary)args			   NULL :传入到callback 里的参数
		 * @param   (Function)callback 		NO NULL :调用main 方法要执行的操作
		 * @return  (voide)						:
		 * Example：
		 */
		'main':function(args,callback){
			if(!callback) return MySystem;
			callback.call(MySystem,args);
		},

		/**
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2014-12-23
		 * 修改日期：2015-3-18
		 * 名称：MySystem.obj_len
		 * 功能：返回指定对象下面成员数量
		 * 说明：
		 * 注意：
		 * @param   (Object)Obj 			   NULL :指定的对象
		 * @return  (Number)						:返回成员数量
		 * Example：
		 */

		'obj_len':function(obj){
			obj=obj||this;
			var n=0,i;
			for(i in obj) 
				n++;
			return n;
		},


		/**
		 * 
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2015-3-18
		 * 修改日期：2015-3-20
		 * 名称：MySystem.extends
		 * 功能：子类继承父类对象
		 * 说明：MySystem类范围内
		 * 注意： 
		 * @param   (Object)this 			NO NULL :子类对象
		 * @param   (Function)o_sub 		   NULL :子类名称
		 * @param   (Function)o_super   	NO NULL :父类名称
		 * @param   (String)type 			NO NULL :1:原型链反射继承;2(默认):对象冒充方式继承 
		 * @param   ([])arg 			   	   NULL :继承父类时传的构造参数
		 * @return  (void)
		 * Example：
		 *		对象冒充方式继承:window.MySystem.extends.call(this,o_sub,o_super,type,[,extraParameters]);
		 *		原型链继承:window.MySystem.extends(o_sub,o_super,type);
		 */
		'extends':function(o_sub,o_super,type,arg){
			type=type || 2;
			arg = arg || null;
			switch(type){
				case 1:
					for(var v in o_super.prototype){
						if(!o_sub.prototype[v]){
							o_sub.prototype[v]=o_super.prototype[v];
						}
					}
				break;
				case 2:
					if(arg && arg.length > 0){//传构造参数
						o_super.apply(this,arg);
					}else{//无构造参数
						o_super.call(this);
					}
				break;
				

				default:
					alert('error： type 非法类型');

			}
			
			
		},
		/**
		 * 
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2015-3-27
		 * 修改日期：2015-3-27
		 * 名称：window.MySystem.extend
		 * 功能：合并多个对象方法
		 * 说明：
		 * 注意： 
		 * @return  (Object) 合并后的对象 
		 * Example：
		 *		window.MySystem.extend(A,B,C,D...);
		 */  
		'extend':function(){  
		    var paramsLen = arguments.length;  
		    if(paramsLen<1){  
		        return false;  
		    }  

		    var target = arguments[0];  
		    for(var i=1;i<paramsLen;++i){  
		        for(var j in arguments[i]){  
		            target[j] = arguments[i][j];  
		        }  
		    }  

		    return target;  
		},
		

		 /**
		 * 
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2015-7-23
		 * 修改日期：2015-7-23
		 * 名称：window.MySystem.extend_2
		 * 功能：Extends a child object from a parent object using classical inheritance
		 * pattern.
		 * 说明：
		 * 注意：
		 * @param   (Object)Child 			NO NULL :子类
		 * @param   (Object)Parent 			NO NULL :父类
		 * @return  (Function) 函数原型
		 * Example：

		 *
		 */
		'extend_2': function() {
		    // proxy used to establish prototype chain
		    var F = function() {};
		    // extend Child from Parent
		    return function(Child, Parent) {
		        F.prototype = Parent.prototype;
		        Child.prototype = new F();
		        Child.__super__ = Parent.prototype;
		        Child.prototype.constructor = Child;
		    };
		}(),  

		 /**
		 * 
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2015-3-18
		 * 修改日期：2015-3-18
		 * 名称：window.MySystem.extends_f
		 * 功能：在指定对象的原型链上动态扩充方法
		 * 说明：调用call方法改变this指针
		 * 注意：不调用call方法，就是在window.MySystem对象上扩充方法
		 * @param   (Object)this 			NO NULL :指定对象
		 * @param   (String)name   			NO NULL :扩充的方法名称
		 * @param   (Function)fn 			NO NULL :方法原型
		 * @return  (Object) 返回扩充的对象
		 * Example：
		 *		在window.MySystem.Basis 的原型上扩充一个set方法
		 *		window.MySystem.extends_f.call(window.MySystem.Basis,'set',function(){});
		 *		
		 *		在window.MySystem 的原型上扩充一个set方法
		 *		window.MySystem.extends_f('set',function(){});
		 *
		 */
		'extends_f':function(name,fn){
			if(!this.prototype[name]){
				this.prototype[name] = fn;
			}
			return this;
		},

		



		/**
		 * 
		 * @author lhh
		 * 产品介绍：覆写方法
		 * 创建日期：
		 * 修改日期：
		 * 名称： window.MySystem.override
		 * 功能：
		 * 说明： 
		 * 注意： 
		 * @param   (Function)old_fn 	 NO NULL : 
		 * @param 	(Function)new_fn     NO NULL :
		 * Example：
		 *		
		 */
		'override':function(old_fn,new_fn){
			var old=old_fn;
			old_fn=new_fn;
			return old;
		},




		 /**
		 *
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2014-11-27
		 * 修改日期：2014-11-27
		 * 名称：window.MySystem.autoCenter
		 * 功能：元素自定垂直居中容器中间
		 * 说明：
		 * 注意：
		 * @param(Number) 		NO NULL : W  容器宽
		 * @param(Number) 		NO NULL : w  元素宽
		 * @param(Number) 		NO NULL : H  容器高
		 * @param(Number) 		NO NULL : h  元素高
		 * @param(Number) 		NULL 	: p  有padding值时 
		 * @return (Object) 返回居中位置的xy 坐标 	
		 * Example：
		 *		window.MySystem.autoCenter(500,10,500,10,0);
		 */
		'autoCenter':function(W,w,H,h,p){
			p=p || 0;
			W=parseInt(W);
			w=parseInt(w);
			H=parseInt(H);
			h=parseInt(h);
			p=parseInt(p);
			if(!W || !w || !H || !h) return 0;
			return {'x':parseInt((W-w-p)/2),'y':parseInt((H-h-p)/2)};
		}
	};

	MySystem.Function=Function.prototype;
	MySystem.Date=Date.prototype;
	MySystem.String=String.prototype;
	MySystem.Array=Array.prototype;



	
	
	/**
	 *
	 * @author lhh
	 * 产品介绍：
	 * 创建日期：2014.9.28
	 * 修改日期：2014.9.28
	 * 名称：private isType
	 * 功能：判断数据是什么类型的
	 * 说明：
	 * 注意：
	 * @param   (var)type 			NO NULL :
	 * 调用方式：this.isString('aaaa');
	 * Example：
	 */
	var isType=function(type) {
	  return function(obj) {
	    return Object.prototype.toString.call(obj) === "[object " + type + "]";
	  }
	};

	var __this__=null;
	function Basis(){
		__this__=this;
		this._super ={};
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

		

		
		this.isObject   	= isType("Object");
		this.isString   	= isType("String");
		this.isArrayI    	= Array.isArray || isType("Array");
		this.isFunction 	= isType("Function");

		/*-----------------------------*/

	}



	/*---------------------------------
	static mothed
	-------*/
	/**
	 * 创建日期：2014-9-3
	 * 修改日期：2014-9-3
	 * 名称：(String) inputSizeGetProportion
	 * 功能：输入宽和高返回尺寸的比例
	 * 参数：Number $a
	 * 		 Number $b
	 * Example:
	 *		window.MySystem.Basis.inputSizeGetProportion(1280,720);
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
	 * 名称：(String) forSize
	 * 功能：输入1280px 参考尺寸返回一个什么样的宽度符合被平均分成3份并且符合 4:6 的一个尺寸
	 * 参数：Number a 
	 * 		 Number b
	 * 		 Number size
	 * 		 Number n
	 * Example:
	 *		window.MySystem.Basis.forSize(4,6,1280,3);
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
	 *		window.MySystem.Basis.getToSize(4,6,1280,15000);
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

  	/**
	 *
	 * @author lhh
	 * 产品介绍：
	 * 创建日期：2015-3-18
	 * 修改日期：2015-3-19
	 * 名称：window.MySystem.Basis.extends
	 * 功能：继承Basis类
	 * 说明：Basis类静态方法。 调用call方法改变this指针
	 * 注意：调用必须用call方法
	 * @param   (Object)this 			NO NULL :子类对象
	 * @param   (Function)o_super   	NO NULL :父类名称 
	 * @param   (String)type 			NO NULL :1:原型链继承;默认2:对象冒充方式继承 
	 * @param   ([])arg 			   	   NULL :继承父类时传的构造参数
	 * @return  (void)
	 * Example：
	 *		window.MySystem.Basis.extends.call(this,o_super,type,[a,b,c,...]);
	 */
	Basis.extends=function(o_super,type,arg) {
		o_super = o_super  || Basis;
		type 	  = type || 2;
		arg = arg || null;
	  /*------------------------------*/
		//要继承MySystem.Basis这个类都要加这么一段
		//如果有window.MySystem.Basis这个类并且它下面的子类已经继承了这个类就不继承了
		if(MySystem && o_super ) {
			if(!this.setBrowser){
				MySystem.extends.call(this,null,o_super,type,arg);
			}
			//如果它下面的子类已经设置了浏览器就不再设置浏览器
			// if(Browser && (typeof Browser  !='undefined') && !this.Browser) this.setBrowser(Browser);
			
		}else{
			alter("Error: without "+o_super);
			return 0;
		}
	  /*------------------------------*/
		 
	};


	Basis.prototype={
		'constructor': Basis,
		'__constructor':function(){},
		'each':function(a,fun){
			if(!a || !this.isF(fun)) 
				return;
			for(var i=0,len=a.length;i<len;i++)
				fun.call(a[i],i,a[i]);
		},
		
		/**
		 * 如果对象的属性的值还是一个对象的话就递归搜索，直到对象下的属性不是对象位置
		 * @ Obj : 对象
		 * @ fn : 回调的方法
		 */
		'list':function(Obj,fn){
			var k,v;
			if(!this.isO(Obj)) 
				return Obj;
			for(k in Obj){
				this.list(Obj[k],fn);
				if(this.isF(fn)){v=Obj[k];fn.call(Obj,k,v);}
			}
		},
		
		/**
		 * 
		 * 创建人：lhh
		 * 功能：输入一个下标索引返回对象的 value
		 * 名称：putIndexGetObjectTheValue
		 * 创建日期：2014.6.15
		 * 修改日期：2014.6.15
		 * @param(Object) 		NO NULL : Obj 
		 * @param(int) 			NO NULL : n 
		 * @return (var) 	
		 */
		'putIndexGetObjectTheValue':function(obj,n){
			//输入的一定是对象和数字
			if(this.isO(obj) && this.isNum(n)){
				//防止输入的下标大于对象的长度
				if(MySystem.obj_len(obj) < n){
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
		},
		
		'isS':function(s){
			return !this.is_numeric(s) && ('string' === typeof s);
		},
		'isF':function(fn){return ('function'=== typeof fn);},
		'isO':function(obj){
			if(obj instanceof Object) return true;
			var flag=false;
			if('object'===typeof obj){
				for(var i in obj)
					return true;
			}else{
				flag=false;
			}
			return flag;
		},

		'isEmptyObject':function( obj ) {
			for ( var name in obj ) {
				return false;
			}
			return true;
		},

		'error':function( msg ) {
			throw new Error( msg );
		},

		'isset':function(s){return (typeof s != "undefined");},
		//检测是否是数字
		'is_numeric':function(n){
			return !isNaN(n);
		},
		'isArray':function(arr){
			return (arr.constructor === Array) || (arr instanceof Array) || (Object.prototype.toString.call(arr) === '[object Array]');
		},
		
		'empty':function(s) {
		    return !(this.isset(s) && String(s).trim() != '' && s != null);
		},
		
		'arr_isEmpty':function(arr){
		    if(this.isArray(arr)){
		    	if(!arr.length){
			    	return true
			    }else{
			    	return false; 
			    } 
		    }else{
		    	alert('这不是数组');
		    }
		    
		},
		
		/**
		 *
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2014-12-23
		 * 修改日期：2015-3-18
		 * 名称：extends
		 * 功能：动态继承对象
		 * 说明：
		 * 注意：在实例化Basis对象时调用此方法
		 * @param   (Object)sub 			NO NULL :
		 * @param   (Object)_super 			NO NULL :
		 * @return  (Object)						:返回继承完父类后的子类对象
		 * Example：
		 */
		'extends': function( sub,_super) {
		  var key, value;
		  for (key in _super ) {
		    value = _super[key];
		    if (!sub[key] || null === sub[key]) {
		      sub[key] = value;
		    }
		  }
		  return sub;
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
	window[namespace]=MySystem;
	window[namespace]['Basis']=Basis;
})(window,undefined,LHH_NAMESPACE_20150715_);









/**
 * @author lhh
 * 产品介绍：
 * 创建日期：2014-11-28
 * 修改日期：2014-11-28
 * 名称：
 * 功能：
 * 说明：
 * 注意：
 * @param   (String)param 			NO NULL :
 * @return   :
 * Example：
 */
