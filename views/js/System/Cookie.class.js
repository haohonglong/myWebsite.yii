(function(window,document,undefined,System){//cookie

	if(!System) {
		alert('without nothing the class of System');
		return 0;
	}
	var __this__=null;
    function Cookie(){
		System.Basis.extends.call(this);
		__this__=this;
		

	}
	
	Cookie.prototype = {
		'constructor':Cookie,
		'__constructor':function(){},
		/**
		* 使用setCookie()函数来保存cookie项的值，
		* 其中第一、二两个参数分别为cookie项的名称和值。
		* 如果想为其设置一个过期时间，那么就需要设置第三个参数，
		* 这里需要通过getExpDate()获得一个正确格式的参数。
		*/
		'setCookie':function(name, value, expires, path, domain, secure){
			document.cookie = name + "=" + escape(value) +
				((expires) ? "; expires=" + expires : "") +
				((path) ? "; path=" + path : "") +
				((domain) ? "; domain=" + domain : "") +
				((secure) ? "; secure" : "");
				
		},
		'getCookie':function(name){
			var arg = name + "=";
			var alen = arg.length;
			var clen = document.cookie.length;
			var i = 0;
			if(i<clen){
				while(i < clen){
					var j = i + alen;
					if (document.cookie.substring(i, j) == arg)
					{
						return this.getCookieVal(j);
					}
					i = document.cookie.indexOf(" ", i) + 1;
					if(i == 0) return false;
				}
			}else{
				return false;
			}
			return;
		},
		'getCookieVal':function(offset){
			var endstr = document.cookie.indexOf(";", offset);
			if(endstr == -1)
			{
				endstr = document.cookie.length;
			}
			return unescape(document.cookie.substring(offset, endstr));
		},
		'getExpDate':function(days, hours, minutes){
			var expDate = new Date();
			if(typeof(days) == "number" && typeof(hours) == "number" && typeof(hours) == "number")
			{
				expDate.setDate(expDate.getDate() + parseInt(days));
				expDate.setHours(expDate.getHours() + parseInt(hours));
				expDate.setMinutes(expDate.getMinutes() + parseInt(minutes));
				return expDate.toGMTString();
			}
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
	},
	System.extends(Cookie,System.Basis,1);
	System['Cookie']=Cookie;
})(window,document,undefined,window[LHH_NAMESPACE_20150715_]);


